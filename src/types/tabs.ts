/** Uma aba do WTabBar. */
export interface TabItem {
  /** Valor que entra no v-model quando a aba é escolhida. */
  value: string
  label: string
  /** Ícone PrimeIcons opcional (`pi pi-file`). */
  icon?: string
  /** Contador/etiqueta à direita do rótulo (ex.: `'3/8'`). */
  badge?: string | number
  disabled?: boolean
}
