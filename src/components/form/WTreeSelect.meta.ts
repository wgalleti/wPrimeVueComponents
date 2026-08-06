import { defineComponentMeta } from '@/types/componentMeta'

const telas = [
  { id: 1, nome: 'Lotes de semente', modulo: 'Sementes' },
  { id: 2, nome: 'Análises de qualidade', modulo: 'Sementes' },
  { id: 3, nome: 'Rastreio de lotes', modulo: 'Sementes' },
  { id: 4, nome: 'Notas fiscais', modulo: 'Estoque' },
  { id: 5, nome: 'Transferências', modulo: 'Estoque' },
  { id: 6, nome: 'Saldos por local', modulo: 'Estoque' },
  { id: 7, nome: 'Fornecedores', modulo: 'Cadastros' },
  { id: 8, nome: 'Produtos', modulo: 'Cadastros' },
  { id: 9, nome: 'Unidades', modulo: 'Cadastros' },
]

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-sitemap',
  summary:
    'Árvore com checkbox alimentada por lista plana + campo de agrupamento. v-model = array de ids de folha.',
  examples: [
    {
      name: 'Telas por módulo',
      description:
        'Marque o módulo inteiro ou abra e escolha tela a tela. Só ids de folha entram no v-model.',
      props: {
        options: telas,
        groupBy: 'modulo',
        modelValue: [1, 2, 7],
        filter: true,
        filterPlaceholder: 'Buscar tela...',
        ariaLabel: 'Telas liberadas',
      },
    },
    {
      name: 'Com filtro ativo',
      description:
        'O estado dos grupos continua correto com o filtro escondendo parte das folhas — é o motivo de o componente existir.',
      props: {
        options: telas,
        groupBy: 'modulo',
        groupLabel: (chave: string) => chave.toUpperCase(),
        modelValue: [4],
        filter: true,
        defaultExpanded: true,
      },
    },
    {
      name: 'Lista rasa',
      description: 'Sem groupBy a árvore vira uma lista de checkboxes.',
      props: {
        options: telas,
        modelValue: [],
        showToggleAll: false,
      },
    },
    {
      name: 'Vazio',
      props: {
        options: [],
        emptyMessage: 'Nenhuma tela cadastrada',
      },
    },
  ],
})
