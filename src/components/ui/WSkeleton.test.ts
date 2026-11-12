// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WSkeleton from './WSkeleton.vue'

describe('WSkeleton', () => {
  it('linhas desenha n linhas e fica oculto para leitor de tela', () => {
    const w = mount(WSkeleton, { props: { variant: 'rows', count: 4 } })
    expect(w.findAll('.w-skeleton__linha')).toHaveLength(4)
    expect(w.attributes('aria-hidden')).toBe('true')
    expect(w.classes()).toContain('w-skeleton--rows')
  })
  it('cartão tem título e duas linhas', () => {
    const w = mount(WSkeleton, { props: { variant: 'card' } })
    expect(w.find('.w-skeleton__titulo').exists()).toBe(true)
    expect(w.findAll('.w-skeleton__linha')).toHaveLength(2)
  })
  it('texto encurta a última linha', () => {
    const w = mount(WSkeleton, { props: { variant: 'text', count: 3 } })
    const l = w.findAll('.w-skeleton__linha')
    expect(l[2].classes()).toContain('w-skeleton__linha--curta')
    expect(l[0].classes()).not.toContain('w-skeleton__linha--curta')
  })
  it('block desenha um retângulo, md por padrão', () => {
    const w = mount(WSkeleton, { props: { variant: 'block' } })
    expect(w.findAll('.w-skeleton__bloco')).toHaveLength(1)
    expect(w.classes()).toContain('w-skeleton--block')
  })
  it('size vira classe; height/width viram knobs inline', () => {
    const w = mount(WSkeleton, {
      props: { variant: 'card', size: 'lg', height: 'var(--w-chart-h)', width: 'var(--w-kpi-min)' },
    })
    expect(w.classes()).toContain('w-skeleton--lg')
    const style = w.attributes('style') ?? ''
    expect(style).toContain('--w-skeleton-h: var(--w-chart-h)')
    expect(style).toContain('--w-skeleton-w: var(--w-kpi-min)')
  })
})
