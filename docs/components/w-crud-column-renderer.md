# WCrudColumnRenderer

Componente interno que renderiza o conteudo das celulas do DataTable com base no tipo da coluna.

## Uso

Normalmente voce nao usa este componente diretamente. O `WCrudView` o utiliza internamente para renderizar cada celula.

```vue
<WCrudColumnRenderer :column="col" :value="data[col.field]" :row-data="data" />
```

## API

<ApiTable name="WCrudColumnRenderer" />

## Renderizacao por Tipo

| Tipo | Renderizacao |
|------|-------------|
| `text` | Texto simples, ou `format()` se definido |
| `boolean` | Tag `Ativo` (success) / `Inativo` (danger) — ver abaixo |
| `date` | Formatado com `DD/MM/YYYY` |
| `datetime` | Formatado com `DD/MM/YYYY HH:mm` |
| `number` | Formatado com locale pt-BR e decimais |
| `currency` | Formatado como moeda BRL |
| `image` | Thumbnail circular |
| `custom` | Usa `format()` da coluna |

## Coluna boolean — rótulos e cor

Por padrão `true` vira a tag **Ativo** (`success`) e `false` **Inativo** (`danger`). Para um
boolean que não é status, troque os rótulos — e, se `false` não merece cor, deixe-o neutro
com `falseSeverity: null` (renderiza texto abafado, sem tag):

```ts
columns: [
  // "Não exige análise: Inativo" seria dupla negação
  {
    field: 'nao_exige_analise',
    header: 'Análise',
    type: 'boolean',
    trueLabel: 'Dispensada',
    falseLabel: '—',
    falseSeverity: null,
  },
  // Sim/Não com cor só no sim
  { field: 'certificado', header: 'Certificado', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não', falseSeverity: null },
]
```

| Prop | Default | Papel |
|---|---|---|
| `trueLabel` / `falseLabel` | `'Ativo'` / `'Inativo'` | texto |
| `trueSeverity` / `falseSeverity` | `'success'` / `'danger'` | cor da tag; `null` = texto neutro sem tag |

`tagValue` / `tagSeverity` (funções, abaixo) têm prioridade sobre os estáticos. A cor da tag sai
dos tokens do app (`--success`, `--danger`… — ver [Classes CSS](/css/classes#cores-de-status)).

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
