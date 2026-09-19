# Classes CSS e tokens

Todas as classes usam o prefixo `w-`. Sobrescreva qualquer classe no CSS do seu app para
customizar a aparência. **Todo valor** (cor, espaço, tipografia, raio, sombra, movimento,
densidade) sai de `tokens.css` pelo prefixo `--w-` — nenhum componente escreve literal nem lê
`--p-*` direto. Isso é garantido por `yarn style:check` (roda no CI).

## Como os tokens resolvem

Cada `--w-*` resolve em três camadas, nesta ordem:

```
--w-fg-muted: var(--fg-muted, var(--p-text-muted-color));
                   │              └ 2. token do PrimeVue — acompanha preset e tema escuro
                   └ 1. token do APP com o nome curto — a folha de tokens dos projetos
--w-space-2:  var(--space-2, 0.5rem);
                                └ 3. valor fixo da suíte, só para o que o PrimeVue não tem
```

Consequências:

- **App que já define os nomes curtos** (`--fg`, `--space-2`, `--control-h`, `--success`…) no
  `:root` não precisa mudar nada — continua mandando.
- **App sem folha de tokens** recebe defaults consistentes que seguem o preset do PrimeVue nos
  dois temas (antes, cada lugar tinha um fallback diferente).
- **Para ajustar** sobrescreva depois de importar o CSS da suíte — o `--w-*` direto ou o nome
  curto, dá no mesmo:

```css
:root {
  --w-space-2: 0.625rem; /* o token da suíte */
  --fg-muted: #5a6573; /* ou o nome curto do app */
}
html[data-density='compact'] {
  --control-h: 32px; /* escopo por atributo no <html>: resolve normalmente */
}
.painel-compacto {
  --w-control-h: 2rem; /* abaixo do <html>, sobrescreva o --w-* — o nome curto não propaga */
}
```

> A cadeia é resolvida no `:root`. Sobrescrever o nome curto num elemento abaixo do `<html>`
> (`.compacto { --control-h: … }`) **não** chega ao `--w-*`; ali, sobrescreva o token da suíte.

## Os tokens

| Grupo | Tokens | Default (sem app, sem PrimeVue) |
|---|---|---|
| Superfície e texto | `--w-surface`, `--w-surface-2`, `--w-surface-3`, `--w-fg`, `--w-fg-muted`, `--w-fg-subtle`, `--w-border`, `--w-border-strong` | `--p-content-background`, `--p-content-hover-background`, `--p-text-color`, `--p-text-muted-color`, `--p-content-border-color` |
| Marca | `--w-primary`, `--w-primary-fg`, `--w-primary-soft`, `--w-accent` | `--p-primary-color`, `--p-primary-contrast-color`, 10% do primário, `--w-primary` |
| Status | `--w-success`, `--w-danger`, `--w-warning`, `--w-info` + `--w-<status>-soft` | `--p-green/red/yellow/sky-500`; soft = 12% sobre transparente |
| Série categórica | `--w-viz-1` … `--w-viz-6` | OKLCH de croma contido (azul, verde, laranja, ciano, âmbar, terracota) |
| Espaço | `--w-space-05`, `-1`, `-15`, `-2`, `-3`, `-4`, `-5`, `-6`, `-8` | 0.125 · 0.25 · 0.375 · 0.5 · 0.75 · 1 · 1.25 · 1.5 · 2rem |
| Tipografia | `--w-text-2xs/xs/sm/base/md/lg/xl/2xl`, `--w-fw-regular/medium/semibold/bold`, `--w-leading-tight/snug/normal/relaxed`, `--w-font-mono`, `--w-tracking-caps` | 11 · 12 · 13 · 14 · 15 · 17 · 20 · 24px; 400/500/600/700; 1.2/1.35/1.5/1.7; 0.04em |
| Raio | `--w-radius-xs/sm`, `--w-radius`, `--w-radius-md/lg/xl/full` | 4 · 6 · 8 · 10 · 12 · 16px · pill |
| Sombra | `--w-shadow-xs/md/lg`, `--w-overlay-shadow` | rgba discretas; overlay = `--p-overlay-popover-shadow` |
| Densidade | `--w-control-h`, `--w-control-h-sm`, `--w-control-px`, `--w-ui-font`, `--w-touch-h`, `--w-field-gap`, `--w-cell-py`, `--w-card-pad` | 38 · 32 · 12 · 14 · 44 · 6 · 10 · 20px |
| Medidas de elemento | `--w-icon-box`, `--w-icon-btn`, `--w-empty-icon`, `--w-badge-h`, `--w-search-w`, `--w-cell-image`, `--w-dialog-sm`, `--w-col-narrow`, `--w-col-actions` | 40 · 28 · 64 · 20 · 288 · 36 · 480 · 48 · 96px |
| Knobs de componente | `--w-form-cols`, `--w-form-aside`, `--w-fk-chip-max`, `--w-tree-select-max-h`, `--w-map-h`, `--w-map-list-h`, `--w-chart-h`, `--w-tabnav-h`, `--w-tabnav-btn` | 2 · 18rem · 6rem · 18rem · 460px · 380px · 18rem · icon-box · icon-btn |
| Movimento | `--w-motion-fast`, `--w-motion`, `--w-motion-slow`, `--w-ease`, `--w-ease-spring` | 140 · 220 · 380ms; ease; spring |
| Derivados | `--w-zebra`, `--w-row-hover` | 7% e 14% do primário sobre transparente |

