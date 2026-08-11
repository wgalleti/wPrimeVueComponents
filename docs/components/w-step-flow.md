# WStepFlow / WStepSection

Etapas numeradas e colapsáveis — a espinha de um editor de documento. Diferente do
[WProgressFlow](/components/w-progress-flow), que só ilustra progresso: aqui cada etapa **é** um
bloco de conteúdo que abre e fecha.

O `v-model` do `WStepFlow` é o número da etapa aberta; `0` fecha todas.

Duas orientações, mesmo `WStepSection`:

| `orientation` | Como fica | Quando usar |
|---|---|---|
| `vertical` (padrão) | Coluna de cards, badge e linha conectora à esquerda | Editor com espaço horizontal sobrando |
| `horizontal` | Régua de cabeçalhos no topo; o corpo da etapa ativa ocupa a largura inteira | Telas estreitas, onde a coluna de etapas come largura do conteúdo |

## API — WStepFlow

<ApiTable name="WStepFlow" />

## API — WStepSection

<ApiTable name="WStepSection" />

### Slots do WStepSection

| Slot | Props | Para quê |
|---|---|---|
| `default` | — | Corpo da etapa (só renderiza quando aberta) |
| `footer` | — | Rodapé com a ação "Continuar para…" |
| `actions` | `open` | Ações à direita do cabeçalho |

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WStepFlow, WStepSection } from '@wgalleti/primevue-components'

const etapa = ref(1)
</script>

<template>
  <WStepFlow v-model="etapa">
    <WStepSection
      :step="1"
      title="Contexto e base de cálculo"
      summary="Fazenda Mafra · P42, P44 · 260 ha"
    >
      <WFormRenderer :fields="fields" :form-data="form" :is-editing="false" @update:field="set" />
      <template #footer>
        <Button label="Continuar para as sementes" outlined @click="etapa = 2" />
      </template>
    </WStepSection>

    <WStepSection :step="2" title="Sementes e lotes" :count="lotes.length" summary="260 ha · 20 BAGs">
      <WEditableTable v-model="lotes" :columns="columns" />
    </WStepSection>

    <WStepSection :step="3" title="Resumo para o TS" summary="Biológico 84,0 L · Químico 68,0 L">
      <WEditableTable :model-value="resumo" :columns="colunasResumo" />
    </WStepSection>
  </WStepFlow>
</template>
```

## Orientação horizontal

```vue
<WStepFlow v-model="etapa" orientation="horizontal">
  <WStepSection :step="1" title="Contexto" :summary="resumo1">…</WStepSection>
  <WStepSection :step="2" title="Sementes e lotes" :count="lotes.length">…</WStepSection>
  <WStepSection :step="3" title="Resumo para o TS">…</WStepSection>
</WStepFlow>
```

O `WStepSection` é o mesmo componente — ele descobre a orientação pelo contexto injetado pelo
flow (`StepFlowContext.orientation`), então **não há prop nova no consumidor**.

- Só o corpo da **etapa ativa** é desenhado, embaixo da régua, ocupando a largura inteira.
- Etapas com número **menor que a ativa** aparecem como percorridas: badge preenchida discreta com
  ✓ e o trecho da linha conectora em `--border-strong`. É inferência de posição, não validação — o
  componente não conhece regra de negócio.
- **Abaixo de 768px a régua não cabe e o flow cai sozinho para o empilhamento vertical**, por CSS
  (o markup é o mesmo nas duas larguras).
- Entre 768px e 1280px a régua esconde o `summary` (cada etapa fica com um terço da linha, e ali
  quem importa é o título). Abaixo de 768px ele volta, porque cada etapa tem a linha inteira.
- Teclado: os cabeçalhos são botões (continuam todos no Tab) e ← → / Home / End andam pela régua.

## Detalhes

- **Qual etapa abre depois** é decisão da tela (é por isso que o estado mora no consumidor).
- A **linha conectora** existe em toda etapa dentro do flow; a da ponta é apagada por CSS — na
  vertical a da última (`:last-child`), na horizontal a da primeira (`:first-child`, porque lá a
  linha vem antes da badge, ligando a etapa anterior a esta). Nada é registrado em runtime.
- **Fora de um `WStepFlow`**, um `WStepSection` funciona como card colapsável avulso, com estado
  próprio, começando aberto, em vertical e sem linha conectora.
- Badge da etapa ativa: `--primary` / `--primary-fg`; inativa: borda `--border-strong` e texto
  `--fg-subtle`; percorrida (só na horizontal): `--surface-3` e texto `--fg-muted`.
- O cabeçalho da etapa aberta leva `aria-current="step"` nas duas orientações.

### Classes

| Classe | Onde |
|---|---|
| `.w-step-flow--vertical` / `.w-step-flow--horizontal` | Container, por orientação |
| `.w-step-section--horizontal` | Etapa dentro do flow horizontal |
| `.w-step-section--open` / `.w-step-section--done` | Etapa ativa / já percorrida (horizontal) |
| `.w-step-section__head` / `.w-step-section__panel` | Trecho da régua / corpo da etapa ativa |
| `.w-step-section__badge--done` / `.w-step-section__line--done` | Marcação do percorrido |
