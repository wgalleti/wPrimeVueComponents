# Tipos

Todos os tipos sao exportados de `@wgalleti/primevue-components` e podem ser importados diretamente:

```typescript
import type {
  ColumnDef,
  FieldDef,
  RowAction,
  CrudManagerConfig,
  CrudManagerReturn,
  CrudLabels,
  PaginatedResponse,
  PaginationState,
  WPluginOptions,
} from '@wgalleti/primevue-components'
```

---

## ColumnDef

Define uma coluna na tabela do CrudView.

```typescript
interface ColumnDef {
  /** Nome do campo no objeto de dados */
  field: string

  /** Texto do cabecalho da coluna */
  header: string

  /** Tipo de renderizacao. Default: 'text' */
  type?: 'text' | 'boolean' | 'date' | 'datetime' | 'number' | 'currency' | 'image' | 'custom'

  /** CSS inline para a coluna (ex: 'width: 120px') */
  style?: string

  /** Alinhamento do texto. Default: 'left' */
  align?: 'left' | 'center' | 'right'

  /** Habilitar ordenacao. Default: false */
  sortable?: boolean

  /** Funcao de formatacao customizada */
  format?: (value: unknown, rowData?: Record<string, unknown>) => string

  /** Visibilidade da coluna. Default: true */
  visible?: boolean

  /** Casas decimais para type 'number'. Default: 0 */
  decimals?: number

  /** Texto customizado para type 'boolean' */
  tagValue?: (value: unknown, rowData?: Record<string, unknown>) => string

  /** Severidade do Tag para type 'boolean' */
  tagSeverity?: (value: unknown, rowData?: Record<string, unknown>) => string
}
```

### Exemplos

```typescript
// Coluna simples
{ field: 'nome', header: 'Nome' }

// Coluna com formato de moeda
{ field: 'preco', header: 'Preco', type: 'currency' }

// Coluna booleana com labels customizados
{
  field: 'ativo',
  header: 'Status',
  type: 'boolean',
  tagValue: (v) => v ? 'Ativo' : 'Inativo',
  tagSeverity: (v) => v ? 'success' : 'danger',
}

// Coluna com formato customizado
{
  field: 'tipo',
  header: 'Tipo',
  format: (v) => tipoMap[v as string] ?? v,
}

// Coluna de data
{ field: 'created_at', header: 'Criado em', type: 'date' }

// Coluna numerica com decimais
{ field: 'peso', header: 'Peso (kg)', type: 'number', decimals: 2 }

// Coluna de imagem
{ field: 'avatar', header: 'Foto', type: 'image', style: 'width: 80px' }
```

---

## FieldDef

Define um campo no formulario de criacao/edicao.

```typescript
interface FieldDef {
  /** Nome do campo (chave no payload) */
  field: string

  /** Label exibido no formulario */
  label: string

  /** Tipo do campo. Default: 'text' */
  type?: 'text' | 'email' | 'password' | 'number' | 'currency'
    | 'date' | 'datetime' | 'select' | 'autocomplete' | 'fk'
    | 'switch' | 'textarea' | 'color' | 'cpf_cnpj' | 'mask' | 'image'

  /** Campo obrigatorio. Default: false */
  required?: boolean

  /** Largura no grid: 1 = full width, 0.5 = metade. Default: 1 */
  colSpan?: number

  /** Valor padrao (estatico ou funcao) */
  defaultValue?: unknown | (() => unknown)

  /** Desabilitar campo. Booleano ou funcao dinamica */
  disabled?: boolean | ((formData: Record<string, unknown>, isEditing: boolean) => boolean)

  /** Desabilitar apenas no modo edicao */
  disabledOnEdit?: boolean

  /** Visibilidade. Booleano ou funcao dinamica */
  visible?: boolean | ((formData: Record<string, unknown>, isEditing: boolean) => boolean)

  /** Placeholder do input */
  placeholder?: string

  /** Validacao customizada. Retorna mensagem de erro ou null */
  validate?: (value: unknown) => string | null

  /** Autofocus: true (sempre), 'create' (so criacao), 'edit' (so edicao) */
  autofocus?: boolean | 'create' | 'edit'

  // --- Opcoes para 'select' e 'autocomplete' ---

  /** Lista de opcoes (estatica ou Ref reativa) */
  options?: Array<{ label: string; value: unknown }> | Ref<Array<{ label: string; value: unknown }>>

  /** Propriedade para label da opcao. Default: 'label' */
  optionLabel?: string

  /** Propriedade para value da opcao. Default: 'value' */
  optionValue?: string

  /** Mostrar botao limpar. Default: false */
  showClear?: boolean

  // --- Opcoes para 'fk' ---

  /** Endpoint da API para buscar opcoes do FK */
  endpoint?: string

  /** Parametros extras para query string nas buscas FK (v0.3.3+).
   *  Nao incluidos na URL de detalhe (GET /{id}/). */
  endpointParams?: Record<string, string | number | boolean>

  /** Campos do formulario para CRUD inline no modal FK (v0.2.0+) */
  crudFields?: FieldDef[]

  /** Colunas da tabela para CRUD inline no modal FK (v0.2.0+) */
  crudColumns?: ColumnDef[]

  // --- Opcoes para 'number' e 'currency' ---

  min?: number
  max?: number
  minFractionDigits?: number
  maxFractionDigits?: number
  prefix?: string
  suffix?: string

  // --- Opcoes para 'date' e 'datetime' ---

  /** Formato de data (PrimeVue DatePicker). Default: 'dd/mm/yy' */
  dateFormat?: string

  /** Formato de hora. Default: '24' */
  hourFormat?: '12' | '24'

  // --- Opcoes para 'mask' ---

  /** Pattern da mascara (maska format). Ex: '###.###.###-##' */
  mask?: string

  // --- Opcoes para 'textarea' ---

  /** Numero de linhas do textarea. Default: 3 */
  rows?: number

  // --- Opcoes para 'switch' ---

  /** Label alternativo ao lado do switch */
  switchLabel?: string

  // --- Opcoes para 'password' ---

  /** Mostrar indicador de forca. Default: false */
  feedback?: boolean

  // --- Opcoes para 'image' ---

  /** Tipos de arquivo aceitos. Default: 'image/*' */
  accept?: string
}
```

