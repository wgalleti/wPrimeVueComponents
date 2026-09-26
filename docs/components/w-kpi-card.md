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

## Compacto

`size="compact"`: menos respiro, ícone menor na linha do rótulo e valor menor. No
`WKpiGrid`, `size` (da grade) ou `dense` aplicam o compacto a todos os cards.
