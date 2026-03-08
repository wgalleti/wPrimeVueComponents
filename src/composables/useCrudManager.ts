import { ref, reactive, computed, inject } from 'vue'
import type { AxiosInstance } from 'axios'
import { W_AXIOS_KEY, W_CONFIG_KEY } from '@/types/plugin'
import type { WPluginConfig } from '@/types/plugin'
import type { PaginationState, SortState } from '@/types/api'
import type {
  CrudManagerConfig,
  CrudManagerReturn,
  CrudLabels,
  FieldDef,
  ColumnDef,
  RowAction,
} from '@/types/crud'
import { DEFAULT_CRUD_LABELS } from '@/types/crud'
import { useAppToast } from './useAppToast'
import { useAppConfirm } from './useAppConfirm'
import { extractApiError } from './useApiError'
import { parseDate, toDateString, toDateTimeString } from '@/utils/dates'
import { stripMask } from '@/utils/masks'

export function useCrudManager<T extends Record<string, unknown> = Record<string, unknown>>(
  config: CrudManagerConfig<T>,
): CrudManagerReturn<T> {
  const {
    endpoint,
    columns,
    form: formFields,
    pk = 'id',
    searchDebounce = 300,
    canCreate = true,
    canEdit = true,
    canDelete = true,
    rowActions = undefined,
    filterParams = undefined,
    transformPayload = undefined,
    onAfterSave = undefined,
    onAfterDelete = undefined,
  } = config

  const injectedAxios = inject<AxiosInstance>(W_AXIOS_KEY)
  if (!injectedAxios) {
    throw new Error(
      '[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager.',
    )
  }
  const axios = injectedAxios

  const pluginConfig = inject<WPluginConfig>(W_CONFIG_KEY)
  const defaultPageSize = config.pageSize ?? pluginConfig?.defaultPageSize ?? 20

  const labels: CrudLabels = { ...DEFAULT_CRUD_LABELS, ...config.labels }
  const toast = useAppToast()
  const { confirmDelete: confirmDeleteDialog } = useAppConfirm()

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  const items = ref<T[]>([]) as import('vue').Ref<T[]>
  const extras = ref<Record<string, unknown>>({})
  const loading = ref(false)
  const saving = ref(false)
  const search = ref('')
  const dialogVisible = ref(false)
  const viewMode = ref(false)
  const editingItem = ref<T | null>(null) as import('vue').Ref<T | null>
  const formData = reactive<Record<string, unknown>>({})

  const pagination: PaginationState = reactive({
    page: 1,
    pageSize: defaultPageSize,
    rows: 0,
    totalPages: 0,
  })

  const sort: SortState = reactive({
    field: null,
    order: 0,
  })

  // ---------------------------------------------------------------------------
  // Defaults
  // ---------------------------------------------------------------------------

  function getDefaults(): Record<string, unknown> {
    const defaults: Record<string, unknown> = {}
    for (const f of formFields) {
      defaults[f.field] =
        f.defaultValue !== undefined
          ? typeof f.defaultValue === 'function'
            ? (f.defaultValue as () => unknown)()
            : f.defaultValue
          : null
    }
    return defaults
  }

  // Initialize
  const defaults = getDefaults()
  for (const key of Object.keys(defaults)) {
    formData[key] = defaults[key]
  }

  // ---------------------------------------------------------------------------
  // Computed
  // ---------------------------------------------------------------------------

  const isEditing = computed(() => editingItem.value !== null && !viewMode.value)
  const isViewing = computed(() => viewMode.value)
  const dialogTitle = computed(() =>
    viewMode.value ? labels.viewTitle ?? 'Visualizar Registro' : isEditing.value ? labels.editTitle : labels.createTitle,
  )
  const isFirstPage = computed(() => pagination.page <= 1)
  const isLastPage = computed(() => pagination.page >= pagination.totalPages)

  // ---------------------------------------------------------------------------
  // Fetch
  // ---------------------------------------------------------------------------

  let searchTimeout: ReturnType<typeof setTimeout> | null = null

  async function fetchItems(params: Record<string, unknown> = {}): Promise<void> {
    loading.value = true
    try {
      const queryParams: Record<string, unknown> = {
        page: pagination.page,
        page_size: pagination.pageSize,
        ...params,
      }

      if (search.value) {
        queryParams.search = search.value
      }

      if (sort.field && sort.order !== 0) {
        queryParams.ordering = sort.order === -1 ? `-${sort.field}` : sort.field
      }

      if (filterParams) {
        Object.assign(queryParams, filterParams())
      }

      const response = await axios.get(endpoint, { params: queryParams })
      const responseData = response.data

      // Suporta { data, page, rows } (custom) e { results, count } (DRF padrão)
      if (Array.isArray(responseData.results)) {
        items.value = responseData.results
        pagination.rows = responseData.count ?? 0
      } else {
        items.value = responseData.data ?? []
        pagination.rows = responseData.rows ?? 0
      }

      if (responseData.extras) {
        extras.value = responseData.extras
      }

      if (responseData.page) pagination.page = responseData.page
      if (responseData.page_size) pagination.pageSize = responseData.page_size
      pagination.totalPages =
        Math.ceil(pagination.rows / pagination.pageSize) || 0
    } finally {
      loading.value = false
    }
  }

  async function init(): Promise<void> {
    await fetchItems()
  }

  async function refresh(): Promise<void> {
    await fetchItems()
  }

  // ---------------------------------------------------------------------------
  // Search
  // ---------------------------------------------------------------------------

  function setSearch(value: string): void {
    search.value = value
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      pagination.page = 1
      fetchItems()
    }, searchDebounce)
  }

  function onSearch(event: Event): void {
    const target = event.target as HTMLInputElement
    setSearch(target.value)
  }

  // ---------------------------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------------------------

  function goToPage(page: number): void {
    pagination.page = page
    fetchItems()
  }

  function firstPage(): void {
    goToPage(1)
  }

  function lastPage(): void {
    goToPage(pagination.totalPages)
  }

  function onPage(event: { page: number; rows: number }): void {
    pagination.page = event.page + 1
    pagination.pageSize = event.rows
    fetchItems()
  }

  function onSort(event: { sortField?: string | null; sortOrder?: 1 | -1 | 0 | null }): void {
    sort.field = event.sortField ?? null
    sort.order = event.sortOrder ?? 0
    pagination.page = 1
    fetchItems()
  }

  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------

  function resetForm(): void {
    const defs = getDefaults()
    for (const key of Object.keys(defs)) {
      formData[key] = defs[key]
    }
  }

  function setFormField(field: string, value: unknown): void {
    formData[field] = value
  }

  function openCreateDialog(): void {
    viewMode.value = false
    editingItem.value = null
    resetForm()
    dialogVisible.value = true
  }

  function openEditDialog(item: T): void {
    viewMode.value = false
    editingItem.value = item
    for (const f of formFields) {
      let value = item[f.field] !== undefined ? item[f.field] : null
      if (value && (f.type === 'date' || f.type === 'datetime') && typeof value === 'string') {
        value = parseDate(value)
      }
      formData[f.field] = value
    }
    dialogVisible.value = true
  }

  function openViewDialog(item: T): void {
    viewMode.value = true
    editingItem.value = item
    for (const f of formFields) {
      let value = item[f.field] !== undefined ? item[f.field] : null
      if (value && (f.type === 'date' || f.type === 'datetime') && typeof value === 'string') {
        value = parseDate(value)
      }
      formData[f.field] = value
    }
    dialogVisible.value = true
  }

  // ---------------------------------------------------------------------------
  // Save
  // ---------------------------------------------------------------------------

  async function save(): Promise<T | null> {
    // Validação
    for (const f of formFields) {
      if (f.validate) {
        const result = f.validate(formData[f.field])
        if (result) {
          toast.error(result)
          return null
        }
      }
      if (f.required) {
        const val = formData[f.field]
        if (val === null || val === undefined || val === '') {
          toast.error(`${f.label} é obrigatório`)
          return null
        }
      }
    }

    saving.value = true
    try {
      let payload: Record<string, unknown> = { ...formData }

      // Conversões automáticas
      for (const f of formFields) {
        const val = payload[f.field]

        // Datas
        if (f.type === 'date' && val instanceof Date) {
          payload[f.field] = toDateString(val)
        } else if (f.type === 'datetime' && val instanceof Date) {
          payload[f.field] = toDateTimeString(val)
        }

        // FK — extrair o ID do objeto selecionado
        if (f.type === 'fk' && val !== null && typeof val === 'object') {
          const key = f.optionValue || 'id'
          payload[f.field] = (val as Record<string, unknown>)[key] ?? val
        }

        // Máscaras — strip para enviar só dígitos
        if ((f.type === 'mask' || f.type === 'cpf_cnpj') && typeof val === 'string') {
          payload[f.field] = stripMask(val)
        }
      }

      if (transformPayload) {
        payload = transformPayload(payload, isEditing.value)
      }

      // Detecta se tem arquivo (image) → FormData
      const hasFile = formFields.some(
        (f) => f.type === 'image' && payload[f.field] instanceof File,
      )

      let body: Record<string, unknown> | FormData = payload
      let headers: Record<string, string> | undefined

      if (hasFile) {
        const imageFields = new Set(
          formFields.filter((f) => f.type === 'image').map((f) => f.field),
        )
        const fd = new FormData()
        for (const [key, val] of Object.entries(payload)) {
          if (val === null || val === undefined) continue
          if (val instanceof File) {
            fd.append(key, val)
          } else if (imageFields.has(key)) {
            // URL string de imagem inalterada — pula
            continue
          } else {
            fd.append(key, String(val))
          }
        }
        body = fd
        headers = { 'Content-Type': 'multipart/form-data' }
      }

      const requestConfig = headers ? { headers } : undefined
      let response

      if (isEditing.value && editingItem.value) {
        const itemPk = editingItem.value[pk as keyof T]
        response = await axios.patch<T>(
          `${endpoint}${itemPk}/`,
          body,
          requestConfig,
        )
        const index = items.value.findIndex(
          (i) => i[pk as keyof T] === itemPk,
        )
        if (index !== -1) {
          items.value[index] = response.data
        }
        toast.success(labels.successUpdate)
      } else {
        response = await axios.post<T>(endpoint, body, requestConfig)
        items.value.unshift(response.data)
        pagination.rows++
        toast.success(labels.successCreate)
      }

      dialogVisible.value = false
      editingItem.value = null

      if (onAfterSave) onAfterSave(response.data, isEditing.value)
      return response.data
    } catch (err) {
      toast.error(extractApiError(err, 'Erro ao salvar registro'))
      return null
    } finally {
      saving.value = false
    }
  }

  // ---------------------------------------------------------------------------
  // Delete
  // ---------------------------------------------------------------------------

  function confirmDelete(item: T): void {
    confirmDeleteDialog(async () => {
      try {
        const itemPk = item[pk as keyof T]
        await axios.delete(`${endpoint}${itemPk}/`)
        const index = items.value.findIndex(
          (i) => i[pk as keyof T] === itemPk,
        )
        if (index !== -1) {
          items.value.splice(index, 1)
          pagination.rows--
        }
        toast.success(labels.successDelete)
        if (onAfterDelete) onAfterDelete(item)
      } catch (err) {
        toast.error(extractApiError(err, 'Erro ao excluir registro'))
      }
    }, labels.deleteConfirmMessage)
  }

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    items,
    extras,
    loading,
    saving,
    search,
    dialogVisible,
    editingItem,
    formData,
    pagination,
    sort,
    isEditing,
    isViewing,
    viewMode,
    dialogTitle,
    isFirstPage,
    isLastPage,
    init,
    fetchItems,
    refresh,
    setSearch,
    onSearch,
    onPage,
    onSort,
    openCreateDialog,
    openEditDialog,
    openViewDialog,
    save,
    confirmDelete,
    setFormField,
    resetForm,
    goToPage,
    firstPage,
    lastPage,
    config,
  }
}
