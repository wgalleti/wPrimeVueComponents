// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import WKanbanBoard from './WKanbanBoard.vue'
import type { KanbanColumn, KanbanMoveEvent } from '@/types/kanban'

function colunas(): KanbanColumn[] {
  return [
    {
      value: 'todo',
      label: 'A fazer',
      items: [
        { id: 1, nome: 'Tarefa 1' },
        { id: 2, nome: 'Tarefa 2' },
      ],
    },
    {
      value: 'doing',
      label: 'Em andamento',
      items: [
        { id: 3, nome: 'Tarefa 3' },
        { id: 4, nome: 'Tarefa 4' },
      ],
    },
    { value: 'done', label: 'Concluído', items: [] },
  ]
}

function montar(props: Record<string, unknown> = {}) {
  return mount(WKanbanBoard, { props: { columns: colunas(), ...props } })
}

/** jsdom não tem layout: injeta geometria vertical (100px por card) nos cards da coluna. */
function medirCartoes(w: VueWrapper, colIndex: number) {
  const lists = w.findAll('.w-kanban-board__list')
  const cards = lists[colIndex].element.querySelectorAll(':scope > .w-kanban-board__card')
  cards.forEach((el, i) => {
    ;(el as HTMLElement).getBoundingClientRect = () =>
      ({
        top: i * 100,
        height: 80,
        bottom: i * 100 + 80,
        left: 0,
        right: 200,
        width: 200,
        x: 0,
        y: i * 100,
      }) as DOMRect
  })
}

const dataTransfer = () => ({ effectAllowed: '', dropEffect: '', setData: () => {} })

async function arrastar(w: VueWrapper, cardIndex: number, colIndex: number, clientY: number) {
  const dt = dataTransfer()
  await w.findAll('.w-kanban-board__card')[cardIndex].trigger('dragstart', { dataTransfer: dt })
  const list = w.findAll('.w-kanban-board__list')[colIndex]
  await list.trigger('dragover', { dataTransfer: dt, clientY })
  await list.trigger('drop', { dataTransfer: dt, clientY })
}

function ultimoMove(w: VueWrapper): KanbanMoveEvent {
  const emitted = w.emitted('move')
  expect(emitted).toBeTruthy()
  return emitted![emitted!.length - 1][0] as KanbanMoveEvent
}

describe('WKanbanBoard — render', () => {
  it('renderiza colunas com label, contador e cards fallback', () => {
    const w = montar()
    const headers = w.findAll('.w-kanban-board__header')
    expect(headers).toHaveLength(3)
    expect(headers[0].text()).toContain('A fazer')
    expect(headers[0].find('.w-kanban-board__count').text()).toBe('2')
    expect(w.findAll('.w-kanban-board__card')).toHaveLength(4)
    expect(w.findAll('.w-kanban-board__card')[0].text()).toBe('Tarefa 1')
  })

  it('coluna vazia mostra o slot/fallback de vazio', () => {
    const w = montar()
    expect(w.find('.w-kanban-board__empty').text()).toBe('Nenhum item')
  })

  it('slot #card recebe item e column', () => {
    const w = mount(WKanbanBoard, {
      props: { columns: colunas() },
      slots: {
        card: `<template #card="{ item, column }">{{ column.value }}:{{ item.nome }}</template>`,
      },
    })
    expect(w.findAll('.w-kanban-board__card')[0].text()).toBe('todo:Tarefa 1')
  })

  it('canDrag false tira o draggable do card', () => {
    const w = montar({ canDrag: (item: Record<string, unknown>) => item.id !== 1 })
    const cards = w.findAll('.w-kanban-board__card')
    expect(cards[0].attributes('draggable')).toBe('false')
    expect(cards[1].attributes('draggable')).toBe('true')
  })
})

