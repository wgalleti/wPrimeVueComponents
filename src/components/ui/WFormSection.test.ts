// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WFormSection from './WFormSection.vue'

function montar(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  return mount(WFormSection, {
    props: { title: 'Talhões de destino', ...props },
    slots: { default: '<p class="corpo">conteúdo</p>', ...slots },
  })
}

describe('WFormSection', () => {
  it('renderiza título e corpo', () => {
    const w = montar()
    expect(w.find('.w-form-section__title').text()).toBe('Talhões de destino')
    expect(w.find('.w-form-section__body .corpo').exists()).toBe(true)
  })

  it('só renderiza a descrição quando ela existe', () => {
    expect(montar().find('.w-form-section__description').exists()).toBe(false)
    const w = montar({ description: '2 talhões · 223 ha' })
    expect(w.find('.w-form-section__description').text()).toBe('2 talhões · 223 ha')
  })

  it('rende o slot de ações', () => {
    const w = montar({}, { actions: '<button class="acao">Escolher</button>' })
    expect(w.find('.w-form-section__actions .acao').exists()).toBe(true)
  })

  it('não renderiza o bloco de ações sem o slot', () => {
    expect(montar().find('.w-form-section__actions').exists()).toBe(false)
  })

  it('aplica a classe da variante', () => {
    expect(montar({ variant: 'muted' }).classes()).toContain('w-form-section--muted')
    expect(montar().classes()).toEqual(['w-form-section'])
  })
})
