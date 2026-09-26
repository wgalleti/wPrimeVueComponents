import { describe, it, expect } from 'vitest'
import { SPARK_H, SPARK_W, sparklineGeometry } from './sparkline'

const ys = (line: string) => line.split(' ').map((p) => Number(p.split(',')[1]))

describe('sparklineGeometry', () => {
  it('sem valores não desenha', () => {
    expect(sparklineGeometry([])).toBeNull()
    expect(sparklineGeometry(undefined)).toBeNull()
    expect(sparklineGeometry([Number.NaN])).toBeNull()
  })

  it('um valor vira linha reta no meio, de ponta a ponta', () => {
    const g = sparklineGeometry([7])!
    expect(g.line).toBe(`0,${SPARK_H / 2} ${SPARK_W},${SPARK_H / 2}`)
  })

  it('todos iguais: linha reta no meio', () => {
    expect(new Set(ys(sparklineGeometry([3, 3, 3])!.line))).toEqual(new Set([SPARK_H / 2]))
  })

  it('o maior valor fica em cima e o menor embaixo, dentro da folga', () => {
    const y = ys(sparklineGeometry([0, 10, 5])!.line)
    expect(y[1]).toBeLessThan(y[2])
    expect(y[2]).toBeLessThan(y[0])
    expect(Math.min(...y)).toBeGreaterThan(0)
    expect(Math.max(...y)).toBeLessThan(SPARK_H)
  })

  it('a área fecha a linha na base', () => {
    const g = sparklineGeometry([1, 2])!
    expect(g.area.startsWith(`0,${SPARK_H} `)).toBe(true)
    expect(g.area.endsWith(` ${SPARK_W},${SPARK_H}`)).toBe(true)
  })
})
