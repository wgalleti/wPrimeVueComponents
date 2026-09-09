# useBreakpoint

Em qual faixa de largura a janela está, e se o ponteiro primário é o dedo. É a régua de
layout da suite — o mesmo corte que o `WCrudView` usa para trocar tabela por card e que os
`@media` do `crud.css` usam.

```ts
import { useBreakpoint } from '@wgalleti/primevue-components'

const { isRetrato, isPaisagem, isToque } = useBreakpoint()
```

## As faixas

| Faixa | Largura | O que a tela faz |
|---|---|---|
| celular | `< 600px` | uma coluna, navegação colapsada |
| **tablet retrato** | `600-839px` | um painel por vez, drill-in com voltar |
| **tablet paisagem** | `840-1199px` | dois painéis lado a lado |
| desktop | `>= 1200px` | dois ou três painéis, densidade de mesa |

`840px` é a fronteira medium/expanded do Material — a única com dado de parque: 93,7% dos
tablets em retrato abaixo dela, 97,2% em paisagem acima. Todo tablet de 10-11" em retrato mede
768-876 CSS px; em paisagem, `>= 1024`.

**Não use `768px` como corte de layout**: 800, 820 e 834 caem acima dele, então metade dos
tablets em retrato receberia o layout de paisagem.

## Retorno

| Ref | Verdadeiro quando |
|---|---|
| `isCelular` | `< 600px` |
| `isRetrato` | `< 840px` — tablet em pé ou menor |
| `isPaisagem` | `>= 840px` — tablet deitado ou maior |
| `isDesktop` | `>= 1200px` |
| `isToque` | o ponteiro **primário** é grosso (`pointer: coarse`) |

Todas são `readonly` e reativas: mudam quando a janela muda de tamanho ou o aparelho gira. Os
listeners são soltos sozinhos ao sair do escopo do componente.

`isToque` é **independente da largura**: um notebook com tela sensível reporta `pointer: fine`
(o ponteiro primário é o trackpad) e não entra; um tablet deitado em 1280px reporta `coarse` e
entra. Alvo de toque segue o ponteiro; layout segue a largura.

## Largura, nunca orientação

Ramificar por `orientation` é errado por dois motivos: travar orientação é falha de
acessibilidade ([WCAG 1.3.4](https://www.w3.org/WAI/WCAG21/Understanding/orientation.html)), e
um tablet de 12,9" em retrato tem 1024px — largura de laptop, que **deve** receber o layout de
duas colunas.

## Exemplo — dois painéis que viram drill-in

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useBreakpoint } from '@wgalleti/primevue-components'

const { isRetrato } = useBreakpoint()
const vista = ref<'lista' | 'detalhe'>('lista')
</script>

<template>
  <div class="corpo">
    <section v-show="!isRetrato || vista === 'lista'">…</section>
    <section v-show="!isRetrato || vista === 'detalhe'">
      <button v-if="isRetrato" @click="vista = 'lista'">Voltar</button>
      …
    </section>
  </div>
</template>
```

`v-show` e não `v-if`: componente que mede o próprio container na montagem (mapa, gráfico) mede
zero se for remontado a cada troca.

## Constantes

```ts
import { BREAKPOINTS } from '@wgalleti/primevue-components'
// { celular: 600, retrato: 840, desktop: 1200 }
```

Use-as quando precisar do número em JavaScript. Em CSS, escreva o literal — `var()` não vale
dentro de media query.
