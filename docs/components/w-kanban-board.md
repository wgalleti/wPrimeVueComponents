# WKanbanBoard

Board kanban controlado com drag and drop HTML5 nativo. Arrastar um card emite `move`
(`{ item, from, to, index }`) e **o consumidor persiste e atualiza `columns`** — o board não
muta os arrays. Mover programático (por uma UI própria) também é responsabilidade do consumidor.

Cada coluna aceita `accent` (token de cor) que tinge cabeçalho, realce de drop e linha de
inserção, além de slot de ação por coluna.

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
