/** Iniciais de um nome para o avatar: primeira letra da primeira e da última palavra (ou só a primeira). */
export function initialsOf(name?: string | null): string {
  const words = (name ?? '').trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  const first = words[0].charAt(0)
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : ''
  return (first + last).toUpperCase()
}

/** Índice estável (1 a `total`) derivado do texto: a mesma pessoa tem sempre a mesma cor. */
export function toneOf(name?: string | null, total = 6): number {
  const text = (name ?? '').trim().toLowerCase()
  let hash = 0
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0
  return (hash % total) + 1
}
