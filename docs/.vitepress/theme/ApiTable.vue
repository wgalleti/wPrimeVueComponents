<script setup lang="ts">
import { computed } from 'vue'
import manifest from '../../../src/generated/component-meta.json'

const props = defineProps<{ name: string }>()

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
interface ComponentMeta {
  file: string
  props: PropMeta[]
  events: EventMeta[]
  slots: SlotMeta[]
}

const components = (manifest as { components: Record<string, ComponentMeta> }).components
const meta = computed<ComponentMeta | undefined>(() => components[props.name])

function fmtDefault(d: string | null): string {
  if (d === null || d === '') return '—'
  return d
}
</script>

<template>
  <div v-if="!meta" class="api-missing">
    Componente <code>{{ name }}</code> não encontrado no manifest. Rode
    <code>yarn meta</code>.
  </div>
  <div v-else class="api-table">
    <p class="api-source">
      Gerado de <code>{{ meta.file }}</code> — fonte de verdade: o próprio componente.
    </p>

    <template v-if="meta.props.length">
      <h3>Props</h3>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Tipo</th>
            <th>Obrigatória</th>
            <th>Default</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in meta.props" :key="p.name">
            <td>
              <code>{{ p.name }}</code>
            </td>
            <td>
              <code class="api-type">{{ p.type }}</code>
            </td>
            <td class="api-center">{{ p.required ? '✓' : '' }}</td>
            <td>
              <code v-if="fmtDefault(p.default) !== '—'">{{ fmtDefault(p.default) }}</code>
              <span v-else class="api-muted">—</span>
            </td>
            <td>{{ p.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-if="meta.events.length">
      <h3>Eventos</h3>
      <table>
        <thead>
          <tr>
            <th>Evento</th>
            <th>Payload</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in meta.events" :key="e.name">
            <td>
              <code>{{ e.name }}</code>
            </td>
            <td>
              <code class="api-type">{{ e.type }}</code>
            </td>
            <td>{{ e.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-if="meta.slots.length">
      <h3>Slots</h3>
      <table>
        <thead>
          <tr>
            <th>Slot</th>
            <th>Props do slot</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in meta.slots" :key="s.name">
            <td>
              <code>{{ s.name }}</code>
            </td>
            <td>
              <code class="api-type">{{ s.type }}</code>
            </td>
            <td>{{ s.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<style scoped>
.api-source {
  font-size: 0.82em;
  color: var(--vp-c-text-3);
  margin: 0 0 0.75rem;
}
.api-table h3 {
  margin: 1.4rem 0 0.5rem;
}
.api-table table {
  display: table;
  width: 100%;
  margin: 0.25rem 0 0.5rem;
}
.api-type {
  font-size: 0.85em;
  white-space: pre-wrap;
  color: var(--vp-c-brand-1);
}
.api-center {
  text-align: center;
}
.api-muted {
  color: var(--vp-c-text-3);
}
.api-missing {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-1);
  font-size: 0.9em;
}
</style>
