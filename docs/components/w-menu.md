# WMenu

Menu de ações sobre `Menu` (popup) ou `ContextMenu` do PrimeVue, ancorado na navegação por
abas pelo **mesmo motivo do [WDialog](/components/w-dialog)**: dentro de uma aba pendura no
pane dela (some com a aba, morre com ela); fora de abas, `body`. A posição continua colada no
botão ou no ponteiro — o deslocamento do pane é compensado como no
[WPopover](/components/w-popover).

- `items`: `MenuItem[]` do PrimeVue (`label`, `icon`, `command`, `separator`, `items`…).
- `mode`: `popup` (padrão) abre no botão com `toggle(event)`; `context` abre no ponteiro com
  `show(event)` (clique direito).
- `hide()` fecha. Props, eventos e slots do PrimeVue passam direto; `append-to` explícito vence.

## API

<ApiTable name="WMenu" />

## Exemplo

```vue
<script setup>
import { ref } from 'vue'
import { WButton, WMenu } from '@wgalleti/primevue-components'

const menu = ref()
const itens = [
  { label: 'Duplicar', icon: 'pi pi-copy', command: duplicar },
  { separator: true },
  { label: 'Arquivar', icon: 'pi pi-inbox', command: arquivar },
]
</script>

<template>
  <WButton variant="ghost" icon="pi pi-ellipsis-v" icon-only aria-label="Mais ações" @click="menu.toggle($event)" />
  <WMenu ref="menu" :items="itens" />

  <div @contextmenu.prevent="ctx.show($event)">clique direito aqui</div>
  <WMenu ref="ctx" mode="context" :items="itens" />
</template>
```

> O menu de contexto do `WCrudView` e o da barra de abas (`WTabNav`) usam o `WMenu`.
