# useApi

Composable de nivel baixo para buscar dados paginados de uma API. Usado internamente pelo `useCrudManager`, mas pode ser usado diretamente para listagens read-only.

## Import

```typescript
import { useApi } from '@wgalleti/primevue-components'
```

## Uso Basico

```typescript
const { items, loading, pagination, fetchItems, setSearch } = useApi<Produto>({
  endpoint: '/api/v1/produtos/',
  pageSize: 10,
})

onMounted(() => fetchItems())
```

## Opcoes

```typescript
interface UseApiOptions {
  /** Endpoint da API */
  endpoint: string

  /** Registros por pagina. Default: 20 */
  pageSize?: number

  /** Debounce da busca em ms. Default: 300 */
  searchDebounce?: number
}
```

## Retorno

```typescript
interface UseApiReturn<T> {
  items: Ref<T[]>
  loading: Ref<boolean>
  search: Ref<string>
  pagination: PaginationState
  extras: Ref<Record<string, unknown>>

  fetchItems(params?: Record<string, unknown>): Promise<void>
  refresh(): Promise<void>
  setSearch(value: string): void
  setFilter(key: string, value: unknown): void
  clearFilters(): void
  onPage(event: { page: number; rows: number }): void
}
```

## Exemplo: Lista read-only com filtro

```vue
<script setup lang="ts">
import { useApi } from '@wgalleti/primevue-components'

const statusFilter = ref('todos')

const { items, loading, pagination, fetchItems, setFilter, onPage } = useApi<Log>({
  endpoint: '/api/v1/logs/',
  pageSize: 50,
})

watch(statusFilter, (val) => {
  if (val !== 'todos') setFilter('status', val)
  else clearFilters()
  fetchItems()
})

onMounted(() => fetchItems())
</script>
```

## Formato de Resposta Esperado

A API deve retornar:

```json
{
  "data": [...],
  "page": 1,
  "page_size": 20,
  "rows": 150,
  "extras": {}
}
```

Onde `rows` e o total de registros (para calcular paginacao).
