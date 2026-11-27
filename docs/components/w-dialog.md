# WDialog

`Dialog` do PrimeVue com a âncora resolvida pela navegação por abas. Dentro de uma aba
(telas renderizadas pelo [WTabViewport](/components/w-tab-nav)), o dialog pendura no
**pane da própria aba**: trocar de aba não fecha nada — ele some e volta com a aba —
e fechar a aba (ou trocar de tela dentro dela) descarta o dialog junto. Fora de abas,
cai no `body`, como o `Dialog` de sempre.

É **passthrough total**: todas as props, eventos (incluindo `v-model:visible`) e slots
do `Dialog` passam direto. Um `append-to` explícito do consumidor vence o default.
Sem `breakpoints` do consumidor, vale o padrão `{ '839px': '95vw', '599px': '100vw' }`
(tablet em pé quase tela cheia, celular tela cheia); com `breakpoints` próprio, vale o dele.
Use-o no lugar de importar `Dialog` do PrimeVue em app com navegação por abas.

## API

<ApiTable name="WDialog" />

## Diálogo na URL

Com `url-key`, `visible` espelha `?<url-key>=1`: abrir grava a chave, fechar remove, e a URL
com a chave (F5, link compartilhado) abre o diálogo. Exige `vue-router`; sem ele avisa em dev.

```vue
<WDialog v-model:visible="importando" url-key="importar" header="Importar" modal>...</WDialog>
```

- A URL **nunca abre nem fecha por baixo** do consumidor: ela só pede, pelo mesmo
  `update:visible` do clique. Se a chave some com o diálogo aberto o `WDialog` pede
  `update:visible(false)`; se o consumidor recusar (formulário sujo, descarte cancelado) a chave volta.
- Valor da chave diferente de `1` é tratado como ausente e removido.
- `url-key` é lida na montagem (não troque em runtime). Sem ela, nada muda.
- Dentro de aba de rota oculta, a URL da aba ativa não é tocada; reconcilia na volta.
- Para diálogo por id ou chave que não é `1`, use [`useUrlParam`](/composables/use-url-param).
- Limites: a URL é trocada sem empilhar histórico (Voltar não fecha o diálogo); só o estado
  "aberto" volta no F5, não o que foi digitado; diálogo sobre estado não salvo não deve ir para a URL.
- Se a URL pede abrir e o consumidor nunca abre, a chave fica na URL até um fechamento.

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
