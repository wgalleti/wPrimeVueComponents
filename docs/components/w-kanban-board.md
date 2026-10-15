# WKanbanBoard

Board kanban controlado com drag and drop HTML5 nativo. Arrastar um card emite `move`
(`{ item, from, to, index }`) e **o consumidor persiste e atualiza `columns`** — o board não
muta os arrays. Mover programático (por uma UI própria) também é responsabilidade do consumidor.

Cada coluna aceita `accent` (token de cor) que tinge cabeçalho, realce de drop e linha de
inserção, além de slot de ação por coluna.

O slot `column-footer` (escopo `{ column, items }`) desenha o rodapé de cada coluna — total,
"+ adicionar" —, depois dos cards e do `empty-column`. Fica **fora da área de drop** (soltar um
card sobre ele não move nada) e aparece também com a coluna vazia ou com `loading` (nesse caso o
board inteiro fica sem ponteiro, como os demais controles).

O cabeçalho tem altura **mínima** (`--w-control-h-sm`): um `column-header` com mais de uma linha
(título e contador) aumenta a faixa em vez de escapar dela. A lista reserva a calha da barra de
rolagem (`scrollbar-gutter: stable`), então os cards têm a mesma largura em todas as colunas.

## API

<ApiTable name="WKanbanBoard" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WKanbanBoard } from '@wgalleti/primevue-components'
import type { KanbanColumn, KanbanMoveEvent } from '@wgalleti/primevue-components'

const columns = ref<KanbanColumn[]>([
  { value: 'backlog', label: 'Backlog', accent: 'var(--fg-subtle)', items: [{ id: 1, nome: 'Importar geometria' }] },
  { value: 'doing', label: 'Em andamento', accent: 'var(--info)', items: [{ id: 2, nome: 'Rastreio de sementes' }] },
  { value: 'done', label: 'Concluído', accent: 'var(--success)', items: [] },
])

async function onMove(ev: KanbanMoveEvent) {
  await api.patch(`/tarefas/${ev.item.id}/`, { status: ev.to })
  // recarrega/atualiza columns — o board só reflete o que receber
}
</script>

<template>
  <WKanbanBoard :columns="columns" @move="onMove" />
</template>
```

### Rodapé por coluna

```vue
<WKanbanBoard :columns="columns" @move="onMove">
  <template #column-footer="{ column, items }">
    <Button label="Adicionar" icon="pi pi-plus" text size="small" @click="criarEm(column.value)" />
    <span>{{ items.length }} itens</span>
  </template>
</WKanbanBoard>
```
