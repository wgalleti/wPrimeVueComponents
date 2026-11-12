/** Um destino da paleta de comandos. O app entrega a lista já filtrada por permissão. */
export interface PaletteItem {
  id: string
  label: string
  group?: string
  /** Classe de ícone (ex.: `pi pi-home`). */
  icon?: string
  /** Texto auxiliar à direita (atalho, caminho). */
  hint?: string
}
