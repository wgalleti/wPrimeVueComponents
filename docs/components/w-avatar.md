# WAvatar

Avatar de pessoa: foto quando existe `src`; senão as iniciais (primeira letra da primeira e da última
palavra) sobre uma cor estável do nome, tirada da paleta `--w-viz-*`. Sem nome nem foto vira o ícone de
pessoa vazio, útil para "sem responsável". O nome é o texto alternativo (`aria-label`).

## API

<ApiTable name="WAvatar" />

## Exemplo

```vue
<script setup lang="ts">
import { WAvatar } from '@wgalleti/primevue-components'
</script>

<template>
  <WAvatar name="Maria da Silva" />
  <WAvatar name="Carlos" size="sm" />
  <WAvatar :name="null" />
</template>
```
