<script setup lang="ts">
import { computed, nextTick, ref, useId, useSlots } from 'vue'
import Checkbox from 'primevue/checkbox'
import Tag from 'primevue/tag'
import type { ColumnDef } from '@/types/column'
import type { GroupedSelectGroupScope, GroupedSelectKey } from '@/types/groupedSelectList'
import WCrudColumnRenderer from '@/components/crud/WCrudColumnRenderer.vue'

/**
 * Tabela agrupada com seleção múltipla: grupos recolhíveis, checkbox de grupo em três estados,
 * linhas que podem não ser selecionáveis (com o motivo num badge) e a ação "selecionar todos os
 * resultados". O componente nunca filtra: `items` já é o resultado. As chaves de `selection` que
 * não estão em `items` ficam intactas e não são contadas — podá-las é papel de quem chama.
 * `selection` e `collapsed` são `defineModel`: seguem sempre o pai e funcionam sem v-model.
 */
const props = withDefaults(
  defineProps<{
    /** Linhas já filtradas; a ordem dos grupos é a da primeira aparição. */
    items: Record<string, unknown>[]
    columns: ColumnDef[]
    /** Campo que identifica a linha (o valor entra em `selection`). */
    dataKey?: string
    /** Campo (ou função) que dá a chave do grupo da linha. */
    groupBy: string | ((item: Record<string, unknown>) => string)
    /** Rótulo do grupo; default a própria chave. */
    groupLabel?: (groupKey: string, items: Record<string, unknown>[]) => string
    /** Trava global: false desabilita todo checkbox, sem badge, e esconde "selecionar todos". */
    selectable?: boolean
    /** Diz se a linha pode ser selecionada; default todas. Linha travada já selecionada pode ser desmarcada. */
    isSelectable?: (item: Record<string, unknown>) => boolean
    /** Texto do badge nas linhas não selecionáveis. */
    disabledReason?: (item: Record<string, unknown>) => string | null | undefined
    /** Com linhas já na tela elas continuam visíveis, com uma barra de carregamento; o placeholder só aparece sem linhas. */
    loading?: boolean
    emptyMessage?: string
    selectAllLabel?: string
    clearSelectionLabel?: string
    /** false remove o botão de recolher dos grupos. */
    collapsible?: boolean
  }>(),
  {
    dataKey: 'id',
    groupLabel: undefined,
    selectable: true,
    isSelectable: undefined,
    disabledReason: undefined,
    loading: false,
    emptyMessage: 'Nenhum registro.',
    selectAllLabel: 'Selecionar todos os resultados',
    clearSelectionLabel: 'Limpar seleção',
    collapsible: true,
  },
)

/** Chaves das linhas selecionadas (v-model:selection). Sem v-model do pai o estado é local. */
const selection = defineModel<GroupedSelectKey[]>('selection', { default: () => [] })
/** Chaves dos grupos recolhidos (v-model:collapsed). */
const collapsed = defineModel<string[]>('collapsed', { default: () => [] })

const slots = useSlots()
const uid = useId()

const selectedSet = computed(() => new Set(selection.value))
const visibleColumns = computed(() => props.columns.filter((c) => c.visible !== false))
const hasActions = computed(() => Boolean(slots['row-actions']))
const colCount = computed(() => 1 + visibleColumns.value.length + (hasActions.value ? 1 : 0))

type Row = {
  data: Record<string, unknown>
  key: GroupedSelectKey
  selectable: boolean
  reason: string | null
}
type GroupBase = {
  key: string
  label: string
  id: string
  items: Record<string, unknown>[]
  rows: Row[]
  rowKeys: GroupedSelectKey[]
  selectableKeys: GroupedSelectKey[]
}
type Group = GroupBase & {
  scope: GroupedSelectGroupScope
  selectedCount: number
  checked: boolean
  indeterminate: boolean
}

function rowSelectable(item: Record<string, unknown>) {
  return props.selectable && (props.isSelectable ? props.isSelectable(item) : true)
}

// Estrutura: não depende da seleção, então um clique não reavalia isSelectable/disabledReason.
const structure = computed<GroupBase[]>(() => {
  const map = new Map<string, Record<string, unknown>[]>()
  for (const item of props.items) {
    const k =
      typeof props.groupBy === 'function' ? props.groupBy(item) : String(item[props.groupBy] ?? '')
    const list = map.get(k)
    if (list) list.push(item)
    else map.set(k, [item])
  }
  let index = 0
  return [...map].map(([key, items]) => {
    const rows: Row[] = items.map((data) => {
      const selectable = rowSelectable(data)
      // O badge só existe quando a trava é da linha; a global (`selectable=false`) não explica nada.
      const reason = props.selectable && !selectable ? (props.disabledReason?.(data) ?? null) : null
      return { data, key: data[props.dataKey] as GroupedSelectKey, selectable, reason }
    })
    return {
      key,
      label: props.groupLabel ? props.groupLabel(key, items) : key,
      id: `${uid}-g${index++}`,
      items,
      rows,
      rowKeys: rows.map((r) => r.key),
      selectableKeys: rows.filter((r) => r.selectable).map((r) => r.key),
    }
  })
})

