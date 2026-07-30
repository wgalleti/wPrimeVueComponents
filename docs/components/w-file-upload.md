# WFileUpload

Upload de arquivo(s) genérico (single ou multiple), sem dependência pesada. O `v-model` guarda `File` (single) ou `File[]` (multiple); valida o tamanho por arquivo e emite `error` para os que excederem.

## API

<ApiTable name="WFileUpload" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'

const anexos = ref<File[] | null>(null)
</script>

<template>
  <WFileUpload
    v-model="anexos"
    multiple
    accept="image/*,application/pdf"
    :max-size="5 * 1024 * 1024"
    @error="(msg) => console.warn(msg)"
  />
</template>
```
