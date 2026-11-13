# Plugin

O `WPrimeVuePlugin` registra a instancia do axios e as configuracoes globais via `provide/inject`.

## Registro

```ts
import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { Authorization: `Bearer ${token}` },
})

app.use(WPrimeVuePlugin, {
  axios: api,
})
```

## O que o Plugin faz

1. **Injeta o axios** via `W_AXIOS_KEY` — usado por `useCrudManager`, `useApi` e `WAutoCompleteFK`
2. **Injeta a config** via `W_CONFIG_KEY` — usada por `useFormatters` e composables para defaults
3. **Registra componentes** globalmente (opcional) — `WCrudView`, `WCrudFormDialog`, `WCrudColumnRenderer`, `WAutoCompleteFK`

## Usando sem Plugin

Se preferir nao usar o plugin, injete o axios manualmente:

```ts
import { W_AXIOS_KEY } from '@wgalleti/primevue-components'

app.provide(W_AXIOS_KEY, api)
```

::: warning Importante
`useCrudManager`, `useApi` e `WAutoCompleteFK` lancam erro se nao encontrarem o provedor de dados injetado.
:::

## Multiplas instancias de axios

Se diferentes partes do app usam APIs diferentes, voce pode usar `provide` em sub-arvores:

```vue
<script setup>
import { provide } from 'vue'
import axios from 'axios'
import { W_AXIOS_KEY } from '@wgalleti/primevue-components'

const otherApi = axios.create({ baseURL: 'http://other-api.com' })
provide(W_AXIOS_KEY, otherApi)
</script>

<template>
  <!-- Componentes aqui usarao otherApi -->
  <WCrudView :crud="crud" title="Dados Externos" />
</template>
```

## Sem provedor de dados (vitrine)

`axios` e `dataProvider` são opcionais: um app que só usa componentes de apresentação
(botão, diálogo, aviso, campo de data/moeda, menu…) registra o plugin sem eles. Só quem
busca dados acusa a falta, na hora do uso: `useApi`, `useCrudManager` e `WAutoCompleteFK`
lançam `dataProvider não encontrado. Registre o WPrimeVuePlugin com "axios" ou "dataProvider"…`.

```ts
app.use(WPrimeVuePlugin) // sem CRUD: nada de axios
```

## Nuxt / SSR

A suíte renderiza no servidor (Nuxt 4) sem tocar `window`: o primeiro render do cliente é
igual ao do servidor e o que depende da janela (faixa do `useBreakpoint`, modo
tabela/cards guardado do `WCrudView`) só é lido no `onMounted`. Registre tudo num plugin do
Nuxt, na mesma ordem do `main.ts`:

```ts
// plugins/primevue.ts
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import '@wgalleti/primevue-components/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { /* tema/pt do app */ })
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.use(ConfirmationService)
  nuxtApp.vueApp.use(WPrimeVuePlugin) // com { axios } ou { dataProvider } se houver CRUD
})
```

```ts
// nuxt.config.ts — se o build do servidor reclamar de import de CSS/ESM do pacote
export default defineNuxtConfig({
  build: { transpile: ['@wgalleti/primevue-components'] },
})
```

- **Antes da montagem**, `useBreakpoint` responde o layout de mesa (`isPaisagem` e
  `isDesktop` `true`, o resto `false`); a faixa real chega no `onMounted`.
- **Só no cliente** (envolva em `<ClientOnly>`): `WChart`, `WMapSelect`, `WImageCropper`,
  `WMarkdownView`/`WMarkdownEditor` (o DOMPurify precisa do DOM) e a navegação por abas (`useRouteTabs`, `WTabNav`, `WTabViewport`) —
  `useRouteTabs` guarda estado do usuário num singleton de módulo, que no servidor seria
  compartilhado entre requisições.
- Testado por `tests/ssr.test.ts` (`renderToString` sem `window`, plugin sem provedor).
