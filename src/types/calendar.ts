/**
 * Estado visual de um evento do WCalendarGrid. A cor do evento é categoria (`accent`);
 * o estado vai por forma e ícone, nunca por cor de categoria:
 * - `done`: realizado (esmaecido, ícone de check)
 * - `missed`: não aconteceu (hachura de perigo, ícone de proibido)
 * - `canceled`: cancelado (contorno, título riscado)
 * - `attention`: pede ação (contorno de alerta, ícone de exclamação)
 */
export type CalendarEventState = 'done' | 'missed' | 'canceled' | 'attention'

/** Um evento do WCalendarGrid. Os eventos pertencem ao consumidor — a grade não os muta. */
export interface CalendarEvent<T = Record<string, unknown>> {
  /** Identificador estável (key e `selectedId`). */
  id: string | number
  /** Início em ISO 8601 (com ou sem fuso) ou Date. */
  start: string | Date
  /** Duração em minutos. Padrão: 30. */
  minutes?: number
  /** Linha principal (quem/o quê). */
  title: string
  /** Complemento depois do horário (ex.: vaga, sala). */
  subtitle?: string
  /** Classe de ícone (ex.: `pi pi-phone`). */
  icon?: string
  /** Cor de categoria — qualquer valor CSS, de preferência token (`var(--viz-1)`). */
  accent?: string
  state?: CalendarEventState
  /** Arrastável para outro horário (emite `move`). Padrão: false. */
  draggable?: boolean
  /** Rótulo acessível; sem ele, título + horário. */
  ariaLabel?: string
  /** Carga livre do consumidor, devolvida nos eventos. */
  data?: T
}

/** Payload do emit `move` do WCalendarGrid. */
export interface CalendarMoveEvent<T = Record<string, unknown>> {
  event: CalendarEvent<T>
  /** Novo início em ISO 8601 com o fuso local (`2026-10-29T14:30:00-03:00`). */
  start: string
}
