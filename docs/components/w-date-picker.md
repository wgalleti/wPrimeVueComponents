# WDatePicker

Campo de data pt-BR padronizado: exibe `DD/MM/YYYY` (ou `DD/MM/YYYY HH:mm` com `showTime`)
e **salva `YYYY-MM-DD`**. A digitação direta é mascarada (`30051988` vira `30/05/1988`), o
ícone de calendário abre o seletor (Hoje / Limpar) e `F2` preenche a data de hoje.

Com `showTime` o seletor não fecha ao escolher o dia, porque ainda falta a hora. O rodapé
traz os atalhos **Agora** e **Limpar** à esquerda e um **OK** à direita, que confirma, fecha
e devolve o foco ao campo. O Limpar fica longe do OK para não apagar a data sem querer;
`Esc` fecha sem mudar nada.

### Digitação

O valor só muda quando o texto forma uma data completa, válida e dentro de `minDate`/`maxDate`
(no meio da digitação o modelo segue com o valor anterior). Ao sair do campo:

- ano com 2 dígitos completa: `19/11/26` vira `19/11/2026` (acima de 68 vira 19xx);
- texto que não forma data, ou fora de `minDate`/`maxDate`, emite `null` e **fica à vista,
  marcado como inválido** — nunca volta em silêncio ao valor anterior.

Com `valueFormat="date"` (o padrão do `WFormRenderer`) o valor é um `Date`. Para comparar
duas datas num `validate`, normalize as duas (`dayjs(a).isBefore(b, 'day')`): `String(Date)`
começa pelo dia da semana e a comparação de texto fica alfabética.

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
