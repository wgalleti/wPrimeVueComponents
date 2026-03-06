import { inject } from 'vue'
import { W_CONFIG_KEY } from '@/types/plugin'
import type { WPluginConfig } from '@/types/plugin'
import { formatDateValue, formatDateTimeValue, parseDate, toDateString, toDateTimeString } from '@/utils/dates'
import {
  formatCpf,
  formatCnpj,
  formatCpfCnpj,
  formatTelefone,
  validateCpf,
  validateCnpj,
  validateCpfCnpj,
} from '@/utils/masks'

const numberFormatters = new Map<string, Intl.NumberFormat>()

function getNumberFormatter(locale: string, decimals: number): Intl.NumberFormat {
  const key = `${locale}-${decimals}`
  let fmt = numberFormatters.get(key)
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    numberFormatters.set(key, fmt)
  }
  return fmt
}

function getCurrencyFormatter(locale: string, currency: string): Intl.NumberFormat {
  const key = `${locale}-${currency}`
  let fmt = numberFormatters.get(key)
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    })
    numberFormatters.set(key, fmt)
  }
  return fmt
}

export function useFormatters() {
  const config = inject<WPluginConfig>(W_CONFIG_KEY, {
    defaultPageSize: 20,
    dateFormat: 'DD/MM/YYYY',
    dateTimeFormat: 'DD/MM/YYYY HH:mm',
    locale: 'pt-BR',
    currency: 'BRL',
  } as WPluginConfig)

  const locale = config?.locale ?? 'pt-BR'
  const currencyCode = config?.currency ?? 'BRL'

  function formatCurrency(value: number | null | undefined): string {
    if (value == null) return '—'
    return getCurrencyFormatter(locale, currencyCode).format(value)
  }

  function formatNumber(value: number | null | undefined, decimals = 2): string {
    if (value == null) return '—'
    return getNumberFormatter(locale, decimals).format(value)
  }

  function formatDate(value: string | Date | null | undefined, format?: string): string {
    return formatDateValue(value, format ?? config?.dateFormat ?? 'DD/MM/YYYY')
  }

  function formatDateTime(value: string | Date | null | undefined): string {
    return formatDateTimeValue(value)
  }

  function formatPercent(value: number | null | undefined): string {
    if (value == null) return '—'
    return `${getNumberFormatter(locale, 2).format(value)}%`
  }

  return {
    formatCurrency,
    formatNumber,
    formatDate,
    formatDateTime,
    formatPercent,
    formatCpf,
    formatCnpj,
    formatCpfCnpj,
    formatTelefone,
    validateCpf,
    validateCnpj,
    validateCpfCnpj,
    parseDate,
    toDateString,
    toDateTimeString,
  }
}
