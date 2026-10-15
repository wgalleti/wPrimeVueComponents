// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import WInlineCell from './WInlineCell.vue'

const Popover = {
  name: 'Popover',
  template: '<div class="popover-stub"><slot /></div>',
  emits: ['show', 'hide'],
  methods: { toggle() {}, hide() {} },
}

const montar = (props = {}) =>
  mount(WInlineCell, {
    props: { label: 'Prazo de #3', ...props },
    slots: { default: '16/10/2026', editor: '<input class="editor" />' },
    global: { stubs: { Popover } },
  })

describe('WInlineCell', () => {
  it('editável: o valor é um botão rotulado e o editor está no popover', () => {
    const w = montar()
    const botao = w.get('button.w-inline-cell__trigger')
    expect(botao.text()).toBe('16/10/2026')
    expect(botao.attributes('aria-label')).toBe('Prazo de #3')
    expect(w.find('.popover-stub .editor').exists()).toBe(true)
  })

  it('somente leitura: texto puro, sem botão nem popover', () => {
    const w = montar({ editable: false })
    expect(w.find('button').exists()).toBe(false)
    expect(w.find('.popover-stub').exists()).toBe(false)
    expect(w.get('.w-inline-cell__static').text()).toBe('16/10/2026')
    expect(w.classes()).not.toContain('w-inline-cell--editable')
  })

  it('repassa abrir e fechar do popover', async () => {
    const w = montar()
    const pop = w.findComponent({ name: 'Popover' })
    await pop.vm.$emit('show')
    await pop.vm.$emit('hide')
    expect(w.emitted('open')).toHaveLength(1)
    expect(w.emitted('close')).toHaveLength(1)
  })
})
