// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import WMeter from './WMeter.vue'
import { meterSeverity } from '@/utils/meter'

// ICU usa espaços especiais (NBSP / narrow-NBSP) entre símbolo e número.
const norm = (s: string | undefined) => (s ?? '').replace(/[\u00A0\u202F]/g, ' ')
const frame = () => new Promise((r) => requestAnimationFrame(() => r(undefined)))

const base = { label: 'Vendas do mês', value: 1200000, goal: 2000000, format: 'currency' as const }

function montar(props: Record<string, unknown> = {}, attrs: Record<string, unknown> = {}) {
  return mount(WMeter, { props: { ...base, ...props }, attrs })
}

describe('WMeter — render', () => {
  it('mostra valor de meta compactos e o percentual', () => {
    const w = montar()
    expect(norm(w.find('.w-meter__figures').text())).toBe('R$ 1,2 mi de R$ 2 mi')
    expect(w.find('.w-meter__percent').text()).toBe('60%')
  })

  it('role="meter" com min, max, now e texto', () => {
    const m = montar({ expected: 1000000 }).find('[role="meter"]')
    expect(m.attributes('aria-label')).toBe('Vendas do mês')
    expect(m.attributes('aria-valuemin')).toBe('0')
    expect(m.attributes('aria-valuemax')).toBe('2000000')
    expect(m.attributes('aria-valuenow')).toBe('1200000')
    expect(norm(m.attributes('aria-valuetext'))).toBe('R$ 1,2 mi de R$ 2 mi (60%)')
  })

  it('acima da meta: barra cheia, aria-valuenow no teto, percentual real', async () => {
    const w = montar({ value: 2400000 })
    await frame()
    await flushPromises()
    expect(w.find('[role="meter"]').attributes('aria-valuenow')).toBe('2000000')
    expect(w.find('.w-meter__percent').text()).toBe('120%')
    expect(w.find('.w-meter__fill').attributes('style')).toContain('--w-meter-fill: 1')
  })

  it('a barra nasce vazia e anima até a razão', async () => {
    const w = montar()
    expect(w.find('.w-meter__fill').attributes('style')).toContain('--w-meter-fill: 0')
    await frame()
    await flushPromises()
    expect(w.find('.w-meter__fill').attributes('style')).toContain('--w-meter-fill: 0.6')
  })

  it('ritmo vira marcador na posição e texto para leitor de tela', () => {
    const w = montar({ expected: 1000000 })
    expect(w.find('.w-meter__pace').attributes('style')).toContain('--w-meter-pace: 0.5')
    expect(w.find('.w-meter__pace').attributes('aria-hidden')).toBe('true')
    expect(norm(w.find('.w-meter__sr').text())).toBe('esperado hoje: R$ 1 mi')
  })

  it('sem meta: sem barra, "sem meta" no lugar', () => {
    for (const goal of [null, 0]) {
      const w = montar({ goal })
      expect(w.find('[role="meter"]').exists()).toBe(false)
      expect(w.find('.w-meter__no-goal').text()).toBe('sem meta')
      expect(w.classes()).toContain('w-meter--neutral')
    }
  })

  it('formato percent e notação standard', () => {
    expect(
      montar({ format: 'percent', value: 12.5, goal: 20 }).find('.w-meter__value').text(),
    ).toBe('12,5%')
    expect(norm(montar({ notation: 'standard' }).find('.w-meter__value').text())).toBe(
      'R$ 1.200.000,00',
    )
  })
})

describe('WMeter — regressões da revisão', () => {
  it('percentual sem erro de ponto flutuante no floor', () => {
    const pct = (value: number, goal: number) =>
      montar({ value, goal, format: 'number' }).find('.w-meter__percent').text()
    expect(pct(29, 100)).toBe('29%')
    expect(pct(57, 100)).toBe('57%')
    expect(pct(0.29, 1)).toBe('29%')
    expect(pct(99.6, 100)).toBe('99%')
  })

  it('ritmo 0 não desenha marcador nem texto (mesmo critério da severidade)', () => {
    const w = montar({ expected: 0 })
    expect(w.find('.w-meter__pace').exists()).toBe(false)
    expect(w.find('.w-meter__sr').exists()).toBe(false)
  })

  it('o ritmo é lido uma vez só: no span oculto, fora do aria-valuetext', () => {
    const w = montar({ expected: 1000000 })
    expect(w.find('[role="meter"]').attributes('aria-valuetext')).not.toContain('esperado')
    expect(w.findAll('.w-meter__sr')).toHaveLength(1)
  })
})

describe('WMeter — severidade', () => {
  it('automática pelo ritmo', () => {
    expect(meterSeverity({ value: 100, goal: 200, expected: 100 })).toBe('success')
    expect(meterSeverity({ value: 91, goal: 200, expected: 100 })).toBe('warning')
    expect(meterSeverity({ value: 89, goal: 200, expected: 100 })).toBe('danger')
    expect(meterSeverity({ value: 200, goal: 200 })).toBe('success')
    expect(meterSeverity({ value: 50, goal: 200 })).toBe('primary')
    expect(meterSeverity({ value: 50, goal: null })).toBe('neutral')
  })

  it('a prop vence a regra', () => {
    expect(montar({ expected: 2000000, severity: 'info' }).classes()).toContain('w-meter--info')
    expect(montar({ expected: 2000000 }).classes()).toContain('w-meter--danger')
  })
})

describe('WMeter — clique', () => {
  it('estático sem listener; botão de teclado com @click', async () => {
    expect(montar().element.tagName).toBe('ARTICLE')
    const w = montar({}, { onClick: () => undefined })
    expect(w.attributes('role')).toBe('button')
    expect(w.attributes('tabindex')).toBe('0')
    await w.trigger('click')
    await w.trigger('keydown', { key: 'Enter' })
    expect(w.emitted('click')).toHaveLength(2)
  })
})
