# WMoneyInput

Input numérico com máscara de moeda/decimal (preenchido da direita, estilo caixa registradora). O `v-model` guarda o valor real como `number`.

## API

<ApiTable name="WMoneyInput" />

### Rótulo programático

`inputId` põe o `id` no `<input>` real (alvo do `<label for>`); `inputAttrs` entra no mesmo
input (`aria-labelledby`, `aria-describedby`, `aria-required`…) — nunca no wrapper. O
`WFormRenderer` já passa os dois.

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

## Limites — `min` / `max`

Piso e teto inclusivos, também no modo percentual. O valor é ajustado **ao sair do campo**, não
a cada dígito (digitar `150` a caminho de `15,00` passaria pelo teto). No FieldDef
(`type: 'currency'` com `fillFromRight`), `min`/`max` do campo chegam aqui.

```vue
<WMoneyInput v-model="comissao" suffix="%" :decimals="2" :min="0" :max="100" />
```
