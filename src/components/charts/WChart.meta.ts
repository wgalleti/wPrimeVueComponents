import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-chart-bar',
  summary:
    'Wrapper único do Apache ECharts: tema pelos tokens CSS (claro/escuro), loading, estado vazio e variante monocromática de impressão.',
  examples: [
    {
      name: 'Barras',
      props: {
        option: {
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category', data: ['jan', 'fev', 'mar', 'abr'] },
          yAxis: { type: 'value' },
          series: [{ name: 'Recebido', type: 'bar', data: [320, 410, 280, 520] }],
        },
      },
    },
    {
      name: 'Linha',
      props: {
        option: {
          tooltip: { trigger: 'axis' },
          legend: { bottom: 0 },
          xAxis: { type: 'category', data: ['jan', 'fev', 'mar', 'abr'] },
          yAxis: { type: 'value' },
          series: [
            { name: 'Análises', type: 'line', data: [12, 18, 9, 24] },
            { name: 'Com resultado', type: 'line', data: [8, 15, 7, 20] },
          ],
        },
      },
    },
    {
      name: 'Vazio',
      props: {
        option: {},
        empty: true,
        emptyMessage: 'Sem dados para o período selecionado',
      },
    },
  ],
})