Cada linha da tabela lê o nome curto correspondente do app (`--w-space-2` ← `--space-2`,
`--w-icon-box` ← `--icon-box`…). A lista completa com os fallbacks exatos está em
`src/assets/tokens.css`.

### Zebrado e hover

`--w-zebra` é o tint do primário, relativo ao fundo — pertence à paleta do produto em vez de ser
um cinza, e é `color-mix` com transparente (não tom sólido) porque a mesma tabela aparece sobre
fundos diferentes (card e expansão de outra tabela). Sem variante dark: o app troca o valor de
`--primary` entre os temas. O zebrado é **padrão** em `WCrudView`, `WEditableTable` e
`WCrudSubview`.

```css
:root {
  --w-zebra: color-mix(in srgb, var(--w-primary) 5%, transparent); /* mais discreto */
  --w-zebra: color-mix(in srgb, var(--w-fg) 6%, transparent); /* ou neutro */
}
```

### Densidade

O app manda pela tríade `--control-h` / `--ui-font` / `--control-px` (ou pelos `--w-*`
equivalentes). Vale para o input de busca, os filtros de coluna, os campos do formulário e os
botões das barras; botão de linha usa `--w-control-h-sm`. Um perfil compacto por atributo no
`<html>` funciona sem tocar na suíte:

```css
html[data-density='compact'] {
  --control-h: 32px;
  --control-h-sm: 28px;
  --control-px: 10px;
  --ui-font: 13px;
}
```

### Cores de status

Toda cor de status da suíte (tags, `.w-kpi-card--*`, erro de validação, item destrutivo do menu,
passo concluído do `WProgressFlow`) sai de `--w-success/danger/warning/info` — nunca de
`--p-red-500` direto, que no escuro não acompanha o tema. As tags carregam `w-tag w-tag--<severity>`
(`success`, `danger`, `warn`, `info`, `primary`, `secondary`); para uma tag própria com as mesmas
cores, use as classes.

### Cor dos grupos de abas (`WTabNav`)

