<script setup lang="ts">
import dayjs, { type Dayjs } from 'dayjs'
import { computed, onBeforeUnmount, ref } from 'vue'
import type { CalendarEvent, CalendarMoveEvent } from '@/types/calendar'

/**
 * Grade de horário controlada (um ou vários dias lado a lado), no desenho dos calendários de
 * mesa: régua de horas, linha do "agora", eventos coloridos por categoria e divididos em
 * faixas quando se sobrepõem. Clique num horário vazio emite `create`; arrastar um evento
 * `draggable` emite `move`. A grade NUNCA muta `events` — o consumidor grava e devolve.
 */
const props = withDefaults(
  defineProps<{
    /** Dias exibidos, na ordem, em `YYYY-MM-DD`. Um dia = visão de dia. */
    days: string[]
    events: CalendarEvent[]
    /** Evento realçado (ex.: aberto num painel ao lado). */
    selectedId?: string | number | null
    /** Clique no vazio emite `create` e mostra a prévia do horário ao passar o mouse. */
    creatable?: boolean
    /** Primeira e última hora visíveis; abre mais se houver evento fora delas. */
    startHour?: number
    endHour?: number
    /** Passo do clique de criação e do arraste, em minutos. */
    createStep?: number
    moveStep?: number
    /** Altura mínima desenhada de um evento curto, em minutos (o título precisa caber). */
    minEventMinutes?: number
    /** Cabeçalho do dia clicável (emite `day-click`) quando há mais de um dia. */
    dayClickable?: boolean
    loading?: boolean
  }>(),
  {
    selectedId: null,
    creatable: false,
    startHour: 7,
    endHour: 20,
    createStep: 30,
    moveStep: 15,
    minEventMinutes: 30,
    dayClickable: true,
    loading: false,
  },
)

const emit = defineEmits<{
  /** Clique num horário vazio: início em ISO com o fuso local. */
  create: [payload: { start: string }]
  /** Clique (ou Enter) num evento. */
  select: [event: CalendarEvent]
  /** Evento arrastado e solto em outro horário. */
  move: [payload: CalendarMoveEvent]
  /** Clique no cabeçalho de um dia (`YYYY-MM-DD`). */
  'day-click': [day: string]
}>()

defineSlots<{
  /** Conteúdo do evento. `short` é verdadeiro quando só cabe uma linha. */
  event?(props: { event: CalendarEvent; short: boolean; time: string }): unknown
  /** Cabeçalho do dia. */
  'day-header'?(props: { day: string; count: number; today: boolean }): unknown
}>()

interface Block {
  event: CalendarEvent
  minute: number
  minutes: number
  visual: number
  short: boolean
  lane: number
  lanes: number
}

const STATE_ICON: Record<string, string> = {
  done: 'pi pi-check',
  missed: 'pi pi-ban',
  attention: 'pi pi-exclamation-circle',
}

