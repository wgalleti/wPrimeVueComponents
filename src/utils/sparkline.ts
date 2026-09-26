// Geometria da sparkline do WKpiCard: pontos de uma polyline e o polígono da
// área embaixo dela, num viewBox fixo que o SVG estica para a largura do card
// (`preserveAspectRatio="none"` + traço que não escala).

/** Caixa de desenho da sparkline (unidades do viewBox, não pixels). */
export const SPARK_W = 100
export const SPARK_H = 24
/** Folga em cima e embaixo para o traço não ser cortado no pico/vale. */
const PAD = 2

export interface SparklineGeometry {
  /** `points` da polyline. */
  line: string
  /** `points` do polígono da área (a linha fechada até a base). */
  area: string
}

const fmt = (n: number) => Number(n.toFixed(2)).toString()

/**
 * Pontos da sparkline. Valores não finitos são descartados; nenhum valor
 * devolve `null` (o card não desenha nada); um valor ou todos iguais viram uma
 * linha reta no meio da altura.
 */
export function sparklineGeometry(
  values: readonly number[] | null | undefined,
): SparklineGeometry | null {
  const vals = (values ?? []).filter((v) => Number.isFinite(v))
  if (!vals.length) return null
  const serie = vals.length === 1 ? [vals[0], vals[0]] : vals

  const min = Math.min(...serie)
  const max = Math.max(...serie)
  const span = max - min
  const stepX = SPARK_W / (serie.length - 1)

  const pontos = serie.map((v, i) => {
    const x = i * stepX
    const y = span === 0 ? SPARK_H / 2 : PAD + (1 - (v - min) / span) * (SPARK_H - PAD * 2)
    return `${fmt(x)},${fmt(y)}`
  })

  const line = pontos.join(' ')
  const area = `0,${SPARK_H} ${line} ${SPARK_W},${SPARK_H}`
  return { line, area }
}
