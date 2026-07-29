import { ref, reactive, inject } from 'vue'
import type { PaginationState, SortState, UseApiOptions, UseApiReturn } from '@/types/api'
import { W_CONFIG_KEY, W_DATA_PROVIDER_KEY } from '@/types/plugin'
import type { WPluginConfig } from '@/types/plugin'
import type { DataProvider } from '@/types/dataProvider'

export function useApi<T = Record<string, unknown>>(options: UseApiOptions): UseApiReturn<T> {
  const { endpoint, searchDebounce = 300, immediate = false } = options

  const dataProvider = inject<DataProvider>(W_DATA_PROVIDER_KEY)
  if (!dataProvider) {
    throw new Error(
      '[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useApi.',
    )
  }
  const provider = dataProvider

  const config = inject<WPluginConfig>(W_CONFIG_KEY)
  const defaultPageSize = options.pageSize ?? config?.defaultPageSize ?? 20

  // State
  const items = ref<T[]>([]) as import('vue').Ref<T[]>
  const loading = ref(false)
  const search = ref('')
  const extras = ref<Record<string, unknown>>({})
  const filters = reactive<Record<string, unknown>>({})

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

  // Debounce
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

      for (const [key, value] of Object.entries(filters)) {
        if (value !== null && value !== undefined && value !== '') {
          queryParams[key] = value
        }
      }

      const responseData = await provider.list<T>(endpoint, queryParams)

      items.value = responseData.data
      pagination.rows = responseData.rows
      if (responseData.page) pagination.page = responseData.page
      if (responseData.page_size) pagination.pageSize = responseData.page_size
      pagination.totalPages = Math.ceil(pagination.rows / pagination.pageSize) || 0
      extras.value = responseData.extras ?? {}
    } finally {
      loading.value = false
    }
  }

  async function refresh(): Promise<void> {
    await fetchItems()
  }

  function setSearch(value: string): void {
    search.value = value
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      pagination.page = 1
      fetchItems()
    }, searchDebounce)
  }

  function setFilter(key: string, value: unknown): void {
    filters[key] = value
    pagination.page = 1
    fetchItems()
  }

  function clearFilters(): void {
    for (const key of Object.keys(filters)) {
      delete filters[key]
    }
    pagination.page = 1
    fetchItems()
  }

  function onPage(event: { page: number; rows: number }): void {
    pagination.page = event.page + 1
    pagination.pageSize = event.rows
    fetchItems()
  }

  function onSort(event: { sortField: string; sortOrder: 1 | -1 | 0 }): void {
    sort.field = event.sortField ?? null
    sort.order = event.sortOrder ?? 0
    pagination.page = 1
    fetchItems()
  }

  if (immediate) {
    fetchItems()
  }

  return {
    items,
    loading,
    search,
    pagination,
    sort,
    extras,
    fetchItems,
    refresh,
    setSearch,
    setFilter,
    clearFilters,
    onPage,
    onSort,
  }
}
