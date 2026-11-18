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

## Card que leva a algum lugar

- `to` (qualquer `RouteLocationRaw`): o card vira um `RouterLink` — exige `vue-router`
  instalado no app.
- `@click` sem `to`: o card vira um botão de teclado (`role="button"`, entra no Tab,
  Enter e Espaço ativam).
- Sem nenhum dos dois ele continua um `<article>` estático, sem foco nem cursor de mão.

Hover e foco vêm pela borda, sombra e anel de foco dos tokens.

Conteúdo interativo dentro de um card clicável (botão no `#footer`, link no `#hint`):
Enter/Espaço no filho ficam com ele, mas o **clique borbulha** e ativa o card também —
use `@click.stop` no filho.

```vue
<WKpiCard label="Leads" :value="42" @click="abrirLeads">
  <template #footer>
    <Button label="Exportar" text @click.stop="exportar" />
  </template>
</WKpiCard>
```

```vue
<WKpiCard label="Leads novos" :value="42" icon="pi pi-inbox" :to="{ name: 'leads' }" />
<WKpiCard label="Visitas hoje" :value="7" icon="pi pi-calendar" @click="abrirAgenda" />
```

## Sparkline

`spark` recebe a série em ordem cronológica e desenha uma linha com área clara na cor da
severidade, esticada à largura do card. É decorativa (`aria-hidden`) — o número que
importa é o `value`. Pontos `NaN`/`null` são descartados (a linha liga os vizinhos);
série vazia não desenha; um valor só ou todos iguais viram uma reta.

```vue
<WKpiCard label="Vendas" value="R$ 1,2 mi" severity="success" :spark="[3, 5, 4, 8, 7, 9]" />
```

## Carregando

`loading` troca o conteúdo por um esqueleto. Se o app configurou o [loader de marca](./w-loader.md)
(`loader` no plugin), o conteúdo continua em tela durante a carga (numa recarga, o dado antigo) e a
altura do card não muda. Passado o `delay`, um véu (`--w-loader-veil`) com o `WLoader` cobre o card
inteiro e fica até o `minDuration`, mesmo que `loading` termine antes. Enquanto o véu está em tela o
card tem `aria-busy="true"` e não reage a clique, Enter nem Espaço (vale para `to` e `@click`).
Sem `loader`, nada muda: o esqueleto de sempre.

## Compacto

`size="compact"`: menos respiro, ícone menor na linha do rótulo e valor menor. No
`WKpiGrid`, `size` (da grade) ou `dense` aplicam o compacto a todos os cards.

## Herói

`size="hero"` é o card em que o número manda: rótulo pequeno em caixa-alta em cima, valor em
`--w-text-4xl` (tabular, peso forte) com o chip de `trend` **na mesma linha**, alinhado pela base,
`hint` embaixo e a sparkline com o dobro da altura (`--w-spark-h` × 2), colada na base do card. O
ícone, se houver, vai sempre em linha (veja abaixo), nunca no quadrado. Em card estreito
(até 20rem de conteúdo, o celular) o valor desce para `--w-text-3xl` antes dos degraus gerais.

```vue
<WKpiCard
  label="Receita do mês"
  value="R$ 1.284.300"
  icon="pi pi-dollar"
  severity="success"
  size="hero"
  :trend="{ value: '+8%', direction: 'up' }"
  hint="vs. mês anterior"
  :spark="[3, 5, 4, 8, 7, 9, 12]"
/>
```

No [`WKpiGrid`](./w-kpi-grid#heroi) o herói ocupa duas colunas.

## Ícone em linha

`iconStyle` (`'tile'` por padrão): `tile` é o quadrado tonal de sempre; `inline` põe o ícone pequeno,
**sem fundo**, ao lado do rótulo — na cor do tom da `severity` (ou em `--w-fg-muted` quando não há
severidade). Vale para `default`, `compact` e `hero` (no herói é sempre `inline`). Com `inline` o rótulo
sobe para o cabeçalho, junto do ícone; o `trend` (fora do herói) fica à direita dele.

```vue
<WKpiCard label="Pedidos abertos" :value="42" icon="pi pi-inbox" icon-style="inline" />
```

## Texto de apoio

O `hint` usa `--w-kpi-hint-font`, que cai em `--w-font-mono` (o visual de sempre). O app troca a
fonte do apoio definindo `--kpi-hint-font`.

## Largura estreita

O número nunca passa da borda do card. O card é contêiner de si mesmo
(`container: w-kpi-card / inline-size`) e o valor desce um token de fonte por degrau,
medido pela caixa de conteúdo do card (sem o padding), não pela janela:

| Largura do conteúdo        | Padrão         | Compacto      |
| -------------------------- | -------------- | ------------- |
| acima de 11,5rem (~184 px) | `--w-text-2xl` | `--w-text-xl` |
| até 11,5rem                | `--w-text-xl`  | `--w-text-xl` |
| até 9,5rem (~152 px)       | `--w-text-lg`  | `--w-text-lg` |
| até 7,5rem (~120 px)       | `--w-text-lg`  | `--w-text-md` |

Se mesmo no último degrau o valor não couber, ele **quebra de linha** — nunca é cortado
nem ganha reticências (número cortado é número errado). O espaço que o `Intl` põe depois
de `R$`/`US$` é inseparável, então a quebra só acontece em valor longo demais.

Efeito do contêiner: o card não se dimensiona pelo conteúdo — ele ocupa a célula em que
está (grade, bloco, flex com `flex: 1`). Num pai que encolhe ao conteúdo (flex sem
crescimento, coluna `auto` de grade), dê largura ao card.

## Valor no tom

Por padrão o tom da `severity` pinta só o ícone (e a sparkline). Com `tint="value"` o
número também sai na cor do tom — para o KPI cujo valor já é o alerta (atraso, saldo
negativo). A cor vem dos tokens de severidade, então acompanha o tema claro e o escuro.

```vue
<WKpiCard
  label="Pedidos atrasados"
  :value="7"
  icon="pi pi-exclamation-triangle"
  severity="danger"
  tint="value"
/>
```
