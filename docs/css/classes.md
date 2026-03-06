# Classes CSS

Todas as classes usam o prefixo `w-` e variaveis CSS do PrimeVue (`--p-*`). Sobrescreva qualquer classe no CSS do seu app para customizar a aparencia.

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
| `--p-red-400` | Erros e obrigatorios |

## Importacao

O CSS e importado automaticamente quando voce usa o plugin. Para importar manualmente:

```ts
import '@wgalleti/primevue-components/style.css'
```
