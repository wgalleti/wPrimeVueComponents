# WGroupedSelectList

Tabela agrupada com seleção múltipla: grupos recolhíveis, checkbox de grupo em três estados
(marcado, parcial, desabilitado quando não há linha selecionável), linhas que podem não ser
selecionáveis — com o motivo num badge — e a ação "selecionar todos os resultados".

O componente **nunca filtra**: `items` já é o resultado. A ordem dos grupos é a da primeira
aparição em `items`. As células reusam o `ColumnDef` do `WCrudView`.

- O checkbox do grupo marca só as linhas selecionáveis (e desmarca todas as do grupo) daquele grupo.
- "Selecionar todos os resultados" marca todas as selecionáveis de `items`; com tudo marcado vira
  "Limpar seleção" e desmarca as chaves de `items`, inclusive linhas travadas que já estavam selecionadas.
- Linha não selecionável **já selecionada** pode ser desmarcada (nunca marcada): o checkbox dela fica
  habilitado só para tirar. O checkbox do grupo, ao limpar, também derruba essas linhas.
- `selection` e `collapsed` são `v-model` (`defineModel`): o componente sempre segue o valor do pai, e
  funciona sem `v-model` com estado local.
- `loading` com linhas na tela **mantém as linhas**, põe `aria-busy="true"` na tabela e mostra uma
  barra "Carregando…"; o placeholder no lugar da tabela só aparece quando ainda não há linhas.
- Chaves de `selection` que não estão em `items` ficam intactas e não entram nas contagens: podar a
  seleção quando o filtro muda é papel de quem usa.
- `selectable="false"` é a trava global: desabilita todo checkbox, não mostra badge e esconde a ação de
  selecionar todos.

## API

<ApiTable name="WGroupedSelectList" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WGroupedSelectList } from '@wgalleti/primevue-components'
import type { ColumnDef, GroupedSelectKey } from '@wgalleti/primevue-components'

const selection = ref<GroupedSelectKey[]>([])
const collapsed = ref<string[]>([])
const columns: ColumnDef[] = [
  { field: 'nome', header: 'Nome' },
  { field: 'quantidade', header: 'Quantidade', type: 'number', align: 'right' },
]
const items = [
  { id: 1, area: 'Norte', nome: 'Pacote A', quantidade: 12, alocado: false },
  { id: 2, area: 'Norte', nome: 'Pacote B', quantidade: 8, alocado: true },
  { id: 3, area: 'Sul', nome: 'Pacote C', quantidade: 20, alocado: false },
]
</script>

<template>
  <WGroupedSelectList
    v-model:selection="selection"
    v-model:collapsed="collapsed"
    :items="items"
    :columns="columns"
    group-by="area"
    :is-selectable="(i) => !i.alocado"
    :disabled-reason="() => 'Já alocado'"
  >
    <template #summary>{{ items.length }} encontrados · {{ selection.length }} selecionados</template>
    <template #group-meta="{ selectedCount, selectableCount }">
      {{ selectedCount }}/{{ selectableCount }}
    </template>
    <template #row-actions="{ data }">
      <button type="button" @click="console.log(data.id)">Detalhes</button>
    </template>
  </WGroupedSelectList>
</template>
```

Slots: `group-header` e `group-meta` recebem `{ groupKey, label, items, selectedCount,
selectableCount, collapsed }`; `column-<campo>` recebe `{ data, column, value }`; `row-actions`
recebe `{ data }`; `summary` e `empty` não têm escopo.
