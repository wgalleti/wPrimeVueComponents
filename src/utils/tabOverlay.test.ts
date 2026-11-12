// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { fitOverlay } from './tabOverlay'

// jsdom não faz layout: o overlay "anda" com style.top, e o rect do gatilho e do pane é fixo.
function el(top: number, height: number): HTMLElement {
  const e = document.createElement('div')
  e.style.top = `${top}px`
  Object.defineProperty(e, 'offsetHeight', { get: () => height })
  e.getBoundingClientRect = () => {
    const t = parseFloat(e.style.top)
    const h = e.style.maxHeight ? Math.min(height, parseFloat(e.style.maxHeight)) : height
    return { top: t, bottom: t + h, height: h, left: 0, right: 0, width: 0, x: 0, y: t } as DOMRect
  }
  return e
}
function rect(top: number, bottom: number): HTMLElement {
  const e = document.createElement('div')
  e.getBoundingClientRect = () => ({ top, bottom, height: bottom - top }) as DOMRect
  return e
}

beforeEach(() => {
  Object.defineProperty(window, 'innerHeight', { value: 900, configurable: true })
})

describe('fitOverlay', () => {
  const pane = rect(88, 900)

  it('abre embaixo, colado, quando cabe', () => {
    const pop = el(0, 300)
    fitOverlay(pop, rect(383, 419), pane)
    expect(pop.style.top).toBe('419px')
    expect(pop.classList.contains('p-popover-flipped')).toBe(false)
  })

  it('vira para cima, colado, quando só cabe acima da área visível da aba', () => {
    const pop = el(0, 500)
    fitOverlay(pop, rect(636, 672), pane)
    expect(pop.style.top).toBe('136px')
    expect(pop.classList.contains('p-popover-flipped')).toBe(true)
  })

  it('não cabe em lado nenhum: fica no maior, colado, inteiro visível e com rolagem', () => {
    const pop = el(0, 514)
    fitOverlay(pop, rect(383, 419), pane)
    expect(pop.style.top).toBe('419px')
    expect(pop.style.maxHeight).toBe('481px')
    expect(pop.style.overflowY).toBe('auto')
    expect(pop.classList.contains('p-popover-flipped')).toBe(false)
  })

  it('o topo do pane conta como limite (a barra de abas cobre o que fica acima)', () => {
    const pop = el(0, 450)
    // caberia acima da janela (500 px), mas acima do pane só há 412 px: não entra sob a barra
    fitOverlay(pop, rect(500, 536), pane)
    expect(pop.classList.contains('p-popover-flipped')).toBe(true)
    expect(pop.style.top).toBe('88px')
    expect(pop.style.maxHeight).toBe('412px')
  })
})
