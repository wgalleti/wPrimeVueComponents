<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  variant?: 'default' | 'muted' | 'outlined'
}>()
</script>

<template>
  <section class="w-form-section" :class="variant ? `w-form-section--${variant}` : ''">
    <div v-if="title || description || $slots.actions" class="w-form-section__header">
      <div class="w-form-section__content">
        <h3 class="w-form-section__title">{{ title }}</h3>
        <p v-if="description" class="w-form-section__description">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="w-form-section__actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="w-form-section__body">
      <slot />
    </div>
  </section>
</template>
