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
