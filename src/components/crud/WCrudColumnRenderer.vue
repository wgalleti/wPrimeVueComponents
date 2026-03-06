<script setup lang="ts">
import Tag from 'primevue/tag'
import type { ColumnDef } from '@/types/crud'
import { useFormatters } from '@/composables/useFormatters'

defineProps<{
  column: ColumnDef
  value: unknown
  rowData: Record<string, unknown>
}>()

const { formatDate, formatDateTime, formatCurrency, formatNumber } = useFormatters()
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
    <Tag
      :value="column.tagValue ? column.tagValue(value, rowData) : (value ? 'Ativo' : 'Inativo')"
      :severity="(column.tagSeverity ? column.tagSeverity(value, rowData) : (value ? 'success' : 'danger')) as any"
      class="text-xs"
    />
  </template>

  <span v-else-if="column.type === 'date'" class="text-muted-color tabular-nums text-[0.8125rem]">
    {{ formatDate(value as string) }}
  </span>

  <span v-else-if="column.type === 'datetime'" class="text-muted-color tabular-nums text-[0.8125rem]">
    {{ formatDateTime(value as string) }}
  </span>

  <span v-else-if="column.type === 'currency'" class="font-semibold tabular-nums text-[0.8125rem]">
    {{ formatCurrency(value as number) }}
  </span>

  <span v-else-if="column.type === 'number'" class="font-semibold tabular-nums text-[0.8125rem]">
    {{ column.format ? column.format(value, rowData) : formatNumber(value as number, column.decimals ?? 0) }}
  </span>

  <span v-else class="text-[0.8125rem]">
    {{ column.format ? column.format(value, rowData) : value }}
  </span>
</template>
