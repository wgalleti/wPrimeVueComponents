import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'wPrimeVue Components',
  description: 'Biblioteca de componentes Vue 3 + PrimeVue 4 para CRUDs e formulários',
  base: '/wPrimeVueComponents/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/wPrimeVueComponents/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guia', link: '/guide/getting-started' },
      { text: 'Componentes', link: '/components/wcrud-view' },
      { text: 'Composables', link: '/composables/use-crud-manager' },
      { text: 'CSS', link: '/css/classes' },
    ],

    sidebar: [
      {
        text: 'Introducao',
        items: [
          { text: 'O que e?', link: '/guide/what-is' },
          { text: 'Primeiros Passos', link: '/guide/getting-started' },
          { text: 'Plugin', link: '/guide/plugin' },
        ],
      },
      {
        text: 'Componentes',
        items: [
          { text: 'WCrudView', link: '/components/wcrud-view' },
          { text: 'WCrudFormDialog', link: '/components/wcrud-form-dialog' },
          { text: 'WCrudColumnRenderer', link: '/components/wcrud-column-renderer' },
          { text: 'WAutoCompleteFK', link: '/components/wauto-complete-fk' },
        ],
      },
      {
        text: 'Composables',
        items: [
          { text: 'useCrudManager', link: '/composables/use-crud-manager' },
          { text: 'useApi', link: '/composables/use-api' },
          { text: 'useAppToast', link: '/composables/use-app-toast' },
          { text: 'useAppConfirm', link: '/composables/use-app-confirm' },
          { text: 'useApiError', link: '/composables/use-api-error' },
          { text: 'useFormatters', link: '/composables/use-formatters' },
        ],
      },
      {
        text: 'Utilitarios',
        items: [
          { text: 'Field Mapper', link: '/utils/field-mapper' },
          { text: 'Datas', link: '/utils/dates' },
          { text: 'Mascaras', link: '/utils/masks' },
        ],
      },
      {
        text: 'Types',
        items: [
          { text: 'Referencia de Tipos', link: '/types/reference' },
        ],
      },
      {
        text: 'CSS',
        items: [
          { text: 'Classes CSS', link: '/css/classes' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wgalleti/wPrimeVueComponents' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Licenca MIT',
      copyright: '2024-present wGalleti',
    },

    outline: {
      level: [2, 3],
      label: 'Nesta pagina',
    },
  },
})
