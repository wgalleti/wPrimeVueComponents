import type { ColumnDef } from '@/types/crud'

export interface ToCsvOptions {
  /** Field separator (default: ';' — friendly to pt-BR Excel). */
  separator?: string
}

function cellValue(col: ColumnDef, row: Record<string, unknown>): string {
  const raw = row[col.field]
  if (col.format) return col.format(raw, row)
  if (raw === null || raw === undefined) return ''
  if (typeof raw === 'boolean') return raw ? 'Sim' : 'Não'
  return String(raw)
}

function escapeCell(value: string, separator: string): string {
  if (
    value.includes('"') ||
    value.includes(separator) ||
    value.includes('\n') ||
    value.includes('\r')
  ) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

/**
 * Serialize rows into a CSV string respecting the given (visible) columns.
 * Uses the column `format` callback when present, prepends a UTF-8 BOM so
 * Excel renders accents correctly, and defaults to `;` as the separator.
 */
export function toCsv(
  rows: Record<string, unknown>[],
  columns: ColumnDef[],
  options: ToCsvOptions = {},
): string {
  const sep = options.separator ?? ';'
  const header = columns.map((c) => escapeCell(c.header, sep)).join(sep)
  const lines = rows.map((row) =>
    columns.map((c) => escapeCell(cellValue(c, row), sep)).join(sep),
  )
  return '﻿' + [header, ...lines].join('\r\n')
}

/** Trigger a browser download of a CSV string. */
export function downloadCsv(csv: string, filename = 'export.csv'): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
