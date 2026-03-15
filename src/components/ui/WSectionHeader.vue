<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  icon?: string
  compact?: boolean
}>()
</script>

<template>
  <div class="w-section-header" :class="{ 'w-section-header--compact': compact }">
    <div class="w-section-header__main">
      <div v-if="icon || $slots.icon" class="w-section-header__icon">
        <slot name="icon">
          <i v-if="icon" :class="icon" />
        </slot>
      </div>
      <div class="w-section-header__content">
        <div class="w-section-header__title-row">
          <h3 class="w-section-header__title">{{ title }}</h3>
          <slot name="meta" />
        </div>
        <p v-if="subtitle" class="w-section-header__subtitle">{{ subtitle }}</p>
      </div>
    </div>
    <div v-if="$slots.actions" class="w-section-header__actions">
      <slot name="actions" />
    </div>
  </div>
</template>
