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

// Carbon & Terracotta preset — cold carbon slate surface + terracotta oxide accent
const carbonSurface = {
  0: '#ffffff',
  50: '#f8f9fa',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#272b35',
  800: '#1c2028',
  900: '#14171d',
  950: '#0b0d10',
}

const WorkHardPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#ea580c',
      600: '#c2410c',
      700: '#9a3412',
      800: '#7c2d12',
      900: '#431407',
      950: '#270a03',
    },
    colorScheme: {
      light: { surface: carbonSurface },
      dark: { surface: carbonSurface },
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
