// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WStatusTag from './WStatusTag.vue'

describe('WStatusTag', () => {
  it('mapa padrão: rótulo pt-BR e classe de status própria (tokens do app)', () => {
    const w = mount(WStatusTag, { props: { value: 'pendente' }, global: { plugins: [PrimeVue] } })
    expect(w.text()).toBe('Pendente')
    expect(w.find('.p-tag').classes()).toEqual(expect.arrayContaining(['w-tag', 'w-tag--warn']))
  })

  it('valor fora do mapa cai em secondary com o próprio valor', () => {
    const w = mount(WStatusTag, { props: { value: 'xpto' }, global: { plugins: [PrimeVue] } })
    expect(w.text()).toBe('xpto')
    expect(w.find('.p-tag').classes()).toContain('w-tag--secondary')
  })

  it('removable mostra o botão acessível e emite remove', async () => {
    const w = mount(WStatusTag, {
      props: { value: 'ativo', removable: true },
      global: { plugins: [PrimeVue] },
    })
    const btn = w.find('button')
    expect(btn.attributes('aria-label')).toBe('Remover Ativo')
    await btn.trigger('click')
    expect(w.emitted('remove')).toHaveLength(1)
  })

  it('sem removable não há botão', () => {
    const w = mount(WStatusTag, { props: { value: 'ativo' }, global: { plugins: [PrimeVue] } })
    expect(w.find('button').exists()).toBe(false)
  })
})
