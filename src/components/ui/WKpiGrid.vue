<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

import type { KpiItem, KpiItemClickEvent } from '@/types/kpi'
import { hasListener } from '@/utils/interactiveCard'
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
    /**
     * Grade densa: vão menor entre os cards e, sem `size` na grade nem no
     * item, cards no tamanho `compact`.
     */
    dense?: boolean
    /**
     * Tamanho de todos os cards. Precedência: `item.size` → `size` da grade →
     * `dense` (compact) → default.
     */
    size?: 'default' | 'compact'
  }>(),
  {
    items: () => [],
    columns: 4,
    dense: false,
  },
)

const emit = defineEmits<{
  /** Clique (ou Enter/Espaço) num card. Com listener, os cards ficam focáveis. */
  'item-click': [event: KpiItemClickEvent]
}>()

const instance = getCurrentInstance()
/** O card só vira botão quando o pai ouve `item-click` — senão fica estático. */
const hasItemClick = () => hasListener(instance?.vnode.props, 'item-click')

const cardListeners = (item: KpiItem, index: number) =>
  hasItemClick() ? { click: () => emit('item-click', { item, index }) } : {}

const cardSize = (item: KpiItem) => item.size ?? props.size ?? (props.dense ? 'compact' : 'default')

const gridClass = computed(() => [
  props.columns === 'auto' ? 'w-kpi-grid--auto' : `w-kpi-grid--cols-${props.columns}`,
  { 'w-kpi-grid--dense': props.dense },
])
</script>

<template>
  <div class="w-kpi-grid" :class="gridClass">
    <template v-if="$slots.item">
      <slot v-for="(item, index) in items" :key="index" name="item" :item="item" :index="index" />
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
        :to="item.to"
        :spark="item.spark"
        :size="cardSize(item)"
        v-on="cardListeners(item, index)"
      />
    </template>
  </div>
</template>
