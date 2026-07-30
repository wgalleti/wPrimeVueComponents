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

## Outros de formulário

- **WMoneyInput** — entrada de moeda preenchida da direita (estilo POS/calculadora). Também disponível via `FieldDef { type: 'currency', fillFromRight: true }`.
- **WTransferList** — dupla lista (disponíveis ↔ selecionados). Via `FieldDef { type: 'transfer' }`.
- **WDateRange** — intervalo de datas (`v-model` = `[início, fim]` como `Date[]`).

## UI (layout/apresentação)

`WPageHeader`, `WDetailHeader`, `WSectionHeader`, `WFormSection`, `WActionBar`, `WEmptyState`, `WStatusTag` (mapeia status→cor/label), `WInfoCard`, `WKpiCard`/`WKpiGrid`, `WProgressFlow`. Use-os para padronizar cabeçalhos, KPIs e estados vazios em vez de montar com Tailwind cru.

## Composables úteis

`useCrudManager`, `useFormatters` (moeda/data/CPF/CNPJ/tel BR), `useDateInput` (parse/format/máscara de data, sem watchers), `useAppToast`, `useAppConfirm`, `useApiError`/`extractApiError`, `useApi`.
