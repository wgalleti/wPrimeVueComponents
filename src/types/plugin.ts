import type { AxiosInstance } from 'axios'
import type { DataProvider } from './dataProvider'
import type { CepLookup } from './field'

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
  /**
   * Consulta de CEP dos campos `type: 'cep'` (ex.: um endpoint da própria API). O campo pode
   * trocar a sua com `FieldDef.cepLookup`. Default: ViaCEP direto do navegador.
   */
  cepLookup?: CepLookup
}

export interface WPluginConfig {
  axios?: AxiosInstance
  /** Ausente quando o app registra o plugin sem `axios` nem `dataProvider`. */
  dataProvider?: DataProvider
  defaultPageSize: number
  dateFormat: string
  dateTimeFormat: string
  locale: string
  currency: string
  keyboardNav: boolean
  cepLookup: CepLookup
}

/** Mensagem dos componentes de dados quando o plugin foi registrado sem provedor. */
export const MISSING_DATA_PROVIDER =
  'dataProvider não encontrado. Registre o WPrimeVuePlugin com "axios" ou "dataProvider" (app.use(WPrimeVuePlugin, { axios })) antes de usar'

export const W_AXIOS_KEY = Symbol('w-axios')
export const W_DATA_PROVIDER_KEY = Symbol('w-data-provider')
export const W_CONFIG_KEY = Symbol('w-config')
