// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { createMemoryHistory, createRouter } from 'vue-router'
import WKpiCard from './WKpiCard.vue'
import { hasListener } from '@/utils/interactiveCard'
import { W_CONFIG_KEY } from '@/types/plugin'

const Tela = { name: 'Tela', render: () => null }

function criarRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: Tela },
      { path: '/vendas', name: 'vendas', component: Tela },
    ],
  })
}

const base = { label: 'Vendas', value: 'R$ 1,2 mi', icon: 'pi pi-dollar' }

function montar(props: Record<string, unknown> = {}, attrs: Record<string, unknown> = {}) {
  return mount(WKpiCard, {
    props: { ...base, ...props },
    attrs,
    global: { plugins: [PrimeVue] },
  })
}

describe('WKpiCard — render', () => {
  it('sem to nem @click é um article estático, fora da ordem de tabulação', () => {
    const w = montar()
    expect(w.element.tagName).toBe('ARTICLE')
    expect(w.attributes('tabindex')).toBeUndefined()
    expect(w.classes()).not.toContain('w-kpi-card--interactive')
    expect(w.find('.w-kpi-card__label').text()).toBe('Vendas')
  })

  it('compact põe o rótulo na linha do ícone', () => {
    const w = montar({ size: 'compact' })
    expect(w.classes()).toContain('w-kpi-card--compact')
    expect(w.find('.w-kpi-card__header .w-kpi-card__label').exists()).toBe(true)
    expect(w.find('.w-kpi-card__content .w-kpi-card__label').exists()).toBe(false)
  })
})

describe('WKpiCard — tint', () => {
  it('por padrão o tom pinta só o ícone', () => {
    expect(montar({ severity: 'danger' }).classes()).not.toContain('w-kpi-card--tint-value')
  })

  it("tint='value' aplica a classe que pinta o valor", () => {
    const w = montar({ severity: 'danger', tint: 'value' })
    expect(w.classes()).toContain('w-kpi-card--tint-value')
    expect(w.classes()).toContain('w-kpi-card--danger')
  })
})

describe('WKpiCard — clique e teclado', () => {
  it('com @click vira botão focável e emite no clique', async () => {
    const onClick = () => undefined
    const w = montar({}, { onClick })
    expect(w.element.tagName).toBe('DIV')
    expect(w.attributes('role')).toBe('button')
    expect(w.attributes('tabindex')).toBe('0')
    expect(w.classes()).toContain('w-kpi-card--interactive')
    await w.trigger('click')
    expect(w.emitted('click')).toHaveLength(1)
  })

  it('Enter e Espaço ativam; outra tecla não', async () => {
    const w = montar({}, { onClick: () => undefined })
    await w.trigger('keydown', { key: 'Enter' })
    await w.trigger('keydown', { key: ' ' })
    await w.trigger('keydown', { key: 'a' })
    expect(w.emitted('click')).toHaveLength(2)
  })

  it('com to vira link do router', async () => {
    const router = criarRouter()
    await router.push('/')
    const w = mount(WKpiCard, {
      props: { ...base, to: { name: 'vendas' } },
      global: { plugins: [PrimeVue, router] },
    })
    expect(w.element.tagName).toBe('A')
    expect(w.attributes('href')).toBe('/vendas')
    expect(w.classes()).toContain('w-kpi-card--interactive')
    await w.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('vendas')
    expect(w.emitted('click')).toHaveLength(1)
  })
})

describe('WKpiCard — sparkline', () => {
  it('desenha linha e área decorativas', () => {
    const w = montar({ spark: [1, 4, 2, 6] })
    const svg = w.find('svg.w-kpi-card__spark')
    expect(svg.attributes('aria-hidden')).toBe('true')
    expect(svg.find('polyline').attributes('points')?.split(' ')).toHaveLength(4)
    expect(svg.find('polygon').exists()).toBe(true)
  })

  it('série vazia não desenha nada', () => {
    expect(montar({ spark: [] }).find('svg').exists()).toBe(false)
  })
})

