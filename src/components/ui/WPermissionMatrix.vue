<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import Checkbox from 'primevue/checkbox'
import { useCardFit } from '@/composables/useCardFit'
import type { PermissionOperation, PermissionRow, PermissionValue } from '@/types/permissionMatrix'

/**
 * Matriz linha × operação (ex.: tela × ver/editar/excluir de um perfil de acesso). Cada célula
 * é um checkbox com nome "linha: operação"; "marcar tudo" por linha, por coluna e por grupo, e
 * nenhum deles mexe em célula fixa (`isLocked`) nem em célula que não existe (`isAvailable`).
 * O valor é `{ [idDaLinha]: chavesDasOperações[] }` no `v-model`. Teclado de grade: setas
 * andam entre as células, Home/End vão ao começo e ao fim da linha, Espaço marca. Abaixo de
 * 840px de largura do próprio componente, cada linha vira um card.
 */
defineOptions({ name: 'WPermissionMatrix' })

const props = withDefaults(
  defineProps<{
    rows: PermissionRow[]
    /** Colunas, na ordem. Linha que não tem a operação: `isAvailable`. */
    operations: PermissionOperation[]
    /** Campo que identifica a linha (chave no valor). */
    rowKey?: string
    /** Campo (ou função) com o nome da linha. */
    rowLabel?: string | ((row: PermissionRow) => string)
    /** Campo (ou função) que agrupa as linhas; a ordem dos grupos é a da primeira aparição. */
    groupBy?: string | ((row: PermissionRow) => string)
    /** Rótulo do grupo; default a própria chave. */
    groupLabel?: (groupKey: string, rows: PermissionRow[]) => string
    /** A linha tem esta operação? Default todas. Célula sem operação fica vazia. */
    isAvailable?: (row: PermissionRow, operation: string) => boolean
    /** Célula fixa: não muda pelo clique nem por nenhum "marcar tudo". */
    isLocked?: (row: PermissionRow, operation: string) => boolean
    /** Motivo da célula fixa: `title` e uma linha de apoio sob o nome da linha. */
    lockedReason?: (row: PermissionRow, operation: string) => string | null | undefined
    /** Trava a matriz inteira (leitura). */
    disabled?: boolean
    /** Cabeçalho da coluna dos nomes. */
    rowHeader?: string
    /** Rótulo da coluna "marcar a linha toda". */
    allLabel?: string
    emptyMessage?: string
    /** `auto` vira card abaixo de 840px da largura do componente; `never`/`always` fixam. */
    cardMode?: 'auto' | 'never' | 'always'
  }>(),
  {
    rowKey: 'id',
    rowLabel: 'label',
    groupBy: undefined,
    groupLabel: undefined,
    isAvailable: undefined,
    isLocked: undefined,
    lockedReason: undefined,
    disabled: false,
    rowHeader: 'Tela',
    allLabel: 'Todas',
    emptyMessage: 'Nenhum item.',
    cardMode: 'auto',
  },
)

/** id da linha → operações marcadas. Sem v-model do pai o estado é local. */
const model = defineModel<PermissionValue>({ default: () => ({}) })

defineSlots<{
  /** Substitui a mensagem sem linhas. */
  empty?: () => unknown
}>()

// --- Modo card --------------------------------------------------------------

const raiz = ref<HTMLElement | null>(null)
const { estreito } = useCardFit(raiz, ref(null))
const emCard = computed(
  () => props.cardMode === 'always' || (props.cardMode !== 'never' && estreito.value),
)

// --- Estrutura ----------------------------------------------------------------

type Cell = {
  op: PermissionOperation
  available: boolean
  locked: boolean
  reason: string | null
}
type Row = { data: PermissionRow; id: string; label: string; index: number; cells: Cell[] }
type Group = { key: string; label: string | null; rows: Row[] }

function labelOf(row: PermissionRow): string {
  const v = typeof props.rowLabel === 'function' ? props.rowLabel(row) : row[props.rowLabel]
  return v == null ? '' : String(v)
}

// Não depende do valor: um clique não reavalia isAvailable/isLocked.
const groups = computed<Group[]>(() => {
  const map = new Map<string, Row[]>()
  let index = 0
  for (const data of props.rows) {
    const key = !props.groupBy
      ? ''
      : typeof props.groupBy === 'function'
        ? props.groupBy(data)
        : String(data[props.groupBy] ?? '')
    const cells = props.operations.map((op) => {
      const available = props.isAvailable ? props.isAvailable(data, op.key) : true
      const locked = available && (props.isLocked?.(data, op.key) ?? false)
      const reason = locked ? (props.lockedReason?.(data, op.key) ?? null) : null
      return { op, available, locked, reason }
    })
    const row = {
      data,
      id: String(data[props.rowKey]),
      label: labelOf(data),
      index: index++,
      cells,
    }
    const list = map.get(key)
    if (list) list.push(row)
    else map.set(key, [row])
  }
  return [...map].map(([key, rows]) => ({
    key,
    label: props.groupBy
      ? props.groupLabel
        ? props.groupLabel(
            key,
            rows.map((r) => r.data),
          )
        : key
      : null,
    rows,
  }))
})

