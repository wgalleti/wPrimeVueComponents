import { listPendingForms } from './usePendingForms'

/**
 * Versão publicada sem "limpar o cache": a aba aberta há dias descobre que o bundle dela
 * deixou de ser o publicado e recarrega no momento seguro (troca de tela ou volta à aba),
 * nunca com formulário pendente, offline ou com leitura velha do arquivo de versão.
 * Chunk removido pelo deploy vira uma recarga única por build.
 */

/** O que a detecção lê de uma rota (vue-router 4 e 5 servem). */
export interface RouteLike {
  name?: unknown
  path: string
  fullPath?: string
  matched?: readonly unknown[]
}

/** Só o que a instalação usa do roteador — sem acoplar à versão do vue-router. */
export interface RouterLike {
  beforeEach: (guard: (to: RouteLike & { fullPath: string }, from: RouteLike) => boolean) => unknown
  afterEach: (hook: () => void) => unknown
  onError: (handler: (erro: unknown, to: RouteLike) => void) => unknown
  resolve: (to: string) => { href: string }
}

export const MIN_CHECK_INTERVAL_MS = 60_000
export const RECENT_READ_MS = 5 * 60_000

const CHUNK_ERROR =
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS/i

export const isChunkError = (erro: unknown): boolean =>
  CHUNK_ERROR.test(String((erro as { message?: unknown })?.message ?? erro ?? ''))

const CHUNK_RELOAD_KEY = 'w-chunk-reload'

export interface PublishedVersionDeps {
  /** Identificador embutido no bundle em execução. */
  currentBuild: string
  /** Lê o arquivo de versão (sem cache). */
  fetchVersion: () => Promise<Response>
  now: () => number
  online: () => boolean
  pending: () => unknown[]
  reload: () => void
  goTo: (href: string) => void
  /** Armazenamento de sessão; `null` quando bloqueado (aí chunk ausente não recarrega). */
  storage: Pick<Storage, 'getItem' | 'setItem'> | null
  /** Avisa que há versão nova mas o formulário pendente impede a recarga. */
  warn: () => void
}

export interface PublishedVersion {
  check: () => Promise<void>
  canReload: () => boolean
  onTabVisible: () => Promise<void>
  onRouteChange: (to: RouteLike, from: RouteLike, href: string) => boolean
  onChunkError: (href?: string) => boolean
  readonly hasNewVersion: boolean
}

/** Núcleo sem globais: tudo o que toca navegador entra por parâmetro. */
export function createPublishedVersion(deps: PublishedVersionDeps): PublishedVersion {
  let versaoNova = false
  let ultimaLeitura = Number.NEGATIVE_INFINITY
  let ultimaTentativa = Number.NEGATIVE_INFINITY
  let emVoo: Promise<void> | null = null
  let recarregando = false
  let avisado = false

  async function ler(): Promise<void> {
    try {
      const resposta = await deps.fetchVersion()
      if (resposta.status !== 200) return
      const corpo = (await resposta.json()) as { build?: unknown }
      if (typeof corpo?.build !== 'string') return
      // Recalcula sempre: depois de um rollback, a versão volta a bater.
      versaoNova = corpo.build !== deps.currentBuild
      ultimaLeitura = deps.now()
    } catch {
      // Rede, página de manutenção em HTML, JSON inválido: não é leitura.
    }
  }

  function check(): Promise<void> {
    if (emVoo) return emVoo
    if (deps.now() - ultimaTentativa < MIN_CHECK_INTERVAL_MS) return Promise.resolve()
    ultimaTentativa = deps.now()
    emVoo = ler().finally(() => {
      emVoo = null
    })
    return emVoo
  }

  function canReload(): boolean {
    return (
      versaoNova &&
      !recarregando &&
      deps.now() - ultimaLeitura < RECENT_READ_MS &&
      deps.online() &&
      deps.pending().length === 0
    )
  }

  return {
    check,
    canReload,
    get hasNewVersion() {
      return versaoNova
    },
    async onTabVisible() {
      await check()
      if (canReload()) {
        recarregando = true
        deps.reload()
      }
    },
    onRouteChange(to, from, href) {
      // Primeira navegação e a mesma tela mudando a própria URL não são troca de tela.
      if (!from.matched?.length || (to.name !== undefined && to.name === from.name) || to.path === from.path) {
        return true
      }
      void check() // não atrasa a navegação: decide com o que já sabe
      if (!canReload()) return true
      recarregando = true
      deps.goTo(href)
      return false
    },
    onChunkError(href) {
      // Sem rede, o chunk falhou pela rede e não pelo deploy: recarregar trocaria o app
      // por a página offline do navegador e gastaria a única recarga deste build.
      if (!deps.online() || !deps.storage) return false
      try {
        if (deps.storage.getItem(CHUNK_RELOAD_KEY) === deps.currentBuild) return false
        if (deps.pending().length > 0) {
          // O mesmo erro chega pelo preload e pelo roteador: avisa uma vez.
          if (!avisado) deps.warn()
          avisado = true
          return false
        }
        deps.storage.setItem(CHUNK_RELOAD_KEY, deps.currentBuild)
      } catch {
        return false
      }
      recarregando = true
      if (href) deps.goTo(href)
      else deps.reload()
      return true
    },
  }
}

