import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-search',
  summary: 'Autocomplete de chave estrangeira com busca na API, filtro em cascata e CRUD inline.',
  examples: [
    {
      name: 'Config',
      props: {
        modelValue: null,
        endpoint: '/api/clientes',
        optionLabel: 'nome',
        placeholder: 'Buscar cliente...',
      },
    },
  ],
})
