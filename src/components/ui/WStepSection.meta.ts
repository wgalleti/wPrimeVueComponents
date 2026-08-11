import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-bookmark',
  summary:
    'Uma etapa do WStepFlow: badge numerada, cabeçalho clicável (título, contagem, resumo) e corpo colapsável.',
  examples: [
    {
      name: 'Etapa com rodapé',
      description: 'Fora de um WStepFlow a etapa é um card colapsável avulso (estado local).',
      props: {
        step: 1,
        title: 'Contexto e base de cálculo',
        summary: 'Define a operação, a condição do solo e como cada lote será dimensionado',
      },
      slots: {
        default: '<p>Setor, operação, recomendante, data…</p>',
        footer: '<button>Continuar para as sementes</button>',
      },
    },
    {
      name: 'Com contagem',
      props: {
        step: 2,
        title: 'Sementes e lotes',
        count: 2,
        summary: '260 ha · 20 BAGs · 14.000 kg',
      },
      slots: { default: '<p>Tabela de lotes…</p>' },
    },
  ],
})
