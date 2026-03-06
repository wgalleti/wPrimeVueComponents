function formatFieldName(field: string): string {
  return field.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

function extractMessage(detail: unknown): string | null {
  if (typeof detail === 'string') {
    return detail
  }

  if (Array.isArray(detail)) {
    const messages = detail.filter((item) => typeof item === 'string')
    return messages.length > 0 ? messages.join(' ') : null
  }

  if (typeof detail === 'object' && detail !== null) {
    const obj = detail as Record<string, unknown>

    if (Array.isArray(obj.non_field_errors) && obj.non_field_errors.length > 0) {
      return obj.non_field_errors
        .filter((item: unknown) => typeof item === 'string')
        .join(' ')
    }

    const messages: string[] = []
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'non_field_errors') continue
      const label = formatFieldName(key)
      if (Array.isArray(value)) {
        const strs = value.filter((item: unknown) => typeof item === 'string')
        if (strs.length > 0) messages.push(`${label}: ${strs.join(' ')}`)
      } else if (typeof value === 'string') {
        messages.push(`${label}: ${value}`)
      }
    }
    return messages.length > 0 ? messages.join('\n') : null
  }

  return null
}

export function extractApiError(error: unknown, fallback = 'Erro inesperado'): string {
  if (!error || typeof error !== 'object') return fallback

  const axiosError = error as {
    response?: { data?: Record<string, unknown> }
    message?: string
  }
  const data = axiosError.response?.data

  if (!data || typeof data !== 'object') {
    return axiosError.message || fallback
  }

  const detail = data.detail ?? data
  return extractMessage(detail) || fallback
}

export function useApiError() {
  return { extractApiError }
}
