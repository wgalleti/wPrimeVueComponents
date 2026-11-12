<script setup lang="ts">
import { computed } from 'vue'

/**
 * Aviso em linha (substitui `Message`). `danger` e `warn` anunciam na hora (`role="alert"`);
 * `info` e `success` esperam a vez (`role="status"`). `closable` emite `close`: quem dispensa
 * o aviso é o consumidor.
 */
const props = withDefaults(
  defineProps<{
    severity?: 'info' | 'warn' | 'danger' | 'success'
    title?: string
    closable?: boolean
    /** Rótulo do botão de fechar. */
    closeLabel?: string
  }>(),
  { severity: 'info', closable: false, closeLabel: 'Fechar aviso' },
)

const emit = defineEmits<{
  close: []
}>()

defineSlots<{
  default?: () => unknown
}>()

const role = computed(() =>
  props.severity === 'danger' || props.severity === 'warn' ? 'alert' : 'status',
)
</script>

<template>
  <div class="w-notice" :class="`w-notice--${severity}`" :role="role">
    <div class="w-notice-body">
      <p v-if="title" class="w-notice-title">{{ title }}</p>
      <div class="w-notice-text"><slot /></div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="w-notice-close"
      :aria-label="closeLabel"
      @click="emit('close')"
    >
      <i class="pi pi-times" aria-hidden="true" />
    </button>
  </div>
</template>