describe('WKanbanBoard — column-footer', () => {
  const footer = `<template #column-footer="{ column, items }">{{ column.value }}={{ items.length }}</template>`

  it('sem o slot não renderiza rodapé', () => {
    expect(montar().find('.w-kanban-board__footer').exists()).toBe(false)
  })

  it('renderiza um rodapé por coluna com { column, items }, inclusive na vazia', () => {
    const w = mount(WKanbanBoard, {
      props: { columns: colunas() },
      slots: { 'column-footer': footer },
    })
    const rodapes = w.findAll('.w-kanban-board__footer')
    expect(rodapes.map((r) => r.text())).toEqual(['todo=2', 'doing=2', 'done=0'])
  })

  it('fica depois da lista e fora dela (fora da área de drop)', () => {
    const w = mount(WKanbanBoard, {
      props: { columns: colunas() },
      slots: { 'column-footer': footer },
    })
    const coluna = w.findAll('.w-kanban-board__column')[0]
    const filhos = Array.from(coluna.element.children)
    const lista = coluna.find('.w-kanban-board__list').element
    const rodape = coluna.find('.w-kanban-board__footer').element
    expect(lista.contains(rodape)).toBe(false)
    expect(filhos.indexOf(rodape)).toBeGreaterThan(filhos.indexOf(lista))
  })

  it('aparece com loading e com o empty-column', () => {
    const w = mount(WKanbanBoard, {
      props: { columns: colunas(), loading: true },
      slots: { 'column-footer': footer, 'empty-column': 'vazio' },
    })
    expect(w.findAll('.w-kanban-board__footer')).toHaveLength(3)
    expect(w.find('.w-kanban-board__empty').text()).toBe('vazio')
  })

  it('soltar sobre o rodapé não emite move', async () => {
    const w = mount(WKanbanBoard, {
      props: { columns: colunas() },
      slots: { 'column-footer': footer },
    })
    const dt = dataTransfer()
    await w.findAll('.w-kanban-board__card')[0].trigger('dragstart', { dataTransfer: dt })
    await w.findAll('.w-kanban-board__footer')[2].trigger('drop', { dataTransfer: dt })
    expect(w.emitted('move')).toBeUndefined()
  })
})

describe('WKanbanBoard — item-click', () => {
  it('clique no card emite item-click com o item', async () => {
    const w = montar()
    await w.findAll('.w-kanban-board__card')[1].trigger('click')
    expect(w.emitted('item-click')![0][0]).toEqual({ id: 2, nome: 'Tarefa 2' })
  })

  it('Enter no card focado também emite item-click', async () => {
    const w = montar()
    await w.findAll('.w-kanban-board__card')[0].trigger('keydown.enter')
    expect(w.emitted('item-click')![0][0]).toEqual({ id: 1, nome: 'Tarefa 1' })
  })
})

describe('WKanbanBoard — move', () => {
  it('drop em outra coluna emite move com índice pelo ponto médio', async () => {
    const w = montar()
    medirCartoes(w, 1) // doing: card 3 (mid 40), card 4 (mid 140)
    await arrastar(w, 0, 1, 120) // Tarefa 1 → doing, entre os dois cards
    expect(ultimoMove(w)).toEqual({
      item: { id: 1, nome: 'Tarefa 1' },
      from: 'todo',
      to: 'doing',
      index: 1,
    })
  })

  it('drop no fim da coluna emite index = items.length', async () => {
    const w = montar()
    medirCartoes(w, 1)
    await arrastar(w, 0, 1, 999)
    expect(ultimoMove(w).index).toBe(2)
  })

  it('drop em coluna vazia emite index 0', async () => {
    const w = montar()
    await arrastar(w, 0, 2, 50)
    expect(ultimoMove(w)).toEqual({
      item: { id: 1, nome: 'Tarefa 1' },
      from: 'todo',
      to: 'done',
      index: 0,
    })
  })

  it('reordenar na mesma coluna ajusta o índice final (from === to)', async () => {
    const w = montar()
    medirCartoes(w, 0) // todo: Tarefa 1 (mid 40), Tarefa 2 (mid 140)
    await arrastar(w, 0, 0, 999) // Tarefa 1 para depois da Tarefa 2: raw 2 → final 1
    expect(ultimoMove(w)).toEqual({
      item: { id: 1, nome: 'Tarefa 1' },
      from: 'todo',
      to: 'todo',
      index: 1,
    })
  })

  it('soltar onde já estava não emite move', async () => {
    const w = montar()
    medirCartoes(w, 0)
    await arrastar(w, 0, 0, 10) // antes do próprio card: raw 0 → no-op
    expect(w.emitted('move')).toBeFalsy()
  })

  it('drop sem dragstart não emite nada', async () => {
    const w = montar()
    await w
      .findAll('.w-kanban-board__list')[1]
      .trigger('drop', { dataTransfer: dataTransfer(), clientY: 50 })
    expect(w.emitted('move')).toBeFalsy()
  })

  it('board não muta os arrays do consumidor', async () => {
    const cols = colunas()
    const w = mount(WKanbanBoard, { props: { columns: cols } })
    medirCartoes(w as VueWrapper, 1)
    await arrastar(w as VueWrapper, 0, 1, 120)
    expect(cols[0].items).toHaveLength(2)
    expect(cols[1].items).toHaveLength(2)
  })

  it('column-header customizado fica dentro do cabeçalho, com a ação ao lado', () => {
    const w = mount(WKanbanBoard, {
      props: { columns: colunas() },
      slots: {
        'column-header': '<div class="meu-cab">A<br>2 de 9</div>',
        'column-action': '<button class="acao">+</button>',
      },
    })
    const header = w.findAll('.w-kanban-board__header')[0]
    expect(header.find('.meu-cab').exists()).toBe(true)
    expect(header.find('.acao').exists()).toBe(true)
  })
})