// Estado: só contagens e flags que mudam com selection/collapsed.
const groups = computed<Group[]>(() =>
  structure.value.map((g) => {
    const selectedCount = g.rowKeys.filter((k) => selectedSet.value.has(k)).length
    const selectedSelectable = g.selectableKeys.filter((k) => selectedSet.value.has(k)).length
    return {
      ...g,
      selectedCount,
      checked: g.selectableKeys.length > 0 && selectedSelectable === g.selectableKeys.length,
      indeterminate: selectedSelectable > 0 && selectedSelectable < g.selectableKeys.length,
      scope: {
        groupKey: g.key,
        label: g.label,
        items: g.items,
        selectedCount,
        selectableCount: g.selectableKeys.length,
        collapsed: collapsed.value.includes(g.key),
      },
    }
  }),
)

const allSelectableKeys = computed(() => structure.value.flatMap((g) => g.selectableKeys))
const allRowKeys = computed(() => structure.value.flatMap((g) => g.rowKeys))
const selectedInItems = computed(() => allRowKeys.value.filter((k) => selectedSet.value.has(k)))
// Modo "limpar": tudo o que dá para marcar está marcado, ou só sobraram linhas travadas marcadas.
const clearMode = computed(() =>
  allSelectableKeys.value.length > 0
    ? allSelectableKeys.value.every((k) => selectedSet.value.has(k))
    : selectedInItems.value.length > 0,
)
const showBar = computed(
  () =>
    props.selectable && (allSelectableKeys.value.length > 0 || selectedInItems.value.length > 0),
)
const hasRows = computed(() => groups.value.length > 0)

function add(keys: GroupedSelectKey[]) {
  const have = selectedSet.value
  return [...selection.value, ...keys.filter((k) => !have.has(k))]
}

function remove(keys: GroupedSelectKey[]) {
  const drop = new Set(keys)
  return selection.value.filter((k) => !drop.has(k))
}

// Linha travada só pode ser desmarcada, nunca marcada; a trava global bloqueia tudo.
function rowDisabled(row: Row) {
  return !props.selectable || (!row.selectable && !selectedSet.value.has(row.key))
}

// O Checkbox do PrimeVue guarda o próprio valor ao clicar; se o pai recusar a mudança ele
// ficaria marcado à toa. Sem mudança no modelo após o tick, remontamos os checkboxes.
const checkboxRev = ref(0)
function commitSelection(next: GroupedSelectKey[]) {
  const before = selection.value
  selection.value = next
  void nextTick(() => {
    if (selection.value === before) checkboxRev.value++
  })
}

function toggleRow(row: Row) {
  if (rowDisabled(row)) return
  commitSelection(selectedSet.value.has(row.key) ? remove([row.key]) : add([row.key]))
}

function toggleGroup(group: Group) {
  if (!props.selectable || group.selectableKeys.length === 0) return
  // Ao limpar, sai também o que está selecionado e travado dentro do grupo.
  commitSelection(group.checked ? remove(group.rowKeys) : add(group.selectableKeys))
}

function toggleAll() {
  commitSelection(clearMode.value ? remove(allRowKeys.value) : add(allSelectableKeys.value))
}

function toggleCollapsed(key: string) {
  collapsed.value = collapsed.value.includes(key)
    ? collapsed.value.filter((k) => k !== key)
    : [...collapsed.value, key]
}

function rowLabel(data: Record<string, unknown>) {
  const col = visibleColumns.value[0]
  if (!col) return ''
  const value = data[col.field]
  const text = col.format ? col.format(value, data) : value
  return text == null ? '' : String(text)
}
</script>

