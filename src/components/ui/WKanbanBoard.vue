<script setup lang="ts">
import { ref } from 'vue'
import type { KanbanColumn, KanbanMoveEvent } from '@/types/kanban'

type Item = Record<string, unknown>

/**
 * Board kanban controlado: as colunas e seus itens vêm de fora e o board NUNCA
 * muta os arrays — arrastar um card só emite `move`; o consumidor persiste e
 * atualiza `columns`. Drag and drop com HTML5 nativo (sem dependência).
 *
 * Mover programaticamente (ex.: botão "mover para...") é responsabilidade do
 * consumidor — basta aplicar a mesma mudança que faria ao receber um `move`.
 */
const props = withDefaults(
  defineProps<{
    /** Colunas na ordem de exibição. Itens pertencem ao consumidor. */
    columns: KanbanColumn[]
    /** Campo usado como key estável dos cards. */
    itemKey?: string
    /** Permite bloquear o arrasto de itens específicos. */
    canDrag?: (item: Item) => boolean
    loading?: boolean
    /** Altura máxima da lista de cards (a coluna rola por dentro). */
    maxHeight?: string
    /** Altura mínima da lista — dá área de drop mesmo com a coluna vazia. */
    minHeight?: string
  }>(),
  {
    itemKey: 'id',
    loading: false,
    maxHeight: '32rem',
    minHeight: '6rem',
  },
)

const emit = defineEmits<{
  /** Card solto em outra posição (entre colunas ou reordenação na mesma). */
  move: [event: KanbanMoveEvent]
  /** Clique simples no card (sem drag). */
  'item-click': [item: Item]
}>()

defineSlots<{
  /** Conteúdo do card. Fallback: item.nome ?? item[itemKey]. */
  card?(props: { item: Item; column: KanbanColumn }): unknown
  /** Cabeçalho da coluna. Fallback: label + contador. */
  'column-header'?(props: { column: KanbanColumn }): unknown
  /** Ação à direita do cabeçalho (ex.: criar nesta coluna). */
  'column-action'?(props: { column: KanbanColumn }): unknown
  /** Coluna sem itens. */
  'empty-column'?(props: { column: KanbanColumn }): unknown
}>()

const dragging = ref<{ item: Item; from: string; key: unknown } | null>(null)
const dropTarget = ref<{ column: string; index: number } | null>(null)

const listRefs = new Map<string, HTMLElement>()

function setListRef(value: string, el: unknown) {
  if (el instanceof HTMLElement) listRefs.set(value, el)
  else listRefs.delete(value)
}

function keyOf(item: Item): unknown {
  return item[props.itemKey]
}

function fallbackLabel(item: Item): string {
  return String(item.nome ?? keyOf(item) ?? '')
}

function isDraggable(item: Item): boolean {
  if (props.loading) return false
  return props.canDrag ? props.canDrag(item) : true
}

function isDragging(item: Item): boolean {
  return !!dragging.value && keyOf(item) === dragging.value.key
}

/** Índice de inserção na coluna: ponto médio vertical dos cards renderizados. */
function computeIndex(colValue: string, event: DragEvent): number {
  const list = listRefs.get(colValue)
  if (!list) return 0
  const cards = Array.from(list.querySelectorAll(':scope > .w-kanban-board__card'))
  let index = cards.length
  for (let i = 0; i < cards.length; i++) {
    const rect = cards[i].getBoundingClientRect()
    if (event.clientY < rect.top + rect.height / 2) {
      index = i
      break
    }
  }
  return index
}

function onDragStart(item: Item, column: KanbanColumn, event: DragEvent) {
  if (!isDraggable(item)) {
    event.preventDefault()
    return
  }
  dragging.value = { item, from: column.value, key: keyOf(item) }
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(keyOf(item)))
  }
}

