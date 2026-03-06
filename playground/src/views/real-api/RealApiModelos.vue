<script setup lang="ts">
import { WCrudView, useCrudManager } from '@wgalleti/primevue-components'
import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'

interface Modelo {
  id: string
  nome: string
  marca: string
  marca_nome: string
}

const columns: ColumnDef[] = [
  { field: 'nome', header: 'Nome', sortable: true },
  { field: 'marca_nome', header: 'Marca', sortable: true },
]

const form: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true, autofocus: true },
  {
    field: 'marca',
    label: 'Marca',
    type: 'fk',
    endpoint: '/api/v1/marcas/',
    optionLabel: 'nome',
    required: true,
  },
]

const crud = useCrudManager<Modelo>({
  endpoint: '/api/v1/modelos/',
  columns,
  form,
  pk: 'id',
})
</script>

<template>
  <WCrudView
    :crud="crud"
    title="Modelos de Equipamento"
    subtitle="FK com CRUD embutido no AutoComplete"
    dialog-width="480px"
    show-kpi
  />
</template>
