import type { PaletteItem } from '@/types/commandPalette'

/** Sem acento, sem caixa e sem espaço nas pontas. */
export function normalizar(texto: unknown): string {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

/** Cada palavra do termo precisa aparecer no rótulo ou no grupo; quem começa pelo termo vem antes. */
export function filterPaletteItems<T extends PaletteItem>(itens: T[], termo: string): T[] {
  const palavras = normalizar(termo).split(/\s+/).filter(Boolean)
  if (!palavras.length) return itens
  const achados: { item: T; ponto: number }[] = []
  for (const item of itens) {
    const rotulo = normalizar(item.label)
    const alvo = `${rotulo} ${normalizar(item.group)}`
    if (!palavras.every((p) => alvo.includes(p))) continue
    achados.push({ item, ponto: rotulo.startsWith(palavras[0]) ? 0 : 1 })
  }
  // sort estável: dentro da mesma pontuação vale a ordem original
  return achados.sort((a, b) => a.ponto - b.ponto).map((a) => a.item)
}
