<script setup lang="ts">
import { ref } from 'vue'
import type { TabItem } from '@/types/tabs'

/**
 * Barra de abas de TELA (não confundir com as abas dentro de um markdown).
 *
 * Controlada: só emite `update:modelValue` — quem decide o que renderizar é a
 * página. Navegação por teclado com ←/→ (padrão ARIA de tablist).
 */
defineProps<{
  /** `value` da aba ativa. */
  modelValue: string
  items: TabItem[]
  /** Rótulo do grupo para leitores de tela. */
  ariaLabel?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const botoes = ref<HTMLButtonElement[]>([])

function registrar(el: unknown, indice: number): void {
  if (el instanceof HTMLButtonElement) botoes.value[indice] = el
}

function selecionar(item: TabItem): void {
  if (!item.disabled) emit('update:modelValue', item.value)
}

/** ←/→ andam entre as abas habilitadas, circulando nas pontas. */
function navegar(items: TabItem[], indice: number, passo: number): void {
  const total = items.length
  for (let salto = 1; salto <= total; salto += 1) {
    const alvo = (indice + passo * salto + total * total) % total
    if (!items[alvo].disabled) {
      emit('update:modelValue', items[alvo].value)
      botoes.value[alvo]?.focus()
      return
    }
  }
}
</script>

<template>
  <div class="w-tab-bar" role="tablist" :aria-label="ariaLabel">
    <button
      v-for="(item, indice) in items"
      :key="item.value"
      :ref="(el) => registrar(el, indice)"
      type="button"
      role="tab"
      class="w-tab-bar__item"
      :class="{ 'w-tab-bar__item--ativa': item.value === modelValue }"
      :aria-selected="item.value === modelValue"
      :tabindex="item.value === modelValue ? 0 : -1"
      :disabled="item.disabled"
      @click="selecionar(item)"
      @keydown.right.prevent="navegar(items, indice, 1)"
      @keydown.left.prevent="navegar(items, indice, -1)"
    >
      <i v-if="item.icon" :class="item.icon" aria-hidden="true" />
      <span>{{ item.label }}</span>
      <span v-if="item.badge !== undefined && item.badge !== null" class="w-tab-bar__badge">
        {{ item.badge }}
      </span>
    </button>
  </div>
</template>
