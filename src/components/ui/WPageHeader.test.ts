// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WPageHeader from './WPageHeader.vue'

function montar(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  return mount(WPageHeader, {
    props: { title: 'Transferência TA-0001', ...props },
    slots,
    global: { plugins: [PrimeVue] },
  })
}

describe('WPageHeader', () => {
  it('renderiza o título', () => {
    const w = montar()
    expect(w.find('.w-page-header-title').text()).toBe('Transferência TA-0001')
  })

  it('só renderiza o subtítulo quando ele existe', () => {
    expect(montar().find('.w-page-header-subtitle').exists()).toBe(false)
    const w = montar({ subtitle: 'MAR-SEMENTES-02 → FROTA-22013' })
    expect(w.find('.w-page-header-subtitle').text()).toBe('MAR-SEMENTES-02 → FROTA-22013')
  })

  it('rende o slot de ações', () => {
    const w = montar({}, { actions: '<button class="acao">Embarcar</button>' })
    expect(w.find('.w-page-header-actions .acao').exists()).toBe(true)
  })

  it('emite `action` no botão de conveniência', async () => {
    const w = montar({ actionLabel: 'Novo' })
    await w.find('.w-page-header-actions button').trigger('click')
    expect(w.emitted('action')).toHaveLength(1)
  })

  it('não renderiza o botão de conveniência sem `actionLabel`', () => {
    const w = montar()
    expect(w.find('.w-page-header-actions button').exists()).toBe(false)
  })
})
