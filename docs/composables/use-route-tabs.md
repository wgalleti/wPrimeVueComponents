# useRouteTabs

Estado da navegação por abas de rota — o dono da lista que
[WTabNav e WTabViewport](/components/w-tab-nav) renderizam. É uma **fábrica**: chame uma
vez no boot, guarde a instância num módulo do app e passe-a por prop (regra da suite:
nenhum estado global dentro de componente).

::: warning Só no cliente
A instância é um singleton de módulo com o estado do usuário: não use em SSR (no servidor ela
seria compartilhada entre requisições). Num app Nuxt, crie-a num plugin `.client.ts` e
renderize `WTabNav`/`WTabViewport` dentro de `<ClientOnly>`.
:::

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

Com **`scopeByGroup`** as abas ficam separadas por espaço de trabalho (o `group` da aba): a
barra mostra um grupo por vez — ver [Abas por espaço de trabalho](#abas-por-espaco-de-trabalho).

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
| `shouldRemount` | sempre remonta | Modo `'module'`: `(from, to) => boolean`. Devolva `false` quando a troca de path é a **mesma tela** mudando de identidade — `/pedidos/novo` → `/pedidos/<id>` ao nascer o rascunho. A view fica viva e recebe os `props` novos, sem animação de entrada nem releitura do documento. |
| `resolveTabMeta` | `{}` | Título/ícone/`closable`/`group` por rota; o que faltar cai em defaults. `group` agrupa as abas na barra (ex.: o módulo do menu) — aba nova entra colada no fim do próprio grupo; `color` fixa a cor do grupo (sem ela o WTabNav deriva uma do nome). |
| `isTabRoute` | `true` | Quais rotas viram aba (login/impressão ficam fora). |
| `storage` | `localStorage` | Onde persistir; `null` desliga. |
| `storageKey` | `'w-route-tabs'` | Chave; função permite chave por usuário avaliada tarde. |
| `homePath` | `'/'` | Destino ao fechar a última aba. |
| `maxTabs` | — | Acima disso fecha a mais antiga não-ativa (guards respeitados). O limite é global; com `scopeByGroup` sai primeiro uma do grupo ativo e, só se ele não tiver o que fechar, a mais antiga de outro grupo. |
| `scopeByGroup` | `false` | Abas por espaço de trabalho: `visibleTabs` traz só as do grupo da aba ativa, e fechar atua dentro do grupo. `false` = uma lista só, como sempre foi. |

## API retornada (`RouteTabsApi`)

| Membro | O que faz |
| --- | --- |
| `tabs` / `activeKey` | A lista (`RouteTab[]`) e a aba ativa, reativas. |
| `visibleTabs` | `ComputedRef<RouteTab[]>` — o que a barra desenha: todas as abas ou, com `scopeByGroup`, só as do `activeGroup`. |
| `activeGroup` | `ComputedRef<string \| undefined>` — grupo da aba ativa; em rota fora das abas, o da última aba que esteve ativa. `undefined` = aba sem grupo. |
| `scopeByGroup` | `boolean` — a opção como foi passada (o `WTabNav` lê para não desenhar o rótulo de grupo). |
| `activate(key)` | Navega para o `fullPath` da aba. |
| `activateGroup(group)` | `Promise<boolean>` — ativa a última aba que esteve ativa no grupo (sem registro, a última dele na lista). `false` = o grupo não tem aba aberta. Vale com ou sem `scopeByGroup`. |
| `close(key)` | Fecha respeitando os close guards; `false` = vetado ou não-fechável. Fechar a ativa passa a vez à vizinha da esquerda (senão à da direita) — com `scopeByGroup`, só do mesmo grupo. |
| `closeOthers(key)` / `closeAll(options?)` | Fecham em lote (guards e `closable` respeitados). Com `scopeByGroup`: só as outras do grupo de `key` / só as do grupo ativo. `closeAll({ allGroups: true })` fecha as de todos os grupos. |
| `reload(key)` | Remonta o componente da aba (estado da tela descartado). |
| `setTitle(key, title)` | Título dinâmico; `null` restaura o default da rota. |
| `isLive(rota\|path)` | A rota já tem aba hidratada? (ex.: pular overlay de navegação). |
| `runtime(key)` | Runtime interno (componente, rota congelada, guards) — uso do viewport. |

## Abas por espaço de trabalho {#abas-por-espaco-de-trabalho}

Num app com vários espaços (módulos, apps de um portal), `scopeByGroup: true` faz cada
espaço mostrar só as suas abas. O espaço é o `group` que `resolveTabMeta` devolve:

```ts
export const tabsApi = useRouteTabs({
  router,
  scopeByGroup: true,
  resolveTabMeta: (r) => ({ title: tituloDaRota(r), group: appDaRota(r) }),
})

// trocar de espaço (menu, seletor de app): volta à última aba dele, ou abre a tela inicial
async function irPara(app: string) {
  if (!(await tabsApi.activateGroup(app))) await router.push(telaInicialDe(app))
}
```

- **A barra segue a aba ativa.** `visibleTabs` são as abas do `activeGroup`; ativar uma aba
  de outro grupo (pelo menu, por link, por `activateGroup`) troca o conjunto. Numa rota que
  não é aba, a barra continua no grupo da última aba ativa.
- **Cada grupo lembra a sua última aba ativa**, e isso persiste junto com a lista (campo
  `lastActive` no estado salvo; estado gravado por versão anterior continua válido).
- **Fechar fica dentro do grupo.** A ativa fechada passa a vez à vizinha do mesmo grupo; a
  última do grupo leva ao `homePath`. `closeOthers` e `closeAll` não tocam nos outros grupos.
- **Para fechar tudo** (troca de organização, saída), `closeAll({ allGroups: true })`: fecha
  as abas de todos os grupos, respeitando `closable` e os close guards. Se sobrar alguma,
  assume a do grupo ativo, senão a primeira da lista; sem sobra, `homePath`.
- **Abas sem `group` formam um grupo à parte**: aparecem juntas quando a ativa não tem grupo.
- **Os painéis não mudam.** O `WTabViewport` segue com todas as abas vivas montadas: voltar a
  um grupo encontra as telas como ficaram.

Depois de um reload numa rota que não é aba, o grupo vem da aba ativa gravada; se ela não
existir mais, `activeGroup` é `undefined` até a primeira aba ser ativada.

## Contexto da tela (`useTabHost`)

Dentro de uma tela renderizada pelo viewport, `useTabHost()` retorna o `TabHostContext`
da aba (ou `null` fora de abas): `hostEl` (alvo de `appendTo` de dialogs), `active`,
`route` (a rota da aba — só muda enquanto ela é a ativa),
`setTitle`, `onTabActivated`/`onTabDeactivated` (equivalentes a
`onActivated`/`onDeactivated`) e `registerCloseGuard` (veto de fechamento — alterações
não salvas). Registros são desfeitos sozinhos quando a instância da tela morre.
