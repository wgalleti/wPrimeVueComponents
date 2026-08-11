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
  | 'segmented'
  | 'choice'
  | 'chips'

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

/** Resultado do `subRows` da FK: mapa `id → sub-linhas` + colunas do mini-grid. */
export interface FieldSubRowsResult {
  map: Record<string, Record<string, unknown>[]>
  columns: ColumnDef[]
}

/** Busca as sub-linhas de uma página do modal da FK. */
export type FieldSubRowsFetch = (
  rows: Record<string, unknown>[]
) => Promise<FieldSubRowsResult>

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
  /** Campo somente-leitura: renderiza desabilitado (o valor ainda vai no payload). */
  readonly?: boolean
  /** Campo calculado: o valor é derivado dos demais via `calculate` e o campo fica
   *  somente-leitura. Recomputado sempre que o `formData` muda. */
  computed?: boolean
  /** Função que deriva o valor de um campo `computed` a partir do formData atual.
   *  Deve ser pura e cair no valor existente quando não puder derivar (ex.: na edição,
   *  quando a FK já vem como id e não como objeto). */
  calculate?: (formData: Record<string, unknown>, isEditing: boolean) => unknown

  // select / autocomplete / transfer / segmented / choice / chips
  options?: SelectOption[] | Ref<SelectOption[]>
  optionLabel?: string
  /** Segunda linha da opção, em texto de apoio — para o dado que **decide** a escolha
   *  aparecer antes dela, não depois (ex.: o saldo em estoque de um lote).
   *  É uma **chave** do registro; formate no backend, como já se faz com `{fk}_nome`.
   *  Só afeta a lista de sugestões: escolhido o item, o campo mostra `optionLabel`. */
  optionDescription?: string
  optionValue?: string
  showClear?: boolean
  /** For 'transfer' fields — option keys to match against when searching
   *  (defaults to [optionLabel]). */
  searchFields?: string[]

  // fk
  endpoint?: string
  /** Filtros fixos enviados à API na busca da FK. Pode ser uma função para depender
   *  de contexto do pai (ex.: `() => ({ com_saldo_local: local })`) — reavaliada a
   *  cada render, então reativa a refs/props externas. */
  endpointParams?:
    Record<string, string | number | boolean> | (() => Record<string, string | number | boolean>)
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
  /** Sub-linhas do grid do modal da FK: recebe as linhas da página e devolve o mapa
   *  `id → sub-linhas` + as colunas (dinâmicas) do mini-grid. Linha com entrada no
   *  mapa abre expandida — ex.: lote (linha) com as análises dele (sub-linhas). */
  subRows?: FieldSubRowsFetch
  /** Largura do modal de pesquisa da FK (default do componente: 480px). Útil quando
   *  há sub-linhas/colunas dinâmicas que precisam de espaço. */
  dialogWidth?: string
  /** Controla o CRUD inline da FK (criar/editar/excluir no modal de busca). Omitido =
   *  auto-detecta (há `crudFields` ou a API expõe `extras.fields`). Use `false` para
   *  forçar desligado (ex.: lote que não pode ser criado sem semear o produto irmão). */
  canCreate?: boolean
  canEdit?: boolean
  canDelete?: boolean

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

  // choice
  /** Ícone no chip selecionado do `type: 'choice'` (default `pi pi-check-circle`).
   *  `''` desliga o ícone. */
  choiceIcon?: string

  // chips
  /** `type: 'chips'` — mensagem no lugar dos chips quando o valor está vazio. */
  chipsEmptyLabel?: string
  /** `type: 'chips'` — `aria-label`/`title` do botão de remover do chip. */
  chipsRemoveLabel?: string

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
