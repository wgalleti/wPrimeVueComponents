import { describe, it, expect } from 'vitest'
import { extractApiError, useApiError } from './useApiError'

describe('extractApiError', () => {
  it('fallback para entrada que não é objeto', () => {
    expect(extractApiError(null)).toBe('Erro inesperado')
    expect(extractApiError('boom')).toBe('Erro inesperado')
    expect(extractApiError(undefined, 'Falhou')).toBe('Falhou')
  })

  it('sem response.data usa message (ou fallback)', () => {
    expect(extractApiError({ message: 'Network Error' })).toBe('Network Error')
    expect(extractApiError({}, 'Falhou')).toBe('Falhou')
  })

  it('detail string', () => {
    expect(extractApiError({ response: { data: { detail: 'Não encontrado' } } })).toBe(
      'Não encontrado',
    )
  })

  it('detail array de strings é juntado', () => {
    expect(extractApiError({ response: { data: { detail: ['Falha A', 'Falha B'] } } })).toBe(
      'Falha A Falha B',
    )
  })

  it('non_field_errors tem prioridade', () => {
    expect(extractApiError({ response: { data: { non_field_errors: ['Erro geral'] } } })).toBe(
      'Erro geral',
    )
  })

  it('erros por campo viram "Label: mensagem" (nome formatado)', () => {
    const msg = extractApiError({
      response: {
        data: { email: ['E-mail inválido.'], primeiro_nome: 'Campo obrigatório.' },
      },
    })
    expect(msg).toBe('Email: E-mail inválido.\nPrimeiro nome: Campo obrigatório.')
  })

  it('data sem mensagem extraível cai no fallback', () => {
    expect(extractApiError({ response: { data: { detail: {} } } }, 'Falhou')).toBe('Falhou')
    expect(extractApiError({ response: { data: { detail: 123 } } }, 'Falhou')).toBe('Falhou')
  })
})

describe('useApiError', () => {
  it('expõe extractApiError', () => {
    expect(useApiError().extractApiError).toBe(extractApiError)
  })
})
