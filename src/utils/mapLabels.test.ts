import { describe, it, expect } from 'vitest'
import { escolherNivelRotulo, FOLGA_ROTULO_PADRAO } from './mapLabels'

const caixa = (largura: number, altura: number) => ({ largura, altura })
const texto = (largura: number, altura = 16) => ({ largura, altura })

describe('escolherNivelRotulo', () => {
  it('cabe inteiro: texto completo', () => {
    expect(escolherNivelRotulo(caixa(200, 200), texto(88), texto(24))).toBe('completo')
  })

  it('só o curto cabe: cai para o curto', () => {
    expect(escolherNivelRotulo(caixa(40, 40), texto(88), texto(24))).toBe('curto')
  })

  it('nem o curto cabe: oculto', () => {
    expect(escolherNivelRotulo(caixa(10, 10), texto(88), texto(24))).toBe('oculto')
  })

  it('a altura conta tanto quanto a largura', () => {
    // Larga o bastante, baixa demais: 12 × 0,85 = 10,2 < 16 de altura do texto.
    expect(escolherNivelRotulo(caixa(400, 12), texto(88), texto(24))).toBe('oculto')
  })

  it('sem texto curto o degrau some: ou cabe inteiro, ou oculto', () => {
    expect(escolherNivelRotulo(caixa(40, 40), texto(88), null)).toBe('oculto')
  })

  it('folga menor aperta o critério', () => {
    expect(escolherNivelRotulo(caixa(120, 120), texto(88), texto(24))).toBe('completo')
    expect(escolherNivelRotulo(caixa(120, 120), texto(88), texto(24), 0.5)).toBe('curto')
  })

  it('folga default é 0,85 — a caixa envolvente promete mais do que o desenho tem', () => {
    expect(FOLGA_ROTULO_PADRAO).toBe(0.85)
    // 100 × 0,85 = 85 < 88: com folga 1 caberia, com a default não.
    expect(escolherNivelRotulo(caixa(100, 100), texto(88), texto(24))).toBe('curto')
    expect(escolherNivelRotulo(caixa(100, 100), texto(88), texto(24), 1)).toBe('completo')
  })

  it('sem medida do texto (jsdom, antes do layout) mostra tudo — nunca esconde no escuro', () => {
    expect(escolherNivelRotulo(caixa(10, 10), null, texto(24))).toBe('completo')
    expect(escolherNivelRotulo(caixa(10, 10), texto(0, 0), texto(24))).toBe('completo')
  })

  it('caixa sem tamanho (mapa ainda sem view) também mostra tudo', () => {
    expect(escolherNivelRotulo(caixa(0, 0), texto(88), texto(24))).toBe('completo')
  })
})
