import type { AxiosInstance } from 'axios'
import type { DataProvider } from './dataProvider'

export interface WPluginOptions {
  axios?: AxiosInstance
  dataProvider?: DataProvider
  defaultPageSize?: number
  dateFormat?: string
  dateTimeFormat?: string
  locale?: string
  currency?: string
  registerComponents?: boolean
}

export interface WPluginConfig {
  axios?: AxiosInstance
  dataProvider: DataProvider
  defaultPageSize: number
  dateFormat: string
  dateTimeFormat: string
  locale: string
  currency: string
}

export const W_AXIOS_KEY = Symbol('w-axios')
export const W_DATA_PROVIDER_KEY = Symbol('w-data-provider')
export const W_CONFIG_KEY = Symbol('w-config')
