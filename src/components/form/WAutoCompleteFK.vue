<script setup lang="ts">
import { ref, watch, computed, inject, reactive } from 'vue'
import type { AxiosInstance } from 'axios'
import AutoComplete from 'primevue/autocomplete'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { W_AXIOS_KEY } from '@/types/plugin'
import type { FieldDef, ColumnDef } from '@/types/crud'
import type { ApiFieldMeta } from '@/utils/fieldMapper'
import { mapApiFieldsToFieldDefs, mapApiFieldsToColumnDefs } from '@/utils/fieldMapper'
import { useAppToast } from '@/composables/useAppToast'
import { useAppConfirm } from '@/composables/useAppConfirm'
import { extractApiError } from '@/composables/useApiError'
import WCrudFormDialog from '@/components/crud/WCrudFormDialog.vue'
import WCrudColumnRenderer from '@/components/crud/WCrudColumnRenderer.vue'

interface ColumnMeta {
  field: string
  header: string
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number | Record<string, unknown> | null
    endpoint: string
    optionLabel?: string
    optionValue?: string
    placeholder?: string
    disabled?: boolean
    showClear?: boolean
    forceSelection?: boolean
    columns?: ColumnMeta[]
    minLength?: number
    // CRUD no modal
    canCreate?: boolean
    canEdit?: boolean
    canDelete?: boolean
    crudFields?: FieldDef[]
    crudColumns?: ColumnDef[]
    dialogWidth?: string
  }>(),
  {
    optionLabel: 'nome',
    optionValue: 'id',
    placeholder: 'Buscar...',
    disabled: false,
    showClear: true,
    forceSelection: true,
    minLength: 0,
    canCreate: undefined,
    canEdit: undefined,
    canDelete: undefined,
    dialogWidth: '480px',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown> | null]
}>()

const injectedAxios = inject<AxiosInstance>(W_AXIOS_KEY)
if (!injectedAxios) {
  throw new Error('[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin.')
}
const axios = injectedAxios

const toast = useAppToast()
const { confirmDelete: confirmDeleteDialog } = useAppConfirm()

// ---------------------------------------------------------------------------
// Inline autocomplete
// ---------------------------------------------------------------------------

const selectedItem = ref<Record<string, unknown> | null>(null)
const suggestions = ref<Record<string, unknown>[]>([])
const searching = ref(false)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

async function fetchById(id: string | number) {
  try {
    const response = await axios.get(`${props.endpoint}${id}/`)
    selectedItem.value = response.data
  } catch {
    selectedItem.value = null
  }
}

async function search(query: string) {
  searching.value = true
  try {
    const params: Record<string, unknown> = { page_size: 20 }
    if (query) params.search = query
    const response = await axios.get(props.endpoint, { params })
    const rd = response.data
    suggestions.value = rd.data ?? rd.results ?? rd
  } catch {
    suggestions.value = []
  } finally {
    searching.value = false
  }
}

function onSearch(event: { query: string }) {
  const query = event.query || ''
  if (query.length < props.minLength) {
    suggestions.value = []
    return
  }
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => search(query), 300)
}

function onSelect(event: { value: Record<string, unknown> }) {
  selectedItem.value = event.value
  emit('update:modelValue', event.value)
}

function onClear() {
  selectedItem.value = null
  emit('update:modelValue', null)
}

// Resolve initial value
watch(
  () => props.modelValue,
  async (newVal) => {
    if (newVal != null) {
      if (typeof newVal === 'object' && newVal !== null && props.optionLabel in newVal) {
        selectedItem.value = newVal as Record<string, unknown>
        return
      }
      if (!selectedItem.value || selectedItem.value[props.optionValue] !== newVal) {
        await fetchById(newVal as string | number)
      }
    } else {
      selectedItem.value = null
    }
  },
  { immediate: true },
)

// ---------------------------------------------------------------------------
// Modal — State
// ---------------------------------------------------------------------------

