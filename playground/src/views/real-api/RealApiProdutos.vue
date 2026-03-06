<script setup lang="ts">
import { WCrudView, useCrudManager, useFormatters } from '@wgalleti/primevue-components'
import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'

interface Produto {
  id: string
  codigo: string
  nome: string
  tipo: 'produto' | 'servico'
  ncm: string
  codigo_fabricante: string
  unidade: string
  preco_referencia: number
  ativo: boolean
}

const { formatCurrency } = useFormatters()

const tipoOptions = [
  { label: 'Produto', value: 'produto' },
  { label: 'Serviço', value: 'servico' },
]

const unidadeOptions = [
  { label: 'Unidade (un)', value: 'un' },
  { label: 'Litro (l)', value: 'l' },
  { label: 'Quilograma (kg)', value: 'kg' },
  { label: 'Hora (h)', value: 'h' },
  { label: 'Metro (m)', value: 'm' },
  { label: 'Peça (pc)', value: 'pc' },
  { label: 'Caixa (cx)', value: 'cx' },
  { label: 'Galão (gl)', value: 'gl' },
]

const unidadeMap: Record<string, string> = Object.fromEntries(
  unidadeOptions.map((o) => [o.value, o.label]),
)

const columns: ColumnDef[] = [
  { field: 'codigo', header: 'Código', style: 'width: 8rem', sortable: true },
  { field: 'nome', header: 'Nome', sortable: true },
  {
    field: 'tipo',
    header: 'Tipo',
    style: 'width: 7rem',
    tagValue: (v) => (v === 'produto' ? 'Produto' : 'Serviço'),
    tagSeverity: (v) => (v === 'produto' ? 'info' : 'warn'),
  },
  {
    field: 'unidade',
    header: 'Unidade',
    style: 'width: 8rem',
    format: (v) => unidadeMap[v as string] || (v as string),
  },
  {
    field: 'preco_referencia',
    header: 'Preço Ref.',
    style: 'width: 8rem',
    type: 'currency',
    sortable: true,
  },
  { field: 'ativo', header: 'Status', type: 'boolean', style: 'width: 6rem' },
]

const form: FieldDef[] = [
  {
    field: 'tipo',
    label: 'Tipo',
    type: 'select',
    options: tipoOptions,
    required: true,
    defaultValue: 'produto',
  },
  { field: 'nome', label: 'Nome', required: true, autofocus: 'create' },
  {
    field: 'codigo',
    label: 'Código',
    colSpan: 0.5,
    placeholder: 'Automático para produtos',
  },
  { field: 'codigo_fabricante', label: 'Código Fabricante', colSpan: 0.5 },
  { field: 'ncm', label: 'NCM', colSpan: 0.5, placeholder: '00000000' },
  {
    field: 'unidade',
    label: 'Unidade',
    type: 'select',
    options: unidadeOptions,
    required: true,
    colSpan: 0.5,
  },
  {
    field: 'preco_referencia',
    label: 'Preço Referência (R$)',
    type: 'number',
    minFractionDigits: 2,
    maxFractionDigits: 2,
    colSpan: 0.5,
  },
  { field: 'ativo', label: 'Ativo', type: 'switch', defaultValue: true },
]

const crud = useCrudManager<Produto>({
  endpoint: '/api/v1/produtos/',
  columns,
  form,
  pk: 'id',
})
</script>

<template>
  <WCrudView
    :crud="crud"
    title="Produtos e Serviços"
    subtitle="Dados reais via API WorkHard"
    dialog-width="560px"
    show-kpi
  />
</template>
