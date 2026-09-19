# Padrão de CSS — Onda 1: inventário e crítica

Data: 2026-09-19 · Escopo: os 40 componentes · Modo: só leitura (nenhum código alterado)
Régua: a direção declarada em `docs/css/classes.md` — *a suíte lê tokens do app com fallback nos
`--p-*` do PrimeVue; cor de status só via `--success/--danger/--warning/--info`* — mais as skills
`frontend:estilo-e-tokens` e `design:critica-de-tela`.
Cenário renderizado: playground (que **não** define os tokens do app, logo tudo roda nos
fallbacks — pior caso, e o caso de todo projeto que ainda não adotou a folha de tokens).

---

## Parte A — Inventário mecânico

### A1. Números

| | crud.css | markdown.css | SFCs |
|---|---|---|---|
| linhas | 4.549 | 1.070 | 2 com `<style scoped>` (WChart, WImageCropper) |
| seletores `.w-*` | 590 | — | — |
| seletores tocando `.p-*` (override do PrimeVue) | 77 | — | — |
| `!important` | 6 | — | — |
| `var(--p-*)` | 345 (101 **bare**, sem token do app na frente) | — | — |
| `var(--w-*)` | 50 | — | — |
| `var(--<token do app>)` | 703 | — | — |
| hex cru | 55 (51 são fallback de 3º nível; **4 são valor de verdade**) | 27 | 4 (WImageCropper) |
| `rem` literal fora de fallback | 278 (gap 61, font-size 56, padding 32, height 23…) | — | — |
| `px` > 2px | 66 (`999px` ×17, `56px` ×5, `14px` ×5, breakpoints 768/839/640) | — | — |
| variante dark escrita à mão | 1 (`.dark .w-crud-form-group-header`) | 0 | 0 |

### A2. Duas gerações de CSS convivendo

Classificando cada bloco de componente pelo vocabulário que usa:

| Geração | Padrão | Componentes |
|---|---|---|
| **PV-puro** (antiga) | `var(--p-text-muted-color)` direto + `0.75rem` literal | w-crud-form (misto), w-crud-table, w-crud-toolbar, w-crud-empty, w-crud-rail, w-crud-cards, w-crud-title, w-crud-kpi (misto), w-crud-card (misto), w-kpi-card (misto), w-transfer, w-progress-flow, w-section-header, w-form-section, w-detail-header, w-empty-state, w-autocompletefk-trigger/clear, w-datepicker-icon |
| **app+fallback** (nova) | `var(--fg-muted, var(--p-text-muted-color))` + `var(--space-2, 0.5rem)` | w-map-select, w-editable-table, w-step-section, w-kanban-board, w-tab-nav, w-tab-viewport, w-tree-select, w-section-panel, w-chips, w-info-card, w-check-list, w-crud-subview, w-tab-bar, w-choice, w-segmented, w-page-header, w-action-bar, w-fk-subrows, w-kpi-grid, w-step-flow |

O núcleo do CRUD (o que todo projeto usa primeiro) é o que está na geração antiga.

### A3. O fallback é um literal disfarçado — e varia

O mesmo token do app recebe fallbacks **diferentes** conforme o lugar. Sem a folha de tokens no
app (o caso do playground), o "mesmo" espaçamento rende valores distintos:

| Token | Fallbacks distintos | Exemplo |
|---|---|---|
| `--space-2` | **6** | 41× `0.5rem`, 11× `0.625rem`, 5× `0.5625rem`, 1× `0.4375rem`… |
| `--space-3` | 3 | 27× `0.75rem`, 22× `0.875rem` |
| `--space-1` | 3 | 18× `0.25rem`, 3× `0.375rem`, 2× `0.3125rem` |
| `--fw-medium` | 2 | 14× `500`, **9× `600`** |
| `--control-h` | 3 | `2.375rem`, `2.25rem`, `2.125rem` |
| `--primary-soft` | 4 | 3 fórmulas de `color-mix` + `--p-highlight-background` |
| `--danger-soft` | 3 | 10% vs 12% |
| `--motion-fast` | 3 | `0.14s`, `140ms`, `0.12s` |
| `--fg-muted` | 3 | `--p-text-muted-color`, **`#64748b`**, **`#666`** |
| `--surface` | 2 | `--p-content-background`, **`#fff`** |
| `--fg` | 2 | `--p-text-color`, **`#000`** |
| `--border` | 2 | `--p-content-border-color`, **`#e5e7eb`** |
| `--touch-h` | 2 | `2.75rem`, `56px` |

