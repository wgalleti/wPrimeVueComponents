import type { CrudManagerConfig } from '@/types/manager'

/**
 * Helper de autoria tipado para o config do `useCrudManager`.
 *
 * Dá inferência do tipo do registro `T` (usado em `rowActions`, `onAfterSave`,
 * `transformPayload`, etc.) e autocomplete/type-check ao montar o config,
 * sem precisar anotar `CrudManagerConfig<T>` na mão.
 *
 * @example
 * const config = defineCrudConfig<Produto>({
 *   endpoint: '/produtos',
 *   columns: [...],
 *   form: [...],
 *   onAfterSave: (p) => { p.nome },  // p é Produto
 * })
 * const crud = useCrudManager(config)
 */
export function defineCrudConfig<T extends Record<string, unknown> = Record<string, unknown>>(
  config: CrudManagerConfig<T>,
): CrudManagerConfig<T> {
  return config
}
