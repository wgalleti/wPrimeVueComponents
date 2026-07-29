import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-th-large',
  summary: 'Grid responsivo de KPIs com número de colunas fixo (2–6) ou automático.',
  examples: [
    {
      name: 'Dashboard',
      props: {
        columns: 4,
        items: [
          { icon: 'pi pi-users', label: 'Clientes', value: 1280, severity: 'primary' },
          { icon: 'pi pi-dollar', label: 'Receita', value: 'R$ 42,5k', severity: 'success' },
          { icon: 'pi pi-shopping-cart', label: 'Pedidos', value: 342, severity: 'info' },
          {
            icon: 'pi pi-exclamation-triangle',
            label: 'Pendências',
            value: 7,
            severity: 'warning',
          },
        ],
      },
    },
    {
      name: 'Compacto (auto)',
      props: {
        columns: 'auto',
        dense: true,
        items: [
          { icon: 'pi pi-box', label: 'Estoque', value: 512 },
          { icon: 'pi pi-truck', label: 'Entregas', value: 89 },
          { icon: 'pi pi-star', label: 'Avaliação', value: '4,8' },
        ],
      },
    },
    {
      name: '3 colunas',
      props: {
        columns: 3,
        items: [
          { icon: 'pi pi-check-circle', label: 'Concluídos', value: 128, severity: 'success' },
          { icon: 'pi pi-clock', label: 'Em andamento', value: 34, severity: 'info' },
          { icon: 'pi pi-times-circle', label: 'Cancelados', value: 9, severity: 'danger' },
        ],
      },
    },
  ],
})
