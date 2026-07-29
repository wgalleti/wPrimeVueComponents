import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'CRUD',
  icon: 'pi pi-window-maximize',
  summary: 'Dialog de formulário para criar/editar registros de um CRUD.',
  examples: [
    {
      name: 'Config',
      props: {
        visible: true,
        title: 'Novo cliente',
        fields: [
          { field: 'nome', label: 'Nome', type: 'text', required: true },
          { field: 'email', label: 'E-mail', type: 'text' },
        ],
        formData: { nome: '', email: '' },
        isEditing: false,
        saving: false,
      },
    },
  ],
})
