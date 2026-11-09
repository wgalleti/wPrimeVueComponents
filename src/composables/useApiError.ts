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
      return obj.non_field_errors.filter((item: unknown) => typeof item === 'string').join(' ')
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
  }
  const data = axiosError.response?.data

  // Sem corpo JSON (rede fora, página HTML de erro do proxy): a mensagem do transporte é
  // técnica e em inglês ("Request failed with status code 502") — quem lê é o usuário.
  if (!data || typeof data !== 'object') return fallback

  const detail = data.detail ?? data
  return extractMessage(detail) || fallback
}

/**
 * Erros por campo de uma resposta 400 (`{ campo: [msgs] }` no DRF; o provedor Connect entrega
 * o `BadRequest.field_violations` no mesmo formato). Só campos com mensagem de texto; `detail` e
 * `non_field_errors` ficam de fora — não pertencem a um campo.
 */
export function extractFieldErrors(error: unknown): Record<string, string> {
  const data = (error as { response?: { status?: number; data?: unknown } } | null)?.response
  if (!data || data.status !== 400 || typeof data.data !== 'object' || data.data === null) return {}
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(data.data as Record<string, unknown>)) {
    if (key === 'detail' || key === 'non_field_errors') continue
    const messages = (Array.isArray(value) ? value : [value]).filter((m) => typeof m === 'string')
    if (messages.length > 0) out[key] = messages.join(' ')
  }
  return out
}

export function useApiError() {
  return { extractApiError, extractFieldErrors }
}
