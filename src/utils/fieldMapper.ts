import type { FieldDef, ColumnDef, SelectOption } from '@/types/crud'

export interface ApiFieldMeta {
  name: string
  label: string
  type: string
  required?: boolean
  max_length?: number
  choices?: { value: string; label: string }[]
  read_only?: boolean
  endpoint?: string
  option_label?: string
  option_value?: string
}

const TYPE_MAP: Record<string, FieldDef['type']> = {
  string: 'text',
  integer: 'number',
  decimal: 'number',
  float: 'number',
  boolean: 'switch',
  choice: 'select',
  fk: 'fk',
  date: 'date',
  datetime: 'datetime',
  email: 'email',
  url: 'text',
  slug: 'text',
  text: 'textarea',
}

export function mapApiFieldToFieldDef(apiField: ApiFieldMeta): FieldDef {
  const fieldType = TYPE_MAP[apiField.type] ?? 'text'

  const def: FieldDef = {
    field: apiField.name,
    label: apiField.label,
    type: fieldType,
    required: apiField.required ?? false,
  }

  if (apiField.type === 'decimal' || apiField.type === 'float') {
    def.minFractionDigits = 2
    def.maxFractionDigits = 2
  }

  if (apiField.type === 'boolean') {
    def.defaultValue = false
  }

  if (apiField.type === 'choice' && apiField.choices?.length) {
    def.options = apiField.choices.map((c) => ({
      label: c.label,
      value: c.value,
    })) as SelectOption[]
  }

  if (apiField.type === 'fk') {
    def.endpoint = apiField.endpoint
    if (apiField.option_label) def.optionLabel = apiField.option_label
    if (apiField.option_value) def.optionValue = apiField.option_value
  }

  return def
}

export function mapApiFieldsToFieldDefs(apiFields: ApiFieldMeta[]): FieldDef[] {
  return apiFields
    .filter((f) => !f.read_only && f.name !== 'id')
    .map(mapApiFieldToFieldDef)
}

const COLUMN_TYPE_MAP: Record<string, ColumnDef['type']> = {
  boolean: 'boolean',
  date: 'date',
  datetime: 'datetime',
  decimal: 'number',
  float: 'number',
  integer: 'number',
}

export function mapApiFieldToColumnDef(apiField: ApiFieldMeta): ColumnDef {
  // Para FK, exibe o campo _nome (ex: marca → marca_nome)
  const field = apiField.type === 'fk' ? `${apiField.name}_nome` : apiField.name
  return {
    field,
    header: apiField.label,
    type: COLUMN_TYPE_MAP[apiField.type],
    sortable: true,
  }
}

export function mapApiFieldsToColumnDefs(apiFields: ApiFieldMeta[], maxColumns = 6): ColumnDef[] {
  return apiFields
    .filter((f) => !f.read_only && f.name !== 'id')
    .slice(0, maxColumns)
    .map(mapApiFieldToColumnDef)
}
