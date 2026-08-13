# WMarkdownToc

Índice "Nesta página" a partir dos títulos emitidos pelo [WMarkdownView](/components/w-markdown-view)
(evento `headings`). Agrupa os `###` sob cada `##` (recolhidos em acordeão), marca a seção em
leitura com IntersectionObserver, filtra por texto (`searchable`) e rola sem barra visível
dentro do `maxHeight`.

## API

<ApiTable name="WMarkdownToc" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WMarkdownView, WMarkdownToc } from '@wgalleti/primevue-components'
import type { MarkdownHeading } from '@wgalleti/primevue-components'

const headings = ref<MarkdownHeading[]>([])
</script>

<template>
  <div class="flex gap-4">
    <WMarkdownView class="flex-1" :source="documento" @headings="headings = $event" />
    <WMarkdownToc :headings="headings" searchable max-height="70vh" />
  </div>
</template>
```
