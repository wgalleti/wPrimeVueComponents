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

## Variante `metric`

Uma linha por número: rótulo à esquerda (`--fg-muted`, peso normal), valor grande à direita
(`--text-xl`, bold, `tabular-nums`) e divisória de 1px entre as linhas. É o aside "Resumo" de um
documento. O `suffix` do campo vira a unidade, colada ao número.

```vue
<script setup lang="ts">
const resumo = [
  { label: 'Área atendida', value: 260, format: 'number', decimals: 0, suffix: 'ha' },
  { label: 'BAGs a tratar', value: 20, format: 'number', decimals: 0 },
  { label: 'Volume total', value: 14000, format: 'number', decimals: 0, suffix: 'kg' },
  { label: 'Calda total', value: 152, format: 'number', decimals: 1, suffix: 'L' },
]
</script>

<template>
  <WInfoCard title="Resumo da recomendação" variant="metric" :fields="resumo" />
</template>
```
