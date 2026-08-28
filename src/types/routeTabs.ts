import { inject, type Component, type InjectionKey, type Ref } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

/**
 * Navegação por abas (estilo browser/ERP): cada rota vira uma aba viva, com
 * fechar/recarregar e estado preservado ao alternar. O estado mora no
 * composable `useRouteTabs`; `WTabNav` (barra) e `WTabViewport` (painéis)
 * apenas o recebem via prop — nenhum componente guarda estado global.
 */

/** Meta de apresentação de uma aba, resolvida a partir da rota. */
export interface RouteTabMeta {
  title: string
  /** Ícone PrimeIcons (ex.: 'pi pi-file'). */
  icon?: string
  /** `false` esconde o X e ignora fechar (ex.: dashboard fixo). */
  closable?: boolean
  /**
   * Grupo da aba (ex.: o módulo do menu — "Sementes", "Estoque"). Abas do
   * mesmo grupo ficam juntas na barra, com o rótulo do grupo antes do bloco.
   */
  group?: string
  /**
   * Cor do grupo (qualquer cor CSS). Sem ela, o WTabNav deriva uma cor estável
   * do nome do grupo — informe só para fixar a cor de um módulo.
   */
  color?: string
}

/** Uma aba aberta. `key` identifica (path com params); `fullPath` navega. */
export interface RouteTab {
  key: string
  /** Último fullPath visitado (query inclusa) — usado no push e no restore. */
  fullPath: string
  title: string
  icon?: string
  closable: boolean
  /** Grupo (módulo) da aba — abas do mesmo grupo ficam contíguas na barra. */
  group?: string
  /** Cor do grupo fixada pela rota (`RouteTabMeta.color`); ausente = derivada. */
  color?: string
  /**
   * `false` = aba restaurada do storage, ainda sem componente montado.
   * Hidrata na primeira ativação (o router resolve o lazy no caminho).
   */
  hydrated: boolean
  /** Contador de remontagem: `reload()` incrementa e o pane troca o `:key`. */
  remount: number
}

/**
 * Lado não serializável de uma aba hidratada — componente resolvido, snapshot
 * de rota e os registros feitos pela tela via `useTabHost`. Consumido pelo
 * WTabViewport; não persiste.
 */
export interface RouteTabRuntime {
  component: Component | null
  props: Record<string, unknown>
  /**
   * Snapshot reativo da rota, provido ao pane sob a `routeLocationKey` do
   * vue-router: `useRoute()` da tela enxerga ESTA rota, congelada — só é
   * atualizada quando a aba é a ativa. É o que impede um pane oculto de
   * reagir à navegação global (o bug clássico de sistemas de abas).
   */
  route: RouteLocationNormalizedLoaded
  closeGuards: Array<() => boolean | Promise<boolean>>
  activatedHooks: Array<() => void>
  deactivatedHooks: Array<() => void>
  /** Título default da rota, para `setTitle(null)` restaurar. */
  defaultTitle: string
}

export interface UseRouteTabsOptions {
  router: Router
  /**
   * Modo de uso — o parâmetro que define o que é "uma aba":
   * - `'screen'` (default): cada tela é uma aba. Identidade = `route.path`
   *   (params contam, query não): NF 123 e NF 456 são abas distintas.
   * - `'module'`: uma aba por entrada de menu. Identidade = `moduleRoot(route)`;
   *   navegar entre telas do mesmo módulo acontece DENTRO da aba (a view
   *   remonta, título/ícone voltam aos da rota nova e os close guards valem
   *   também nessa troca).
   */
  mode?: 'screen' | 'module'
  /**
   * Raiz do módulo da rota (ex.: path da listagem) — identidade da aba no modo
   * `'module'`. Obrigatório nesse modo; retornar falsy cai em `route.path`.
   */
  moduleRoot?: (route: RouteLocationNormalizedLoaded) => string | null | undefined
  /** Título/ícone/closable da aba. O que faltar cai em defaults sensatos. */
  resolveTabMeta?: (route: RouteLocationNormalizedLoaded) => Partial<RouteTabMeta>
  /** Quais rotas viram aba. Default: todas. */
  isTabRoute?: (route: RouteLocationNormalizedLoaded) => boolean
  /** Onde persistir. Default: `localStorage`; `null` desliga a persistência. */
  storage?: Storage | null
  /** Chave no storage. Função permite chave por usuário avaliada tarde. */
  storageKey?: string | (() => string)
  /** Destino ao fechar a última aba. Default: `/`. */
  homePath?: string
  /** Acima disso, a aba mais antiga não-ativa é fechada (guards respeitados). */
  maxTabs?: number
}

export interface RouteTabsApi {
  tabs: Ref<RouteTab[]>
  activeKey: Ref<string | null>
  /** Ativa a aba (navega para o fullPath dela). */
  activate: (key: string) => Promise<void>
  /** Fecha respeitando os close guards da aba. `false` = algum guard vetou. */
  close: (key: string) => Promise<boolean>
  closeOthers: (key: string) => Promise<void>
  closeAll: () => Promise<void>
  /** Remonta o componente da aba (o estado da tela é descartado). */
  reload: (key: string) => void
  /** Título dinâmico ("NF 000123"). `null` volta ao título default da rota. */
  setTitle: (key: string, title: string | null | undefined) => void
  /** A rota já tem aba hidratada? (ex.: para pular overlay de navegação). */
  isLive: (target: RouteLocationNormalizedLoaded | string) => boolean
  /** Runtime interno da aba. Uso do WTabViewport; não persiste. */
  runtime: (key: string) => RouteTabRuntime | undefined
}

/**
 * Contexto que o pane fornece à tela (e aos dialogs dela). Injete com
 * `useTabHost()` — fora de abas retorna `null` e tudo degrada para o
 * comportamento padrão (dialog no body, título no breadcrumb etc.).
 */
export interface TabHostContext {
  /** Container do pane — alvo de `appendTo` para o dialog viver NA aba. */
  hostEl: Ref<HTMLElement | null>
  active: Ref<boolean>
  /** Título dinâmico da aba; `null` restaura o default da rota. */
  setTitle: (title: string | null | undefined) => void
  /** Chamado ao voltar para a aba (equivalente a onActivated). */
  onTabActivated: (fn: () => void) => void
  /** Chamado ao sair da aba (equivalente a onDeactivated). */
  onTabDeactivated: (fn: () => void) => void
  /** Veta o fechar da aba (ex.: alterações não salvas). `false` = não fecha. */
  registerCloseGuard: (guard: () => boolean | Promise<boolean>) => void
}

export const W_TAB_HOST_KEY: InjectionKey<TabHostContext> = Symbol('w-tab-host')

/** Contexto da aba que envolve o componente atual, ou `null` fora de abas. */
export function useTabHost(): TabHostContext | null {
  return inject(W_TAB_HOST_KEY, null)
}
