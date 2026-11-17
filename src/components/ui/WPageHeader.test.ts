// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import WButton from './WButton.vue'
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

describe('WPageHeader — ações no celular', () => {
  it('o botão só-ícone das ações carrega a classe que o CSS exclui do esticar', () => {
    const w = mount(WPageHeader, {
      props: { title: 'Lista', actionLabel: 'Novo' },
      slots: { actions: '<WButton icon-only icon="pi pi-refresh" aria-label="Atualizar" />' },
      global: { plugins: [PrimeVue], components: { WButton } },
    })
    const botoes = w.findAll('.w-page-header-actions .p-button')
    expect(botoes[0].classes()).toContain('p-button-icon-only')
    expect(botoes[1].classes()).not.toContain('p-button-icon-only')
  })

  it('< 840 (CSS): o de texto cresce (flex 1 1 auto) e o só-ícone fica no tamanho dele', () => {
    // jsdom não calcula layout: confere a regra em touch.css.
    const css = readFileSync('src/assets/touch.css', 'utf8')
    expect(css).toMatch(
      /\.w-page-header-actions \.p-button:not\(\.p-button-icon-only\) \{\s*flex: 1 1 auto;/,
    )
    expect(css).toMatch(
      /\.w-page-header-actions \.p-button\.p-button-icon-only \{\s*flex: 0 0 auto;/,
    )
  })
})
