# WDatePicker

Campo de data pt-BR padronizado: exibe `DD/MM/YYYY` (ou `DD/MM/YYYY HH:mm` com `showTime`)
e **salva `YYYY-MM-DD`**. A digitação direta é mascarada (`30051988` vira `30/05/1988`), o
ícone de calendário abre o seletor (Hoje / Limpar) e `F2` preenche a data de hoje.

Com `autonow`, no mount o campo preenche hoje se o valor estiver `null` — valor já existente
é preservado.

## API

<ApiTable name="WDatePicker" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WDatePicker } from '@wgalleti/primevue-components'

const emissao = ref<string | null>(null) // '2026-08-13'
const registro = ref<string | null>(null)
</script>

<template>
  <WDatePicker v-model="emissao" placeholder="Data de emissão" />

  <!-- preenche hoje ao abrir o formulário -->
  <WDatePicker v-model="registro" autonow show-time />
</template>
```

Para intervalo (de/até) use o [WDateRange](/components/w-date-range).
