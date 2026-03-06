import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import 'primeicons/primeicons.css'

import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import { api } from './plugins/axios'
import { router } from './router'
import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(ToastService)
app.use(ConfirmationService)
app.directive('tooltip', Tooltip)

app.use(WPrimeVuePlugin, {
  axios: api,
  defaultPageSize: 10,
})

app.use(router)
app.mount('#app')
