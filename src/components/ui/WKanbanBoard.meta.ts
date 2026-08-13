import { defineComponentMeta } from '@/types/componentMeta'

const items = (nomes: string[], offset = 0) =>
  nomes.map((nome, i) => ({ id: offset + i + 1, nome }))

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-objects-column',
  summary:
    'Board kanban controlado com DnD HTML5 nativo: arrastar emite `move` ({ item, from, to, index }) e o consumidor persiste e atualiza `columns` — o board não muta os arrays. Cada coluna aceita `accent` (token de cor) que tinge cabeçalho, realce de drop e linha de inserção. Mover programático (UI própria) também é responsabilidade do consumidor.',
  examples: [
    {
      name: 'Fluxo de projetos',
      props: {
        columns: [
          { value: 'backlog', label: 'Backlog', accent: 'var(--fg-subtle)', items: items(['Importar geometria', 'Novo relatório']) },
          { value: 'doing', label: 'Em andamento', accent: 'var(--info)', items: items(['Rastreio de sementes'], 10) },
          { value: 'review', label: 'Revisão', accent: 'var(--warning)', items: items(['Dashboard fertilizantes'], 20) },
          { value: 'done', label: 'Concluído', accent: 'var(--success)', items: items(['Login SSO', 'Auditoria'], 30) },
        ],
      },
    },
    {
      name: 'Coluna vazia + loading',
      props: {
        loading: true,
        columns: [
          { value: 'a', label: 'A fazer', items: items(['Tarefa 1']) },
          { value: 'b', label: 'Feito', items: [] },
        ],
      },
    },
  ],
})
