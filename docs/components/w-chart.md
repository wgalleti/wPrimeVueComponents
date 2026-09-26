# WChart

Wrapper único de gráficos sobre o **Apache ECharts**. As telas nunca importam `echarts`
direto: o WChart resolve tema (claro/escuro pelos tokens CSS do app), overlay de loading,
estado vazio e a variante monocromática de impressão (renderer SVG, sem animação — para
PDFs gerados por Chromium headless/Gotenberg).

O ECharts é dependência da suite, mas entra por `import()` dinâmico: quem nunca renderiza
um gráfico não paga pela biblioteca. Tipos registrados (tree-shaken): barra, linha e
pizza/donut — tipo novo entra na suite, nunca na tela.

## API

<ApiTable name="WChart" />

## Tema

O tema é construído no mount a partir dos tokens CSS resolvidos no documento
(`--fg`, `--fg-muted`, `--border`, `--surface`, `--viz-1..6`, `--font-sans`) e
reconstruído sozinho quando um atributo do `<html>` muda (ex.: `data-theme`).
Nenhuma cor por instância.

## Exemplo

```vue
<WChart :option="option" :empty="!rows.length" height="20rem" />
```

Donut padrão (total no centro, legenda embaixo) via helper exportado:

```ts
import { donutOption } from '@wgalleti/primevue-components'

const option = computed(() =>
  donutOption({
    data: rows.value.map((r) => ({ name: r.nome, value: r.total })),
    format: (v) => `${v} un`,
    centerLabel: String(total.value),
    centerSub: 'no período',
  })
)
```

## Clique no item

Com `clickable`, o item de dado ganha cursor de mão e realce sob o mouse
(`emphasis.focus: 'self'`, só onde a série não declara o seu) e o clique emite `select`
com `{ seriesName, seriesIndex, name, dataIndex, value, data }`. Sem `clickable` nada é
emitido e a option passa intacta.

Linha sem marcador (`showSymbol: false`) não tem item clicável: declare
`triggerLineEvent: true` na série para o clique na linha emitir `select`.

```vue
<WChart :option="option" clickable @select="({ name }) => filtrarPorMes(name)" />
```

Impressão (PDF quase mono):

```vue
<WChart print :option="option" height="16rem" />
```
