// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import WStepFlow from './WStepFlow.vue'
import WStepSection from './WStepSection.vue'

const template = `
  <WStepFlow v-bind="$attrs">
    <WStepSection :step="1" title="Contexto" summary="resumo 1">a</WStepSection>
    <WStepSection :step="2" title="Sementes" :count="2">b</WStepSection>
    <WStepSection :step="3" title="Resumo">c</WStepSection>
  </WStepFlow>
`

function montar(props: Record<string, unknown> = {}, options: Record<string, unknown> = {}) {
  return mount(
    { components: { WStepFlow, WStepSection }, template, inheritAttrs: false },
    { attrs: props, ...options },
  )
}

const cabecalhos = (w: VueWrapper) => w.findAll('.w-step-section__trigger')
const abertas = (w: VueWrapper) => w.findAll('.w-step-section--open')
const emitido = (w: VueWrapper) =>
  (w.findComponent(WStepFlow).emitted('update:modelValue') ?? []).map((e) => (e as [number])[0])

describe('WStepFlow — abrir e fechar', () => {
  it('só a etapa do modelValue fica aberta', () => {
    const w = montar({ modelValue: 2 })
    expect(abertas(w)).toHaveLength(1)
    expect(abertas(w)[0].text()).toContain('Sementes')
  })

  it('modelValue 0 fecha todas', () => {
    expect(abertas(montar({ modelValue: 0 }))).toHaveLength(0)
  })

  it('clicar numa etapa fechada emite o número dela', async () => {
    const w = montar({ modelValue: 1 })
    await cabecalhos(w)[2].trigger('click')
    expect(emitido(w)).toEqual([3])
  })

  it('clicar na etapa aberta emite 0 (fecha tudo)', async () => {
    const w = montar({ modelValue: 1 })
    await cabecalhos(w)[0].trigger('click')
    expect(emitido(w)).toEqual([0])
  })

  it('disabled no flow trava o clique de todas', async () => {
    const w = montar({ modelValue: 1, disabled: true })
    await cabecalhos(w)[1].trigger('click')
    expect(emitido(w)).toEqual([])
  })
})

describe('WStepSection — cabeçalho e linha conectora', () => {
  it('badge da etapa aberta ganha o modificador --on', () => {
    const w = montar({ modelValue: 2 })
    const badges = w.findAll('.w-step-section__badge')
    expect(badges.map((b) => b.classes().includes('w-step-section__badge--on'))).toEqual([
      false,
      true,
      false,
    ])
    expect(badges.map((b) => b.text())).toEqual(['1', '2', '3'])
  })

  // Dentro do flow toda etapa tem linha; a da última é apagada pelo CSS
  // (`:last-child`) — sem registro em runtime, sem tick de atraso.
  it('dentro do flow toda etapa desenha a linha conectora', () => {
    const w = montar({ modelValue: 0 })
    expect(w.findAll('.w-step-section__line')).toHaveLength(3)
  })

  it('etapa avulsa (fora do flow) não desenha linha nenhuma', () => {
    const w = mount(WStepSection, { props: { step: 1, title: 'Etapa' } })
    expect(w.find('.w-step-section__line').exists()).toBe(false)
  })

  it('resumo e contagem aparecem no cabeçalho', () => {
    const w = montar({ modelValue: 0 })
    expect(w.find('.w-step-section__summary').text()).toBe('resumo 1')
    expect(w.find('.w-step-section__count').text()).toBe('2')
  })

  it('o conteúdo só existe quando a etapa está aberta', () => {
    expect(montar({ modelValue: 1 }).findAll('.w-step-section__content')).toHaveLength(1)
    expect(montar({ modelValue: 0 }).findAll('.w-step-section__content')).toHaveLength(0)
  })

  it('rodapé só quando o slot #footer existe', () => {
    const w = mount(WStepSection, {
      props: { step: 1, title: 'Etapa' },
      slots: { footer: '<button>Continuar</button>' },
    })
    expect(w.find('.w-step-section__footer').text()).toBe('Continuar')
  })
})

