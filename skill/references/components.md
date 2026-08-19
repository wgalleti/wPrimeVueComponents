# Componentes W* (uso standalone)

Todos têm defaults sensatos e slots para override. Props completas nos `.d.ts` / `docs/`.

## WDatePicker — data pt-BR

`v-model` é **string `YYYY-MM-DD`** (ideal p/ API DRF). Exibe `DD/MM/YYYY`.

```vue
<WDatePicker v-model="data" />                     <!-- emit: '2026-07-22' -->
<WDatePicker v-model="dataHora" show-time />        <!-- emit: '2026-07-22T09:30:00' -->
<WDatePicker v-model="d" autonow />                 <!-- null → hoje no mount -->
<WDatePicker v-model="d" min-date="2024-01-01" max-date="2024-12-31" />
<WDatePicker v-model="dt" value-format="date" />    <!-- emite Date em vez de string -->
```

- Digitação direta com máscara: `30051988` vira `30/05/1988`.
- Ícone de calendário abre o seletor (**Hoje** / **Limpar**).
- **F2** preenche a data de hoje.
- Timezone-safe (usa dayjs local; não tem o bug de `toISOString` em UTC).
- Props: `valueFormat` (`'iso'` | `'date'`), `showTime`, `autonow`, `minDate`, `maxDate`, `disabled`, `showClear`, `placeholder`, `invalid`, `inputId`.

## WAutoCompleteFK — seletor de FK com busca

Autocomplete inline + modal de pesquisa (tabela paginada, CRUD embutido opcional).

```vue
<WAutoCompleteFK
  v-model="categoria"
  endpoint="/api/v1/categorias/"
  option-label="nome"
/>
```

- **F2** abre o modal de busca (foco na pesquisa). Enter vazio → grid; Espaço marca; Enter confirma. Enter com texto → pesquisa; próximo Enter → grid.
- Cascata (filtra por outro campo): prop `drilldown` no componente standalone; via `FieldDef { type: 'fk' }` o mesmo se declara com **`dependsOn`**.
- `canCreate`/`canEdit`/`canDelete` + `crudFields`/`crudColumns` habilitam CRUD dentro do modal.
- **`multiple`** (0.9.6+): vira chips e o modal ganha marcação múltipla. `v-model` = **lista de objetos**
  (entra id ou objeto; sai objeto → mapeie com `.map((o) => o.id)`). Chips correm lado a lado e truncam;
  `maxChips` resume o excedente num chip `+N` (bom em filtro estreito). `showClear` mostra um `x` de
  limpar tudo ao lado da lupa. É para filtro/tela de comparação standalone — `FieldDef { type: 'fk' }`
  continua single.

## Outros de formulário

- **WMoneyInput** — entrada de moeda preenchida da direita (estilo POS/calculadora). Também disponível via `FieldDef { type: 'currency', fillFromRight: true }`.
- **WTransferList** — dupla lista (disponíveis ↔ selecionados). Via `FieldDef { type: 'transfer' }`.
- **WTreeSelect** (0.10.0+) — árvore com checkbox a partir de **lista plana** + `groupBy`. `v-model` =
  array de **ids de folha** (id de grupo nunca sai). Marcar o grupo alterna todas as folhas dele,
  inclusive as escondidas pelo filtro. Use quando a escolha é m:n **agrupada** (telas por módulo,
  permissões por área) e a lista pede busca; para m:n sem grupo, `WTransferList` continua melhor.
  ⚠️ A seleção é derivada dentro do componente **de propósito** — `v-model:selectionKeys` do `Tree`
  corrompe o `partialChecked` sob filtro
  ([primevue#6928](https://github.com/primefaces/primevue/issues/6928), repo arquivado, sem correção).
- **WDateRange** — intervalo de datas (`v-model` = `[início, fim]` como `Date[]`).

## UI (layout/apresentação)

`WPageHeader`, `WDetailHeader`, `WSectionHeader`, `WFormSection`, `WActionBar`, `WEmptyState`, `WStatusTag` (mapeia status→cor/label), `WInfoCard`, `WKpiCard`/`WKpiGrid`, `WProgressFlow`. Use-os para padronizar cabeçalhos, KPIs e estados vazios em vez de montar com Tailwind cru.

## Composables úteis

`useCrudManager`, `useFormatters` (moeda/data/CPF/CNPJ/tel BR), `useDateInput` (parse/format/máscara de data, sem watchers), `useAppToast`, `useAppConfirm`, `useApiError`/`extractApiError`, `useApi`.

## WTabNav + WTabViewport — navegação por abas de rota (estilo ERP)

Cada rota vira uma aba viva (estado preservado, fechar/recarregar). O estado mora no
`useRouteTabs` (fábrica — uma instância por app, guardada num módulo seu):

```ts
// composable/useAppTabs.ts
export const tabsApi = useRouteTabs({
  router,
  isTabRoute: (r) => r.meta?.requiresAuth !== false,
  resolveTabMeta: (r) => ({ title: tituloDaRota(r), icon: iconeDaRota(r) }),
  storageKey: () => `app-tabs:${userId() ?? 'anon'}`,
  maxTabs: 12,
})
```

```vue
<!-- no layout, no lugar do RouterView -->
<WTabNav :tabs="tabsApi" />
<WTabViewport :tabs="tabsApi" />
```

Dentro de uma tela, `useTabHost()` (null fora de abas) dá: `setTitle('NF 000123')`,
`hostEl` (alvo de `:append-to` p/ Dialog viver NA aba), `registerCloseGuard` (veto de
fechar com alterações não salvas) e `onTabActivated`/`onTabDeactivated`.
Identidade da aba = `route.path` (mudar só a query atualiza a aba, não abre outra).
Não confundir com `WTabBar` (abas de seção dentro de uma tela).
