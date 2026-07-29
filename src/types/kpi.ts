// ---------------------------------------------------------------------------
// KPI
// ---------------------------------------------------------------------------

export interface KpiItem {
  icon: string
  label: string
  value: string | number
  color?: string
  severity?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  hint?: string
  loading?: boolean
  trend?: {
    value: string
    direction?: 'up' | 'down' | 'neutral'
  }
}
