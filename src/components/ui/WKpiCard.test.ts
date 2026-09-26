// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { createMemoryHistory, createRouter } from 'vue-router'
import WKpiCard from './WKpiCard.vue'
import { hasListener } from '@/utils/interactiveCard'

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
