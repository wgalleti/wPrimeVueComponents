import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-list-check',
  summary: 'Renderiza um formulário em grid a partir de uma lista de FieldDef.',
  examples: [
    {
      name: 'Config',
      props: {
        fields: [
          { field: 'nome', label: 'Nome', type: 'text', required: true },
          { field: 'ativo', label: 'Ativo', type: 'boolean' },
        ],
        formData: { nome: '', ativo: true },
        isEditing: false,
        columns: 2,
      },
    },
  ],
})
