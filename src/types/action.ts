// ---------------------------------------------------------------------------
// Row Action
// ---------------------------------------------------------------------------

export interface RowAction<T = Record<string, unknown>> {
  action: string
  icon: string
  tooltip?: string
  severity?: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast'
  visible?: (data: T) => boolean
  disabled?: (data: T) => boolean
  handler?: (data: T) => void
}
