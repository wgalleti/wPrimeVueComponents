import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Layout',
  icon: 'pi pi-arrow-left',
  summary: 'Cabeçalho de página de detalhe com voltar, ícone, título e tag de status.',
  examples: [
    {
      name: 'Detalhe',
      props: {
        title: 'Pedido #1042',
        subtitle: 'Realizado em 15/03/2024',
        icon: 'pi pi-shopping-bag',
      },
    },
    {
      name: 'Com status',
      props: {
        title: 'Contrato 2024-08',
        subtitle: 'Cliente: Maria Silva',
        icon: 'pi pi-file',
        status: 'ativo',
        statusMap: {
          ativo: { label: 'Ativo', severity: 'success' },
          encerrado: { label: 'Encerrado', severity: 'danger' },
        },
      },
    },
  ],
})
