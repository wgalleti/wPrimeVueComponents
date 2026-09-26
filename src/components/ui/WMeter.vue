<script setup lang="ts">
/**
 * Meta de painel: o realizado contra a meta, com o marcador de ritmo
 * ("onde deveria estar hoje"). Sem meta, mostra só o valor e "sem meta".
 * A severidade sai do ritmo quando não é informada.
 */
import { computed, onMounted, ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import { useFormatters } from '@/composables/useFormatters'
import { useInteractiveCard } from '@/utils/interactiveCard'
import { meterSeverity, type MeterSeverity } from '@/utils/meter'

const props = withDefaults(
  defineProps<{
    label: string
    /** Realizado até agora. */
    value: number
    /** Meta do período. `null`/0: sem barra, só o valor e "sem meta". */
    goal?: number | null
    /** Ritmo: onde o valor deveria estar hoje. Vira o marcador na barra. */
    expected?: number | null
    /** Formato de valor, meta e ritmo. */
    format?: 'currency' | 'number' | 'percent'
    /** `compact`: `R$ 1,2 mi`; `standard`: `R$ 1.234.567,00`. */
    notation?: 'compact' | 'standard'
    hint?: string
    /**
     * Cor da barra. Sem valor, sai do ritmo: success no ritmo (ou meta batida,
     * sem ritmo), warning até 10% abaixo do ritmo, danger abaixo disso; sem
     * ritmo e abaixo da meta, primary; sem meta, neutral.
     */
    severity?: MeterSeverity
    /** `compact`: menos respiro e valor menor (grade densa de metas). */
    size?: 'default' | 'compact'
    /** Destino ao clicar: vira RouterLink (exige vue-router instalado). */
    to?: RouteLocationRaw
  }>(),
  {
    goal: null,
    expected: null,
    format: 'number',
    notation: 'compact',
    size: 'default',
  },
)

const emit = defineEmits<{
  /** Clique ou Enter/Espaço. Com listener (ou `to`), o cartão fica focável. */
  click: [event: MouseEvent | KeyboardEvent]
}>()

const { binding } = useInteractiveCard((event) => emit('click', event))
/** Avaliado a cada render: o listener do pai pode entrar ou sair depois do mount. */
const root = () => binding(props.to)

const { formatCurrency, formatCurrencyCompact, formatNumber, formatNumberCompact } = useFormatters()

const decimals = (v: number) => (Number.isInteger(v) ? 0 : 1)

function fmt(v: number): string {
  const compact = props.notation === 'compact'
  if (props.format === 'currency') return compact ? formatCurrencyCompact(v) : formatCurrency(v)
  if (props.format === 'percent') return `${formatNumber(v, decimals(v))}%`
  return compact ? formatNumberCompact(v) : formatNumber(v, decimals(v))
}

const hasGoal = computed(() => props.goal != null && props.goal > 0)
const goal = computed(() => (hasGoal.value ? (props.goal as number) : 0))
/** Mesmo critério do meterSeverity: ritmo 0 (início do período) não é ritmo. */
const hasExpected = computed(() => hasGoal.value && props.expected != null && props.expected > 0)

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const fillRatio = computed(() => (hasGoal.value ? clamp01(props.value / goal.value) : 0))
const paceRatio = computed(() =>
  hasExpected.value ? clamp01((props.expected as number) / goal.value) : null,
)

/** Percentual atingido, arredondado para baixo: 99,6% não aparece como 100%. */
const percentText = computed(() => {
  if (!hasGoal.value) return ''
  // Arredonda o ruído de ponto flutuante antes do floor (0,29/1*100 = 28,999…).
  const pct = Math.floor(Math.round(((props.value * 100) / goal.value) * 1e6) / 1e6)
  return `${formatNumber(pct, 0)}%`
})

const valueText = computed(() => fmt(props.value))
const goalText = computed(() => (hasGoal.value ? fmt(goal.value) : ''))
const paceText = computed(() =>
  hasExpected.value ? `esperado hoje: ${fmt(props.expected as number)}` : '',
)
// O ritmo fica fora do valuetext: a única fonte dele é o span oculto logo
// depois da barra (lido também quando o cartão é botão e o meter vira texto).
const ariaValueText = computed(
  () => `${valueText.value} de ${goalText.value} (${percentText.value})`,
)

const tone = computed<MeterSeverity>(
  () =>
    props.severity ??
    meterSeverity({ value: props.value, goal: props.goal, expected: props.expected }),
)

// A barra nasce vazia e anima até o valor no primeiro quadro.
const ready = ref(false)
onMounted(() => requestAnimationFrame(() => (ready.value = true)))
</script>

<template>
  <component
    :is="root().is"
    v-bind="root().attrs"
    class="w-meter"
    :class="[
      `w-meter--${tone}`,
      { 'w-meter--compact': size === 'compact', 'w-meter--interactive': root().interactive },
    ]"
  >
    <div class="w-meter__header">
      <span class="w-meter__label">{{ label }}</span>
      <span v-if="hasGoal" class="w-meter__percent">{{ percentText }}</span>
    </div>

    <div class="w-meter__figures">
      <span class="w-meter__value">{{ valueText }}</span>
      <!-- espaço inicial: o texto lido/copiado é "R$ 1,2 mi de R$ 2 mi" (o gap é só visual) -->
      <span v-if="hasGoal" class="w-meter__goal">&#32;de {{ goalText }}</span>
      <span v-else class="w-meter__no-goal">&#32;sem meta</span>
    </div>

    <template v-if="hasGoal">
      <div
        class="w-meter__track"
        role="meter"
        :aria-label="label"
        aria-valuemin="0"
        :aria-valuemax="goal"
        :aria-valuenow="Math.min(Math.max(value, 0), goal)"
        :aria-valuetext="ariaValueText"
      >
        <div class="w-meter__fill" :style="{ '--w-meter-fill': ready ? fillRatio : 0 }" />
        <span
          v-if="paceRatio != null"
          class="w-meter__pace"
          :style="{ '--w-meter-pace': paceRatio }"
          :title="paceText"
          aria-hidden="true"
        />
      </div>
      <span v-if="paceText" class="w-meter__sr">{{ paceText }}</span>
    </template>

    <p v-if="hint || $slots.hint" class="w-meter__hint">
      <slot name="hint">{{ hint }}</slot>
    </p>
  </component>
</template>