<template>
  <div class="w-grouped-select-list">
    <div v-if="showBar || $slots.summary" class="w-grouped-select-list__bar">
      <button v-if="showBar" type="button" class="w-grouped-select-list__link" @click="toggleAll">
        {{ clearMode ? clearSelectionLabel : selectAllLabel }}
      </button>
      <span v-if="$slots.summary" class="w-grouped-select-list__summary"
        ><slot name="summary"
      /></span>
    </div>

    <div v-if="loading && hasRows" class="w-grouped-select-list__loading" role="status">
      <i class="pi pi-spinner pi-spin" aria-hidden="true" /> Carregando…
    </div>

    <div class="w-grouped-select-list__scroll">
      <table class="w-grouped-select-list__table" :aria-busy="loading">
        <thead>
          <tr>
            <th scope="col" class="w-grouped-select-list__th w-grouped-select-list__th--check">
              <span class="w-grouped-select-list__sr">Seleção</span>
            </th>
            <th
              v-for="col in visibleColumns"
              :key="col.field"
              scope="col"
              class="w-grouped-select-list__th"
              :class="col.align && `w-grouped-select-list__cell--${col.align}`"
              :style="col.style"
            >
              {{ col.header }}
            </th>
            <th v-if="hasActions" scope="col" class="w-grouped-select-list__th">
              <span class="w-grouped-select-list__sr">Ações</span>
            </th>
          </tr>
        </thead>

        <tbody v-if="loading && !hasRows" class="w-grouped-select-list__state">
          <tr>
            <td :colspan="colCount" role="status">
              <i class="pi pi-spinner pi-spin" aria-hidden="true" /> Carregando…
            </td>
          </tr>
        </tbody>

        <tbody v-else-if="groups.length === 0" class="w-grouped-select-list__state">
          <tr>
            <td :colspan="colCount">
              <slot name="empty">{{ emptyMessage }}</slot>
            </td>
          </tr>
        </tbody>

        <template v-else>
          <tbody
            v-for="group in groups"
            :id="group.id"
            :key="group.key"
            class="w-grouped-select-list__group"
          >
            <tr class="w-grouped-select-list__group-row">
              <td :colspan="colCount">
                <div class="w-grouped-select-list__group-head">
                  <button
                    v-if="collapsible"
                    type="button"
                    class="w-grouped-select-list__toggle"
                    :aria-expanded="!group.scope.collapsed"
                    :aria-controls="group.id"
                    :aria-label="`${group.scope.collapsed ? 'Expandir' : 'Recolher'} ${group.label}`"
                    @click="toggleCollapsed(group.key)"
                  >
                    <i
                      :class="group.scope.collapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-down'"
                      aria-hidden="true"
                    />
                  </button>
                  <Checkbox
                    :key="checkboxRev"
                    binary
                    :model-value="group.checked"
                    :indeterminate="group.indeterminate"
                    :disabled="!selectable || group.selectableKeys.length === 0"
                    :aria-label="`Selecionar ${group.label}`"
                    @update:model-value="toggleGroup(group)"
                  />
                  <span class="w-grouped-select-list__group-label">
                    <slot name="group-header" v-bind="group.scope">{{ group.label }}</slot>
                  </span>
                  <span v-if="$slots['group-meta']" class="w-grouped-select-list__group-meta">
                    <slot name="group-meta" v-bind="group.scope" />
                  </span>
                </div>
              </td>
            </tr>

            <template v-if="!group.scope.collapsed">
              <tr
                v-for="row in group.rows"
                :key="String(row.key)"
                class="w-grouped-select-list__row"
                :class="{
                  'w-grouped-select-list__row--selected': selectedSet.has(row.key),
                  'w-grouped-select-list__row--locked': !row.selectable,
                }"
              >
                <td class="w-grouped-select-list__td w-grouped-select-list__td--check">
                  <Checkbox
                    :key="checkboxRev"
                    binary
                    :model-value="selectedSet.has(row.key)"
                    :disabled="rowDisabled(row)"
                    :aria-label="`Selecionar ${rowLabel(row.data)}`"
                    @update:model-value="toggleRow(row)"
                  />
                </td>
                <td
                  v-for="(col, ci) in visibleColumns"
                  :key="col.field"
                  class="w-grouped-select-list__td"
                  :class="col.align && `w-grouped-select-list__cell--${col.align}`"
                  :style="col.style"
                >
                  <slot
                    :name="`column-${col.field}`"
                    :data="row.data"
                    :column="col"
                    :value="row.data[col.field]"
                  >
                    <WCrudColumnRenderer
                      :column="col"
                      :value="row.data[col.field]"
                      :row-data="row.data"
                    />
                  </slot>
                  <Tag
                    v-if="ci === 0 && row.reason"
                    :value="row.reason"
                    severity="secondary"
                    class="w-tag w-tag--secondary w-grouped-select-list__reason"
                  />
                </td>
                <td v-if="hasActions" class="w-grouped-select-list__td">
                  <slot name="row-actions" :data="row.data" />
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </table>
    </div>
  </div>
</template>
