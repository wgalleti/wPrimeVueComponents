# WCheckList

Lista de verificações de um documento, com contador `N/M` (quantas passaram) no cabeçalho.
O componente só desenha o que recebe — quem avalia é o serviço no backend.

| `nivel` | Ícone | Cor |
|---|---|---|
| `ok` | `pi-check-circle` | `--success` |
| `warn` | `pi-exclamation-triangle` | `--warning` |
| `bad` | `pi-times-circle` | `--danger` |

## API

<ApiTable name="WCheckList" />

## Exemplo

```vue
<script setup lang="ts">
import { WCheckList } from '@wgalleti/primevue-components'
import type { CheckListItem } from '@wgalleti/primevue-components'

// Vem pronto da API (ex.: RecomendacaoService.verificar)
const verificacoes: CheckListItem[] = [
  { nivel: 'ok', label: 'Área distribuída bate com os talhões (260 ha)' },
  { nivel: 'warn', label: '1 lote(s) ainda sem cálculo' },
  { nivel: 'bad', label: 'Estoque insuficiente: CONGREGA' },
]
</script>

<template>
  <WCheckList title="Verificações" :items="verificacoes" />
</template>
```
