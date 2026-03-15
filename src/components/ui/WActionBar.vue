<script setup lang="ts">
withDefaults(
  defineProps<{
    align?: 'between' | 'start' | 'end'
    stackOnMobile?: boolean
  }>(),
  {
    align: 'between',
    stackOnMobile: true,
  },
)
</script>

<template>
  <div
    class="w-action-bar"
    :class="[
      `w-action-bar--${align}`,
      { 'w-action-bar--stack': stackOnMobile },
    ]"
  >
    <div v-if="$slots.primary || $slots.default" class="w-action-bar__primary">
      <slot name="primary">
        <slot />
      </slot>
    </div>
    <div v-if="$slots.filters" class="w-action-bar__filters">
      <slot name="filters" />
    </div>
    <div v-if="$slots.secondary" class="w-action-bar__secondary">
      <slot name="secondary" />
    </div>
  </div>
</template>
