import type { Ref } from 'vue'
import type { SelectOption } from './field'

/** Uma linha da tabela editável — estado local do consumidor, sem manager. */
export type EditableRow = Record<string, unknown>

/** Editor da célula. `none` (default) só exibe o valor formatado. */
export type EditableColumnEditor = 'number' | 'text' | 'select' | 'none'

/**
 * Coluna do WEditableTable. Diferente do `ColumnDef` (que descreve uma coluna de
 * listagem vinda da API), aqui a coluna também descreve COMO se edita a célula e
 * o que aparece no rodapé de totais.
 */
export interface EditableColumnDef {
  field: string
  header: string
  /** Largura fixa da coluna (`'120px'`, `120` → px, `'12rem'`). Sem isso a coluna é fluida. */
  width?: string | number
  /** Alinhamento do conteúdo. Default: `right` para `editor: 'number'`, senão `left`. */
  align?: 'left' | 'center' | 'right'
  editor?: EditableColumnEditor
  /** Opções do `editor: 'select'`. */
  options?: SelectOption[] | Ref<SelectOption[]>
  /** Campo do rótulo das `options` (default `label`). */
  optionLabel?: string
  /** Campo do valor das `options` (default `value`). */
  optionValue?: string
  /** Formatação da célula somente-leitura. Vence `decimals`/`suffix`. */
  format?: (value: unknown, row: EditableRow) => string
  /** Rodapé da coluna: soma (pt-BR, com `decimals`/`suffix`), nada, ou texto livre. */
  footer?: 'sum' | 'none' | ((rows: EditableRow[]) => string)
  /** Casas decimais na exibição e na soma do rodapé (default 2 quando numérico). */
  decimals?: number
  /** Sufixo colado ao valor formatado (ex.: `' L'`, `' kg'`). */
  suffix?: string
  placeholder?: string
  min?: number
  max?: number
  /** Trava a célula (a coluna inteira ou linha a linha). */
  disabled?: boolean | ((row: EditableRow, index: number) => boolean)
}
