<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { PaletteItem } from '@/types/commandPalette'
import { filterPaletteItems } from '@/utils/paletteFilter'

/**
 * Paleta de comandos (Ctrl/⌘+K). Genérica: não conhece router nem permissão — o app entrega
 * `items` já filtrados e navega no `@select`. Sem termo: recentes e depois o resto por grupo;
 * com termo: lista única filtrada (sem acento, cada palavra no rótulo ou no grupo).
 */
const props = withDefaults(
  defineProps<{
    items: PaletteItem[]
    /** Ids usados recentemente, do mais novo ao mais antigo. */
    recent?: string[]
    placeholder?: string
    /** Liga os atalhos globais: Ctrl/⌘+K alterna e `/` abre. Ambos só valem fora de campos de
     *  texto (input, textarea, contenteditable) e sem outro modal aberto; `visible` não muda
     *  durante repetição de tecla nem composição (IME). Dentro da paleta, Ctrl/⌘+K fecha. */
    shortcut?: boolean
    /** Nome acessível da janela. */
    label?: string
  }>(),
  {
    recent: () => [],
    placeholder: 'Para onde você quer ir?',
    shortcut: true,
    label: 'Paleta de comandos',
  },
)

const visible = defineModel<boolean>('visible', { default: false })

const emit = defineEmits<{
  select: [item: PaletteItem]
}>()

const uid = `w-palette-${Math.random().toString(36).slice(2, 8)}`
const idLista = `${uid}-lista`
const idOpcao = (item: PaletteItem) => `${uid}-op-${item.id}`

const campo = ref<HTMLInputElement | null>(null)
const termo = ref('')
const indice = ref(0)
let abriuDe: Element | null = null

interface Secao {
  titulo: string
  itens: PaletteItem[]
}

const secoes = computed<Secao[]>(() => {
  if (termo.value.trim()) {
    const achados = filterPaletteItems(props.items, termo.value)
    return achados.length ? [{ titulo: 'Resultados', itens: achados }] : []
  }
  const porId = new Map(props.items.map((i) => [i.id, i]))
  const recentes = props.recent.map((id) => porId.get(id)).filter((i): i is PaletteItem => !!i)
  const usados = new Set(recentes.map((i) => i.id))
  const grupos = new Map<string, PaletteItem[]>()
  for (const item of props.items) {
    if (usados.has(item.id)) continue
    const g = item.group || 'Itens'
    if (!grupos.has(g)) grupos.set(g, [])
    grupos.get(g)!.push(item)
  }
  const resto = [...grupos].map(([titulo, itens]) => ({ titulo, itens }))
  return recentes.length ? [{ titulo: 'Recentes', itens: recentes }, ...resto] : resto
})

const plana = computed(() => secoes.value.flatMap((s) => s.itens))
const ativo = computed(() => plana.value[indice.value])

watch(termo, () => {
  indice.value = 0
})

// A opção ativa sempre fica à vista, mesmo com a lista rolando.
watch(indice, async () => {
  await nextTick()
  const alvo = ativo.value && document.getElementById(idOpcao(ativo.value))
  alvo?.scrollIntoView?.({ block: 'nearest' })
})

const overlay = ref<HTMLElement | null>(null)
let tornadosInertes: HTMLElement[] = []

// O que está atrás da paleta não recebe foco nem leitor de tela (aria-modal sozinho não basta).
function isolarFundo() {
  tornadosInertes = [...document.body.children].filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el !== overlay.value && !el.inert,
  )
  tornadosInertes.forEach((el) => (el.inert = true))
}

function liberarFundo() {
  tornadosInertes.forEach((el) => (el.inert = false))
  tornadosInertes = []
}

function devolverFoco() {
  liberarFundo()
  ;(abriuDe as HTMLElement | null)?.focus?.()
  abriuDe = null
}

watch(visible, async (aberta) => {
  if (aberta) {
    abriuDe = document.activeElement
    termo.value = ''
    indice.value = 0
    await nextTick()
    isolarFundo()
    campo.value?.focus()
  } else {
    devolverFoco()
  }
})

function escolher(item?: PaletteItem) {
  if (!item) return
  visible.value = false
  emit('select', item)
}

