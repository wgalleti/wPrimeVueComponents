<script setup lang="ts">
import { ref, reactive, computed, onMounted, useSlots } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Popover from 'primevue/popover'
import Checkbox from 'primevue/checkbox'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Paginator from 'primevue/paginator'
import ContextMenu from 'primevue/contextmenu'
import WCrudColumnRenderer from './WCrudColumnRenderer.vue'
import WCrudFormDialog from './WCrudFormDialog.vue'
import type { CrudManagerReturn } from '@/types/manager'
import type { RowAction } from '@/types/action'
import type { ColumnDef } from '@/types/column'
import type { FieldDef } from '@/types/field'
import type { KpiItem } from '@/types/kpi'
import type { MenuItem } from 'primevue/menuitem'
import type { Slots } from 'vue'
import { useFormatters } from '@/composables/useFormatters'
import { toCsv, downloadCsv } from '@/utils/csv'

const props = withDefaults(
  defineProps<{
    // WCrudView é agnóstico ao tipo do registro (trata linhas como Record<string, unknown>
    // internamente); a prop aceita o CrudManagerReturn de qualquer T do consumidor.
    // TODO(tipagem): tornar o componente genérico <T> e tipar selectedRow/eventos.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    crud: CrudManagerReturn<any>
    title: string
    subtitle?: string
    showSearch?: boolean
    showHeader?: boolean
    dialogWidth?: string
    /** Nº de colunas do grid do form dialog (default: `formColumns` da config
     *  do useCrudManager, senão 2). */
    formColumns?: number
    autoInit?: boolean
    showKpi?: boolean
    kpiIcon?: string
    kpiLabel?: string
    extraKpis?: KpiItem[]
    expandable?: boolean
    viewToggle?: boolean
    defaultView?: 'table' | 'cards'
    cardFields?: number
    actionRail?: boolean
    contextMenu?: boolean
    showPrint?: boolean
    exportCsv?: boolean
    csvFilename?: string
    csvScope?: 'all' | 'page'
    csvPageSize?: number
    /** Chave de persistência do estado de coluna (visibilidade) em localStorage.
     *  Opt-in: quando definida, exibe o seletor de colunas e persiste o que foi ocultado. */
    persistState?: string
  }>(),
  {
    showSearch: true,
    showHeader: true,
    dialogWidth: '480px',
    autoInit: true,
    showKpi: false,
    kpiIcon: 'pi pi-list',
    kpiLabel: 'Total de Registros',
    extraKpis: () => [],
    expandable: false,
    viewToggle: true,
    defaultView: 'table',
    cardFields: 4,
    actionRail: true,
    contextMenu: true,
    showPrint: false,
    exportCsv: true,
    csvFilename: 'export.csv',
    csvScope: 'all',
    csvPageSize: 200,
  },
)

const emit = defineEmits<{
  'row-expand': [data: unknown]
  'row-collapse': [data: unknown]
  print: [data: Record<string, unknown>]
}>()

const slots: Slots = useSlots()
const { formatNumber } = useFormatters()

const expandedRows = ref({})

// --- Display mode (table / cards) ---

const displayMode = ref<'table' | 'cards'>(props.defaultView)
function isView(mode: 'table' | 'cards'): boolean {
  return displayMode.value === mode
}
function setView(mode: 'table' | 'cards'): void {
  displayMode.value = mode
}
const paginatorFirst = computed(
  () => (props.crud.pagination.page - 1) * props.crud.pagination.pageSize,
)

// --- Columns ---

// Estado de coluna (opt-in via persistState): visibilidade persistida em localStorage.
const columnState = reactive<{ hidden: string[] }>({ hidden: [] })
const chooser = ref<InstanceType<typeof Popover> | null>(null)
function colStateKey(): string | null {
  return props.persistState ? `wcrud:cols:${props.persistState}` : null
}
function loadColumnState() {
  const key = colStateKey()
  if (!key) return
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '{}')
    if (Array.isArray(parsed.hidden)) columnState.hidden = parsed.hidden
  } catch {
    /* estado inválido — ignora */
  }
}
function saveColumnState() {
  const key = colStateKey()
  if (key) localStorage.setItem(key, JSON.stringify({ hidden: columnState.hidden }))
}
// Colunas base (respeita visible:false do consumidor) — fonte do seletor de colunas.
const baseColumns = computed(() => props.crud.config.columns.filter((c) => c.visible !== false))
function toggleColumn(field: string, visible: boolean) {
  columnState.hidden = visible
    ? columnState.hidden.filter((f) => f !== field)
    : [...new Set([...columnState.hidden, field])]
  saveColumnState()
}

