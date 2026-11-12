// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WSegmented from './WSegmented.vue'

const mountIt = (props: InstanceType<typeof WSegmented>['$props']) =>
  mount(WSegmented, { props, global: { plugins: [PrimeVue] } })

describe('WSegmented', () => {
  const options = [
    { label: 'Lista', value: 'lista' },
    { label: 'Cartões', value: 'cartoes' },
  ]

  it('seleciona uma opção e emite o valor', async () => {
    const w = mountIt({ options, modelValue: 'lista', ariaLabel: 'Visão' })
    expect(w.attributes('aria-label')).toBe('Visão')
    await w.findAll('[role="button"], button')[1].trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['cartoes'])
  })

  it('uma opção só: alternador booleano com aria-pressed', async () => {
    const w = mountIt({ options: [{ label: 'Só ativos', value: true }], modelValue: false })
    const btn = w.find('button')
    expect(btn.attributes('aria-pressed')).toBe('false')
    await btn.trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('uma opção só: alterna entre valor e null', async () => {
    const w = mountIt({ options: [{ label: 'Urgente', value: 'u' }], modelValue: 'u' })
    expect(w.find('button').attributes('aria-pressed')).toBe('true')
    await w.find('button').trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([null])
  })

  it('disabled bloqueia o alternador', () => {
    const w = mountIt({ options: [{ label: 'X', value: true }], modelValue: false, disabled: true })
    expect(w.find('button').attributes('disabled')).toBeDefined()
  })

  it('fluid marca a classe de largura total no grupo e no alternador', () => {
    expect(mountIt({ options, modelValue: 'lista', fluid: true }).classes()).toContain(
      'w-segmented--fluid',
    )
    expect(mountIt({ options, modelValue: 'lista' }).classes()).not.toContain('w-segmented--fluid')
    const t = mountIt({ options: [{ label: 'X', value: true }], modelValue: false, fluid: true })
    expect(t.classes()).toContain('w-segmented--fluid')
  })

  it('alternador ligado ganha fundo próprio, distinto do desligado', async () => {
    const t = mountIt({ options: [{ label: 'X', value: true }], modelValue: true })
    expect(t.classes()).toContain('w-segmented--on')
    expect(readFileSync('src/assets/ui.css', 'utf8')).toMatch(
      /\.w-segmented--toggle\.w-segmented--on \{\s*background: color-mix\(in srgb, var\(--w-primary\)/,
    )
  })
})
