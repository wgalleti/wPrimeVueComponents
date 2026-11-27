import { computed, ref, shallowReactive, type Component } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type {
  RouteTab,
  RouteTabMeta,
  RouteTabRuntime,
  RouteTabsApi,
  UseRouteTabsOptions,
} from '@/types/routeTabs'

/**
 * Estado da navegação por abas. É uma FÁBRICA: chame uma vez no boot do app,
 * guarde a instância num módulo seu e passe-a por prop para `WTabNav` e
 * `WTabViewport` (regra da suite: nenhum estado global dentro de componente).
 *
 * O composable instala um `router.afterEach`: rota que `isTabRoute` aceita
 * vira aba (ou reativa a existente — mudança só de query atualiza a aba, não
 * abre outra). O que é "uma aba" vem do parâmetro `mode`: `'screen'` (default,
 * uma aba por tela) ou `'module'` (uma aba por entrada de menu, com navegação
 * interna — ver `UseRouteTabsOptions`). A lista sobrevive a reload via
 * storage; as abas voltam como "shells" (`hydrated: false`) e só montam
 * quando ativadas — a URL do reload sempre ganha a disputa pela aba ativa.
 *
 * `scopeByGroup` liga as abas por espaço de trabalho: a barra (`visibleTabs`)
 * mostra só as abas do grupo da aba ativa, cada grupo lembra a sua última aba
 * ativa (`activateGroup` volta a ela) e fechar/limite atuam dentro do grupo.
 */

interface PersistedTab {
  key: string
  fullPath: string
  title: string
  icon?: string
  closable: boolean
  group?: string
  color?: string
}

interface PersistedState {
  v: 1
  activeKey: string | null
  tabs: PersistedTab[]
  /** Última aba ativa de cada grupo ('' = abas sem grupo). Opcional: estado gravado
   *  antes de o campo existir continua válido — por isso o `v` não mudou. */
  lastActive?: Record<string, string>
}

function snapshotRoute(to: RouteLocationNormalizedLoaded): Record<string, unknown> {
  return {
    fullPath: to.fullPath,
    path: to.path,
    name: to.name,
    params: to.params,
    query: to.query,
    hash: to.hash,
    meta: to.meta,
    matched: to.matched,
    redirectedFrom: to.redirectedFrom,
  }
}

/** Props que o RouterView passaria à view (`props: true | object | fn`). */
function resolveViewProps(to: RouteLocationNormalizedLoaded): Record<string, unknown> {
  const record = to.matched[to.matched.length - 1]
  const config = record?.props?.default
  if (config === true) return { ...to.params }
  if (typeof config === 'function') return config(to) ?? {}
  if (config && typeof config === 'object') return { ...config }
  return {}
}

/** Componente da view, já resolvido pelo pipeline do router (lazy incluso). */
function resolveViewComponent(to: RouteLocationNormalizedLoaded): Component | null {
  const record = to.matched[to.matched.length - 1]
  const component = record?.components?.default
  // Após a navegação o router já trocou a função lazy pelo componente real;
  // se ainda for função é um estado inesperado — o pane não monta nada.
  return component && typeof component !== 'function' ? (component as Component) : null
}

