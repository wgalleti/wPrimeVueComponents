export interface DataProviderListParams {
  page?: number
  page_size?: number
  search?: string
  ordering?: string
  [key: string]: unknown
}

export interface DataProviderListResponse<T = Record<string, unknown>> {
  data: T[]
  page: number
  page_size: number
  rows: number
  extras?: Record<string, unknown>
}

export interface DataProviderResponse<T = unknown> {
  data: T
}

export interface DataProviderRequestConfig {
  params?: Record<string, unknown>
  headers?: Record<string, string>
}

export interface DataProvider {
  list<T = Record<string, unknown>>(
    endpoint: string,
    params?: DataProviderListParams,
  ): Promise<DataProviderListResponse<T>>
  get<T = Record<string, unknown>>(
    endpoint: string,
    id: string | number,
    config?: DataProviderRequestConfig,
  ): Promise<DataProviderResponse<T>>
  create<T = Record<string, unknown>>(
    endpoint: string,
    payload: Record<string, unknown> | FormData,
    config?: DataProviderRequestConfig,
  ): Promise<DataProviderResponse<T>>
  update<T = Record<string, unknown>>(
    endpoint: string,
    id: string | number,
    payload: Record<string, unknown> | FormData,
    config?: DataProviderRequestConfig,
  ): Promise<DataProviderResponse<T>>
  delete(endpoint: string, id: string | number): Promise<void>
}
