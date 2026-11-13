import type { App, Plugin } from 'vue'
import type { WPluginOptions, WPluginConfig } from './types/plugin'
import { W_AXIOS_KEY, W_CONFIG_KEY, W_DATA_PROVIDER_KEY } from './types/plugin'
import {
  WCrudView,
  WCrudFormDialog,
  WCrudColumnRenderer,
  WAutoCompleteFK,
  WMoneyInput,
  WTransferList,
  WTreeSelect,
} from './components'
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
      app.component('WCrudView', WCrudView)
      app.component('WCrudFormDialog', WCrudFormDialog)
      app.component('WCrudColumnRenderer', WCrudColumnRenderer)
      app.component('WAutoCompleteFK', WAutoCompleteFK)
      app.component('WMoneyInput', WMoneyInput)
      app.component('WTransferList', WTransferList)
      app.component('WTreeSelect', WTreeSelect)
    }
  },
}
