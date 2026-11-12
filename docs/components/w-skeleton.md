# WSkeleton

Esqueleto de chegada de dados sobre o `Skeleton` do PrimeVue. Pareie com
[`useDelayedLoading`](/composables/use-delayed-loading) para só aparecer em carregamento lento.

## API

<ApiTable name="WSkeleton" />

## Exemplo

```vue
<script setup>
const { showSkeleton } = useDelayedLoading(carregando)
</script>

<WSkeleton v-if="showSkeleton" variant="rows" :count="6" />
<div v-else-if="!carregando" class="w-chegada">…dados…</div>
```

A classe `.w-chegada` faz o conteúdo entrar com fade e leve subida (`--w-motion-fast`); com
`prefers-reduced-motion: reduce` a animação some, assim como a do `WSkeleton`.

## Bloco e tamanho

`variant="block"` é um retângulo só — o esqueleto da figura de painel (KPI) ou da área de gráfico.
A altura vem por nome (`size`: `sm` 3rem, `md` 6rem, `lg` a altura do `WChart`; tokens
`--w-skeleton-block-*`) ou por `height`, sempre um token. `width` limita a largura. No `card`,
`size`/`height` viram altura mínima, para o cartão vazio ter o tamanho do cartão cheio.

```vue
<WKpiGrid v-if="showSkeleton">
  <WSkeleton v-for="n in 4" :key="n" variant="block" size="md" />
</WKpiGrid>
<WSkeleton variant="block" height="var(--w-chart-h)" />
<WSkeleton variant="card" size="lg" />
```
