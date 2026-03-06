import type { AxiosInstance } from 'axios'

export interface WPluginOptions {
  axios: AxiosInstance
  defaultPageSize?: number
  dateFormat?: string
  dateTimeFormat?: string
  locale?: string
  currency?: string
  registerComponents?: boolean
}

export interface WPluginConfig {
  axios: AxiosInstance
  defaultPageSize: number
  dateFormat: string
  dateTimeFormat: string
  locale: string
  currency: string
}

export const W_AXIOS_KEY = Symbol('w-axios')
export const W_CONFIG_KEY = Symbol('w-config')
