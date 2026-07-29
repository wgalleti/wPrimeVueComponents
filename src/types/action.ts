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

// ---------------------------------------------------------------------------
// Bulk Action (seleção múltipla)
// ---------------------------------------------------------------------------

export interface BulkAction<T = Record<string, unknown>> {
  action: string
  label: string
  icon?: string
  severity?: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast'
  /** Desabilita a ação para a seleção atual. */
  disabled?: (items: T[]) => boolean
  /** Executa a ação sobre os itens selecionados. */
  handler: (items: T[]) => void | Promise<void>
}
