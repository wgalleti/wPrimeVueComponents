import { defineComponentMeta } from '@/types/componentMeta'

const operations = [
  { key: 'ver', label: 'Ver' },
  { key: 'editar', label: 'Editar' },
  { key: 'gerenciar', label: 'Gerenciar' },
]

const rows = [
  { id: 'crm.leads', label: 'Leads', grupo: 'CRM', ops: ['ver', 'editar'] },
  { id: 'crm.contatos', label: 'Contatos', grupo: 'CRM', ops: ['ver', 'editar'] },
  { id: 'acessos.perfis', label: 'Perfis', grupo: 'Acessos', ops: ['ver', 'gerenciar'] },
]

const disponivel = (row: Record<string, unknown>, op: string) => (row.ops as string[]).includes(op)

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-th-large',
  summary:
    'Matriz linha × operação (perfil de acesso): checkbox por célula, marcar tudo por linha, coluna e grupo, células inexistentes e fixas, teclado de grade e card abaixo de 840px.',
  examples: [
    {
      name: 'Perfil de acesso',
      props: {
        rows,
        operations,
        groupBy: 'grupo',
        isAvailable: disponivel,
        modelValue: { 'crm.leads': ['ver'], 'acessos.perfis': ['ver', 'gerenciar'] },
      },
    },
    {
      name: 'Com célula fixa',
      props: {
        rows,
        operations,
        groupBy: 'grupo',
        isAvailable: disponivel,
        isLocked: (row: Record<string, unknown>, op: string) =>
          row.id === 'acessos.perfis' && op === 'gerenciar',
        lockedReason: () => 'Para não perder o acesso, peça a outro administrador.',
        modelValue: { 'acessos.perfis': ['ver', 'gerenciar'] },
      },
    },
  ],
})
