<script setup lang="ts">
import { computed } from 'vue'
import type { CheckListItem, CheckListLevel } from '@/types/checkList'

/**
 * Lista de verificações de um documento (o aside "Verificações"): um ícone por
 * nível e o contador `N/M` de quantas passaram, no cabeçalho.
 *
 * A avaliação é sempre do backend/serviço — o componente só desenha o que
 * recebe. Ele não conhece regra de negócio nenhuma.
 */
const props = withDefaults(
  defineProps<{
    title?: string
    items?: CheckListItem[]
    /** Esconde o contador `N/M` do cabeçalho. */
    showCount?: boolean
    emptyMessage?: string
  }>(),
  {
    items: () => [],
    showCount: true,
    emptyMessage: 'Nenhuma verificação',
  },
)

const okCount = computed(() => props.items.filter((i) => i.nivel === 'ok').length)
const countLabel = computed(() => `${okCount.value}/${props.items.length}`)

const ICONS: Record<CheckListLevel, string> = {
  ok: 'pi pi-check-circle',
  warn: 'pi pi-exclamation-triangle',
  bad: 'pi pi-times-circle',
}

function iconOf(nivel: CheckListLevel): string {
  return ICONS[nivel] ?? ICONS.warn
}
</script>

<template>
  <div class="w-check-list">
    <div v-if="title || showCount" class="w-check-list__header">
      <span class="w-check-list__title">{{ title }}</span>
      <span v-if="showCount" class="w-check-list__count">{{ countLabel }}</span>
    </div>

    <ul v-if="items.length" class="w-check-list__items">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`" class="w-check-list__item">
        <i :class="[iconOf(item.nivel), `w-check-list__icon--${item.nivel}`]" />
        <span class="w-check-list__label">{{ item.label }}</span>
      </li>
    </ul>

    <div v-else class="w-check-list__empty">
      <slot name="empty">{{ emptyMessage }}</slot>
    </div>
  </div>
</template>
