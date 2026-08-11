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

### Slots

| Slot | Props | Para quê |
|---|---|---|
| `cell-{field}` | `row`, `index`, `value`, `column` | Substitui a célula |
| `footer-{field}` | `rows`, `column` | Substitui a célula do rodapé |
| `expansion` | `row`, `index` | Conteúdo da linha expandida (`expandable`) |
| `toolbar` | — | Substitui o botão de adicionar |
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

## Detalhes

- **`add`** só avisa a intenção: quem sabe o formato da linha nova é o consumidor.
- **`remove`** emite os dois — o `update:modelValue` já sem a linha e o `remove(row, index)` com ela.
- **Expansão**: várias linhas podem ficar abertas ao mesmo tempo; o estado é interno.
- **Números** saem alinhados à direita com `tabular-nums` e formatados em pt-BR.
