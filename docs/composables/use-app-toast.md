# useAppToast

Wrapper simplificado do `useToast` do PrimeVue com metodos pre-configurados.

## Uso

```ts
import { useAppToast } from '@wgalleti/primevue-components'

const toast = useAppToast()

toast.success('Registro salvo com sucesso')
toast.error('Erro ao conectar com a API')
toast.warn('Este registro sera excluido permanentemente')
toast.info('Nova versao disponivel')
```

## Metodos

| Metodo | Severidade | Duracao | Titulo Padrao |
|--------|-----------|---------|---------------|
| `success(message, title?)` | `success` | 3s | `'Sucesso'` |
| `error(message, title?)` | `error` | 5s | `'Erro'` |
| `warn(message, title?)` | `warn` | 4s | `'Atencao'` |
| `info(message, title?)` | `info` | 3s | `'Info'` |

## Pre-requisito

O componente `<Toast />` do PrimeVue deve estar no seu `App.vue`:

```vue
<template>
  <Toast />
  <router-view />
</template>
```

E o `ToastService` deve estar registrado:

```ts
import ToastService from 'primevue/toastservice'
app.use(ToastService)
```