Os em **negrito** são bombas de tema escuro: quando o app não define o token, cai num branco/preto
fixo. Foi exatamente isso que apareceu na crítica (B, item 1).

### A4. Tokens lidos mas não documentados

`classes.md` documenta 23 tokens do app. O CSS lê **51**. Não documentados (com uso):
`--space-1/2/3/4/5/6`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border`, `--border-strong`,
`--surface`, `--surface-2`, `--surface-3`, `--text-2xs/xs/sm/base/md/lg/xl`, `--fw-regular/medium/
semibold/bold`, `--radius`, `--radius-sm/md/full`, `--ease`, `--motion`, `--motion-fast`,
`--touch-h`, `--primary-soft`, `--primary-fg`, `--shadow-xs`, `--leading-tight/snug`, `--field-gap`,
`--cell-py`. Quem adota a suíte não tem como saber o que definir.

O playground define um **terceiro** vocabulário (`--color-success`, `--color-danger-soft`,
`--shadow-md`…) que a suíte não lê — por isso roda nos fallbacks.

### A5. Literais que são valor de verdade (não fallback)

| Onde | O quê | Regra violada |
|---|---|---|
| `w-map-select` | `color: #fff` ×2, `rgba(15,31,48,0.72)`, `box-shadow: 0 10px 30px rgba(...)`, `text-shadow`, z-index 500/600/900 | 1, 7 (sobreposição em mapa é exceção *declarável*, mas não está declarada) |
| `w-fk-option` | `var(--fg-muted, #64748b)` | 1, 7 |
| `w-kanban-board` | `var(--surface, #fff)`, `var(--fg, #000)`, `var(--border, #e5e7eb)`, `var(--fg-muted, #666)` | 7 |
| `WImageCropper.vue` | `border-radius: 8px`, `gap: 4px`, `#e2e8f0`, `#f8fafc`, `color-mix(#000 45%)` | 1 |
| `.w-crud-form-group-header` | `.dark` com `--p-surface-200` → `--p-surface-700` à mão | 7 |
| `markdown.css` | 27 hex; `var(--surface, #fff)` no fundo dos alertas | 7 |
| `w-tag`, `w-crud-kpi`, `w-kpi-card`, `w-progress-flow`… | `#22c55e`, `#ef4444`, `#eab308`, `#0ea5e9` repetidos 20+ vezes como 3º fallback | primitivo copiado em vez de nomeado uma vez |
| geral | `999px` ×17 (pill) — existe `--radius-full` e é usado só 14× | 1 |
| geral | `768px`/`839px`/`640px`/`1279px` como breakpoints soltos | 1 (breakpoint é token) |

### A6. Nos SFCs

| Arquivo | Achado | Regra |
|---|---|---|
| `WCrudView.vue` | 6 `style="…"` com literal (`font-size: 0.85rem`, `gap: 0.5rem`, `font-weight: 600`) + `:style="{ width: '30rem' }"` + `class="w-72"` | 1, 2 |
| `WFileUpload.vue` | 8 `style="…"` inline com literal — componente inteiro sem classe | 1, 9 |
| `WCrudColumnRenderer.vue` | `class="text-muted-color text-xs"`, `size-9 rounded-lg ring-1 ring-surface-200 dark:ring-surface-700`, `text-[0.8125rem]` (valor arbitrário) | 2, 3, 7 — e o CLAUDE.md do projeto proíbe Tailwind hardcoded |
| `WFormRenderer.vue` | `class="w-28"` | 2 |
| `WAutoCompleteFK.vue` | `class="flex items-center justify-end gap-1"`, `header-style="width: 3rem"` | 2 |
| `WEmptyState.vue` | `class="mt-3"` | 2 |
| `WCrudView.vue` | `colAlignClass()` devolve `text-right`/`text-center`, **classes que a lib não define** — dependem do Tailwind do consumidor | ver B item 3 |

