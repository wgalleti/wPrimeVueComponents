# useRouteTabs

Estado da navegação por abas de rota — o dono da lista que
[WTabNav e WTabViewport](/components/w-tab-nav) renderizam. É uma **fábrica**: chame uma
vez no boot, guarde a instância num módulo do app e passe-a por prop (regra da suite:
nenhum estado global dentro de componente).

Instala um `router.afterEach`: rota aceita por `isTabRoute` vira aba. O que é "uma aba"
é o parâmetro **`mode`**:

- **`'screen'`** (default) — cada tela é uma aba. Identidade = `route.path` (params
  contam, **query não**: mudar só a query atualiza a aba em vez de abrir outra).
- **`'module'`** — uma aba por entrada de menu. Identidade = `moduleRoot(route)`
  (ex.: o path da listagem do módulo); navegar entre telas do mesmo módulo acontece
  **dentro** da aba: a view remonta, título/ícone voltam aos da rota nova e os close
  guards valem também nessa troca (sair de um editor sujo pede confirmação).

A lista persiste no `storage` e volta após um reload como "shells" que só montam quando
ativados; a URL do reload sempre ganha a aba ativa.

## Uso

```ts
// composable/useAppTabs.ts — instância única do app
import { useRouteTabs } from '@wgalleti/primevue-components'
import router from '@/router'

export const tabsApi = useRouteTabs({
  router,
  mode: 'module', // uma aba por item de menu; omita para uma aba por tela
  moduleRoot: (r) => pathDaListagem(r.name, r.path),
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
| `mode` | `'screen'` | O que é "uma aba": `'screen'` (uma por tela) ou `'module'` (uma por entrada de menu, com navegação interna). |
| `moduleRoot` | — | Raiz do módulo da rota (identidade da aba no modo `'module'`). Obrigatório nesse modo; retornar falsy cai em `route.path`. |
| `resolveTabMeta` | `{}` | Título/ícone/`closable`/`group` por rota; o que faltar cai em defaults. `group` agrupa as abas na barra (ex.: o módulo do menu) — aba nova entra colada no fim do próprio grupo; `color` fixa a cor do grupo (sem ela o WTabNav deriva uma do nome). |
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
