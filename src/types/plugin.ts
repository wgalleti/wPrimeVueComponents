import type { AxiosInstance } from 'axios'
import type { DataProvider } from './dataProvider'
import type { CepLookup } from './field'

/** Loader de marca (opt-in): imagem animada que os componentes de carregamento usam no lugar do neutro. */
export interface WLoaderConfig {
  /** Imagem animada (ex.: WebP). */
  src: string
  /** Densidades, ex.: `"…@2x.webp 2x"`. */
  srcset?: string
  /** Quadro parado, usado com `prefers-reduced-motion: reduce`. */
  still?: string
  /** Ms de carregamento antes de o loader aparecer. Default 300. */
  delay?: number
  /** Ms mínimos em tela depois que apareceu. Default 500. */
  minDuration?: number
}

/** `WLoaderConfig` com `delay` e `minDuration` já resolvidos (o que `useLoaderConfig` devolve). */
export type WLoaderConfigResolved = WLoaderConfig & { delay: number; minDuration: number }

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
  /**
   * Loader de marca (opt-in). Sem ele nada muda: os componentes seguem com o esqueleto e o
   * indicador neutro de hoje. Leitura por `useLoaderConfig()`.
   */
  loader?: WLoaderConfig
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
  /** Repassado como veio; quem lê é `useLoaderConfig()`, que aplica os padrões. */
  loader?: WLoaderConfig
}

/** Mensagem dos componentes de dados quando o plugin foi registrado sem provedor. */
export const MISSING_DATA_PROVIDER =
  'dataProvider não encontrado. Registre o WPrimeVuePlugin com "axios" ou "dataProvider" (app.use(WPrimeVuePlugin, { axios })) antes de usar'

export const W_AXIOS_KEY = Symbol('w-axios')
export const W_DATA_PROVIDER_KEY = Symbol('w-data-provider')
export const W_CONFIG_KEY = Symbol('w-config')
