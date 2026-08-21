/** Id de uma feature do mapa (o que entra/sai no `v-model` do WMapSelect). */
export type MapSelectId = string | number

/** Anel de coordenadas GeoJSON — `[longitude, latitude]`, WGS84 (EPSG:4326). */
export type MapSelectPosition = [number, number]

/**
 * Geometry GeoJSON aceita pelo WMapSelect. É a `geometry` pura (o que o backend
 * devolve num campo `GeometryField`), não a `Feature` nem a `FeatureCollection`.
 */
export interface MapSelectGeometry {
  type: 'Polygon' | 'MultiPolygon'
  coordinates: MapSelectPosition[][] | MapSelectPosition[][][]
}

/** Um item selecionável: aparece na lista e, quando tem `geometria`, no mapa. */
export interface MapSelectFeature {
  id: MapSelectId
  nome: string
  /** Linha de apoio na lista (ex.: o setor do talhão). Entra também na busca. */
  subtitulo?: string
  /** Área em hectares — somada no rodapé e mostrada no tooltip do polígono. */
  area?: number
  /** Sem geometria o item continua na lista, só não é desenhado no mapa. */
  geometria?: MapSelectGeometry | null
  /**
   * Carga livre do domínio, ignorada pelo componente e devolvida inteira a quem
   * chama — no `featureStyle`, nos eventos e no slot `#feature-detail`.
   *
   * É o que mantém o mapa genérico: a situação de uma recomendação, o vencimento
   * de um lote ou o talhão já colhido viajam aqui, e o componente não precisa
   * ganhar um prop (nem uma publicação) por dado novo que uma tela queira mostrar.
   */
  dados?: Record<string, unknown>
}

/** Modo do tooltip dos polígonos.
 *  - `'permanent'`: rótulo sempre visível no centro do polígono (default).
 *  - `'hover'`: o rótulo só aparece sob o cursor (`sticky`) — recomendado quando
 *    há muitos polígonos, porque tooltip permanente é um nó DOM por talhão
 *    reposicionado a cada pan/zoom. */
export type MapSelectTooltips = 'permanent' | 'hover'

/** Modo de seleção por clique no polígono (e na lista).
 *  - `'multiple'`: cada clique alterna o id no array (default do modo interativo).
 *  - `'single'`: o clique substitui a seleção (`[id]`); clicar no já selecionado desmarca (`[]`).
 *  - `'none'`: nenhum clique seleciona (default do `readonly`). */
export type MapSelectSelectionMode = 'multiple' | 'single' | 'none'

/** Quando abrir o cartão de detalhe (slot `#feature-detail`) de um polígono.
 *  - `'none'`: nunca (default — o componente segue como sempre foi).
 *  - `'hover'`: enquanto o cursor está sobre o polígono.
 *  - `'click'`: no clique, e fica aberto até clicar fora, apertar `Esc` ou
 *    clicar no mesmo polígono de novo. É o modo para conteúdo com link/botão,
 *    que o usuário precisa alcançar com o mouse. */
export type MapSelectFeatureDetail = 'none' | 'hover' | 'click'

/** Onde o cartão de detalhe aparece.
 *  - `'cursor'`: junto do ponto apontado (default), preso à caixa do mapa.
 *  - `'canto'`: ancorado no canto inferior esquerdo — estável, sem seguir o
 *    cursor; melhor para conteúdo alto ou para leitura demorada. */
export type MapSelectDetailPlacement = 'cursor' | 'canto'

/** Texto do rótulo/tooltip de um polígono. Recebe a feature e devolve a linha a
 *  mostrar; `''` esconde o rótulo daquele polígono. O default é
 *  `"<nome> · <área>"`. */
export type MapSelectFeatureLabel = (feature: MapSelectFeature) => string

/** Estilo de um polígono no mapa (subconjunto do `L.PathOptions`). */
export interface MapSelectPolygonStyle {
  color?: string
  weight?: number
  opacity?: number
  fillColor?: string
  fillOpacity?: number
}

/**
 * Ajuste de estilo de UM polígono, decidido pelo dado da feature.
 *
 * Recebe a feature e se ela está selecionada, e devolve só o que muda — o
 * resultado é mesclado SOBRE o estilo base (`polygonStyle` ou
 * `polygonSelectedStyle`, conforme a seleção). `null` deixa a feature no estilo
 * padrão. É o gancho para destaque semântico: o talhão que a recomendação
 * prevê, o lote vencido, a área já colhida.
 */
export type MapSelectFeatureStyle = (
  feature: MapSelectFeature,
  selected: boolean,
) => Partial<MapSelectPolygonStyle> | null | undefined
