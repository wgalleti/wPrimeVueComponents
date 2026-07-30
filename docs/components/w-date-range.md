# WDateRange

Seletor de intervalo de datas (período) — wrapper fino do DatePicker em modo range, com padrões pt-BR. O `v-model` guarda `[início, fim]` como `Date[]`.

## API

<ApiTable name="WDateRange" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'

const periodo = ref<Date[] | null>(null)
</script>

<template>
  <WDateRange v-model="periodo" placeholder="Selecione o período" />
</template>
```
