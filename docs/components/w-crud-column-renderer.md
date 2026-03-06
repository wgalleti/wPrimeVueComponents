# WCrudColumnRenderer

Componente interno que renderiza o valor de uma celula da tabela com base no tipo da coluna (`ColumnDef.type`).

Usado internamente pelo `WCrudView`. Util se voce esta construindo uma tabela customizada.

## Import

```vue
<script setup>
import { WCrudColumnRenderer } from '@wgalleti/primevue-components'
</script>
```

## Props

| Prop | Tipo | Descricao |
|---|---|---|
| `column` | `ColumnDef` | Definicao da coluna |
| `value` | `unknown` | Valor da celula |
| `rowData` | `Record<string, unknown>` | Dados completos da linha |

## Renderizacao por Tipo

| Tipo | Renderizacao |
|---|---|
| `text` | Valor direto ou resultado de `column.format()` |
| `boolean` | `<Tag>` com Ativo/Inativo (customizavel via `tagValue`/`tagSeverity`) |
| `date` | Formatado DD/MM/YYYY |
| `datetime` | Formatado DD/MM/YYYY HH:mm |
| `number` | Formatado com separador de milhar e decimais |
| `currency` | Formatado como R$ X.XXX,XX |
| `image` | `<img>` com tamanho 40x40 |
| `custom` | Valor bruto (use slot `#column-{field}` no WCrudView) |

Valores `null` ou `undefined` sao renderizados como `"—"`.

## Uso em Tabela Customizada

```vue
<DataTable :value="items">
  <Column
    v-for="col in columns"
    :key="col.field"
    :field="col.field"
    :header="col.header"
  >
    <template #body="{ data }">
      <WCrudColumnRenderer
        :column="col"
        :value="data[col.field]"
        :row-data="data"
      />
    </template>
  </Column>
</DataTable>
```
