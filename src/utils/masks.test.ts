import { describe, it, expect } from 'vitest'
import {
  stripMask,
  formatCpf,
  formatCnpj,
  formatCpfCnpj,
  formatTelefone,
  validateCpf,
  validateCnpj,
  validateCpfCnpj,
} from './masks'

// Fixtures com dígito verificador válido (conferidos manualmente).
const CPF_VALIDO = '52998224725'
const CNPJ_VALIDO = '11222333000181'

describe('stripMask', () => {
  it('remove tudo que não é dígito', () => {
    expect(stripMask('529.982.247-25')).toBe(CPF_VALIDO)
    expect(stripMask('(11) 98765-4321')).toBe('11987654321')
    expect(stripMask('')).toBe('')
  })
})

describe('formatCpf', () => {
  it('formata 11 dígitos (com e sem máscara na entrada)', () => {
    expect(formatCpf(CPF_VALIDO)).toBe('529.982.247-25')
    expect(formatCpf('529.982.247-25')).toBe('529.982.247-25')
  })
  it('retorna — para vazio/nulo', () => {
    expect(formatCpf(null)).toBe('—')
    expect(formatCpf(undefined)).toBe('—')
    expect(formatCpf('')).toBe('—')
  })
  it('devolve o valor original quando não tem 11 dígitos', () => {
    expect(formatCpf('123')).toBe('123')
  })
})

describe('formatCnpj', () => {
  it('formata 14 dígitos', () => {
    expect(formatCnpj(CNPJ_VALIDO)).toBe('11.222.333/0001-81')
  })
  it('— para vazio; original quando não tem 14 dígitos', () => {
    expect(formatCnpj(null)).toBe('—')
    expect(formatCnpj('123')).toBe('123')
  })
})

describe('formatCpfCnpj', () => {
  it('detecta CPF (11) e CNPJ (14) pelo tamanho', () => {
    expect(formatCpfCnpj(CPF_VALIDO)).toBe('529.982.247-25')
    expect(formatCpfCnpj(CNPJ_VALIDO)).toBe('11.222.333/0001-81')
  })
  it('— para vazio; original para tamanho inesperado', () => {
    expect(formatCpfCnpj(null)).toBe('—')
    expect(formatCpfCnpj('12345')).toBe('12345')
  })
})

describe('formatTelefone', () => {
  it('formata celular (11 dígitos) e fixo (10 dígitos)', () => {
    expect(formatTelefone('11987654321')).toBe('(11) 98765-4321')
    expect(formatTelefone('1123456789')).toBe('(11) 2345-6789')
  })
  it('— para vazio; original para tamanho inesperado', () => {
    expect(formatTelefone(null)).toBe('—')
    expect(formatTelefone('123')).toBe('123')
  })
})

describe('validateCpf', () => {
  it('retorna null para CPF válido (com ou sem máscara)', () => {
    expect(validateCpf(CPF_VALIDO)).toBeNull()
    expect(validateCpf('529.982.247-25')).toBeNull()
  })
  it('mensagem para tamanho incorreto', () => {
    expect(validateCpf('123')).toBe('CPF deve ter 11 dígitos.')
  })
  it('mensagem para todos os dígitos iguais', () => {
    expect(validateCpf('11111111111')).toBe('CPF inválido.')
  })
  it('mensagem para dígito verificador incorreto', () => {
    expect(validateCpf('52998224724')).toBe('CPF inválido.')
  })
  it('null para vazio (não valida ausência)', () => {
    expect(validateCpf(null)).toBeNull()
    expect(validateCpf('')).toBeNull()
  })
})

describe('validateCnpj', () => {
  it('retorna null para CNPJ válido', () => {
    expect(validateCnpj(CNPJ_VALIDO)).toBeNull()
    expect(validateCnpj('11.222.333/0001-81')).toBeNull()
  })
  it('mensagens para tamanho, repetição e dígito incorreto', () => {
    expect(validateCnpj('123')).toBe('CNPJ deve ter 14 dígitos.')
    expect(validateCnpj('00000000000000')).toBe('CNPJ inválido.')
    expect(validateCnpj('11222333000180')).toBe('CNPJ inválido.')
  })
})

describe('validateCpfCnpj', () => {
  it('valida CPF ou CNPJ pelo tamanho', () => {
    expect(validateCpfCnpj(CPF_VALIDO)).toBeNull()
    expect(validateCpfCnpj(CNPJ_VALIDO)).toBeNull()
  })
  it('mensagem para tamanho inesperado; null para vazio', () => {
    expect(validateCpfCnpj('12345')).toBe('CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.')
    expect(validateCpfCnpj(null)).toBeNull()
  })
})
