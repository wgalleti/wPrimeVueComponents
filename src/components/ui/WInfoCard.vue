<script setup lang="ts">
import { useFormatters } from '@/composables/useFormatters'

export interface InfoField {
  label: string
  value: string | number | null | undefined
  format?: 'currency' | 'date' | 'datetime' | 'number' | 'text'
  /** Unidade colada ao valor — usada na variante `metric` (ex.: `ha`, `kg`, `L`). */
  suffix?: string
  /** Casas decimais do `format: 'number'` (default 2). */
  decimals?: number
}

withDefaults(
  defineProps<{
    title?: string
    fields: InfoField[]
    /** `default`: grade de rótulo em cima e valor embaixo.
     *  `metric`: uma linha por campo — rótulo à esquerda, número grande à
     *  direita, divisória entre as linhas (o aside "Resumo" de um documento). */
    variant?: 'default' | 'metric'
  }>(),
  { variant: 'default' },
)

const { formatCurrency, formatDate, formatNumber } = useFormatters()

function formatValue(field: InfoField): string {
  const v = field.value
  if (v == null || v === '') return '-'
  if (field.format === 'currency') return formatCurrency(Number(v))
  if (field.format === 'date') return formatDate(String(v))
  if (field.format === 'datetime') return formatDate(String(v), 'DD/MM/YYYY HH:mm')
  if (field.format === 'number') return formatNumber(Number(v), field.decimals ?? 2)
  return String(v)
}
</script>

<template>
  <div class="w-info-card" :class="`w-info-card--${variant}`">
    <h3 v-if="title" class="w-info-card-title">{{ title }}</h3>

    <div v-if="variant === 'metric'" class="w-info-card-metrics">
      <div v-for="field in fields" :key="field.label" class="w-info-card-metric">
        <span class="w-info-card-metric-label">{{ field.label }}</span>
        <span class="w-info-card-metric-value">{{ formatValue(field) }}</span>
        <span v-if="field.suffix" class="w-info-card-metric-suffix">{{ field.suffix }}</span>
      </div>
    </div>

    <div v-else class="w-info-card-grid">
      <div v-for="field in fields" :key="field.label" class="w-info-card-field">
        <span class="w-info-card-label">{{ field.label }}</span>
        <span class="w-info-card-value">{{ formatValue(field) }}</span>
      </div>
    </div>
  </div>
</template>