export function useRouteTabs(options: UseRouteTabsOptions): RouteTabsApi {
  const {
    router,
    mode = 'screen',
    moduleRoot,
    shouldRemount,
    resolveTabMeta = (): Partial<RouteTabMeta> => ({}),
    isTabRoute = () => true,
    storage = typeof localStorage === 'undefined' ? null : localStorage,
    storageKey = 'w-route-tabs',
    homePath = '/',
    maxTabs,
    scopeByGroup = false,
  } = options

  if (mode === 'module' && !moduleRoot) {
    throw new Error('[useRouteTabs] mode "module" exige a opção moduleRoot(route).')
  }

  /** Identidade da aba, derivada do modo de uso (ver `UseRouteTabsOptions.mode`). */
  const tabKey = (route: RouteLocationNormalizedLoaded): string =>
    (mode === 'module' && moduleRoot?.(route)) || route.path

  const tabs = ref<RouteTab[]>([])
  const activeKey = ref<string | null>(null)
  /** Grupo da última aba ativa: rota fora das abas não o apaga (a barra segue no mesmo espaço). */
  const currentGroup = ref<string | undefined>()
  /** Última aba ativa de cada grupo ('' = sem grupo): para onde `activateGroup` volta. */
  const lastActive = new Map<string, string>()
  const runtimes = new Map<string, RouteTabRuntime>()

  /** Grupo vazio é "sem grupo", como na barra e no `insertTab`. */
  const groupOf = (tab: RouteTab | undefined): string | undefined => tab?.group || undefined
  const visibleTabs = computed(() =>
    scopeByGroup ? tabs.value.filter((t) => groupOf(t) === currentGroup.value) : tabs.value,
  )
  let restored = false
  /** Chave usada no último restore — muda quando o usuário troca sem reload. */
  let restoredKey: string | null = null

  function resolveStorageKey(): string {
    return typeof storageKey === 'function' ? storageKey() : storageKey
  }

  // Síncrono de propósito: precisa estar no disco antes de um
  // `window.location.reload()` disparado logo após a mutação.
  function persist(): void {
    if (!storage) return
    const state: PersistedState = {
      v: 1,
      activeKey: activeKey.value,
      tabs: tabs.value.map(({ key, fullPath, title, icon, closable, group, color }) => ({
        key,
        fullPath,
        title,
        icon,
        closable,
        group,
        color,
      })),
      lastActive: Object.fromEntries(lastActive),
    }
    try {
      storage.setItem(resolveStorageKey(), JSON.stringify(state))
    } catch {
      /* storage cheio/indisponível não pode derrubar a navegação */
    }
  }

  /** Recarrega os shells persistidos. Roda no primeiro afterEach e de novo
   *  quando a storageKey muda (logout/login sem reload: as abas de um usuário
   *  nunca vazam para o outro). */
  function restore(): void {
    restored = true
    restoredKey = resolveStorageKey()
    tabs.value = []
    activeKey.value = null
    currentGroup.value = undefined
    lastActive.clear()
    runtimes.clear()
    if (!storage) return
    try {
      const raw = storage.getItem(resolveStorageKey())
      if (!raw) return
      const state = JSON.parse(raw) as PersistedState
      if (state?.v !== 1 || !Array.isArray(state.tabs)) return
      tabs.value = state.tabs
        .filter((t) => t && typeof t.key === 'string' && typeof t.fullPath === 'string')
        .filter((t) => stillATab(t.fullPath))
        .map((t) => ({ ...t, hydrated: false, remount: 0 }))
      // Só o que ainda aponta uma aba do próprio grupo; estado antigo não traz o campo.
      for (const [group, key] of Object.entries(state.lastActive ?? {})) {
        const tab = findTab(key)
        if (tab && (tab.group || '') === group) lastActive.set(group, key)
      }
      // Reload numa rota fora das abas: a barra volta no espaço da última aba ativa.
      currentGroup.value = groupOf(findTab(state.activeKey ?? ''))
    } catch {
      /* estado corrompido = começar sem abas */
    }
  }

  /** Aba salva cuja rota sumiu, virou redirecionamento ou deixou de ser aba (a URL
   *  mudou entre versões) não volta: viraria uma aba que nunca fica ativa. */
  function stillATab(fullPath: string): boolean {
    try {
      const resolved = router.resolve(fullPath)
      // Só o último registro redireciona de fato; pai de layout com `redirect` é comum.
      const last = resolved.matched[resolved.matched.length - 1]
      if (!last || last.redirect) return false
      return isTabRoute(resolved as unknown as RouteLocationNormalizedLoaded)
    } catch {
      return false
    }
  }

  function findTab(key: string): RouteTab | undefined {
    return tabs.value.find((t) => t.key === key)
  }

  /** Aba nova entra colada no fim do próprio grupo (como o menu agrupa). */
  function insertTab(tab: RouteTab): void {
    if (tab.group) {
      for (let i = tabs.value.length - 1; i >= 0; i -= 1) {
        if (tabs.value[i].group === tab.group) {
          tabs.value.splice(i + 1, 0, tab)
          return
        }
      }
    }
    tabs.value.push(tab)
  }

  function defaultTitleFor(to: RouteLocationNormalizedLoaded): string {
    const meta = resolveTabMeta(to)
    if (meta.title) return meta.title
    if (typeof to.name === 'string') return to.name
    return to.path
  }

  /** Liga (ou religa) o runtime da aba à rota recém-navegada. */
  function hydrate(tab: RouteTab, to: RouteLocationNormalizedLoaded): void {
    let runtime = runtimes.get(tab.key)
    // Modo 'module', trocou de PATH dentro da mesma aba = tela nova: o pane
    // remonta inteiro (chave inclui `remount`) com um runtime NOVO — a
    // instância que está saindo fica com o snapshot dela intacto até
    // desmontar (mutar a rota sob uma tela viva quebra o patch do Vue), e
    // título/ícone voltam aos da rota nova. Query-only continua no else — e
    // também a troca que `shouldRemount` declara ser a mesma tela (rascunho
    // que ganhou id): a view viva recebe os props novos.
    if (
      runtime &&
      mode === 'module' &&
      (runtime.route as { path: string }).path !== to.path &&
      (shouldRemount?.(runtime.route, to) ?? true)
    ) {
      runtimes.delete(tab.key)
      runtime = undefined
      tab.remount += 1
      const meta = resolveTabMeta(to)
      tab.title = meta.title ?? defaultTitleFor(to)
      if (meta.icon) tab.icon = meta.icon
    }
    if (!runtime) {
      // Shell restaurada do storage pode hidratar numa TELA diferente da
      // persistida (ex.: o menu levou à listagem e a shell guardava o
      // detalhe): título/ícone voltam aos da rota real. Hidratar no MESMO
      // path mantém o título persistido ("NF 46032") até a tela repor.
      if (tab.fullPath.split(/[?#]/)[0] !== to.path) {
        const meta = resolveTabMeta(to)
        tab.title = meta.title ?? defaultTitleFor(to)
        if (meta.icon) tab.icon = meta.icon
      }
      runtime = {
        component: resolveViewComponent(to),
        props: resolveViewProps(to),
        // shallow: `matched` carrega definições de componente — reatividade
        // profunda ali é peso morto; o router troca as chaves por inteiro.
        route: shallowReactive(snapshotRoute(to)) as unknown as RouteLocationNormalizedLoaded,
        closeGuards: [],
        activatedHooks: [],
        deactivatedHooks: [],
        defaultTitle: defaultTitleFor(to),
      }
      runtimes.set(tab.key, runtime)
    } else {
      // Só a aba ativa recebe a rota nova — panes ocultos ficam congelados.
      // Aqui é sempre a MESMA tela (query/hash, ou path que `shouldRemount`
      // liberou); path novo já virou runtime novo acima.
      runtime.component = resolveViewComponent(to)
      runtime.props = resolveViewProps(to)
      Object.assign(runtime.route, snapshotRoute(to))
    }
    tab.fullPath = to.fullPath
    tab.hydrated = true
  }

  function enforceMaxTabs(): void {
    if (!maxTabs || tabs.value.length <= maxTabs) return
    const closable = (t: RouteTab): boolean => t.key !== activeKey.value && t.closable
    // O limite é global, mas quem paga primeiro é o grupo que está abrindo abas.
    const victim = visibleTabs.value.find(closable) ?? tabs.value.find(closable)
    if (victim) void close(victim.key)
  }

  // Modo 'module': trocar de tela DENTRO da aba ativa descarta a instância
  // atual (remount no hydrate) — então os close guards da tela valem aqui
  // também: sair de um editor sujo para a listagem da mesma aba passa pela
  // confirmação, igual ao fechar. Troca de aba não passa por aqui: o pane
  // antigo segue vivo.
  if (mode === 'module') {
    router.beforeEach(async (to, from) => {
      if (!restored) return true
      if (!isTabRoute(to) || !isTabRoute(from)) return true
      const key = tabKey(to)
      if (key !== activeKey.value || key !== tabKey(from)) return true
      if (from.path === to.path) return true
      return await runCloseGuards(key)
    })
  }

  router.afterEach((to, _from, failure) => {
    // Navegação abortada (guard vetou, redirect, duplicada) não mexe nas abas.
    if (failure) return
    if (!restored || (storage && resolveStorageKey() !== restoredKey)) restore()
    if (!isTabRoute(to)) {
      activeKey.value = null
      return
    }
    const key = tabKey(to)
    let tab = findTab(key)
    if (!tab) {
      const meta = resolveTabMeta(to)
      tab = {
        key,
        fullPath: to.fullPath,
        title: meta.title ?? defaultTitleFor(to),
        icon: meta.icon,
        closable: meta.closable ?? true,
        group: meta.group,
        color: meta.color,
        hydrated: false,
        remount: 0,
      }
      insertTab(tab)
    }
    hydrate(tab, to)
    activeKey.value = key
    currentGroup.value = groupOf(tab)
    lastActive.set(tab.group || '', key)
    enforceMaxTabs()
    persist()
  })

  async function activate(key: string): Promise<void> {
    const tab = findTab(key)
    if (!tab || key === activeKey.value) return
    await router.push(tab.fullPath)
  }

  async function activateGroup(group: string): Promise<boolean> {
    const ofGroup = tabs.value.filter((t) => t.group === group)
    const target =
      ofGroup.find((t) => t.key === lastActive.get(group)) ?? ofGroup[ofGroup.length - 1]
    if (!target) return false
    await activate(target.key)
    return true
  }

  async function runCloseGuards(key: string): Promise<boolean> {
    const runtime = runtimes.get(key)
    if (!runtime) return true
    for (const guard of [...runtime.closeGuards]) {
      if (!(await guard())) return false
    }
    return true
  }

  function removeTab(key: string): void {
    tabs.value = tabs.value.filter((t) => t.key !== key)
    runtimes.delete(key)
  }

  async function close(key: string): Promise<boolean> {
    const tab = findTab(key)
    if (!tab) return true
    if (!tab.closable) return false
    if (!(await runCloseGuards(key))) return false
    // Quem assume a ativa: a vizinha da esquerda; sem esquerda, a da direita. Com
    // `scopeByGroup` só vale vizinha do MESMO grupo — fechar a última dele vai ao homePath.
    const pool = scopeByGroup ? tabs.value.filter((t) => groupOf(t) === groupOf(tab)) : tabs.value
    const index = pool.findIndex((t) => t.key === key)
    const next = pool[index - 1] ?? pool[index + 1] ?? null
    const wasActive = key === activeKey.value
    removeTab(key)
    if (wasActive) {
      activeKey.value = null
      await router.push(next ? next.fullPath : homePath)
    }
    persist()
    return true
  }

  async function closeOthers(key: string): Promise<void> {
    const group = groupOf(findTab(key))
    const others = tabs.value.filter(
      (t) => t.key !== key && t.closable && (!scopeByGroup || groupOf(t) === group),
    )
    for (const other of others) {
      await runCloseGuards(other.key).then((ok) => ok && removeTab(other.key))
    }
    persist()
    await activate(key)
  }

  // `visibleTabs` é a lista inteira sem `scopeByGroup` e só o grupo ativo com ele;
  // `allGroups` passa por cima do escopo (troca de organização, saída).
  async function closeAll({ allGroups = false }: { allGroups?: boolean } = {}): Promise<void> {
    let activeSurvived = false
    for (const tab of [...(allGroups ? tabs.value : visibleTabs.value)]) {
      if (!tab.closable || !(await runCloseGuards(tab.key))) {
        activeSurvived ||= tab.key === activeKey.value
        continue
      }
      removeTab(tab.key)
    }
    persist()
    if (!activeSurvived && activeKey.value) {
      // Quem sobrou do grupo ativo; com `allGroups`, senão a primeira que sobrou na lista.
      const next = visibleTabs.value[0] ?? (allGroups ? tabs.value[0] : undefined)
      activeKey.value = null
      await router.push(next ? next.fullPath : homePath)
    }
  }

  function reload(key: string): void {
    const tab = findTab(key)
    if (!tab?.hydrated) return
    const runtime = runtimes.get(key)
    if (runtime) {
      // A tela vai remontar: registros da instância antiga morrem com ela.
      runtime.closeGuards = []
      runtime.activatedHooks = []
      runtime.deactivatedHooks = []
    }
    tab.remount += 1
  }

  function setTitle(key: string, title: string | null | undefined): void {
    const tab = findTab(key)
    if (!tab) return
    tab.title = title ?? runtimes.get(key)?.defaultTitle ?? tab.title
    persist()
  }

  function isLive(target: RouteLocationNormalizedLoaded | string): boolean {
    const key = typeof target === 'string' ? target : tabKey(target)
    return findTab(key)?.hydrated ?? false
  }

  return {
    tabs,
    activeKey,
    visibleTabs,
    activeGroup: computed(() => currentGroup.value),
    scopeByGroup,
    activate,
    activateGroup,
    close,
    closeOthers,
    closeAll,
    reload,
    setTitle,
    isLive,
    runtime: (key) => runtimes.get(key),
  }
}
