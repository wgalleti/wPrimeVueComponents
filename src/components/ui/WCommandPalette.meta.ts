import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-search',
  summary:
    'Paleta de comandos (Ctrl/⌘+K): busca sem acento sobre uma lista que o app entrega já filtrada por permissão; recentes primeiro.',
  examples: [
    {
      name: 'Aberta',
      props: {
        visible: true,
        shortcut: false,
        recent: ['imoveis'],
        items: [
          { id: 'imoveis', label: 'Imóveis', group: 'Cadastros', icon: 'pi pi-home' },
          { id: 'leads', label: 'Leads', group: 'Funil', icon: 'pi pi-users' },
          {
            id: 'conta',
            label: 'Minha conta',
            group: 'Conta',
            icon: 'pi pi-user',
            hint: 'Perfil',
          },
        ],
      },
    },
  ],
})
