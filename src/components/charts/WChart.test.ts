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
  }
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
