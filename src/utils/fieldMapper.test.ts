import { describe, it, expect } from 'vitest'
import {
  mapApiFieldToFieldDef,
  mapApiFieldsToFieldDefs,
  mapApiFieldToColumnDef,
  mapApiFieldsToColumnDefs,
  type ApiFieldMeta,
} from './fieldMapper'

describe('mapApiFieldToFieldDef', () => {
  it('mapeia string → text e propaga required', () => {
    const def = mapApiFieldToFieldDef({
      name: 'nome',
      label: 'Nome',
      type: 'string',
      required: true,
    })
    expect(def).toMatchObject({ field: 'nome', label: 'Nome', type: 'text', required: true })
  })

  it('required é false por padrão', () => {
    expect(mapApiFieldToFieldDef({ name: 'obs', label: 'Obs', type: 'string' }).required).toBe(
      false,
    )
  })

  it('decimal/float → number com 2 casas', () => {
    const def = mapApiFieldToFieldDef({ name: 'preco', label: 'Preço', type: 'decimal' })
    expect(def.type).toBe('number')
    expect(def.minFractionDigits).toBe(2)
    expect(def.maxFractionDigits).toBe(2)
  })

  it('boolean → switch com defaultValue false', () => {
    const def = mapApiFieldToFieldDef({ name: 'ativo', label: 'Ativo', type: 'boolean' })
    expect(def.type).toBe('switch')
    expect(def.defaultValue).toBe(false)
  })

  it('choice → select com options {label,value}', () => {
    const def = mapApiFieldToFieldDef({
      name: 'status',
      label: 'Status',
      type: 'choice',
      choices: [
        { value: 'a', label: 'Ativo' },
        { value: 'i', label: 'Inativo' },
      ],
    })
    expect(def.type).toBe('select')
    expect(def.options).toEqual([
      { label: 'Ativo', value: 'a' },
      { label: 'Inativo', value: 'i' },
    ])
  })

  it('fk → fk com endpoint e option labels', () => {
    const def = mapApiFieldToFieldDef({
      name: 'marca',
      label: 'Marca',
      type: 'fk',
      endpoint: '/api/marcas/',
      option_label: 'nome',
      option_value: 'id',
    })
    expect(def).toMatchObject({
      type: 'fk',
      endpoint: '/api/marcas/',
      optionLabel: 'nome',
      optionValue: 'id',
    })
  })

  it('tipo desconhecido cai em text', () => {
    expect(mapApiFieldToFieldDef({ name: 'x', label: 'X', type: 'zzz' }).type).toBe('text')
  })
})

describe('mapApiFieldsToFieldDefs', () => {
  it('remove read_only e o campo id', () => {
    const fields: ApiFieldMeta[] = [
      { name: 'id', label: 'ID', type: 'integer' },
      { name: 'criado', label: 'Criado', type: 'datetime', read_only: true },
      { name: 'nome', label: 'Nome', type: 'string' },
    ]
    const defs = mapApiFieldsToFieldDefs(fields)
    expect(defs.map((d) => d.field)).toEqual(['nome'])
  })
})

describe('mapApiFieldToColumnDef', () => {
  it('fk vira campo _nome, sem type de coluna e sortable', () => {
    const col = mapApiFieldToColumnDef({ name: 'marca', label: 'Marca', type: 'fk' })
    expect(col).toEqual({ field: 'marca_nome', header: 'Marca', type: undefined, sortable: true })
  })

  it('mapeia tipos de coluna conhecidos', () => {
    expect(mapApiFieldToColumnDef({ name: 'ativo', label: 'Ativo', type: 'boolean' }).type).toBe(
      'boolean',
    )
    expect(mapApiFieldToColumnDef({ name: 'preco', label: 'Preço', type: 'decimal' }).type).toBe(
      'number',
    )
  })
})

describe('mapApiFieldsToColumnDefs', () => {
  it('filtra id/read_only e respeita o limite de colunas', () => {
    const fields: ApiFieldMeta[] = [
      { name: 'id', label: 'ID', type: 'integer' },
      ...Array.from({ length: 8 }, (_, i) => ({
        name: `c${i}`,
        label: `C${i}`,
        type: 'string' as const,
      })),
    ]
    const cols = mapApiFieldsToColumnDefs(fields, 3)
    expect(cols).toHaveLength(3)
    expect(cols.map((c) => c.field)).toEqual(['c0', 'c1', 'c2'])
  })
})
