// Suporte do WChart: carregamento preguiçoso do ECharts, temas construídos a
// partir dos tokens CSS do consumidor e receitas de option compartilhadas.
//
// O `echarts` é dependência (o consumidor a recebe pelo npm), mas não entra no
// bundle da suite: o WChart o carrega por `import()` dinâmico — quem nunca abre
// um gráfico não paga por ele. O registro é tree-shaken: novo tipo de gráfico
// entra AQUI, nunca na tela do consumidor.

type EchartsCore = typeof import('echarts/core')

let echartsPromise: Promise<EchartsCore | null> | null = null

/** Núcleo do ECharts com barra/linha/pizza + tooltip/legenda/título registrados. */
export function loadEcharts(): Promise<EchartsCore | null> {
  if (!echartsPromise) {
    echartsPromise = Promise.all([
      import('echarts/core'),
      import('echarts/charts'),
      import('echarts/components'),
      import('echarts/renderers'),
    ])
      .then(([core, charts, components, renderers]) => {
        core.use([
          charts.BarChart,
          charts.LineChart,
          charts.PieChart,
          components.DatasetComponent,
          components.GridComponent,
          components.LegendComponent,
          components.TitleComponent,
          components.TooltipComponent,
          renderers.CanvasRenderer,
          renderers.SVGRenderer,
        ])
        return core
      })
      .catch(() => {
        // Offline/CSP: o WChart mostra o estado de indisponibilidade no lugar
        // do gráfico. Zera a promise para uma nova tentativa em outro mount.
        echartsPromise = null
        return null
      })
  }
  return echartsPromise
}

const token = (name: string, fallback = ''): string => {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

/** Objeto de tema do ECharts (o registro formal de tema é dispensável no init). */
export type ChartTheme = Record<string, unknown>

/** Option de gráfico — o contrato fica com o ECharts do consumidor. */
export type WChartOption = Record<string, unknown>

/**
 * Tema construído a partir dos tokens do design system do consumidor no momento
 * da chamada (`--fg`, `--fg-muted`, `--border`, `--surface`, `--viz-1..6`,
 * `--font-sans`) — lê os valores já resolvidos para light/dark. O WChart
 * reconstrói sozinho quando o atributo de tema do documento muda.
 */
export function buildChartTheme(): ChartTheme {
  const fg = token('--fg')
  const fgMuted = token('--fg-muted')
  const border = token('--border')
  const surface = token('--surface')
  const fontFamily = token('--font-sans', 'sans-serif')

  const axis = {
    axisLine: { lineStyle: { color: border } },
    axisTick: { show: false },
    axisLabel: { color: fgMuted },
    splitLine: { lineStyle: { color: border } },
    nameTextStyle: { color: fgMuted },
  }

  return {
    color: [1, 2, 3, 4, 5, 6].map((i) => token(`--viz-${i}`)),
    backgroundColor: 'transparent',
    textStyle: { color: fg, fontFamily },
    categoryAxis: { ...axis, splitLine: { show: false } },
    valueAxis: axis,
    timeAxis: { ...axis, splitLine: { show: false } },
    legend: {
      textStyle: { color: fgMuted },
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
    },
    title: {
      textStyle: { color: fg },
      subtextStyle: { color: fgMuted },
    },
    tooltip: {
      backgroundColor: surface,
      borderColor: border,
      textStyle: { color: fg },
      // Sombra e raio vêm dos tokens do consumidor; sem token, fica sem sombra
      // (melhor plano B do que inventar uma cor fora do DS de quem consome).
      extraCssText: 'box-shadow: var(--shadow-md, none); border-radius: var(--radius-sm, 0);',
    },
    line: { symbolSize: 6, smooth: false },
    pie: {
      label: { color: fgMuted },
      itemStyle: { borderColor: surface, borderWidth: 2 },
    },
    bar: { itemStyle: { borderRadius: [3, 3, 0, 0] } },
  }
}

/**
 * Tema monocromático de impressão: escala neutra fixa (papel quase mono),
 * sem animação — o snapshot do PDF é estático. Os valores seguem a paleta de
 * impressão do design system do portal (slate).
 */
export function buildPrintTheme(): ChartTheme {
  const shades = ['#141a22', '#5a6573', '#8794a3', '#cdd6e2', '#212d3b', '#335277']
  const axis = {
    axisLine: { lineStyle: { color: '#cdd6e2' } },
    axisTick: { show: false },
    axisLabel: { color: '#5a6573' },
    splitLine: { lineStyle: { color: '#e2e8f0' } },
    nameTextStyle: { color: '#5a6573' },
  }

  return {
    animation: false,
    color: shades,
    backgroundColor: 'transparent',
    textStyle: { color: '#141a22' },
    categoryAxis: { ...axis, splitLine: { show: false } },
    valueAxis: axis,
    timeAxis: { ...axis, splitLine: { show: false } },
    legend: { textStyle: { color: '#5a6573' }, icon: 'circle', itemWidth: 8, itemHeight: 8 },
    title: { textStyle: { color: '#141a22' }, subtextStyle: { color: '#5a6573' } },
    line: { symbolSize: 5, smooth: false },
    pie: { label: { color: '#5a6573' }, itemStyle: { borderColor: '#ffffff', borderWidth: 1 } },
    bar: { itemStyle: { borderRadius: 0 } },
  }
}

/** Opções do overlay de loading alinhadas ao DS (o built-in do ECharts usa azul próprio). */
export function buildLoadingOptions(): Record<string, unknown> {
  return {
    text: '',
    color: token('--primary'),
    maskColor: 'transparent',
    spinnerRadius: 8,
    lineWidth: 2,
  }
}

export interface DonutOptionInput {
  /** Fatias do donut. */
  data: { name: string; value: number }[]
  /** Formatador dos valores no tooltip. */
  format?: (value: number) => string
  /** Rótulo central (ex.: o total formatado). */
  centerLabel?: string
  /** Linha menor sob o rótulo central. */
  centerSub?: string
}

/**
 * Donut padrão: total no centro, legenda embaixo, tooltip com o mesmo
 * formatador dos valores.
 */
export function donutOption({
  data,
  format = (v) => String(v),
  centerLabel = '',
  centerSub = '',
}: DonutOptionInput): WChartOption {
  return {
    tooltip: { trigger: 'item', valueFormatter: format },
    legend: { bottom: 0, type: 'scroll' },
    title: centerLabel
      ? {
          text: centerLabel,
          subtext: centerSub,
          left: 'center',
          top: '38%',
          itemGap: 2,
          textStyle: { fontSize: 20, fontWeight: 600 },
          subtextStyle: { fontSize: 11 },
        }
      : undefined,
    series: [
      {
        type: 'pie',
        radius: ['58%', '80%'],
        center: ['50%', '46%'],
        label: { show: false },
        labelLine: { show: false },
        data,
      },
    ],
  }
}
