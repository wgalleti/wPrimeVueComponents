# WMarkdownEditor

Editor de markdown com toolbar (negrito, itálico, H2, listas, link, código, destaque, passos,
tabela, marcação), cola rápida da sintaxe no botão "?" e preview via
[WMarkdownView](/components/w-markdown-view) — em abas (`previewMode: 'tab'`, padrão) ou
lado a lado (`'split'`).

Com `maxHeight` o editor vira moldura fixa e os painéis rolam por dentro — útil em formulários,
onde um documento longo empurraria as ações para fora da tela.

## API

<ApiTable name="WMarkdownEditor" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WMarkdownEditor } from '@wgalleti/primevue-components'

const texto = ref('## Anotações\n\nEscreva em **markdown**...')
</script>

<template>
  <WMarkdownEditor
    v-model="texto"
    preview-mode="split"
    max-height="420px"
    placeholder="Escreva em markdown..."
  />
</template>
```
