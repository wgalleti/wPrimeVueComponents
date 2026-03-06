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
Os composables `useCrudManager` e `useApi` lancam erro se nao encontrarem o axios injetado.
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
