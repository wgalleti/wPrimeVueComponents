import type { RouteLocationRaw } from 'vue-router'

/** Tom de um ponto de atenção: o que pede ação primeiro é `danger`. */
export type AttentionSeverity = 'danger' | 'warning' | 'info' | 'success' | 'neutral'

/** Uma linha do WAttentionList. */
export interface AttentionItem {
  /** Identificador estável (filtro, rota); sem ele, o índice. */
  key?: string
  icon: string
  label: string
  hint?: string
  value?: string | number
  severity?: AttentionSeverity
  /** Destino ao clicar — a linha vira RouterLink. */
  to?: RouteLocationRaw
  /** A linha é o filtro aplicado à lista agora. */
  active?: boolean
}

/** Payload do `item-click` do WAttentionList. */
export interface AttentionItemClickEvent {
  item: AttentionItem
  index: number
}