export interface InstallPublishedVersionOptions {
  /** Identificador do build em execução (o `__BUILD_ID__` do plugin `wBuildIdentity`). */
  buildId: string
  /** Desligue no servidor de desenvolvimento (`!import.meta.env.DEV`): lá não há arquivo de versão. */
  enabled?: boolean
  /** URL do arquivo de versão. Default: `<base>version.json`. */
  versionUrl?: string
  /** Formulários pendentes. Default: o registro de `usePendingForm`. */
  pending?: () => unknown[]
  /** Aviso quando o chunk sumiu mas há formulário pendente. */
  onBlocked?: () => void
}

/**
 * Liga a detecção ao roteador e aos eventos da página. Chame antes das outras guardas
 * (a que liga overlay de carregamento, por exemplo), para não deixar overlay preso.
 */
export function installPublishedVersion(router: RouterLike, options: InstallPublishedVersionOptions): PublishedVersion | null {
  if (options.enabled === false || typeof window === 'undefined') return null

  const base = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/'
  const versao = createPublishedVersion({
    currentBuild: options.buildId,
    fetchVersion: () => fetch(options.versionUrl ?? `${base}version.json`, { cache: 'no-store' }),
    now: () => Date.now(),
    online: () => navigator.onLine !== false,
    pending: options.pending ?? listPendingForms,
    reload: () => window.location.reload(),
    goTo: (href) => window.location.assign(href),
    storage: (() => {
      try {
        return window.sessionStorage
      } catch {
        return null
      }
    })(),
    warn: options.onBlocked ?? (() => {}),
  })

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void versao.onTabVisible()
  })
  window.addEventListener('pageshow', (evento) => {
    if (evento.persisted) void versao.onTabVisible()
  })

  // vite:preloadError chega ANTES do router.onError e não sabe o destino.
  let destino: string | undefined
  router.beforeEach((to, from) => {
    const href = router.resolve(to.fullPath).href
    const segue = versao.onRouteChange(to, from, href)
    destino = segue ? href : undefined
    return segue
  })
  router.afterEach(() => {
    destino = undefined
  })
  window.addEventListener('vite:preloadError', (evento) => {
    if (versao.onChunkError(destino)) evento.preventDefault()
  })
  router.onError((erro, to) => {
    const alvo = to?.fullPath ? router.resolve(to.fullPath).href : destino
    destino = undefined
    if (isChunkError(erro)) versao.onChunkError(alvo)
  })

  return versao
}
