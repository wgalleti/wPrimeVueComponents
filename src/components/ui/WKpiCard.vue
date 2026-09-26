<script setup lang="ts">
import { computed } from 'vue'
import Skeleton from 'primevue/skeleton'
import type { RouteLocationRaw } from 'vue-router'

import { useInteractiveCard } from '@/utils/interactiveCard'
import { SPARK_H, SPARK_W, sparklineGeometry } from '@/utils/sparkline'

const props = withDefaults(
  defineProps<{
    label: string
    value: string | number
    icon?: string
    hint?: string
    severity?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    trend?: {
      value: string
      direction?: 'up' | 'down' | 'neutral'
    }
    loading?: boolean
    /**
     * Destino ao clicar: o card vira um RouterLink (exige vue-router instalado).
     * Sem `to`, um listener de `@click` torna o card um botão de teclado.
     */
    to?: RouteLocationRaw
    /**
     * Série da sparkline (ordem cronológica). Desenhada na cor da severidade,
     * decorativa (aria-hidden) — o número que importa é o `value`. Pontos
     * NaN/null são descartados.
     */
    spark?: number[]
    /** `compact`: menos respiro, ícone menor ao lado do rótulo, valor menor. */
    size?: 'default' | 'compact'
  }>(),
  { size: 'default' },
)

const emit = defineEmits<{
  /** Clique ou Enter/Espaço no card. Com listener (ou `to`), o card fica focável. */
  click: [event: MouseEvent | KeyboardEvent]
}>()

const { binding } = useInteractiveCard((event) => emit('click', event))
/** Avaliado a cada render: o listener do pai pode entrar ou sair depois do mount. */
const root = () => binding(props.to)
const spark = computed(() => sparklineGeometry(props.spark))
const compact = computed(() => props.size === 'compact')
</script>

<template>
  <component
    :is="root().is"
    v-bind="root().attrs"
    class="w-kpi-card"
    :class="[
      severity ? `w-kpi-card--${severity}` : '',
      { 'w-kpi-card--compact': compact, 'w-kpi-card--interactive': root().interactive },
    ]"
  >
    <template v-if="loading">
      <div class="w-kpi-card__loading">
        <Skeleton shape="circle" size="2.75rem" />
        <div class="w-kpi-card__loading-content">
          <Skeleton width="6rem" height="0.75rem" />
          <Skeleton width="7.5rem" height="1.5rem" />
          <Skeleton width="5rem" height="0.75rem" />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="w-kpi-card__header">
        <div v-if="icon || $slots.icon" class="w-kpi-card__icon">
          <slot name="icon">
            <i v-if="icon" :class="icon" />
          </slot>
        </div>
        <p v-if="compact" class="w-kpi-card__label">{{ label }}</p>
        <div v-if="trend || $slots.trend" class="w-kpi-card__trend">
          <slot name="trend">
            <span
              v-if="trend"
              class="w-kpi-card__trend-badge"
              :class="trend.direction ? `w-kpi-card__trend-badge--${trend.direction}` : ''"
            >
              {{ trend.value }}
            </span>
          </slot>
        </div>
      </div>

      <div class="w-kpi-card__content">
        <p v-if="!compact" class="w-kpi-card__label">{{ label }}</p>
        <div class="w-kpi-card__value">
          <slot name="value">{{ value }}</slot>
        </div>
        <p v-if="hint || $slots.hint" class="w-kpi-card__hint">
          <slot name="hint">{{ hint }}</slot>
        </p>
      </div>

      <svg
        v-if="spark"
        class="w-kpi-card__spark"
        :viewBox="`0 0 ${SPARK_W} ${SPARK_H}`"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <polygon class="w-kpi-card__spark-area" :points="spark.area" />
        <polyline
          class="w-kpi-card__spark-line"
          :points="spark.line"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <footer v-if="$slots.footer" class="w-kpi-card__footer">
        <slot name="footer" />
      </footer>
    </template>
  </component>
</template>
