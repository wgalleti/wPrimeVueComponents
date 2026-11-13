import { defineAsyncComponent, type App, type Component, type Plugin } from 'vue'
import type { WPluginOptions, WPluginConfig } from './types/plugin'
import { W_AXIOS_KEY, W_CONFIG_KEY, W_DATA_PROVIDER_KEY } from './types/plugin'
import { createAxiosDataProvider } from './data-providers/axiosDataProvider'
import { patchDialogEscapeStack } from './utils/dialogEscapeStack'
import { lookupCep } from './utils/cep'

export const WPrimeVuePlugin: Plugin = {
  install(app: App, options: WPluginOptions = {}) {
    // Sem provedor o plugin instala igual (vitrine, SSR): só os componentes de dados
    // (useApi, useCrudManager, WAutoCompleteFK) acusam a falta, na hora do uso.
    const dataProvider =
      options.dataProvider ?? (options.axios ? createAxiosDataProvider(options.axios) : undefined)

    const config: WPluginConfig = {
      axios: options.axios,
      dataProvider,
      defaultPageSize: options.defaultPageSize ?? 20,
      dateFormat: options.dateFormat ?? 'DD/MM/YYYY',
      dateTimeFormat: options.dateTimeFormat ?? 'DD/MM/YYYY HH:mm',
      locale: options.locale ?? 'pt-BR',
      currency: options.currency ?? 'BRL',
      keyboardNav: options.keyboardNav ?? false,
      cepLookup: options.cepLookup ?? lookupCep,
    }

    if (options.axios) {
      app.provide(W_AXIOS_KEY, options.axios)
    }
    if (dataProvider) {
      app.provide(W_DATA_PROVIDER_KEY, dataProvider)
    }
    app.provide(W_CONFIG_KEY, config)

    if (options.patchDialogEscape !== false) {
      patchDialogEscapeStack()
    }

    if (options.registerComponents !== false) {
      // Registro global por import() dinâmico: o app que só instala o plugin (vitrine) não leva
      // WCrudView, DataTable e cia. no pacote de entrada; o chunk vem na primeira renderização.
      const globais: Record<string, () => Promise<{ default: Component }>> = {
        WCrudView: () => import('./components/crud/WCrudView.vue'),
        WCrudFormDialog: () => import('./components/crud/WCrudFormDialog.vue'),
        WCrudColumnRenderer: () => import('./components/crud/WCrudColumnRenderer.vue'),
        WAutoCompleteFK: () => import('./components/form/WAutoCompleteFK.vue'),
        WMoneyInput: () => import('./components/form/WMoneyInput.vue'),
        WTransferList: () => import('./components/form/WTransferList.vue'),
        WTreeSelect: () => import('./components/form/WTreeSelect.vue'),
      }
      for (const [nome, carregar] of Object.entries(globais)) {
        app.component(nome, defineAsyncComponent(carregar))
      }
    }
  },
}
