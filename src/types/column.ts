// ---------------------------------------------------------------------------
// Column
// ---------------------------------------------------------------------------

export type ColumnType =
  'text' | 'boolean' | 'date' | 'datetime' | 'number' | 'currency' | 'image' | 'custom'

/** Severidade do tag de status (mesmos nomes do PrimeVue; a cor vem dos tokens do app). */
export type TagSeverity =
  'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | 'primary'

/** Filtro declarativo de coluna — renderizado na barra de filtros e enviado
 *  como parâmetro na requisição de `list`. Opt-in por coluna. */
export interface ColumnFilter {
  /** Widget do filtro. Default: 'text'. */
  type?: 'text' | 'select' | 'boolean' | 'numeric'
  /** Opções para `type: 'select'`. */
  options?: { label: string; value: unknown }[]
  /** Nome do parâmetro enviado à API. Default: o `field` da coluna. */
  param?: string
  placeholder?: string
}

export interface ColumnDef {
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
  /** `type: 'boolean'` — rótulo do `true` (default 'Ativo'). `tagValue` tem prioridade. */
  trueLabel?: string
  /** `type: 'boolean'` — rótulo do `false` (default 'Inativo'). `tagValue` tem prioridade. */
  falseLabel?: string
  /** `type: 'boolean'` — cor do tag no `true` (default 'success'). `null` = texto neutro,
   *  sem tag. `tagSeverity` tem prioridade. */
  trueSeverity?: TagSeverity | null
  /** `type: 'boolean'` — cor do tag no `false` (default 'danger'). `null` = texto neutro,
   *  sem tag — para boolean que não é status (ex.: `nao_exige_analise` → "—"). */
  falseSeverity?: TagSeverity | null
  /** Filtro declarativo desta coluna (aparece na barra de filtros). */
  filter?: ColumnFilter
}