const visibleColumns = computed(() =>
  props.crud.config.columns
    .filter((c) => c.visible !== false && !columnState.hidden.includes(c.field))
    .map((c) => {
      if (c.type === 'number' && !c.align) return { ...c, align: 'right' as const }
      if (c.type === 'currency' && !c.align) return { ...c, align: 'right' as const }
      return c
    }),
)

function colAlignClass(col: { align?: string }) {
  if (col.align === 'right') return 'text-right'
  if (col.align === 'center') return 'text-center'
  return undefined
}

const cardColumns = computed(() => visibleColumns.value.slice(0, props.cardFields))

// --- Row Actions ---

const defaultActions = computed<RowAction[]>(() => {
  const actions: RowAction[] = []
  if (props.crud.config.canEdit !== false) {
    actions.push({ action: 'edit', icon: 'pi pi-pencil', tooltip: 'Editar' })
  }
  if (props.crud.config.canCreate !== false) {
    actions.push({
      action: 'duplicate',
      icon: 'pi pi-copy',
      tooltip: 'Duplicar',
      severity: 'info',
    })
  }
  if (props.crud.config.canDelete !== false) {
    actions.push({
      action: 'delete',
      icon: 'pi pi-trash',
      tooltip: 'Excluir',
      severity: 'danger',
    })
  }
  return actions
})

const effectiveRowActions = computed<RowAction[]>(
  () => props.crud.config.rowActions ?? defaultActions.value,
)

const hasActions = computed(
  () => effectiveRowActions.value.length > 0 || Boolean(slots['row-actions']),
)

function handleRowAction(action: RowAction, data: Record<string, unknown>) {
  // Custom handler tem prioridade — permite sobrescrever ações nomeadas.
  if (action.handler) {
    action.handler(data)
    return
  }
  if (action.action === 'edit') {
    props.crud.openEditDialog(data)
  } else if (action.action === 'view') {
    props.crud.openViewDialog(data)
  } else if (action.action === 'duplicate') {
    props.crud.openDuplicateDialog(data)
  } else if (action.action === 'delete') {
    props.crud.confirmDelete(data)
  }
}

function isActionVisible(action: RowAction, data: Record<string, unknown>): boolean {
  if (action.visible) return action.visible(data)
  return true
}

function isActionDisabled(action: RowAction, data: Record<string, unknown>): boolean {
  if (action.disabled) return action.disabled(data)
  return false
}

// --- KPIs ---

const allKpis = computed<KpiItem[]>(() => {
  const kpis: KpiItem[] = []
  if (props.showKpi) {
    kpis.push({
      icon: props.kpiIcon,
      label: props.kpiLabel,
      value: formatNumber(props.crud.pagination.rows, 0),
    })
  }
  kpis.push(...props.extraKpis)
  return kpis
})

const canCreate = computed(() => props.crud.config.canCreate !== false)

// --- Selection (drives action rail + context menu) ---

const selectedRow = ref<Record<string, unknown> | null>(null)

// Seleção múltipla — opt-in via config.selectionMode: 'multiple'.
const isMultiSelect = computed(() => props.crud.config.selectionMode === 'multiple')

// Edição inline por célula — opt-in via config.editMode: 'cell'.
const isCellEdit = computed(() => props.crud.config.editMode === 'cell')
const formFieldMap = computed(() => new Map(props.crud.config.form.map((f) => [f.field, f])))
const INLINE_TYPES = ['text', 'email', 'number', 'currency']
function inlineField(field: string): FieldDef | undefined {
  const f = formFieldMap.value.get(field)
  return f && INLINE_TYPES.includes(f.type || 'text') ? f : undefined
}
function onCellEditComplete(e: {
  data: Record<string, unknown>
  field: string
  value?: unknown
  newValue: unknown
}) {
  if (e.newValue === (e.value ?? e.data[e.field])) return
  props.crud.updateField(e.data, e.field, e.newValue)
}

