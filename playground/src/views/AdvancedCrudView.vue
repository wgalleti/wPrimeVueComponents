<script setup lang="ts">
import { ref } from 'vue'
import { WCrudView, useCrudManager, useFormatters } from '@wgalleti/primevue-components'
import type { ColumnDef, FieldDef, RowAction, KpiItem } from '@wgalleti/primevue-components'
import Tag from 'primevue/tag'

const { formatCurrency } = useFormatters()

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
  { field: 'preco', header: 'Preco', type: 'currency' },
  { field: 'estoque', header: 'Estoque', type: 'number', align: 'center' },
  {
    field: 'ativo',
    header: 'Status',
    type: 'boolean',
    tagValue: (v) => (v ? 'Disponivel' : 'Indisponivel'),
    tagSeverity: (v) => (v ? 'success' : 'warn'),
  },
]

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
  { field: 'preco', label: 'Preco', type: 'currency', required: true, colSpan: 0.5 },
  {
    field: 'estoque',
    label: 'Estoque',
    type: 'number',
    min: 0,
    colSpan: 0.5,
    validate: (v) => {
      if (v != null && Number(v) < 0) return 'Estoque nao pode ser negativo'
      return null
    },
  },
  { field: 'created_at', label: 'Data Cadastro', type: 'date', colSpan: 0.5 },
  { field: 'ativo', label: 'Ativo', type: 'switch', defaultValue: true },
]

const rowActions: RowAction<Produto>[] = [
  {
    action: 'duplicate',
    icon: 'pi pi-copy',
    tooltip: 'Duplicar',
    severity: 'info',
    handler: (data) => {
      crud.openCreateDialog()
      crud.setFormField('nome', `${data.nome} (copia)`)
      crud.setFormField('preco', data.preco)
      crud.setFormField('categoria', data.categoria)
    },
  },
  { action: 'edit', icon: 'pi pi-pencil', tooltip: 'Editar' },
  { action: 'delete', icon: 'pi pi-trash', tooltip: 'Excluir', severity: 'danger' },
]

const extraKpis: KpiItem[] = [
  { icon: 'pi pi-box', label: 'Em Estoque', value: '47', color: '#22c55e' },
  { icon: 'pi pi-ban', label: 'Sem Estoque', value: '6', color: '#ef4444' },
]

const crud = useCrudManager<Produto>({
  endpoint: '/api/produtos/',
  columns,
  form,
  rowActions,
  pageSize: 10,
})
</script>

<template>
  <WCrudView
    :crud="crud"
    title="Produtos Avancado"
    subtitle="FK, validacao, row actions customizadas, KPIs"
    dialog-width="560px"
    show-kpi
    kpi-icon="pi pi-shopping-cart"
    kpi-label="Total Produtos"
    :extra-kpis="extraKpis"
  >
    <template #column-nome="{ data }">
      <div>
        <span class="font-semibold">{{ data.nome }}</span>
        <Tag
          v-if="data.estoque === 0"
          value="Sem estoque"
          severity="danger"
          class="ml-2"
          style="font-size: 0.7rem"
        />
      </div>
    </template>
  </WCrudView>
</template>
