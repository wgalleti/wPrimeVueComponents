<script setup lang="ts">
import { WCrudView, useCrudManager } from '@wgalleti/primevue-components'
import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'

const columns: ColumnDef[] = [
  { field: 'id', header: '#', style: 'width: 60px', align: 'center' },
  { field: 'nome', header: 'Nome', sortable: true },
  { field: 'preco', header: 'Preço', type: 'currency', sortable: true },
  { field: 'estoque', header: 'Estoque', type: 'number', align: 'center' },
]
const form: FieldDef[] = [{ field: 'nome', label: 'Nome', required: true }]

// O provider com latência vem do pai (provide); aqui é um CRUD comum.
const crud = useCrudManager({ endpoint: '/api/produtos/', columns, form })
defineExpose({ crud })
</script>

<template>
  <WCrudView :crud="crud" title="Produtos" />
</template>
