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

## Altura das listas

Cada lista mostra até `14rem` (umas 7 linhas) e rola o resto — o contador do cabeçalho
mostra o total. Onde a lista é longa ou o sistema esconde a barra de rolagem (macOS), suba a
altura por instância com `list-height`, ou no `FieldDef` com `listHeight`:

```vue
<WTransferList :source="etiquetas" v-model:selected="escolhidas" list-height="24rem" />
```

```ts
{ field: 'flags', label: 'Etiquetas', type: 'transfer', options, listHeight: '24rem' }
```

O padrão do app inteiro é o token `--w-transfer-list-max-h`.
