# Plugin e Configuracao

## Registro do Plugin

O plugin deve ser registrado **após** PrimeVue, ToastService e ConfirmationService.

```typescript
// main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import api from './plugins/axios'

const app = createApp(App)

// PrimeVue primeiro
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)

// Depois o plugin da lib
app.use(WPrimeVuePlugin, {
  axios: api,
})
```

## Opcoes do Plugin

```typescript
interface WPluginOptions {
  /**
   * Instancia axios configurada do projeto.
   * A lib NAO cria axios proprio — usa este.
   * Obrigatorio.
   */
  axios: AxiosInstance

  /**
   * Tamanho padrao de paginas em listagens.
   * Default: 20
   */
  defaultPageSize?: number

  /**
   * Formato de data para exibicao.
   * Default: 'DD/MM/YYYY'
   */
  dateFormat?: string

  /**
   * Formato de data+hora para exibicao.
   * Default: 'DD/MM/YYYY HH:mm'
   */
  dateTimeFormat?: string

  /**
   * Locale para formatacao de numeros e moeda.
   * Default: 'pt-BR'
   */
  locale?: string

  /**
   * Moeda para formatacao de valores monetarios.
   * Default: 'BRL'
   */
  currency?: string
}
```

## Como Funciona

O plugin faz `app.provide()` das configuracoes, que sao acessadas internamente pelos composables via `inject()`:

```
WPrimeVuePlugin.install()
  ├── provide('w-axios', options.axios)
  ├── provide('w-config', { pageSize, dateFormat, ... })
  └── registra componentes globais (opcional)
```

Os composables da lib nunca importam axios diretamente — sempre usam:

```typescript
const axios = inject<AxiosInstance>('w-axios')
```

Isso garante que cada projeto controla sua propria configuracao de auth, headers, interceptors, base URL, etc.

## Registro Global de Componentes (opcional)

Por padrao o plugin registra os componentes globalmente. Para desabilitar:

```typescript
app.use(WPrimeVuePlugin, {
  axios: api,
  registerComponents: false, // import manual nos templates
})
```

Sem registro global, importe diretamente:

```vue
<script setup>
import { WCrudView } from '@wgalleti/primevue-components'
</script>
```
