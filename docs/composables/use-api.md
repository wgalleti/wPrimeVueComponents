# useApi

Composable de baixo nivel para consumir APIs paginadas. Base do `useCrudManager`, mas pode ser usado independentemente para listagens sem formulario.

## Uso

```ts
import { useApi } from '@wgalleti/primevue-components'

const { items, loading, pagination, fetchItems, setSearch, setFilter, onPage, onSort } = useApi({
  endpoint: '/api/logs/',
  pageSize: 50,
  immediate: true,
})
```

## Opcoes

| Opcao | Tipo | Padrao | Descricao |
|-------|------|--------|-----------|
| `endpoint` | `string` | **obrigatorio** | URL da API |
| `pageSize` | `number` | `20` | Registros por pagina |
| `searchDebounce` | `number` | `300` | Debounce da busca (ms) |
| `immediate` | `boolean` | `false` | Busca automaticamente ao criar |

## Retorno

| Propriedade | Tipo | Descricao |
|-------------|------|-----------|
| `items` | `Ref<T[]>` | Lista de itens |
| `loading` | `Ref<boolean>` | Carregando |
| `search` | `Ref<string>` | Termo de busca |
| `pagination` | `PaginationState` | Estado da paginacao |
| `extras` | `Ref<Record>` | Dados extras da resposta |
| `sort` | `SortState` | Estado da ordenacao |
| `fetchItems(params?)` | — | Busca itens |
| `refresh()` | — | Recarrega |
| `setSearch(value)` | — | Busca com debounce |
| `setFilter(key, value)` | — | Adiciona filtro |
| `clearFilters()` | — | Limpa filtros |
| `onPage(event)` | — | Handler de paginacao |
| `onSort(event)` | — | Handler de ordenacao |

## Filtros

```ts
const api = useApi({ endpoint: '/api/logs/' })

// Adiciona filtro
api.setFilter('level', 'error')

// Limpa todos os filtros
api.clearFilters()
```

## Com DataTable

```vue
<script setup>
const { items, loading, pagination, onPage, onSort } = useApi({
  endpoint: '/api/logs/',
  immediate: true,
})
</script>

<template>
  <DataTable
    :value="items"
    :loading="loading"
    lazy
    paginator
    :rows="pagination.pageSize"
    :total-records="pagination.rows"
    @page="onPage"
    @sort="onSort"
  >
    <Column field="timestamp" header="Data" sortable />
    <Column field="message" header="Mensagem" />
    <Column field="level" header="Nivel" />
  </DataTable>
</template>
```
