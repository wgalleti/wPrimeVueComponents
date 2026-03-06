# WCrudColumnRenderer

Componente interno que renderiza o conteudo das celulas do DataTable com base no tipo da coluna.

## Uso

Normalmente voce nao usa este componente diretamente. O `WCrudView` o utiliza internamente para renderizar cada celula.

```vue
<WCrudColumnRenderer :column="col" :value="data[col.field]" :row-data="data" />
```

## Props

| Prop | Tipo | Padrao | Descricao |
|------|------|--------|-----------|
| `column` | `ColumnDef` | **obrigatorio** | Definicao da coluna |
| `value` | `unknown` | — | Valor da celula |
| `rowData` | `Record<string, unknown>` | — | Dados completos da linha |

## Renderizacao por Tipo

| Tipo | Renderizacao |
|------|-------------|
| `text` | Texto simples, ou `format()` se definido |
| `boolean` | Tag verde "Sim" / vermelha "Nao" |
| `date` | Formatado com `DD/MM/YYYY` |
| `datetime` | Formatado com `DD/MM/YYYY HH:mm` |
| `number` | Formatado com locale pt-BR e decimais |
| `currency` | Formatado como moeda BRL |
| `image` | Thumbnail circular |
| `custom` | Usa `format()` da coluna |

## Coluna com Format Customizado

```ts
columns: [
  {
    field: 'status',
    header: 'Status',
    type: 'custom',
    format: (value) => {
      const map = { A: 'Ativo', I: 'Inativo', P: 'Pendente' }
      return map[value as string] ?? value
    },
  },
]
```

## Tag com Severidade

```ts
columns: [
  {
    field: 'status',
    header: 'Status',
    type: 'custom',
    tagValue: (value) => value === 'A' ? 'Ativo' : 'Inativo',
    tagSeverity: (value) => value === 'A' ? 'success' : 'danger',
  },
]
```

## Valores Nulos

Valores `null` ou `undefined` sao renderizados como `—` (travessao) em texto muted.

## Alinhamento

O `WCrudView` alinha automaticamente colunas `number` e `currency` a direita. Para forcar:

```ts
columns: [
  { field: 'quantidade', header: 'Qtd', type: 'number', align: 'center' },
]
```
