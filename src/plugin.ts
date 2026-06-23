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
} from './components'
import { createAxiosDataProvider } from './data-providers/axiosDataProvider'

export const WPrimeVuePlugin: Plugin = {
  install(app: App, options: WPluginOptions) {
    if (!options?.axios && !options?.dataProvider) {
      throw new Error(
        '[wPrimeVueComponents] Informe "axios" ou "dataProvider" ao registrar o WPrimeVuePlugin.',
      )
    }

    const dataProvider =
      options.dataProvider ?? createAxiosDataProvider(options.axios!)

    const config: WPluginConfig = {
      axios: options.axios,
      dataProvider,
      defaultPageSize: options.defaultPageSize ?? 20,
      dateFormat: options.dateFormat ?? 'DD/MM/YYYY',
      dateTimeFormat: options.dateTimeFormat ?? 'DD/MM/YYYY HH:mm',
      locale: options.locale ?? 'pt-BR',
      currency: options.currency ?? 'BRL',
    }

    if (options.axios) {
      app.provide(W_AXIOS_KEY, options.axios)
    }
    app.provide(W_DATA_PROVIDER_KEY, dataProvider)
    app.provide(W_CONFIG_KEY, config)

    if (options.registerComponents !== false) {
      app.component('WCrudView', WCrudView)
      app.component('WCrudFormDialog', WCrudFormDialog)
      app.component('WCrudColumnRenderer', WCrudColumnRenderer)
      app.component('WAutoCompleteFK', WAutoCompleteFK)
      app.component('WMoneyInput', WMoneyInput)
      app.component('WTransferList', WTransferList)
    }
  },
}