const modalVisible = ref(false)
const modalData = ref<Record<string, unknown>[]>([])
const modalLoading = ref(false)
const modalSearch = ref('')
const modalPage = ref(1)
const modalPageSize = ref(15)
const modalTotalRecords = ref(0)
const modalSelection = ref<Record<string, unknown> | null>(null)
const modalSortField = ref<string | null>(null)
const modalSortOrder = ref<1 | -1 | 0>(0)
let modalSearchTimer: ReturnType<typeof setTimeout> | null = null

// Metadata from extras.fields
const apiFields = ref<ApiFieldMeta[]>([])
const crudAvailable = computed(() => {
  // Se o usuário forneceu crudFields, CRUD está habilitado
  if (props.crudFields?.length) return true
  // Se a API retornou extras.fields, CRUD está disponível
  return apiFields.value.length > 0
})

// Respeita props explícitas, senão auto-detecta
const showCreate = computed(() => props.canCreate ?? crudAvailable.value)
const showEdit = computed(() => props.canEdit ?? crudAvailable.value)
const showDelete = computed(() => props.canDelete ?? crudAvailable.value)
const hasRowActions = computed(() => showEdit.value || showDelete.value)

// Campos do form — prioridade: props > auto-gerados do extras
const formFields = computed<FieldDef[]>(() => {
  if (props.crudFields?.length) return props.crudFields
  return mapApiFieldsToFieldDefs(apiFields.value)
})

// Colunas do modal — prioridade: crudColumns > props.columns > auto-geradas > fallback
const modalColumns = computed<ColumnDef[]>(() => {
  if (props.crudColumns?.length) return props.crudColumns
  if (props.columns?.length) {
    return props.columns.map((c) => ({
      field: c.field,
      header: c.header,
      sortable: true,
    }))
  }
  if (apiFields.value.length) {
    return mapApiFieldsToColumnDefs(apiFields.value)
  }
  return [{ field: props.optionLabel, header: props.optionLabel, sortable: true }]
})

// ---------------------------------------------------------------------------
// Modal — Fetch
// ---------------------------------------------------------------------------

async function fetchModalData() {
  modalLoading.value = true
  try {
    const params: Record<string, unknown> = {
      page: modalPage.value,
      page_size: modalPageSize.value,
    }
    if (modalSearch.value) params.search = modalSearch.value
    if (modalSortField.value && modalSortOrder.value !== 0) {
      params.ordering =
        modalSortOrder.value === -1
          ? `-${modalSortField.value}`
          : modalSortField.value
    }
    const response = await axios.get(props.endpoint, { params })
    const rd = response.data
    modalData.value = rd.data ?? rd.results ?? rd
    modalTotalRecords.value = rd.count ?? rd.rows ?? 0

    // Captura metadata de campos na primeira requisição
    if (rd.extras?.fields && !props.columns?.length && !props.crudFields?.length) {
      apiFields.value = rd.extras.fields
    }
  } catch {
    modalData.value = []
    modalTotalRecords.value = 0
  } finally {
    modalLoading.value = false
  }
}

function openModal() {
  if (props.disabled) return
  modalSearch.value = ''
  modalPage.value = 1
  modalSortField.value = null
  modalSortOrder.value = 0
  modalSelection.value = null
  modalVisible.value = true
  fetchModalData()
}

function onModalPage(event: { page: number; rows: number }) {
  modalPage.value = event.page + 1
  modalPageSize.value = event.rows
  fetchModalData()
}

function onModalSort(event: { sortField?: string; sortOrder?: 1 | -1 | 0 }) {
  modalSortField.value = (event.sortField as string) ?? null
  modalSortOrder.value = event.sortOrder ?? 0
  modalPage.value = 1
  fetchModalData()
}

function confirmModalSelection() {
  if (!modalSelection.value) return
  selectedItem.value = modalSelection.value
  emit('update:modelValue', modalSelection.value)
  modalVisible.value = false
}

function onRowDblClick(event: { data: Record<string, unknown> }) {
  selectedItem.value = event.data
  emit('update:modelValue', event.data)
  modalVisible.value = false
}