const dayKey = (v: string | Date | Dayjs) => dayjs(v).format('YYYY-MM-DD')
const minuteOf = (v: string | Date | Dayjs) => {
  const d = dayjs(v)
  return d.hour() * 60 + d.minute()
}
const durationOf = (e: CalendarEvent) => e.minutes ?? 30
const hhmm = (m: number) =>
  `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
const isToday = (day: string) => day === dayKey(dayjs())
const isWeekend = (day: string) => dayjs(day).day() % 6 === 0

const byDay = computed(() => {
  const map: Record<string, CalendarEvent[]> = {}
  for (const e of props.events) (map[dayKey(e.start)] ||= []).push(e)
  return map
})
const eventsOf = (day: string) => byDay.value[day] || []
const countOf = (day: string) => eventsOf(day).filter((e) => e.state !== 'canceled').length

const range = computed<[number, number]>(() => {
  let first = props.startHour
  let last = props.endHour
  for (const day of props.days)
    for (const e of eventsOf(day)) {
      const m = minuteOf(e.start)
      first = Math.min(first, Math.floor(m / 60))
      last = Math.max(last, Math.ceil((m + Math.max(durationOf(e), props.minEventMinutes)) / 60))
    }
  return [first, Math.min(last, 24)]
})
const hours = computed(() =>
  Array.from({ length: range.value[1] - range.value[0] }, (_, i) => range.value[0] + i),
)
const firstMinute = computed(() => range.value[0] * 60)
const lastMinute = computed(() => range.value[1] * 60)

const box = (minute: number, minutes: number) => ({
  '--w-calendar-top': String((minute - firstMinute.value) / 60),
  '--w-calendar-span': String(minutes / 60),
})

/** Eventos que se tocam formam um grupo e dividem a largura em faixas. */
function blocksOf(day: string): Block[] {
  const list = eventsOf(day)
    .map((event) => {
      const minute = minuteOf(event.start)
      const minutes = durationOf(event)
      const visual = Math.max(minutes, props.minEventMinutes)
      return { event, minute, minutes, visual, short: visual < 45, lane: 0, lanes: 1 }
    })
    .sort((a, b) => a.minute - b.minute)
  let group: Block[] = []
  let groupEnd = -1
  const close = () => {
    const lanes = Math.max(...group.map((b) => b.lane)) + 1
    group.forEach((b) => (b.lanes = lanes))
  }
  for (const b of list) {
    if (group.length && b.minute >= groupEnd) {
      close()
      group = []
    }
    const taken = new Set(
      group.filter((o) => o.minute + o.visual > b.minute).map((o) => o.lane),
    )
    while (taken.has(b.lane)) b.lane++
    group.push(b)
    groupEnd = Math.max(groupEnd, b.minute + b.visual)
  }
  if (group.length) close()
  return list
}

const timeLabel = (b: Block) => `${hhmm(b.minute)}–${hhmm(b.minute + b.minutes)}`
const labelOf = (b: Block) =>
  b.event.ariaLabel ?? `${b.event.title}, ${dayjs(b.event.start).format('DD/MM')} ${timeLabel(b)}`

/** Posição vertical do ponteiro → minuto do dia, em passos de `step`. */
function minuteAt(e: MouseEvent, step: number): number {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const span = lastMinute.value - firstMinute.value
  const raw = rect.height ? ((e.clientY - rect.top) / rect.height) * span : 0
  const m = firstMinute.value + Math.floor(raw / step) * step
  return Math.min(Math.max(m, firstMinute.value), lastMinute.value - step)
}
const isoAt = (day: string, minute: number) =>
  dayjs(day).startOf('day').add(minute, 'minute').format()

const ghost = ref<{ day: string; minute: number; minutes: number } | null>(null)
const dragging = ref<CalendarEvent | null>(null)

function hover(e: MouseEvent, day: string) {
  if (!props.creatable || dragging.value || props.loading) return
  ghost.value = { day, minute: minuteAt(e, props.createStep), minutes: props.createStep }
}
function create(e: MouseEvent, day: string) {
  if (!props.creatable || props.loading) return
  emit('create', { start: isoAt(day, minuteAt(e, props.createStep)) })
}

const canDrag = (e: CalendarEvent) => !!e.draggable && !props.loading
function dragStart(ev: DragEvent, e: CalendarEvent) {
  dragging.value = e
  if (ev.dataTransfer) {
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('text/plain', String(e.id))
  }
}
function dragOver(ev: DragEvent, day: string) {
  if (!dragging.value) return
  ghost.value = {
    day,
    minute: minuteAt(ev, props.moveStep),
    minutes: Math.max(durationOf(dragging.value), props.minEventMinutes),
  }
}
function drop(day: string) {
  const event = dragging.value
  const target = ghost.value
  dragEnd()
  if (!event || !target || target.day !== day) return
  const start = isoAt(day, target.minute)
  if (!dayjs(start).isSame(dayjs(event.start), 'minute')) emit('move', { event, start })
}
function dragEnd() {
  dragging.value = null
  ghost.value = null
}

const nowMinute = ref(minuteOf(dayjs()))
const clock = setInterval(() => (nowMinute.value = minuteOf(dayjs())), 60_000)
onBeforeUnmount(() => clearInterval(clock))
const showNow = computed(
  () => nowMinute.value >= firstMinute.value && nowMinute.value <= lastMinute.value,
)
</script>

<template>
  <div
    class="w-calendar-grid"
    :class="{ 'w-calendar-grid--loading': loading, 'w-calendar-grid--creatable': creatable }"
    :style="{ '--w-calendar-days': String(days.length), '--w-calendar-hours': String(hours.length) }"
    :aria-busy="loading"
  >
    <div class="w-calendar-grid__head">
      <span class="w-calendar-grid__corner" aria-hidden="true"></span>
      <template v-for="day in days" :key="day">
        <slot name="day-header" :day="day" :count="countOf(day)" :today="isToday(day)">
          <button
            type="button"
            class="w-calendar-grid__day"
            :class="{ 'w-calendar-grid__day--today': isToday(day) }"
            :disabled="!dayClickable || days.length === 1"
            :aria-label="dayjs(day).format('dddd, DD/MM')"
            @click="emit('day-click', day)"
          >
            <span class="w-calendar-grid__weekday">{{ dayjs(day).format('ddd') }}</span>
            <span class="w-calendar-grid__date">{{ dayjs(day).format('D') }}</span>
            <span v-if="countOf(day)" class="w-calendar-grid__count">{{ countOf(day) }}</span>
          </button>
        </slot>
      </template>
    </div>

    <div class="w-calendar-grid__body">
      <div class="w-calendar-grid__ruler" aria-hidden="true">
        <span v-for="h in hours" :key="h" class="w-calendar-grid__hour">{{ hhmm(h * 60) }}</span>
      </div>

      <div
        v-for="day in days"
        :key="day"
        class="w-calendar-grid__column"
        :class="{
          'w-calendar-grid__column--today': isToday(day),
          'w-calendar-grid__column--weekend': isWeekend(day),
        }"
        :data-day="day"
        @click.self="create($event, day)"
        @mousemove.self="hover($event, day)"
        @mouseleave="ghost = null"
        @dragover.prevent="dragOver($event, day)"
        @drop.prevent="drop(day)"
      >
        <div
          v-if="ghost && ghost.day === day"
          class="w-calendar-grid__ghost"
          :class="{ 'w-calendar-grid__ghost--move': dragging }"
          :style="box(ghost.minute, ghost.minutes)"
          aria-hidden="true"
        >
          <i v-if="!dragging" class="pi pi-plus"></i>
          {{ hhmm(ghost.minute) }}
        </div>

        <button
          v-for="b in blocksOf(day)"
          :key="b.event.id"
          type="button"
          class="w-calendar-grid__event"
          :class="[
            b.event.state ? `w-calendar-grid__event--${b.event.state}` : '',
            {
              'w-calendar-grid__event--selected': b.event.id === selectedId,
              'w-calendar-grid__event--short': b.short,
            },
          ]"
          :style="{
            ...box(b.minute, b.visual),
            '--w-calendar-accent': b.event.accent,
            '--w-calendar-lane': String(b.lane),
            '--w-calendar-lanes': String(b.lanes),
          }"
          :draggable="canDrag(b.event)"
          :aria-label="labelOf(b)"
          @click="emit('select', b.event)"
          @dragstart="dragStart($event, b.event)"
          @dragend="dragEnd"
        >
          <slot name="event" :event="b.event" :short="b.short" :time="timeLabel(b)">
            <span class="w-calendar-grid__title">
              <i v-if="b.event.icon" :class="b.event.icon" aria-hidden="true"></i>
              <span class="w-calendar-grid__name">{{ b.event.title }}</span>
              <i
                v-if="b.event.state && STATE_ICON[b.event.state]"
                :class="['w-calendar-grid__state', STATE_ICON[b.event.state]]"
                aria-hidden="true"
              ></i>
            </span>
            <span v-if="!b.short" class="w-calendar-grid__meta">
              {{ timeLabel(b) }}<template v-if="b.event.subtitle"> · {{ b.event.subtitle }}</template>
            </span>
          </slot>
        </button>

        <div
          v-if="isToday(day) && showNow"
          class="w-calendar-grid__now"
          :style="{ '--w-calendar-top': String((nowMinute - firstMinute) / 60) }"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  </div>
</template>
