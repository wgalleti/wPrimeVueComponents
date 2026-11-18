<script setup lang="ts">
import { computed } from 'vue'
import Skeleton from 'primevue/skeleton'
import type { RouteLocationRaw } from 'vue-router'

import { useDelayedLoading } from '@/composables/useDelayedLoading'
import { useLoaderConfig } from '@/composables/useLoaderConfig'
import { useInteractiveCard } from '@/utils/interactiveCard'
import { SPARK_H, SPARK_W, sparklineGeometry } from '@/utils/sparkline'
import WLoader from './WLoader.vue'

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
    /**
     * `compact`: menos respiro, ícone menor ao lado do rótulo, valor menor. `hero`: o número manda
     * — valor maior com o `trend` na mesma linha, sparkline mais alta e ícone sempre em linha
     * (`iconStyle="inline"`). No `WKpiGrid` o herói ocupa duas colunas.
     */
    size?: 'default' | 'compact' | 'hero'
    /**
     * Como o ícone aparece: `tile` (padrão) no quadrado tonal; `inline` pequeno, sem fundo, ao lado
     * do rótulo, na cor do tom (ou `--w-fg-muted` sem `severity`). Em `hero` é sempre `inline`.
     */
    iconStyle?: 'tile' | 'inline'
    /** Card usado como filtro e aplicado agora: destaca e anuncia `aria-pressed`. */
    active?: boolean
    /**
     * O que o tom da severidade pinta: `icon` (padrão) só o ícone; `value` também o
     * número — para o KPI cujo valor já é o alerta (atraso, saldo negativo).
     */
    tint?: 'icon' | 'value'
  }>(),
  { size: 'default', iconStyle: 'tile', tint: 'icon' },
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
const hero = computed(() => props.size === 'hero')
const inlineIcon = computed(() => hero.value || props.iconStyle === 'inline')
/** Ícone em linha ou compacto: o rótulo sobe para o cabeçalho, ao lado do ícone. */
const labelInHeader = computed(() => compact.value || inlineIcon.value)

/**
 * Com loader de marca configurado o conteúdo segue em tela durante a carga (a altura é a dele) e,
 * passado o `delay`, um véu com o WLoader cobre o card até `minDuration`. Sem config: esqueleto.
 */
const loader = useLoaderConfig()
const { showSkeleton } = useDelayedLoading(() => !!loader && !!props.loading, {
  delay: loader?.delay,
  minDuration: loader?.minDuration,
})
const esqueleto = computed(() => !loader && props.loading)

/** Sob o véu o card não age: engole clique (inclusive o de RouterLink) e Enter/Espaço antes de o root vê-los. */
function bloquear(event: MouseEvent | KeyboardEvent) {
  if (!showSkeleton.value) return
  if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  event.stopPropagation()
}
</script>

<template>
  <component
    :is="root().is"
    v-bind="root().attrs"
    class="w-kpi-card"
    :class="[
      severity ? `w-kpi-card--${severity}` : '',
      {
        'w-kpi-card--compact': compact,
        'w-kpi-card--hero': hero,
        'w-kpi-card--icon-inline': inlineIcon,
        'w-kpi-card--interactive': root().interactive,
        'w-kpi-card--active': active,
        'w-kpi-card--tint-value': tint === 'value',
        'w-kpi-card--brand-loader': loader,
      },
    ]"
    :aria-busy="showSkeleton ? 'true' : undefined"
    :aria-pressed="root().is === 'div' ? (active ? 'true' : 'false') : undefined"
    @click.capture="bloquear"
    @keydown.capture="bloquear"
  >
    <template v-if="esqueleto">
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
        <p v-if="labelInHeader" class="w-kpi-card__label">{{ label }}</p>
        <div v-if="!hero && (trend || $slots.trend)" class="w-kpi-card__trend">
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
        <p v-if="!labelInHeader" class="w-kpi-card__label">{{ label }}</p>
        <!-- Fora do herói o wrapper some do layout (display: contents); no herói alinha valor e trend pela base. -->
        <div class="w-kpi-card__figure">
          <div class="w-kpi-card__value">
            <slot name="value">{{ value }}</slot>
          </div>
          <div v-if="hero && (trend || $slots.trend)" class="w-kpi-card__trend">
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

    <div v-if="showSkeleton" class="w-kpi-card__veil">
      <WLoader size="sm" />
    </div>
  </component>
</template>
