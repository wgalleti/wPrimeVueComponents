/** Escopo dos slots `group-header` e `group-meta` do WCrudView. */
export interface CrudGroupScope {
  groupKey: string
  /** Rótulo do grupo (`groupLabel` ou a própria chave). */
  label: string
  /** Linhas do grupo na página atual, na ordem de `crud.items`. */
  items: Record<string, unknown>[]
  /** Quantidade de linhas do grupo na página atual. */
  count: number
  collapsed: boolean
}
