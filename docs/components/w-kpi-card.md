# WKpiCard

Card simples para indicadores e contadores de dashboard.

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `label` | `string` | obrigatorio | Label do KPI |
| `value` | `string \| number` | obrigatorio | Valor principal |
| `icon` | `string` | `undefined` | Icone opcional |
| `hint` | `string` | `undefined` | Texto auxiliar |
| `severity` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'neutral'` | `'primary'` | Variante visual |
| `trend` | `{ value: string; direction?: 'up' \| 'down' \| 'neutral' }` | `undefined` | Tendencia opcional |
| `loading` | `boolean` | `false` | Exibe skeleton |

## Slots

| Slot | Descricao |
|---|---|
| `icon` | Override do bloco de icone |
| `value` | Override do valor principal |
| `hint` | Override do hint |
| `trend` | Override da badge de tendencia |
| `footer` | Conteudo de rodape |

## Exemplo

```vue
<WKpiCard
  label="Alunos ativos"
  :value="128"
  icon="pi pi-users"
  severity="success"
  :trend="{ value: '+8%', direction: 'up' }"
  hint="Comparado com o mes anterior"
/>
```
