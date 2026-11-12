<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUrlState } from '@/composables/useUrlState'
import type { TabItem } from '@/types/tabs'

/**
 * Barra de abas de TELA (não confundir com as abas dentro de um markdown).
 *
 * Controlada: só emite `update:modelValue` — quem decide o que renderizar é a
 * página. Navegação por teclado com ←/→ (padrão ARIA de tablist).
 */
const props = defineProps<{
  /** `value` da aba ativa. */
  modelValue: string
  items: TabItem[]
  /** Rótulo do grupo para leitores de tela. */
  ariaLabel?: string
  /** Liga o `v-model` à query `?<urlKey>=` (`router.replace`): a aba sobrevive ao F5 e às abas
   *  de rota. Valor fora dos `items` (ou de aba desabilitada) cai na aba inicial; essa aba (o
   *  `modelValue` da montagem) fica fora da URL. Exige `vue-router`; sem ele, avisa em dev. */
  urlKey?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Aba inicial = padrão: não vai para a URL. Lida da query antes de qualquer render.
const urlSync = props.urlKey ? useUrlState() : null
const padrao = props.modelValue
if (urlSync && props.urlKey) {
  const url = urlSync.get(props.urlKey)
  const alvo = props.items.find((i) => i.value === url && !i.disabled)
  if (alvo && alvo.value !== props.modelValue) emit('update:modelValue', alvo.value)
  else if (url !== undefined && !alvo) urlSync.write({ [props.urlKey]: null })
  watch(
    () => props.modelValue,
    (v) => urlSync.write({ [props.urlKey as string]: v === padrao ? null : v }),
  )
}

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
