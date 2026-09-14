# Classes CSS

Todas as classes usam o prefixo `w-` e variaveis CSS do PrimeVue (`--p-*`). Sobrescreva qualquer classe no CSS do seu app para customizar a aparencia.

## Tokens da biblioteca

| Token | Padrão | Para quê |
|---|---|---|
| `--w-zebra` | 7% do `--primary` sobre transparente | Faixa alternada das linhas — **toda** tabela da suite usa |
| `--w-row-hover` | 14% do `--primary` sobre transparente | Realce da linha sob o cursor |

Duas decisões neles:

1. **Saem do `--primary` do app**, não de um cinza: a faixa pertence à paleta do produto (no
   tema claro, um azul claríssimo) em vez de ser uma sujeira neutra. Como o app troca o valor de
   `--primary` entre os temas, a mesma fórmula serve os dois — não há variante `dark`.
2. **São `color-mix` com transparente**, não um tom sólido: a mesma tabela aparece sobre fundos
   diferentes — no card e dentro da expansão de outra tabela. Tom sólido acerta um contexto e
   some no outro (foi o que aconteceu com a subtabela, cuja faixa era exatamente a cor do fundo
   em que ela vivia).

Para ajustar no seu app, sobrescreva depois de importar o CSS da suite:

```css
:root {
  --w-zebra: color-mix(in srgb, var(--primary) 5%, transparent); /* mais discreto */
  --w-zebra: color-mix(in srgb, var(--fg) 6%, transparent);      /* ou neutro */
}
```

O zebrado é **padrão**, não opt-in: `WCrudView` (via `striped-rows` do DataTable, que marca a
linha pelo índice do dado e por isso não se perde com linha de expansão) e `WEditableTable` /
`WCrudSubview` (via classe por índice, já que ali cada linha é um `<tbody>` próprio).

## Tokens do app que a suite lê

A suite **não define** estes tokens — lê os do app, com fallback. Defina-os no `:root` do
app e todos os componentes acompanham (inclusive no tema escuro, já que o app troca o valor).

### Densidade dos controles

| Token | Fallback | Onde |
|---|---|---|
| `--control-h` | `2.375rem` (38px) | altura do input de busca, dos filtros de coluna, dos campos do form (`InputText`, `Select`, `MultiSelect`, `InputNumber`, `AutoComplete`, `Password`, `WDatePicker`, `WMoneyInput`, FK) e dos botões das barras (cabeçalho, toolbar, filtros, lote, rodapé do form, rail) |
| `--control-h-sm` | `2rem` (32px) | botões de ação de linha (tabela e cards) |
| `--ui-font` | `0.875rem` (14px) | fonte dos mesmos controles e botões |
| `--control-px` | `0.75rem` (12px) | padding horizontal dos inputs; o textarea usa 60% dele na vertical |
| `--card-pad` | `1.25rem` (20px) | padding do `.w-kpi-card` e do `.w-crud-kpi` |
| `--radius-lg` | `0.75rem` (12px) | raio dos mesmos cards |

```css
:root {
  --control-h: 38px;
  --ui-font: 14px;
  --control-px: 12px;
}
.compact {
  --control-h: 32px;
  --ui-font: 13px;
}
```

### Cores de status

Toda cor de status da suite (tags de boolean/status, `.w-kpi-card--*`, ícones de KPI, erro de
validação, item destrutivo do menu de contexto, passo concluído do `WProgressFlow`) sai
destes tokens — nunca de `--p-red-*`/`--p-green-*` direto, que no escuro não acompanham o tema:

| Token | Fallback | Soft (fundo) | Fallback do soft |
|---|---|---|---|
| `--success` | `--p-green-500` | `--success-soft` | 12% de `--success` sobre transparente |
| `--danger` | `--p-red-500` | `--danger-soft` | idem |
| `--warning` | `--p-yellow-500` | `--warning-soft` | idem |
| `--info` | `--p-sky-500` | `--info-soft` | idem |

As tags (`WStatusTag` e a coluna `type: 'boolean'`) continuam sendo o `<Tag>` do PrimeVue, mas
carregam a classe `w-tag w-tag--<severity>` (`success`, `danger`, `warn`, `info`, `primary`,
`secondary`) — é ela quem pinta. Para uma tag própria com as mesmas cores, use as classes.

### Cor dos grupos de abas (`WTabNav`)

| Token | Fallback |
|---|---|
| `--w-tab-group-1` … `--w-tab-group-6` | `--viz-1` … `--viz-6` (série categórica do app) → OKLCH da suite |

Ver [WTabNav › Cor por grupo](/components/w-tab-nav#cor-por-grupo).

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

Classes auxiliares para alinhar conteudo das colunas:

```css
/* Aplicados via header-class e body-class */
.text-right   /* alinha a direita */
.text-center  /* centraliza */
```

Uso automatico: colunas `number` e `currency` recebem `text-right` automaticamente.

## Variaveis PrimeVue Usadas

| Variavel | Uso |
|----------|-----|
| `--p-text-color` | Cor do texto principal |
| `--p-text-muted-color` | Cor do texto secundario |
| `--p-primary-color` | Cor primaria (KPI icons) |
| `--p-content-background` | Fundo dos cards/tabela |
| `--p-content-border-color` | Bordas |
| `--p-content-hover-background` | Hover/estados vazios |
| `--p-border-radius` | Borda arredondada |
| `--danger` (fallback `--p-red-500`) | Erros e obrigatorios |

## Importacao

O CSS e importado automaticamente quando voce usa o plugin. Para importar manualmente:

```ts
import '@wgalleti/primevue-components/style.css'
```
