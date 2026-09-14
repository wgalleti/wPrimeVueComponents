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
  <span v-if="value == null" class="text-muted-color text-xs">&mdash;</span>

  <template v-else-if="column.type === 'image'">
    <img
      :src="String(value)"
      :alt="column.header"
      class="size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    />
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

  <span v-else-if="column.type === 'date'" class="text-muted-color tabular-nums text-[0.8125rem]">
    {{ formatDate(value as string) }}
  </span>

  <span
    v-else-if="column.type === 'datetime'"
    class="text-muted-color tabular-nums text-[0.8125rem]"
  >
    {{ formatDateTime(value as string) }}
  </span>

  <span v-else-if="column.type === 'currency'" class="font-semibold tabular-nums text-[0.8125rem]">
    {{ formatCurrency(value as number) }}
  </span>

  <span v-else-if="column.type === 'number'" class="font-semibold tabular-nums text-[0.8125rem]">
    {{
      column.format
        ? column.format(value, rowData)
        : formatNumber(value as number, column.decimals ?? 0)
    }}
  </span>

  <span v-else class="text-[0.8125rem]">
    {{ column.format ? column.format(value, rowData) : value }}
  </span>
</template>
