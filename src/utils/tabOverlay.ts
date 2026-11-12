import { computed } from 'vue'
import { useTabHost } from '@/types/routeTabs'

/**
 * Âncora de overlay transiente (Popover, Menu, ContextMenu) na navegação por abas. Dentro de uma
 * aba, o overlay pendura no pane dela (some com a aba, morre com ela); fora, `body`.
 *
 * O PrimeVue posiciona esses overlays em coordenadas do DOCUMENTO, mas o pane é `position:
 * relative`: o deslocamento do pane é devolvido por `translate` (tabs.css, `.w-tab-overlay`)
 * a partir de `--w-overlay-shift-*`, que `sync()` grava no pane antes de cada abertura.
 */
export function useTabOverlay() {
  const tabHost = useTabHost()
  const appendTo = computed(() => tabHost?.hostEl.value ?? 'body')

  function sync(): void {
    const host = tabHost?.hostEl.value
    if (!host) return
    const r = host.getBoundingClientRect()
    host.style.setProperty(
      '--w-overlay-shift-x',
      `${-(r.left + window.scrollX + host.clientLeft)}px`,
    )
    host.style.setProperty('--w-overlay-shift-y', `${-(r.top + window.scrollY + host.clientTop)}px`)
  }

  /** Reposiciona `el` (já alinhado pelo PrimeVue) contra a área visível da aba. */
  function fit(el: HTMLElement, target: HTMLElement): void {
    fitOverlay(el, target, tabHost?.hostEl.value ?? null)
  }

  return { appendTo, sync, fit }
}

/**
 * O flip do PrimeVue (`absolutePosition`) mede contra o viewport e, quando o overlay não cabe
 * em nenhum lado, prende o topo em 0 — cobre o gatilho e, numa aba, fica sob a barra de abas.
 * Aqui: embaixo se couber; senão em cima se couber na área visível (topo do pane, não da
 * janela); senão no lado com mais espaço, colado ao gatilho e com rolagem interna.
 */
export function fitOverlay(el: HTMLElement, target: HTMLElement, host: HTMLElement | null): void {
  el.style.maxHeight = ''
  el.style.overflowY = ''
  const t = target.getBoundingClientRect()
  const topLimit = Math.max(0, host?.getBoundingClientRect().top ?? 0)
  const bottomLimit = window.innerHeight
  const height = el.offsetHeight
  // margem do PrimeVue (gutter): positiva embaixo, negativa no flip — o vão é o mesmo
  const gap = Math.abs(parseFloat(getComputedStyle(el).marginTop) || 0)
  const below = bottomLimit - t.bottom - gap
  const above = t.top - topLimit - gap
  const flip = height > below && (height <= above || above > below)
  if (height > (flip ? above : below)) {
    el.style.maxHeight = `${Math.max(0, flip ? above : below)}px`
    el.style.overflowY = 'auto'
  }
  el.classList.toggle('p-popover-flipped', flip)
  if (flip) el.setAttribute('data-p-popover-flipped', 'true')
  else el.removeAttribute('data-p-popover-flipped')
  const r = el.getBoundingClientRect()
  const desired = flip ? t.top - gap - r.height : t.bottom + gap
  el.style.top = `${(parseFloat(el.style.top) || 0) + desired - r.top}px`
}
