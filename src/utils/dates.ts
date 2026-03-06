import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export function parseDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null
  if (value instanceof Date) return value
  const d = dayjs(value, 'YYYY-MM-DD', true)
  return d.isValid() ? d.toDate() : dayjs(value).toDate()
}

export function toDateString(value: Date | string | null | undefined): string | null {
  if (!value) return null
  if (typeof value === 'string') return value
  return dayjs(value).format('YYYY-MM-DD')
}

export function toDateTimeString(value: Date | string | null | undefined): string | null {
  if (!value) return null
  if (typeof value === 'string') return value
  return dayjs(value).toISOString()
}

export function formatDateValue(
  value: string | Date | null | undefined,
  format = 'DD/MM/YYYY',
): string {
  if (!value) return '—'
  return dayjs(value).format(format)
}

export function formatDateTimeValue(
  value: string | Date | null | undefined,
): string {
  if (!value) return '—'
  return dayjs(value).format('DD/MM/YYYY HH:mm')
}
