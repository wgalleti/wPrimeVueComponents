# useCrudManager

Composable principal que gerencia todo o ciclo de vida de um CRUD: listagem, paginacao, busca, ordenacao, criacao, edicao e exclusao.

## Uso

```ts
import { useCrudManager } from '@wgalleti/primevue-components'

const crud = useCrudManager({
  endpoint: '/api/produtos/',
  columns: [
    { field: 'nome', header: 'Nome', sortable: true },
    { field: 'preco', header: 'Preco', type: 'currency' },
    { field: 'ativo', header: 'Ativo', type: 'boolean' },
  ],
  form: [
    { field: 'nome', label: 'Nome', required: true },
    { field: 'preco', label: 'Preco', type: 'currency' },
    { field: 'ativo', label: 'Ativo', type: 'switch', defaultValue: true },
  ],
})
```

## Configuracao (`CrudManagerConfig`)

| Opcao | Tipo | Padrao | Descricao |
|-------|------|--------|-----------|
| `endpoint` | `string` | **obrigatorio** | URL base da API |
| `columns` | `ColumnDef[]` | **obrigatorio** | Definicao das colunas da tabela |
| `form` | `FieldDef[]` | **obrigatorio** | Definicao dos campos do formulario |
| `pk` | `string` | `'id'` | Campo de chave primaria |
| `pageSize` | `number` | `20` | Registros por pagina |
| `searchDebounce` | `number` | `300` | Debounce da busca (ms) |
| `canCreate` | `boolean` | `true` | Permite criacao |
| `canEdit` | `boolean` | `true` | Permite edicao |
| `canDelete` | `boolean` | `true` | Permite exclusao |
| `rowActions` | `RowAction[]` | auto | Acoes customizadas por linha |
| `filterParams` | `() => Record` | — | Parametros extras para a query |
| `fetchDetailOnEdit` | `boolean` | `false` | Antes de abrir editar/visualizar/duplicar, busca o registro completo (`GET /:pk/`) em vez de usar a linha da lista. Use quando o serializer de list e enxuto (omite campos pesados, ex.: geometria) — sem isso o form abriria com o campo vazio e um save poderia gravar essa ausencia por cima do valor real |
| `transformItems` | `(rawItems) => Items[]` | — | Pre-processa os dados carregados antes de virarem `items` (agrupar, enriquecer, reestruturar) |
| `transformPayload` | `(payload, isEditing) => Record` | — | Transforma o payload antes de enviar |
| `onAfterSave` | `(data, isEditing) => void` | — | Callback apos salvar |
| `onAfterDelete` | `(item) => void` | — | Callback apos excluir |
| `labels` | `Partial<CrudLabels>` | pt-BR | Labels customizadas |

## Retorno (`CrudManagerReturn`)

### Estado

| Propriedade | Tipo | Descricao |
|-------------|------|-----------|
| `items` | `Ref<T[]>` | Lista de itens carregados |
| `loading` | `Ref<boolean>` | Carregando dados |
| `saving` | `Ref<boolean>` | Salvando registro |
| `search` | `Ref<string>` | Termo de busca atual |
| `dialogVisible` | `Ref<boolean>` | Dialog aberto/fechado |
| `editingItem` | `Ref<T \| null>` | Item sendo editado |
| `formData` | `Record<string, unknown>` | Dados reativos do formulario |
| `pagination` | `PaginationState` | Estado da paginacao |
| `sort` | `SortState` | Estado da ordenacao |

### Computed

| Propriedade | Tipo | Descricao |
|-------------|------|-----------|
| `isEditing` | `ComputedRef<boolean>` | Se esta em modo edicao |
| `dialogTitle` | `ComputedRef<string>` | Titulo do dialog |
| `isFirstPage` | `ComputedRef<boolean>` | Se esta na primeira pagina |
| `isLastPage` | `ComputedRef<boolean>` | Se esta na ultima pagina |

### Metodos