const allRows = computed(() => groups.value.flatMap((g) => g.rows))

// --- Valor ----------------------------------------------------------------------

const marked = computed(() => {
  const set = new Set<string>()
  for (const [id, ops] of Object.entries(model.value))
    for (const op of ops) set.add(`${id}\u0000${op}`)
  return set
})

function isOn(row: Row, op: string): boolean {
  return marked.value.has(`${row.id}\u0000${op}`)
}

/** Células que um gesto pode mudar: existem, não são fixas, matriz não travada. */
function free(row: Row): Cell[] {
  return props.disabled ? [] : row.cells.filter((c) => c.available && !c.locked)
}

type Pair = { row: Row; op: string }

function state(pairs: Pair[]) {
  const on = pairs.filter((p) => isOn(p.row, p.op)).length
  return {
    empty: pairs.length === 0,
    checked: pairs.length > 0 && on === pairs.length,
    indeterminate: on > 0 && on < pairs.length,
  }
}

const rowPairs = (row: Row): Pair[] => free(row).map((c) => ({ row, op: c.op.key }))
const groupPairs = (group: Group): Pair[] => group.rows.flatMap(rowPairs)
const columnPairs = (op: string): Pair[] =>
  allRows.value.flatMap((row) => (free(row).some((c) => c.op.key === op) ? [{ row, op }] : []))

// O Checkbox do PrimeVue guarda o próprio valor ao clicar; se o pai recusar a mudança ele
// ficaria marcado à toa. Sem mudança no modelo após o tick, remontamos os checkboxes.
const rev = ref(0)
function commit(next: PermissionValue) {
  const before = model.value
  model.value = next
  void nextTick(() => {
    if (model.value === before) rev.value++
  })
}

/** Liga (ou desliga) os pares dados; o resto do valor — inclusive ids fora de `rows` — fica. */
function apply(pairs: Pair[], on: boolean) {
  const next: PermissionValue = { ...model.value }
  for (const { row, op } of pairs) {
    const atual = next[row.id] ?? []
    const tem = atual.includes(op)
    if (on && !tem) next[row.id] = [...atual, op]
    else if (!on && tem) next[row.id] = atual.filter((k) => k !== op)
  }
  commit(next)
}

/** Marcar tudo: se já está tudo marcado, desmarca; senão, marca o que falta. */
function toggleAll(pairs: Pair[]) {
  if (pairs.length) apply(pairs, !state(pairs).checked)
}

function toggleCell(row: Row, cell: Cell) {
  if (props.disabled || cell.locked || !cell.available) return
  apply([{ row, op: cell.op.key }], !isOn(row, cell.op.key))
}

function lockedNotes(row: Row): Cell[] {
  return row.cells.filter((c) => c.locked && c.reason)
}

// --- Teclado de grade --------------------------------------------------------------
// Tabindex itinerante: uma célula só entra no Tab; setas andam pelas demais. A coluna 0 é
// o "marcar a linha"; as operações começam em 1. Célula sem checkbox ou travada é pulada.

const active = ref<{ r: number; c: number } | null>(null)

function focusable(r: number, c: number): boolean {
  const row = allRows.value[r]
  if (!row || props.disabled) return false
  if (c === 0) return rowPairs(row).length > 0
  const cell = row.cells[c - 1]
  return !!cell && cell.available && !cell.locked
}

const firstCell = computed(() => {
  for (let r = 0; r < allRows.value.length; r++)
    for (let c = 0; c <= props.operations.length; c++) if (focusable(r, c)) return { r, c }
  return null
})

function tabindexOf(r: number, c: number): number {
  const alvo =
    active.value && focusable(active.value.r, active.value.c) ? active.value : firstCell.value
  return alvo && alvo.r === r && alvo.c === c ? 0 : -1
}

function onFocus(r: number, c: number) {
  active.value = { r, c }
}

function seek(r: number, c: number, dr: number, dc: number) {
  const lastC = props.operations.length
  for (
    r += dr, c += dc;
    r >= 0 && r < allRows.value.length && c >= 0 && c <= lastC;
    r += dr, c += dc
  )
    if (focusable(r, c)) return { r, c }
  return null
}

function onKeydown(event: KeyboardEvent) {
  const td = (event.target as HTMLElement).closest<HTMLElement>('[data-r]')
  if (!td) return
  const r = Number(td.dataset.r)
  const c = Number(td.dataset.c)
  const lastC = props.operations.length
  const moves: Record<string, () => { r: number; c: number } | null> = {
    ArrowRight: () => seek(r, c, 0, 1),
    ArrowLeft: () => seek(r, c, 0, -1),
    ArrowDown: () => seek(r, c, 1, 0),
    ArrowUp: () => seek(r, c, -1, 0),
    Home: () => (focusable(r, 0) ? { r, c: 0 } : seek(r, 0, 0, 1)),
    End: () => (focusable(r, lastC) ? { r, c: lastC } : seek(r, lastC, 0, -1)),
  }
  const move = moves[event.key]
  if (!move) return
  event.preventDefault()
  const alvo = move()
  if (!alvo) return
  active.value = alvo
  raiz.value
    ?.querySelector<HTMLInputElement>(`[data-r="${alvo.r}"][data-c="${alvo.c}"] input`)
    ?.focus()
}

