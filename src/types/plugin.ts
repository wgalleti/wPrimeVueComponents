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
  /**
   * Corrige o `Dialog`/`Drawer` do PrimeVue 4 para o Esc fechar só o overlay
   * do topo (nativo fecha todos os empilhados). Default: `true`.
   */
  patchDialogEscape?: boolean
  /**
   * Padrão do app para a navegação por teclado no formulário do CRUD (foca o 1º campo, Enter
   * avança). A tela que declara `keyboardNav` no `useCrudManager` vence. Default: `false`.
   */
  keyboardNav?: boolean
}

export interface WPluginConfig {
  axios?: AxiosInstance
  dataProvider: DataProvider
  defaultPageSize: number
  dateFormat: string
  dateTimeFormat: string
  locale: string
  currency: string
  keyboardNav: boolean
}

export const W_AXIOS_KEY = Symbol('w-axios')
export const W_DATA_PROVIDER_KEY = Symbol('w-data-provider')
export const W_CONFIG_KEY = Symbol('w-config')
