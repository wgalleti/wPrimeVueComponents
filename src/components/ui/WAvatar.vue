<script setup lang="ts">
import { computed } from 'vue'
import { initialsOf, toneOf } from '@/utils/initials'

/**
 * Avatar de pessoa: foto quando há `src`, senão as iniciais sobre uma cor estável do nome.
 * Sem nome nem foto vira o ícone de pessoa vazio (ex.: tarefa sem responsável).
 */
const props = withDefaults(
  defineProps<{
    /** Nome da pessoa; vira as iniciais, a cor e o texto alternativo. */
    name?: string | null
    /** Foto; quando existe, vence as iniciais. */
    src?: string | null
    size?: 'sm' | 'md'
  }>(),
  { name: null, src: null, size: 'md' },
)

const initials = computed(() => initialsOf(props.name))
const tone = computed(() => toneOf(props.name))
const empty = computed(() => !props.src && !initials.value)
</script>

<template>
  <span
    class="w-avatar"
    :class="[`w-avatar--${size}`, empty ? 'w-avatar--empty' : `w-avatar--tone-${tone}`]"
    role="img"
    :aria-label="name || 'Sem pessoa'"
  >
    <img v-if="src" class="w-avatar__img" :src="src" alt="" />
    <template v-else-if="initials">{{ initials }}</template>
    <i v-else class="pi pi-user" aria-hidden="true" />
  </span>
</template>
