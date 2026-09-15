// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import WSectionAccordion from './WSectionAccordion.vue'
import WSectionPanel from './WSectionPanel.vue'

const template = `
  <WSectionAccordion v-bind="$attrs">
    <WSectionPanel value="dados" title="Dados" description="Cabeçalho" icon="pi pi-file">a</WSectionPanel>
    <WSectionPanel value="itens" title="Itens" :count="2">b</WSectionPanel>
    <WSectionPanel value="analises" title="Análises">c</WSectionPanel>
  </WSectionAccordion>
`

function montar(props: Record<string, unknown> = {}) {
  return mount(
    { components: { WSectionAccordion, WSectionPanel }, template, inheritAttrs: false },
    { attrs: props },
  )
}

const triggers = (w: VueWrapper) => w.findAll('.w-section-panel__trigger')
const abertas = (w: VueWrapper) => w.findAll('.w-section-panel--open')
const visiveis = (w: VueWrapper) =>
  w.findAll('.w-section-panel__content').filter((c) => c.isVisible())
const emitido = (w: VueWrapper) =>
  (w.findComponent(WSectionAccordion).emitted('update:modelValue') ?? []).map(
    (e) => (e as [string[]])[0],
  )

describe('WSectionAccordion — sem v-model (estado interno)', () => {
  it('todas as seções nascem abertas', () => {
    const w = montar()
    expect(abertas(w)).toHaveLength(3)
    expect(visiveis(w)).toHaveLength(3)
  })

  it('clicar fecha a seção e clicar de novo reabre', async () => {
    const w = montar()
    await triggers(w)[1].trigger('click')
    expect(abertas(w)).toHaveLength(2)
    expect(abertas(w).map((s) => s.text())).not.toContain('Itens2b')
    await triggers(w)[1].trigger('click')
    expect(abertas(w)).toHaveLength(3)
  })

  it('o corpo fechado continua montado (v-show)', async () => {
    const w = montar()
    await triggers(w)[0].trigger('click')
    expect(w.findAll('.w-section-panel__content')).toHaveLength(3)
    expect(visiveis(w)).toHaveLength(2)
  })
})

describe('WSectionAccordion — com v-model', () => {
  it('só as seções do modelValue ficam abertas', () => {
    const w = montar({ modelValue: ['itens'] })
    expect(abertas(w)).toHaveLength(1)
    expect(abertas(w)[0].text()).toContain('Itens')
  })

  it('clicar numa fechada emite a lista com ela', async () => {
    const w = montar({ modelValue: ['itens'] })
    await triggers(w)[0].trigger('click')
    expect(emitido(w)).toEqual([['itens', 'dados']])
  })

  it('clicar numa aberta emite a lista sem ela', async () => {
    const w = montar({ modelValue: ['dados', 'itens'] })
    await triggers(w)[1].trigger('click')
    expect(emitido(w)).toEqual([['dados']])
  })

  it('disabled no acordeão trava o clique de todas', async () => {
    const w = montar({ modelValue: ['dados'], disabled: true })
    await triggers(w)[1].trigger('click')
    expect(emitido(w)).toEqual([])
    expect(triggers(w)[1].attributes('disabled')).toBeDefined()
  })
})

describe('WSectionPanel — cabeçalho', () => {
  it('renderiza ícone, título, frase e contagem', () => {
    const w = montar()
    const dados = w.findAll('.w-section-panel')[0]
    expect(dados.find('.w-section-panel__icon i').classes()).toContain('pi-file')
    expect(dados.find('.w-section-panel__title').text()).toBe('Dados')
    expect(dados.find('.w-section-panel__description').text()).toBe('Cabeçalho')
    expect(dados.find('.w-section-panel__count').exists()).toBe(false)
    expect(w.findAll('.w-section-panel')[1].find('.w-section-panel__count').text()).toBe('2')
  })

  it('aria-expanded acompanha o estado e aria-controls aponta para o corpo', async () => {
    const w = montar()
    const trigger = triggers(w)[0]
    expect(trigger.attributes('aria-expanded')).toBe('true')
    const id = trigger.attributes('aria-controls')
    expect(w.find(`#${id}`).classes()).toContain('w-section-panel__content')
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('false')
  })

  it('o slot de ações fica fora do botão', () => {
    const w = mount(WSectionPanel, {
      props: { value: 'x', title: 'X' },
      slots: { default: 'corpo', actions: '<button class="acao">Vincular</button>' },
    })
    expect(w.find('.w-section-panel__actions .acao').exists()).toBe(true)
    expect(w.find('.w-section-panel__trigger .acao').exists()).toBe(false)
  })

  it('fora do acordeão tem estado próprio e começa aberta', async () => {
    const w = mount(WSectionPanel, { props: { value: 'x', title: 'X' }, slots: { default: 'corpo' } })
    expect(w.classes()).toContain('w-section-panel--open')
    await w.find('.w-section-panel__trigger').trigger('click')
    expect(w.classes()).not.toContain('w-section-panel--open')
  })
})