| Metodo | Descricao |
|--------|-----------|
| `init()` | Carrega os dados iniciais |
| `fetchItems(params?)` | Busca itens com parametros opcionais |
| `refresh()` | Recarrega a pagina atual |
| `setSearch(value)` | Define o termo de busca (com debounce) |
| `onSearch(event)` | Handler para input de busca |
| `onPage(event)` | Handler para mudanca de pagina |
| `onSort(event)` | Handler para mudanca de ordenacao |
| `openCreateDialog()` | Abre dialog para novo registro |
| `openEditDialog(item)` | Abre dialog para editar item (com `fetchDetailOnEdit`, devolve a Promise da busca do detail) |
| `save()` | Salva o registro (cria ou atualiza) |
| `confirmDelete(item)` | Abre confirmacao e exclui |
| `setFormField(field, value)` | Altera um campo do formulario |
| `resetForm()` | Reseta formulario para defaults |
| `goToPage(page)` | Navega para pagina especifica |
| `firstPage()` | Vai para primeira pagina |
| `lastPage()` | Vai para ultima pagina |

## Filtros Dinamicos

```ts
const categoriaFilter = ref<number | null>(null)

const crud = useCrudManager({
  endpoint: '/api/produtos/',
  columns: [...],
  form: [...],
  filterParams: () => ({
    categoria: categoriaFilter.value,
  }),
})

// Quando o filtro mudar:
watch(categoriaFilter, () => crud.refresh())
```

## Transform Payload

```ts
const crud = useCrudManager({
  endpoint: '/api/usuarios/',
  columns: [...],
  form: [...],
  transformPayload: (payload, isEditing) => {
    if (isEditing && !payload.password) {
      delete payload.password
    }
    return payload
  },
})
```

## Pre-processar dados carregados (`transformItems`)

`transformItems` roda a cada carga da lista, **antes** dos dados virarem `items`.
Recebe as linhas cruas da API e devolve o que a tela vai renderizar. E o ponto
unico e reaproveitavel para **agrupar, enriquecer com campos derivados,
reestruturar ou ordenar** — sem montar nada a mao fora do `WCrudView`. Sem o hook,
`items` = dados crus.

O `#card` (e as colunas, no modo tabela) renderizam o que o hook devolveu — entao
se ele agrupa, cada `item` passa a ser um **grupo**, e o `#card` desenha o grupo.

```ts
// Agrupamento MISTO: registros com NF agrupam pela nota; avulsos (sem NF) viram
// grupos de 1 (aparecem individualmente). O `#card` recebe cada grupo em `data`.
const crud = useCrudManager({
  endpoint: '/api/analises/',
  columns: [],
  form: [],
  transformItems: (rows) => {
    const map = new Map()
    for (const a of rows) {
      const key = a.nota_fiscal_numero ? `nf-${a.nota_fiscal_numero}` : `avulso-${a.id}`
      if (!map.has(key)) map.set(key, { id: a.id, chave: key, itens: [] })
      map.get(key).itens.push(a)
    }
    return [...map.values()]
  },
})
```

::: tip Paginacao + agrupamento
O agrupamento acontece sobre a **pagina atual** de linhas cruas. Para grupos
contiguos, ordene a query pela chave do grupo (ou use um `pageSize` maior); um
grupo pode se dividir na fronteira exata entre paginas. Quando precisar de grupos
paginados com exatidao, o backend deve devolver os grupos ja prontos como linhas.
:::

## Upload de Imagens

Quando um campo `type: 'image'` tem um `File`, o `save()` automaticamente converte para `FormData` e envia como `multipart/form-data`.

```ts
form: [
  { field: 'nome', label: 'Nome' },
  { field: 'foto', label: 'Foto', type: 'image', accept: 'image/png,image/jpeg' },
]
```

## API Esperada

| Acao | Metodo | URL |
|------|--------|-----|
| Listar | `GET` | `{endpoint}?page=1&page_size=20&search=...&ordering=...` |
| Criar | `POST` | `{endpoint}` |
| Atualizar | `PATCH` | `{endpoint}{pk}/` |
| Excluir | `DELETE` | `{endpoint}{pk}/` |
