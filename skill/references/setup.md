# Setup — @wgalleti/primevue-components

Automatize com `npx @wgalleti/primevue-components init` (registra o plugin, importa o CSS, copia esta skill). Ou siga manualmente:

## 1. Dependências

Peers (o app precisa ter): `vue ^3.4`, `primevue ^4`, `axios ^1`, `dayjs ^1.11`.

```bash
yarn add @wgalleti/primevue-components@git+https://github.com/wgalleti/wPrimeVueComponents.git
```

Fixar versão: sufixo `#v0.8.1`.

## 2. main.ts

Ordem importa — o plugin da lib vai **por último**:

```ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import '@wgalleti/primevue-components/style.css'
import api from './plugins/axios' // sua instância axios (baseURL + auth já configurados)
import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue /*, { unstyled: true, ... } conforme seu tema */)
app.use(ToastService)
app.use(ConfirmationService)

app.use(WPrimeVuePlugin, {
  axios: api,               // cria um dataProvider Axios automaticamente
  defaultPageSize: 20,      // opcional
  dateFormat: 'DD/MM/YYYY',  // opcional
  dateTimeFormat: 'DD/MM/YYYY HH:mm', // opcional
  locale: 'pt-BR',          // opcional
  currency: 'BRL',          // opcional
})

app.mount('#app')
```

### Alternativa: Supabase (sem REST)

```ts
import { createSupabaseDataProvider, WPrimeVuePlugin } from '@wgalleti/primevue-components'
import { supabase } from './plugins/supabase'

const dataProvider = createSupabaseDataProvider({
  client: supabase,
  resources: {
    produtos: { table: 'produtos', searchFields: ['nome'], defaultOrdering: 'nome', softDelete: true },
  },
})
app.use(WPrimeVuePlugin, { dataProvider })
```

## 3. Contrato da API

- Lista paginada: `{ data: T[], page: number, page_size: number, rows: number }`.
- Erros DRF: `{ detail: string }`, `{ campo: [erros] }`, ou string.
- Datas: `DateField` recebe/retorna `YYYY-MM-DD`; `DateTimeField` aceita ISO-8601 (`2026-07-22T09:49:00`, com ou sem `Z`/offset).

## 4. Verificação

```ts
import { WCrudView, useCrudManager } from '@wgalleti/primevue-components'
```

Se os tipos e o CSS resolverem, está pronto.