function onDragOver(column: KanbanColumn, event: DragEvent) {
  if (!dragging.value) return
  event.preventDefault()
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
  dropTarget.value = { column: column.value, index: computeIndex(column.value, event) }
}

function onDragLeave(column: KanbanColumn, event: DragEvent) {
  const list = listRefs.get(column.value)
  const related = event.relatedTarget
  if (list && related instanceof Node && list.contains(related)) return
  if (dropTarget.value?.column === column.value) dropTarget.value = null
}

function onDrop(column: KanbanColumn, event: DragEvent) {
  event.preventDefault()
  const drag = dragging.value
  clearDrag()
  if (!drag) return

  const rawIndex = computeIndex(column.value, event)
  let index = rawIndex

  if (drag.from === column.value) {
    const source = props.columns.find((c) => c.value === column.value)
    const oldIndex = source ? source.items.findIndex((i) => keyOf(i) === drag.key) : -1
    if (oldIndex !== -1 && rawIndex > oldIndex) index = rawIndex - 1
    // Soltou onde já estava: nada a persistir.
    if (index === oldIndex) return
  }

  emit('move', { item: drag.item, from: drag.from, to: column.value, index })
}

function onDragEnd() {
  clearDrag()
}

function clearDrag() {
  dragging.value = null
  dropTarget.value = null
}

function onCardClick(item: Item) {
  if (dragging.value) return
  emit('item-click', item)
}

function showIndicatorAt(column: KanbanColumn, index: number): boolean {
  return (
    !!dragging.value &&
    dropTarget.value?.column === column.value &&
    dropTarget.value.index === index
  )
}
</script>

<template>
  <div
    class="w-kanban-board"
    :class="{
      'w-kanban-board--loading': loading,
      'w-kanban-board--dragging': !!dragging,
    }"
    :aria-busy="loading || undefined"
  >
    <section
      v-for="column in columns"
      :key="column.value"
      class="w-kanban-board__column"
      :class="{
        'w-kanban-board__column--over': !!dragging && dropTarget?.column === column.value,
      }"
      :style="column.accent ? { '--w-kanban-accent': column.accent } : undefined"
    >
      <header class="w-kanban-board__header">
        <slot name="column-header" :column="column">
          <span class="w-kanban-board__title">{{ column.label }}</span>
          <span class="w-kanban-board__count">{{ column.items.length }}</span>
        </slot>
        <slot name="column-action" :column="column" />
      </header>

      <div
        :ref="(el) => setListRef(column.value, el)"
        class="w-kanban-board__list"
        role="list"
        :aria-label="column.label"
        :style="{ maxHeight, minHeight }"
        @dragover="onDragOver(column, $event)"
        @dragleave="onDragLeave(column, $event)"
        @drop="onDrop(column, $event)"
      >
        <template v-for="(item, i) in column.items" :key="String(keyOf(item))">
          <div v-if="showIndicatorAt(column, i)" class="w-kanban-board__indicator" />
          <div
            class="w-kanban-board__card"
            role="listitem"
            tabindex="0"
            :class="{
              'w-kanban-board__card--dragging': isDragging(item),
              'w-kanban-board__card--static': !isDraggable(item),
            }"
            :draggable="isDraggable(item)"
            @dragstart="onDragStart(item, column, $event)"
            @dragend="onDragEnd"
            @click="onCardClick(item)"
            @keydown.enter.prevent="onCardClick(item)"
            @keydown.space.prevent="onCardClick(item)"
          >
            <slot name="card" :item="item" :column="column">
              <span class="w-kanban-board__card-fallback">{{ fallbackLabel(item) }}</span>
            </slot>
          </div>
        </template>
        <div
          v-if="showIndicatorAt(column, column.items.length)"
          class="w-kanban-board__indicator"
        />

        <div v-if="!column.items.length" class="w-kanban-board__empty">
          <slot name="empty-column" :column="column">Nenhum item</slot>
        </div>
      </div>
    </section>
  </div>
</template>
