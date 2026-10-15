# WInlineCell

Célula editável no lugar, para listas densas: o valor aparece como botão e, ao clicar, abre um popover
com o editor. Sem `editable` vira texto puro (sem foco nem cursor), o que casa com "sem permissão".

O componente **não grava nada**: o editor (slot `editor`, com `close` no escopo) decide quando fechar e
o app faz a chamada à API. `label` é o nome acessível do botão — use algo que diga o que e de quem:
"Prazo de #3". `value-text` (o valor em texto, ex.: "Alta") entra no nome acessível do botão para o leitor de tela ouvir "Prazo de #3: Alta". Ao abrir, o foco vai para o primeiro controle do editor; ao fechar, volta para o botão.

## API

<ApiTable name="WInlineCell" />

## Exemplo

```vue
<script setup lang="ts">
import { WAvatar, WInlineCell } from '@wgalleti/primevue-components'
</script>

<template>
  <WInlineCell label="Responsável de #3" :editable="podeAlterar">
    <WAvatar :name="tarefa.responsavel?.nome" size="sm" />
    <template #editor="{ close }">
      <MeuSeletor @escolher="(v) => { salvar(v); close() }" />
    </template>
  </WInlineCell>
</template>
```
