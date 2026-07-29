import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-tag',
  summary: 'Tag de status com mapa de rótulo/severidade (padrão pt-BR embutido).',
  examples: [
    {
      name: 'Ativo',
      props: { value: 'ativo' },
    },
    {
      name: 'Pendente',
      props: { value: 'pendente' },
    },
    {
      name: 'Mapa customizado',
      props: {
        value: 'novo',
        map: {
          novo: { label: 'Novo', severity: 'info' },
          arquivado: { label: 'Arquivado', severity: 'secondary' },
        },
      },
    },
  ],
})
