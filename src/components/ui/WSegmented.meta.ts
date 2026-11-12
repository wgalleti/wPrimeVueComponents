import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-table',
  summary: 'Grupo de opções lado a lado (simples ou múltiplo); com uma opção só vira alternador.',
  examples: [
    {
      name: 'Visão',
      props: {
        ariaLabel: 'Visão',
        options: [
          { label: 'Lista', value: 'lista', icon: 'pi pi-list' },
          { label: 'Cartões', value: 'cartoes', icon: 'pi pi-th-large' },
        ],
      },
    },
    {
      name: 'Pequeno',
      props: {
        size: 'sm',
        ariaLabel: 'Período',
        options: [
          { label: 'Dia', value: 'dia' },
          { label: 'Semana', value: 'semana' },
          { label: 'Mês', value: 'mes' },
        ],
      },
    },
    {
      name: 'Alternador',
      props: { ariaLabel: 'Só ativos', options: [{ label: 'Só ativos', value: true }] },
    },
  ],
})
