<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  title: string
  subtitle?: string
  actionLabel?: string
  actionIcon?: string
}>()

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="w-page-header">
    <div class="w-page-header-content">
      <h2 class="w-page-header-title">{{ title }}</h2>
      <p v-if="subtitle" class="w-page-header-subtitle">{{ subtitle }}</p>
    </div>
    <div class="w-page-header-actions">
      <slot name="actions" />
      <Button
        v-if="actionLabel"
        :label="actionLabel"
        :icon="actionIcon"
        @click="emit('action')"
      />
    </div>
  </div>
</template>
