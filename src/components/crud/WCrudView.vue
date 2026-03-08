<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import WCrudColumnRenderer from './WCrudColumnRenderer.vue'
import WCrudFormDialog from './WCrudFormDialog.vue'
import type { CrudManagerReturn, RowAction, KpiItem } from '@/types/crud'
import { useFormatters } from '@/composables/useFormatters'

const props = withDefaults(
  defineProps<{
    crud: CrudManagerReturn<any>
    title: string
    subtitle?: string
    showSearch?: boolean
    showHeader?: boolean
    dialogWidth?: string
    autoInit?: boolean
    showKpi?: boolean
    kpiIcon?: string
    kpiLabel?: string
    extraKpis?: KpiItem[]
    expandable?: boolean
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
  },
)

const emit = defineEmits<{
  'row-expand': [data: unknown]
  'row-collapse': [data: unknown]
}>()

const { formatNumber } = useFormatters()

const expandedRows = ref({})

// --- Columns ---

const visibleColumns = computed(() =>
  props.crud.config.columns
    .filter((c) => c.visible !== false)
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

// --- Row Actions ---

const defaultActions = computed<RowAction[]>(() => {
  const actions: RowAction[] = []
  if (props.crud.config.canCreate !== false && props.crud.config.canEdit !== false) {
    actions.push({ action: 'edit', icon: 'pi pi-pencil', tooltip: 'Editar' })
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

const hasActions = computed(() => effectiveRowActions.value.length > 0)

function handleRowAction(action: RowAction, data: Record<string, unknown>) {
  if (action.action === 'edit') {
    props.crud.openEditDialog(data)
  } else if (action.action === 'view') {
    props.crud.openViewDialog(data)
  } else if (action.action === 'delete') {
    props.crud.confirmDelete(data)
  } else if (action.handler) {
    action.handler(data)
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

// --- Labels from config ---

const labels = computed(() => props.crud.config.labels ?? {})
const canCreate = computed(() => props.crud.config.canCreate !== false)

// --- Init ---

onMounted(() => {
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
          v-if="canCreate"
          label="Novo"
          icon="pi pi-plus"
          @click="crud.openCreateDialog()"
        />
      </div>
    </div>

    <!-- KPIs -->
    <slot name="before-table">
      <div v-if="allKpis.length" class="w-crud-kpis">
        <div
          v-for="(kpi, idx) in allKpis"
          :key="idx"
          class="w-crud-kpi"
        >
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

    <!-- Table -->
    <div class="w-crud-table">
      <DataTable
        :value="crud.items.value"
        :loading="crud.loading.value"
        v-model:expanded-rows="expandedRows"
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
        @page="crud.onPage"
        @sort="(e: any) => crud.onSort({ sortField: e.sortField, sortOrder: e.sortOrder })"
        @row-expand="(e) => emit('row-expand', e.data)"
        @row-collapse="(e) => emit('row-collapse', e.data)"
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
              <Button
                v-if="!showHeader && canCreate"
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
              <WCrudColumnRenderer
                :column="col"
                :value="data[col.field]"
                :row-data="data"
              />
            </slot>
          </template>
        </Column>

        <!-- Actions column -->
        <Column
          v-if="hasActions"
          header-class="w-crud-actions-header"
          :style="{ width: `${effectiveRowActions.length * 2.5 + 1}rem` }"
        >
          <template #body="{ data }">
            <slot name="row-actions" :data="data" :crud="crud">
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
              </div>
            </slot>
          </template>
        </Column>

        <!-- Expansion -->
        <template v-if="expandable" #expansion="slotProps">
          <slot name="expansion" :data="slotProps.data" />
        </template>
      </DataTable>
    </div>

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
        @update:visible="(v) => { crud.dialogVisible.value = v; if (!v) crud.editingItem.value = null }"
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
