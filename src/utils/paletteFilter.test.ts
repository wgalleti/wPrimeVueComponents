import { describe, it, expect } from 'vitest'
import { filterPaletteItems, normalizar } from './paletteFilter'

const itens = [
  { id: 'a', label: 'Relatório de Vendas', group: 'Financeiro' },
  { id: 'b', label: 'Vendas', group: 'Comercial' },
  { id: 'c', label: 'Clientes', group: 'Comercial' },
]

describe('filterPaletteItems', () => {
  it('ignora acento e caixa', () => {
    expect(filterPaletteItems(itens, 'RELATORIO').map((i) => i.id)).toEqual(['a'])
    expect(normalizar('  Ação ')).toBe('acao')
  })
  it('exige todas as palavras, no rótulo ou no grupo', () => {
    expect(filterPaletteItems(itens, 'vendas comercial').map((i) => i.id)).toEqual(['b'])
    expect(filterPaletteItems(itens, 'vendas xyz')).toEqual([])
  })
  it('acha pelo grupo e prioriza quem começa pelo termo', () => {
    expect(filterPaletteItems(itens, 'comercial').map((i) => i.id)).toEqual(['b', 'c'])
    expect(filterPaletteItems(itens, 'vendas').map((i) => i.id)).toEqual(['b', 'a'])
  })
  it('termo vazio devolve tudo', () => {
    expect(filterPaletteItems(itens, '  ')).toBe(itens)
  })
})
