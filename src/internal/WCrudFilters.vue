<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import WButton from '@/components/ui/WButton.vue'
import type { CrudManagerReturn } from '@/types/manager'
import type { ColumnDef } from '@/types/column'

/**
 * Interno do WCrudView (não exportado; mora fora de `components/` para não entrar no manifesto):
 * filtros declarativos de coluna, slot `toolbar-filters` e "Limpar filtros", nessa ordem e sem
 * elemento raiz. Existe para o mesmo bloco morar na toolbar (mesa) ou no drawer de filtros
 * (celular) sem duplicar template.
 */
defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  crud: CrudManagerReturn<any>
  columns: ColumnDef[]
  /** Nome do parâmetro da API de uma coluna (`filter.param` ou o `field`). */
  paramOf: (col: ColumnDef) => string
  /** Digitação do filtro de texto (o WCrudView aplica o atraso). */
  onText: (col: ColumnDef, value: string) => void
}>()

const booleanOptions = [
  { label: 'Sim', value: true },
  { label: 'Não', value: false },
]
</script>

<template>
  <template v-for="col in columns" :key="col.field">
    <InputText
      v-if="(col.filter?.type || 'text') === 'text'"
      :model-value="(crud.columnFilters[paramOf(col)] as string) ?? ''"
      :placeholder="col.filter?.placeholder || col.header"
      :aria-label="col.filter?.placeholder || col.header"
      size="small"
      @input="(e: Event) => onText(col, (e.target as HTMLInputElement).value)"
    />
    <Select
      v-else-if="col.filter?.type === 'select'"
      :model-value="crud.columnFilters[paramOf(col)]"
      :options="col.filter?.options"
      option-label="label"
      option-value="value"
      :placeholder="col.filter?.placeholder || col.header"
      :aria-label="col.filter?.placeholder || col.header"
      show-clear
      size="small"
      @update:model-value="(v: unknown) => crud.setColumnFilter(paramOf(col), v)"
    />
    <Select
      v-else-if="col.filter?.type === 'boolean'"
      :model-value="crud.columnFilters[paramOf(col)]"
      :options="booleanOptions"
      option-label="label"
      option-value="value"
      :placeholder="col.filter?.placeholder || col.header"
      :aria-label="col.filter?.placeholder || col.header"
      show-clear
      size="small"
      @update:model-value="(v: unknown) => crud.setColumnFilter(paramOf(col), v)"
    />
    <InputNumber
      v-else-if="col.filter?.type === 'numeric'"
      :model-value="(crud.columnFilters[paramOf(col)] as number) ?? null"
      :placeholder="col.filter?.placeholder || col.header"
      :aria-label="col.filter?.placeholder || col.header"
      size="small"
      @update:model-value="(v: number) => crud.setColumnFilter(paramOf(col), v)"
    />
  </template>
  <slot />
  <WButton
    v-if="Object.keys(crud.columnFilters).length"
    variant="ghost"
    label="Limpar filtros"
    icon="pi pi-filter-slash"
    size="sm"
    @click="crud.clearColumnFilters()"
  />
</template>
