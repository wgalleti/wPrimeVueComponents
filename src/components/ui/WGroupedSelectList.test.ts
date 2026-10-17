// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WGroupedSelectList from './WGroupedSelectList.vue'
import type { ColumnDef } from '@/types/column'

const columns: ColumnDef[] = [
  { field: 'nome', header: 'Nome' },
  { field: 'qtd', header: 'Qtd', visible: true, align: 'right' },
  { field: 'oculta', header: 'Oculta', visible: false },
]

const items = [
  { id: 1, area: 'Norte', nome: 'A', qtd: 1, bloqueado: false },
  { id: 2, area: 'Sul', nome: 'B', qtd: 2, bloqueado: false },
  { id: 3, area: 'Norte', nome: 'C', qtd: 3, bloqueado: true },
  { id: 4, area: 'Norte', nome: 'D', qtd: 4, bloqueado: false },
]

function make(extra: Record<string, unknown> = {}, slots: Record<string, unknown> = {}) {
  return mount(WGroupedSelectList, {
    props: {
      items,
      columns,
      groupBy: 'area',
      isSelectable: (i: Record<string, unknown>) => !i.bloqueado,
      disabledReason: () => 'Já alocado',
      ...extra,
    },
    slots: slots as never,
    global: { plugins: [PrimeVue] },
  })
}

const rowBox = (w: ReturnType<typeof make>, nome: string) =>
  w.find(`input[aria-label="Selecionar ${nome}"]`)
const last = (w: ReturnType<typeof make>) => w.emitted('update:selection')!.at(-1)![0]

