import { computed, getCurrentInstance, type Ref } from 'vue'
import type { LocationQuery, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useTabHost } from '@/types/routeTabs'

export interface UrlState {
  /** Valor da chave na query (a primeira, se repetida); `undefined` se ausente. */
  get(name: string): string | undefined
  /**
   * A chave como ref reativa (para `watch`): segue a query da rota desta tela — a da aba,
   * que só muda enquanto ela é a ativa, ou a global fora de abas.
   */
  ref(name: string): Readonly<Ref<string | undefined>>
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
 * segue sem sincronizar).
 *
 * Leitura: numa aba de rota, a rota DA ABA (`useTabHost().route`) — uma tela remontada
 * numa aba oculta não enxerga a query de outra; fora de abas, a rota global.
 * Escrita: só quando a rota global é a desta tela — na aba, ela ativa e com o mesmo path;
 * fora, o path da montagem. Escrita barrada numa aba oculta fica guardada e é aplicada
 * quando a aba volta a ser ativa, salvo se a aba voltou por um link com outra URL: aí a
 * URL nova é a verdade e quem observa `ref()` se acerta por ela.
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
  const tab = useTabHost()
  // Host sem rota (feito à mão) conta como fora de abas.
  const host = tab?.route ? { ...tab, route: tab.route } : null
  const route = (): RouteLocationNormalizedLoaded => host?.route ?? router.currentRoute.value
  const mountPath = route().path
  const key = (name: string) => (prefix ? `${prefix}_${name}` : name)
  const read = (name: string): string | undefined => {
    const v = route().query[key(name)]
    return (Array.isArray(v) ? v[0] : v) ?? undefined
  }
  const canWrite = (): boolean =>
    host
      ? host.active.value && router.currentRoute.value.path === host.route.path
      : router.currentRoute.value.path === mountPath

  // Escrita barrada em aba oculta, e a URL da aba quando foi barrada.
  let deferred: Record<string, string | null> | null = null
  let deferredAt = ''
  host?.onTabActivated(() => {
    const patch = deferred
    deferred = null
    if (patch && route().fullPath === deferredAt) state.write(patch)
  })

  const state: UrlState = {
    get: read,
    ref: (name) => computed(() => read(name)),
    write(patch) {
      if (!canWrite()) {
        if (host) {
          if (!deferred) deferredAt = route().fullPath
          deferred = { ...deferred, ...patch }
        }
        return
      }
      const cur = router.currentRoute.value
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
      void router
        .replace({ path: cur.path, query, hash: cur.hash })
        .finally(() => pending.delete(router))
    },
  }
  return state
}
