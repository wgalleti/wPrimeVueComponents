<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import WStatusTag from './WStatusTag.vue'

const props = defineProps<{
  title: string
  subtitle?: string
  icon?: string
  backRoute?: string
  backTo?: string | Record<string, unknown>
  status?: string
  statusMap?: Record<string, { label: string; severity: string }>
}>()

const router = useRouter()

function goBack() {
  if (props.backTo) {
    router.push(typeof props.backTo === 'string' ? { name: props.backTo } : props.backTo)
  } else if (props.backRoute) {
    router.push({ name: props.backRoute })
  } else {
    router.back()
  }
}
</script>

<template>
  <div class="w-detail-header">
    <div class="w-detail-header-left">
      <Button icon="pi pi-arrow-left" text rounded @click="goBack" />
      <i v-if="icon" :class="icon" class="w-detail-header-icon" />
      <div class="w-detail-header-content">
        <h2 class="w-detail-header-title">{{ title }}</h2>
        <p v-if="subtitle" class="w-detail-header-subtitle">{{ subtitle }}</p>
      </div>
      <WStatusTag v-if="status" :value="status" :map="statusMap" />
    </div>
    <div class="w-detail-header-actions">
      <slot name="actions" />
    </div>
  </div>
</template>