### Exemplos

```typescript
// Texto simples obrigatorio
{ field: 'nome', label: 'Nome', required: true }

// Duas colunas lado a lado
{ field: 'first_name', label: 'Nome', colSpan: 0.5, required: true },
{ field: 'last_name', label: 'Sobrenome', colSpan: 0.5 },

// Select estatico
{
  field: 'tipo',
  label: 'Tipo',
  type: 'select',
  options: [
    { label: 'Produto', value: 'produto' },
    { label: 'Servico', value: 'servico' },
  ],
}

// FK com busca na API
{
  field: 'categoria',
  label: 'Categoria',
  type: 'fk',
  endpoint: '/api/v1/categorias/',
  optionLabel: 'nome',
}

// FK com CRUD inline no modal de busca (v0.2.0+)
{
  field: 'fornecedor',
  label: 'Fornecedor',
  type: 'fk',
  endpoint: '/api/v1/pessoas/',
  crudFields: pessoaForm,     // FieldDef[] do schema de pessoa
  crudColumns: pessoaColumns,  // ColumnDef[] do schema de pessoa
}

// Campo condicional
{
  field: 'cnpj',
  label: 'CNPJ',
  type: 'cpf_cnpj',
  visible: (formData) => formData.tipo_pessoa === 'juridica',
}

// Moeda
{ field: 'preco', label: 'Preco', type: 'currency', minFractionDigits: 2 }

// Mascara customizada
{ field: 'telefone', label: 'Telefone', type: 'mask', mask: '(##) #####-####' }

// Imagem com crop
{ field: 'avatar', label: 'Foto', type: 'image', accept: 'image/jpeg,image/png' }

// Validacao customizada
{
  field: 'email',
  label: 'Email',
  type: 'email',
  validate: (v) => {
    if (v && !String(v).includes('@')) return 'Email invalido'
    return null
  },
}
```

---

## RowAction

Define acoes customizadas nas linhas da tabela.

```typescript
interface RowAction<T = Record<string, unknown>> {
  /** Identificador da acao */
  action: string

  /** Classe do icone PrimeIcons. Ex: 'pi pi-pencil' */
  icon: string

  /** Texto tooltip */
  tooltip?: string

  /** Severidade do botao PrimeVue */
  severity?: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast'

  /** Visibilidade condicional por linha */
  visible?: (data: T) => boolean

  /** Desabilitar condicional por linha */
  disabled?: (data: T) => boolean

  /** Handler customizado. Se nao definido, usa o padrao (edit/delete) */
  handler?: (data: T) => void
}
```

### Exemplos

