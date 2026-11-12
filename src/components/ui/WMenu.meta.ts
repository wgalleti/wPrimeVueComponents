import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-ellipsis-v',
  summary:
    'Menu de ações (popup no botão ou context no ponteiro) sobre Menu/ContextMenu do PrimeVue, ancorado na navegação por abas como o WDialog. Recebe `items: MenuItem[]`; abre por ref com toggle(event)/show(event)/hide().',
  examples: [
    {
      name: 'Popup',
      description: 'Abre por ref: `menu.value.toggle($event)` no clique do botão de ações.',
      props: {
        mode: 'popup',
        items: [
          { label: 'Duplicar', icon: 'pi pi-copy' },
          { label: 'Arquivar', icon: 'pi pi-inbox' },
        ],
      },
    },
  ],
})
