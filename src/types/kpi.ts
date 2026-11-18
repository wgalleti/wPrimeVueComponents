// ---------------------------------------------------------------------------
// KPI
// ---------------------------------------------------------------------------

import type { RouteLocationRaw } from 'vue-router'

export interface KpiItem {
  /** Identificador estável (filtro aplicado, rota); volta no `item-click`. */
  key?: string
  icon: string
  label: string
  value: string | number
  /** Cor de identidade do ícone (qualquer cor CSS, ex. `var(--produto-x)`); vence o tom da severidade. */
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
  /** Tamanho do card; sem valor, segue o `dense` do WKpiGrid. `hero` ocupa duas colunas na grade. */
  size?: 'default' | 'compact' | 'hero'
  /** Ícone no quadrado tonal (`tile`, padrão) ou pequeno, sem fundo, ao lado do rótulo (`inline`). */
  iconStyle?: 'tile' | 'inline'
  /** O card é o filtro aplicado à lista (borda na cor do tom, `aria-pressed`). */
  active?: boolean
  /** O tom da severidade pinta só o ícone (`icon`, padrão) ou também o valor (`value`). */
  tint?: 'icon' | 'value'
  /**
   * `false` deixa o card estático mesmo com listener de `item-click` no WKpiGrid — para o
   * número que só informa numa grade em que os outros cards são filtros.
   */
  interactive?: boolean
}

/** Payload do `item-click` do WKpiGrid. */
export interface KpiItemClickEvent {
  item: KpiItem
  index: number
}
