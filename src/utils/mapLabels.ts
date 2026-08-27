/**
 * Regra de encaixe do rótulo de polígono no mapa (`WMapSelect`, `tooltips="auto"`).
 *
 * Fica fora do SFC porque é a única parte da lógica que dá para provar sem
 * Leaflet nem layout de navegador: dadas a caixa do polígono em pixels e a
 * medida do texto, qual nível de rótulo cabe.
 */

/** Medida em pixels — de uma caixa de polígono ou de um texto já renderizado. */
export interface MedidaRotulo {
  largura: number
  altura: number
}

/** Quanto do rótulo cabe na caixa do polígono.
 *  - `'completo'`: o texto inteiro (ex.: `"P41 · 172 ha"`).
 *  - `'curto'`: só a identificação (ex.: `"P41"`).
 *  - `'oculto'`: nem o curto cabe — o rótulo some e o desenho aparece. */
export type NivelRotulo = 'completo' | 'curto' | 'oculto'

/** Folga default: polígono não é retângulo, então a caixa envolvente promete
 *  mais espaço do que o desenho realmente tem no meio. */
export const FOLGA_ROTULO_PADRAO = 0.85

function cabe(texto: MedidaRotulo | null, largura: number, altura: number): boolean {
  if (!texto || texto.largura <= 0 || texto.altura <= 0) return false
  return texto.largura <= largura && texto.altura <= altura
}

/**
 * Decide o nível de rótulo para UM polígono.
 *
 * `completo`/`curto` sem medida (0 × 0) significam "não deu para medir" — em
 * jsdom, ou antes do primeiro layout. Aí o resultado é `'completo'`: o padrão
 * seguro é continuar mostrando o que sempre foi mostrado, nunca esconder por
 * causa de uma medida que não existe. A caixa 0 × 0 (mapa ainda sem view) segue
 * a mesma regra.
 *
 * Passar `curto` igual ao `completo` (ou `null`) simplesmente tira o degrau do
 * meio: ou cabe inteiro, ou some.
 */
export function escolherNivelRotulo(
  caixa: MedidaRotulo,
  completo: MedidaRotulo | null,
  curto: MedidaRotulo | null,
  folga: number = FOLGA_ROTULO_PADRAO,
): NivelRotulo {
  if (!completo || completo.largura <= 0 || completo.altura <= 0) return 'completo'
  if (caixa.largura <= 0 || caixa.altura <= 0) return 'completo'

  const largura = caixa.largura * folga
  const altura = caixa.altura * folga

  if (cabe(completo, largura, altura)) return 'completo'
  if (cabe(curto, largura, altura)) return 'curto'
  return 'oculto'
}
