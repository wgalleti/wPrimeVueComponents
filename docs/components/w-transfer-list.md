# WTransferList

Seletor de dois painéis (disponíveis / selecionados) com busca. Os itens escolhidos ficam em `v-model:selected` (array de ids).

## API

<ApiTable name="WTransferList" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'

const permissoes = [
  { id: 1, nome: 'Leitura' },
  { id: 2, nome: 'Escrita' },
  { id: 3, nome: 'Exclusão' },
  { id: 4, nome: 'Administração' },
]
const selecionadas = ref([1, 2])
</script>

<template>
  <WTransferList :source="permissoes" v-model:selected="selecionadas" option-label="nome" />
</template>
```
