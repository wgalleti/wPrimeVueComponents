<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

import type { KpiItem, KpiItemClickEvent } from '@/types/kpi'
import { hasListener } from '@/utils/interactiveCard'
import WKpiCard from './WKpiCard.vue'

const props = withDefaults(
  defineProps<{
    items?: KpiItem[]
    /**
     * Número fixo de colunas (2–6) ou 'auto': a grade escolhe, pela própria
     * largura, um número de colunas que fecha as linhas (4 KPIs: 4, 2×2 ou 1 —
     * nunca 3 + 1). Use 'auto' em dashboards que devem aproveitar a largura.
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
  hasItemClick() && item.interactive !== false
    ? { click: () => emit('item-click', { item, index }) }
    : {}

const cardSize = (item: KpiItem) => item.size ?? props.size ?? (props.dense ? 'compact' : 'default')

/* Até 8 itens o auto segue os degraus de ui.css (colunas que fecham a linha);
   acima disso não há degrau e a grade volta ao auto-fit pelo piso --w-kpi-min. */
const STEPPED_MAX = 8
const dataCount = computed(() =>
  props.columns === 'auto' && props.items.length <= STEPPED_MAX ? props.items.length : undefined,
)

const gridClass = computed(() => [
  props.columns === 'auto' ? 'w-kpi-grid--auto' : `w-kpi-grid--cols-${props.columns}`,
  { 'w-kpi-grid--dense': props.dense },
])
</script>

<template>
  <div class="w-kpi-grid" :class="gridClass" :data-count="dataCount">
    <!-- Trilho: em 'auto' é ele a grade (a raiz vira o contêiner que ele consulta);
         nas colunas fixas é display: contents e os cards seguem filhos da grade. -->
    <div class="w-kpi-grid__track">
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
          :active="item.active"
          :tint="item.tint"
          v-on="cardListeners(item, index)"
        />
      </template>
    </div>
  </div>
</template>
