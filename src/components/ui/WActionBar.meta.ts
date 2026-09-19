import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Layout',
  icon: 'pi pi-bars',
  summary: 'Barra de ações com slots (primário, filtros, secundário) e alinhamento configurável.',
  examples: [
    {
      name: 'Entre extremos',
      props: { align: 'between' },
      slots: {
        primary: '<Button label="Salvar" icon="pi pi-check" />',
        secondary: '<Button label="Cancelar" text />',
      },
    },
    {
      name: 'Alinhado à direita',
      props: { align: 'end' },
      slots: {
        primary: '<Button label="Novo registro" icon="pi pi-plus" />',
      },
    },
  ],
})
