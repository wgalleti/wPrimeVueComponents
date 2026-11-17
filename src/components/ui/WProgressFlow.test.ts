// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WProgressFlow from './WProgressFlow.vue'

const steps = [
  { key: 'a', label: 'Aguardando data', description: 'Sem data' },
  { key: 'b', label: 'Agendado' },
  { key: 'c', label: 'Em rota' },
]

describe('WProgressFlow', () => {
  it('marca feita, atual e pendente e mostra a descrição quando há', () => {
    const w = mount(WProgressFlow, { props: { steps, currentStep: 'b' } })
    const itens = w.findAll('.w-progress-flow__step')
    expect(itens.map((i) => i.classes().find((c) => /--(done|current|pending)$/.test(c)))).toEqual([
      'w-progress-flow__step--done',
      'w-progress-flow__step--current',
      'w-progress-flow__step--pending',
    ])
    expect(itens[0].find('.w-progress-flow__description').text()).toBe('Sem data')
    expect(itens[1].find('.w-progress-flow__description').exists()).toBe(false)
  })

  it('a orientação vira classe da raiz', () => {
    expect(mount(WProgressFlow, { props: { steps, currentStep: 'a' } }).classes()).toContain(
      'w-progress-flow--horizontal',
    )
    expect(
      mount(WProgressFlow, {
        props: { steps, currentStep: 'a', orientation: 'vertical' },
      }).classes(),
    ).toContain('w-progress-flow--vertical')
  })

  it('celular (< 600): a horizontal empilha com o conector vertical (CSS)', () => {
    // jsdom não calcula layout: confere que a regra da faixa existe em ui.css.
    const css = readFileSync('src/assets/ui.css', 'utf8')
    const bloco =
      css.match(
        /@media \(max-width: 599px\) \{(\s*\.w-progress-flow--horizontal[^@]*?)\n\}/,
      )?.[1] ?? ''
    expect(bloco).toMatch(/\.w-progress-flow--horizontal \{\s*flex-direction: column;/)
    expect(bloco).toMatch(/\.w-progress-flow__step \{[^}]*flex-direction: row;/)
    expect(bloco).toMatch(/::after \{[^}]*width: 1px;/)
  })
})
