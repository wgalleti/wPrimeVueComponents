import type { Ref } from 'vue'
import type { ColumnDef } from './column'

// ---------------------------------------------------------------------------
// Field
// ---------------------------------------------------------------------------

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'select'
  | 'autocomplete'
  | 'fk'
  | 'switch'
  | 'textarea'
  | 'color'
  | 'cpf_cnpj'
  | 'mask'
  | 'image'
  | 'cep'
  | 'transfer'

export interface SelectOption {
  [key: string]: unknown
}

/**
 * Filtro em cascata (drill-down) de um campo FK: torna a busca dependente do valor
 * de outro campo do formulário, aplicando-o como filtro na requisição à API.
 */
export interface FieldDependency {
  /** Campo do formulário cujo valor alimenta o filtro (ex.: 'unidade_producao'). */
  field: string
  /** Nome do parâmetro enviado à API. Default: o próprio `field`. */
  param?: string
  /** Se true, a busca só ocorre quando o valor de origem estiver preenchido
   *  (cascata obrigatória). Default: true. */
  required?: boolean
}

export interface FieldDef {
  field: string
  label: string
  type?: FieldType
  required?: boolean
  /** Largura do campo no grid do form (ver `columns` do WFormRenderer):
   *  - omitido ou 'full' → linha inteira
   *  - 0.5 → metade da linha (independe do nº de colunas)
   *  - inteiro ≥ 1 → ocupa N colunas do grid (limitado ao total de colunas) */
  colSpan?: number | 'full'
  defaultValue?: unknown | (() => unknown)
  disabled?: boolean | ((formData: Record<string, unknown>, isEditing: boolean) => boolean)
  disabledOnEdit?: boolean
  visible?: boolean | ((formData: Record<string, unknown>, isEditing: boolean) => boolean)
  placeholder?: string
  validate?: (value: unknown) => string | null
  autofocus?: boolean | 'create' | 'edit'

  // select / autocomplete / transfer
  options?: SelectOption[] | Ref<SelectOption[]>
  optionLabel?: string
  optionValue?: string
  showClear?: boolean
  /** For 'transfer' fields — option keys to match against when searching
   *  (defaults to [optionLabel]). */
  searchFields?: string[]

  // fk
  endpoint?: string
  endpointParams?: Record<string, string | number | boolean>
  /** Filtro em cascata: torna esta FK dependente do valor de outro(s) campo(s) do
   *  formulário, aplicando-o(s) como filtro na busca da API (ex.: um "local" que só
   *  lista os da "unidade_producao" selecionada). Com `required` (default true), a
   *  busca só ocorre após o campo de origem estar preenchido. */
  dependsOn?: FieldDependency | FieldDependency[]
  /** Placeholder da FK enquanto uma cascata obrigatória (`dependsOn`) não estiver
   *  preenchida — ex.: "Selecione a unidade primeiro". */
  blockedPlaceholder?: string
  crudFields?: FieldDef[]
  crudColumns?: ColumnDef[]

  // number / currency
  min?: number
  max?: number
  minFractionDigits?: number
  maxFractionDigits?: number
  prefix?: string
  suffix?: string
  /** For 'currency' fields — render WMoneyInput (digit entry filled from the
   *  right, like a calculator/POS) instead of the default InputNumber. */
  fillFromRight?: boolean
  /** Fixed decimal places for 'currency' fillFromRight mode (default: 2). */
  decimals?: number

  // date / datetime
  dateFormat?: string
  hourFormat?: '12' | '24'
  /** No mount: se o valor for `null`, preenche a data de hoje; senão mantém. */
  autonow?: boolean
  /** Data mínima/máxima selecionável (string `YYYY-MM-DD` ou `Date`). */
  minDate?: string | Date
  maxDate?: string | Date

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

  // cep
  /** For type 'cep' — maps ViaCEP response fields to form field names.
   *  Keys are ViaCEP response names (logradouro, bairro, localidade, uf, complemento).
   *  Values are the form field names to populate. Omit keys to skip fields. */
  cepFields?: {
    logradouro?: string
    bairro?: string
    localidade?: string // cidade
    uf?: string
    complemento?: string
  }

  // field group
  /** Optional visual grouping. Fields with the same group.id render together
   *  under a titled section. Ungrouped fields render in a default section at the top.
   *  `order` controls the display order of groups; defaults to the order of first occurrence. */
  fieldGroup?: {
    id: string
    title: string
    description?: string
    order?: number
    /** Nº de colunas do grid deste grupo — sobrepõe o `columns` do form. */
    columns?: number
  }
}
