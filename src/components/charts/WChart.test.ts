// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import WChart from './WChart.vue'

// O WChart carrega o ECharts por import() dinâmico; aqui o núcleo é falso —
// o que se testa é o contrato do wrapper (init, setOption, loading, dispose).
const instancia = {
  setOption: vi.fn(),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  resize: vi.fn(),
  dispose: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
}
const init = vi.fn(() => instancia)

vi.mock('echarts/core', () => ({ use: vi.fn(), init }))
vi.mock('echarts/charts', () => ({ BarChart: {}, LineChart: {}, PieChart: {} }))
vi.mock('echarts/components', () => ({
  DatasetComponent: {},
  GridComponent: {},
  LegendComponent: {},
  TitleComponent: {},
  TooltipComponent: {},
}))
vi.mock('echarts/renderers', () => ({ CanvasRenderer: {}, SVGRenderer: {} }))

// jsdom não tem ResizeObserver
vi.stubGlobal(
  'ResizeObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)

beforeEach(() => {
  vi.clearAllMocks()
})

const OPTION = { series: [{ type: 'bar', data: [1, 2, 3] }] }

function montar(props: Record<string, unknown> = {}) {
  return mount(WChart, { props: { option: OPTION, ...props } })
}

describe('WChart — ciclo de vida', () => {
  it('inicializa o ECharts e aplica a option', async () => {
    montar()
    await flushPromises()
    expect(init).toHaveBeenCalledTimes(1)
    expect(instancia.setOption).toHaveBeenCalledWith(OPTION, true)
  })

  it('reaplica a option quando a prop muda', async () => {
    const w = montar()
    await flushPromises()
    const nova = { series: [{ type: 'line', data: [9] }] }
    await w.setProps({ option: nova })
    expect(instancia.setOption).toHaveBeenLastCalledWith(nova, true)
  })

  it('descarta a instância no unmount', async () => {
    const w = montar()
    await flushPromises()
    w.unmount()
    expect(instancia.dispose).toHaveBeenCalled()
  })
})

describe('WChart — loading e renderer', () => {
  it('mostra e esconde o overlay de loading', async () => {
    const w = montar({ loading: true })
    await flushPromises()
    expect(instancia.showLoading).toHaveBeenCalled()
    await w.setProps({ loading: false })
    expect(instancia.hideLoading).toHaveBeenCalled()
  })

  it('modo print força renderer svg', async () => {
    montar({ print: true })
    await flushPromises()
    const [, , initOptions] = init.mock.calls[0] as unknown[]
    expect(initOptions).toMatchObject({ renderer: 'svg' })
  })
})

describe('WChart — estado vazio', () => {
  it('empty mostra a mensagem no lugar do gráfico', async () => {
    const w = montar({ empty: true, emptyMessage: 'Nada por aqui' })
    await flushPromises()
    expect(w.find('.w-chart__empty').text()).toBe('Nada por aqui')
  })

  it('slot #empty substitui a mensagem', async () => {
    const w = mount(WChart, {
      props: { option: OPTION, empty: true },
      slots: { empty: '<strong>vazio custom</strong>' },
    })
    await flushPromises()
    expect(w.find('.w-chart__empty strong').text()).toBe('vazio custom')
  })
})

describe('WChart — clique no item (clickable + select)', () => {
  const CLIQUE = {
    componentType: 'series',
    seriesName: 'Vendas',
    seriesIndex: 0,
    name: 'mar',
    dataIndex: 2,
    value: 3,
    data: 3,
  }

  /** O handler que o WChart registrou no `on('click')` da instância. */
  const handler = () => {
    const call = instancia.on.mock.calls.find((c: unknown[]) => c[0] === 'click') as
      [string, (p: unknown) => void] | undefined
    if (!call) throw new Error('listener de click não registrado')
    return call[1]
  }

  it('clickable: emite select com o item clicado', async () => {
    const w = montar({ clickable: true })
    await flushPromises()
    handler()(CLIQUE)
    expect(w.emitted('select')).toEqual([
      [
        {
          seriesName: 'Vendas',
          seriesIndex: 0,
          name: 'mar',
          dataIndex: 2,
          value: 3,
          data: 3,
        },
      ],
    ])
  })

  it('sem clickable não emite (retrocompatível)', async () => {
    const w = montar()
    await flushPromises()
    handler()(CLIQUE)
    expect(w.emitted('select')).toBeUndefined()
  })

  it('ignora clique fora de item de série (marcador, legenda)', async () => {
    const w = montar({ clickable: true })
    await flushPromises()
    handler()({ ...CLIQUE, componentType: 'markPoint' })
    expect(w.emitted('select')).toBeUndefined()
  })

  it('clickable completa cursor e emphasis sem sobrescrever a série', async () => {
    const option = {
      series: [
        { type: 'bar', data: [1] },
        { type: 'line', data: [2], cursor: 'crosshair', emphasis: { focus: 'series' } },
      ],
    }
    montar({ option, clickable: true })
    await flushPromises()
    const [aplicada] = instancia.setOption.mock.calls.at(-1) as [{ series: unknown[] }]
    expect(aplicada.series[0]).toMatchObject({ cursor: 'pointer', emphasis: { focus: 'self' } })
    expect(aplicada.series[1]).toMatchObject({ cursor: 'crosshair', emphasis: { focus: 'series' } })
    expect(option.series[0]).not.toHaveProperty('cursor')
  })

  it('solta o listener no unmount e no re-init', async () => {
    const w = montar({ clickable: true })
    await flushPromises()
    await w.setProps({ renderer: 'svg' })
    await flushPromises()
    expect(instancia.off).toHaveBeenCalledWith('click', expect.any(Function))
    expect(instancia.on).toHaveBeenCalledTimes(2)
    w.unmount()
    expect(instancia.off).toHaveBeenCalledTimes(2)
  })
})
