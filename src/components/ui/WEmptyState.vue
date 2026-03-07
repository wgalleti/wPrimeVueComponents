<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  icon: string
  title: string
  description?: string
  actionLabel?: string
  actionIcon?: string
}>()

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="w-empty-state">
    <div class="w-empty-state-icon">
      <i :class="icon" />
    </div>
    <p class="w-empty-state-title">{{ title }}</p>
    <p v-if="description" class="w-empty-state-description">{{ description }}</p>
    <Button
      v-if="actionLabel"
      :label="actionLabel"
      :icon="actionIcon"
      size="small"
      class="mt-3"
      @click="emit('action')"
    />
  </div>
</template>