const colCount = computed(() => props.operations.length + 2)
</script>

<template>
  <div
    ref="raiz"
    class="w-permission-matrix"
    :class="{ 'w-permission-matrix--cards': emCard, 'w-permission-matrix--disabled': disabled }"
  >
    <div class="w-permission-matrix__scroll">
      <table
        class="w-permission-matrix__table"
        :role="emCard ? 'presentation' : 'grid'"
        @keydown="onKeydown"
      >
        <thead v-if="!emCard">
          <tr>
            <th scope="col" class="w-permission-matrix__th w-permission-matrix__th--name">
              {{ rowHeader }}
            </th>
            <th scope="col" class="w-permission-matrix__th">{{ allLabel }}</th>
            <th v-for="op in operations" :key="op.key" scope="col" class="w-permission-matrix__th">
              <span class="w-permission-matrix__col-head">
                <Checkbox
                  :key="rev"
                  binary
                  :model-value="state(columnPairs(op.key)).checked"
                  :indeterminate="state(columnPairs(op.key)).indeterminate"
                  :disabled="state(columnPairs(op.key)).empty"
                  :aria-label="`${op.label}: marcar em todas as linhas`"
                  @update:model-value="toggleAll(columnPairs(op.key))"
                />
                <span>{{ op.label }}</span>
              </span>
            </th>
          </tr>
        </thead>

        <tbody v-if="!rows.length" class="w-permission-matrix__state">
          <tr>
            <td :colspan="colCount">
              <slot name="empty">{{ emptyMessage }}</slot>
            </td>
          </tr>
        </tbody>

        <tbody v-for="group in groups" :key="group.key" class="w-permission-matrix__group">
          <tr v-if="group.label != null" class="w-permission-matrix__group-row">
            <th :colspan="colCount" scope="colgroup">
              <span class="w-permission-matrix__group-head">
                <Checkbox
                  :key="rev"
                  binary
                  :model-value="state(groupPairs(group)).checked"
                  :indeterminate="state(groupPairs(group)).indeterminate"
                  :disabled="state(groupPairs(group)).empty"
                  :aria-label="`${group.label}: marcar tudo`"
                  @update:model-value="toggleAll(groupPairs(group))"
                />
                <span class="w-permission-matrix__group-label">{{ group.label }}</span>
              </span>
            </th>
          </tr>

          <tr v-for="row in group.rows" :key="row.id" class="w-permission-matrix__row">
            <th scope="row" class="w-permission-matrix__name">
              <span class="w-permission-matrix__name-label">{{ row.label }}</span>
              <small
                v-for="cell in lockedNotes(row)"
                :key="cell.op.key"
                class="w-permission-matrix__note"
              >
                <i class="pi pi-lock" aria-hidden="true" />
                {{ cell.op.label }}: {{ cell.reason }}
              </small>
            </th>

            <td
              class="w-permission-matrix__cell w-permission-matrix__cell--all"
              :data-r="row.index"
              data-c="0"
            >
              <label class="w-permission-matrix__check">
                <Checkbox
                  :key="rev"
                  binary
                  :tabindex="tabindexOf(row.index, 0)"
                  :model-value="state(rowPairs(row)).checked"
                  :indeterminate="state(rowPairs(row)).indeterminate"
                  :disabled="state(rowPairs(row)).empty"
                  :aria-label="`${row.label}: ${allLabel.toLowerCase()}`"
                  @focus="onFocus(row.index, 0)"
                  @update:model-value="toggleAll(rowPairs(row))"
                />
                <span v-if="emCard">{{ allLabel }}</span>
              </label>
            </td>

            <td
              v-for="(cell, ci) in row.cells"
              :key="cell.op.key"
              class="w-permission-matrix__cell"
              :class="{
                'w-permission-matrix__cell--na': !cell.available,
                'w-permission-matrix__cell--locked': cell.locked,
              }"
              :data-r="row.index"
              :data-c="ci + 1"
            >
              <label
                v-if="cell.available"
                class="w-permission-matrix__check"
                :title="cell.reason ?? undefined"
              >
                <Checkbox
                  :key="rev"
                  binary
                  :tabindex="tabindexOf(row.index, ci + 1)"
                  :model-value="isOn(row, cell.op.key)"
                  :disabled="disabled || cell.locked"
                  :aria-label="`${row.label}: ${cell.op.label}`"
                  @focus="onFocus(row.index, ci + 1)"
                  @update:model-value="toggleCell(row, cell)"
                />
                <span v-if="emCard">{{ cell.op.label }}</span>
                <i
                  v-if="cell.locked"
                  class="pi pi-lock w-permission-matrix__lock"
                  aria-hidden="true"
                />
              </label>
              <span v-else class="w-permission-matrix__na" aria-hidden="true">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
