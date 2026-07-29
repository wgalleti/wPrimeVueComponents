import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Layout',
  icon: 'pi pi-minus',
  summary: 'Cabeçalho de seção com ícone, título, subtítulo e modo compacto.',
  examples: [
    {
      name: 'Padrão',
      props: {
        title: 'Informações gerais',
        subtitle: 'Dados principais do cadastro',
        icon: 'pi pi-info-circle',
      },
    },
    {
      name: 'Compacto',
      props: {
        title: 'Endereço',
        icon: 'pi pi-map-marker',
        compact: true,
      },
    },
  ],
})
