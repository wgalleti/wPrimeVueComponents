// ---------------------------------------------------------------------------
// WPermissionMatrix
// ---------------------------------------------------------------------------

/** Uma operação (coluna) da matriz: `key` é o que vai no valor, `label` o que se lê. */
export interface PermissionOperation {
  key: string
  label: string
}

/** Linha da matriz (ex.: uma tela do catálogo). */
export type PermissionRow = Record<string, unknown>

/** Valor da matriz (`v-model`): id da linha → chaves das operações marcadas. */
export type PermissionValue = Record<string, string[]>
