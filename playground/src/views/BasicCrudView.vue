<script setup lang="ts">
import { WCrudView, useCrudManager } from '@wgalleti/primevue-components'
import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'

interface Produto {
  id: number
  nome: string
  preco: number
  estoque: number
  ativo: boolean
  created_at: string
}

const columns: ColumnDef[] = [
  { field: 'id', header: '#', style: 'width: 60px', align: 'center' },
  { field: 'nome', header: 'Nome', sortable: true },
  { field: 'preco', header: 'Preco', type: 'currency', sortable: true },
  { field: 'estoque', header: 'Estoque', type: 'number', align: 'center', sortable: true },
  { field: 'ativo', header: 'Status', type: 'boolean' },
  { field: 'created_at', header: 'Criado em', type: 'date' },
]

const form: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true, autofocus: true },
  { field: 'preco', label: 'Preco', type: 'currency', required: true, colSpan: 0.5 },
  { field: 'estoque', label: 'Estoque', type: 'number', colSpan: 0.5 },
  { field: 'created_at', label: 'Data', type: 'date', colSpan: 0.5 },
  { field: 'ativo', label: 'Ativo', type: 'switch', defaultValue: true },
]

const crud = useCrudManager<Produto>({
  endpoint: '/api/produtos/',
  columns,
  form,
})
</script>

<template>
  <WCrudView :crud="crud" title="Produtos" subtitle="Exemplo de CRUD basico" show-kpi />
</template>
