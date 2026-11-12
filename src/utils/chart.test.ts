// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'

// O módulo guarda o contexto da sonda: cada caso importa uma cópia nova.
async function carregar(ctx: unknown) {
  vi.resetModules()
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx as never)
  return (await import('./chart')).absoluteColor
}

// Contexto falso: aceita qualquer cor que não comece com "invalida" e pinta o pixel dado.
function contexto(pixel: number[]) {
  let fill = ''
  return {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    getImageData: () => ({ data: pixel }),
    get fillStyle() {
      return fill
    },
    set fillStyle(v: string) {
      if (!v.startsWith('invalida')) fill = v
    },
  }
}

afterEach(() => vi.restoreAllMocks())

describe('absoluteColor', () => {
  it('resolve color-mix/oklch para rgb, que o ECharts sabe clarear no hover', async () => {
    const cor = await carregar(contexto([57, 49, 103, 255]))
    expect(cor('color-mix(in srgb, oklch(21% 0.01 285) 35%, oklch(42% 0.13 285))')).toBe(
      'rgb(57, 49, 103)',
    )
  })

  it('mantém o alfa', async () => {
    const cor = await carregar(contexto([10, 20, 30, 128]))
    expect(cor('oklch(50% 0.1 20 / 0.5)')).toBe('rgba(10, 20, 30, 0.502)')
  })

  it('devolve o texto original quando o navegador recusa o valor ou não há canvas', async () => {
    expect((await carregar(contexto([0, 0, 0, 255])))('invalida(1)')).toBe('invalida(1)')
    expect((await carregar(null))('oklch(50% 0.1 20)')).toBe('oklch(50% 0.1 20)')
  })
})
