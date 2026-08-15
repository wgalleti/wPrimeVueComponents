import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'CRUD',
  icon: 'pi pi-list-check',
  summary:
    'CRUD de coleção-filha em rascunho: a experiência do WCrudView (form dialog, ação de linha, confirmação) sobre estado local, com os totais da WEditableTable.',
  examples: [
    {
      name: 'Config',
      description:
        'O `crud` vem do useSubviewCrud, que grava num array em memória — para editor de documento, em que os filhos só vão ao servidor quando o documento é salvo.',
      props: {
        title: 'Insumos do lote',
        addLabel: 'Novo insumo',
        dialogWidth: '520px',
      },
    },
  ],
})
