// ---------------------------------------------------------------------------
// Column
// ---------------------------------------------------------------------------
import type { RouteLocationRaw } from 'vue-router'

export type ColumnType =
  | 'text'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'number'
  | 'currency'
  | 'image'
  | 'custom'
  /** Linha composta: nome em destaque, `secondary` abafado abaixo e `avatar` à esquerda. */
  | 'identity'
  /** Mini barra com rótulo "de/total" (`progress`). */
  | 'progress'
  /** Tempo relativo ("há 3 dias"); a data exata vai no tooltip e no texto oculto da linha. */
  | 'relative'

/** Severidade do tag de status (mesmos nomes do PrimeVue; a cor vem dos tokens do app). */
export type TagSeverity =
  'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | 'primary'

/** Filtro declarativo de coluna — renderizado na toolbar do grid, ao lado da
 *  busca, e enviado como parâmetro na requisição de `list`. Opt-in por coluna. */
export interface ColumnFilter {
  /** Widget do filtro. Default: 'text'. */
  type?: 'text' | 'select' | 'boolean' | 'numeric'
  /** Opções para `type: 'select'`. */
  options?: { label: string; value: unknown }[]
  /** Nome do parâmetro enviado à API. Default: o `field` da coluna. */
  param?: string
  placeholder?: string
}

export interface ColumnDef {
  field: string
  header: string
  type?: ColumnType
  style?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  /** Campo enviado na ordenação quando difere do `field` (ex.: ordenar a etapa pela data). */
  sortField?: string
  /** Render próprio da célula. Vence o formatador do tipo (`currency`, `date`, `datetime`, `number`). */
  format?: (value: unknown, rowData?: Record<string, unknown>) => string
  visible?: boolean
  decimals?: number
  /** Rótulo da tag. Em qualquer tipo de coluna (status, tipo, fase): a presença de
   *  `tagValue` ou `tagSeverity` já renderiza a célula como tag. */
  tagValue?: (value: unknown, rowData?: Record<string, unknown>) => string
  /** Cor da tag (nomes do PrimeVue). Default `secondary` fora do boolean. */
  tagSeverity?: (value: unknown, rowData?: Record<string, unknown>) => string
  /** `type: 'boolean'` — rótulo do `true` (default 'Ativo'). `tagValue` tem prioridade. */
  trueLabel?: string
  /** `type: 'boolean'` — rótulo do `false` (default 'Inativo'). `tagValue` tem prioridade. */
  falseLabel?: string
  /** `type: 'boolean'` — cor do tag no `true` (default 'success'). `null` = texto neutro,
   *  sem tag. `tagSeverity` tem prioridade. */
  trueSeverity?: TagSeverity | null
  /** `type: 'boolean'` — cor do tag no `false` (default 'danger'). `null` = texto neutro,
   *  sem tag — para boolean que não é status (ex.: `nao_exige_analise` → "—"). */
  falseSeverity?: TagSeverity | null
  /** Filtro declarativo desta coluna (aparece na toolbar do grid, junto da busca). */
  filter?: ColumnFilter
  /** Segunda linha abafada sob o valor, em qualquer tipo: nome de outro campo ou função. */
  secondary?: string | ((rowData: Record<string, unknown>) => string | undefined)
  /** `type: 'identity'` — URL da imagem (campo ou função). Sem imagem, iniciais do valor. */
  avatar?: string | ((rowData: Record<string, unknown>) => string | undefined)
  /** `type: 'progress'` — quanto já foi (`of`) de quanto (`total`). */
  progress?: (rowData: Record<string, unknown>) => { of: number; total: number }
  /** `type: 'relative'` — prazo: fica em vermelho quando a data já passou. Função por linha
   *  diz se o prazo ainda está aberto (a cobrança quitada não fica vermelha). */
  dueDate?: boolean | ((rowData: Record<string, unknown>) => boolean)
  /** Destino ao clicar no valor (`identity` e texto): vira RouterLink; sem router, `<a href>`
   *  quando for string. O clique no link não seleciona a linha. */
  to?: (rowData: Record<string, unknown>) => RouteLocationRaw | string | undefined
  /** Opt-in: texto da célula quando o valor é vazio (`null`, `undefined` ou `''`), em qualquer tipo.
   *  Sem `empty`, `null` segue como "—" e `''` passa como valor, igual antes. */
  empty?: string
  /** Destaque do texto vazio: `warn` pinta com o token de atenção (ex.: "Sem corretor"). */
  emptySeverity?: 'warn'
}
