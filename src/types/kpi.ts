// ---------------------------------------------------------------------------
// KPI
// ---------------------------------------------------------------------------

import type { RouteLocationRaw } from 'vue-router'

export interface KpiItem {
  icon: string
  label: string
  value: string | number
  color?: string
  severity?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  hint?: string
  loading?: boolean
  trend?: {
    value: string
    direction?: 'up' | 'down' | 'neutral'
  }
  /** Destino ao clicar — o card vira RouterLink (exige vue-router). */
  to?: RouteLocationRaw
  /** Série da sparkline (ordem cronológica), na cor da severidade. */
  spark?: number[]
  /** Tamanho do card; sem valor, segue o `dense` do WKpiGrid. */
  size?: 'default' | 'compact'
}

/** Payload do `item-click` do WKpiGrid. */
export interface KpiItemClickEvent {
  item: KpiItem
  index: number
}
