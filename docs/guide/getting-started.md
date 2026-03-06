# Primeiros Passos

## Instalacao

```bash
# npm
npm install @wgalleti/primevue-components

# yarn
yarn add @wgalleti/primevue-components
```

### Peer Dependencies

Certifique-se de ter as dependencias instaladas:

```bash
npm install vue primevue axios dayjs
```

## Configuracao

### 1. Registre o Plugin

No seu `main.ts`:

```ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import axios from 'axios'
import App from './App.vue'

// Instancia do axios configurada
const api = axios.create({
  baseURL: 'http://localhost:8000',
})

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)

app.use(WPrimeVuePlugin, {
  axios: api,
  defaultPageSize: 20,
  locale: 'pt-BR',
  currency: 'BRL',
  dateFormat: 'DD/MM/YYYY',
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
})

app.mount('#app')
```

### 2. Importe o CSS

```ts
// No main.ts ou no CSS do seu app
import '@wgalleti/primevue-components/style.css'
```

### 3. Use nos componentes

```vue
<script setup lang="ts">
import { useCrudManager, WCrudView } from '@wgalleti/primevue-components'

const crud = useCrudManager({
  endpoint: '/api/categorias/',
  columns: [
    { field: 'nome', header: 'Nome', sortable: true },
    { field: 'descricao', header: 'Descricao' },
  ],
  form: [
    { field: 'nome', label: 'Nome', required: true },
    { field: 'descricao', label: 'Descricao', type: 'textarea' },
  ],
})
</script>

<template>
  <WCrudView :crud="crud" title="Categorias" />
</template>
```

## Opcoes do Plugin

| Opcao | Tipo | Padrao | Descricao |
|-------|------|--------|-----------|
| `axios` | `AxiosInstance` | **obrigatorio** | Instancia do axios configurada |
| `defaultPageSize` | `number` | `20` | Quantidade de registros por pagina |
| `locale` | `string` | `'pt-BR'` | Locale para formatacao de numeros |
| `currency` | `string` | `'BRL'` | Moeda para formatacao |
| `dateFormat` | `string` | `'DD/MM/YYYY'` | Formato de data |
| `dateTimeFormat` | `string` | `'DD/MM/YYYY HH:mm'` | Formato de data/hora |
| `registerComponents` | `boolean` | `true` | Registra componentes globalmente |

## Proximo Passo

Veja o [WCrudView](/components/wcrud-view) para entender todas as opcoes do componente principal.
