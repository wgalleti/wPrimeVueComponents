// Cartão que vira ação (WKpiCard, WMeter): com `to` ele é um RouterLink; com
// um listener de `click` ele é um botão de teclado (role="button", Tab, Enter e
// Espaço); sem nenhum dos dois continua um <article> estático — quem não usa
// não ganha foco nem cursor de mão.
import { getCurrentInstance, type Component } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

export interface InteractiveCardBinding {
  /** Elemento raiz: RouterLink, 'div' (botão) ou 'article' (estático). */
  is: Component | string
  /** true quando o cartão responde a clique/teclado (liga o estado de hover/foco). */
  interactive: boolean
  /** Atributos e listeners do elemento raiz. */
  attrs: Record<string, unknown>
}

const camelize = (s: string) => s.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/**
 * O pai ouve `event`? Lê as props cruas do vnode, onde o listener continua
 * mesmo com o evento declarado em defineEmits. Cobre as formas que o
 * compilador gera: `onItemClick`, `onItem-click` e as variantes `.once`.
 */
export function hasListener(
  rawProps: Record<string, unknown> | null | undefined,
  event: string,
): boolean {
  if (!rawProps) return false
  const keys = new Set([`on${capitalize(camelize(event))}`, `on${capitalize(event)}`])
  for (const key of [...keys]) keys.add(`${key}Once`)
  for (const key of keys) if (rawProps[key] != null) return true
  return false
}

/**
 * Chame no `setup` do cartão; `emitClick` é o `emit('click', event)` dele.
 * `binding(to)` deve ser chamado NO RENDER (não num computed): as props cruas
 * do vnode não são reativas, e o listener pode entrar ou sair depois do mount.
 */
export function useInteractiveCard(emitClick: (event: MouseEvent | KeyboardEvent) => void) {
  const instance = getCurrentInstance()

  const onKeydown = (event: KeyboardEvent) => {
    // Enter/Espaço num filho focável (botão do footer, input) é dele, não do card.
    if (event.target !== event.currentTarget) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    if (event.key === ' ' && event.repeat) return
    emitClick(event)
  }

  function binding(to: RouteLocationRaw | undefined): InteractiveCardBinding {
    if (to != null && to !== '') {
      return { is: RouterLink, interactive: true, attrs: { to, onClick: emitClick } }
    }
    if (hasListener(instance?.vnode.props, 'click')) {
      return {
        is: 'div',
        interactive: true,
        attrs: { role: 'button', tabindex: 0, onClick: emitClick, onKeydown },
      }
    }
    return { is: 'article', interactive: false, attrs: {} }
  }

  return { binding }
}
