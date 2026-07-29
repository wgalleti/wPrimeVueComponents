import { ref, reactive, computed, inject } from 'vue'
import { W_CONFIG_KEY, W_DATA_PROVIDER_KEY } from '@/types/plugin'
import type { WPluginConfig } from '@/types/plugin'
import type { DataProvider } from '@/types/dataProvider'
import type { PaginationState, SortState } from '@/types/api'
import type { CrudManagerConfig, CrudManagerReturn } from '@/types/manager'
import type { CrudLabels } from '@/types/labels'
import { DEFAULT_CRUD_LABELS } from '@/types/labels'
import { useAppToast } from './useAppToast'
import { useAppConfirm } from './useAppConfirm'
import { extractApiError } from './useApiError'
import { parseDate, toDateString, toDateTimeString } from '@/utils/dates'
import { stripMask } from '@/utils/masks'

/** Shallow diff: returns only the keys whose value changed between two records. */
function diffRecord(
  original: Record<string, unknown>,
  current: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(current)) {
    if (JSON.stringify(original[key]) !== JSON.stringify(current[key])) {
      out[key] = current[key]
    }
  }
  return out
}

export function useCrudManager<T extends Record<string, unknown> = Record<string, unknown>>(
  config: CrudManagerConfig<T>,
): CrudManagerReturn<T> {
  const {
    endpoint,
    form: formFields,
    pk = 'id',
    searchDebounce = 300,
    partialUpdate = true,
    refetchOnSave = true,
    filterParams = undefined,
    createDefaults = undefined,
    transformPayload = undefined,
    onAfterSave = undefined,
    onAfterDelete = undefined,
  } = config

  const dataProvider = inject<DataProvider>(W_DATA_PROVIDER_KEY)
  if (!dataProvider) {
    throw new Error(
      '[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager.',
    )
  }
  const provider = dataProvider

  const pluginConfig = inject<WPluginConfig>(W_CONFIG_KEY)
  const defaultPageSize = config.pageSize ?? pluginConfig?.defaultPageSize ?? 20

  const labels: CrudLabels = { ...DEFAULT_CRUD_LABELS, ...config.labels }
  const toast = useAppToast()
  const { confirmDelete: confirmDeleteDialog } = useAppConfirm()

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  const items = ref<T[]>([]) as import('vue').Ref<T[]>
  const selectedItems = ref<T[]>([]) as import('vue').Ref<T[]>
  const extras = ref<Record<string, unknown>>({})
  const loading = ref(false)
  const saving = ref(false)
  const search = ref('')
  const dialogVisible = ref(false)
  const viewMode = ref(false)
  const editingItem = ref<T | null>(null) as import('vue').Ref<T | null>
  const formData = reactive<Record<string, unknown>>({})
  // Snapshot of the form values when an edit dialog opens — used for diff-based PATCH.
  let editingOriginal: Record<string, unknown> | null = null

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

  // Filtros de coluna ativos (param → valor). Persistem entre páginas/ordenação.
  const columnFilters = reactive<Record<string, unknown>>({})

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
    viewMode.value
      ? (labels.viewTitle ?? 'Visualizar Registro')
      : isEditing.value
        ? labels.editTitle
        : labels.createTitle,
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

      // Filtros de coluna ativos (ignora vazios).
      for (const [key, val] of Object.entries(columnFilters)) {
        if (val !== null && val !== undefined && val !== '') queryParams[key] = val
      }

      const responseData = await provider.list<T>(endpoint, queryParams)
      items.value = responseData.data
      selectedItems.value = [] // seleção anterior fica obsoleta ao recarregar
      pagination.rows = responseData.rows
      extras.value = responseData.extras ?? {}
      if (responseData.page) pagination.page = responseData.page
      if (responseData.page_size) pagination.pageSize = responseData.page_size
      pagination.totalPages = Math.ceil(pagination.rows / pagination.pageSize) || 0
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

  /**
   * Fetch every record across all pages (respeitando search, sort e
   * filterParams atuais) sem alterar o estado da lista. Útil para exportações.
   */
  async function fetchAll(pageSize = 200): Promise<T[]> {
    const base: Record<string, unknown> = {}
    if (search.value) base.search = search.value
    if (sort.field && sort.order !== 0) {
      base.ordering = sort.order === -1 ? `-${sort.field}` : sort.field
    }
    if (filterParams) Object.assign(base, filterParams())
    for (const [key, val] of Object.entries(columnFilters)) {
      if (val !== null && val !== undefined && val !== '') base[key] = val
    }

    const all: T[] = []
    let page = 1
    // Hard cap para evitar loop infinito caso o backend não pagine corretamente.
    const maxPages = 10000
    while (page <= maxPages) {
      const res = await provider.list<T>(endpoint, {
        ...base,
        page,
        page_size: pageSize,
      })
      all.push(...res.data)
      const total = res.rows ?? all.length
      if (res.data.length === 0 || all.length >= total) break
      page++
    }
    return all
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
    editingOriginal = null
    resetForm()
    // Apply createDefaults (e.g. parent FK) on top of field defaults
    if (createDefaults) {
      const extra = createDefaults()
      for (const [key, val] of Object.entries(extra)) {
        formData[key] = val
      }
    }
    dialogVisible.value = true
  }

  function loadItemIntoForm(item: T): void {
    const snapshot: Record<string, unknown> = {}
    for (const f of formFields) {
      let value = item[f.field] !== undefined ? item[f.field] : null
      if (value && (f.type === 'date' || f.type === 'datetime') && typeof value === 'string') {
        value = parseDate(value)
      }
      formData[f.field] = value
      snapshot[f.field] = value
    }
    editingOriginal = snapshot
  }

  function openEditDialog(item: T): void {
    viewMode.value = false
    editingItem.value = item
    loadItemIntoForm(item)
    dialogVisible.value = true
  }

  function openViewDialog(item: T): void {
    viewMode.value = true
    editingItem.value = item
    loadItemIntoForm(item)
    dialogVisible.value = true
  }

  function openDuplicateDialog(item: T): void {
    // Abre o diálogo em modo criação, pré-preenchido com os dados do registro
    // (exceto a chave primária).
    viewMode.value = false
    editingItem.value = null
    editingOriginal = null
    resetForm()
    for (const f of formFields) {
      if (f.field === pk) continue
      let value = item[f.field] !== undefined ? item[f.field] : formData[f.field]
      if (value && (f.type === 'date' || f.type === 'datetime') && typeof value === 'string') {
        value = parseDate(value)
      }
      formData[f.field] = value
    }
    // createDefaults (ex: FK do pai) sobrepõe os valores duplicados.
    if (createDefaults) {
      const extra = createDefaults()
      for (const [key, val] of Object.entries(extra)) {
        formData[key] = val
      }
    }
    dialogVisible.value = true
  }

  // ---------------------------------------------------------------------------
  // Save
  // ---------------------------------------------------------------------------

  // Apply automatic conversions (dates, FK objects, masks) to a record,
  // returning a fresh plain object suitable for the API payload.
  function convertRecord(record: Record<string, unknown>): Record<string, unknown> {
    const out: Record<string, unknown> = { ...record }
    for (const f of formFields) {
      const val = out[f.field]

      // Datas
      if (f.type === 'date' && val instanceof Date) {
        out[f.field] = toDateString(val)
      } else if (f.type === 'datetime' && val instanceof Date) {
        out[f.field] = toDateTimeString(val)
      }

      // FK — extrair o ID do objeto selecionado
      if (f.type === 'fk' && val !== null && typeof val === 'object') {
        const key = f.optionValue || 'id'
        out[f.field] = (val as Record<string, unknown>)[key] ?? val
      }

      // Máscaras — strip para enviar só dígitos
      if ((f.type === 'mask' || f.type === 'cpf_cnpj') && typeof val === 'string') {
        out[f.field] = stripMask(val)
      }
    }
    return out
  }

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
      let payload: Record<string, unknown> = convertRecord(formData)

      // Merge createDefaults into payload for new records (hidden parent FKs, etc.)
      if (!isEditing.value && createDefaults) {
        Object.assign(payload, createDefaults())
      }

      // Edição: enviar apenas os campos alterados (diff) quando partialUpdate.
      if (isEditing.value && partialUpdate && editingOriginal) {
        const originalPayload = convertRecord(editingOriginal)
        payload = diffRecord(originalPayload, payload)

        // Nada mudou — fecha sem chamar a API.
        if (Object.keys(payload).length === 0 && !transformPayload) {
          dialogVisible.value = false
          const current = editingItem.value
          editingItem.value = null
          editingOriginal = null
          return current
        }
      }

      if (transformPayload) {
        payload = transformPayload(payload, isEditing.value)
      }

      // Detecta se tem arquivo (image) → FormData
      const hasFile = formFields.some((f) => f.type === 'image' && payload[f.field] instanceof File)

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
        response = await provider.update<T>(
          endpoint,
          itemPk as string | number,
          body,
          requestConfig,
        )
        if (!refetchOnSave) {
          const index = items.value.findIndex((i) => i[pk as keyof T] === itemPk)
          if (index !== -1) {
            items.value[index] = response.data
          }
        }
        toast.success(labels.successUpdate)
      } else {
        response = await provider.create<T>(endpoint, body, requestConfig)
        if (!refetchOnSave) {
          items.value.unshift(response.data)
          pagination.rows++
        }
        toast.success(labels.successCreate)
      }

      dialogVisible.value = false
      editingItem.value = null
      editingOriginal = null

      // Re-busca a página atual para refletir o estado real do backend
      // (campos derivados, ordenação, etc.) sem perder a posição da paginação,
      // busca ou filtros — todos preservados em `pagination`/`search`/`sort`.
      if (refetchOnSave) {
        await fetchItems()
      }

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
        await provider.delete(endpoint, itemPk as string | number)
        const index = items.value.findIndex((i) => i[pk as keyof T] === itemPk)
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

  function clearSelection(): void {
    selectedItems.value = []
  }

  function setColumnFilter(param: string, value: unknown): void {
    if (value === null || value === undefined || value === '') {
      delete columnFilters[param]
    } else {
      columnFilters[param] = value
    }
    pagination.page = 1
    fetchItems()
  }

  function clearColumnFilters(): void {
    for (const key of Object.keys(columnFilters)) delete columnFilters[key]
    pagination.page = 1
    fetchItems()
  }

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    items,
    selectedItems,
    columnFilters,
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
    fetchAll,
    refresh,
    setSearch,
    onSearch,
    onPage,
    onSort,
    openCreateDialog,
    openEditDialog,
    openViewDialog,
    openDuplicateDialog,
    save,
    confirmDelete,
    setFormField,
    resetForm,
    goToPage,
    firstPage,
    lastPage,
    clearSelection,
    setColumnFilter,
    clearColumnFilters,
    config,
  }
}
