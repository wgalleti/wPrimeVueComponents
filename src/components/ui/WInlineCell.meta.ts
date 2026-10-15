import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-pencil',
  summary:
    'Célula editável no lugar: o valor é um botão que abre um popover com o editor; sem permissão vira texto.',
  examples: [
    { name: 'Editável', props: { label: 'Prazo de #3', editable: true } },
    { name: 'Somente leitura', props: { label: 'Prazo de #3', editable: false } },
  ],
})
