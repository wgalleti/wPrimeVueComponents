import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Layout',
  icon: 'pi pi-window-maximize',
  summary: 'Cabeçalho de página com título, subtítulo e ação principal opcional.',
  examples: [
    {
      name: 'Simples',
      props: {
        title: 'Clientes',
        subtitle: 'Gerencie os clientes cadastrados',
      },
    },
    {
      name: 'Com ação',
      props: {
        title: 'Produtos',
        subtitle: 'Catálogo de produtos',
        actionLabel: 'Novo produto',
        actionIcon: 'pi pi-plus',
      },
    },
  ],
})