---

## Parte B — Crítica das telas renderizadas

**A suíte resolve:** montar telas de ERP (listagem, formulário, documento com filhos) com o mesmo
visual em qualquer projeto, sem CSS na tela.

### Bloqueia

1. **[cor / tema] Alertas do `WMarkdownView` ficam ilegíveis no escuro** — o fundo é
   `color-mix(tom 7%, var(--surface, #fff))`; sem `--surface` no app, mistura sobre **branco** e o
   texto claro do tema some. É a regra 7 (variante escura por derivação) quebrada pelo fallback
   errado. → fallback de `--surface` deve ser `var(--p-content-background)`, nunca hex. Mesmo
   padrão nos outros 12 fallbacks-literais de `markdown.css` e nos 4 de `w-kanban-board`.
2. **[conteúdo variável] `WTransferList` dentro do form: ícone da busca em cima do placeholder**
   — `.w-crud-form .p-inputtext` impõe `padding: 0 var(--control-px)` e apaga o espaço que o
   `IconField` reserva; a exceção existe só para `.w-crud-toolbar` (crud.css:77). Isolado no
   workbench o mesmo componente renderiza certo — o defeito é da regra de densidade do form
   atropelando um componente composto. → a regra de densidade aplica-se ao controle, não ao
   `.p-inputtext` genérico; ou a exceção do IconField vale para todo `.w-*`.
3. **[grid] Coluna `currency` do `WCrudView` com cabeçalho à direita e valor à esquerda** —
   `colAlignClass()` emite `text-right`, o cabeçalho é alinhado por CSS da lib
   (`.p-datatable-header-cell.text-right …`) mas o **corpo depende de `.text-right` existir no
   app** (Tailwind). Em app sem Tailwind, ou com Tailwind que não varre `node_modules`, número
   fica desalinhado do título e da coluna — comparar valores linha a linha vira trabalho de olho.
   → a lib define `.w-col-right/.w-col-center` (ou `text-align` no `body-style`) e usa isso.
4. **[conteúdo variável] `WChart` some quando o pai é flex** — `.w-chart { min-width: 0 }` sem
   `width: 100%`; no workbench o canvas nasce com `width: 0` e o ECharts avisa "Can't get DOM
   width". → `width: 100%` (ou `flex: 1 1 auto`) no root.
5. **[conteúdo variável] `WFormRenderer` com `type` desconhecido rende só o rótulo** — o exemplo
   do próprio sidecar (`WFormRenderer.meta.ts`) usa `type: 'boolean'` (é tipo de coluna, não de
   campo — o de campo é `switch`) e a tela mostra "Ativo" sem controle nenhum, sem aviso. →
   `v-else` final com um fallback visível (input texto + `console.warn` em dev) e corrigir o
   sidecar.

### Enfraquece

6. **[grid] Ritmo de espaçamento sem escala** — A3 mostra `--space-2` com seis fallbacks. Na
   prática, no playground, gaps "iguais" medem 8, 9, 10 e 11px conforme o componente. O olho não
   nomeia, mas sente a tela "mal aproveitada". → uma escala única definida **uma vez** na lib
   (tokens `--w-space-*` com fallback fixo), e o CSS referencia sem fallback inline.
7. **[tipografia] 10 tamanhos de fonte literais** (`0.5625` a `1.5rem`) contra 7 tokens `--text-*`
   parcialmente usados; `--fw-medium` ora é 500 ora 600. Hierarquia por peso deixa de ser
   confiável quando o mesmo "medium" muda de bloco para bloco. → escala tipográfica da lib com
   nomes semânticos e 3 pesos, sem fallback inline.
