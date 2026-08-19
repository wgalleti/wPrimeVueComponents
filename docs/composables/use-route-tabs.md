# useRouteTabs

Estado da navegação por abas de rota — o dono da lista que
[WTabNav e WTabViewport](/components/w-tab-nav) renderizam. É uma **fábrica**: chame uma
vez no boot, guarde a instância num módulo do app e passe-a por prop (regra da suite:
nenhum estado global dentro de componente).

Instala um `router.afterEach`: rota aceita por `isTabRoute` vira aba, identificada por
`tabKey` (default `route.path` — params contam, **query não**: mudar só a query atualiza a
aba em vez de abrir outra). A lista persiste no `storage` e volta após um reload como
"shells" que só montam quando ativados; a URL do reload sempre ganha a aba ativa.

## Uso

```ts
// composable/useAppTabs.ts — instância única do app
import { useRouteTabs } from '@wgalleti/primevue-components'
import router from '@/router'

export const tabsApi = useRouteTabs({
  router,
  storageKey: () => `app-tabs:${userId() ?? 'anon'}`,
  homePath: '/',
  isTabRoute: (r) => r.meta?.requiresAuth !== false && !r.meta?.print,
  resolveTabMeta: (r) => ({ title: tituloDaRota(r), icon: iconeDaRota(r) }),
  maxTabs: 12,
})
```

## Opções (`UseRouteTabsOptions`)

| Opção | Default | Para quê |
| --- | --- | --- |
| `router` | — | O `Router` do app (obrigatório). |
| `tabKey` | `route.path` | Identidade da aba. |
| `resolveTabMeta` | `{}` | Título/ícone/`closable`/`group` por rota; o que faltar cai em defaults. `group` agrupa as abas na barra (ex.: o módulo do menu) — aba nova entra colada no fim do próprio grupo. |
| `isTabRoute` | `true` | Quais rotas viram aba (login/impressão ficam fora). |
| `storage` | `localStorage` | Onde persistir; `null` desliga. |
| `storageKey` | `'w-route-tabs'` | Chave; função permite chave por usuário avaliada tarde. |
| `homePath` | `'/'` | Destino ao fechar a última aba. |
| `maxTabs` | — | Acima disso fecha a mais antiga não-ativa (guards respeitados). |

## API retornada (`RouteTabsApi`)

| Membro | O que faz |
| --- | --- |
| `tabs` / `activeKey` | A lista (`RouteTab[]`) e a aba ativa, reativas. |
| `activate(key)` | Navega para o `fullPath` da aba. |
| `close(key)` | Fecha respeitando os close guards; `false` = vetado ou não-fechável. |
| `closeOthers(key)` / `closeAll()` | Fecham em lote (guards e `closable` respeitados). |
| `reload(key)` | Remonta o componente da aba (estado da tela descartado). |
| `setTitle(key, title)` | Título dinâmico; `null` restaura o default da rota. |
| `isLive(rota\|path)` | A rota já tem aba hidratada? (ex.: pular overlay de navegação). |
| `runtime(key)` | Runtime interno (componente, rota congelada, guards) — uso do viewport. |

## Contexto da tela (`useTabHost`)

Dentro de uma tela renderizada pelo viewport, `useTabHost()` retorna o `TabHostContext`
da aba (ou `null` fora de abas): `hostEl` (alvo de `appendTo` de dialogs), `active`,
`setTitle`, `onTabActivated`/`onTabDeactivated` (equivalentes a
`onActivated`/`onDeactivated`) e `registerCloseGuard` (veto de fechamento — alterações
não salvas). Registros são desfeitos sozinhos quando a instância da tela morre.
