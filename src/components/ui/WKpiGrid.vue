<script setup lang="ts">
import { computed } from 'vue'

import type { KpiItem } from '@/types/crud'
import WKpiCard from './WKpiCard.vue'

const props = withDefaults(
  defineProps<{
    items?: KpiItem[]
    /**
     * Número fixo de colunas (2–6) ou 'auto' para preencher a largura com quantos
     * KPIs couberem (responsivo, sem overflow). Use 'auto' em dashboards que devem
     * aproveitar o máximo da tela.
     */
    columns?: 2 | 3 | 4 | 5 | 6 | 'auto'
    dense?: boolean
  }>(),
  {
    items: () => [],
    columns: 4,
    dense: false,
  },
)

const gridClass = computed(() => [
  props.columns === 'auto' ? 'w-kpi-grid--auto' : `w-kpi-grid--cols-${props.columns}`,
  { 'w-kpi-grid--dense': props.dense },
])
</script>

<template>
  <div class="w-kpi-grid" :class="gridClass">
    <template v-if="$slots.item">
      <slot
        v-for="(item, index) in items"
        :key="index"
        name="item"
        :item="item"
        :index="index"
      />
    </template>
    <template v-else>
      <WKpiCard
        v-for="(item, index) in items"
        :key="index"
        :label="item.label"
        :value="item.value"
        :icon="item.icon"
        :severity="item.severity || 'primary'"
        :hint="item.hint"
        :trend="item.trend"
        :loading="item.loading"
      />
    </template>
  </div>
</template>
