<script setup lang="ts">
import { computed } from 'vue'
import { useDelayedLoading } from '@/composables/useDelayedLoading'
import {
  LOADER_DEFAULT_DELAY,
  LOADER_DEFAULT_MIN_DURATION,
  useLoaderConfig,
} from '@/composables/useLoaderConfig'

/**
 * Indicador de carregamento. Com `loader` na configuração do plugin é a imagem animada da marca
 * (quadro parado com `prefers-reduced-motion`, sem JS); sem ele, um anel neutro em CSS puro.
 * Sem `loading` só desenha: quem decide quando aparecer é o pai. Com `loading` (true/false) a própria
 * peça aplica `delay`/`minDuration` do `loader` (padrões 300/500) e não renderiza nada fora disso.
 */
const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    /** Texto só para leitor de tela. */
    label?: string
    /** Véu sobre o cartão: absoluto, cobre o ancestral posicionado (`position: relative`). */
    overlay?: boolean
    /** Ausente: sempre desenha. true/false: aparece só depois do atraso e fica o mínimo. */
    loading?: boolean
  }>(),
  { size: 'md', label: 'Carregando', overlay: false, loading: undefined },
)

const loader = useLoaderConfig()
const { showSkeleton } = useDelayedLoading(() => props.loading === true, {
  delay: loader?.delay ?? LOADER_DEFAULT_DELAY,
  minDuration: loader?.minDuration ?? LOADER_DEFAULT_MIN_DURATION,
})
const visible = computed(() => props.loading === undefined || showSkeleton.value)
</script>

<template>
  <span
    v-if="visible"
    class="w-loader"
    :class="[`w-loader--${size}`, { 'w-loader--overlay': overlay }]"
    role="status"
  >
    <picture v-if="loader" class="w-loader__media">
      <source v-if="loader.still" media="(prefers-reduced-motion: reduce)" :srcset="loader.still" />
      <img
        class="w-loader__img"
        :src="loader.src"
        :srcset="loader.srcset"
        alt=""
        decoding="async"
      />
    </picture>
    <span v-else class="w-loader__ring" aria-hidden="true" />
    <span class="w-loader__label">{{ label }}</span>
  </span>
</template>
