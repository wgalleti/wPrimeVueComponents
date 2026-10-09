<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { RouterLink } from 'vue-router'
import type { AttentionItem, AttentionItemClickEvent } from '@/types/attentionList'
import { hasListener } from '@/utils/interactiveCard'

/**
 * Pontos de atenção de uma tela operacional ("Sem anamnese · 100", "Lotadas · 2"): o que pede
 * ação, com a contagem e o atalho para o filtro ou a tela. A ordem é de quem chama — ponha o
 * que pede ação primeiro no topo.
 */
withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    items?: AttentionItem[]
    emptyMessage?: string
  }>(),
  { items: () => [], emptyMessage: 'Nada pedindo atenção agora.' },
)

const emit = defineEmits<{
  /** Clique numa linha. Com listener, cada linha vira botão de teclado. */
  'item-click': [event: AttentionItemClickEvent]
}>()

const instance = getCurrentInstance()
// Avaliado no render: o listener do pai pode entrar depois do mount.
const clicavel = () => hasListener(instance?.vnode.props, 'item-click')

function tag(item: AttentionItem) {
  if (item.to != null && item.to !== '') return RouterLink
  return clicavel() ? 'button' : 'div'
}

function attrs(item: AttentionItem, index: number) {
  if (item.to != null && item.to !== '')
    return { to: item.to, onClick: () => emit('item-click', { item, index }) }
  if (!clicavel()) return {}
  return {
    type: 'button',
    'aria-pressed': item.active ? 'true' : 'false',
    onClick: () => emit('item-click', { item, index }),
  }
}
</script>

<template>
  <section class="w-attention-list">
    <header v-if="title || subtitle || $slots.actions" class="w-attention-list__header">
      <div>
        <p v-if="title" class="w-attention-list__title">{{ title }}</p>
        <p v-if="subtitle" class="w-attention-list__subtitle">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </header>

    <ul v-if="items.length" class="w-attention-list__items">
      <li v-for="(item, index) in items" :key="item.key ?? index">
        <component
          :is="tag(item)"
          v-bind="attrs(item, index)"
          class="w-attention-list__item"
          :class="[
            `w-attention-list__item--${item.severity ?? 'neutral'}`,
            {
              'w-attention-list__item--active': item.active,
              'w-attention-list__item--interactive': tag(item) !== 'div',
            },
          ]"
        >
          <span class="w-attention-list__icon" aria-hidden="true"><i :class="item.icon" /></span>
          <span class="w-attention-list__text">
            <span class="w-attention-list__label">{{ item.label }}</span>
            <span v-if="item.hint" class="w-attention-list__hint">{{ item.hint }}</span>
          </span>
          <span v-if="item.value != null" class="w-attention-list__value">{{ item.value }}</span>
          <i
            v-if="tag(item) !== 'div'"
            class="pi pi-chevron-right w-attention-list__chevron"
            aria-hidden="true"
          />
        </component>
      </li>
    </ul>

    <p v-else class="w-attention-list__empty">
      <slot name="empty">{{ emptyMessage }}</slot>
    </p>
  </section>
</template>
