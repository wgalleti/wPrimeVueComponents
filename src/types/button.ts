// ---------------------------------------------------------------------------
// WButton / WMenu
// ---------------------------------------------------------------------------

/** Papel do botão: um `primary` por região; `danger` só para o destrutivo. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

/**
 * `md` é o tamanho do controle; `sm` cabe em linha de tabela, barra e painel.
 * @deprecated `small`/`large`: sinônimos do PrimeVue aceitos por compatibilidade (`small` = `sm`,
 * `large` = `md`) com aviso em DEV; use `sm` ou `md`.
 */
export type ButtonSize = 'sm' | 'md' | 'small' | 'large'

/** `popup` abre ancorado no botão (`toggle(event)`); `context` abre no ponteiro (`show(event)`). */
export type MenuMode = 'popup' | 'context'
