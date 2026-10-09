<script setup lang="ts">
import Button from 'primevue/button'

/**
 * Estado vazio: ícone (ou ilustração do produto pelo slot `illustration`), título, descrição e
 * ação opcional. `compact` cabe dentro de card ou painel lateral.
 */
withDefaults(
  defineProps<{
    icon?: string
    title: string
    description?: string
    actionLabel?: string
    actionIcon?: string
    compact?: boolean
  }>(),
  { icon: 'pi pi-inbox', compact: false },
)

const emit = defineEmits<{
  action: []
}>()

defineSlots<{
  /** Substitui o ícone: a arte do produto (SVG, imagem). */
  illustration?: () => unknown
}>()
</script>

<template>
  <div class="w-empty-state" :class="{ 'w-empty-state--compact': compact }">
    <div v-if="$slots.illustration" class="w-empty-state-illustration">
      <slot name="illustration" />
    </div>
    <div v-else class="w-empty-state-icon">
      <i :class="icon" />
    </div>
    <p class="w-empty-state-title">{{ title }}</p>
    <p v-if="description" class="w-empty-state-description">{{ description }}</p>
    <Button
      v-if="actionLabel"
      :label="actionLabel"
      :icon="actionIcon"
      size="small"
      class="w-empty-state-action"
      @click="emit('action')"
    />
  </div>
</template>
