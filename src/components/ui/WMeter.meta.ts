import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-gauge',
  summary:
    'Meta de painel: realizado × meta com barra, percentual e marcador de ritmo ("esperado hoje"); cor automática pelo ritmo.',
  examples: [
    {
      name: 'No ritmo',
      props: {
        label: 'Vendas do mês',
        value: 1200000,
        goal: 2000000,
        expected: 1100000,
        format: 'currency',
        hint: 'Dia 16 de 30',
      },
    },
    {
      name: 'Atrasado',
      props: {
        label: 'Captações',
        value: 14,
        goal: 40,
        expected: 22,
      },
    },
    {
      name: 'Sem meta',
      props: { label: 'Locações', value: 9, goal: null },
    },
    {
      name: 'Compacto',
      props: {
        label: 'Conversão',
        value: 12.5,
        goal: 20,
        expected: 11,
        format: 'percent',
        size: 'compact',
      },
    },
  ],
})
