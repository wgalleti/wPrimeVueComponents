<script setup lang="ts">
import { ref, reactive, shallowRef, computed, onErrorCaptured } from 'vue'
import type { Component } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import ToggleSwitch from 'primevue/toggleswitch'
import Select from 'primevue/select'
import manifest from '@/generated/component-meta.json'
import type { ComponentSidecar } from '@/types/componentMeta'

interface PropMeta {
  name: string
  type: string
  required: boolean
  default: string | null
  description: string
}
interface EventMeta {
  name: string
  type: string
  description: string
}
interface SlotMeta {
  name: string
  type: string
  description: string
}
interface CompMeta {
  file: string
  props: PropMeta[]
  events: EventMeta[]
  slots: SlotMeta[]
}

const components = (manifest as { components: Record<string, CompMeta> }).components

// SFCs (lazy) e sidecars (eager) da lib — a fonte de verdade.
const loaders = import.meta.glob('../../../src/components/**/*.vue')
const sidecarMods = import.meta.glob('../../../src/components/**/*.meta.ts', {
  eager: true,
}) as Record<string, { default: ComponentSidecar }>

function nameFromPath(p: string, ext: string): string {
  const base = p.split('/').pop() || ''
  return base.slice(0, base.length - ext.length)
}

const loaderByName: Record<string, () => Promise<unknown>> = {}
for (const [p, l] of Object.entries(loaders)) {
  loaderByName[nameFromPath(p, '.vue')] = l as () => Promise<unknown>
}
const sidecarByName: Record<string, ComponentSidecar> = {}
for (const [p, m] of Object.entries(sidecarMods)) {
  sidecarByName[nameFromPath(p, '.meta.ts')] = m.default
}

interface CatalogItem {
  name: string
  meta: CompMeta
  sidecar?: ComponentSidecar
}
const catalog: CatalogItem[] = Object.keys(components)
  .sort()
  .map((name) => ({ name, meta: components[name], sidecar: sidecarByName[name] }))

const groups = computed<[string, CatalogItem[]][]>(() => {
  const g: Record<string, CatalogItem[]> = {}
  for (const item of catalog) {
    const cat = item.sidecar?.category ?? 'Sem sidecar'
    ;(g[cat] ||= []).push(item)
  }
  return Object.entries(g).sort(([a], [b]) => a.localeCompare(b))
})

// -----------------------------------------------------------------------------
// Seleção
// -----------------------------------------------------------------------------
const selectedName = ref<string | null>(null)
const selected = computed(() => catalog.find((c) => c.name === selectedName.value) || null)
const loaded = shallowRef<Component | null>(null)
const propState = reactive<Record<string, unknown>>({})
const activeExample = ref(0)
const previewError = ref<string | null>(null)

async function select(name: string) {
  selectedName.value = name
  loaded.value = null
  const loader = loaderByName[name]
  if (loader) {
    const mod = (await loader()) as { default: Component }
    loaded.value = mod.default
  }
  applyExample(0)
}

function applyExample(idx: number) {
  activeExample.value = idx
  for (const k of Object.keys(propState)) delete propState[k]
  const ex = selected.value?.sidecar?.examples?.[idx]
  if (ex?.props) Object.assign(propState, JSON.parse(JSON.stringify(ex.props)))
  previewError.value = null
}

onErrorCaptured((err) => {
  previewError.value = (err as Error)?.message || String(err)
  return false
})

// -----------------------------------------------------------------------------
// Controles inferidos do tipo (sidecar.controls tem prioridade)
// -----------------------------------------------------------------------------
type ControlKind = 'boolean' | 'number' | 'text' | 'select' | 'none'
interface Control {
  kind: ControlKind
  options?: string[]
}

function controlFor(prop: PropMeta): Control {
  const hint = selected.value?.sidecar?.controls?.[prop.name]
  if (hint?.type === 'select' && hint.options) {
    return { kind: 'select', options: hint.options.map(String) }
  }
  if (hint?.type === 'boolean' || hint?.type === 'number' || hint?.type === 'text') {
    return { kind: hint.type }
  }
  const t = prop.type
  const literals = [...t.matchAll(/"([^"]+)"/g)].map((m) => m[1])
  if (literals.length >= 2) return { kind: 'select', options: literals }
  if (/\bboolean\b/.test(t)) return { kind: 'boolean' }
  if (/\bnumber\b/.test(t) && !/\bstring\b/.test(t)) return { kind: 'number' }
  if (/\bstring\b/.test(t)) return { kind: 'text' }
  return { kind: 'none' }
}

const editableProps = computed(() =>
  (selected.value?.meta.props ?? [])
    .map((p) => ({ prop: p, control: controlFor(p) }))
    .filter((c) => c.control.kind !== 'none'),
)
const complexProps = computed(() =>
  (selected.value?.meta.props ?? []).filter((p) => controlFor(p).kind === 'none'),
)

function setProp(name: string, value: unknown) {
  if (value === null || value === undefined || value === '') delete propState[name]
  else propState[name] = value
}

// -----------------------------------------------------------------------------
// Snippet
// -----------------------------------------------------------------------------
const snippet = computed(() => {
  const name = selectedName.value
  if (!name) return ''
  const entries = Object.entries(propState).filter(
    ([, v]) => v !== undefined && v !== null && v !== '',
  )
  if (!entries.length) return `<${name} />`
  const attrs = entries.map(([k, v]) => {
    if (typeof v === 'string') return `  ${k}="${v}"`
    if (typeof v === 'boolean') return v ? `  ${k}` : `  :${k}="false"`
    return `  :${k}="${JSON.stringify(v)}"`
  })
  return `<${name}\n${attrs.join('\n')}\n/>`
})
</script>