// Filtros declarativos de coluna.
const filterableColumns = computed<ColumnDef[]>(() =>
  props.crud.config.columns.filter((c) => c.filter),
)
const booleanFilterOptions = [
  { label: 'Sim', value: true },
  { label: 'Não', value: false },
]
function fParam(col: ColumnDef): string {
  return col.filter?.param || col.field
}
const filterTimers: Record<string, ReturnType<typeof setTimeout>> = {}
function onTextFilter(col: ColumnDef, value: string) {
  const param = fParam(col)
  if (filterTimers[param]) clearTimeout(filterTimers[param])
  filterTimers[param] = setTimeout(() => props.crud.setColumnFilter(param, value || null), 300)
}
const cm = ref<InstanceType<typeof ContextMenu> | null>(null)

function selectRow(row: Record<string, unknown>) {
  selectedRow.value = row
}

function onRowContextMenu(event: { originalEvent: Event; data: Record<string, unknown> }) {
  if (!props.contextMenu) return
  selectedRow.value = event.data
  cm.value?.show(event.originalEvent)
}

function onCardContextMenu(event: MouseEvent, row: Record<string, unknown>) {
  if (!props.contextMenu) return
  event.preventDefault()
  selectedRow.value = row
  cm.value?.show(event)
}

const contextMenuItems = computed<MenuItem[]>(() => {
  const row = selectedRow.value
  if (!row) return []
  const items: MenuItem[] = [
    {
      label: 'Ver detalhes',
      icon: 'pi pi-eye',
      command: () => props.crud.openViewDialog(row),
    },
  ]
  // Todas as actions (default + customizadas) entram aqui.
  for (const action of effectiveRowActions.value) {
    if (!isActionVisible(action, row)) continue
    items.push({
      label: action.tooltip ?? action.action,
      icon: action.icon,
      class: action.severity === 'danger' ? 'w-crud-ctx-danger' : undefined,
      disabled: isActionDisabled(action, row),
      command: () => handleRowAction(action, row),
    })
  }
  if (props.showPrint) {
    items.push({
      label: 'Imprimir',
      icon: 'pi pi-print',
      command: () => emit('print', row),
    })
  }
  if (props.exportCsv) {
    items.push({ separator: true })
    items.push({
      label: props.csvScope === 'all' ? 'Exportar tudo (CSV)' : 'Exportar página (CSV)',
      icon: 'pi pi-download',
      command: () => doExportCsv(),
    })
  }
  return items
})

// --- Action rail handlers ---

function railPrint() {
  if (selectedRow.value) emit('print', selectedRow.value)
}

// --- CSV export (visible columns) ---

const exporting = ref(false)

async function doExportCsv() {
  if (exporting.value) return
  exporting.value = true
  try {
    const rows =
      props.csvScope === 'page'
        ? props.crud.items.value
        : await props.crud.fetchAll(props.csvPageSize)
    const csv = toCsv(rows, visibleColumns.value)
    downloadCsv(csv, props.csvFilename)
  } finally {
    exporting.value = false
  }
}

// --- Init ---

onMounted(() => {
  loadColumnState()
  if (props.autoInit) {
    props.crud.init()
  }
})
</script>