describe('WGroupedSelectList', () => {
  it('renderiza os grupos na ordem da primeira aparição, um tbody por grupo', () => {
    const w = make()
    const bodies = w.findAll('tbody')
    expect(bodies).toHaveLength(2)
    expect(bodies[0].find('.w-grouped-select-list__group-label').text()).toBe('Norte')
    expect(bodies[0].findAll('.w-grouped-select-list__row')).toHaveLength(3)
    expect(bodies[1].find('.w-grouped-select-list__group-label').text()).toBe('Sul')
    expect(w.findAll('thead th').map((t) => t.text())).toEqual(['Seleção', 'Nome', 'Qtd'])
  })

  it('linha não selecionável fica desabilitada e mostra o badge do motivo', () => {
    const w = make()
    expect(rowBox(w, 'C').attributes('disabled')).toBeDefined()
    expect(w.findAll('.w-grouped-select-list__reason')).toHaveLength(1)
    expect(w.find('.w-grouped-select-list__reason').text()).toBe('Já alocado')
  })

  it('o checkbox da linha emite a seleção com a chave', async () => {
    const w = make({ selection: [9] })
    await rowBox(w, 'A').setValue(true)
    expect(last(w)).toEqual([9, 1])
    await rowBox(w, 'A').setValue(false)
    expect(last(w)).toEqual([9])
  })

  it('o checkbox do grupo seleciona só as linhas selecionáveis do grupo', async () => {
    const w = make()
    await w.find('input[aria-label="Selecionar Norte"]').setValue(true)
    expect(last(w)).toEqual([1, 4])
    // todas já marcadas: o segundo clique desmarca
    await w.find('input[aria-label="Selecionar Norte"]').setValue(false)
    expect(last(w)).toEqual([])
  })

  it('grupo fica indeterminado com seleção parcial e desabilitado sem selecionáveis', async () => {
    const w = make({ selection: [1] })
    expect(w.find('.w-grouped-select-list__group-row .p-checkbox-checked').exists()).toBe(false)
    expect(
      (w.find('input[aria-label="Selecionar Norte"]').element as HTMLInputElement).indeterminate,
    ).toBe(true)
    expect(
      (w.find('input[aria-label="Selecionar Sul"]').element as HTMLInputElement).indeterminate,
    ).toBe(false)

    const bloqueado = make({ items: [items[2]] })
    expect(bloqueado.find('input[aria-label="Selecionar C"]').attributes('disabled')).toBeDefined()
    expect(
      bloqueado.find('input[aria-label="Selecionar Norte"]').attributes('disabled'),
    ).toBeDefined()
  })

  it('selecionar todos marca todas as selecionáveis e depois limpa só elas', async () => {
    const w = make({ selection: [99] })
    const link = () => w.find('.w-grouped-select-list__link')
    expect(link().text()).toBe('Selecionar todos os resultados')
    await link().trigger('click')
    expect(last(w)).toEqual([99, 1, 4, 2])
    await w.setProps({ selection: [99, 1, 4, 2] })
    expect(link().text()).toBe('Limpar seleção')
    await link().trigger('click')
    expect(last(w)).toEqual([99])
  })

  it('chaves fora de items são preservadas e não contadas', async () => {
    const w = make(
      { selection: [99] },
      {
        'group-meta': `<template #group-meta="s">{{ s.selectedCount }}/{{ s.selectableCount }}</template>`,
      },
    )
    expect(w.findAll('.w-grouped-select-list__group-meta').map((m) => m.text())).toEqual([
      '0/2',
      '0/1',
    ])
    await rowBox(w, 'B').setValue(true)
    expect(last(w)).toEqual([99, 2])
  })

  it('recolher emite update:collapsed e esconde as linhas do grupo', async () => {
    const w = make()
    const toggle = w.find('.w-grouped-select-list__toggle')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(toggle.attributes('aria-controls')).toBe(w.find('tbody').attributes('id'))
    await toggle.trigger('click')
    expect(w.emitted('update:collapsed')![0]).toEqual([['Norte']])
    expect(w.findAll('tbody')[0].findAll('.w-grouped-select-list__row')).toHaveLength(0)
    await w.setProps({ collapsed: [] })
    expect(w.findAll('tbody')[0].findAll('.w-grouped-select-list__row')).toHaveLength(3)
  })

  it('selectable=false desabilita tudo, sem badge nem ação de selecionar todos', () => {
    const w = make({ selectable: false })
    for (const box of w.findAll('input[type="checkbox"]')) {
      expect(box.attributes('disabled')).toBeDefined()
    }
    expect(w.find('.w-grouped-select-list__reason').exists()).toBe(false)
    expect(w.find('.w-grouped-select-list__link').exists()).toBe(false)
  })

  it('slot column-<campo> sobrescreve a célula e row-actions cria a coluna de ações', () => {
    const w = make(
      {},
      {
        'column-nome': `<template #column-nome="{ data, value }">!{{ value }}-{{ data.id }}</template>`,
        'row-actions': `<template #row-actions="{ data }"><button class="x">{{ data.id }}</button></template>`,
      },
    )
    expect(w.find('.w-grouped-select-list__row').text()).toContain('!A-1')
    expect(w.findAll('button.x')).toHaveLength(4)
    expect(w.findAll('thead th')).toHaveLength(4)
  })

  it('mostra a mensagem vazia e o slot summary', () => {
    const w = make({ items: [], emptyMessage: 'Nada' }, { summary: 'Encontrados 0' })
    expect(w.find('.w-grouped-select-list__state').text()).toBe('Nada')
    expect(w.find('.w-grouped-select-list__summary').text()).toBe('Encontrados 0')
  })

  it('segue o pai: seleção alterada por fora e limpa por fora refletem nos checkboxes', async () => {
    const w = make({ selection: [1] })
    const checked = () => (rowBox(w, 'A').element as HTMLInputElement).checked
    expect(checked()).toBe(true)
    await w.setProps({ selection: [2, 4] })
    expect(checked()).toBe(false)
    expect((rowBox(w, 'B').element as HTMLInputElement).checked).toBe(true)
    expect((rowBox(w, 'D').element as HTMLInputElement).checked).toBe(true)
    await w.setProps({ selection: [] })
    for (const nome of ['A', 'B', 'D']) {
      expect((rowBox(w, nome).element as HTMLInputElement).checked).toBe(false)
    }
  })

  it('pai que ignora o emit mantém o checkbox como o pai manda', async () => {
    const w = make({ selection: [], 'onUpdate:selection': () => {} })
    await rowBox(w, 'A').setValue(true)
    expect(last(w)).toEqual([1])
    await flushPromises()
    expect((rowBox(w, 'A').element as HTMLInputElement).checked).toBe(false)
  })

  it('sem v-model a seleção continua funcionando localmente', async () => {
    const w = make()
    await rowBox(w, 'A').setValue(true)
    expect((rowBox(w, 'A').element as HTMLInputElement).checked).toBe(true)
  })

  it('linha travada e selecionada pode ser desmarcada, nunca marcada', async () => {
    const w = make({ selection: [3, 1] })
    expect(rowBox(w, 'C').attributes('disabled')).toBeUndefined()
    await rowBox(w, 'C').setValue(false)
    expect(last(w)).toEqual([1])
    const free = make({ selection: [] })
    expect(rowBox(free, 'C').attributes('disabled')).toBeDefined()
  })

  it('limpar seleção, grupo marcado e selecionar todos derrubam também as travadas selecionadas', async () => {
    const w = make({ selection: [1, 4, 2, 3, 99] })
    const link = w.find('.w-grouped-select-list__link')
    expect(link.text()).toBe('Limpar seleção')
    await link.trigger('click')
    expect(last(w)).toEqual([99])

    const g = make({ selection: [1, 4, 3] })
    await g.find('input[aria-label="Selecionar Norte"]').setValue(false)
    expect(last(g)).toEqual([])

    const onlyLocked = make({ items: [items[2]], selection: [3] })
    const l = onlyLocked.find('.w-grouped-select-list__link')
    expect(l.text()).toBe('Limpar seleção')
    await l.trigger('click')
    expect(last(onlyLocked)).toEqual([])
  })

  it('carregando com linhas mantém as linhas, marca aria-busy e mostra a barra', () => {
    const w = make({ loading: true })
    expect(w.findAll('.w-grouped-select-list__row')).toHaveLength(4)
    expect(w.find('table').attributes('aria-busy')).toBe('true')
    expect(w.find('.w-grouped-select-list__loading').text()).toContain('Carregando')
    expect(w.find('.w-grouped-select-list__state').exists()).toBe(false)
  })

  it('carregando sem linhas mostra só o placeholder', () => {
    const w = make({ loading: true, items: [] })
    expect(w.find('.w-grouped-select-list__state').text()).toContain('Carregando')
    expect(w.find('.w-grouped-select-list__loading').exists()).toBe(false)
  })

  it('clique não reavalia isSelectable nem disabledReason', async () => {
    let calls = 0
    const w = make({
      isSelectable: (i: Record<string, unknown>) => {
        calls++
        return !i.bloqueado
      },
    })
    const before = calls
    await rowBox(w, 'A').setValue(true)
    await w.setProps({ selection: [1] })
    expect(calls).toBe(before)
  })
})
