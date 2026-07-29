import { describe, it, expect } from 'vitest'
import { useFormatters } from './useFormatters'

// Fora de um componente, o inject cai no default (pt-BR / BRL) — e' o que queremos testar.
const f = useFormatters()
// ICU usa espacos especiais (NBSP / narrow-NBSP) entre simbolo e numero; normalizamos.
const spaces = /[\u00A0\u202F]/g

describe('useFormatters — moeda/numero/percentual (default pt-BR)', () => {
  it('formatCurrency: BRL com — para nulo', () => {
    const out = f.formatCurrency(1234.56).replace(spaces, ' ')
    expect(out).toContain('R$')
    expect(out).toContain('1.234,56')
    expect(f.formatCurrency(null)).toBe('—')
  })

  it('formatNumber: agrupamento pt-BR e casas decimais', () => {
    expect(f.formatNumber(1234.5)).toBe('1.234,50')
    expect(f.formatNumber(10, 0)).toBe('10')
    expect(f.formatNumber(null)).toBe('—')
  })

  it('formatPercent: sufixo % com 2 casas', () => {
    expect(f.formatPercent(15)).toBe('15,00%')
    expect(f.formatPercent(null)).toBe('—')
  })

  it('formatDate: delega para o util (DD/MM/YYYY)', () => {
    expect(f.formatDate('2024-03-15')).toBe('15/03/2024')
  })

  it('reexporta os utils de mascara', () => {
    expect(f.formatCpf('52998224725')).toBe('529.982.247-25')
    expect(f.validateCpf('52998224725')).toBeNull()
  })
})
