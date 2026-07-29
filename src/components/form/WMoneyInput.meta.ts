import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-dollar',
  summary: 'Input numérico com máscara de moeda/decimal e valor real (number) no v-model.',
  examples: [
    {
      name: 'Moeda (R$)',
      props: { modelValue: 1234.56, currency: true },
    },
    {
      name: 'Percentual',
      props: { modelValue: 15, suffix: '%', decimals: 1 },
    },
    {
      name: 'Vazio',
      props: { modelValue: null, currency: true, placeholder: 'Informe o valor' },
    },
  ],
})
