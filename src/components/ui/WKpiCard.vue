<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

defineProps<{
  label: string
  value: string | number
  icon?: string
  hint?: string
  severity?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  trend?: {
    value: string
    direction?: 'up' | 'down' | 'neutral'
  }
  loading?: boolean
}>()
</script>

<template>
  <article class="w-kpi-card" :class="severity ? `w-kpi-card--${severity}` : ''">
    <template v-if="loading">
      <div class="w-kpi-card__loading">
        <Skeleton shape="circle" size="2.75rem" />
        <div class="w-kpi-card__loading-content">
          <Skeleton width="6rem" height="0.75rem" />
          <Skeleton width="7.5rem" height="1.5rem" />
          <Skeleton width="5rem" height="0.75rem" />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="w-kpi-card__header">
        <div v-if="icon || $slots.icon" class="w-kpi-card__icon">
          <slot name="icon">
            <i v-if="icon" :class="icon" />
          </slot>
        </div>
        <div v-if="trend || $slots.trend" class="w-kpi-card__trend">
          <slot name="trend">
            <span
              v-if="trend"
              class="w-kpi-card__trend-badge"
              :class="trend.direction ? `w-kpi-card__trend-badge--${trend.direction}` : ''"
            >
              {{ trend.value }}
            </span>
          </slot>
        </div>
      </div>

      <div class="w-kpi-card__content">
        <p class="w-kpi-card__label">{{ label }}</p>
        <div class="w-kpi-card__value">
          <slot name="value">{{ value }}</slot>
        </div>
        <p v-if="hint || $slots.hint" class="w-kpi-card__hint">
          <slot name="hint">{{ hint }}</slot>
        </p>
      </div>

      <footer v-if="$slots.footer" class="w-kpi-card__footer">
        <slot name="footer" />
      </footer>
    </template>
  </article>
</template>
