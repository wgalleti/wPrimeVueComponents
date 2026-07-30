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
      { text: 'Componentes', link: '/components/w-crud-view' },
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
          {
            text: 'CRUD',
            items: [
              { text: 'WCrudView', link: '/components/w-crud-view' },
              { text: 'WCrudFormDialog', link: '/components/w-crud-form-dialog' },
              { text: 'WCrudColumnRenderer', link: '/components/w-crud-column-renderer' },
            ],
          },
          {
            text: 'Formulário',
            items: [
              { text: 'WAutoCompleteFK', link: '/components/w-auto-complete-fk' },
              { text: 'WFormRenderer', link: '/components/w-form-renderer' },
              { text: 'WFormSection', link: '/components/w-form-section' },
              { text: 'WImageCropper', link: '/components/w-image-cropper' },
              { text: 'WDateRange', link: '/components/w-date-range' },
              { text: 'WFileUpload', link: '/components/w-file-upload' },
              { text: 'WMoneyInput', link: '/components/w-money-input' },
              { text: 'WTransferList', link: '/components/w-transfer-list' },
            ],
          },
          {
            text: 'Layout',
            items: [
              { text: 'WActionBar', link: '/components/w-action-bar' },
              { text: 'WPageHeader', link: '/components/w-page-header' },
              { text: 'WSectionHeader', link: '/components/w-section-header' },
              { text: 'WDetailHeader', link: '/components/w-detail-header' },
            ],
          },
          {
            text: 'UI',
            items: [
              { text: 'WEmptyState', link: '/components/w-empty-state' },
              { text: 'WInfoCard', link: '/components/w-info-card' },
              { text: 'WKpiCard', link: '/components/w-kpi-card' },
              { text: 'WKpiGrid', link: '/components/w-kpi-grid' },
              { text: 'WProgressFlow', link: '/components/w-progress-flow' },
              { text: 'WStatusTag', link: '/components/w-status-tag' },
            ],
          },
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
