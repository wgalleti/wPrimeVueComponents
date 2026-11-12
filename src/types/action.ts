// ---------------------------------------------------------------------------
// Row Action
// ---------------------------------------------------------------------------

export interface RowAction<T = Record<string, unknown>> {
  action: string
  icon: string
  tooltip?: string
  /**
   * Só `danger` muda o botão (vermelho); o resto vira `ghost` (linha) ou `primary` (lote).
   * @deprecated `success`, `warn`, `info` e `contrast`: cor de status nunca é cor de botão; são
   * ignorados e avisam em DEV.
   */
  severity?: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast'
  visible?: (data: T) => boolean
  disabled?: (data: T) => boolean
  /** Motivo do bloqueio na linha (tooltip, `title` e `aria-label` do botão desabilitado). */
  disabledReason?: (data: T) => string | undefined
  handler?: (data: T) => void
}

// ---------------------------------------------------------------------------
// Bulk Action (seleção múltipla)
// ---------------------------------------------------------------------------

export interface BulkAction<T = Record<string, unknown>> {
  action: string
  label: string
  icon?: string
  /**
   * Só `danger` muda o botão (vermelho); o resto vira `ghost` (linha) ou `primary` (lote).
   * @deprecated `success`, `warn`, `info` e `contrast`: cor de status nunca é cor de botão; são
   * ignorados e avisam em DEV.
   */
  severity?: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast'
  /** Desabilita a ação para a seleção atual. */
  disabled?: (items: T[]) => boolean
  /** Executa a ação sobre os itens selecionados. */
  handler: (items: T[]) => void | Promise<void>
}
