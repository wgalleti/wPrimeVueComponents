# WCrudSubview

O CRUD de **coleção-filha em rascunho** — o par do [`WCrudView`](/components/w-crud-view) para
editor de documento.

O `WCrudView` fala com um recurso REST: cada linha grava sozinha, na hora. Há telas em que os
filhos não têm endereço próprio no servidor — o documento inteiro é que é salvo, e o backend
reconcilia as coleções (cria o que veio sem id, atualiza o que veio com id, apaga o que não veio).
Aí não existe onde a linha grave; o array em memória é a verdade até o salvamento.

A experiência, porém, deveria ser a mesma: form dialog, ação de linha, confirmação para excluir,
estado vazio com texto útil. É o que este componente traz, sobre a
[`WEditableTable`](/components/w-editable-table) — que soma o rodapé de totais, a linha expansível
e a edição por célula que a listagem de recurso não tem.

Quem guarda o estado é o [`useSubviewCrud`](#usesubviewcrud); o componente não tem regra nenhuma.

## API

<ApiTable name="WCrudSubview" />

### `useSubviewCrud`

```ts
const crud = useSubviewCrud({
  rows: () => itens.value,                    // de onde vêm as linhas (getter reativo)
  onChange: (linhas) => (itens.value = linhas), // devolve o array inteiro; o dono grava
  form: insumoForm,                            // FieldDef[] — o mesmo do CRUD
})
```

| Config | Tipo | Para quê |
|---|---|---|
| `rows` | `() => T[]` | Fonte das linhas. Getter, para acompanhar a fonte reativa do dono |
| `onChange` | `(rows: T[]) => void` | Recebe o array **novo** a cada operação. O original nunca é mutado |
| `form` | `FieldDef[]` | Campos do dialog — mesma definição do `useCrudManager` |
| `formColumns` | `number` | Colunas do grid do form (default 2) |
| `keyboardNav` | `boolean` | Enter navega e submete. Default `true` |
| `labels` | `Partial<CrudLabels>` | Títulos, mensagem de exclusão, texto de lista vazia |
| `canCreate` / `canEdit` / `canDelete` | `boolean` | Desligam o botão de adicionar e as ações de linha |
| `createDefaults` | `() => Record<string, unknown>` | Valores da linha nova. É prefill, não override: no save só completa o que ficou vazio |
| `transformPayload` | `(payload, isEditing) => Record<string, unknown>` | Última palavra sobre o que entra no array |
| `toForm` | `(item) => Record<string, unknown>` | O inverso: como a linha vira form ao editar. É onde a FK denormalizada (`produto` + `produto_nome`) volta a ser o objeto que o campo `fk` espera |
| `uniqueBy` | `string \| (item) => unknown` | O que não pode repetir na coleção: um campo (`'produto'`) ou uma chave composta. A comparação ignora a própria linha em edição |
| `uniqueMessage` | `string` | O que se diz quando repete |
| `onAfterSave` / `onAfterDelete` | `(item, …) => void` | Gancho do dono — tipicamente marcar o documento como sujo |
| `toast` | `boolean` | Default `false`: em rascunho, "salvo com sucesso" ainda não é verdade. Erro de validação avisa sempre |

Retorna `items`, `formData`, `dialogVisible`, `isEditing`, `dialogTitle`, `openCreateDialog`,
`openEditDialog`, `openDuplicateDialog`, `save`, `confirmDelete`, `performDelete`, `setFormField`
e `resetForm` — os mesmos nomes do `useCrudManager`, sem nada assíncrono.

### Slots

| Slot | Props | Para quê |
|---|---|---|
| `cell-{field}` | `row`, `index`, `value`, `column` | Substitui a célula (repassado à tabela) |
| `expansion` | `row`, `index` | Conteúdo da linha expandida (`expandable`) |
| `toolbar-actions` | — | Ações ao lado do título |
| `empty` | — | Substitui a mensagem de lista vazia |
| `field-{field}` | do `WFormRenderer` | Substitui um campo do dialog |
| `after-fields` | `formData`, `isEditing` | Depois dos campos, antes do rodapé: prévia do que vai ser gravado, saldo, aviso |
| `form-footer` | `saving`, `disabled` | Substitui os botões do dialog |

## Exemplo

```vue
<script setup>
import { computed } from 'vue'
import { WCrudSubview, useSubviewCrud } from '@wgalleti/primevue-components'

const props = defineProps({ insumos: Array, disabled: Boolean })
const emit = defineEmits(['update:insumos'])

const columns = [
  { field: 'produto_nome', header: 'Produto' },
  { field: 'dose', header: 'Dose', width: 90, editor: 'number', decimals: 2 },
  { field: 'quantidade', header: 'Quantidade', width: 120, decimals: 1, footer: 'sum' },
]

const crud = useSubviewCrud({
  rows: () => props.insumos ?? [],
  onChange: (linhas) => emit('update:insumos', linhas),
  form: insumoForm,
  labels: { createTitle: 'Novo insumo', editTitle: 'Editar insumo',
            deleteConfirmMessage: 'Excluir este insumo do lote?',
            emptyMessage: 'Nenhum insumo neste lote.' },
})
</script>

<template>
  <WCrudSubview
    :crud="crud"
    :columns="columns"
    :disabled="disabled"
    title="Insumos do lote"
    add-label="Novo insumo"
  >
    <!-- Prévia: a mesma conta da tabela, para conferir antes de confirmar -->
    <template #after-fields="{ formData }">
      <p class="previa">Quantidade neste lote: <strong>{{ calcular(formData) }} L</strong></p>
    </template>
  </WCrudSubview>
</template>
```

## Notas

- **`uniqueBy` é o par da regra que o servidor já tem.** Coleção-filha quase sempre proíbe
  repetição (dois insumos do mesmo produto no mesmo lote são uma dose só), e o backend recusa o
  documento inteiro por causa disso. Descobrir no 400 do salvamento é tarde — o usuário já
  preencheu tudo. Declare a mesma regra aqui e o aviso chega no gesto que a violou.
- **A exclusão é ação de linha, não a lixeira nativa da tabela.** A `WEditableTable` emite
  `update:modelValue` já sem a linha **antes** do evento `remove` — quem casa linha↔item por índice
  se perde no meio de uma confirmação assíncrona, e cancelar deixaria estrago. Pela ação, a linha só
  sai depois do "Excluir".
- **Editar preserva o que não está no form**: `id` e campos derivados que o servidor devolveu
  continuam na linha, porque o form só conhece os campos que ele mesmo edita.
- Documento travado (emitido, aprovado) é `:disabled="true"`: some o botão de adicionar e somem as
  ações de linha, e as células viram leitura.
