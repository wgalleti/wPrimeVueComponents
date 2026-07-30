import { describe, it, expect } from 'vitest'
import { useDateInput } from './useDateInput'

const di = useDateInput() // date-only, valueFormat 'iso' (defaults)
const dt = useDateInput({ showTime: () => true })
const asDate = useDateInput({ valueFormat: () => 'date' })

describe('useDateInput — parse/format (timezone-safe, pt-BR)', () => {
  it('toDate: string YYYY-MM-DD vira Date LOCAL (sem off-by-one)', () => {
    const d = di.toDate('2024-03-15')!
    expect(d.getFullYear()).toBe(2024)
    expect(d.getMonth()).toBe(2) // março = 2
    expect(d.getDate()).toBe(15)
  })

  it('toDate: Date passa direto; vazio/inválido vira null', () => {
    const now = new Date()
    expect(di.toDate(now)).toBe(now)
    expect(di.toDate(null)).toBeNull()
    expect(di.toDate('')).toBeNull()
    expect(di.toDate('foo')).toBeNull()
  })

  it('toValue: Date vira string YYYY-MM-DD (iso)', () => {
    expect(di.toValue(new Date(2024, 2, 15))).toBe('2024-03-15')
    expect(di.toValue(null)).toBeNull()
  })

  it('toValue: valueFormat "date" retorna o próprio Date', () => {
    const d = new Date(2024, 2, 15)
    expect(asDate.toValue(d)).toBe(d)
  })

  it('round-trip string→Date→string preserva o dia (fuso BR)', () => {
    const s = '2024-01-01'
    expect(di.toValue(di.toDate(s))).toBe(s)
    const s2 = '2023-12-31'
    expect(di.toValue(di.toDate(s2))).toBe(s2)
  })

  it('toDisplay: Date vira DD/MM/YYYY', () => {
    expect(di.toDisplay(new Date(1988, 4, 30))).toBe('30/05/1988')
    expect(di.toDisplay(null)).toBe('')
  })

  it('fromDisplay: 30/05/1988 vira Date correto', () => {
    const d = di.fromDisplay('30/05/1988')!
    expect(d.getFullYear()).toBe(1988)
    expect(d.getMonth()).toBe(4)
    expect(d.getDate()).toBe(30)
  })

  it('fromDisplay: incompleto/inválido vira null (não comita durante digitação)', () => {
    expect(di.fromDisplay('30/05')).toBeNull()
    expect(di.fromDisplay('30/05/19')).toBeNull()
    expect(di.fromDisplay('32/13/2020')).toBeNull()
    expect(di.fromDisplay('')).toBeNull()
  })

  it('máscara: date-only vs datetime', () => {
    expect(di.mask()).toBe('##/##/####')
    expect(dt.mask()).toBe('##/##/#### ##:##')
  })

  it('today (date-only) zera a hora', () => {
    const t = di.today()
    expect(t.getHours()).toBe(0)
    expect(t.getMinutes()).toBe(0)
    expect(t.getSeconds()).toBe(0)
  })
})

describe('useDateInput — datetime (showTime)', () => {
  it('toValue inclui hora no formato ISO', () => {
    const out = dt.toValue(new Date(2024, 2, 15, 9, 5, 0)) as string
    expect(out).toBe('2024-03-15T09:05:00')
  })

  it('toDisplay inclui HH:mm', () => {
    expect(dt.toDisplay(new Date(2024, 2, 15, 9, 5))).toBe('15/03/2024 09:05')
  })

  it('fromDisplay parseia data + hora', () => {
    const d = dt.fromDisplay('15/03/2024 09:05')!
    expect(d.getHours()).toBe(9)
    expect(d.getMinutes()).toBe(5)
  })
})
