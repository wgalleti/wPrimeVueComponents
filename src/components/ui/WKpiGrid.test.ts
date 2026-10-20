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

  it('repassa tint do item ao card', () => {
    const lista: KpiItem[] = [
      { icon: 'pi pi-home', label: 'A', value: 1, tint: 'value', severity: 'danger' },
      { icon: 'pi pi-home', label: 'B', value: 2 },
    ]
    const cards = mount(WKpiGrid, {
      props: { items: lista },
      global: { plugins: [PrimeVue] },
    }).findAll('.w-kpi-card')
    expect(cards[0].classes()).toContain('w-kpi-card--tint-value')
    expect(cards[1].classes()).not.toContain('w-kpi-card--tint-value')
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

  it('card com interactive: false fica estático mesmo com listener', () => {
    const w = grid(
      { items: [{ ...items[0], interactive: false }, items[1]] },
      { onItemClick: () => undefined },
    )
    const cards = w.findAll('.w-kpi-card')
    expect(cards[0].attributes('role')).toBeUndefined()
    expect(cards[1].attributes('role')).toBe('button')
  })
})

/* jsdom não faz layout nem avalia @container (e o vitest não carrega CSS): o que dá
   para travar aqui é a ligação de classes. A largura real se confere no navegador. */
describe('WKpiGrid — colunas', () => {
  const items: KpiItem[] = [
    { icon: 'pi pi-dollar', label: 'Receita', value: 'US$ 40.726.705' },
    { icon: 'pi pi-dollar', label: 'Custo', value: 'US$ 12.004.300' },
  ]
  const grid = (props: Record<string, unknown> = {}) =>
    mount(WKpiGrid, { props: { items, ...props }, global: { plugins: [PrimeVue] } })

  it('columns numérico continua com a grade fixa; auto usa a classe auto', () => {
    expect(grid().classes()).toContain('w-kpi-grid--cols-4')
    expect(grid({ columns: 3 }).classes()).toContain('w-kpi-grid--cols-3')
    const auto = grid({ columns: 'auto' })
    expect(auto.classes()).toContain('w-kpi-grid--auto')
    expect(auto.classes().some((c) => c.startsWith('w-kpi-grid--cols-'))).toBe(false)
  })

  it('auto marca data-count até 8 itens; colunas fixas e mais de 8 ficam sem', () => {
    const muitos = (n: number) =>
      Array.from({ length: n }, (_, i) => ({ icon: 'pi pi-dollar', label: `K${i}`, value: i }))
    expect(grid({ columns: 'auto' }).attributes('data-count')).toBe('2')
    expect(grid({ columns: 'auto', items: muitos(8) }).attributes('data-count')).toBe('8')
    expect(grid({ columns: 'auto', items: muitos(9) }).attributes('data-count')).toBeUndefined()
    expect(grid({ columns: 4 }).attributes('data-count')).toBeUndefined()
  })

  it('data-count acompanha a lista', async () => {
    const w = grid({ columns: 'auto' })
    await w.setProps({ items: [...items, ...items] })
    expect(w.attributes('data-count')).toBe('4')
  })

  it('cards (e o slot #item) moram no trilho, filho direto da raiz', () => {
    for (const columns of [4, 'auto']) {
      const track = grid({ columns }).find('.w-kpi-grid > .w-kpi-grid__track')
      expect(track.findAll(':scope > .w-kpi-card')).toHaveLength(2)
    }
    const comSlot = mount(WKpiGrid, {
      props: { items, columns: 'auto' },
      slots: { item: '<span class="meu">{{ params.item.label }}</span>' },
      global: { plugins: [PrimeVue] },
    })
    expect(comSlot.findAll('.w-kpi-grid__track > .meu').map((e) => e.text())).toEqual([
      'Receita',
      'Custo',
    ])
  })
})
