// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import dayjs from 'dayjs'
import WCalendarGrid from './WCalendarGrid.vue'
import type { CalendarEvent, CalendarMoveEvent } from '@/types/calendar'

const DIA = '2026-10-26'
const OUTRO = '2026-10-27'

function eventos(): CalendarEvent[] {
  return [
    { id: 1, start: `${DIA}T09:00:00`, minutes: 60, title: 'Ana', draggable: true },
    { id: 2, start: `${DIA}T09:30:00`, minutes: 30, title: 'Bruno' },
    { id: 3, start: `${DIA}T14:00:00`, minutes: 30, title: 'Carla', state: 'missed' },
    { id: 4, start: `${OUTRO}T10:00:00`, minutes: 30, title: 'Diego', state: 'canceled' },
  ]
}

function montar(props: Record<string, unknown> = {}) {
  return mount(WCalendarGrid, { props: { days: [DIA, OUTRO], events: eventos(), ...props } })
}

/** jsdom não tem layout: a coluna mede 13 h × 100 px (07–20h, 100 px por hora). */
function medir(w: VueWrapper, col: number) {
  const el = w.findAll('.w-calendar-grid__column')[col].element as HTMLElement
  el.getBoundingClientRect = () => ({ top: 0, height: 1300, bottom: 1300, left: 0, right: 100, width: 100, x: 0, y: 0 }) as DOMRect
}

const eventoEl = (w: VueWrapper, titulo: string) =>
  w.findAll('.w-calendar-grid__event').find((e) => e.text().includes(titulo))!

describe('WCalendarGrid', () => {
  it('desenha uma coluna por dia e uma linha por hora do expediente', () => {
    const w = montar()
    expect(w.findAll('.w-calendar-grid__column')).toHaveLength(2)
    expect(w.findAll('.w-calendar-grid__hour')).toHaveLength(13)
  })

  it('abre a régua quando há evento fora do expediente', () => {
    const w = montar({ events: [{ id: 9, start: `${DIA}T05:30:00`, title: 'Cedo' }] })
    expect(w.findAll('.w-calendar-grid__hour')[0].text()).toBe('05:00')
  })

  it('divide em faixas os eventos que se sobrepõem', () => {
    const w = montar()
    const ana = eventoEl(w, 'Ana').attributes('style')
    const bruno = eventoEl(w, 'Bruno').attributes('style')
    expect(ana).toContain('--w-calendar-lanes: 2')
    expect(bruno).toContain('--w-calendar-lane: 1')
    expect(eventoEl(w, 'Carla').attributes('style')).toContain('--w-calendar-lanes: 1')
  })

  it('aplica o estado como modificador e não conta cancelado no cabeçalho', () => {
    const w = montar()
    expect(eventoEl(w, 'Carla').classes()).toContain('w-calendar-grid__event--missed')
    const contagens = w.findAll('.w-calendar-grid__count').map((c) => c.text())
    expect(contagens).toEqual(['3'])
  })

  it('emite select ao clicar no evento', async () => {
    const w = montar()
    await eventoEl(w, 'Ana').trigger('click')
    expect((w.emitted('select')![0][0] as CalendarEvent).id).toBe(1)
  })

  it('emite create no horário clicado, no passo de criação', async () => {
    const w = montar({ creatable: true })
    medir(w, 0)
    await w.findAll('.w-calendar-grid__column')[0].trigger('click', { clientY: 345 }) // 10:27
    const { start } = w.emitted('create')![0][0] as { start: string }
    expect(dayjs(start).format('YYYY-MM-DD HH:mm')).toBe(`${DIA} 10:00`)
  })

  it('não emite create quando não é creatable', async () => {
    const w = montar()
    medir(w, 0)
    await w.findAll('.w-calendar-grid__column')[0].trigger('click', { clientY: 345 })
    expect(w.emitted('create')).toBeUndefined()
  })

  it('arrastar um evento draggable emite move com o novo início', async () => {
    const w = montar()
    medir(w, 1)
    const dt = { effectAllowed: '', setData: () => {} }
    await eventoEl(w, 'Ana').trigger('dragstart', { dataTransfer: dt })
    const col = w.findAll('.w-calendar-grid__column')[1]
    await col.trigger('dragover', { dataTransfer: dt, clientY: 450 }) // 11:30
    await col.trigger('drop', { dataTransfer: dt })
    const mov = w.emitted('move')![0][0] as CalendarMoveEvent
    expect(mov.event.id).toBe(1)
    expect(dayjs(mov.start).format('YYYY-MM-DD HH:mm')).toBe(`${OUTRO} 11:30`)
  })

  it('só é arrastável o evento marcado draggable', () => {
    const w = montar()
    expect(eventoEl(w, 'Ana').attributes('draggable')).toBe('true')
    expect(eventoEl(w, 'Bruno').attributes('draggable')).toBe('false')
  })

  it('emite day-click pelo cabeçalho na visão de vários dias', async () => {
    const w = montar()
    await w.findAll('.w-calendar-grid__day')[1].trigger('click')
    expect(w.emitted('day-click')![0]).toEqual([OUTRO])
  })
})
