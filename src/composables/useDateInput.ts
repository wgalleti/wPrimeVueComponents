import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

/**
 * Formato do valor emitido pelo WDatePicker:
 * - `'iso'`  → string `YYYY-MM-DD` (ou `YYYY-MM-DDTHH:mm:ss` com hora). Ideal p/ API.
 * - `'date'` → objeto `Date` (compatível com o contrato atual do useCrudManager).
 */
export type DateValueFormat = 'iso' | 'date'

const DISPLAY_DATE = 'DD/MM/YYYY'
const DISPLAY_DATETIME = 'DD/MM/YYYY HH:mm'
const ISO_DATE = 'YYYY-MM-DD'
const ISO_DATETIME = 'YYYY-MM-DDTHH:mm:ss'

export interface UseDateInputOptions {
  /** Reativo: se o campo inclui hora (datetime). */
  showTime?: () => boolean
  /** Reativo: formato do valor emitido (default `'iso'`). */
  valueFormat?: () => DateValueFormat
}

/**
 * Lógica pura de parse/format/máscara para inputs de data em pt-BR.
 *
 * Timezone-safe: parse e format usam sempre os componentes LOCAIS via dayjs
 * (nunca `toISOString`, que converte p/ UTC e causa off-by-one em fusos negativos).
 * Sem estado reativo próprio — apenas funções; o componente cuida da reatividade.
 */
export function useDateInput(opts: UseDateInputOptions = {}) {
  const withTime = () => opts.showTime?.() ?? false
  const displayFormat = () => (withTime() ? DISPLAY_DATETIME : DISPLAY_DATE)
  const mask = () => (withTime() ? '##/##/#### ##:##' : '##/##/####')
  const placeholder = () => (withTime() ? 'dd/mm/aaaa hh:mm' : 'dd/mm/aaaa')

  /** Valor de entrada (string ISO ou Date) → `Date` local, ou `null` se inválido. */
  function toDate(value: unknown): Date | null {
    if (value == null || value === '') return null
    if (value instanceof Date) return isNaN(value.getTime()) ? null : value
    if (typeof value === 'string') {
      // Aceita YYYY-MM-DD estrito primeiro (data pura, meia-noite local)…
      const dateOnly = dayjs(value, ISO_DATE, true)
      if (dateOnly.isValid()) return dateOnly.toDate()
      // …senão qualquer ISO datetime válido (dayjs interpreta como local).
      const any = dayjs(value)
      return any.isValid() ? any.toDate() : null
    }
    return null
  }

  /** `Date` → valor emitido, respeitando `valueFormat` (default string ISO). */
  function toValue(date: Date | null): string | Date | null {
    if (!date) return null
    if ((opts.valueFormat?.() ?? 'iso') === 'date') return date
    return dayjs(date).format(withTime() ? ISO_DATETIME : ISO_DATE)
  }

  /** `Date` → texto de exibição `DD/MM/YYYY[ HH:mm]`. */
  function toDisplay(date: Date | null): string {
    if (!date) return ''
    return dayjs(date).format(displayFormat())
  }

  /** Texto digitado (`30/05/1988`) → `Date`, ou `null` se incompleto/inválido. */
  function fromDisplay(text: string): Date | null {
    if (!text) return null
    const d = dayjs(text, displayFormat(), true)
    return d.isValid() ? d.toDate() : null
  }

  /** Hoje: date-only zera a hora; datetime mantém a hora atual. */
  function today(): Date {
    return withTime() ? new Date() : dayjs().startOf('day').toDate()
  }

  return { toDate, toValue, toDisplay, fromDisplay, today, mask, placeholder, displayFormat }
}