8. **[grid] Largura do controle varia por tipo de campo** — `WDateRange` sai com largura de
   conteúdo (`Selecione o período` estreito) enquanto `WDatePicker`, `WMoneyInput` e
   `WAutoCompleteFK` esticam 100%. Numa linha do form isso quebra o alinhamento das colunas. →
   todo campo composto da suíte é `width: 100%` no root, sem exceção.
9. **[grid] `WEditableTable`: colunas numéricas desalinhadas entre si** — as editáveis (`Área`,
   `A tratar`) alinham à direita dentro do input; a calculada (`Volume`) e o total dela alinham à
   esquerda. Em tabela de totais isso obriga a reler cada número. → `text-align: right` em toda
   célula numérica, editável ou não, e `font-variant-numeric: tabular-nums`.
10. **[hierarquia] Faixa cinza atrás do switch no form** (`Ativo` no showcase) — um campo
    booleano ganha um bloco de fundo de largura total que nenhum outro campo tem; grita mais que
    o campo obrigatório ao lado. → mesmo tratamento dos outros campos (só rótulo + controle).
11. **[cor] Status "Disponível" com tag preenchida em todas as 8 linhas** — quando o estado é o
    normal para 100% das linhas, a tag cheia vira ruído verde. É comportamento da coluna
    `boolean`, não da tela. → variante *soft* (fundo 12%, texto do tom) como padrão da tag de
    boolean; a cheia fica para severidade que precisa gritar (`danger`).
12. **[tema] `.dark .w-crud-form-group-header`** com `--p-surface-200/700` escritos à mão —
    a única variante escura manual da lib; quando o app trocar o preset, ela fica de fora. →
    `border-bottom-color: var(--border, var(--p-content-border-color))`.
13. **[conteúdo variável] Sidecars com exemplo vazio** — `WActionBar`, `WSectionAccordion`,
    `WStepFlow` e `WCrudSubview`/`WCrudView`/`WTabNav` mostram caixa vazia ou "precisa de contexto"
    no workbench; a crítica visual desses ficou limitada às rotas de cenário. → exemplo mínimo com
    slot preenchido nos três primeiros.

### Polimento

14. **[hierarquia] `WProgressFlow`: cada etapa é um card com borda e sombra** — quatro caixas
    pesadas para dizer "você está no passo 2"; o passo atual se diferencia só pelo círculo cheio.
    → etapas sem moldura, trilho fino entre elas, o atual com o rótulo em `--fw-semibold`.
15. **[grid] `WTransferList`: lado "Selecionados" espelhado** (chevron à esquerda, texto à
    direita) — a simetria é bonita no mock e custa leitura na lista real de 30 itens. → texto
    sempre à esquerda; só o chevron muda de lado.
16. **[tipografia] Rótulos de KPI e de cabeçalho de tabela em caps + tracking** convivem com
    rótulos de form em caixa normal — duas vozes para "rótulo". → decidir uma (caps só em
    cabeçalho de tabela é o convencional) e tokenizar `letter-spacing`.
17. **[ícones] Ícone do `WSectionHeader` em caixa tonal, do `WDetailHeader` solto, do
    `WKpiCard` em caixa tonal maior** — três tratamentos para "ícone de título". → um só.
18. **[cor] `999px` para pill em 17 lugares** enquanto `--radius-full` existe. → usar o token.

### Além do conserto

- **A folha de tokens é da lib, não do app.** Hoje o app precisa descobrir 51 nomes para a suíte
  ficar consistente; o playground do próprio repositório não conseguiu. Inverter: a lib publica
  `tokens.css` com `--w-*` semânticos (espaço, texto, peso, raio, superfície, texto, borda, status,
  movimento) **definidos uma vez** com fallback `--p-*`; o CSS dos componentes referencia `--w-*`
  sem fallback inline; o app sobrescreve `--w-*` (ou aponta `--w-fg: var(--fg)` numa linha). Some a
  variação do A3 por construção, e o tema escuro passa a depender só do preset do PrimeVue.