<template>
  <div class="flex gap-6 h-[calc(100vh-4rem)] -m-8 p-8">
    <!-- Lista de componentes -->
    <aside class="w-56 shrink-0 overflow-auto pr-1">
      <h1 class="text-lg font-bold tracking-tight text-color mb-1">Workbench</h1>
      <p class="text-xs text-muted-color mb-4">
        {{ catalog.length }} componentes · doc viva da fonte
      </p>
      <div v-for="[cat, items] in groups" :key="cat" class="mb-4">
        <div
          class="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-color px-2 mb-1"
        >
          {{ cat }}
        </div>
        <button
          v-for="item in items"
          :key="item.name"
          class="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[0.8125rem] font-medium text-left transition-colors"
          :class="
            selectedName === item.name
              ? 'bg-primary/10 text-primary'
              : 'text-muted-color hover:text-color hover:bg-surface-100 dark:hover:bg-surface-800'
          "
          @click="select(item.name)"
        >
          <i :class="[item.sidecar?.icon || 'pi pi-box', 'text-xs opacity-70']" />
          {{ item.name }}
        </button>
      </div>
    </aside>

    <!-- Detalhe -->
    <section v-if="selected" class="flex-1 min-w-0 overflow-auto">
      <div class="flex items-baseline gap-3 mb-1">
        <h2 class="text-xl font-bold tracking-tight text-color">{{ selected.name }}</h2>
        <code class="text-xs text-muted-color">{{ selected.meta.file }}</code>
      </div>
      <p v-if="selected.sidecar?.summary" class="text-sm text-muted-color mb-4">
        {{ selected.sidecar.summary }}
      </p>

      <!-- Exemplos -->
      <div
        v-if="selected.sidecar?.examples?.length"
        class="flex flex-wrap gap-1.5 mb-3"
      >
        <button
          v-for="(ex, i) in selected.sidecar.examples"
          :key="ex.name"
          class="px-3 py-1 rounded-full text-xs font-medium transition-colors"
          :class="
            activeExample === i
              ? 'bg-primary text-white'
              : 'bg-surface-100 dark:bg-surface-800 text-muted-color hover:text-color'
          "
          @click="applyExample(i)"
        >
          {{ ex.name }}
        </button>
      </div>

      <!-- Preview -->
      <div
        class="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50 p-8 mb-5 flex items-center justify-center min-h-40"
      >
        <div
          v-if="previewError"
          class="text-center max-w-sm text-sm text-muted-color"
        >
          <i class="pi pi-info-circle text-2xl mb-2 block opacity-60" />
          Este componente precisa de contexto para renderizar (ex.:
          <code>dataProvider</code> via plugin). Veja os cenários de CRUD.
          <div class="mt-2 text-xs opacity-60">{{ previewError }}</div>
        </div>
        <component :is="loaded" v-else-if="loaded" v-bind="propState" />
      </div>

      <!-- Controles + Snippet -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-color mb-2">
            Controles
          </h3>
          <div v-if="editableProps.length" class="flex flex-col gap-3">
            <label
              v-for="{ prop, control } in editableProps"
              :key="prop.name"
              class="flex flex-col gap-1"
            >
              <span class="text-[0.8125rem] font-medium text-color">
                {{ prop.name }}
                <span v-if="prop.required" class="text-red-500">*</span>
              </span>
              <ToggleSwitch
                v-if="control.kind === 'boolean'"
                :model-value="!!propState[prop.name]"
                @update:model-value="(v: boolean) => setProp(prop.name, v)"
              />
              <InputNumber
                v-else-if="control.kind === 'number'"
                :model-value="(propState[prop.name] as number) ?? null"
                fluid
                @update:model-value="(v: number) => setProp(prop.name, v)"
              />
              <Select
                v-else-if="control.kind === 'select'"
                :model-value="propState[prop.name]"
                :options="control.options"
                fluid
                show-clear
                @update:model-value="(v: unknown) => setProp(prop.name, v)"
              />
              <InputText
                v-else
                :model-value="(propState[prop.name] as string) ?? ''"
                fluid
                @update:model-value="(v: string) => setProp(prop.name, v)"
              />
              <span v-if="prop.description" class="text-xs text-muted-color">
                {{ prop.description }}
              </span>
            </label>
          </div>
          <p v-else class="text-sm text-muted-color">Sem props editáveis inline.</p>

          <p
            v-if="complexProps.length"
            class="text-xs text-muted-color mt-3 pt-3 border-t border-surface-200 dark:border-surface-800"
          >
            Props complexas (editar no snippet):
            <code v-for="p in complexProps" :key="p.name" class="mx-0.5">{{ p.name }}</code>
          </p>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-color mb-2">
            Código
          </h3>
          <pre
            class="rounded-lg bg-surface-900 dark:bg-black/40 text-surface-100 text-xs p-4 overflow-auto"
          ><code>{{ snippet }}</code></pre>
        </div>
      </div>
    </section>

    <!-- Estado vazio -->
    <section v-else class="flex-1 flex items-center justify-center text-muted-color">
      <div class="text-center">
        <i class="pi pi-th-large text-4xl mb-3 block opacity-40" />
        Escolha um componente à esquerda para explorar.
      </div>
    </section>
  </div>
</template>
