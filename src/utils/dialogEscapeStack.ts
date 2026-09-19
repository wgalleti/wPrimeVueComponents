import Dialog from 'primevue/dialog'
import Drawer from 'primevue/drawer'

/**
 * Esc fecha todos os overlays empilhados (PrimeVue 4.x): cada `Dialog`/`Drawer`
 * aberto registra o próprio `keydown` no `document` e fecha no Escape sem checar
 * se é o do topo — com dois modais abertos (form do CRUD + FK inline, confirm
 * sobre dialog…), um Esc fecha os dois de uma vez.
 *
 * O patch envolve o handler de teclado do próprio componente: com mais de um
 * overlay visível, só o do topo (maior z-index da máscara; empate resolve pela
 * ordem no DOM) responde ao Esc — os demais ignoram e esperam a vez. Um overlay
 * só mantém o comportamento nativo intacto.
 *
 * Roda uma vez, no `install()` do plugin, antes de qualquer instância ser
 * criada (o Vue liga os `methods` na instanciação). Corrigido no PrimeVue 5;
 * ao migrar, remover.
 */

const OVERLAY_SELECTOR = '[data-pc-name="dialog"], [data-pc-name="drawer"]'
const PATCHED = Symbol('w-escape-stack')

type OverlayVm = { container?: HTMLElement | null }
type KeyHandler = ((this: OverlayVm, event: KeyboardEvent) => void) & { [PATCHED]?: true }
type OverlayComponent = { methods?: Record<string, KeyHandler> }

function isVisible(el: HTMLElement): boolean {
  for (let node: HTMLElement | null = el; node; node = node.parentElement) {
    if (node.hidden || getComputedStyle(node).display === 'none') return false
  }
  return true
}

function zIndexOf(container: HTMLElement): number {
  // A máscara (pai do container) recebe o z-index incremental do ZIndex utils.
  const z = Number.parseInt(getComputedStyle(container.parentElement ?? container).zIndex, 10)
  return Number.isNaN(z) ? 0 : z
}

/** Overlays do PrimeVue visíveis no momento (dialogs em abas ocultas ficam fora). */
export function visibleOverlays(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(OVERLAY_SELECTOR)).filter(isVisible)
}

/**
 * `true` quando `container` é o overlay visível do topo. Sem `container`
 * (instância sem DOM) segue o nativo; um overlay oculto (aba inativa) nunca
 * é topo — o Esc é de quem está na tela.
 */
export function isTopOverlay(container: HTMLElement | null | undefined): boolean {
  if (!container) return true
  const abertos = visibleOverlays()
  if (!abertos.includes(container)) return false
  if (abertos.length === 1) return true
  let topo = abertos[0]
  for (const el of abertos) {
    if (zIndexOf(el) >= zIndexOf(topo)) topo = el
  }
  return topo === container
}

function wrapEscape(component: unknown, method: string): void {
  const methods = (component as OverlayComponent).methods
  const original = methods?.[method]
  if (!methods || !original || original[PATCHED]) return
  const patched: KeyHandler = function (this: OverlayVm, event: KeyboardEvent) {
    if (event.code === 'Escape' && !isTopOverlay(this.container)) return
    original.call(this, event)
  }
  patched[PATCHED] = true
  methods[method] = patched
}

/**
 * Aplica o patch em `Dialog` e `Drawer` do PrimeVue (idempotente). O plugin
 * chama por padrão; exposto para quem registra com `patchDialogEscape: false`
 * e quer aplicar por conta própria, ou para apps sem o plugin.
 */
export function patchDialogEscapeStack(): void {
  if (typeof document === 'undefined') return
  wrapEscape(Dialog, 'onKeyDown')
  wrapEscape(Drawer, 'onKeydown')
}