function digitando(e: KeyboardEvent): boolean {
  const alvo = e.target
  return (
    alvo instanceof HTMLElement &&
    (alvo.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(alvo.tagName))
  )
}

function aoTeclarGlobal(e: KeyboardEvent) {
  if (e.defaultPrevented || e.repeat || e.isComposing) return
  const atalhoK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'
  const barra = e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey
  if (!atalhoK && !barra) return
  if (visible.value) {
    // Aberta: só Ctrl/⌘+K (que alterna) age; "/" vira texto da busca.
    if (atalhoK) {
      e.preventDefault()
      visible.value = false
    }
    return
  }
  if (digitando(e) || document.querySelector('.p-dialog-mask')) return
  e.preventDefault()
  visible.value = true
}

watch(
  () => props.shortcut,
  (ligado, _, onCleanup) => {
    if (!ligado || typeof window === 'undefined') return
    window.addEventListener('keydown', aoTeclarGlobal)
    onCleanup(() => window.removeEventListener('keydown', aoTeclarGlobal))
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (visible.value) devolverFoco()
})

function aoTeclar(e: KeyboardEvent) {
  const total = plana.value.length
  if (e.key === 'ArrowDown' && total) {
    e.preventDefault()
    indice.value = (indice.value + 1) % total
  } else if (e.key === 'ArrowUp' && total) {
    e.preventDefault()
    indice.value = (indice.value - 1 + total) % total
  } else if (e.key === 'Enter') {
    e.preventDefault()
    escolher(ativo.value)
  } else if (e.key === 'Escape') {
    e.preventDefault()
    visible.value = false
  } else if (e.key === 'Tab') {
    e.preventDefault() // foco preso no campo; as setas escolhem
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="w-command-palette">
      <div v-if="visible" ref="overlay" class="w-command-palette" @click.self="visible = false">
        <div
          class="w-command-palette__janela"
          role="dialog"
          aria-modal="true"
          :aria-label="label"
          @keydown="aoTeclar"
          @click="campo?.focus()"
        >
          <div class="w-command-palette__busca">
            <i class="pi pi-search" aria-hidden="true" />
            <input
              ref="campo"
              v-model="termo"
              class="w-command-palette__entrada"
              type="text"
              role="combobox"
              autocomplete="off"
              :placeholder="placeholder"
              :aria-label="placeholder"
              aria-autocomplete="list"
              aria-haspopup="listbox"
              :aria-expanded="!!plana.length"
              :aria-controls="idLista"
              :aria-activedescendant="ativo ? idOpcao(ativo) : undefined"
            />
          </div>

          <div :id="idLista" class="w-command-palette__lista" role="listbox" :aria-label="label">
            <div
              v-for="secao in secoes"
              :key="secao.titulo"
              role="group"
              :aria-label="secao.titulo"
            >
              <p class="w-command-palette__secao" aria-hidden="true">{{ secao.titulo }}</p>
              <div
                v-for="item in secao.itens"
                :id="idOpcao(item)"
                :key="`${secao.titulo}-${item.id}`"
                class="w-command-palette__opcao"
                role="option"
                :aria-selected="ativo?.id === item.id"
                :data-ativa="ativo?.id === item.id"
                @mousemove="indice = plana.findIndex((i) => i.id === item.id)"
                @click="escolher(item)"
              >
                <i v-if="item.icon" :class="item.icon" aria-hidden="true" />
                <span class="w-command-palette__nome">{{ item.label }}</span>
                <span
                  v-if="item.hint || (item.group && termo.trim())"
                  class="w-command-palette__dica"
                >
                  {{ item.hint || item.group }}
                </span>
              </div>
            </div>
          </div>

          <p class="w-command-palette__vazio" role="status" aria-live="polite">
            {{ plana.length ? '' : `Nada encontrado para “${termo}”.` }}
          </p>

          <footer class="w-command-palette__rodape" aria-hidden="true">
            <span><kbd>↑</kbd><kbd>↓</kbd> escolher</span>
            <span><kbd>Enter</kbd> abrir</span>
            <span><kbd>Esc</kbd> fechar</span>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.w-command-palette {
  position: fixed;
  inset: 0;
  z-index: var(--w-z-overlay);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: var(--w-palette-top) var(--w-space-4) var(--w-space-4);
  background: var(--w-scrim);
}

.w-command-palette__janela {
  display: flex;
  flex-direction: column;
  width: min(var(--w-palette-w), 100%);
  max-height: var(--w-palette-max-h);
  overflow: hidden;
  background: var(--w-surface);
  color: var(--w-fg);
  border: 1px solid var(--w-border);
  border-radius: var(--w-radius-xl);
  box-shadow: var(--w-shadow-lg);
}

.w-command-palette__busca {
  display: flex;
  align-items: center;
  gap: var(--w-space-3);
  padding: var(--w-space-3) var(--w-space-4);
  border-bottom: 1px solid var(--w-border);
  color: var(--w-fg-muted);
}

.w-command-palette__busca:focus-within {
  border-bottom-color: var(--w-primary);
  box-shadow: 0 1px 0 var(--w-primary);
}

.w-command-palette__entrada {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0; /* a moldura é o cabeçalho (:focus-within), não o campo */
  background: transparent;
  color: var(--w-fg);
  font: inherit;
  font-size: var(--w-text-lg);
}

/* anula o anel global do app (*:focus-visible); o foco aparece no cabeçalho */
.w-command-palette__entrada:focus-visible {
  box-shadow: none;
}

.w-command-palette__lista {
  overflow-y: auto;
  padding: var(--w-space-15);
}

.w-command-palette__secao {
  margin: var(--w-space-2) var(--w-space-2) var(--w-space-1);
  color: var(--w-fg-muted);
  font-size: var(--w-text-xs);
  font-weight: var(--w-fw-bold);
}

.w-command-palette__opcao {
  display: flex;
  align-items: center;
  gap: var(--w-space-3);
  padding: var(--w-space-2) var(--w-space-3);
  border-radius: var(--w-radius-md);
  cursor: pointer;
}

.w-command-palette__opcao[data-ativa='true'] {
  background: var(--w-primary-soft);
}

.w-command-palette__opcao > i {
  flex: none;
  width: var(--w-space-5);
  text-align: center;
  color: var(--w-primary);
}

.w-command-palette__nome {
  flex: 1;
  min-width: 0;
  font-weight: var(--w-fw-semibold);
}

.w-command-palette__dica {
  color: var(--w-fg-muted);
  font-size: var(--w-text-sm);
}

.w-command-palette__vazio {
  margin: 0;
  padding: var(--w-space-6) var(--w-space-4);
  color: var(--w-fg-muted);
  text-align: center;
}

.w-command-palette__vazio:empty {
  padding: 0;
}

.w-command-palette__rodape {
  display: flex;
  gap: var(--w-space-5);
  padding: var(--w-space-2) var(--w-space-4);
  border-top: 1px solid var(--w-border);
  color: var(--w-fg-muted);
  font-size: var(--w-text-xs);
}

.w-command-palette__rodape kbd {
  display: inline-block;
  padding: 0 var(--w-space-1);
  border: 1px solid var(--w-border);
  border-radius: var(--w-radius-xs);
  background: var(--w-surface-2);
  font-family: var(--w-font-mono);
  font-size: var(--w-text-2xs);
}

.w-command-palette__rodape kbd + kbd {
  margin-left: var(--w-space-05);
}

.w-command-palette-enter-active,
.w-command-palette-leave-active {
  transition: opacity var(--w-motion-fast) var(--w-ease);
}

.w-command-palette-enter-active .w-command-palette__janela,
.w-command-palette-leave-active .w-command-palette__janela {
  transition: transform var(--w-motion) var(--w-ease-spring);
}

.w-command-palette-enter-from,
.w-command-palette-leave-to {
  opacity: 0;
}

.w-command-palette-enter-from .w-command-palette__janela,
.w-command-palette-leave-to .w-command-palette__janela {
  transform: translateY(calc(-1 * var(--w-space-2)));
}

@media (prefers-reduced-motion: reduce) {
  .w-command-palette-enter-active,
  .w-command-palette-leave-active,
  .w-command-palette-enter-active .w-command-palette__janela,
  .w-command-palette-leave-active .w-command-palette__janela {
    transition: none;
  }
}
</style>
