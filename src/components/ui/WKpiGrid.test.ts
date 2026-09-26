// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WKpiGrid from './WKpiGrid.vue'
import type { KpiItem } from '@/types/kpi'

describe('WKpiGrid — repasse', () => {
  const items: KpiItem[] = [
    { icon: 'pi pi-home', label: 'Imóveis', value: 12, spark: [1, 2, 3] },
    { icon: 'pi pi-users', label: 'Leads', value: 40, size: 'default' },
  ]

  const grid = (props: Record<string, unknown> = {}, attrs: Record<string, unknown> = {}) =>
    mount(WKpiGrid, { props: { items, ...props }, attrs, global: { plugins: [PrimeVue] } })

  it('repassa spark e, com dense, deixa o card compact (size do item vence)', () => {
    const cards = grid({ dense: true }).findAll('.w-kpi-card')
    expect(cards[0].classes()).toContain('w-kpi-card--compact')
    expect(cards[0].find('svg.w-kpi-card__spark').exists()).toBe(true)
    expect(cards[1].classes()).not.toContain('w-kpi-card--compact')
  })

  it('sem listener de item-click os cards ficam estáticos', () => {
    const cards = grid().findAll('.w-kpi-card')
    expect(cards.every((c) => c.element.tagName === 'ARTICLE')).toBe(true)
  })

  it('emite item-click com item e índice', async () => {
    const w = grid({}, { onItemClick: () => undefined })
    const cards = w.findAll('.w-kpi-card')
    expect(cards[1].attributes('role')).toBe('button')
    await cards[1].trigger('click')
    expect(w.emitted('item-click')).toEqual([[{ item: items[1], index: 1 }]])
  })

  it('size da grade: item.size → size → dense → default', () => {
    const lista: KpiItem[] = [
      { icon: 'pi pi-home', label: 'A', value: 1 },
      { icon: 'pi pi-home', label: 'B', value: 2, size: 'compact' },
    ]
    const compacto = (props: Record<string, unknown>) =>
      mount(WKpiGrid, { props: { items: lista, ...props }, global: { plugins: [PrimeVue] } })
        .findAll('.w-kpi-card')
        .map((c) => c.classes().includes('w-kpi-card--compact'))
    expect(compacto({})).toEqual([false, true])
    expect(compacto({ size: 'compact' })).toEqual([true, true])
    expect(compacto({ dense: true, size: 'default' })).toEqual([false, true])
    expect(compacto({ dense: true })).toEqual([true, true])
  })

  it('item-click ligado depois do mount torna os cards botões', async () => {
    const ouvir = ref(false)
    const Pai = defineComponent({
      setup: () => () =>
        h(WKpiGrid, { items, ...(ouvir.value ? { onItemClick: () => undefined } : {}) }),
    })
    const w = mount(Pai, { global: { plugins: [PrimeVue] } })
    expect(w.find('.w-kpi-card').element.tagName).toBe('ARTICLE')
    ouvir.value = true
    await flushPromises()
    expect(w.find('.w-kpi-card').attributes('role')).toBe('button')
  })

  it('@item-click.once e a forma kebab também contam', () => {
    for (const key of ['onItemClickOnce', 'onItem-click']) {
      const w = grid({}, { [key]: () => undefined })
      expect(w.find('.w-kpi-card').attributes('role')).toBe('button')
    }
  })
})
