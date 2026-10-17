import { defineComponentMeta } from '@/types/componentMeta'

const columns = [
  { field: 'nome', header: 'Nome' },
  { field: 'quantidade', header: 'Quantidade', type: 'number', align: 'right' },
  {
    field: 'status',
    header: 'Status',
    tagValue: (v: unknown) => String(v),
    tagSeverity: () => 'info',
  },
]

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-list-check',
  summary:
    'Tabela agrupada com seleção múltipla, checkbox de grupo em três estados e grupos recolhíveis.',
  examples: [
    {
      name: 'Agrupada por área',
      props: {
        columns,
        groupBy: 'area',
        selection: [1],
        items: [
          { id: 1, area: 'Norte', nome: 'Pacote A', quantidade: 12, status: 'Livre' },
          { id: 2, area: 'Norte', nome: 'Pacote B', quantidade: 8, status: 'Livre' },
          { id: 3, area: 'Sul', nome: 'Pacote C', quantidade: 20, status: 'Livre' },
        ],
      },
    },
    {
      name: 'Com linhas bloqueadas',
      props: {
        columns,
        groupBy: 'area',
        isSelectable: (item: Record<string, unknown>) => item.status === 'Livre',
        disabledReason: (item: Record<string, unknown>) => `Já em ${String(item.status)}`,
        items: [
          { id: 1, area: 'Norte', nome: 'Pacote A', quantidade: 12, status: 'Livre' },
          { id: 2, area: 'Norte', nome: 'Pacote B', quantidade: 8, status: 'Alocado' },
          { id: 3, area: 'Sul', nome: 'Pacote C', quantidade: 20, status: 'Alocado' },
        ],
      },
    },
  ],
})
