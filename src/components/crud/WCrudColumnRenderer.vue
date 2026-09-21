<script setup lang="ts">
import Tag from 'primevue/tag'
import type { ColumnDef, TagSeverity } from '@/types/column'
import { useFormatters } from '@/composables/useFormatters'

defineProps<{
  column: ColumnDef
  value: unknown
  rowData: Record<string, unknown>
}>()

const { formatDate, formatDateTime, formatCurrency, formatNumber } = useFormatters()

// --- Boolean: rótulo e cor ---------------------------------------------
// `tagValue`/`tagSeverity` (funções) vencem; senão `trueLabel`/`falseLabel` e
// `trueSeverity`/`falseSeverity` (estáticos); default Ativo/Inativo, success/danger.
// Severidade `null` = sem tag: texto neutro (ex.: "—" para o `false` de um
// boolean que não é status, evitando a dupla negação "nao_exige → Inativo").

function boolLabel(column: ColumnDef, value: unknown, rowData: Record<string, unknown>) {
  if (column.tagValue) return column.tagValue(value, rowData)
  return value ? (column.trueLabel ?? 'Ativo') : (column.falseLabel ?? 'Inativo')
}

// --- Enum/status em qualquer tipo de coluna ---------------------------
// `tagValue`/`tagSeverity` numa coluna que não é boolean (status, tipo, fase)
// também viram tag: o rótulo vem do `tagValue` (ou `format`, ou o valor cru) e a
// cor do `tagSeverity` (default `secondary`).

function isTagColumn(column: ColumnDef) {
  return Boolean(column.tagValue || column.tagSeverity)
}

function tagLabel(column: ColumnDef, value: unknown, rowData: Record<string, unknown>) {
  if (column.tagValue) return column.tagValue(value, rowData)
  if (column.format) return column.format(value, rowData)
  return String(value)
}

function tagSeverity(
  column: ColumnDef,
  value: unknown,
  rowData: Record<string, unknown>,
): TagSeverity {
  return (column.tagSeverity?.(value, rowData) as TagSeverity | undefined) ?? 'secondary'
}

function boolSeverity(
  column: ColumnDef,
  value: unknown,
  rowData: Record<string, unknown>,
): TagSeverity | null {
  if (column.tagSeverity) return column.tagSeverity(value, rowData) as TagSeverity
  if (value) return column.trueSeverity === undefined ? 'success' : column.trueSeverity
  return column.falseSeverity === undefined ? 'danger' : column.falseSeverity
}
</script>

<template>
  <span v-if="value == null" class="w-cell-empty">&mdash;</span>

  <template v-else-if="column.type === 'image'">
    <img :src="String(value)" :alt="column.header" class="w-cell-image" />
  </template>

  <template v-else-if="column.type === 'boolean'">
    <span v-if="boolSeverity(column, value, rowData) === null" class="w-cell-neutral">
      {{ boolLabel(column, value, rowData) }}
    </span>
    <Tag
      v-else
      :value="boolLabel(column, value, rowData)"
      :severity="boolSeverity(column, value, rowData) as any"
      :class="['w-tag', `w-tag--${boolSeverity(column, value, rowData)}`]"
    />
  </template>

  <Tag
    v-else-if="isTagColumn(column)"
    :value="tagLabel(column, value, rowData)"
    :severity="tagSeverity(column, value, rowData) as any"
    :class="['w-tag', `w-tag--${tagSeverity(column, value, rowData)}`]"
  />

  <!-- `format` é o render próprio da célula e vence o formatador do tipo — é o que
       deixa uma coluna `currency` dizer "Grátis" ou uma `date` mostrar "hoje". -->
  <span v-else-if="column.type === 'date'" class="w-cell-date">
    {{ column.format ? column.format(value, rowData) : formatDate(value as string) }}
  </span>

  <span v-else-if="column.type === 'datetime'" class="w-cell-date">
    {{ column.format ? column.format(value, rowData) : formatDateTime(value as string) }}
  </span>

  <span v-else-if="column.type === 'currency'" class="w-cell-number">
    {{ column.format ? column.format(value, rowData) : formatCurrency(value as number) }}
  </span>

  <span v-else-if="column.type === 'number'" class="w-cell-number">
    {{
      column.format
        ? column.format(value, rowData)
        : formatNumber(value as number, column.decimals ?? 0)
    }}
  </span>

  <span v-else class="w-cell-text">
    {{ column.format ? column.format(value, rowData) : value }}
  </span>
</template>