`--w-tab-group-1` … `--w-tab-group-6`, com fallback em `--w-viz-1` … `--w-viz-6`. Ver
[WTabNav › Cor por grupo](/components/w-tab-nav#cor-por-grupo).

## Exceções declaradas

Duas superfícies não têm tema e usam literais de propósito, declarados linha a linha no CSS:
o que fica **sobre a imagem de satélite** do `WMapSelect` (texto do painel de vidro, sombra do
card de detalhe, escala de z-index do Leaflet) e o **palco do recorte** do `WImageCropper`.
Fora disso, literal novo não passa no `yarn style:check`.

## Arquivos

O `style.css` publicado é a concatenação, nesta ordem: `tokens` → `base` (densidade, tags,
células) → `crud` → `form` → `ui` → `viz` → `tabs` → `markdown` → `touch` (overrides de tablet e
toque, por último de propósito). Para o consumidor continua um import só.

## WCrudView — `w-crud-*`

### Estrutura

```
.w-crud                          Root wrapper
├── .w-crud-header               Header (titulo + acoes)
│   ├── .w-crud-header-content   Titulo + subtitulo
│   │   ├── .w-crud-title        H1 do titulo
│   │   └── .w-crud-subtitle     Subtitulo
│   └── .w-crud-header-actions   Botoes do header
├── .w-crud-kpis                 Grid de KPIs
│   └── .w-crud-kpi              Card de KPI
│       ├── .w-crud-kpi-icon     Icone do KPI
│       └── .w-crud-kpi-content  Conteudo do KPI
│           ├── .w-crud-kpi-label  Label
│           └── .w-crud-kpi-value  Valor
└── .w-crud-table                Wrapper da tabela
    ├── .w-crud-toolbar          Toolbar (busca + acoes)
    │   ├── .w-crud-toolbar-start  Inicio (busca + filtros)
    │   └── .w-crud-toolbar-end    Fim (acoes)
    ├── .w-crud-actions-header   Header da coluna de acoes
    ├── .w-crud-actions          Wrapper dos botoes de acao
    ├── .w-crud-empty            Estado vazio
    │   ├── .w-crud-empty-icon   Icone do estado vazio
    │   ├── .w-crud-empty-title  Titulo
    │   └── .w-crud-empty-text   Texto
    └── .w-crud-paginator        Paginador (via PT API)
```

### Customizacao

```css
/* Exemplo: titulo maior */
.w-crud-title {
  font-size: 1.5rem;
}

/* Exemplo: KPIs em 3 colunas fixas */
.w-crud-kpis {
  grid-template-columns: repeat(3, 1fr);
}

/* Exemplo: tabela sem borda */
.w-crud-table {
  border: none;
}
```

## WCrudFormDialog — `w-crud-form-*`

### Estrutura

```
.w-crud-form-dialog              Dialog (adicionar na tag Dialog)
├── .w-crud-form                 Container do formulario
│   ├── .w-crud-form-fields      Grid de campos (2 colunas)
│   │   ├── .w-crud-form-col-full   Largura total
│   │   ├── .w-crud-form-col-half   Meia largura
│   │   ├── .w-crud-form-field      Wrapper de campo
│   │   ├── .w-crud-form-label      Label do campo
│   │   ├── .w-crud-form-required   Asterisco de obrigatorio
│   │   ├── .w-crud-form-switch     Wrapper do switch
│   │   ├── .w-crud-form-switch-label  Label do switch
│   │   ├── .w-crud-form-color-row    Wrapper do color picker
│   │   └── .w-crud-form-error        Mensagem de erro
│   └── .w-crud-form-footer      Botoes do rodape
```

### Customizacao

```css
/* Exemplo: grid de 3 colunas */
.w-crud-form-fields {
  grid-template-columns: repeat(3, 1fr);
}
.w-crud-form-col-full {
  grid-column: span 3;
}

/* Exemplo: labels maiores */
.w-crud-form-label {
  font-size: 0.875rem;
  font-weight: 600;
}

/* Exemplo: footer com botoes a direita */
.w-crud-form-footer {
  justify-content: flex-end;
}
```

## WAutoCompleteFK — `w-autocompletefk-*`

### Estrutura

```
.w-autocompletefk                Container (flex row)
├── AutoComplete (PrimeVue)      Input de autocomplete
└── .w-autocompletefk-trigger    Botao de busca avancada

Modal:
├── .w-autocompletefk-toolbar          Toolbar do modal
│   ├── .w-autocompletefk-toolbar-search   Campo de busca
│   └── .w-autocompletefk-toolbar-actions  Acoes
├── .w-autocompletefk-empty            Estado vazio
└── .w-autocompletefk-footer           Footer do modal
```

### Customizacao

```css
/* Exemplo: trigger mais largo */
.w-autocompletefk-trigger {
  width: 3rem;
}
```

## Alinhamento de Colunas

`ColumnDef.align` aplica, no cabeçalho e no corpo, as classes da suíte:

```css
.w-col-right   /* alinha à direita — automático em `number` e `currency` */
.w-col-center  /* centraliza */
.w-col-narrow  /* coluna de seleção/expansor (--w-col-narrow) */
.w-col-actions /* coluna de ações de linha (--w-col-actions) */
```

`text-right`/`text-center` continuam sendo emitidas junto, para app que já as sobrescrevia —
mas a suíte nunca as definiu; quem alinha é `w-col-*`.

## Células

O `WCrudColumnRenderer` emite uma classe por tipo de valor: `.w-cell-text`, `.w-cell-number`
(semibold, tabular), `.w-cell-date` (abafado, tabular), `.w-cell-image` (miniatura de
`--w-cell-image`), `.w-cell-empty` (valor nulo) e `.w-cell-neutral` (boolean sem status).

## Importacao

O CSS e importado automaticamente quando voce usa o plugin. Para importar manualmente:

```ts
import '@wgalleti/primevue-components/style.css'
```
