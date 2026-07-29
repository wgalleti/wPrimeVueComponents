import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'CRUD',
  icon: 'pi pi-table',
  summary: 'Renderiza o valor de uma célula conforme o tipo declarado na ColumnDef.',
  examples: [
    {
      name: 'Config',
      props: {
        column: { field: 'preco', header: 'Preço', type: 'currency' },
        value: 1234.56,
        rowData: { id: 1, preco: 1234.56 },
      },
    },
  ],
})
