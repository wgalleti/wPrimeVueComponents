import { onScopeDispose, readonly, ref, type Ref } from 'vue'

/**
 * Faixas de largura da suite — a régua de layout.
 *
 * ```
 * < 600px      celular          1 coluna, navegação colapsada
 * 600-839px    tablet RETRATO   1 painel por vez, drill-in com voltar
 * 840-1199px   tablet PAISAGEM  2 painéis lado a lado
 * >= 1200px    desktop          2-3 painéis, densidade de mesa
 * ```
 *
 * 840px é a fronteira medium/expanded do Material — a única com dado de parque
 * (93,7% dos tablets em retrato abaixo dela, 97,2% em paisagem acima). Todo
 * tablet de 10-11" em retrato mede 768-876 CSS px; em paisagem, >= 1024.
 *
 * **Largura, nunca `orientation`**: travar ou ramificar por orientação é falha de
 * acessibilidade (WCAG 1.3.4), e um tablet de 12,9" em retrato tem largura de
 * laptop — ele deve receber o layout de duas colunas.
 */
export const BREAKPOINTS = {
  /** Acima disto é tablet ou maior. */
  celular: 600,
  /** Acima disto cabem dois painéis lado a lado. */
  retrato: 840,
  /** Acima disto é mesa: densidade e três painéis liberados. */
  desktop: 1200,
} as const

/** Uma media query reativa, com limpeza automática ao sair do escopo. */
function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false)

  // Sem `window` (SSR, teste em ambiente node) a resposta é `false` — o layout
  // de mesa é o default e o cliente corrige na hidratação.
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return matches
  }

  const mql = window.matchMedia(query)
  matches.value = mql.matches

  const onChange = (event: MediaQueryListEvent) => {
    matches.value = event.matches
  }
  mql.addEventListener('change', onChange)
  onScopeDispose(() => mql.removeEventListener('change', onChange))

  return matches
}

/**
 * Em qual faixa a janela está, e se o ponteiro primário é o dedo.
 *
 * `isToque` vem de `pointer: coarse` — o ponteiro **primário**, então notebook
 * com tela sensível continua reportando `fine` e não é afetado.
 *
 * ```ts
 * const { isRetrato, isToque } = useBreakpoint()
 * // isRetrato: uma coluna, drill-in, tabela vira card
 * ```
 */
export function useBreakpoint() {
  const isCelular = useMediaQuery(`(max-width: ${BREAKPOINTS.celular - 1}px)`)
  /** Tablet em pé ou menor: um painel por vez. */
  const isRetrato = useMediaQuery(`(max-width: ${BREAKPOINTS.retrato - 1}px)`)
  /** Tablet deitado ou maior: cabem dois painéis. */
  const isPaisagem = useMediaQuery(`(min-width: ${BREAKPOINTS.retrato}px)`)
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.desktop}px)`)
  /** O dedo é o ponteiro: alvos maiores, sem hover. */
  const isToque = useMediaQuery('(pointer: coarse)')

  return {
    isCelular: readonly(isCelular),
    isRetrato: readonly(isRetrato),
    isPaisagem: readonly(isPaisagem),
    isDesktop: readonly(isDesktop),
    isToque: readonly(isToque),
  }
}
