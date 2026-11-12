# WPopover

`Popover` do PrimeVue com a âncora resolvida pela navegação por abas — **o mesmo motivo do
[WDialog](/components/w-dialog)**: dentro de uma aba (telas do
[WTabViewport](/components/w-tab-nav)), o overlay pendura no **pane da própria aba**. Trocar de
aba esconde o popover junto com a aba (em vez de deixá-lo flutuando sobre a tela vizinha), e
fechar a aba descarta o popover. Fora de abas, cai no `body`, como o `Popover` de sempre.

O PrimeVue posiciona o overlay em coordenadas do documento e o pane é um contêiner
posicionado; o `WPopover` grava o deslocamento do pane antes de abrir e o CSS da suíte o
devolve — o popover aparece colado no gatilho, como no `body`.

É **passthrough**: props, eventos e slots do `Popover` passam direto; um `append-to`
explícito vence o default. Abre por ref: `toggle(event)`, `show(event, target?)`, `hide()`.

## API

<ApiTable name="WPopover" />

## Exemplo

```vue
<script setup>
import { ref } from 'vue'
import { WButton, WPopover } from '@wgalleti/primevue-components'

const pop = ref()
</script>

<template>
  <WButton variant="ghost" icon="pi pi-info-circle" icon-only aria-label="Detalhes" @click="pop.toggle($event)" />
  <WPopover ref="pop">
    <p>Conteúdo — ancorado no pane da aba atual.</p>
  </WPopover>
</template>
```

> Os popovers internos da suíte (`WCrudView`, `WDatePicker`, `WInlineCell`) já usam o `WPopover`.
