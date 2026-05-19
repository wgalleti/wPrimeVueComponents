import type { AxiosInstance } from 'axios'
import type {
  DataProvider,
  DataProviderListParams,
  DataProviderListResponse,
  DataProviderRequestConfig,
  DataProviderResponse,
} from '@/types/dataProvider'

function normalizeListResponse<T>(
  responseData: unknown,
  fallbackPage: number,
  fallbackPageSize: number,
): DataProviderListResponse<T> {
  const data = responseData as Record<string, unknown>

  if (Array.isArray(data.results)) {
    return {
      data: data.results as T[],
      page: (data.page as number) ?? fallbackPage,
      page_size: (data.page_size as number) ?? fallbackPageSize,
      rows: (data.count as number) ?? 0,
      extras: (data.extras as Record<string, unknown>) ?? {},
    }
  }

  if (Array.isArray(data.data)) {
    return {
      data: data.data as T[],
      page: (data.page as number) ?? fallbackPage,
      page_size: (data.page_size as number) ?? fallbackPageSize,
      rows: (data.rows as number) ?? 0,
      extras: (data.extras as Record<string, unknown>) ?? {},
    }
  }

  return {
    data: Array.isArray(responseData) ? (responseData as T[]) : [],
    page: fallbackPage,
    page_size: fallbackPageSize,
    rows: Array.isArray(responseData) ? responseData.length : 0,
    extras: {},
  }
}

export function createAxiosDataProvider(axios: AxiosInstance): DataProvider {
  return {
    async list<T = Record<string, unknown>>(
      endpoint: string,
      params: DataProviderListParams = {},
    ): Promise<DataProviderListResponse<T>> {
      const response = await axios.get(endpoint, { params })
      return normalizeListResponse<T>(
        response.data,
        Number(params.page ?? 1),
        Number(params.page_size ?? 20),
      )
    },

    async get<T = Record<string, unknown>>(
      endpoint: string,
      id: string | number,
      config?: DataProviderRequestConfig,
    ): Promise<DataProviderResponse<T>> {
      const response = await axios.get<T>(`${endpoint}${id}/`, config)
      return { data: response.data }
    },

    async create<T = Record<string, unknown>>(
      endpoint: string,
      payload: Record<string, unknown> | FormData,
      config?: DataProviderRequestConfig,
    ): Promise<DataProviderResponse<T>> {
      const response = await axios.post<T>(endpoint, payload, config)
      return { data: response.data }
    },

    async update<T = Record<string, unknown>>(
      endpoint: string,
      id: string | number,
      payload: Record<string, unknown> | FormData,
      config?: DataProviderRequestConfig,
    ): Promise<DataProviderResponse<T>> {
      const response = await axios.patch<T>(
        `${endpoint}${id}/`,
        payload,
        config,
      )
      return { data: response.data }
    },

    async delete(endpoint: string, id: string | number): Promise<void> {
      await axios.delete(`${endpoint}${id}/`)
    },
  }
}
