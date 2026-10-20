# WKpiGrid

Grid responsivo para renderizar varios KPIs com layout consistente.

## API

<ApiTable name="WKpiGrid" />

## Exemplo

```vue
<WKpiGrid :items="kpis" :columns="3" />
```

Cada `KpiItem` repassa ao `WKpiCard` também `to`, `spark`, `size` e `tint` (`'value'` pinta o
número na cor da severidade).

## Colunas

- `columns` numérico (2–6): grade fixa, sempre esse número de colunas.
- `columns="auto"`: quantas couberem, com piso de coluna no token `--w-kpi-min`
  (padrão `13rem`, ~208 px — onde um valor monetário de ~14 caracteres cabe no tamanho cheio).
  Abaixo do piso a grade perde uma coluna em vez de esmagar o número: num contêiner de
  730–750 px (janela de 820–900 px com barra lateral), 4 KPIs ficam em 3 + 1; a partir de
  ~870 px, em 4. O app ajusta o piso pelo nome curto (`--kpi-min`) no `:root`.

Em qualquer modo o valor do card desce de tamanho quando o **card** estreita (ver
[WKpiCard › Largura estreita](./w-kpi-card#largura-estreita)) — inclusive com `columns`
numérico numa tela apertada.

## Densa e tamanho

`dense` aperta o vão entre os cards **e** deixa cada card `compact` (ícone na linha do
rótulo, valor menor). O tamanho segue a precedência `item.size` → `size` da grade →
`dense` → `default`: para uma grade densa com cards cheios, `dense size="default"`.

## Clique no card

Com listener de `item-click`, todo card vira botão de teclado — menos o que traz
`interactive: false` (o número que só informa numa grade em que os outros são filtros) e o evento traz
`{ item, index }`. Item com `to` vira link (e também dispara o `item-click`, se houver
listener). Conteúdo interativo no slot `#item` ou no `#footer` de um card clicável
precisa de `@click.stop`, senão o clique borbulha e dispara o `item-click`.

```vue
<WKpiGrid :items="kpis" columns="auto" @item-click="({ item }) => filtrarPor(item.label)" />
```
