import type {
  DataProvider,
  DataProviderListParams,
  DataProviderListResponse,
  DataProviderRequestConfig,
  DataProviderResponse,
} from '@/types/dataProvider'

type SupabaseResult<T> = {
  data: T | null
  error: {
    message: string
    code?: string
    details?: string
    hint?: string
  } | null
  count?: number | null
}

type SupabaseFilterBuilder<T> = PromiseLike<SupabaseResult<T>> & {
  select(
    columns?: string,
    options?: { count?: 'exact' | 'planned' | 'estimated' },
  ): SupabaseFilterBuilder<T>
  eq(column: string, value: unknown): SupabaseFilterBuilder<T>
  ilike(column: string, pattern: string): SupabaseFilterBuilder<T>
  or(filters: string): SupabaseFilterBuilder<T>
  order(column: string, options?: { ascending?: boolean }): SupabaseFilterBuilder<T>
  range(from: number, to: number): SupabaseFilterBuilder<T>
  single(): Promise<SupabaseResult<T>>
}

type SupabaseTable = {
  select<T = unknown>(
    columns?: string,
    options?: { count?: 'exact' | 'planned' | 'estimated' },
  ): SupabaseFilterBuilder<T>
  insert<T = unknown>(payload: unknown): SupabaseFilterBuilder<T>
  update<T = unknown>(payload: unknown): SupabaseFilterBuilder<T>
  delete<T = unknown>(): SupabaseFilterBuilder<T>
}

export interface SupabaseDataProviderClient {
  from(table: string): SupabaseTable
}

export interface SupabaseResourceConfig {
  table: string
  pk?: string
  select?: string
  searchFields?: string[]
  defaultOrdering?: string
  defaultFilters?: Record<string, unknown>
  softDelete?: boolean | Record<string, unknown>
  mapListItem?: (item: Record<string, unknown>) => Record<string, unknown>
  mapPayload?: (
    payload: Record<string, unknown>,
    operation: 'create' | 'update',
  ) => Record<string, unknown>
}

export interface CreateSupabaseDataProviderOptions {
  client: SupabaseDataProviderClient
  resources?: Record<string, SupabaseResourceConfig | string>
  defaultSelect?: string
  allowedTables?: string[]
}

