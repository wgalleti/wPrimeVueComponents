import { getCurrentInstance } from 'vue'
import type { LocationQuery, Router } from 'vue-router'

export interface UrlState {
  /** Valor da chave na query (a primeira, se repetida); `undefined` se ausente. */
  get(name: string): string | undefined
  /** Aplica `nome → valor` na query; `null` remove a chave. Só navega se algo mudou. */
  write(patch: Record<string, string | null>): void
}

// Escritas no mesmo tick (ex.: WCrudView + WTabBar) acumulam aqui: `router.replace` é
// assíncrono e a segunda leria a query antiga, desfazendo a primeira.
const pending = new WeakMap<Router, LocationQuery>()

/**
 * Estado de tela na query da URL, via `router.replace` (nunca push). Interno aos
 * componentes com `urlState`/`urlKey`.
 *
 * O router vem de `app.config.globalProperties.$router` — sem importar `vue-router` em
 * runtime, que é peer opcional. Sem router: avisa em dev (se `warn`; o default ligado de `urlState` fica mudo) e devolve `null` (o componente
 * segue sem sincronizar). Só escreve enquanto `route.path` é o da montagem: telas ocultas
 * das abas de rota seguem vivas e não podem sujar a URL da aba ativa.
 */
export function useUrlState(prefix = '', warn = true): UrlState | null {
  const router = getCurrentInstance()?.appContext.config.globalProperties.$router as
    Router | undefined
  if (!router?.currentRoute) {
    if (warn && import.meta.env?.DEV) {
      console.warn('[wgalleti/primevue-components] urlState/urlKey exige vue-router instalado.')
    }
    return null
  }
  const path = router.currentRoute.value.path
  const key = (name: string) => (prefix ? `${prefix}_${name}` : name)

  return {
    get(name) {
      const v = router.currentRoute.value.query[key(name)]
      return (Array.isArray(v) ? v[0] : v) ?? undefined
    },
    write(patch) {
      const cur = router.currentRoute.value
      if (cur.path !== path) return
      const query: LocationQuery = { ...(pending.get(router) ?? cur.query) }
      let changed = false
      for (const [name, value] of Object.entries(patch)) {
        const k = key(name)
        if (value === null) {
          if (k in query) {
            delete query[k]
            changed = true
          }
        } else if (query[k] !== value) {
          query[k] = value
          changed = true
        }
      }
      if (!changed) return
      pending.set(router, query)
      void router.replace({ path, query, hash: cur.hash }).finally(() => pending.delete(router))
    },
  }
}
