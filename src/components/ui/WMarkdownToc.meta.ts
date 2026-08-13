import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-list',
  summary:
    'Índice "Nesta página" a partir dos títulos emitidos pelo WMarkdownView (evento `headings`). Agrupa os `###` sob cada `##` (recolhidos), marca a seção em leitura com IntersectionObserver, filtra por texto (`searchable`) e rola sem barra visível dentro do `maxHeight`.',
  examples: [
    {
      name: 'Índice com busca',
      props: {
        searchable: true,
        headings: [
          { id: 'objetivo', text: 'Objetivo', level: 2 },
          { id: 'como-funciona', text: 'Como funciona', level: 2 },
          { id: 'regra-de-saldo', text: 'Regra de saldo', level: 3 },
          { id: 'reabertura', text: 'Reabertura da nota', level: 3 },
          { id: 'riscos', text: 'Riscos', level: 2 },
        ],
      },
    },
  ],
})
