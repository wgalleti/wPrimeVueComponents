# useCrudManager

Composable principal para operacoes CRUD completas. Gerencia estado, paginacao, busca, formulario e comunicacao com a API.

## Import

```typescript
import { useCrudManager } from '@wgalleti/primevue-components'
import type { CrudManagerConfig } from '@wgalleti/primevue-components'
```

## Uso Basico

```typescript
const crud = useCrudManager<Produto>({
  endpoint: '/api/v1/produtos/',
  columns: [
    { field: 'nome', header: 'Nome' },
    { field: 'preco', header: 'Preco', type: 'currency' },
  ],
  form: [
    { field: 'nome', label: 'Nome', required: true },
    { field: 'preco', label: 'Preco', type: 'currency' },
  ],
})
```

O composable retorna um objeto reativo (`CrudManagerReturn<T>`) que e passado ao `WCrudView` ou usado diretamente.

## Configuracao Completa

Veja [Tipos > CrudManagerConfig](../types.md#crudmanagerconfig) para todas as opcoes.

## Estado Reativo

| Propriedade | Tipo | Descricao |
|---|---|---|
| `items` | `Ref<T[]>` | Lista de registros da pagina atual |
| `loading` | `Ref<boolean>` | Carregando dados da API |
| `saving` | `Ref<boolean>` | Salvando registro |
| `search` | `Ref<string>` | Termo de busca atual |
| `dialogVisible` | `Ref<boolean>` | Dialog de form aberto/fechado |
| `editingItem` | `Ref<T \| null>` | Item sendo editado (null = criacao) |
| `formData` | `Record<string, unknown>` | Dados do formulario (reativo) |
| `pagination` | `PaginationState` | Estado de paginacao |

## Computed

| Propriedade | Tipo | Descricao |
|---|---|---|
| `isEditing` | `ComputedRef<boolean>` | `true` se editando, `false` se criando |
| `dialogTitle` | `ComputedRef<string>` | Titulo do dialog baseado no modo |
| `isFirstPage` | `ComputedRef<boolean>` | Na primeira pagina |
| `isLastPage` | `ComputedRef<boolean>` | Na ultima pagina |

## Metodos

### init()

Carrega os dados iniciais. Chame no `onMounted` ou use `autoInit` no `WCrudView`.

```typescript
onMounted(() => crud.init())
```

### fetchItems(params?)

Busca registros com paginacao e filtros. Chamado internamente por `init()`, `refresh()`, `onPage()`, etc.

```typescript
await crud.fetchItems({ status: 'ativo' })
```

### refresh()

Recarrega a pagina atual mantendo filtros e busca.

### setSearch(value) / onSearch(event)

Define o termo de busca com debounce (300ms default). Reseta para pagina 1.

```typescript
crud.setSearch('notebook') // programatico
// ou
<InputText @input="crud.onSearch" /> // via evento
```

### openCreateDialog() / openEditDialog(item)

Abre o dialog de formulario. `openCreateDialog` reseta o form com defaults. `openEditDialog` popula com os dados do item.

### save()

Valida o formulario e envia para a API. Retorna o registro salvo ou `null` em caso de erro.

- **Criacao**: POST no endpoint
- **Edicao**: PUT no endpoint/{pk}/
- Detecta automaticamente campos `image` e usa `FormData`
- Converte `Date` para ISO string
- Executa `transformPayload` se configurado

### confirmDelete(item)

Exibe dialog de confirmacao e, se aceito, envia DELETE para a API.

### setFormField(field, value)

Atualiza um campo do formulario programaticamente.

```typescript
crud.setFormField('tipo', 'servico')
```

### resetForm()

Reseta todos os campos para seus `defaultValue`.

### Paginacao

```typescript
crud.goToPage(3)
crud.firstPage()
crud.lastPage()
crud.onPage({ page: 2, rows: 20 }) // evento do DataTable
```

## Exemplos Avancados

### Com filtros dinamicos

```typescript
const statusFilter = ref('ativo')

const crud = useCrudManager<Produto>({
  endpoint: '/api/v1/produtos/',
  columns: [...],
  form: [...],
  filterParams: () => ({
    status: statusFilter.value,
  }),
})

// Ao mudar o filtro, recarrega
watch(statusFilter, () => crud.refresh())
```

### Com transformacao de payload

```typescript
const crud = useCrudManager<Produto>({
  endpoint: '/api/v1/produtos/',
  columns: [...],
  form: [...],
  transformPayload: (payload, isEditing) => {
    // Remove campo temporario
    delete payload._temp

    // Normaliza valor
    if (payload.preco) {
      payload.preco = Number(payload.preco)
    }

    return payload
  },
})
```

### Com callbacks

```typescript
const crud = useCrudManager<Produto>({
  endpoint: '/api/v1/produtos/',
  columns: [...],
  form: [...],
  onAfterSave: (data, isEditing) => {
    if (!isEditing) {
      // Navega para detalhe apos criar
      router.push(`/produtos/${data.id}`)
    }
  },
  onAfterDelete: () => {
    // Atualiza contadores
    dashboardStore.refreshCounts()
  },
})
```

### Com row actions customizadas

```typescript
const crud = useCrudManager<Pedido>({
  endpoint: '/api/v1/pedidos/',
  columns: [...],
  form: [...],
  rowActions: [
    {
      action: 'aprovar',
      icon: 'pi pi-check',
      tooltip: 'Aprovar',
      severity: 'success',
      visible: (data) => data.status === 'pendente',
      handler: async (data) => {
        await api.post(`/api/v1/pedidos/${data.id}/aprovar/`)
        crud.refresh()
      },
    },
    { action: 'edit', icon: 'pi pi-pencil' },
    { action: 'delete', icon: 'pi pi-trash', severity: 'danger' },
  ],
})
```
