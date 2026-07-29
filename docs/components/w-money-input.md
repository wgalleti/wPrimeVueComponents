# WMoneyInput

Input numérico com máscara de moeda/decimal (preenchido da direita, estilo caixa registradora). O `v-model` guarda o valor real como `number`.

## API

<ApiTable name="WMoneyInput" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'

const valor = ref<number | null>(1234.56)
const percentual = ref(15)
</script>

<template>
  <!-- moeda (R$) -->
  <WMoneyInput v-model="valor" currency />

  <!-- percentual com 1 casa -->
  <WMoneyInput v-model="percentual" suffix="%" :decimals="1" />
</template>
```
