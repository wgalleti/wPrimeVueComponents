// ---------------------------------------------------------------------------
// WButton / WMenu
// ---------------------------------------------------------------------------

/** Papel do botão: um `primary` por região; `danger` só para o destrutivo. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

/** `md` é o tamanho do controle; `sm` cabe em linha de tabela, barra e painel. */
export type ButtonSize = 'sm' | 'md'

/** `popup` abre ancorado no botão (`toggle(event)`); `context` abre no ponteiro (`show(event)`). */
export type MenuMode = 'popup' | 'context'
