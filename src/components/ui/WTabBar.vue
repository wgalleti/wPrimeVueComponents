<script setup lang="ts">
import { ref, watch } from 'vue'
import Select from 'primevue/select'
import { useBreakpoint } from '@/composables/useBreakpoint'
import { useUrlState } from '@/composables/useUrlState'
import type { TabItem } from '@/types/tabs'

/**
 * Barra de abas de TELA (não confundir com as abas dentro de um markdown).
 *
 * Controlada: só emite `update:modelValue` — quem decide o que renderizar é a
 * página. Navegação por teclado com ←/→ (padrão ARIA de tablist). No celular
 * (< 600px, `useBreakpoint().isCelular`) as abas viram um Select com as mesmas
 * opções — a barra que quebra linha comia a tela. `isCelular` só vale depois da
 * montagem, então o primeiro render é sempre a barra.
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

const { isCelular } = useBreakpoint()

const botoes = ref<HTMLButtonElement[]>([])

function registrar(el: unknown, indice: number): void {
  if (el instanceof HTMLButtonElement) botoes.value[indice] = el
}

const itemDe = (value: string): TabItem | undefined => props.items.find((i) => i.value === value)
const temBadge = (item?: TabItem): boolean => item?.badge !== undefined && item?.badge !== null

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
  <Select
    v-if="isCelular"
    class="w-tab-bar-select"
    :model-value="modelValue"
    :options="items"
    option-label="label"
    option-value="value"
    option-disabled="disabled"
    :aria-label="ariaLabel"
    @update:model-value="(v: string | null) => v != null && emit('update:modelValue', v)"
  >
    <template #value="{ value }">
      <span class="w-tab-bar__item-content">
        <i v-if="itemDe(value)?.icon" :class="itemDe(value)?.icon" aria-hidden="true" />
        <span>{{ itemDe(value)?.label }}</span>
        <span v-if="temBadge(itemDe(value))" class="w-tab-bar__badge">{{
          itemDe(value)?.badge
        }}</span>
      </span>
    </template>
    <template #option="{ option }">
      <span class="w-tab-bar__item-content">
        <i v-if="option.icon" :class="option.icon" aria-hidden="true" />
        <span>{{ option.label }}</span>
        <span v-if="temBadge(option)" class="w-tab-bar__badge">{{ option.badge }}</span>
      </span>
    </template>
  </Select>
  <div v-else class="w-tab-bar" role="tablist" :aria-label="ariaLabel">
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
      <span v-if="temBadge(item)" class="w-tab-bar__badge">
        {{ item.badge }}
      </span>
    </button>
  </div>
</template>
