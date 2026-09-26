import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-chart-bar',
  summary:
    'Card de indicador para dashboards: tendência, sparkline, variante compacta e card clicável (to/@click).',
  examples: [
    {
      name: 'Básico',
      props: { label: 'Alunos ativos', value: 128, icon: 'pi pi-users', severity: 'success' },
    },
    {
      name: 'Com tendência',
      props: {
        label: 'Receita',
        value: 'R$ 42,5k',
        icon: 'pi pi-dollar',
        severity: 'primary',
        trend: { value: '+8%', direction: 'up' },
        hint: 'vs. mês anterior',
      },
    },
    {
      name: 'Com sparkline',
      props: {
        label: 'Vendas',
        value: 'R$ 1,2 mi',
        icon: 'pi pi-chart-line',
        severity: 'success',
        spark: [3, 5, 4, 8, 7, 9, 12],
        hint: 'últimos 7 meses',
      },
    },
    {
      name: 'Compacto',
      props: {
        label: 'Leads novos',
        value: 42,
        icon: 'pi pi-inbox',
        severity: 'info',
        size: 'compact',
        trend: { value: '+12%', direction: 'up' },
      },
    },
    {
      name: 'Carregando',
      props: { label: 'Pedidos', value: 0, loading: true },
    },
  ],
})
