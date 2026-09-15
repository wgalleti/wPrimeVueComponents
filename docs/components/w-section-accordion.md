# WSectionAccordion / WSectionPanel

As seções de um editor master-detail (cabeçalho do documento, itens, anexos, histórico…) como
painéis de um **acordeão único**: uma moldura só, sem blocos "flutuando". Diferente do
[WStepFlow](/components/w-step-flow), não há ordem nem etapa ativa — cada seção abre e fecha por
conta própria, várias ficam abertas ao mesmo tempo e o padrão é **todas abertas**; o usuário
recolhe o que não interessa no momento.

Cada cabeçalho diz o que a seção é (ícone tonal + nome + frase) e quantos registros tem.

## API — WSectionAccordion

<ApiTable name="WSectionAccordion" />

## API — WSectionPanel

<ApiTable name="WSectionPanel" />

### Slots do WSectionPanel

| Slot | Props | Para quê |
|---|---|---|
| `default` | — | Corpo da seção (fica **montado** quando fechada — `v-show`) |
| `actions` | `open` | Ações à direita do cabeçalho, fora do botão que abre/fecha |
| `icon` | — | Substitui o ícone do tile |

## Exemplo

```vue
<script setup lang="ts">
import { WSectionAccordion, WSectionPanel, WCrudView } from '@wgalleti/primevue-components'
</script>

<template>
  <WSectionAccordion>
    <WSectionPanel
      value="dados"
      title="Dados da nota"
      description="Identificação, fornecedor, destino e totais. Os totais vêm dos itens."
      icon="pi pi-file"
    >
      <WFormRenderer :fields="fields" :form-data="form" @update:field="set" />
    </WSectionPanel>

    <WSectionPanel
      value="itens"
      title="Itens"
      description="Produtos, lotes e quantidades."
      icon="pi pi-list"
      :count="itensCrud.items.value.length"
    >
      <!-- o cabeçalho da tabela é o do painel: `show-header` desligado -->
      <WCrudView :crud="itensCrud" title="Itens" :show-header="false" />
    </WSectionPanel>
  </WSectionAccordion>
</template>
```

## Controlando o que está aberto

```vue
<WSectionAccordion v-model="abertas">…</WSectionAccordion>
```

O `v-model` é a lista de `value` das seções abertas. Sem `v-model` o componente é dono do próprio
estado — e guarda só o que o usuário **fechou**, então uma seção que aparece depois
(`v-if` que virou verdadeiro) já nasce aberta.

## Detalhes

- O corpo fechado continua montado: uma grade de CRUD ali dentro não refaz a request a cada
  abre-e-fecha. Se a seção some por `v-if`, aí sim desmonta.
- Um `WSectionPanel` **fora** do acordeão funciona como card colapsável avulso, com estado
  próprio, começando aberto.
- Abaixo de 640px a frase do cabeçalho some (o título basta) e as ações descem para a linha de
  baixo.
- Acessibilidade: o cabeçalho é um `<button>` com `aria-expanded` e `aria-controls` ligado ao
  corpo; o slot `actions` fica fora do botão (nada de botão dentro de botão).

### Classes

| Classe | Onde |
|---|---|
| `.w-section-accordion` | Moldura que agrupa os painéis |
| `.w-section-panel--open` | Seção aberta |
| `.w-section-panel__trigger` | Botão do cabeçalho |
| `.w-section-panel__icon` / `__title` / `__description` / `__count` / `__chevron` | Partes do cabeçalho |
| `.w-section-panel__actions` | Slot de ações, fora do botão |
| `.w-section-panel__content` | Corpo da seção |
