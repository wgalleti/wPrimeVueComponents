/** Uma coluna do WKanbanBoard. Os itens pertencem ao consumidor — o board não os muta. */
export interface KanbanColumn<T = Record<string, unknown>> {
  /** Identificador estável da coluna (vai no payload do `move` como from/to). */
  value: string
  /** Rótulo exibido no cabeçalho. */
  label: string
  /** Cards da coluna, na ordem de exibição. */
  items: T[]
  /**
   * Cor de acento da coluna — qualquer valor CSS, de preferência um token
   * (`var(--success)`). Tinge o marcador do cabeçalho, a faixa lateral dos
   * cards, o realce de drop e a linha de inserção. Sem valor, herda um neutro.
   */
  accent?: string
}

/** Payload do emit `move` do WKanbanBoard. */
export interface KanbanMoveEvent<T = Record<string, unknown>> {
  /** O item arrastado. */
  item: T
  /** `value` da coluna de origem. */
  from: string
  /** `value` da coluna de destino (igual a `from` ao reordenar na mesma coluna). */
  to: string
  /** Posição final do item na coluna destino (já ajustada quando from === to). */
  index: number
}
