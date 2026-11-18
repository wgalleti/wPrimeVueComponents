import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-chart-bar',
  summary:
    'Card de indicador para dashboards: tendência, sparkline, variantes compacta e herói, ícone em linha e card clicável (to/@click).',
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
      name: 'Valor no tom',
      props: {
        label: 'Pedidos atrasados',
        value: 7,
        icon: 'pi pi-exclamation-triangle',
        severity: 'danger',
        tint: 'value',
        hint: 'prazo de entrega vencido',
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
      name: 'Herói',
      props: {
        label: 'Receita do mês',
        value: 'R$ 1.284.300',
        icon: 'pi pi-dollar',
        severity: 'success',
        size: 'hero',
        trend: { value: '+8%', direction: 'up' },
        hint: 'vs. mês anterior',
        spark: [3, 5, 4, 8, 7, 9, 12],
      },
    },
    {
      name: 'Ícone em linha',
      props: {
        label: 'Pedidos abertos',
        value: 42,
        icon: 'pi pi-inbox',
        severity: 'info',
        iconStyle: 'inline',
        hint: 'aguardando separação',
      },
    },
    {
      name: 'Carregando',
      props: { label: 'Pedidos', value: 0, loading: true },
    },
  ],
})
