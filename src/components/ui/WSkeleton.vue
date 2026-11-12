<script setup lang="ts">
import { computed } from 'vue'
import Skeleton from 'primevue/skeleton'

/**
 * Esqueleto de chegada de dados, fino sobre o `Skeleton` do PrimeVue. Pareie com
 * `useDelayedLoading` para só aparecer em carregamento lento. Tamanhos por token `--w-skeleton-*`.
 */
const props = withDefaults(
  defineProps<{
    /** `rows`: n linhas de tabela; `card`: bloco de card; `text`: n linhas de parágrafo;
     *  `block`: um retângulo só (figura de painel, área de gráfico). */
    variant?: 'rows' | 'card' | 'text' | 'block'
    /** Quantidade de linhas (`rows` e `text`). */
    count?: number
    /** Altura nomeada (`block`; no `card` vira altura mínima): sm 3rem, md 6rem (KPI), lg a do
     *  gráfico. Tokens `--w-skeleton-block-*`. `block` sem `size` nem `height` = md. */
    size?: 'sm' | 'md' | 'lg'
    /** Altura própria, sempre por token (`'var(--w-chart-h)'`); vence `size`. */
    height?: string
    /** Largura própria, sempre por token; omitida ocupa a linha. */
    width?: string
  }>(),
  { variant: 'rows', count: 5, size: undefined, height: undefined, width: undefined },
)

const knobs = computed(() => ({
  '--w-skeleton-h': props.height,
  '--w-skeleton-w': props.width,
}))
</script>

<template>
  <div
    class="w-skeleton"
    :class="[`w-skeleton--${variant}`, size && `w-skeleton--${size}`]"
    :style="knobs"
    aria-hidden="true"
  >
    <Skeleton v-if="variant === 'block'" class="w-skeleton__bloco" />
    <template v-else-if="variant === 'card'">
      <Skeleton class="w-skeleton__titulo" />
      <Skeleton class="w-skeleton__linha" />
      <Skeleton class="w-skeleton__linha w-skeleton__linha--curta" />
    </template>
    <template v-else>
      <Skeleton
        v-for="n in count"
        :key="n"
        class="w-skeleton__linha"
        :class="{
          'w-skeleton__linha--curta': variant === 'text' && n === count && count > 1,
        }"
      />
    </template>
  </div>
</template>
