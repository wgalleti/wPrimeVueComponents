import { describe, it, expect } from 'vitest'
import { isFieldVisible, validateFormRecord } from './formRecord'
import type { FieldDef } from '@/types/field'

const campos: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true },
  {
    field: 'preco',
    label: 'Preço',
    required: true,
    visible: (f) => !f.bonificacao,
    validate: (v) => (Number(v) > 0 ? null : 'Preço deve ser maior que zero'),
  },
  { field: 'obs', label: 'Obs', required: true, visible: false },
  { field: 'codigo', label: 'Código', required: true, visible: (_f, isEditing) => isEditing },
]

describe('isFieldVisible', () => {
  it('sem visible = visível; boolean e função são respeitados', () => {
    expect(isFieldVisible(campos[0], {})).toBe(true)
    expect(isFieldVisible(campos[2], {})).toBe(false)
    expect(isFieldVisible(campos[1], { bonificacao: true })).toBe(false)
    expect(isFieldVisible(campos[3], {}, true)).toBe(true)
    expect(isFieldVisible(campos[3], {}, false)).toBe(false)
  })
})

describe('validateFormRecord', () => {
  it('validate vence required e required barra vazio', () => {
    expect(validateFormRecord(campos, { nome: '', preco: 1 })).toBe('Nome é obrigatório')
    expect(validateFormRecord(campos, { nome: 'x', preco: 0 })).toBe(
      'Preço deve ser maior que zero',
    )
  })

  it('campo oculto pelo form não é validado (nem required nem validate)', () => {
    expect(validateFormRecord(campos, { nome: 'x', preco: null, bonificacao: true })).toBeNull()
  })

  it('visible que depende de isEditing usa o modo informado', () => {
    expect(validateFormRecord(campos, { nome: 'x', preco: 1 }, false)).toBeNull()
    expect(validateFormRecord(campos, { nome: 'x', preco: 1 }, true)).toBe('Código é obrigatório')
  })
})
