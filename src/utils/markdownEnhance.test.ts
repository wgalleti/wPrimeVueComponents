import { describe, expect, it } from 'vitest'
import { normalizarCor } from './markdownEnhance'

describe('normalizarCor', () => {
  it('converte color(srgb …) do navegador em rgb() que o mermaid entende', () => {
    expect(normalizarCor('color(srgb 1 0 0.5)')).toBe('rgb(255, 0, 128)')
    expect(normalizarCor('color(srgb 0.2 0.4 0.6 / 0.5)')).toBe('rgba(51, 102, 153, 0.5)')
    expect(normalizarCor('color(srgb 0 0 0 / 40%)')).toBe('rgba(0, 0, 0, 0.4)')
  })

  it('deixa hex, rgb e hsl como estão e devolve null para vazio', () => {
    expect(normalizarCor('#1f5092')).toBe('#1f5092')
    expect(normalizarCor('rgb(31, 80, 146)')).toBe('rgb(31, 80, 146)')
    expect(normalizarCor('hsl(210 65% 35%)')).toBe('hsl(210 65% 35%)')
    expect(normalizarCor('')).toBeNull()
  })

  it('satura canais fora de 0–1', () => {
    expect(normalizarCor('color(srgb 1.2 -0.1 0.5)')).toBe('rgb(255, 0, 128)')
  })
})
