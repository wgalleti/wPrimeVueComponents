# WLoader

Indicador de **carregamento** da marca. Com a opção `loader` do plugin mostra a imagem animada do
app; sem ela, um anel neutro em CSS, para a peça servir a qualquer consumidor.

- Sem `loading` só desenha: quando aparecer é com quem usa, via
  [`useDelayedLoading`](/composables/use-delayed-loading) (`delay` e `minDuration`).
- Com `loading` (`true`/`false`) a própria peça decide: aparece depois do `delay` e fica ao menos
  `minDuration` (do `loader` configurado, ou 300/500 sem config). Fora disso não renderiza nada.
- Com `overlay` vira o véu de um cartão: `position: absolute; inset: 0` sobre o conteúdo, com o
  token `--w-loader-veil`. **O ancestral precisa ser posicionado** (`position: relative`).
- Com `loader`: `<picture>` com `<img>` quadrada no tamanho do token. Se há `still`, um
  `<source media="(prefers-reduced-motion: reduce)">` troca a animação pelo quadro parado, sem JS.
- Sem `loader`: anel que gira no ciclo `--w-motion-loop`; parado com movimento reduzido.
- `role="status"` com o `label` em texto só para leitor de tela; a imagem é decorativa (`alt=""`).
- Tamanho por token: `sm` `--w-loader-sm` (1.75rem), `md` `--w-loader-md` (3rem), `lg`
  `--w-loader-lg` (4rem). Some na impressão.
- Não é o [WProgress](/components/w-progress): o `WProgress` mostra andamento em barra.

## API

<ApiTable name="WLoader" />

## Configuração

```ts
app.use(WPrimeVuePlugin, {
  loader: {
    src: '/loader.webp', // imagem animada
    srcset: '/loader@2x.webp 2x', // opcional
    still: '/loader.png', // opcional: quadro para prefers-reduced-motion
    delay: 300, // ms antes de aparecer (padrão 300)
    minDuration: 500, // ms mínimos em tela depois de aparecer (padrão 500)
  },
})
```

`useLoaderConfig()` devolve essa configuração com os padrões aplicados, ou `null` quando não há
`loader` (ou ele não tem `src`). Lê por `inject(W_CONFIG_KEY)` com tolerância a ausência, então
serve também a quem provê a chave à mão, sem o plugin. É o que os componentes de carregamento
usam para escolher entre o loader de marca e o comportamento de sempre.

## Exemplo

Cobrindo qualquer cartão, sem composables:

```vue
<div class="meu-cartao"> <!-- position: relative -->
  <WLoader overlay :loading="carregando" label="Carregando cartão" />
  …conteúdo…
</div>
```

Controlando você mesmo o tempo:

```vue
<script setup>
import { WLoader, useDelayedLoading, useLoaderConfig } from '@wgalleti/primevue-components'

const loader = useLoaderConfig()
const { showSkeleton } = useDelayedLoading(carregando, {
  delay: loader?.delay,
  minDuration: loader?.minDuration,
})
</script>

<WLoader v-if="showSkeleton" label="Carregando gráfico" />
```
