import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'CRUD',
  icon: 'pi pi-list',
  summary: 'View completa de CRUD (tabela/cards, busca, KPIs e form dialog) sobre useCrudManager.',
  examples: [
    {
      name: 'Config',
      props: {
        title: 'Clientes',
        subtitle: 'Gerencie os clientes cadastrados',
      },
    },
  ],
})
