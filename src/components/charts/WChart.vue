<script setup lang="ts">
/**
 * Wrapper único de gráficos (Apache ECharts). As telas nunca importam
 * `echarts` direto: tema (claro/escuro via tokens CSS do consumidor),
 * densidade, loading, estado vazio e variante de impressão moram aqui.
 *
 * O ECharts entra por `import()` dinâmico (ver utils/chart.ts): quem nunca
 * renderiza um gráfico não paga pela biblioteca. Se o import falhar
 * (offline, CSP), o gráfico vira a mensagem de indisponibilidade.
 */
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import {
  buildChartTheme,
  buildLoadingOptions,
  buildPrintTheme,
  loadEcharts,
  toChartSelectEvent,
  withClickable,
  type ChartSelectEvent,
  type WChartOption,
} from '@/utils/chart'

import type { EChartsType } from 'echarts/core'

const props = withDefaults(
  defineProps<{
    /** Option do ECharts — série, eixos, tooltip etc. */
    option: WChartOption
    /** Mostra o overlay de carregamento do ECharts (cores do DS). */
    loading?: boolean
    /** true quando a consulta voltou vazia — mostra o estado vazio no lugar do gráfico. */
    empty?: boolean
    emptyMessage?: string
    /** svg para impressão/PDF; canvas no dia a dia. */
    renderer?: 'canvas' | 'svg'
    /** Modo impressão: tema monocromático + SVG + sem animação (PDF Gotenberg). */
    print?: boolean
    /** Altura CSS do gráfico (default: token `--chart-h`, senão 18rem). */
    height?: string
    /**
     * Item de dado clicável: cursor de mão, realce do item sob o mouse e o
     * evento `select` no clique. Desligado, o gráfico não emite nada.
     */
    clickable?: boolean
  }>(),
  {
    loading: false,
    empty: false,
    emptyMessage: 'Sem dados para exibir',
    renderer: 'canvas',
    print: false,
    height: '',
    clickable: false,
  },
)

const emit = defineEmits<{
  /** Clique num item de dado (só com `clickable`). */
  select: [event: ChartSelectEvent]
}>()

const container = ref<HTMLElement | null>(null)
const chart = shallowRef<EChartsType | null>(null)
/** ECharts indisponível (import falhou) — mostra aviso no lugar do canvas. */
const unavailable = ref(false)

let resizeObserver: ResizeObserver | null = null
let themeObserver: MutationObserver | null = null

const applyOption = () => {
  if (!chart.value) return
  const option = props.clickable ? withClickable(props.option) : props.option
  chart.value.setOption(option as never, true)
}

const onChartClick = (params: unknown) => {
  if (!props.clickable) return
  const event = toChartSelectEvent(params)
  if (event) emit('select', event)
}

/** Solta o listener e descarta a instância (re-init e unmount). */
const disposeChart = () => {
  chart.value?.off('click', onChartClick)
  chart.value?.dispose()
  chart.value = null
}

const applyLoading = () => {
  if (!chart.value) return
  if (props.loading) chart.value.showLoading('default', buildLoadingOptions())
  else chart.value.hideLoading()
}

/** (Re)cria a instância — tema e renderer só mudam com init novo. */
const build = async () => {
  const core = await loadEcharts()
  if (!container.value) return
  if (!core) {
    unavailable.value = true
    return
  }
  unavailable.value = false
  disposeChart()
  chart.value = core.init(container.value, props.print ? buildPrintTheme() : buildChartTheme(), {
    renderer: props.print ? 'svg' : props.renderer,
  })
  chart.value.on('click', onChartClick)
  applyOption()
  applyLoading()
}

watch(() => props.option, applyOption, { deep: true })
watch(() => props.loading, applyLoading)
watch(() => props.clickable, applyOption)
watch([() => props.print, () => props.renderer], () => void build())

onMounted(() => {
  void build()

  resizeObserver = new ResizeObserver(() => chart.value?.resize())
  if (container.value) resizeObserver.observe(container.value)

  // Troca de tema do app (ex.: data-theme no <html>) muda os tokens CSS —
  // reconstrói o tema sem exigir prop de tema do consumidor.
  themeObserver = new MutationObserver(() => void build())
  themeObserver.observe(document.documentElement, { attributes: true })
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  themeObserver?.disconnect()
  disposeChart()
})
</script>

<template>
  <div class="w-chart" :style="height ? { '--w-chart-h': height } : undefined">
    <div v-if="empty && !loading" class="w-chart__empty">
      <slot name="empty">{{ emptyMessage }}</slot>
    </div>
    <div v-else-if="unavailable" class="w-chart__empty">
      <slot name="unavailable">Gráfico indisponível.</slot>
    </div>
    <div v-show="!empty && !unavailable" ref="container" class="w-chart__canvas" />
  </div>
</template>

<style scoped>
.w-chart {
  /* `width: 100%` porque num pai flex/grid o canvas nascia com 0px e o
     ECharts não desenhava nada ("Can't get DOM width"). */
  width: 100%;
  height: var(--w-chart-h, var(--chart-h, 18rem));
  min-width: 0;
}

.w-chart__canvas {
  height: 100%;
  width: 100%;
}

.w-chart__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--w-fg-subtle);
  font-size: var(--w-ui-font);
}
</style>
