import type { App, Plugin } from 'vue'
import type { WPluginOptions, WPluginConfig } from './types/plugin'
import { W_AXIOS_KEY, W_CONFIG_KEY } from './types/plugin'
import { WCrudView, WCrudFormDialog, WCrudColumnRenderer, WAutoCompleteFK } from './components'

export const WPrimeVuePlugin: Plugin = {
  install(app: App, options: WPluginOptions) {
    if (!options?.axios) {
      throw new Error(
        '[wPrimeVueComponents] A opção "axios" é obrigatória. Passe sua instância axios configurada.',
      )
    }

    const config: WPluginConfig = {
      axios: options.axios,
      defaultPageSize: options.defaultPageSize ?? 20,
      dateFormat: options.dateFormat ?? 'DD/MM/YYYY',
      dateTimeFormat: options.dateTimeFormat ?? 'DD/MM/YYYY HH:mm',
      locale: options.locale ?? 'pt-BR',
      currency: options.currency ?? 'BRL',
    }

    app.provide(W_AXIOS_KEY, options.axios)
    app.provide(W_CONFIG_KEY, config)

    if (options.registerComponents !== false) {
      app.component('WCrudView', WCrudView)
      app.component('WCrudFormDialog', WCrudFormDialog)
      app.component('WCrudColumnRenderer', WCrudColumnRenderer)
      app.component('WAutoCompleteFK', WAutoCompleteFK)
    }
  },
}
