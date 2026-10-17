/** Chave de uma linha do WGroupedSelectList (o valor de `dataKey`). */
export type GroupedSelectKey = string | number

/** Escopo dos slots `group-header` e `group-meta` do WGroupedSelectList. */
export interface GroupedSelectGroupScope {
  groupKey: string
  /** Rótulo do grupo (`groupLabel` ou a própria chave). */
  label: string
  /** Todas as linhas do grupo, na ordem de `items`. */
  items: Record<string, unknown>[]
  /** Linhas do grupo que estão em `selection`. */
  selectedCount: number
  /** Linhas do grupo que podem ser selecionadas. */
  selectableCount: number
  collapsed: boolean
}
