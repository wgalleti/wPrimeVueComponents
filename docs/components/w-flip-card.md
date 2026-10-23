# WFlipCard

Cartão de duas faces que vira por ação de quem consome. O botão que vira mora **dentro**
das faces: os slots `front` e `back` recebem `{ flipped, flip }` no escopo — `flip()`
alterna, `flip(true)`/`flip(false)` fixa. O estado também sai por `v-model:flipped`
(funciona sem v-model). O componente não desenha moldura: o cartão é o que você põe em
cada face.

A troca é uma meia-volta em `rotateY` — a face que sai gira até ficar de perfil, a que
entra parte do perfil oposto —, com `--w-motion` por metade e `--w-ease`. A profundidade
é o token `--w-flip-perspective` (no app: `--flip-perspective`).

## API

<ApiTable name="WFlipCard" />

## Exemplo — gráfico com dados e fórmula

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { WChart, WFlipCard, WInfoCard } from '@wgalleti/primevue-components'

const verso = ref(false)
const option = { /* série da arroba nos últimos 12 meses */ }
const linhas = [
  { mes: 'out/26', valor: 334.5 },
  { mes: 'set/26', valor: 328.0 },
]
</script>

<template>
  <WFlipCard v-model:flipped="verso" :labels="{ front: 'Gráfico da arroba', back: 'Dados e fórmula' }">
    <template #front="{ flipped, flip }">
      <WInfoCard title="Arroba-boi">
        <WChart :option="option" />
        <Button
          label="Dados e fórmula"
          text
          size="small"
          :aria-expanded="flipped"
          data-w-flip-focus
          @click="flip()"
        />
      </WInfoCard>
    </template>

    <template #back="{ flipped, flip }">
      <WInfoCard title="Dados e fórmula">
        <p>Média móvel de 3 meses sobre o indicador diário.</p>
        <DataTable :value="linhas" size="small">
          <Column field="mes" header="Mês" />
          <Column field="valor" header="R$/@" />
        </DataTable>
        <Button
          label="Voltar"
          text
          size="small"
          :aria-expanded="flipped"
          data-w-flip-focus
          @click="flip()"
        />
      </WInfoCard>
    </template>
  </WFlipCard>
</template>
```

## Altura segue a face ativa

Só a face visível existe no DOM (`v-if`/`v-else` numa `Transition` `out-in`). O cartão
tem a altura da face que está à mostra — um verso com tabela longa empurra o layout para
baixo, e a frente volta a ocupar só o que precisa. Se a grade ao redor não pode "pular",
fixe a altura no contêiner de quem consome.

## Acessibilidade

- **O botão que vira é seu** e leva `aria-expanded` (`true` quando o verso está à mostra)
  — o componente não sabe qual elemento é o gatilho.
- Cada face é um `role="group"` com `aria-label` (`labels.front`/`labels.back`; padrão
  "Frente" e "Verso").
- **Foco**: depois que a face nova entra, o foco vai para o primeiro elemento com
  `data-w-flip-focus` dela — marque o botão de voltar no verso e o de virar na frente, e
  quem usa teclado vai e volta sem procurar. Sem marcação, o foco vai para a própria face
  (`tabindex="-1"`). Na montagem o foco não se move.
- **`prefers-reduced-motion`**: sem rotação; a troca vira só opacidade, com
  `--w-motion-fast`.

> Impressão é decisão de quem consome: o componente não tem regra de `@media print`.
