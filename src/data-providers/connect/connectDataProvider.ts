import {
  create,
  fromJson,
  toJson,
  type DescField,
  type DescMessage,
  type DescService,
} from '@bufbuild/protobuf'
import { createClient, ConnectError, Code, type Transport } from '@connectrpc/connect'
import type {
  DataProvider,
  DataProviderListParams,
  DataProviderListResponse,
  DataProviderResponse,
} from '@/types/dataProvider'
import { normalizeConnectError, type ConnectNormalizedError } from './connectErrors'

const MAX_PAGE_SIZE = 200
const RESERVED = new Set(['page', 'page_size', 'search', 'ordering'])
const TIMESTAMP = 'google.protobuf.Timestamp'
const FIELD_MASK = 'google.protobuf.FieldMask'

export interface ConnectResourceConfig {
  /** Descriptor do serviço gerado pelo protoc-gen-es (ex.: `ParceriaService`). */
  service: DescService
}

export interface CreateConnectDataProviderOptions {
  /** `createConnectTransport({ baseUrl: '<api>/api/v2/rpc', interceptors })` (connect-web). */
  transport: Transport
  /** `endpoint` da suíte -> serviço. Aceita o descriptor direto ou `{ service }`. */
  resources: Record<string, DescService | ConnectResourceConfig>
  /** Chamado em `unauthenticated` antes do erro seguir — o mesmo papel do interceptor 401 do axios. */
  onUnauthenticated?: (error: ConnectError) => void
}

export interface ConnectDataProvider extends DataProvider {
  /** Ação de estado: método próprio do serviço recebendo `IdRequest` (ex.: `'Aprovar'`). */
  action<T = Record<string, unknown>>(
    endpoint: string,
    id: string | number,
    method: string,
  ): Promise<DataProviderResponse<T>>
}

type Json = Record<string, unknown>
type Rpc = Record<string, (req: unknown) => Promise<unknown>>

function normalizeEndpoint(endpoint: string): string {
  return endpoint
    .split('?')[0]
    .replace(/^\/+|\/+$/g, '')
    .replace(/^api\/v\d+\//, '')
}

/** Filtro REST (`params`) -> `ListRequest.filtros` (`campo` ou `campo__op`, valores string). */
export function toFiltros(params: DataProviderListParams): Record<string, string> {
  const filtros: Record<string, string> = {}
  for (const [key, value] of Object.entries(params)) {
    if (RESERVED.has(key) || value === null || value === undefined || value === '') continue
    if (Array.isArray(value)) {
      if (value.length === 0) continue
      filtros[key.includes('__') ? key : `${key}__in`] = value.join(',')
    } else if (value instanceof Date) {
      filtros[key] = value.toISOString()
    } else {
      filtros[key] = String(value)
    }
  }
  return filtros
}

export function toListRequest(params: DataProviderListParams) {
  const pagina = Math.max(Number(params.page ?? 1), 1)
  const tamanho = Math.min(Math.max(Number(params.page_size ?? 20), 1), MAX_PAGE_SIZE)
  const ordem =
    typeof params.ordering === 'string' && params.ordering ? params.ordering.split(',') : []
  return {
    filtros: toFiltros(params),
    ordem,
    pagina,
    tamanho,
    busca: typeof params.search === 'string' ? params.search : '',
  }
}

function findField(desc: DescMessage, name: string): DescField | undefined {
  return desc.fields.find((f) => f.name === name || f.localName === name || f.jsonName === name)
}

const isTimestamp = (f: DescField) => f.fieldKind === 'message' && f.message.typeName === TIMESTAMP

/** `Timestamp` é sempre data-hora: `''` vira nulo e datetime sem fuso é hora local. */
function coerceTimestamps(desc: DescMessage, payload: Json): Json {
  const out: Json = { ...payload }
  for (const [key, value] of Object.entries(out)) {
    const f = findField(desc, key)
    if (!f || !isTimestamp(f)) continue
    if (value === '') out[key] = null
    else if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value))
      // Converter para meia-noite UTC traria de volta o dia a menos em UTC-3.
      throw {
        message: `${f.name}: data pura em campo Timestamp`,
        code: 'InvalidArgument',
        response: { status: 400, data: { [f.name]: ['Use date-time (RFC3339), não só a data.'] } },
      } satisfies ConnectNormalizedError
    else if (typeof value === 'string' && !/(Z|[+-]\d{2}:?\d{2})$/.test(value))
      out[key] = new Date(value).toISOString()
  }
  return out
}

/** Timestamp volta como RFC3339; data pura é `string` no proto e passa como veio. */
function readRow<T>(desc: DescMessage, message: unknown): T {
  return toJson(desc, message as never, {
    useProtoFieldName: true,
    alwaysEmitImplicit: true, // false/0/"" chegam, não somem
  }) as T
}

function assertPlain(payload: Json | FormData): Json {
  if (payload instanceof FormData) {
    throw normalizeConnectError(
      new ConnectError(
        'ConnectDataProvider não envia FormData. Faça o upload do arquivo à parte e envie a referência no payload.',
        Code.InvalidArgument,
      ),
    )
  }
  return payload
}