describe('WStepFlow — régua horizontal', () => {
  const horizontal = (
    modelValue: number,
    extras: Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ) => montar({ modelValue, orientation: 'horizontal', ...extras }, options)

  it('cada etapa vira um trecho da régua', () => {
    const w = horizontal(2)
    expect(w.findAll('.w-step-section--horizontal')).toHaveLength(3)
    expect(w.findAll('.w-step-section__head')).toHaveLength(3)
    // A coluna vertical (rail + card) não é desenhada na horizontal.
    expect(w.find('.w-step-section__rail').exists()).toBe(false)
    expect(w.find('.w-step-section__card').exists()).toBe(false)
  })

  it('só a etapa ativa desenha o corpo, e num painel único', () => {
    const w = horizontal(2)
    expect(w.findAll('.w-step-section__panel')).toHaveLength(1)
    expect(w.findAll('.w-step-section__content')).toHaveLength(1)
    expect(w.find('.w-step-section__panel').text()).toBe('b')
  })

  it('modelValue 0 não desenha painel nenhum', () => {
    expect(horizontal(0).findAll('.w-step-section__panel')).toHaveLength(0)
  })

  it('clicar num cabeçalho alterna a etapa', async () => {
    const w = horizontal(1)
    await cabecalhos(w)[2].trigger('click')
    expect(emitido(w)).toEqual([3])
    await cabecalhos(w)[0].trigger('click')
    expect(emitido(w)).toEqual([3, 0])
  })

  it('disabled continua travando o clique', async () => {
    const w = horizontal(1, { disabled: true })
    await cabecalhos(w)[1].trigger('click')
    expect(emitido(w)).toEqual([])
  })

  it('etapas antes da ativa ficam marcadas como percorridas (✓)', () => {
    const w = horizontal(3)
    expect(w.findAll('.w-step-section--done')).toHaveLength(2)
    const badges = w.findAll('.w-step-section__badge')
    expect(badges.map((b) => b.classes().includes('w-step-section__badge--done'))).toEqual([
      true,
      true,
      false,
    ])
    // A percorrida troca o número pelo ✓; a ativa continua numerada.
    expect(badges[0].find('.pi-check').exists()).toBe(true)
    expect(badges[2].text()).toBe('3')
    expect(badges[2].classes()).toContain('w-step-section__badge--on')
  })

  it('sem etapa aberta ninguém é percorrida', () => {
    expect(horizontal(0).findAll('.w-step-section--done')).toHaveLength(0)
  })

  it('a etapa aberta anuncia aria-current="step"', () => {
    const w = horizontal(2)
    expect(cabecalhos(w).map((b) => b.attributes('aria-current'))).toEqual([
      undefined,
      'step',
      undefined,
    ])
  })

  it('a linha conectora existe em toda etapa (a da primeira é apagada por CSS)', () => {
    expect(horizontal(1).findAll('.w-step-section__line')).toHaveLength(3)
  })

  it('as setas andam pela régua', async () => {
    const w = horizontal(1, {}, { attachTo: document.body })
    const botoes = cabecalhos(w)
    ;(botoes[0].element as HTMLButtonElement).focus()
    await w.find('.w-step-flow').trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(botoes[1].element)
    await w.find('.w-step-flow').trigger('keydown', { key: 'End' })
    expect(document.activeElement).toBe(botoes[2].element)
    // Circula: da última a direita volta para a primeira.
    await w.find('.w-step-flow').trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(botoes[0].element)
    w.unmount()
  })

  it('na vertical as setas não mexem no foco', async () => {
    const w = montar({ modelValue: 1 }, { attachTo: document.body })
    const botoes = cabecalhos(w)
    ;(botoes[0].element as HTMLButtonElement).focus()
    await w.find('.w-step-flow').trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(botoes[0].element)
    w.unmount()
  })
})

describe('WStepSection — avulso (sem WStepFlow)', () => {
  it('abre e fecha sozinho, começando aberto', async () => {
    const w = mount(WStepSection, { props: { step: 1, title: 'Etapa' }, slots: { default: 'x' } })
    expect(w.find('.w-step-section__content').exists()).toBe(true)
    await w.find('.w-step-section__trigger').trigger('click')
    expect(w.find('.w-step-section__content').exists()).toBe(false)
  })
})