describe('WKpiCard — regressões da revisão', () => {
  it('listener que entra e sai depois do mount liga e desliga o botão', async () => {
    const ouvir = ref(false)
    const Pai = defineComponent({
      setup: () => () =>
        h(WKpiCard, { ...base, ...(ouvir.value ? { onClick: () => undefined } : {}) }),
    })
    const w = mount(Pai, { global: { plugins: [PrimeVue] } })
    expect(w.find('.w-kpi-card').element.tagName).toBe('ARTICLE')
    ouvir.value = true
    await flushPromises()
    expect(w.find('.w-kpi-card').attributes('role')).toBe('button')
    ouvir.value = false
    await flushPromises()
    expect(w.find('.w-kpi-card').element.tagName).toBe('ARTICLE')
  })

  it('Enter/Espaço num filho focável não ativa o card', async () => {
    const w = mount(WKpiCard, {
      props: base,
      attrs: { onClick: () => undefined },
      slots: { footer: '<button class="filho">ação</button>' },
      global: { plugins: [PrimeVue] },
    })
    await w.find('.filho').trigger('keydown', { key: 'Enter' })
    await w.find('.filho').trigger('keydown', { key: ' ' })
    expect(w.emitted('click')).toBeUndefined()
  })

  it('Espaço segurado (repeat) não dispara de novo', async () => {
    const w = montar({}, { onClick: () => undefined })
    await w.trigger('keydown', { key: ' ' })
    await w.trigger('keydown', { key: ' ', repeat: true })
    expect(w.emitted('click')).toHaveLength(1)
  })

  it('@click.once também torna o card interativo', () => {
    const w = montar({}, { onClickOnce: () => undefined })
    expect(w.attributes('role')).toBe('button')
  })

  it('hasListener reconhece as formas camel, kebab e once', () => {
    const fn = () => undefined
    expect(hasListener({ onItemClick: fn }, 'item-click')).toBe(true)
    expect(hasListener({ 'onItem-click': fn }, 'item-click')).toBe(true)
    expect(hasListener({ onItemClickOnce: fn }, 'item-click')).toBe(true)
    expect(hasListener({ 'onItem-clickOnce': fn }, 'item-click')).toBe(true)
    expect(hasListener({ onClickOnce: fn }, 'click')).toBe(true)
    expect(hasListener({ onOther: fn }, 'click')).toBe(false)
    expect(hasListener(null, 'click')).toBe(false)
  })
})

describe('WKpiCard — ativo como filtro', () => {
  it('marca a classe e anuncia aria-pressed quando é botão', () => {
    const w = mount(WKpiCard, {
      props: { label: 'Ativos', value: 10, active: true, onClick: () => {} },
    })
    expect(w.classes()).toContain('w-kpi-card--active')
    expect(w.attributes('aria-pressed')).toBe('true')
  })
})

describe('WKpiCard — loader de marca', () => {
  afterEach(() => vi.useRealTimers())

  const loader = { src: '/marca.gif', delay: 100, minDuration: 300 }
  const comConfig = (props: Record<string, unknown>, attrs: Record<string, unknown> = {}) =>
    mount(WKpiCard, {
      props: { ...base, ...props },
      attrs,
      global: { plugins: [PrimeVue], provide: { [W_CONFIG_KEY as symbol]: { loader } } },
    })

  it('sem configuração mantém o esqueleto de hoje', () => {
    const w = montar({ loading: true })
    expect(w.findAll('.p-skeleton')).toHaveLength(4)
    expect(w.find('.w-loader').exists()).toBe(false)
    expect(w.find('.w-kpi-card__veil').exists()).toBe(false)
    expect(w.classes()).not.toContain('w-kpi-card--brand-loader')
  })

  it('com configuração o conteúdo fica, sem esqueleto, e o véu com o WLoader só entra após o delay', async () => {
    vi.useFakeTimers()
    const w = comConfig({ loading: true })
    expect(w.findAll('.p-skeleton')).toHaveLength(0)
    expect(w.find('.w-kpi-card__label').text()).toBe('Vendas')
    expect(w.find('.w-kpi-card__veil').exists()).toBe(false)
    expect(w.attributes('aria-busy')).toBeUndefined()

    await vi.advanceTimersByTimeAsync(100)
    expect(w.find('.w-kpi-card__veil .w-loader').exists()).toBe(true)
    expect(w.find('.w-kpi-card__label').exists()).toBe(true)
    expect(w.attributes('aria-busy')).toBe('true')
  })

  it('o véu fica até completar minDuration depois que loading termina', async () => {
    vi.useFakeTimers()
    const w = comConfig({ loading: true })
    await vi.advanceTimersByTimeAsync(100)
    await w.setProps({ loading: false })
    await vi.advanceTimersByTimeAsync(299)
    expect(w.find('.w-kpi-card__veil').exists()).toBe(true)

    await vi.advanceTimersByTimeAsync(1)
    expect(w.find('.w-kpi-card__veil').exists()).toBe(false)
    expect(w.attributes('aria-busy')).toBeUndefined()
  })

  it('loading que termina antes do delay nunca mostra o véu', async () => {
    vi.useFakeTimers()
    const w = comConfig({ loading: true })
    await vi.advanceTimersByTimeAsync(50)
    await w.setProps({ loading: false })
    await vi.advanceTimersByTimeAsync(500)
    expect(w.find('.w-kpi-card__veil').exists()).toBe(false)
  })

  it('sob o véu o card clicável não emite click nem reage ao teclado', async () => {
    vi.useFakeTimers()
    const onClick = vi.fn()
    const w = comConfig({ loading: true }, { onClick })
    await w.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(100)
    await w.trigger('click')
    await w.trigger('keydown', { key: 'Enter' })
    expect(onClick).toHaveBeenCalledTimes(1)

    await w.setProps({ loading: false })
    await vi.advanceTimersByTimeAsync(300)
    await w.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(2)
  })
})

