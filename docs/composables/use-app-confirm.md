# useAppConfirm

Wrapper sobre o `useConfirm()` do PrimeVue para dialogs de confirmacao padronizados.

## Import

```typescript
import { useAppConfirm } from '@wgalleti/primevue-components'
```

## Uso

```typescript
const confirm = useAppConfirm()

// Confirmacao de exclusao (estilo padrao)
confirm.confirmDelete(() => {
  await api.delete(`/api/v1/produtos/${id}/`)
})

// Confirmacao generica
confirm.confirmAction(
  'Deseja realmente aprovar este pedido?',
  () => aprovarPedido(id),
  'Confirmar Aprovacao',
)
```

## API

```typescript
interface AppConfirm {
  /**
   * Dialog de confirmacao de exclusao.
   * Icone de alerta, botao vermelho "Excluir".
   */
  confirmDelete(
    onAccept: () => void,
    message?: string,  // Default: 'Deseja realmente excluir este registro?'
  ): void

  /**
   * Dialog de confirmacao generico.
   */
  confirmAction(
    message: string,
    onAccept: () => void,
    header?: string,   // Default: 'Confirmacao'
  ): void
}
```

## Requisitos

O componente `<ConfirmDialog />` do PrimeVue deve estar no layout raiz:

```vue
<!-- App.vue -->
<template>
  <Toast />
  <ConfirmDialog />
  <router-view />
</template>
```

E o `ConfirmationService` deve estar registrado:

```typescript
// main.ts
import ConfirmationService from 'primevue/confirmationservice'
app.use(ConfirmationService)
```