export function createConnectDataProvider(
  options: CreateConnectDataProviderOptions,
): ConnectDataProvider {
  const clients = new Map<string, { service: DescService; rpc: Rpc }>()

  function resolve(endpoint: string) {
    const key = normalizeEndpoint(endpoint)
    let hit = clients.get(key)
    if (!hit) {
      const entry = options.resources[key]
      if (!entry) {
        throw new ConnectError(
          `Serviço Connect não registrado para o endpoint "${endpoint}".`,
          Code.NotFound,
        )
      }
      const service = 'service' in entry ? entry.service : entry
      hit = { service, rpc: createClient(service, options.transport) as unknown as Rpc }
      clients.set(key, hit)
    }
    return hit
  }

  /** `init` pode ser função do descriptor de entrada (precisa dele para converter o payload). */
  async function run<R>(
    endpoint: string,
    name: string,
    init: Json | ((input: DescMessage) => Json),
  ) {
    try {
      const { service, rpc } = resolve(endpoint)
      const method = service.methods.find((m) => m.name === name)
      if (!method)
        throw new ConnectError(`${service.typeName} não tem o método ${name}.`, Code.Unimplemented)
      const body = typeof init === 'function' ? init(method.input) : init
      const response = await rpc[method.localName](create(method.input, body as never))
      return { response: response as R, method }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) throw err // já normalizado
      const normalized = normalizeConnectError(err)
      if (normalized.response.status === 401) options.onUnauthenticated?.(ConnectError.from(err))
      throw normalized
    }
  }

  return {
    async list<T = Json>(
      endpoint: string,
      params: DataProviderListParams = {},
    ): Promise<DataProviderListResponse<T>> {
      const req = toListRequest(params)
      const { response, method } = await run<{ count: bigint | number; results: unknown[] }>(
        endpoint,
        'List',
        req,
      )
      const results = findField(method.output, 'results')
      if (!results || results.fieldKind !== 'list' || results.listKind !== 'message') {
        throw new Error(`${method.output.typeName}.results deve ser repeated message.`)
      }
      return {
        data: (response.results ?? []).map((m) => readRow<T>(results.message, m)),
        page: req.pagina,
        page_size: req.tamanho,
        rows: Number(response.count ?? 0),
        extras: {},
      }
    },

    async get<T = Json>(endpoint: string, id: string | number) {
      const { response, method } = await run(endpoint, 'Get', { id: String(id) })
      return { data: readRow<T>(method.output, response) }
    },

    async create<T = Json>(endpoint: string, payload: Json | FormData) {
      const plain = assertPlain(payload)
      const { response, method } = await run(endpoint, 'Create', (input) => {
        // Create<X>Request { <x> entidade = 1 }: o form vira a entidade embrulhada (como no Update).
        const [only] = input.fields
        if (input.fields.length === 1 && only.fieldKind === 'message' && !isTimestamp(only)) {
          return {
            [only.localName]: fromJson(
              only.message,
              coerceTimestamps(only.message, plain) as never,
              {
                ignoreUnknownFields: true,
              },
            ),
          }
        }
        return fromJson(input, coerceTimestamps(input, plain) as never, {
          ignoreUnknownFields: true,
        }) as unknown as Json
      })
      return { data: readRow<T>(method.output, response) }
    },

    // `payload` já é o diff do formulário (useCrudManager envia só o alterado): o update_mask
    // nasce das chaves dele, em snake_case do proto, mesmo que o form use camelCase.
    async update<T = Json>(endpoint: string, id: string | number, payload: Json | FormData) {
      const plain = assertPlain(payload)
      const { response, method } = await run(endpoint, 'Update', (input) => {
        const entityField = input.fields.find(
          (f) => f.fieldKind === 'message' && f.message.typeName !== FIELD_MASK,
        )
        if (!entityField || entityField.fieldKind !== 'message') {
          throw new ConnectError(`${input.typeName} sem campo de entidade.`, Code.Internal)
        }
        const entity = entityField.message
        const known: Json = {}
        const paths: string[] = []
        for (const [key, value] of Object.entries(coerceTimestamps(entity, plain))) {
          const f = findField(entity, key)
          if (!f) continue
          known[f.name] = value
          paths.push(f.name)
        }
        return {
          id: String(id),
          [entityField.localName]: fromJson(entity, known as never, { ignoreUnknownFields: true }),
          updateMask: { paths },
        }
      })
      return { data: readRow<T>(method.output, response) }
    },

    async delete(endpoint: string, id: string | number) {
      await run(endpoint, 'Delete', { id: String(id) })
    },

    async action<T = Json>(endpoint: string, id: string | number, name: string) {
      const { response, method } = await run(endpoint, name, { id: String(id) })
      return { data: (method.output.fields.length ? readRow<T>(method.output, response) : {}) as T }
    },
  }
}