- **Densidade como escolha do usuário, não fallback** — `--control-h`/`--ui-font` já existem; falta
  a lib oferecer os dois perfis (`[data-density="compact"]`) prontos em vez de cada app inventar.
- **Gate no CI** — sem `style:check` barrando hex, `px` fora de token e `var(--x, <literal>)` novo,
  a segunda geração vira terceira em três releases (o histórico mostra isso: o w-map-select, o mais
  novo, é o que mais tem literal).

**Já funciona:** a fórmula do zebrado/hover por `color-mix` do primário (`--w-zebra`); as cores
de status passando por `--success/--danger` com *soft* derivado (as tags e KPIs ficam certas nos
dois temas); a densidade dos controles do form via `--control-h`; a geração nova de componentes
(`WEditableTable`, `WMapSelect`, `WKanbanBoard`, `WTabNav`, `WStepSection`) já segue o padrão
app+fallback e serve de modelo; o `WMarkdownView` (fora o fallback dos alertas) e o `WCheckList`
estão maduros nos dois temas.

---

## Decisões para abrir a Onda 2

1. **Vocabulário único**: `--w-*` próprio da lib com fallback `--p-*` (recomendado — ver "Além do
   conserto"), ou continuar lendo os tokens do app com fallback inline (mantém a doc atual, não
   resolve A3)?
2. **Onde o CSS mora**: manter `crud.css` único, ou quebrar por domínio (`tokens.css`, `crud.css`,
   `form.css`, `layout.css`, `viz.css`…) agregados no build? Não muda o consumidor (continua um
   import) e muda muito a onda 3.
3. **Exceção declarada** para `w-map-select` (sobreposição em mapa de satélite: branco/preto e
   sombra fixos são legítimos) — declarar no topo do bloco, como a skill pede para impressão.
4. **Tailwind nos SFCs**: zero (regra do CLAUDE.md) — migrar os 9 pontos de A6 para classes `.w-*`.

---

## Fechamento (2026-09-19)

Ondas 1.5–4 executadas no mesmo dia. Estado de cada apontamento:

| # | Item | Estado |
|---|---|---|
| 1–5 | Bloqueia | corrigidos (`fix(styles)` 1443586) |
| 6, 7, 12, 18 | ritmo, tipografia, `.dark`, `999px` | resolvidos por construção com `tokens.css` + gate |
| 8 | `WDateRange` largura | `width: 100%` como todo campo composto |
| 9 | colunas numéricas `WEditableTable` | alinhadas (calculadas inclusive) |
| 10 | faixa atrás do switch | removida; o switch alinha pela base da linha, na altura do controle vizinho |
| 11 | tag cheia em 100% das linhas | a tag já era *soft* (12% + texto no tom) — sem mudança; o ruído é do dado, não da tag |
| 13 | sidecars vazios | o workbench passou a renderizar os `slots` dos exemplos (compilados em runtime); `WActionBar` usa `<Button>` |
| 14 | `WProgressFlow` em cards | sem moldura, trilho fino entre marcadores (verde até onde foi), atual cheio + rótulo semibold; horizontal com rótulo abaixo do marcador |
| 15 | `WTransferList` espelhado | texto sempre à esquerda, só o chevron troca de lado |
| 16 | caps inconsistentes | regra: caps só no tamanho *eyebrow* (`--w-text-2xs`, `--w-tracking-caps`); KPI label e caps do markdown alinhados |
| 17 | três ícones de título | uma caixa tonal só (`--w-icon-box`, `--w-primary-soft`) em `WSectionHeader`, `WDetailHeader`, `WKpiCard` e KPI do CRUD |
| — | densidade como escolha do usuário | `html[data-density="compact"]` pronto em `tokens.css` |
| — | gate no CI | `yarn style:check` |
