<script setup lang="ts">
import { computed } from 'vue'

interface ProgressStep {
  key: string
  label: string
  description?: string
}

const props = withDefaults(
  defineProps<{
    steps: ProgressStep[]
    currentStep: string
    orientation?: 'horizontal' | 'vertical'
  }>(),
  {
    orientation: 'horizontal',
  },
)

const currentIndex = computed(() =>
  props.steps.findIndex((step) => step.key === props.currentStep),
)

function stepState(index: number) {
  if (index < currentIndex.value) return 'done'
  if (index === currentIndex.value) return 'current'
  return 'pending'
}
</script>

<template>
  <div class="w-progress-flow" :class="`w-progress-flow--${orientation}`">
    <div
      v-for="(step, index) in steps"
      :key="step.key"
      class="w-progress-flow__step"
      :class="`w-progress-flow__step--${stepState(index)}`"
    >
      <slot name="step" :step="step" :index="index" :state="stepState(index)">
        <div class="w-progress-flow__marker">
          <span>{{ index + 1 }}</span>
        </div>
        <div class="w-progress-flow__content">
          <p class="w-progress-flow__label">{{ step.label }}</p>
          <p v-if="step.description" class="w-progress-flow__description">{{ step.description }}</p>
        </div>
      </slot>
    </div>
  </div>
</template>
