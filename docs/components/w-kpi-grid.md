# WKpiGrid

Grid responsivo para renderizar varios KPIs com layout consistente.

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `items` | `KpiItem[]` | `[]` | Lista de KPIs |
| `columns` | `2 \| 3 \| 4` | `4` | Numero de colunas em desktop |
| `dense` | `boolean` | `false` | Reduz gap entre cards |

## Slots

| Slot | Descricao |
|---|---|
| `item` | Override da renderizacao de cada item |

## Exemplo

```vue
<WKpiGrid :items="kpis" :columns="3" />
```
