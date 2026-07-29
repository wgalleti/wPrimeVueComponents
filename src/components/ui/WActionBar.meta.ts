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
        primary: '<button class="p-button p-component">Salvar</button>',
        secondary: '<button class="p-button p-component p-button-text">Cancelar</button>',
      },
    },
    {
      name: 'Alinhado à direita',
      props: { align: 'end' },
      slots: {
        primary: '<button class="p-button p-component">Novo registro</button>',
      },
    },
  ],
})
