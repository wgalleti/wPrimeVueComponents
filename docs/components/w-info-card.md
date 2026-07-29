# WInfoCard

Card de exibição de campos rótulo/valor com formatação embutida (moeda, data, número).

## API

<ApiTable name="WInfoCard" />

## Exemplo

```vue
<script setup lang="ts">
const fields = [
  { label: 'Saldo', value: 4235.9, format: 'currency' },
  { label: 'Pedidos', value: 42, format: 'number' },
  { label: 'Última compra', value: '2024-07-01', format: 'date' },
]
</script>

<template>
  <WInfoCard title="Financeiro" :fields="fields" />
</template>
```
