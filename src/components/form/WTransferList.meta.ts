import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-arrow-right-arrow-left',
  summary: 'Seletor de dois painéis (disponíveis/selecionados) com busca, via v-model:selected.',
  examples: [
    {
      name: 'Permissões',
      props: {
        source: [
          { id: 1, nome: 'Leitura' },
          { id: 2, nome: 'Escrita' },
          { id: 3, nome: 'Exclusão' },
          { id: 4, nome: 'Administração' },
        ],
        selected: [1, 2],
      },
    },
    {
      name: 'Usuários',
      props: {
        source: [
          { id: 10, nome: 'Ana Souza' },
          { id: 11, nome: 'Bruno Lima' },
          { id: 12, nome: 'Carla Dias' },
        ],
        selected: [],
        optionLabel: 'nome',
      },
    },
  ],
})
