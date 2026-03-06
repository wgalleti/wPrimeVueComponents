import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import 'primeicons/primeicons.css'
import './assets/styles/main.css'

import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import { api } from './plugins/axios'
import { router } from './router'
import App from './App.vue'

// WorkHard preset — steel-blue navy palette
const navySurface = {
  0: '#ffffff',
  50: '#F5F5F4',
  100: '#EBEBEA',
  200: '#E0E1DD',
  300: '#C8C9C5',
  400: '#9A9B97',
  500: '#6B6C68',
  600: '#4A4B48',
  700: '#333432',
  800: '#1E1F1D',
  900: '#141514',
  950: '#0A0A09',
}

const WorkHardPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#E8ECF1',
      100: '#C8D1DC',
      200: '#A4B3C5',
      300: '#778DA9',
      400: '#5D7A99',
      500: '#415A77',
      600: '#364D67',
      700: '#2C3F55',
      800: '#243448',
      900: '#1B263B',
      950: '#111827',
    },
    colorScheme: {
      light: { surface: navySurface },
      dark: { surface: navySurface },
    },
  },
})

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: WorkHardPreset,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
  locale: {
    accept: 'Sim',
    reject: 'Não',
    choose: 'Escolher',
    upload: 'Enviar',
    cancel: 'Cancelar',
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ],
    monthNamesShort: [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
    ],
    today: 'Hoje',
    weekHeader: 'Sem',
    firstDayOfWeek: 0,
    dateFormat: 'dd/mm/yy',
    weak: 'Fraca',
    medium: 'Média',
    strong: 'Forte',
    passwordPrompt: 'Digite uma senha',
    emptyFilterMessage: 'Nenhum resultado encontrado',
    emptyMessage: 'Nenhuma opção disponível',
    emptySearchMessage: 'Nenhum resultado encontrado',
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
