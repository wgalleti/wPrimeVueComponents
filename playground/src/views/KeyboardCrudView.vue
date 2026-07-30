<script setup lang="ts">
import { WCrudView, useCrudManager } from '@wgalleti/primevue-components'
import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'

interface Produto {
  id: number
  nome: string
  categoria: number
  preco: number
  estoque: number
  ativo: boolean
  created_at: string
}

const columns: ColumnDef[] = [
  { field: 'id', header: '#', style: 'width: 60px', align: 'center' },
  { field: 'nome', header: 'Nome' },
  { field: 'preco', header: 'Preço', type: 'currency' },
  { field: 'estoque', header: 'Estoque', type: 'number', align: 'center' },
]

const form: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true },
  {
    field: 'categoria',
    label: 'Categoria — FK (F2 abre a busca)',
    type: 'fk',
    endpoint: '/api/categorias/',
    optionLabel: 'nome',
    required: true,
    colSpan: 0.5,
  },
  { field: 'preco', label: 'Preço', type: 'currency', required: true, colSpan: 0.5 },
  { field: 'estoque', label: 'Estoque', type: 'number', min: 0, colSpan: 0.5 },
  { field: 'created_at', label: 'Data de cadastro', type: 'date', colSpan: 0.5 },
  { field: 'observacao', label: 'Observação (textarea — Enter quebra linha)', type: 'textarea' },
  { field: 'ativo', label: 'Ativo', type: 'switch', defaultValue: true },
]

// keyboardNav: true → foca o 1º campo ao abrir e o Enter pula para o próximo.
const crud = useCrudManager<Produto>({
  endpoint: '/api/produtos/',
  columns,
  form,
  keyboardNav: true,
  pageSize: 10,
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-color leading-relaxed"
    >
      <div class="font-semibold mb-1 flex items-center gap-2">
        <i class="pi pi-bolt text-primary" /> Navegação por teclado (estilo desktop)
      </div>
      Clique em <b>Novo</b> (ou edite uma linha) e teste no formulário:
      <ul class="mt-1.5 flex flex-col gap-0.5">
        <li>• Ao abrir, o foco vai direto no <b>primeiro campo</b> (texto já selecionado).</li>
        <li>• <kbd>Enter</kbd> pula para o <b>próximo campo</b>, até o botão <b>Salvar</b>.</li>
        <li>• <kbd>Shift</kbd>+<kbd>Tab</kbd> volta; <kbd>Tab</kbd> avança (nativo).</li>
        <li>• No campo <b>Categoria (FK)</b>: <kbd>F2</kbd> abre o modal de busca.</li>
        <li>• Em <b>dropdown aberto</b> (FK/select/data), <kbd>Enter</kbd> seleciona; o próximo pula.</li>
        <li>• Na <b>Observação</b> (textarea), <kbd>Enter</kbd> quebra linha normalmente.</li>
      </ul>
    </div>

    <WCrudView
      :crud="crud"
      title="Navegação por Teclado"
      subtitle="keyboardNav: true — produtividade estilo aplicação desktop"
      dialog-width="560px"
    />
  </div>
</template>

<style scoped>
kbd {
  display: inline-block;
  padding: 0.05rem 0.4rem;
  font-size: 0.75rem;
  font-family: ui-monospace, monospace;
  border: 1px solid var(--p-surface-300, #cbd5e1);
  border-bottom-width: 2px;
  border-radius: 5px;
  background: var(--p-surface-0, #fff);
}
</style>
