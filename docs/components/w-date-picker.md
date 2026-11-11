# WDatePicker

Campo de data pt-BR padronizado: exibe `DD/MM/YYYY` (ou `DD/MM/YYYY HH:mm` com `showTime`)
e **salva `YYYY-MM-DD`**. A digitação direta é mascarada (`30051988` vira `30/05/1988`), o
ícone de calendário abre o seletor (Hoje / Limpar) e `F2` preenche a data de hoje.

Com `showTime` o seletor não fecha ao escolher o dia, porque ainda falta a hora. O rodapé
traz os atalhos **Agora** e **Limpar** à esquerda e um **OK** à direita, que confirma, fecha
e devolve o foco ao campo. O Limpar fica longe do OK para não apagar a data sem querer;
`Esc` fecha sem mudar nada.

Com `autonow`, no mount o campo preenche hoje se o valor estiver `null` — valor já existente
é preservado.

## API

<ApiTable name="WDatePicker" />

### Rótulo programático

`inputId` põe o `id` no `<input>` real (alvo do `<label for>`); `inputAttrs` entra no mesmo
input (`aria-labelledby`, `aria-describedby`, `aria-required`…) — nunca no wrapper. O
`WFormRenderer` já passa os dois.

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
