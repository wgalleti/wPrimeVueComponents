<script setup lang="ts">
import { computed, isRef, ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import { useFormatters } from '@/composables/useFormatters'
import type { EditableColumnDef, EditableRow } from '@/types/editableTable'

/**
 * Tabela editável sobre ESTADO LOCAL — o oposto do WCrudView, que conversa com a
 * API a cada operação. Aqui nada é persistido: o consumidor mantém o array e
 * salva em bloco quando quiser (o caso "documento com filhos", em que salvar
 * linha a linha criaria registro órfão).
 *
 * As linhas nunca são mutadas no lugar: toda edição emite um array NOVO com a
 * linha trocada (`update:modelValue`), então `v-model` funciona igual em `ref`,
 * `reactive` ou prop vinda de cima.
 *
 * A subtabela de insumos do design é este mesmo componente dentro do slot
 * `#expansion` — não existe componente separado para "tabela filha".
 */
const props = withDefaults(
  defineProps<{
    /** Linhas (`v-model`). */
    modelValue?: EditableRow[]
    columns?: EditableColumnDef[]
    /** Liga a coluna de expansão e o slot `#expansion`. */
    expandable?: boolean
    /** Rótulo do botão de adicionar. Omitido = sem botão (só o slot `#toolbar`). */
    addLabel?: string
    /** Liga a coluna da lixeira. **Manda sozinha** na remoção: `disabled` trava as
     *  células, não a linha (tabela de leitura de onde ainda se remove é caso real —
     *  itens cujo CRUD acontece em dialog). Para travar tudo, `:removable="false"`. */
    removable?: boolean
    emptyMessage?: string
    /** Rótulo da primeira célula do rodapé de totais. */
    footerLabel?: string
    /** Trava todos os editores (a tabela vira leitura) e o botão de adicionar. */
    disabled?: boolean
    /** Campo usado como `key` das linhas. Sem ele, a chave é o índice. */
    rowKey?: string
  }>(),
  {
    modelValue: () => [],
    columns: () => [],
    expandable: false,
    removable: false,
    emptyMessage: 'Nenhum item adicionado',
    footerLabel: 'Total',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [rows: EditableRow[]]
  add: []
  remove: [row: EditableRow, index: number]
}>()

const { formatNumber } = useFormatters()

// --- Expansão --------------------------------------------------------------
// Índice das linhas abertas. Várias podem ficar abertas ao mesmo tempo: a
// expansão é detalhe de leitura, não navegação.
const expanded = ref<Set<number>>(new Set())

function isExpanded(index: number): boolean {
  return expanded.value.has(index)
}

function toggleRow(index: number) {
  const next = new Set(expanded.value)
  if (next.has(index)) next.delete(index)
  else next.add(index)
  expanded.value = next
}

// --- Colunas ---------------------------------------------------------------

function unwrapOptions(column: EditableColumnDef): Record<string, unknown>[] {
  const options = column.options
  if (!options) return []
  return (isRef(options) ? options.value : options) as Record<string, unknown>[]
}

function columnAlign(column: EditableColumnDef): 'left' | 'center' | 'right' {
  if (column.align) return column.align
  return column.editor === 'number' ? 'right' : 'left'
}

function isNumericColumn(column: EditableColumnDef): boolean {
  return column.editor === 'number' || column.footer === 'sum' || column.decimals != null
}

function columnClass(column: EditableColumnDef): string[] {
  return [
    `w-editable-table__cell--${columnAlign(column)}`,
    ...(isNumericColumn(column) ? ['w-editable-table__cell--num'] : []),
  ]
}

function columnStyle(column: EditableColumnDef) {
  if (column.width == null) return undefined
  return { width: typeof column.width === 'number' ? `${column.width}px` : column.width }
}

function isCellDisabled(column: EditableColumnDef, row: EditableRow, index: number): boolean {
  if (props.disabled) return true
  if (typeof column.disabled === 'function') return column.disabled(row, index)
  return !!column.disabled
}

// --- Leitura / escrita de célula -------------------------------------------

function toNumber(value: unknown): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value.replace(/\./g, '').replace(',', '.'))
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

function displayValue(column: EditableColumnDef, row: EditableRow): string {
  const value = row[column.field]
  if (column.format) return column.format(value, row)
  if (value == null || value === '') return '—'
  if (isNumericColumn(column)) {
    return `${formatNumber(toNumber(value), column.decimals ?? 2)}${column.suffix ?? ''}`
  }
  return `${String(value)}${column.suffix ?? ''}`
}

function setCell(index: number, field: string, value: unknown) {
  const next = props.modelValue.map((row, i) => (i === index ? { ...row, [field]: value } : row))
  emit('update:modelValue', next)
}

function removeRow(row: EditableRow, index: number) {
  // Emite os dois: o array já sem a linha (para o v-model continuar sendo a
  // fonte da verdade) e o evento com a linha removida (para quem precisa dela).
  emit(
    'update:modelValue',
    props.modelValue.filter((_, i) => i !== index),
  )
  expanded.value = new Set()
  emit('remove', row, index)
}

function rowKeyOf(row: EditableRow, index: number): string | number {
  if (props.rowKey) {
    const key = row[props.rowKey]
    if (typeof key === 'string' || typeof key === 'number') return key
  }
  return index
}

// --- Rodapé de totais ------------------------------------------------------

const hasFooter = computed(() =>
  props.columns.some((c) => typeof c.footer === 'function' || c.footer === 'sum'),
)

function footerValue(column: EditableColumnDef): string {
  if (typeof column.footer === 'function') return column.footer(props.modelValue)
  if (column.footer !== 'sum') return ''
  const total = props.modelValue.reduce((sum, row) => sum + toNumber(row[column.field]), 0)
  return `${formatNumber(total, column.decimals ?? 2)}${column.suffix ?? ''}`
}

/** A primeira coluna sem rodapé próprio carrega o rótulo "Total". */
const footerLabelField = computed(() => {
  const first = props.columns.find((c) => !c.footer || c.footer === 'none')
  return first?.field ?? null
})

const columnCount = computed(
  () => props.columns.length + (props.expandable ? 1 : 0) + (props.removable ? 1 : 0),
)

// --- Grupos de cabeçalho ---------------------------------------------------
// Colunas vizinhas com o mesmo `group` viram um rótulo único numa linha acima
// do cabeçalho normal; as demais ficam com a célula de cima vazia.

const hasHeaderGroups = computed(() => props.columns.some((c) => c.group))

const headerGroupCells = computed(() => {
  const cells: { label: string; span: number; key: string }[] = []
  for (const column of props.columns) {
    const label = column.group ?? ''
    const last = cells[cells.length - 1]
    if (last && label && last.label === label) last.span += 1
    else cells.push({ label, span: 1, key: column.field })
  }
  return cells
})
</script>

<template>
  <div class="w-editable-table">
    <div v-if="$slots.toolbar || addLabel" class="w-editable-table__toolbar">
      <slot name="toolbar">
        <button
          type="button"
          class="w-editable-table__add"
          :disabled="disabled"
          @click="emit('add')"
        >
          <i class="pi pi-plus" />{{ addLabel }}
        </button>
      </slot>
    </div>

    <table class="w-editable-table__table">
      <thead>
        <tr v-if="hasHeaderGroups" class="w-editable-table__group-row">
          <th v-if="expandable" class="w-editable-table__toggle-col" />
          <th
            v-for="cell in headerGroupCells"
            :key="cell.key"
            :colspan="cell.span"
            class="w-editable-table__group"
            :class="{ 'w-editable-table__group--label': cell.label }"
          >
            {{ cell.label }}
          </th>
          <th v-if="removable" class="w-editable-table__action-col" />
        </tr>
        <tr>
          <th v-if="expandable" class="w-editable-table__toggle-col" />
          <th
            v-for="column in columns"
            :key="column.field"
            :class="columnClass(column)"
            :style="columnStyle(column)"
          >
            {{ column.header }}
          </th>
          <th v-if="removable" class="w-editable-table__action-col" />
        </tr>
      </thead>

      <tbody v-if="!modelValue.length">
        <tr>
          <td :colspan="columnCount" class="w-editable-table__empty">
            <slot name="empty">{{ emptyMessage }}</slot>
          </td>
        </tr>
      </tbody>

      <tbody v-for="(row, index) in modelValue" :key="rowKeyOf(row, index)">
        <!-- Zebra pelo índice, não por `:nth-child`: cada linha é um `<tbody>` próprio
             (por causa da expansão), então a contagem do CSS não enxergaria a
             alternância. -->
        <tr
          class="w-editable-table__row"
          :class="{ 'w-editable-table__row--alt': index % 2 === 1 }"
        >
          <td v-if="expandable" class="w-editable-table__toggle-col">
            <button
              type="button"
              class="w-editable-table__toggle"
              :aria-expanded="isExpanded(index)"
              aria-label="Detalhes da linha"
              @click="toggleRow(index)"
            >
              <i :class="isExpanded(index) ? 'pi pi-chevron-down' : 'pi pi-chevron-right'" />
            </button>
          </td>

          <td
            v-for="column in columns"
            :key="column.field"
            :class="columnClass(column)"
            :style="columnStyle(column)"
          >
            <slot
              :name="`cell-${column.field}`"
              :row="row"
              :index="index"
              :value="row[column.field]"
              :column="column"
            >
              <InputNumber
                v-if="column.editor === 'number'"
                :model-value="row[column.field] as number"
                fluid
                locale="pt-BR"
                :min="column.min"
                :max="column.max"
                :min-fraction-digits="column.decimals != null ? column.decimals : undefined"
                :max-fraction-digits="column.decimals != null ? column.decimals : undefined"
                :suffix="column.suffix"
                :placeholder="column.placeholder"
                :disabled="isCellDisabled(column, row, index)"
                :input-class="'w-editable-table__num'"
                @update:model-value="(val) => setCell(index, column.field, val)"
              />

              <InputText
                v-else-if="column.editor === 'text'"
                :model-value="row[column.field] as string"
                fluid
                :placeholder="column.placeholder"
                :disabled="isCellDisabled(column, row, index)"
                @update:model-value="(val) => setCell(index, column.field, val)"
              />

              <Select
                v-else-if="column.editor === 'select'"
                :model-value="row[column.field]"
                fluid
                :options="unwrapOptions(column)"
                :option-label="column.optionLabel || 'label'"
                :option-value="column.optionValue || 'value'"
                :placeholder="column.placeholder"
                :disabled="isCellDisabled(column, row, index)"
                @update:model-value="(val) => setCell(index, column.field, val)"
              />

              <span v-else class="w-editable-table__text">{{ displayValue(column, row) }}</span>
            </slot>
          </td>

          <td v-if="removable" class="w-editable-table__action-col">
            <button
              type="button"
              class="w-editable-table__remove"
              aria-label="Remover linha"
              @click="removeRow(row, index)"
            >
              <i class="pi pi-trash" />
            </button>
          </td>
        </tr>

        <tr v-if="expandable && isExpanded(index)" class="w-editable-table__expansion">
          <td :colspan="columnCount">
            <slot name="expansion" :row="row" :index="index" />
          </td>
        </tr>
      </tbody>

      <tfoot v-if="hasFooter">
        <tr class="w-editable-table__footer">
          <td v-if="expandable" class="w-editable-table__toggle-col" />
          <td
            v-for="column in columns"
            :key="column.field"
            :class="columnClass(column)"
            :style="columnStyle(column)"
          >
            <slot :name="`footer-${column.field}`" :rows="modelValue" :column="column">
              <span v-if="column.field === footerLabelField" class="w-editable-table__footer-label">
                {{ footerLabel }}
              </span>
              <span v-else>{{ footerValue(column) }}</span>
            </slot>
          </td>
          <td v-if="removable" class="w-editable-table__action-col" />
        </tr>
      </tfoot>
    </table>
  </div>
</template>
