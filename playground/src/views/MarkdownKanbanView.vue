<script setup lang="ts">
import { reactive, ref } from 'vue'
import { WKanbanBoard, WMarkdownEditor, WMarkdownView } from '@wgalleti/primevue-components'
import type { KanbanColumn, KanbanMoveEvent } from '@wgalleti/primevue-components'

// ---------- WMarkdownEditor / WMarkdownView ----------
const nota = ref(
  [
    '## Plano de aplicação',
    '',
    'Aplicar o tratamento em **duas etapas**, priorizando os talhões com maior área.',
    '',
    '- [x] Conferir saldo de sementes',
    '- [ ] Agendar máquina',
    '- [ ] Comunicar a equipe de campo',
    '',
    '| Talhão | Área |',
    '| --- | --- |',
    '| T-01 | 120 ha |',
    '| T-02 | 140 ha |',
    '',
    '> Dúvidas? Veja https://example.com/plano',
  ].join('\n'),
)

// ---------- WKanbanBoard (controlado: o handler aplica o move localmente) ----------
interface Tarefa extends Record<string, unknown> {
  id: number
  nome: string
  responsavel: string
  travada?: boolean
}

const board = reactive<{ columns: KanbanColumn<Tarefa>[] }>({
  columns: [
    {
      value: 'backlog',
      label: 'Backlog',
      items: [
        { id: 1, nome: 'Importar geometria dos talhões', responsavel: 'Ana' },
        { id: 2, nome: 'Relatório de fertilizantes', responsavel: 'Bruno' },
        { id: 3, nome: 'Integração TOTVS (travada)', responsavel: 'Ana', travada: true },
      ],
    },
    {
      value: 'doing',
      label: 'Em andamento',
      items: [
        { id: 4, nome: 'Rastreio de sementes — etapa 2', responsavel: 'Carla' },
        { id: 5, nome: 'Editor de recomendação', responsavel: 'Diego' },
      ],
    },
    {
      value: 'review',
      label: 'Revisão',
      items: [{ id: 6, nome: 'Dashboard de análises', responsavel: 'Bruno' }],
    },
    { value: 'done', label: 'Concluído', items: [{ id: 7, nome: 'Login SSO', responsavel: 'Ana' }] },
  ],
})

const ultimoMove = ref<string>('—')
const ultimoClick = ref<string>('—')

// Em produção: persistir na API e recarregar. Aqui aplicamos localmente
// para demonstrar o contrato controlado (o board nunca muta os arrays).
function onMove({ item, from, to, index }: KanbanMoveEvent) {
  const origem = board.columns.find((c) => c.value === from)!
  const destino = board.columns.find((c) => c.value === to)!
  origem.items = origem.items.filter((i) => i.id !== (item as Tarefa).id)
  destino.items = [...destino.items.slice(0, index), item as Tarefa, ...destino.items.slice(index)]
  ultimoMove.value = `"${(item as Tarefa).nome}" ${from} → ${to} [${index}]`
}

function onItemClick(item: Record<string, unknown>) {
  ultimoClick.value = String(item.nome)
}
</script>

<template>
  <div class="flex flex-col gap-8 max-w-6xl">
    <div class="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-color leading-relaxed">
      <div class="font-semibold mb-1 flex items-center gap-2">
        <i class="pi pi-sparkles text-primary" /> Markdown &amp; Kanban — componentes novos
      </div>
      <ul class="mt-1.5 flex flex-col gap-0.5">
        <li>• <b>WMarkdownEditor</b> — toolbar mínima, modos tab e split, Tab mantém o foco nativo (a11y).</li>
        <li>• <b>WMarkdownView</b> — markdown-it + DOMPurify (HTML cru nunca entra), task lists e tabelas.</li>
        <li>• <b>WKanbanBoard</b> — controlado: arrastar só emite <code>move</code>; quem persiste é o consumidor.</li>
      </ul>
    </div>

    <!-- Editor (tab) alimentando o mesmo v-model -->
    <section class="flex flex-col gap-2">
      <h2 class="text-sm font-semibold text-color">WMarkdownEditor — modo tab</h2>
      <WMarkdownEditor v-model="nota" placeholder="Escreva em markdown..." />
    </section>

    <!-- Editor (split) -->
    <section class="flex flex-col gap-2">
      <h2 class="text-sm font-semibold text-color">WMarkdownEditor — modo split</h2>
      <WMarkdownEditor v-model="nota" preview-mode="split" min-height="260px" />
    </section>

    <!-- View isolado -->
    <section class="flex flex-col gap-2">
      <h2 class="text-sm font-semibold text-color">WMarkdownView — renderer readonly</h2>
      <div class="rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-4">
        <WMarkdownView :source="nota" />
      </div>
    </section>

    <!-- Kanban -->
    <section class="flex flex-col gap-2">
      <h2 class="text-sm font-semibold text-color">WKanbanBoard — arraste os cards ("travada" não arrasta)</h2>
      <WKanbanBoard
        :columns="board.columns"
        :can-drag="(item) => !item.travada"
        @move="onMove"
        @item-click="onItemClick"
      >
        <template #card="{ item }">
          <div class="flex flex-col gap-1">
            <span class="text-[0.8125rem] text-color leading-snug">{{ item.nome }}</span>
            <span class="text-xs text-muted-color flex items-center gap-1">
              <i class="pi pi-user text-xs" /> {{ item.responsavel }}
              <i v-if="item.travada" class="pi pi-lock text-xs ml-auto" title="Sem arrasto (canDrag)" />
            </span>
          </div>
        </template>
        <template #empty-column>Solte um card aqui</template>
      </WKanbanBoard>
      <div class="text-xs text-muted-color flex gap-6">
        <span>último move: <code>{{ ultimoMove }}</code></span>
        <span>último item-click: <code>{{ ultimoClick }}</code></span>
      </div>
    </section>
  </div>
</template>
