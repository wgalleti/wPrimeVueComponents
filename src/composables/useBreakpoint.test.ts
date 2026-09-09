// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { effectScope } from 'vue'
import { useBreakpoint, BREAKPOINTS } from './useBreakpoint'

/** matchMedia falso: responde às queries de largura a partir de um valor único. */
function fingirLargura(largura: number, coarse = false) {
  const listeners = new Map<string, Set<(e: MediaQueryListEvent) => void>>()

  const avaliar = (query: string): boolean => {
    if (query.includes('pointer: coarse')) return coarse
    const max = /max-width:\s*(\d+)px/.exec(query)
    if (max) return largura <= Number(max[1])
    const min = /min-width:\s*(\d+)px/.exec(query)
    if (min) return largura >= Number(min[1])
    return false
  }

  window.matchMedia = vi.fn((query: string) => ({
    media: query,
    get matches() {
      return avaliar(query)
    },
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      if (!listeners.has(query)) listeners.set(query, new Set())
      listeners.get(query)!.add(cb)
    },
    removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.get(query)?.delete(cb)
    },
    dispatchEvent: () => true,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
  })) as unknown as typeof window.matchMedia

  return {
    /** Simula a janela mudando de tamanho: reavalia e avisa quem escuta. */
    mudarPara(nova: number) {
      largura = nova
      for (const [query, cbs] of listeners) {
        for (const cb of cbs) cb({ matches: avaliar(query) } as MediaQueryListEvent)
      }
    },
    listeners,
  }
}

/** Roda `useBreakpoint` dentro de um escopo, para poder testar a limpeza. */
function comEscopo<T>(fn: () => T): { valor: T; parar: () => void } {
  const escopo = effectScope()
  const valor = escopo.run(fn) as T
  return { valor, parar: () => escopo.stop() }
}

describe('useBreakpoint', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('classifica o tablet em pé como retrato', () => {
    fingirLargura(800)
    const { valor: bp } = comEscopo(useBreakpoint)
    expect(bp.isRetrato.value).toBe(true)
    expect(bp.isPaisagem.value).toBe(false)
    expect(bp.isDesktop.value).toBe(false)
    expect(bp.isCelular.value).toBe(false)
  })

  it('classifica o tablet deitado como paisagem', () => {
    fingirLargura(1280)
    const { valor: bp } = comEscopo(useBreakpoint)
    expect(bp.isRetrato.value).toBe(false)
    expect(bp.isPaisagem.value).toBe(true)
    expect(bp.isDesktop.value).toBe(true)
  })

  it('a fronteira dos 840px separa retrato de paisagem', () => {
    fingirLargura(BREAKPOINTS.retrato - 1)
    expect(comEscopo(useBreakpoint).valor.isRetrato.value).toBe(true)
    fingirLargura(BREAKPOINTS.retrato)
    expect(comEscopo(useBreakpoint).valor.isRetrato.value).toBe(false)
  })

  it('o iPad Pro 12.9" em retrato (1024px) recebe layout de paisagem', () => {
    fingirLargura(1024)
    expect(comEscopo(useBreakpoint).valor.isPaisagem.value).toBe(true)
  })

  it('reage à janela mudando de tamanho', () => {
    const tela = fingirLargura(1280)
    const { valor: bp } = comEscopo(useBreakpoint)
    expect(bp.isRetrato.value).toBe(false)
    tela.mudarPara(800)
    expect(bp.isRetrato.value).toBe(true)
  })

  it('`isToque` vem do ponteiro, não da largura', () => {
    fingirLargura(1280, true)
    const { valor: bp } = comEscopo(useBreakpoint)
    expect(bp.isToque.value).toBe(true)
    expect(bp.isRetrato.value).toBe(false)
  })

  it('solta os listeners ao sair do escopo', () => {
    const tela = fingirLargura(800)
    const { parar } = comEscopo(useBreakpoint)
    expect([...tela.listeners.values()].some((s) => s.size > 0)).toBe(true)
    parar()
    expect([...tela.listeners.values()].every((s) => s.size === 0)).toBe(true)
  })

  it('sem `window.matchMedia` responde `false` em vez de estourar', () => {
    const original = window.matchMedia
    // @ts-expect-error simula ambiente sem matchMedia (SSR)
    delete window.matchMedia
    const { valor: bp } = comEscopo(useBreakpoint)
    expect(bp.isRetrato.value).toBe(false)
    expect(bp.isToque.value).toBe(false)
    window.matchMedia = original
  })
})
