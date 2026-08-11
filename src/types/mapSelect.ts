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
}

/** Estilo de um polígono no mapa (subconjunto do `L.PathOptions`). */
export interface MapSelectPolygonStyle {
  color?: string
  weight?: number
  opacity?: number
  fillColor?: string
  fillOpacity?: number
}
