# WDialog

`Dialog` do PrimeVue com a âncora resolvida pela navegação por abas. Dentro de uma aba
(telas renderizadas pelo [WTabViewport](/components/w-tab-nav)), o dialog pendura no
**pane da própria aba**: trocar de aba não fecha nada — ele some e volta com a aba —
e fechar a aba (ou trocar de tela dentro dela) descarta o dialog junto. Fora de abas,
cai no `body`, como o `Dialog` de sempre.

É **passthrough total**: todas as props, eventos (incluindo `v-model:visible`) e slots
do `Dialog` passam direto. Um `append-to` explícito do consumidor vence o default.
Use-o no lugar de importar `Dialog` do PrimeVue em app com navegação por abas.

## API

<ApiTable name="WDialog" />

## Exemplo

```vue
<script setup>
import { ref } from 'vue'
import { WDialog } from '@wgalleti/primevue-components'

const aberto = ref(false)
</script>

<template>
  <WDialog v-model:visible="aberto" header="Detalhes" modal :style="{ width: '480px' }">
    <p>Conteúdo — ancorado no pane da aba atual.</p>
  </WDialog>
</template>
```

> Os dialogs internos da suite (`WCrudView`, `WCrudFormDialog`, `WAutoCompleteFK`,
> `WImageCropper`) já se ancoram sozinhos pelo mesmo mecanismo (`useTabHost`).
