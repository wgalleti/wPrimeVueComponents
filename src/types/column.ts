// ---------------------------------------------------------------------------
// Column
// ---------------------------------------------------------------------------

export type ColumnType =
  'text' | 'boolean' | 'date' | 'datetime' | 'number' | 'currency' | 'image' | 'custom'

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
}
