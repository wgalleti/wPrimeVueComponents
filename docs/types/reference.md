# Referencia de Tipos

Todos os tipos exportados pela biblioteca.

## ColumnDef

Definicao de coluna para o DataTable.

```ts
interface ColumnDef {
  field: string
  header: string
  type?: ColumnType
  style?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  format?: (value: unknown, rowData?: Record<string, unknown>) => string
  visible?: boolean
  decimals?: number
  tagValue?: (value: unknown, rowData?: Record<string, unknown>) => string
  tagSeverity?: (value: unknown, rowData?: Record<string, unknown>) => string
}

type ColumnType = 'text' | 'boolean' | 'date' | 'datetime' | 'number' | 'currency' | 'image' | 'custom'
```

## FieldDef

Definicao de campo do formulario.

```ts
interface FieldDef {
  field: string
  label: string
  type?: FieldType
  required?: boolean
  colSpan?: number                    // 1 = full, 0.5 = half
  defaultValue?: unknown | (() => unknown)
  disabled?: boolean | ((formData, isEditing) => boolean)
  disabledOnEdit?: boolean
  visible?: boolean | ((formData, isEditing) => boolean)
  placeholder?: string
  validate?: (value: unknown) => string | null
  autofocus?: boolean | 'create' | 'edit'

  // select / autocomplete
  options?: SelectOption[] | Ref<SelectOption[]>
  optionLabel?: string
  optionValue?: string
  showClear?: boolean

  // fk
  endpoint?: string

  // number / currency
  min?: number
  max?: number
  minFractionDigits?: number
  maxFractionDigits?: number
  prefix?: string
  suffix?: string

  // date / datetime
  dateFormat?: string
  hourFormat?: '12' | '24'

  // mask
  mask?: string

  // textarea
  rows?: number

  // switch
  switchLabel?: string

  // password
  feedback?: boolean

  // image
  accept?: string
}

type FieldType =
  | 'text' | 'email' | 'password' | 'number' | 'currency'
  | 'date' | 'datetime' | 'select' | 'autocomplete' | 'fk'
  | 'switch' | 'textarea' | 'color' | 'cpf_cnpj' | 'mask' | 'image'
```

## RowAction

Acao customizada por linha.

```ts
interface RowAction<T = Record<string, unknown>> {
  action: string
  icon: string
  tooltip?: string
  severity?: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast'
  visible?: (data: T) => boolean
  disabled?: (data: T) => boolean
  handler?: (data: T) => void
}
```

## KpiItem

Item de KPI.

```ts
interface KpiItem {
  icon: string
  label: string
  value: string | number
  color?: string
}
```

## CrudLabels

Labels customizaveis do CRUD.

```ts
interface CrudLabels {
  createTitle: string           // "Novo Registro"
  editTitle: string             // "Editar Registro"
  createButton: string          // "Novo"
  saveButton: string            // "Salvar"
  updateButton: string          // "Atualizar"
  cancelButton: string          // "Cancelar"
  deleteConfirmTitle: string    // "Confirmar Exclusao"
  deleteConfirmMessage: string  // "Deseja realmente excluir este registro?"
  searchPlaceholder: string     // "Buscar..."
  emptyMessage: string          // "Nenhum registro encontrado"
  successCreate: string         // "Registro criado com sucesso"
  successUpdate: string         // "Registro atualizado com sucesso"
  successDelete: string         // "Registro excluido com sucesso"
}
```

## PaginationState

```ts
interface PaginationState {
  page: number
  pageSize: number
  rows: number
  totalPages: number
}
```

## SortState

```ts
interface SortState {
  field: string | null
  order: 1 | -1 | 0
}
```

## PaginatedResponse

```ts
interface PaginatedResponse<T> {
  data: T[]
  page: number
  page_size: number
  rows: number
  extras?: Record<string, unknown>
}
```

## WPluginOptions

```ts
interface WPluginOptions {
  axios: AxiosInstance        // obrigatorio
  defaultPageSize?: number    // 20
  dateFormat?: string         // "DD/MM/YYYY"
  dateTimeFormat?: string     // "DD/MM/YYYY HH:mm"
  locale?: string             // "pt-BR"
  currency?: string           // "BRL"
  registerComponents?: boolean // true
}
```

## Symbols

```ts
const W_AXIOS_KEY: Symbol   // injection key para axios
const W_CONFIG_KEY: Symbol  // injection key para config
```
