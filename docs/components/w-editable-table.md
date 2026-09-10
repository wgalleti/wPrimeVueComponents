# WEditableTable

Tabela editável sobre **estado local**, sem `useCrudManager` e sem API. É a peça de "documento com
filhos": o consumidor mantém o array e salva tudo em bloco.

Nada é mutado no lugar — cada edição emite um array novo em `update:modelValue`.

## API

<ApiTable name="WEditableTable" />

### `EditableColumnDef`

| Campo | Tipo | Para quê |
|---|---|---|
| `field` / `header` | `string` | Chave na linha e título da coluna |
| `width` | `string \| number` | Largura fixa (número = px) |
| `align` | `'left' \| 'center' \| 'right'` | Default: `right` quando `editor: 'number'` |
| `editor` | `'number' \| 'text' \| 'select' \| 'none'` | Default `none` (célula só de leitura) |
| `options` / `optionLabel` / `optionValue` | — | Do `editor: 'select'` |
| `format(value, row)` | `=> string` | Formatação da célula de leitura (vence `decimals`/`suffix`) |
| `footer` | `'sum' \| 'none' \| (rows) => string` | Rodapé de totais da coluna |
| `decimals` / `suffix` | `number` / `string` | Exibição e soma, em pt-BR |
| `disabled` | `boolean \| (row, index) => boolean` | Trava a coluna ou só algumas linhas |
| `group` | `string` | Rótulo de grupo no cabeçalho: colunas **vizinhas** com o mesmo `group` ganham um título único (colspan) numa linha acima delas |
| `card` | `'title' \| 'actions' \| 'meta' \| 'field' \| 'read' \| 'hidden'` | Papel da coluna no [modo card](#modo-card-tablet-em-pe) |

### Slots

| Slot | Props | Para quê |
|---|---|---|
| `cell-{field}` | `row`, `index`, `value`, `column` | Substitui a célula |
| `footer-{field}` | `rows`, `column` | Substitui a célula do rodapé |
| `expansion` | `row`, `index` | Conteúdo da linha expandida (`expandable`) |
| `toolbar` | — | Substitui o botão de adicionar |
| `toolbar-extra` | — | Ação irmã, à direita do botão de adicionar (use `.w-editable-table__add .w-editable-table__add--accent` para a mesma moldura em tinta da marca) |
| `empty` | — | Substitui a mensagem de lista vazia |

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WEditableTable } from '@wgalleti/primevue-components'
import type { EditableColumnDef } from '@wgalleti/primevue-components'

const lotes = ref([{ produto: 'HO APORE', area: 160, volume_kg: 8400 }])

const columns: EditableColumnDef[] = [
  { field: 'produto', header: 'Produto' },
  { field: 'area', header: 'Área (ha)', width: 110, editor: 'number', decimals: 0, footer: 'sum' },
  { field: 'volume_kg', header: 'Volume (kg)', width: 130, decimals: 0, footer: 'sum' },
]

function adicionar() {
  lotes.value = [...lotes.value, { produto: 'Novo lote', area: 0, volume_kg: 0 }]
}
</script>

<template>
  <WEditableTable
    v-model="lotes"
    :columns="columns"
    expandable
    removable
    add-label="Adicionar lote"
    @add="adicionar"
  >
    <!-- A subtabela de filhos é o próprio WEditableTable -->
    <template #expansion="{ row, index }">
      <WEditableTable
        :model-value="row.insumos"
        :columns="colunasInsumo"
        removable
        add-label="Novo insumo"
        @update:model-value="(rows) => setInsumos(index, rows)"
      />
    </template>
  </WEditableTable>
</template>
```

## Modo card (tablet em pé) {#modo-card-tablet-em-pe}

Abaixo de **840px** — a fronteira da régua, tablet em pé — a tabela vira uma lista de cards, um
card por linha, como o `WCrudView` já faz com a listagem. `cardMode` controla: `auto` (default,
segue a largura), `never` (planilha que só existe em grade) e `always` (vitrine e teste).

Não existe tela paralela para o tablet: a marcação é **a mesma**. O `<table>` troca de display,
cada `<tbody>` (que já era uma linha, por causa da expansão) vira o card e cada `<td>` vira uma
linha do card. Por isso continuam funcionando sem nenhum ajuste no consumidor:

- os slots `#cell-{field}` (botões, popovers, o que o consumidor desenhou);
- os editores `number` / `text` / `select`, com edição inline de verdade;
- a linha expansível — vira uma seção no rodapé do card, com o rótulo de `expansionLabel`;
- o rodapé de totais, que vira um card de "Total" no fim da lista.

O que muda: as larguras fixas de coluna não valem no card, o cabeçalho agrupado (`group`) entra
como prefixo do rótulo (`Bags · A tratar`) e o rótulo de cada coluna passa a ser renderizado
dentro da célula — no card não há `thead` para consultar.

### Papéis (`column.card`)

Sem declarar nada a tabela já cai em pé: a primeira coluna vira `title` e as demais `field`.
Declare para dar hierarquia — o que se lê de relance, o que se edita, o que é derivado.

`field` e `read` aparecem **na ordem das colunas**, intercalados: o miolo do card lê na mesma
sequência da tabela. Posição fixa só para `title`, `actions`, `meta` e a expansão.

| Papel | Onde fica no card |
|---|---|
| `title` | Manchete, no topo (uma por linha; sobrando, a primeira vence) |
| `actions` | Ao lado do título, à direita (o `WCrudSubview` já marca a coluna de ações assim) |
| `meta` | Contexto compacto sob o título, duas por linha |
| `field` | Rótulo à esquerda, controle à direita, largura cheia e alvo de toque |
| `read` | Derivado: mesma régua do `field` — rótulo, caixa e número na mesma coluna, com a caixa tinta e sem borda (borda é o que se edita). No rodapé de totais fica compacto, duas por linha |
| `hidden` | Fora do card (a coluna continua na tabela larga) |

```ts
const columns: EditableColumnDef[] = [
  { field: 'produto_nome', header: 'Produto', card: 'title' },
  { field: 'lote', header: 'Lote', width: 116, card: 'meta' },
  { field: 'area', header: 'Área (ha)', width: 112, editor: 'number' }, // field
  { field: 'volume_kg', header: 'Volume (kg)', width: 80, decimals: 0, card: 'read' },
]
```

## Detalhes

- **`add`** só avisa a intenção: quem sabe o formato da linha nova é o consumidor.
- **`remove`** emite os dois — o `update:modelValue` já sem a linha e o `remove(row, index)` com ela.
- **Expansão**: várias linhas podem ficar abertas ao mesmo tempo; o estado é interno.
- **Números** saem alinhados à direita com `tabular-nums` e formatados em pt-BR.
- **Card**: a lista de cards é a mesma tabela com outro display — nunca escreva uma segunda tela
  para o tablet; declare `card` nas colunas.