watch(modalSearch, () => {
  if (modalSearchTimer) clearTimeout(modalSearchTimer)
  modalSearchTimer = setTimeout(() => {
    modalPage.value = 1
    fetchModalData()
  }, 300)
})

// ---------------------------------------------------------------------------
// Modal — CRUD
// ---------------------------------------------------------------------------

const formDialogVisible = ref(false)
const formSaving = ref(false)
const editingItem = ref<Record<string, unknown> | null>(null)
const formData = reactive<Record<string, unknown>>({})

const isEditing = computed(() => editingItem.value !== null)
const formDialogTitle = computed(() =>
  isEditing.value ? 'Editar Registro' : 'Novo Registro',
)

function getDefaults(): Record<string, unknown> {
  const defaults: Record<string, unknown> = {}
  for (const f of formFields.value) {
    defaults[f.field] =
      f.defaultValue !== undefined
        ? typeof f.defaultValue === 'function'
          ? (f.defaultValue as () => unknown)()
          : f.defaultValue
        : null
  }
  return defaults
}

function resetForm() {
  const defs = getDefaults()
  for (const key of Object.keys(formData)) {
    delete formData[key]
  }
  for (const [key, val] of Object.entries(defs)) {
    formData[key] = val
  }
}

function openCreateForm() {
  editingItem.value = null
  resetForm()
  formDialogVisible.value = true
}

function openEditForm(item: Record<string, unknown>) {
  editingItem.value = item
  for (const f of formFields.value) {
    formData[f.field] = item[f.field] !== undefined ? item[f.field] : null
  }
  formDialogVisible.value = true
}

function setFormField(field: string, value: unknown) {
  formData[field] = value
}

async function saveForm() {
  formSaving.value = true
  try {
    const payload = { ...formData }

    // FK — extrair ID de objetos selecionados
    for (const f of formFields.value) {
      const val = payload[f.field]
      if (f.type === 'fk' && val !== null && typeof val === 'object') {
        const key = f.optionValue || 'id'
        payload[f.field] = (val as Record<string, unknown>)[key] ?? val
      }
    }

    let response

    if (isEditing.value && editingItem.value) {
      const pk = editingItem.value[props.optionValue]
      response = await axios.patch(
        `${props.endpoint}${pk}/`,
        payload,
      )
      // Atualiza na lista do modal
      const idx = modalData.value.findIndex(
        (i) => i[props.optionValue] === pk,
      )
      if (idx !== -1) {
        modalData.value[idx] = response.data
      }
      toast.success('Registro atualizado com sucesso')
    } else {
      response = await axios.post(props.endpoint, payload)
      // Adiciona na lista e seleciona automaticamente
      modalData.value.unshift(response.data)
      modalTotalRecords.value++
      toast.success('Registro criado com sucesso')
    }

    formDialogVisible.value = false
    editingItem.value = null

    // Auto-seleciona o registro criado/editado
    modalSelection.value = response.data
  } catch (err) {
    toast.error(extractApiError(err, 'Erro ao salvar registro'))
  } finally {
    formSaving.value = false
  }
}

function confirmDelete(item: Record<string, unknown>) {
  confirmDeleteDialog(async () => {
    try {
      const pk = item[props.optionValue]
      await axios.delete(`${props.endpoint}${pk}/`)
      const idx = modalData.value.findIndex(
        (i) => i[props.optionValue] === pk,
      )
      if (idx !== -1) {
        modalData.value.splice(idx, 1)
        modalTotalRecords.value--
      }
      // Se o item deletado era a seleção atual, limpa
      if (
        selectedItem.value &&
        selectedItem.value[props.optionValue] === pk
      ) {
        selectedItem.value = null
        emit('update:modelValue', null)
      }
      if (
        modalSelection.value &&
        modalSelection.value[props.optionValue] === pk
      ) {
        modalSelection.value = null
      }
      toast.success('Registro excluído com sucesso')
    } catch (err) {
      toast.error(extractApiError(err, 'Erro ao excluir registro'))
    }
  })
}
</script>

