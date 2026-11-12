const emitidos = new Set<string>()

/** Aviso de desenvolvimento emitido uma vez por `key` (some do build de produção). */
export function warnOnce(key: string, message: string): void {
  if (!import.meta.env.DEV || emitidos.has(key)) return
  emitidos.add(key)
  console.warn(message)
}

/** Só para teste: esquece o que já foi avisado. */
export function resetWarnOnce(): void {
  emitidos.clear()
}
