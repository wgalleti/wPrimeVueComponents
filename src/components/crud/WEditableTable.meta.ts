import { defineComponentMeta } from '@/types/componentMeta'
import type { EditableColumnDef } from '@/types/editableTable'

const lotes = [
  { produto: 'HO APORE', lote: '32575111022', area: 160, volume: 12, volume_kg: 8400 },
  { produto: 'BMX GUEPARDO', lote: '32575111023', area: 100, volume: 8, volume_kg: 5600 },
]

const colunas: EditableColumnDef[] = [
  { field: 'produto', header: 'Produto' },
  { field: 'lote', header: 'Lote', width: 130 },
  { field: 'area', header: 'Área (ha)', width: 110, editor: 'number', decimals: 0, footer: 'sum' },
  { field: 'volume', header: 'A tratar', width: 100, editor: 'number', decimals: 0, footer: 'sum' },
  { field: 'volume_kg', header: 'Volume (kg)', width: 130, decimals: 0, footer: 'sum' },
]

const insumos = [
  { produto: 'CERTEZA N', classe: 'QUIMICO', dose: 2, quantidade: 16.8 },
  { produto: 'STARFIX', classe: 'BIOLOGICO', dose: 4, quantidade: 33.6 },
]

export default defineComponentMeta({
  category: 'CRUD',
  icon: 'pi pi-table',
  summary:
    'Tabela editável sobre estado local (sem manager): edição por célula, linha expansível e rodapé de totais.',
  examples: [
    {
      name: 'Lotes com totais',
      description: 'Colunas com footer: "sum" somam em pt-BR e fecham na régua do rodapé.',
      props: { modelValue: lotes, columns: colunas, removable: true, addLabel: 'Adicionar lote' },
    },
    {
      name: 'Subtabela (insumos)',
      description: 'A mesma tabela dentro do slot #expansion da linha de cima.',
      props: {
        modelValue: insumos,
        columns: [
          { field: 'produto', header: 'Produto', editor: 'text' },
          {
            field: 'classe',
            header: 'Classe',
            width: 140,
            editor: 'select',
            options: [
              { label: 'Biológico', value: 'BIOLOGICO' },
              { label: 'Químico', value: 'QUIMICO' },
              { label: 'Coadjuvante', value: 'COADJUVANTE' },
            ],
          },
          { field: 'dose', header: 'Dose', width: 100, editor: 'number', decimals: 1 },
          {
            field: 'quantidade',
            header: 'Quantidade',
            width: 130,
            decimals: 1,
            suffix: ' L',
            footer: 'sum',
          },
        ] satisfies EditableColumnDef[],
        removable: true,
        addLabel: 'Novo insumo',
      },
    },
    {
      name: 'Card (tablet em pé)',
      description:
        'Abaixo de 840px a MESMA tabela vira card. `card` por coluna dá a hierarquia: título, contexto, campo e leitura.',
      props: {
        modelValue: lotes,
        cardMode: 'always',
        addLabel: 'Adicionar lote',
        columns: [
          { field: 'produto', header: 'Produto', card: 'title' },
          { field: 'lote', header: 'Lote', card: 'meta' },
          { field: 'area', header: 'Área (ha)', editor: 'number', decimals: 0, footer: 'sum' },
          { field: 'volume', header: 'A tratar', editor: 'number', decimals: 0, footer: 'sum' },
          { field: 'volume_kg', header: 'Volume (kg)', decimals: 0, footer: 'sum', card: 'read' },
        ] satisfies EditableColumnDef[],
      },
    },
    {
      name: 'Parcelas (editor de data)',
      description:
        'A coluna `editor: "date"` edita com o WDatePicker e guarda `YYYY-MM-DD` na linha. A última parcela fecha a conta, então fica travada.',
      props: {
        modelValue: [
          { numero: '1/3', vencimento: '2026-10-05', valor: 500 },
          { numero: '2/3', vencimento: '2026-11-05', valor: 500 },
          { numero: '3/3', vencimento: '2026-12-05', valor: 500 },
        ],
        footerLabel: 'Total',
        columns: [
          { field: 'numero', header: 'Parcela', width: 90 },
          { field: 'vencimento', header: 'Vencimento', width: 160, editor: 'date' },
          {
            field: 'valor',
            header: 'Valor',
            width: 140,
            editor: 'number',
            decimals: 2,
            footer: 'sum',
            disabled: (_row, index) => index === 2,
          },
        ] satisfies EditableColumnDef[],
      },
    },
    {
      name: 'Vazia',
      props: { modelValue: [], columns: colunas, emptyMessage: 'Nenhum lote adicionado' },
    },
  ],
})