function normalizeEndpoint(endpoint: string): string {
  return endpoint
    .split('?')[0]
    .replace(/^\/+|\/+$/g, '')
    .replace(/^api\/v\d+\//, '')
}

function toResourceConfig(resource: SupabaseResourceConfig | string): SupabaseResourceConfig {
  return typeof resource === 'string' ? { table: resource } : resource
}

function createProviderError(message: string, status = 400) {
  return {
    response: {
      status,
      data: { detail: message },
    },
    message,
  }
}

function assertPlainPayload(payload: Record<string, unknown> | FormData): Record<string, unknown> {
  if (payload instanceof FormData) {
    throw createProviderError(
      'SupabaseDataProvider nao envia FormData diretamente. Faça upload do arquivo no Storage e envie a URL/caminho no payload.',
    )
  }

  return payload
}

function normalizeSupabaseError(error: SupabaseResult<unknown>['error']): never {
  throw {
    response: {
      data: {
        detail: error?.message ?? 'Erro ao consultar Supabase',
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
      },
    },
    message: error?.message ?? 'Erro ao consultar Supabase',
  }
}

function resolveResource(
  endpoint: string,
  options: CreateSupabaseDataProviderOptions,
): SupabaseResourceConfig {
  const resourceName = normalizeEndpoint(endpoint)
  const configuredResource = options.resources?.[resourceName]

  if (configuredResource) {
    return toResourceConfig(configuredResource)
  }

  if (options.allowedTables?.includes(resourceName)) {
    return { table: resourceName }
  }

  throw createProviderError(`Recurso Supabase nao registrado para o endpoint "${endpoint}".`, 404)
}

function applyFilters<T>(
  query: SupabaseFilterBuilder<T>,
  params: DataProviderListParams,
  resource: SupabaseResourceConfig,
): SupabaseFilterBuilder<T> {
  const reservedKeys = new Set(['page', 'page_size', 'search', 'ordering'])
  const filters = { ...resource.defaultFilters, ...params }

  for (const [key, value] of Object.entries(filters)) {
    if (reservedKeys.has(key) || value === null || value === undefined || value === '') {
      continue
    }
    query = query.eq(key, value)
  }

  return query
}

function applySearch<T>(
  query: SupabaseFilterBuilder<T>,
  search: unknown,
  searchFields?: string[],
): SupabaseFilterBuilder<T> {
  if (typeof search !== 'string' || !search.trim() || !searchFields?.length) {
    return query
  }

  const escapedSearch = search.trim().replace(/,/g, '\\,')
  const expression = searchFields.map((field) => `${field}.ilike.%${escapedSearch}%`).join(',')

  return query.or(expression)
}

function parseOrdering(ordering: unknown, fallback?: string) {
  const value = typeof ordering === 'string' && ordering ? ordering : fallback
  if (!value) return null

  return {
    field: value.startsWith('-') ? value.slice(1) : value,
    ascending: !value.startsWith('-'),
  }
}

function mapList<T>(data: T[] | null, resource: SupabaseResourceConfig): T[] {
  if (!data) return []
  if (!resource.mapListItem) return data

  return data.map((item) => resource.mapListItem?.(item as Record<string, unknown>)) as T[]
}

export function createSupabaseDataProvider(
  options: CreateSupabaseDataProviderOptions,
): DataProvider {
  const defaultSelect = options.defaultSelect ?? '*'

  return {
    async list<T = Record<string, unknown>>(
      endpoint: string,
      params: DataProviderListParams = {},
    ): Promise<DataProviderListResponse<T>> {
      const resource = resolveResource(endpoint, options)
      const page = Math.max(Number(params.page ?? 1), 1)
      const pageSize = Math.max(Number(params.page_size ?? 20), 1)
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      let query = options.client
        .from(resource.table)
        .select<T[]>(resource.select ?? defaultSelect, { count: 'exact' })

      query = applyFilters(query, params, resource)
      query = applySearch(query, params.search, resource.searchFields)

      const ordering = parseOrdering(params.ordering, resource.defaultOrdering)
      if (ordering) {
        query = query.order(ordering.field, { ascending: ordering.ascending })
      }

      const result = await query.range(from, to)
      if (result.error) normalizeSupabaseError(result.error)

      return {
        data: mapList(result.data, resource),
        page,
        page_size: pageSize,
        rows: result.count ?? result.data?.length ?? 0,
        extras: {},
      }
    },

    async get<T = Record<string, unknown>>(
      endpoint: string,
      id: string | number,
      _config?: DataProviderRequestConfig,
    ): Promise<DataProviderResponse<T>> {
      const resource = resolveResource(endpoint, options)
      const pk = resource.pk ?? 'id'
      const result = await options.client
        .from(resource.table)
        .select<T>(resource.select ?? defaultSelect)
        .eq(pk, id)
        .single()

      if (result.error) normalizeSupabaseError(result.error)
      return { data: result.data as T }
    },

    async create<T = Record<string, unknown>>(
      endpoint: string,
      payload: Record<string, unknown> | FormData,
      _config?: DataProviderRequestConfig,
    ): Promise<DataProviderResponse<T>> {
      const resource = resolveResource(endpoint, options)
      const plainPayload = assertPlainPayload(payload)
      const mappedPayload = resource.mapPayload
        ? resource.mapPayload(plainPayload, 'create')
        : plainPayload
      const result = await options.client
        .from(resource.table)
        .insert<T>(mappedPayload)
        .select(resource.select ?? defaultSelect)
        .single()

      if (result.error) normalizeSupabaseError(result.error)
      return { data: result.data as T }
    },

    async update<T = Record<string, unknown>>(
      endpoint: string,
      id: string | number,
      payload: Record<string, unknown> | FormData,
      _config?: DataProviderRequestConfig,
    ): Promise<DataProviderResponse<T>> {
      const resource = resolveResource(endpoint, options)
      const pk = resource.pk ?? 'id'
      const plainPayload = assertPlainPayload(payload)
      const mappedPayload = resource.mapPayload
        ? resource.mapPayload(plainPayload, 'update')
        : plainPayload
      const result = await options.client
        .from(resource.table)
        .update<T>(mappedPayload)
        .eq(pk, id)
        .select(resource.select ?? defaultSelect)
        .single()

      if (result.error) normalizeSupabaseError(result.error)
      return { data: result.data as T }
    },

    async delete(endpoint: string, id: string | number): Promise<void> {
      const resource = resolveResource(endpoint, options)
      const pk = resource.pk ?? 'id'
      const softDeletePayload =
        resource.softDelete === true
          ? { is_active: false }
          : typeof resource.softDelete === 'object'
            ? resource.softDelete
            : null

      const result = softDeletePayload
        ? await options.client.from(resource.table).update(softDeletePayload).eq(pk, id)
        : await options.client.from(resource.table).delete().eq(pk, id)

      if (result.error) normalizeSupabaseError(result.error)
    },
  }
}
