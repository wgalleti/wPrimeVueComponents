# WKpiGrid

Grid responsivo para renderizar varios KPIs com layout consistente.

## API

<ApiTable name="WKpiGrid" />

## Exemplo

```vue
<WKpiGrid :items="kpis" :columns="3" />
```

Cada `KpiItem` repassa ao `WKpiCard` também `to`, `spark`, `size` (`default`, `compact` ou `hero`),
`iconStyle` (`tile` ou `inline`) e `tint` (`'value'` pinta o número na cor da severidade).

## Colunas

- `columns` numérico (2–6): grade fixa, sempre esse número de colunas.
  Em tela estreita as colunas fixas cedem: abaixo de 840 px, 3 a 6 colunas viram 2; abaixo de
  600 px, qualquer número vira 1 coluna. A régua de 2 colunas é a de tablet em pé (a de 2 já cabe).
- `columns="auto"`: a grade escolhe, pela **própria largura**, um número de colunas que
  fecha as linhas — nunca um card sozinho na última linha:

  | Itens | Colunas, da mais larga para a mais estreita |
  | ----- | ------------------------------------------- |
  | 2     | 2 → 1                                       |
  | 3     | 3 → 1                                       |
  | 4     | 4 → 2×2 → 1                                 |
  | 5     | 5 → 3 + 2 → 1                               |
  | 6     | 6 → 3×2 → 2×3 → 1                           |
  | 7     | 7 → 4 + 3 → 3 + 3 + 1 → 1                   |
  | 8     | 8 → 4×2 → 2×4 → 1                           |

  Regra: se todos cabem, uma linha; senão o maior divisor do número de itens que cabe;
  sem divisor, o número que cabe sem deixar um item sozinho (menos linhas, depois menos
  vagas); sem isso, uma coluna quando só cabem duas — ou quantas cabem (7 itens em três
  colunas é o único órfão). Uma coluna "cabe" com 13rem (~208 px, onde um valor monetário
  de ~14 caracteres cabe no tamanho cheio) mais o vão: 2 colunas a partir de 26.75rem
  (428 px) de grade, 3 a partir de 40.5rem (648 px), 4 a partir de 54.25rem (868 px).
  Num contêiner de 730–750 px (janela de 820–900 px com barra lateral), 4 KPIs ficam
  2×2. Os cortes são fixos (`@container` não aceita `var()`; régua em `tokens.css`).
  Acima de 8 itens não há degrau: a grade preenche com quantos couberem pelo piso
  `--w-kpi-min`, que o app ainda ajusta pelo nome curto (`--kpi-min`).

- No `auto` a raiz é contêiner de largura (`container-type: inline-size`) e as colunas
  moram no trilho `.w-kpi-grid__track`: a grade ocupa a largura do pai e não se
  dimensiona pelo conteúdo — num pai que encolhe ao conteúdo (flex sem crescimento),
  dê largura a ela. Nas colunas fixas o trilho é `display: contents` e nada muda.

Em qualquer modo o valor do card desce de tamanho quando o **card** estreita (ver
[WKpiCard › Largura estreita](./w-kpi-card#largura-estreita)) — inclusive com `columns`
numérico numa tela apertada.

## Herói

Item com `size: 'hero'` (o [card herói](./w-kpi-card#heroi): número grande, ícone em linha) ocupa
**duas colunas**:

- `columns` numérico: duas colunas a partir de 600 px de janela; abaixo disso a grade é de uma coluna
  e o herói ocupa uma — nunca nasce coluna implícita.
- `columns="auto"`: o herói **pesa duas células** na conta do `data-count` (3 itens com 1 herói
  contam 4), então as colunas escolhidas ainda fecham a linha. Ele ocupa duas colunas nos degraus
  com 2+ colunas e uma no degrau de 1 coluna.
- Acima de 8 células o `auto` é auto-fit pelo piso `--w-kpi-min` (sem degrau): o herói ocupa uma
  coluna, porque não há como saber, sem medir, que cabem duas.

O herói só vem do item (`size` da grade não aceita `hero`) e vale também no slot `#item`, desde que
o card seja filho direto da grade.

```vue
<WKpiGrid
  :items="[
    {
      icon: 'pi pi-dollar',
      label: 'Receita',
      value: 'R$ 1,2 mi',
      size: 'hero',
      severity: 'success',
    },
    { icon: 'pi pi-users', label: 'Leads', value: 40, iconStyle: 'inline' },
    { icon: 'pi pi-box', label: 'Pedidos', value: 7, iconStyle: 'inline' },
  ]"
  columns="auto"
/>
```

## Densa e tamanho

`dense` aperta o vão entre os cards **e** deixa cada card `compact` (ícone na linha do
rótulo, valor menor). O tamanho segue a precedência `item.size` → `size` da grade →
`dense` → `default`: para uma grade densa com cards cheios, `dense size="default"`.

## Faixa contínua (`ledger`)

`ledger` une os cards num único painel contiguo com borda externa (`--w-border`), divisórias
internas finas (`--w-line-subtle`) e hover discreto por célula (`--w-surface-subtle`), sem
vão entre os cards — ideal para cabeçalhos operacionais e painéis densos:

```vue
<WKpiGrid :items="kpis" columns="auto" ledger />
```

## Clique no card

Com listener de `item-click`, todo card vira botão de teclado — menos o que traz
`interactive: false` (o número que só informa numa grade em que os outros são filtros) e o evento traz
`{ item, index }`. Item com `to` vira link (e também dispara o `item-click`, se houver
listener). Conteúdo interativo no slot `#item` ou no `#footer` de um card clicável
precisa de `@click.stop`, senão o clique borbulha e dispara o `item-click`.

```vue
<WKpiGrid :items="kpis" columns="auto" @item-click="({ item }) => filtrarPor(item.label)" />
```
