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

interface Tema {
  [chave: string]: Tema
}

describe('buildEditorialTheme', () => {
  it('mantém a paleta, o texto e o tooltip do tema padrão', async () => {
    vi.resetModules()
    const { buildChartTheme, buildEditorialTheme } = await import('./chart')
    const padrao = buildChartTheme()
    const editorial = buildEditorialTheme()
    expect(editorial.color).toEqual(padrao.color)
    expect(editorial.textStyle).toEqual(padrao.textStyle)
    expect(editorial.tooltip).toEqual(padrao.tooltip)
    expect(editorial.pie).toEqual(padrao.pie)
    expect(editorial.bar).toEqual(padrao.bar)
  })

  it('troca só o cromo: grade tracejada, eixo de valor sem linha, linha sem símbolo', async () => {
    vi.resetModules()
    const { buildEditorialTheme } = await import('./chart')
    const t = buildEditorialTheme() as Tema
    expect(t.valueAxis.axisLine).toEqual({ show: false })
    expect(t.valueAxis.axisTick).toEqual({ show: false })
    expect(t.valueAxis.splitLine).toMatchObject({
      show: true,
      lineStyle: { type: 'dashed', width: 1 },
    })
    expect(t.categoryAxis.splitLine).toEqual({ show: false })
    expect(t.categoryAxis.axisLine.show).toBe(true)
    expect(t.timeAxis.splitLine).toEqual({ show: false })
    expect(t.valueAxis.axisLabel.fontSize).toBe(11)
    expect(t.legend).toMatchObject({ itemWidth: 6, itemHeight: 6, textStyle: { fontSize: 11 } })
    expect(t.line).toMatchObject({ showSymbol: false, lineStyle: { width: 2 } })
  })
})
