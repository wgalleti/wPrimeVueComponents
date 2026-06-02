/* ============================================================
   Registry — CRUD components
   ============================================================ */
(function () {
  const WC = window.WC, WDEMO = window.WDEMO;
  const REG = (window.WREG = window.WREG || []);

  REG.push({
    id: 'WCrudView', slug: 'w-crud-view', name: 'WCrudView', cat: 'CRUD', icon: 'pi pi-table',
    source: 'components/crud/WCrudView.vue', badge: 'core',
    tagline: 'Tabela CRUD completa: busca, paginação, KPIs, ações e dialog.',
    desc: 'O componente central da biblioteca. A partir de um useCrudManager gera tabela paginada com busca, KPIs opcionais, botões de criar/editar/excluir, dialog de formulário e toasts — tudo dirigido por ColumnDef[] e FieldDef[]. Clique em "Novo", editar ou excluir abaixo para ver o fluxo real.',
    importLine: "import { useCrudManager, WCrudView } from '@wgalleti/primevue-components'",
    preview: () => WC.crudView({ showKpi: false, rows: [{ nome: 'Picanha Premium', cat: 'Bovinos', preco: 'R$ 79,90', estoque: 128, status: 'ativo' }, { nome: 'Costela Suína', cat: 'Suínos', preco: 'R$ 24,50', estoque: 64, status: 'ativo' }] }),
    playground: {
      stretch: true, maxw: 900,
      defaults: { title: 'Produtos', subtitle: '248 itens cadastrados', showKpi: true },
      controls: [
        { key: 'title', type: 'text', label: 'title' },
        { key: 'subtitle', type: 'text', label: 'subtitle' },
        { key: 'showKpi', type: 'toggle', label: 'showKpi' },
      ],
      mount: (el, p) => WDEMO.crudView(el, p),
    },
    note: 'Dica: o estado vem do composable, não do componente. Toda a lógica (fetch, paginação, save, delete) vive em <code>useCrudManager</code>; <code>WCrudView</code> é só a camada visual.',
    props: [
      { name: 'crud', type: 'CrudManagerReturn<T>', req: true, desc: 'Retorno de useCrudManager.' },
      { name: 'title', type: 'string', req: true, desc: 'Título da tela.' },
      { name: 'subtitle', type: 'string', desc: 'Subtítulo.' },
      { name: 'showSearch', type: 'boolean', def: 'true', desc: 'Exibe campo de busca.' },
      { name: 'showHeader', type: 'boolean', def: 'true', desc: 'Exibe cabeçalho com botão Novo.' },
      { name: 'showKpi', type: 'boolean', def: 'false', desc: 'Mostra KPI de total de registros.' },
      { name: 'extraKpis', type: 'KpiItem[]', def: '[]', desc: 'KPIs adicionais.' },
      { name: 'dialogWidth', type: 'string', def: "'480px'", desc: 'Largura do dialog de formulário.' },
      { name: 'expandable', type: 'boolean', def: 'false', desc: 'Habilita linhas expansíveis.' },
    ],
    slots: [
      { name: 'header-actions', desc: 'Ações extras no cabeçalho.' },
      { name: 'toolbar-start / toolbar-filters / toolbar-actions', desc: 'Conteúdo da toolbar da tabela.' },
      { name: 'before-table', desc: 'Substitui a área de KPIs.' },
      { name: 'column-{field}', desc: 'Renderização custom de uma coluna.' },
      { name: 'row-actions', desc: 'Ações extras por linha.' },
      { name: 'empty', desc: 'Estado vazio customizado.' },
      { name: 'expansion', desc: 'Conteúdo da linha expandida.' },
      { name: 'field-{field}', desc: 'Campo custom no dialog.' },
    ],
    events: [
      { name: 'row-expand', payload: 'data', desc: 'Linha expandida.' },
      { name: 'row-collapse', payload: 'data', desc: 'Linha recolhida.' },
    ],
    examples: [
      { title: 'CRUD completo', lang: 'vue', code: `<script setup lang="ts">
import { useCrudManager, WCrudView } from '@wgalleti/primevue-components'
import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'

const columns: ColumnDef[] = [
  { field: 'nome', header: 'Nome' },
  { field: 'preco', header: 'Preço', type: 'currency' },
  { field: 'ativo', header: 'Status', type: 'boolean' },
]
const form: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true },
  { field: 'preco', label: 'Preço', type: 'currency' },
  { field: 'ativo', label: 'Ativo', type: 'switch', defaultValue: true },
]
const crud = useCrudManager({ endpoint: '/api/v1/produtos/', columns, form })
</script>

<template>
  <WCrudView :crud="crud" title="Produtos" show-kpi />
</template>` },
    ],
  });

  REG.push({
    id: 'WCrudFormDialog', slug: 'w-crud-form-dialog', name: 'WCrudFormDialog', cat: 'CRUD', icon: 'pi pi-window-maximize',
    source: 'components/crud/WCrudFormDialog.vue',
    tagline: 'Dialog de formulário a partir de FieldDef[], com validação.',
    desc: 'Envolve o WFormRenderer em um Dialog modal com footer de salvar/cancelar e validação antes do submit. Usado internamente pelo WCrudView, mas exposto para uso isolado.',
    importLine: "import { WCrudFormDialog } from '@wgalleti/primevue-components'",
    preview: () => `<div class="pv" style="transform:scale(.78);transform-origin:center">${WC.formDialog({ title: 'Novo Produto' })}</div>`,
    playground: {
      maxw: 520,
      defaults: { isEditing: false },
      controls: [{ key: 'isEditing', type: 'toggle', label: 'isEditing' }],
      mount: (el, p) => WDEMO.formDialog(el, p),
    },
    props: [
      { name: 'visible', type: 'boolean', req: true, desc: 'Controla a exibição (v-model).' },
      { name: 'title', type: 'string', req: true, desc: 'Título do dialog.' },
      { name: 'fields', type: 'FieldDef[]', req: true, desc: 'Definição dos campos.' },
      { name: 'formData', type: 'Record<string, unknown>', req: true, desc: 'Objeto reativo do formulário.' },
      { name: 'isEditing', type: 'boolean', req: true, desc: 'Modo edição (muda label do botão).' },
      { name: 'saving', type: 'boolean', req: true, desc: 'Estado de salvando (loading).' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'Modo somente-leitura.' },
      { name: 'width', type: 'string', def: "'480px'", desc: 'Largura do dialog.' },
    ],
    slots: [
      { name: 'field-{field}', desc: 'Campo customizado.' },
      { name: 'image-{field}', desc: 'Slot de imagem custom.' },
      { name: 'footer', desc: 'Footer customizado — recebe `{ saving, disabled }`.' },
    ],
    events: [
      { name: 'update:visible', payload: 'boolean', desc: 'Mudança de visibilidade.' },
      { name: 'update:field', payload: '(field, value)', desc: 'Edição de um campo.' },
      { name: 'save', payload: '—', desc: 'Submit válido.' },
    ],
    examples: [
      { title: 'Dialog isolado', lang: 'vue', code: `<WCrudFormDialog
  v-model:visible="open"
  title="Novo Produto"
  :fields="form"
  :form-data="data"
  :is-editing="false"
  :saving="saving"
  @update:field="(f, v) => (data[f] = v)"
  @save="salvar"
/>` },
    ],
  });

  REG.push({
    id: 'WCrudColumnRenderer', slug: 'w-crud-column-renderer', name: 'WCrudColumnRenderer', cat: 'CRUD', icon: 'pi pi-list',
    source: 'components/crud/WCrudColumnRenderer.vue',
    tagline: 'Renderiza o valor de uma célula conforme o tipo da coluna.',
    desc: 'Resolve a apresentação de uma célula a partir de ColumnDef.type: text, currency, number, date, datetime, boolean (Tag), image, custom (format/tagValue/tagSeverity) e valores nulos. Usado por cada célula do WCrudView.',
    importLine: "import { WCrudColumnRenderer } from '@wgalleti/primevue-components'",
    preview: () => WC.columnRenderer(),
    playground: {
      maxw: 560, stretch: true,
      defaults: {},
      controls: [],
      render: () => WC.columnRenderer(),
    },
    props: [
      { name: 'column', type: 'ColumnDef', req: true, desc: 'Definição da coluna.' },
      { name: 'value', type: 'unknown', req: true, desc: 'Valor da célula.' },
      { name: 'rowData', type: 'Record<string, unknown>', req: true, desc: 'Linha completa (para format/tag).' },
    ],
    slots: [], events: [],
    examples: [
      { title: 'Tipos de coluna', lang: 'ts', code: `const columns: ColumnDef[] = [
  { field: 'nome', header: 'Nome' },                      // text
  { field: 'preco', header: 'Preço', type: 'currency' },  // R$ 0,00
  { field: 'qtd', header: 'Qtd', type: 'number', decimals: 0 },
  { field: 'validade', header: 'Validade', type: 'date' },
  { field: 'ativo', header: 'Status', type: 'boolean',
    tagValue: (v) => (v ? 'Disponível' : 'Esgotado'),
    tagSeverity: (v) => (v ? 'success' : 'danger') },
  { field: 'foto', header: 'Foto', type: 'image' },
]` },
    ],
  });
})();
