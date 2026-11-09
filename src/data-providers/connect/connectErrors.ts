import { Code, ConnectError } from '@connectrpc/connect'
import { BinaryReader } from '@bufbuild/protobuf/wire'

/** Erro com o formato que o resto da suíte já lê (`response.status` / `response.data`). */
export interface ConnectNormalizedError {
  message: string
  code: string
  response: { status: number; data?: Record<string, unknown> }
}

const BAD_REQUEST = 'google.rpc.BadRequest'

// Mesmos status/mensagens que o REST/DRF produz, para toast e tratamento do consumidor
// não precisarem saber qual provedor está ativo.
const STATUS: Partial<Record<Code, number>> = {
  [Code.InvalidArgument]: 400,
  [Code.Unauthenticated]: 401,
  [Code.PermissionDenied]: 403,
  [Code.NotFound]: 404,
  [Code.FailedPrecondition]: 409,
  [Code.ResourceExhausted]: 429,
  [Code.Internal]: 500,
}

const MESSAGES: Partial<Record<Code, string>> = {
  [Code.NotFound]: 'Registro não encontrado.',
  [Code.PermissionDenied]: 'Você não tem permissão para realizar esta ação.',
  [Code.Unauthenticated]: 'Sessão expirada. Entre novamente.',
  [Code.ResourceExhausted]: 'Muitas requisições. Tente novamente em instantes.',
}

/**
 * Lê `google.rpc.BadRequest` direto do wire (field_violations = 1; field = 1, description = 2),
 * para a suíte não depender do pacote gerado de `google.rpc`. Devolve `{ campo: [mensagens] }`.
 */
export function decodeBadRequest(value: Uint8Array): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  const reader = new BinaryReader(value)
  while (reader.pos < reader.len) {
    const [no, wire] = reader.tag()
    if (no !== 1) {
      reader.skip(wire)
      continue
    }
    const inner = new BinaryReader(reader.bytes())
    let field = ''
    let description = ''
    while (inner.pos < inner.len) {
      const [n, w] = inner.tag()
      if (n === 1) field = inner.string()
      else if (n === 2) description = inner.string()
      else inner.skip(w)
    }
    if (field && description) (out[field] ??= []).push(description)
  }
  return out
}

function fieldViolations(error: ConnectError): Record<string, string[]> {
  for (const detail of error.details) {
    if ('type' in detail && detail.type === BAD_REQUEST && detail.value instanceof Uint8Array) {
      return decodeBadRequest(detail.value)
    }
  }
  return {}
}

export function normalizeConnectError(err: unknown): ConnectNormalizedError {
  const error = ConnectError.from(err)
  const status = STATUS[error.code] ?? 0
  let data: Record<string, unknown> | undefined

  if (error.code === Code.InvalidArgument) {
    const violations = fieldViolations(error)
    data = Object.keys(violations).length ? violations : { detail: error.rawMessage }
  } else if (error.code === Code.FailedPrecondition) {
    data = { detail: error.rawMessage || 'Operação não permitida no estado atual.' }
  } else if (MESSAGES[error.code]) {
    data = { detail: MESSAGES[error.code] }
  }
  // internal/unavailable/unknown: sem corpo -> o chamador mostra o seu fallback ("Erro ao salvar...").

  return { message: error.message, code: Code[error.code], response: { status, data } }
}
