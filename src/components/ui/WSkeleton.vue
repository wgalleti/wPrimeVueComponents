<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

/**
 * Esqueleto de chegada de dados, fino sobre o `Skeleton` do PrimeVue. Pareie com
 * `useDelayedLoading` para só aparecer em carregamento lento. Tamanhos por token `--w-skeleton-*`.
 */
withDefaults(
  defineProps<{
    /** `rows`: n linhas de tabela; `card`: bloco de card; `text`: n linhas de parágrafo. */
    variant?: 'rows' | 'card' | 'text'
    /** Quantidade de linhas (`rows` e `text`). */
    count?: number
  }>(),
  { variant: 'rows', count: 5 },
)
</script>

<template>
  <div class="w-skeleton" :class="`w-skeleton--${variant}`" aria-hidden="true">
    <template v-if="variant === 'card'">
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
