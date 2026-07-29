import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-clone',
  summary: 'Seção de formulário com título, descrição e variantes visuais.',
  examples: [
    {
      name: 'Padrão',
      props: {
        title: 'Dados pessoais',
        description: 'Informações básicas do cadastro',
      },
    },
    {
      name: 'Contornada',
      props: {
        title: 'Endereço',
        description: 'Local de entrega e cobrança',
        variant: 'outlined',
      },
    },
    {
      name: 'Suave',
      props: {
        title: 'Observações',
        variant: 'muted',
      },
    },
  ],
})
