<script setup lang="ts">
import { useFormatters } from '@/composables/useFormatters'

export interface InfoField {
  label: string
  value: string | number | null | undefined
  format?: 'currency' | 'date' | 'datetime' | 'number' | 'text'
}

defineProps<{
  title?: string
  fields: InfoField[]
}>()

const { formatCurrency, formatDate, formatNumber } = useFormatters()

function formatValue(field: InfoField): string {
  const v = field.value
  if (v == null || v === '') return '-'
  if (field.format === 'currency') return formatCurrency(Number(v))
  if (field.format === 'date') return formatDate(String(v))
  if (field.format === 'datetime') return formatDate(String(v), 'DD/MM/YYYY HH:mm')
  if (field.format === 'number') return formatNumber(Number(v))
  return String(v)
}
</script>

<template>
  <div class="w-info-card">
    <h3 v-if="title" class="w-info-card-title">{{ title }}</h3>
    <div class="w-info-card-grid">
      <div v-for="field in fields" :key="field.label" class="w-info-card-field">
        <span class="w-info-card-label">{{ field.label }}</span>
        <span class="w-info-card-value">{{ formatValue(field) }}</span>
      </div>
    </div>
  </div>
</template>
