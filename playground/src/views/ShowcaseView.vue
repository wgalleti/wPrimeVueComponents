<script setup lang="ts">
import {
  WCrudView,
  useCrudManager,
  useAppToast,
} from '@wgalleti/primevue-components'
import type { ColumnDef, FieldDef, RowAction } from '@wgalleti/primevue-components'
import { categorias } from '../mock/data'

interface Produto {
  id: number
  nome: string
  categoria: number
  preco: number
  estoque: number
  ativo: boolean
  created_at: string
  relacionados?: number[]
}

const toast = useAppToast()

const columns: ColumnDef[] = [
  { field: 'id', header: '#', style: 'width: 60px', align: 'center' },
  { field: 'nome', header: 'Nome', sortable: true },
  { field: 'preco', header: 'Preço', type: 'currency', sortable: true },
  { field: 'estoque', header: 'Estoque', type: 'number', align: 'center', sortable: true },
  {
    field: 'ativo',
    header: 'Status',
    type: 'boolean',
    tagValue: (v) => (v ? 'Disponível' : 'Indisponível'),
    tagSeverity: (v) => (v ? 'success' : 'warn'),
  },
  { field: 'created_at', header: 'Cadastro', type: 'date' },
]

const categoriaOptions = categorias.map((c) => ({ id: c.id, nome: c.nome }))

const form: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true, autofocus: true },
  {
    field: 'categoria',
    label: 'Categoria',
    type: 'fk',
    endpoint: '/api/categorias/',
    optionLabel: 'nome',
    required: true,
    colSpan: 0.5,
  },
  {
    // WMoneyInput — entrada preenchida da direita (estilo calculadora)
    field: 'preco',
    label: 'Preço (digite da direita p/ esquerda)',
    type: 'currency',
    fillFromRight: true,
    required: true,
    colSpan: 0.5,
  },
  { field: 'estoque', label: 'Estoque', type: 'number', min: 0, colSpan: 0.5 },
  { field: 'created_at', label: 'Data Cadastro', type: 'date', colSpan: 0.5 },
  { field: 'ativo', label: 'Ativo', type: 'switch', defaultValue: true },
  {
    // WTransferList — dual-list
    field: 'relacionados',
    label: 'Categorias relacionadas',
    type: 'transfer',
    options: categoriaOptions,
    optionValue: 'id',
    optionLabel: 'nome',
    searchFields: ['nome'],
    fieldGroup: { id: 'rel', title: 'Relacionamentos', order: 2 },
  },
]

// Actions customizadas — aparecem na barra lateral (e no context menu), junto
// das actions padrão (editar/duplicar/excluir).
const rowActions: RowAction<Produto>[] = [
  {
    action: 'destaque',
    icon: 'pi pi-star',
    tooltip: 'Destacar',
    severity: 'warn',
    handler: (data) => toast.success(`Produto destacado: ${data.nome}`),
    disabled: (data) => !data.ativo,
  },
  { action: 'edit', icon: 'pi pi-pencil', tooltip: 'Editar' },
  { action: 'duplicate', icon: 'pi pi-copy', tooltip: 'Duplicar', severity: 'info' },
  { action: 'delete', icon: 'pi pi-trash', tooltip: 'Excluir', severity: 'danger' },
]

const crud = useCrudManager<Produto>({
  endpoint: '/api/produtos/',
  columns,
  form,
  rowActions,
  pageSize: 8,
  // partialUpdate: true é o default — em edição só os campos alterados são enviados (PATCH diff)
})

function onPrint(row: Record<string, unknown>) {
  toast.info(`Imprimir registro #${row.id} — ${row.nome}`)
}
</script>

<template>
  <WCrudView
    :crud="crud"
    title="Showcase — Novas funcionalidades"
    subtitle="Actions só na barra lateral (inclui a custom 'Destacar') · context menu · export CSV (todos) · grid/cards · WMoneyInput · WTransferList · diff PATCH"
    dialog-width="640px"
    view-toggle
    action-rail
    context-menu
    export-csv
    csv-filename="produtos.csv"
    show-kpi
    kpi-icon="pi pi-shopping-cart"
    kpi-label="Total de Produtos"
    @print="onPrint"
  />
</template>