<template>
  <div class="w-autocompletefk">
    <AutoComplete
      :model-value="selectedItem"
      :suggestions="suggestions"
      :option-label="optionLabel"
      :placeholder="placeholder"
      :disabled="disabled"
      :force-selection="forceSelection"
      :loading="searching"
      fluid
      @complete="onSearch"
      @item-select="onSelect"
      @clear="onClear"
    />
    <button
      v-tooltip.top="'Pesquisar'"
      type="button"
      :disabled="disabled"
      class="w-autocompletefk-trigger"
      @click="openModal"
    >
      <i class="pi pi-search" />
    </button>
  </div>

  <!-- Modal de Pesquisa + CRUD -->
  <Dialog
    v-model:visible="modalVisible"
    header="Pesquisar"
    :style="{ width: '80vw' }"
    modal
    :draggable="false"
    class="w-autocompletefk-dialog"
  >
    <div class="w-autocompletefk-toolbar">
      <IconField class="w-autocompletefk-toolbar-search">
        <InputIcon class="pi pi-search" />
        <InputText v-model="modalSearch" placeholder="Pesquisar..." class="w-full" />
      </IconField>
      <div class="w-autocompletefk-toolbar-actions">
        <Button
          v-if="showCreate"
          label="Novo"
          icon="pi pi-plus"
          size="small"
          @click="openCreateForm"
        />
      </div>
    </div>

    <DataTable
      v-model:selection="modalSelection"
      :value="modalData"
      :loading="modalLoading"
      paginator
      lazy
      striped-rows
      removable-sort
      size="small"
      :rows="modalPageSize"
      :total-records="modalTotalRecords"
      :sort-field="modalSortField ?? undefined"
      :sort-order="modalSortOrder"
      selection-mode="single"
      :data-key="optionValue"
      @page="onModalPage"
      @sort="(e: any) => onModalSort({ sortField: e.sortField, sortOrder: e.sortOrder })"
      @row-dblclick="onRowDblClick"
    >
      <Column selection-mode="single" header-style="width: 3rem" />
      <Column
        v-for="col in modalColumns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="(col as ColumnDef).sortable ?? true"
        :style="(col as ColumnDef).style"
      >
        <template #body="{ data }">
          <WCrudColumnRenderer
            v-if="(col as ColumnDef).type"
            :column="col as ColumnDef"
            :value="data[col.field]"
            :row-data="data"
          />
          <template v-else>
            {{ data[col.field] }}
          </template>
        </template>
      </Column>

      <!-- Coluna de ações CRUD -->
      <Column
        v-if="hasRowActions"
        header=""
        :style="{ width: '6rem' }"
      >
        <template #body="{ data }">
          <div class="flex items-center justify-end gap-1">
            <Button
              v-if="showEdit"
              v-tooltip.top="'Editar'"
              icon="pi pi-pencil"
              text
              rounded
              size="small"
              @click="openEditForm(data)"
            />
            <Button
              v-if="showDelete"
              v-tooltip.top="'Excluir'"
              icon="pi pi-trash"
              text
              rounded
              size="small"
              severity="danger"
              @click="confirmDelete(data)"
            />
          </div>
        </template>
      </Column>

      <template #empty>
        <div class="w-autocompletefk-empty">
          Nenhum registro encontrado
        </div>
      </template>
    </DataTable>

    <template #footer>
      <div class="w-autocompletefk-footer">
        <Button label="Cancelar" severity="secondary" text @click="modalVisible = false" />
        <Button
          label="Selecionar"
          icon="pi pi-check"
          :disabled="!modalSelection"
          @click="confirmModalSelection"
        />
      </div>
    </template>
  </Dialog>

  <!-- Form Dialog (CRUD) — nested sobre o modal -->
  <WCrudFormDialog
    v-if="crudAvailable"
    :visible="formDialogVisible"
    :title="formDialogTitle"
    :fields="formFields"
    :form-data="formData"
    :is-editing="isEditing"
    :saving="formSaving"
    :width="dialogWidth"
    @update:visible="(v) => { formDialogVisible = v; if (!v) editingItem = null }"
    @update:field="setFormField"
    @save="saveForm"
  />
</template>

