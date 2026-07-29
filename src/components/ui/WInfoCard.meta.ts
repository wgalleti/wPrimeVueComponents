import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-id-card',
  summary: 'Card de exibição de campos rótulo/valor com formatação (moeda, data, número).',
  examples: [
    {
      name: 'Dados do cliente',
      props: {
        title: 'Cliente',
        fields: [
          { label: 'Nome', value: 'Maria Silva' },
          { label: 'CPF', value: '123.456.789-00' },
          { label: 'Cadastro', value: '2024-03-15', format: 'date' },
        ],
      },
    },
    {
      name: 'Resumo financeiro',
      props: {
        title: 'Financeiro',
        fields: [
          { label: 'Saldo', value: 4235.9, format: 'currency' },
          { label: 'Pedidos', value: 42, format: 'number' },
          { label: 'Última compra', value: '2024-07-01', format: 'date' },
        ],
      },
    },
  ],
})
