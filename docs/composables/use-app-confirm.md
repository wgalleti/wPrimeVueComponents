# useAppConfirm

Wrapper do `useConfirm` do PrimeVue com dialogs de confirmacao pre-configurados.

## Uso

```ts
import { useAppConfirm } from '@wgalleti/primevue-components'

const { confirmDelete, confirmAction } = useAppConfirm()

// Confirmacao de exclusao
confirmDelete(async () => {
  await api.delete(`/items/${id}/`)
})

// Confirmacao generica
confirmAction('Deseja realmente aprovar este pedido?', async () => {
  await api.post(`/pedidos/${id}/aprovar/`)
}, 'Aprovar Pedido')
```

## Metodos

### `confirmDelete(onAccept, message?)`

| Param | Tipo | Padrao |
|-------|------|--------|
| `onAccept` | `() => void` | **obrigatorio** |
| `message` | `string` | `'Deseja realmente excluir este registro?'` |

Exibe dialog com:
- Header: "Confirmar Exclusao"
- Icone: `pi pi-trash`
- Botao "Cancelar" (secondary, text)
- Botao "Excluir" (danger)

### `confirmAction(message, onAccept, header?)`

| Param | Tipo | Padrao |
|-------|------|--------|
| `message` | `string` | **obrigatorio** |
| `onAccept` | `() => void` | **obrigatorio** |
| `header` | `string` | `'Confirmacao'` |

## Pre-requisito

O componente `<ConfirmDialog />` deve estar no `App.vue`:

```vue
<template>
  <ConfirmDialog />
  <router-view />
</template>
```

E o `ConfirmationService`:

```ts
import ConfirmationService from 'primevue/confirmationservice'
app.use(ConfirmationService)
```

### `confirmDiscard(message?, header?)`

Promessa que resolve `true` para descartar a alteração não salva. Fechar o diálogo sem escolher
conta como "continuar editando" (`false`). É o que o `useCrudManager` usa para vetar o fechamento
da aba de rota com o formulário alterado.

```ts
host?.registerCloseGuard(() => !sujo.value || confirmDiscard())
```
