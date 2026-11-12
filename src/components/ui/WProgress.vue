<script setup lang="ts">
import { computed } from 'vue'

/**
 * Progresso de carregamento (substitui `ProgressBar`). Sem `value` é indeterminado. Não é meta:
 * "realizado contra meta" é o `WMeter`. `strip` é o filete fino, para o topo de card ou tabela.
 */
const props = withDefaults(
  defineProps<{
    /** 0 a 100. Ausente: indeterminado. */
    value?: number
    /** Texto do leitor de tela e legenda da barra `bar`. */
    label?: string
    size?: 'bar' | 'strip'
  }>(),
  { size: 'bar' },
)

const pct = computed(() =>
  props.value === undefined ? undefined : Math.min(100, Math.max(0, props.value)),
)
const text = computed(() =>
  pct.value === undefined
    ? (props.label ?? 'Carregando')
    : `${props.label ? `${props.label}: ` : ''}${Math.round(pct.value)}%`,
)
</script>

<template>
  <div
    class="w-progress"
    :class="[`w-progress--${size}`, { 'w-progress--indeterminate': pct === undefined }]"
  >
    <div
      class="w-progress-track"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="pct === undefined ? undefined : Math.round(pct)"
      :aria-valuetext="text"
      :aria-label="label ?? 'Carregando'"
    >
      <div
        class="w-progress-fill"
        :style="pct === undefined ? undefined : { '--w-progress-value': pct / 100 }"
      />
    </div>
    <span v-if="size === 'bar' && label" class="w-progress-label">{{ text }}</span>
  </div>
</template>