```typescript
// Acoes padrao (edit e delete sao tratados automaticamente)
rowActions: [
  { action: 'edit', icon: 'pi pi-pencil', tooltip: 'Editar' },
  { action: 'delete', icon: 'pi pi-trash', tooltip: 'Excluir', severity: 'danger' },
]

// Acao customizada com condicional
rowActions: [
  {
    action: 'aprovar',
    icon: 'pi pi-check',
    tooltip: 'Aprovar',
    severity: 'success',
    visible: (data) => data.status === 'pendente',
    handler: (data) => aprovarItem(data),
  },
  { action: 'edit', icon: 'pi pi-pencil' },
  { action: 'delete', icon: 'pi pi-trash', severity: 'danger' },
]
```

---

## CrudManagerConfig

Configuracao completa do `useCrudManager`.

```typescript
interface CrudManagerConfig<T> {
  /** Endpoint da API (ex: '/api/v1/produtos/') */
  endpoint: string

  /** Definicao das colunas da tabela */
  columns: ColumnDef[]

  /** Definicao dos campos do formulario */
  form: FieldDef[]

  /** Campo de chave primaria. Default: 'id' */
  pk?: string

  /** Registros por pagina. Default: valor do plugin ou 20 */
  pageSize?: number

  /** Debounce da busca em ms. Default: 300 */
  searchDebounce?: number

  /** Exibir botao de criar. Default: true */
  canCreate?: boolean

  /** Exibir botao de editar. Default: true */
  canEdit?: boolean

  /** Exibir botao de excluir. Default: true */
  canDelete?: boolean

  /** Acoes customizadas nas linhas */
  rowActions?: RowAction<T>[]

  /** Parametros de filtro dinamicos adicionados a cada request */
  filterParams?: () => Record<string, unknown>

  /** Transforma o payload antes de enviar para a API */
  transformPayload?: (payload: Record<string, unknown>, isEditing: boolean) => Record<string, unknown>

  /** Callback apos salvar com sucesso */
  onAfterSave?: (data: T, isEditing: boolean) => void

  /** Callback apos excluir com sucesso */
  onAfterDelete?: (item: T) => void

  /** Labels customizaveis da UI */
  labels?: Partial<CrudLabels>
}
```

---

## CrudLabels

Labels da interface, todos opcionais com defaults em pt-BR.

```typescript
interface CrudLabels {
  createTitle: string       // 'Novo Registro'
  editTitle: string         // 'Editar Registro'
  createButton: string      // 'Novo'
  saveButton: string        // 'Salvar'
  updateButton: string      // 'Atualizar'
  cancelButton: string      // 'Cancelar'
  deleteConfirmTitle: string // 'Confirmar Exclusao'
  deleteConfirmMessage: string // 'Deseja realmente excluir este registro?'
  searchPlaceholder: string // 'Buscar...'
  emptyMessage: string      // 'Nenhum registro encontrado'
  successCreate: string     // 'Registro criado com sucesso'
  successUpdate: string     // 'Registro atualizado com sucesso'
  successDelete: string     // 'Registro excluido com sucesso'
}
```

---

## CrudManagerReturn

Retorno do composable `useCrudManager<T>`.

```typescript
interface CrudManagerReturn<T> {
  // Estado reativo
  items: Ref<T[]>
  loading: Ref<boolean>
  saving: Ref<boolean>
  search: Ref<string>
  dialogVisible: Ref<boolean>
  editingItem: Ref<T | null>
  formData: Record<string, unknown>
  pagination: PaginationState

  // Computed
  isEditing: ComputedRef<boolean>
  dialogTitle: ComputedRef<string>
  isFirstPage: ComputedRef<boolean>
  isLastPage: ComputedRef<boolean>

  // Metodos
  init(): Promise<void>
  fetchItems(params?: Record<string, unknown>): Promise<void>
  refresh(): Promise<void>
  setSearch(value: string): void
  onSearch(event: Event): void
  onPage(event: { page: number; rows: number }): void
  openCreateDialog(): void
  openEditDialog(item: T): void
  save(): Promise<T | null>
  confirmDelete(item: T): void
  setFormField(field: string, value: unknown): void
  resetForm(): void
  goToPage(page: number): void
  firstPage(): void
  lastPage(): void

  // Config (readonly)
  config: CrudManagerConfig<T>
}
```

---

## PaginationState

```typescript
interface PaginationState {
  page: number
  pageSize: number
  rows: number       // total de registros
  totalPages: number
}
```

---

## PaginatedResponse

Formato esperado da resposta paginada da API.

```typescript
interface PaginatedResponse<T> {
  data: T[]
  page: number
  page_size: number
  rows: number
  extras?: Record<string, unknown>
}
```
