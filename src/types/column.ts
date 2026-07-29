// ---------------------------------------------------------------------------
// Column
// ---------------------------------------------------------------------------

export type ColumnType =
  'text' | 'boolean' | 'date' | 'datetime' | 'number' | 'currency' | 'image' | 'custom'

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
  /** Filtro declarativo desta coluna (aparece na barra de filtros). */
  filter?: ColumnFilter
}