describe('WKpiCard — herói e ícone em linha', () => {
  it('padrão: ícone no quadrado e rótulo no conteúdo (sem classes novas)', () => {
    const w = montar()
    expect(w.classes()).not.toContain('w-kpi-card--hero')
    expect(w.classes()).not.toContain('w-kpi-card--icon-inline')
    expect(w.find('.w-kpi-card__content .w-kpi-card__label').exists()).toBe(true)
  })

  it('size="hero" aplica a classe e renderiza rótulo, valor, apoio, trend e sparkline', () => {
    const w = montar({
      size: 'hero',
      hint: 'vs. mês anterior',
      trend: { value: '+8%', direction: 'up' },
      spark: [1, 3, 2, 5],
    })
    expect(w.classes()).toContain('w-kpi-card--hero')
    expect(w.find('.w-kpi-card__label').text()).toBe('Vendas')
    expect(w.find('.w-kpi-card__value').text()).toBe('R$ 1,2 mi')
    expect(w.find('.w-kpi-card__hint').text()).toBe('vs. mês anterior')
    expect(w.find('svg.w-kpi-card__spark').exists()).toBe(true)
    // trend na linha do valor, nunca no cabeçalho
    expect(w.find('.w-kpi-card__figure .w-kpi-card__trend-badge--up').text()).toBe('+8%')
    expect(w.find('.w-kpi-card__header .w-kpi-card__trend').exists()).toBe(false)
  })

  it('hero põe o ícone em linha, ao lado do rótulo, mesmo com iconStyle="tile"', () => {
    const w = montar({ size: 'hero', iconStyle: 'tile' })
    expect(w.classes()).toContain('w-kpi-card--icon-inline')
    const header = w.find('.w-kpi-card__header')
    expect(header.find('.w-kpi-card__icon i.pi-dollar').exists()).toBe(true)
    expect(header.find('.w-kpi-card__label').exists()).toBe(true)
  })

  it('hero com slot trend também o põe na linha do valor', () => {
    const w = mount(WKpiCard, {
      props: { ...base, size: 'hero' },
      slots: { trend: '<b class="meu-trend">meta</b>' },
      global: { plugins: [PrimeVue] },
    })
    expect(w.find('.w-kpi-card__figure .meu-trend').exists()).toBe(true)
    expect(w.find('.w-kpi-card__header .meu-trend').exists()).toBe(false)
  })

  it('iconStyle="inline" no default: sem quadrado, ícone junto do rótulo e trend no cabeçalho', () => {
    const w = montar({ iconStyle: 'inline', trend: { value: '-2%', direction: 'down' } })
    expect(w.classes()).toContain('w-kpi-card--icon-inline')
    expect(w.classes()).not.toContain('w-kpi-card--hero')
    const header = w.find('.w-kpi-card__header')
    expect(header.find('.w-kpi-card__icon i.pi-dollar').exists()).toBe(true)
    expect(header.find('.w-kpi-card__label').text()).toBe('Vendas')
    expect(header.find('.w-kpi-card__trend').exists()).toBe(true)
    expect(w.find('.w-kpi-card__content .w-kpi-card__label').exists()).toBe(false)
  })

  it('iconStyle="inline" vale também no compact', () => {
    const w = montar({ size: 'compact', iconStyle: 'inline' })
    expect(w.classes()).toEqual(
      expect.arrayContaining(['w-kpi-card--compact', 'w-kpi-card--icon-inline']),
    )
    expect(w.find('.w-kpi-card__header .w-kpi-card__label').exists()).toBe(true)
  })
})