<template>
  <div class="w-crud">
    <!-- Header -->
    <div v-if="showHeader" class="w-crud-header">
      <div class="w-crud-header-content">
        <h1 class="w-crud-title">{{ title }}</h1>
        <p v-if="subtitle" class="w-crud-subtitle">{{ subtitle }}</p>
      </div>
      <div class="w-crud-header-actions">
        <slot name="header-actions" />
        <Button
          v-if="canCreate && !actionRail"
          label="Novo"
          icon="pi pi-plus"
          @click="crud.openCreateDialog()"
        />
      </div>
    </div>

    <!-- KPIs -->
    <slot name="before-table">
      <div v-if="allKpis.length" class="w-crud-kpis">
        <div v-for="(kpi, idx) in allKpis" :key="idx" class="w-crud-kpi">
          <div :class="['w-crud-kpi-icon', kpi.severity ? `w-crud-kpi-icon--${kpi.severity}` : '']">
            <i :class="[kpi.icon]" :style="kpi.color ? `color: ${kpi.color}` : ''" />
          </div>
          <div class="w-crud-kpi-content">
            <div class="w-crud-kpi-label">{{ kpi.label }}</div>
            <div class="w-crud-kpi-value">{{ kpi.value }}</div>
          </div>
        </div>
      </div>
    </slot>

    <!-- Content (table/cards + optional action rail) -->
    <div class="w-crud-content" :class="{ 'w-crud-content--rail': actionRail }">
      <div class="w-crud-content-main">
        <!-- Barra de filtros de coluna (declarativos, opt-in via ColumnDef.filter) -->
        <div
          v-if="filterableColumns.length"
          class="w-crud-filters"
          style="
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
            margin-bottom: 0.75rem;
          "
        >
          <template v-for="col in filterableColumns" :key="col.field">
            <InputText
              v-if="(col.filter?.type || 'text') === 'text'"
              :model-value="(crud.columnFilters[fParam(col)] as string) ?? ''"
              :placeholder="col.filter?.placeholder || col.header"
              size="small"
              @input="(e: Event) => onTextFilter(col, (e.target as HTMLInputElement).value)"
            />
            <Select
              v-else-if="col.filter?.type === 'select'"
              :model-value="crud.columnFilters[fParam(col)]"
              :options="col.filter?.options"
              option-label="label"
              option-value="value"
              :placeholder="col.filter?.placeholder || col.header"
              show-clear
              size="small"
              @update:model-value="(v: unknown) => crud.setColumnFilter(fParam(col), v)"
            />
            <Select
              v-else-if="col.filter?.type === 'boolean'"
              :model-value="crud.columnFilters[fParam(col)]"
              :options="booleanFilterOptions"
              option-label="label"
              option-value="value"
              :placeholder="col.filter?.placeholder || col.header"
              show-clear
              size="small"
              @update:model-value="(v: unknown) => crud.setColumnFilter(fParam(col), v)"
            />
            <InputNumber
              v-else-if="col.filter?.type === 'numeric'"
              :model-value="(crud.columnFilters[fParam(col)] as number) ?? null"
              :placeholder="col.filter?.placeholder || col.header"
              size="small"
              @update:model-value="(v: number) => crud.setColumnFilter(fParam(col), v)"
            />
          </template>
          <Button
            v-if="Object.keys(crud.columnFilters).length"
            label="Limpar filtros"
            icon="pi pi-filter-slash"
            text
            size="small"
            @click="crud.clearColumnFilters()"
          />
        </div>

        <!-- Table -->
        <div v-if="displayMode === 'table'" class="w-crud-table">
          <!-- Barra de ações em lote (seleção múltipla) -->
          <div
            v-if="isMultiSelect && crud.selectedItems.value.length"
            class="w-crud-bulkbar"
            style="
              display: flex;
              align-items: center;
              gap: 0.5rem;
              margin-bottom: 0.5rem;
              padding: 0.5rem 0.75rem;
              border-radius: 8px;
              background: var(--p-primary-50, #eef2ff);
              color: var(--p-primary-700, #3730a3);
            "
          >
            <span style="font-weight: 600; font-size: 0.85rem; margin-right: auto">
              {{ crud.selectedItems.value.length }} selecionado(s)
            </span>
            <slot name="bulk-actions" :selected="crud.selectedItems.value" :crud="crud">
              <Button
                v-for="ba in crud.config.bulkActions || []"
                :key="ba.action"
                :label="ba.label"
                :icon="ba.icon"
                :severity="ba.severity"
                size="small"
                :disabled="ba.disabled ? ba.disabled(crud.selectedItems.value) : false"
                @click="ba.handler(crud.selectedItems.value)"
              />
            </slot>
            <Button
              v-tooltip.top="'Limpar seleção'"
              icon="pi pi-times"
              text
              rounded
              size="small"
              @click="crud.clearSelection()"
            />
          </div>
          <DataTable
            v-model:expanded-rows="expandedRows"
            :value="crud.items.value"
            :loading="crud.loading.value"
            paginator
            :rows="crud.pagination.pageSize"
            :total-records="crud.pagination.rows"
            :rows-per-page-options="[10, 20, 50]"
            paginator-template="CurrentPageReport PrevPageLink NextPageLink"
            current-page-report-template="Página {currentPage} de {totalPages}"
            :pt="{ pcPaginator: { root: { class: 'w-crud-paginator' } } }"
            lazy
            striped-rows
            removable-sort
            size="small"
            :sort-field="crud.sort.field ?? undefined"
            :sort-order="crud.sort.order"
            :data-key="crud.config.pk || 'id'"
            :edit-mode="isCellEdit ? 'cell' : undefined"
            :selection="
              isMultiSelect
                ? crud.selectedItems.value
                : actionRail || contextMenu
                  ? selectedRow
                  : undefined
            "
            :selection-mode="
              isMultiSelect ? undefined : actionRail || contextMenu ? 'single' : undefined
            "
            :context-menu="contextMenu"
            :context-menu-selection="contextMenu ? selectedRow : undefined"
            @update:selection="
              (v: any) => (isMultiSelect ? (crud.selectedItems.value = v) : (selectedRow = v))
            "
            @update:context-menu-selection="(v: any) => (selectedRow = v)"
            @row-contextmenu="onRowContextMenu"
            @page="crud.onPage"
            @sort="(e: any) => crud.onSort({ sortField: e.sortField, sortOrder: e.sortOrder })"
            @row-expand="(e) => emit('row-expand', e.data)"
            @row-collapse="(e) => emit('row-collapse', e.data)"
            @cell-edit-complete="onCellEditComplete"
          >
            <template #header>
              <div class="w-crud-toolbar">
                <div class="w-crud-toolbar-start">
                  <IconField v-if="showSearch">
                    <InputIcon class="pi pi-search" />
                    <InputText
                      :model-value="crud.search.value"
                      placeholder="Buscar..."
                      class="w-72"
                      @input="crud.onSearch"
                    />
                  </IconField>
                  <slot name="toolbar-start" />
                  <slot name="toolbar-filters" />
                </div>
                <div class="w-crud-toolbar-end">
                  <slot name="toolbar-actions" />
                  <template v-if="persistState">
                    <Button
                      v-tooltip.top="'Colunas'"
                      icon="pi pi-sliders-h"
                      text
                      size="small"
                      @click="(e) => chooser?.toggle(e)"
                    />
                    <Popover ref="chooser">
                      <div
                        style="
                          display: flex;
                          flex-direction: column;
                          gap: 0.35rem;
                          min-width: 180px;
                        "
                      >
                        <div
                          v-for="col in baseColumns"
                          :key="col.field"
                          style="display: flex; align-items: center; gap: 0.5rem"
                        >
                          <Checkbox
                            :model-value="!columnState.hidden.includes(col.field)"
                            :input-id="`wcrud-col-${col.field}`"
                            binary
                            @update:model-value="(v) => toggleColumn(col.field, !!v)"
                          />
                          <label
                            :for="`wcrud-col-${col.field}`"
                            style="font-size: 0.85rem; cursor: pointer"
                          >
                            {{ col.header }}
                          </label>
                        </div>
                      </div>
                    </Popover>
                  </template>
                  <Button
                    v-if="exportCsv"
                    v-tooltip.top="
                      csvScope === 'all' ? 'Exportar tudo (CSV)' : 'Exportar página (CSV)'
                    "
                    icon="pi pi-download"
                    text
                    size="small"
                    :loading="exporting"
                    @click="doExportCsv"
                  />
                  <div v-if="viewToggle" class="w-crud-view-toggle">
                    <Button
                      icon="pi pi-table"
                      size="small"
                      :text="!isView('table')"
                      :outlined="isView('table')"
                      @click="setView('table')"
                    />
                    <Button
                      icon="pi pi-th-large"
                      size="small"
                      :text="!isView('cards')"
                      :outlined="isView('cards')"
                      @click="setView('cards')"
                    />
                  </div>
                  <Button
                    v-if="!showHeader && canCreate && !actionRail"
                    label="Novo"
                    icon="pi pi-plus"
                    @click="crud.openCreateDialog()"
                  />
                </div>
              </div>
            </template>

            <template #empty>
              <slot name="empty">
                <div class="w-crud-empty">
                  <div class="w-crud-empty-icon">
                    <i class="pi pi-inbox" />
                  </div>
                  <p class="w-crud-empty-title">Nenhum registro encontrado</p>
                  <p class="w-crud-empty-text">Tente ajustar sua busca ou crie um novo registro</p>
                </div>
              </slot>
            </template>

            <!-- Seleção múltipla (checkbox) -->
            <Column v-if="isMultiSelect" selection-mode="multiple" style="width: 3rem" />

            <!-- Expander -->
            <Column v-if="expandable" expander style="width: 3rem" />

            <!-- Data columns -->
            <Column
              v-for="col in visibleColumns"
              :key="col.field"
              :field="col.field"
              :header="col.header"
              :sortable="col.sortable"
              :style="col.style"
              :header-class="colAlignClass(col)"
              :body-class="colAlignClass(col)"
            >
              <template #body="{ data }">
                <slot :name="`column-${col.field}`" :data="data" :value="data[col.field]">
                  <WCrudColumnRenderer :column="col" :value="data[col.field]" :row-data="data" />
                </slot>
              </template>
              <template v-if="isCellEdit && inlineField(col.field)" #editor="{ data }">
                <InputNumber
                  v-if="['number', 'currency'].includes(inlineField(col.field)?.type || '')"
                  :model-value="(data[col.field] as number) ?? null"
                  fluid
                  @update:model-value="
                    (v) => {
                      data[col.field] = v
                    }
                  "
                />
                <InputText
                  v-else
                  :model-value="(data[col.field] as string) ?? ''"
                  fluid
                  @update:model-value="
                    (v) => {
                      data[col.field] = v
                    }
                  "
                />
              </template>
            </Column>

            <!-- Actions column (oculta quando a action rail está ativa) -->
            <Column
              v-if="hasActions && !actionRail"
              header-class="w-crud-actions-header"
              :style="{
                width: `${(effectiveRowActions.length + (slots['row-actions'] ? 1 : 0)) * 2.5 + 1}rem`,
              }"
            >
              <template #body="{ data }">
                <div class="w-crud-actions">
                  <template v-for="action in effectiveRowActions" :key="action.action">
                    <Button
                      v-if="isActionVisible(action, data)"
                      v-tooltip.top="action.tooltip"
                      :icon="action.icon"
                      text
                      rounded
                      size="small"
                      :severity="action.severity as any"
                      :disabled="isActionDisabled(action, data)"
                      @click="handleRowAction(action, data)"
                    />
                  </template>
                  <slot name="row-actions" :data="data" :crud="crud" />
                </div>
              </template>
            </Column>

            <!-- Expansion -->
            <template v-if="expandable" #expansion="slotProps">
              <slot name="expansion" :data="slotProps.data" />
            </template>
          </DataTable>
        </div>

        <!-- Cards view -->
        <div v-else class="w-crud-cards-wrap">
          <div class="w-crud-toolbar w-crud-toolbar--standalone">
            <div class="w-crud-toolbar-start">
              <IconField v-if="showSearch">
                <InputIcon class="pi pi-search" />
                <InputText
                  :model-value="crud.search.value"
                  placeholder="Buscar..."
                  class="w-72"
                  @input="crud.onSearch"
                />
              </IconField>
              <slot name="toolbar-start" />
              <slot name="toolbar-filters" />
            </div>
            <div class="w-crud-toolbar-end">
              <slot name="toolbar-actions" />
              <Button
                v-if="exportCsv"
                v-tooltip.top="csvScope === 'all' ? 'Exportar tudo (CSV)' : 'Exportar página (CSV)'"
                icon="pi pi-download"
                text
                size="small"
                :loading="exporting"
                @click="doExportCsv"
              />
              <div v-if="viewToggle" class="w-crud-view-toggle">
                <Button
                  icon="pi pi-table"
                  size="small"
                  :text="!isView('table')"
                  :outlined="isView('table')"
                  @click="setView('table')"
                />
                <Button
                  icon="pi pi-th-large"
                  size="small"
                  :text="!isView('cards')"
                  :outlined="isView('cards')"
                  @click="setView('cards')"
                />
              </div>
              <Button
                v-if="!showHeader && canCreate && !actionRail"
                label="Novo"
                icon="pi pi-plus"
                @click="crud.openCreateDialog()"
              />
            </div>
          </div>

          <div v-if="crud.loading.value" class="w-crud-cards-loading">
            <i class="pi pi-spin pi-spinner" />
          </div>

          <slot v-else-if="!crud.items.value.length" name="empty">
            <div class="w-crud-empty">
              <div class="w-crud-empty-icon">
                <i class="pi pi-inbox" />
              </div>
              <p class="w-crud-empty-title">Nenhum registro encontrado</p>
              <p class="w-crud-empty-text">Tente ajustar sua busca ou crie um novo registro</p>
            </div>
          </slot>

          <div v-else class="w-crud-cards">
            <div
              v-for="(row, idx) in crud.items.value"
              :key="(row[crud.config.pk || 'id'] as string | number) ?? idx"
              class="w-crud-card"
              :class="{ 'w-crud-card--selected': selectedRow === row }"
              @click="selectRow(row)"
              @dblclick="crud.config.canEdit !== false && crud.openEditDialog(row)"
              @contextmenu="onCardContextMenu($event, row)"
            >
              <div class="w-crud-card-body">
                <div
                  v-for="(col, ci) in cardColumns"
                  :key="col.field"
                  class="w-crud-card-row"
                  :class="{ 'w-crud-card-row--title': ci === 0 }"
                >
                  <span v-if="ci !== 0" class="w-crud-card-label">{{ col.header }}</span>
                  <span class="w-crud-card-value">
                    <slot :name="`column-${col.field}`" :data="row" :value="row[col.field]">
                      <WCrudColumnRenderer :column="col" :value="row[col.field]" :row-data="row" />
                    </slot>
                  </span>
                </div>
              </div>
              <div v-if="hasActions && !actionRail" class="w-crud-card-actions">
                <template v-for="action in effectiveRowActions" :key="action.action">
                  <Button
                    v-if="isActionVisible(action, row)"
                    v-tooltip.top="action.tooltip"
                    :icon="action.icon"
                    text
                    rounded
                    size="small"
                    :severity="action.severity as any"
                    :disabled="isActionDisabled(action, row)"
                    @click="handleRowAction(action, row)"
                  />
                </template>
                <slot name="row-actions" :data="row" :crud="crud" />
              </div>
            </div>
          </div>

          <Paginator
            v-if="crud.items.value.length"
            :rows="crud.pagination.pageSize"
            :total-records="crud.pagination.rows"
            :first="paginatorFirst"
            :rows-per-page-options="[10, 20, 50]"
            template="CurrentPageReport PrevPageLink NextPageLink"
            current-page-report-template="Página {currentPage} de {totalPages}"
            class="w-crud-paginator"
            @page="crud.onPage"
          />
        </div>
      </div>
      <!-- /.w-crud-content-main -->

      <!-- Floating action rail (todas as actions vivem aqui) -->
      <aside v-if="actionRail" class="w-crud-rail">
        <Button
          v-if="canCreate"
          v-tooltip.left="'Novo'"
          icon="pi pi-plus"
          rounded
          @click="crud.openCreateDialog()"
        />
        <div v-if="canCreate && effectiveRowActions.length" class="w-crud-rail-sep" />
        <template v-for="action in effectiveRowActions" :key="action.action">
          <Button
            v-if="!selectedRow || isActionVisible(action, selectedRow)"
            v-tooltip.left="action.tooltip"
            :icon="action.icon"
            text
            rounded
            :severity="action.severity as any"
            :disabled="!selectedRow || isActionDisabled(action, selectedRow)"
            @click="selectedRow && handleRowAction(action, selectedRow)"
          />
        </template>
        <slot name="rail-actions" :selected="selectedRow" :crud="crud" />
        <div v-if="showPrint || exportCsv" class="w-crud-rail-sep" />
        <Button
          v-if="showPrint"
          v-tooltip.left="'Imprimir'"
          icon="pi pi-print"
          text
          rounded
          :disabled="!selectedRow"
          @click="railPrint"
        />
        <Button
          v-if="exportCsv"
          v-tooltip.left="csvScope === 'all' ? 'Exportar tudo (CSV)' : 'Exportar página (CSV)'"
          icon="pi pi-download"
          text
          rounded
          :loading="exporting"
          @click="doExportCsv"
        />
      </aside>
    </div>
    <!-- /.w-crud-content -->

    <!-- Context menu -->
    <ContextMenu v-if="contextMenu" ref="cm" :model="contextMenuItems" />

    <!-- Form Dialog -->
    <slot name="form-dialog" :crud="crud" :dialog-width="dialogWidth">
      <WCrudFormDialog
        :visible="crud.dialogVisible.value"
        :title="crud.dialogTitle.value"
        :fields="crud.config.form"
        :form-data="crud.formData"
        :is-editing="crud.isEditing.value"
        :saving="crud.saving.value"
        :disabled="crud.viewMode?.value ?? false"
        :width="dialogWidth"
        :form-columns="formColumns ?? crud.config.formColumns"
        :keyboard-nav="crud.config.keyboardNav"
        @update:visible="
          (v) => {
            crud.dialogVisible.value = v
            if (!v) crud.editingItem.value = null
          }
        "
        @update:field="(field, val) => crud.setFormField(field, val)"
        @save="crud.save()"
      >
        <template
          v-for="field in crud.config.form"
          :key="field.field"
          #[`field-${field.field}`]="scope"
        >
          <slot :name="`field-${field.field}`" v-bind="scope" />
        </template>
      </WCrudFormDialog>
    </slot>
  </div>
</template>
