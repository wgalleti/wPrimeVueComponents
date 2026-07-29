# WKpiCard

Card simples para indicadores e contadores de dashboard.

## API

<ApiTable name="WKpiCard" />

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
