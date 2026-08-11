import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-id-card',
  summary:
    'Card de campos rótulo/valor com formatação (moeda, data, número). Variante `metric` para o resumo de um documento.',
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
    {
      name: 'Resumo (variant metric)',
      description:
        'Uma linha por número: rótulo à esquerda, valor grande à direita, divisória entre.',
      props: {
        title: 'Resumo da recomendação',
        variant: 'metric',
        fields: [
          { label: 'Área atendida', value: 260, format: 'number', decimals: 0, suffix: 'ha' },
          { label: 'BAGs a tratar', value: 20, format: 'number', decimals: 0 },
          { label: 'Volume total', value: 14000, format: 'number', decimals: 0, suffix: 'kg' },
          { label: 'Calda total', value: 152, format: 'number', decimals: 1, suffix: 'L' },
        ],
      },
    },
  ],
})
