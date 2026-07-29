import { describe, it, expect } from 'vitest'
import {
  parseDate,
  toDateString,
  toDateTimeString,
  formatDateValue,
  formatDateTimeValue,
} from './dates'

describe('parseDate', () => {
  it('retorna null para vazio/nulo', () => {
    expect(parseDate(null)).toBeNull()
    expect(parseDate(undefined)).toBeNull()
    expect(parseDate('')).toBeNull()
  })
  it('passa um Date adiante sem alterar (mesma referência)', () => {
    const d = new Date(2024, 2, 15)
    expect(parseDate(d)).toBe(d)
  })
  it('parseia string YYYY-MM-DD (estrito)', () => {
    const d = parseDate('2024-03-15')
    expect(d).toBeInstanceOf(Date)
    expect(toDateString(d)).toBe('2024-03-15')
  })
})

describe('toDateString', () => {
  it('null para vazio', () => {
    expect(toDateString(null)).toBeNull()
  })
  it('string passa adiante', () => {
    expect(toDateString('2024-03-15')).toBe('2024-03-15')
  })
  it('Date → YYYY-MM-DD (local)', () => {
    expect(toDateString(new Date(2024, 2, 15))).toBe('2024-03-15')
  })
})

describe('toDateTimeString', () => {
  it('null para vazio; string passa adiante', () => {
    expect(toDateTimeString(null)).toBeNull()
    expect(toDateTimeString('2024-03-15T10:30:00Z')).toBe('2024-03-15T10:30:00Z')
  })
  it('Date → ISO em UTC (estável independente do fuso)', () => {
    expect(toDateTimeString(new Date(Date.UTC(2024, 2, 15, 10, 30, 0)))).toBe(
      '2024-03-15T10:30:00.000Z',
    )
  })
})

describe('formatDateValue', () => {
  it('— para vazio', () => {
    expect(formatDateValue(null)).toBe('—')
    expect(formatDateValue('')).toBe('—')
  })
  it('formata no padrão DD/MM/YYYY', () => {
    expect(formatDateValue('2024-03-15')).toBe('15/03/2024')
  })
  it('respeita formato customizado', () => {
    expect(formatDateValue('2024-03-15', 'YYYY/MM/DD')).toBe('2024/03/15')
  })
})

describe('formatDateTimeValue', () => {
  it('— para vazio', () => {
    expect(formatDateTimeValue(null)).toBe('—')
  })
  it('formata DD/MM/YYYY HH:mm', () => {
    expect(formatDateTimeValue(new Date(2024, 2, 15, 14, 30))).toBe('15/03/2024 14:30')
  })
})
