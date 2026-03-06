# useAppToast

Wrapper sobre o `useToast()` do PrimeVue com defaults para notificacoes padronizadas.

## Import

```typescript
import { useAppToast } from '@wgalleti/primevue-components'
```

## Uso

```typescript
const toast = useAppToast()

toast.success('Registro salvo com sucesso')
toast.error('Erro ao salvar registro')
toast.warn('Atencao: campos obrigatorios')
toast.info('Operacao em andamento')
```

## API

```typescript
interface AppToast {
  success(message: string, title?: string): void  // 3s auto-close
  error(message: string, title?: string): void    // 5s auto-close
  warn(message: string, title?: string): void     // 4s auto-close
  info(message: string, title?: string): void     // 3s auto-close
}
```

## Requisitos

O componente `<Toast />` do PrimeVue deve estar no layout raiz da aplicacao:

```vue
<!-- App.vue ou layout principal -->
<template>
  <Toast />
  <router-view />
</template>
```

E o `ToastService` deve estar registrado:

```typescript
// main.ts
import ToastService from 'primevue/toastservice'
app.use(ToastService)
```
