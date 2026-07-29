import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-chart-bar',
  summary: 'Card de indicador para dashboards.',
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
      name: 'Carregando',
      props: { label: 'Pedidos', value: 0, loading: true },
    },
  ],
})
