# useDelayedLoading

Esqueleto sem piscar: só decide o que desenhar, nunca atrasa o dado.

```ts
import { useDelayedLoading } from '@wgalleti/primevue-components'

const { showSkeleton } = useDelayedLoading(() => crud.loading.value, { delay: 150 })
```

- Entrada: `Ref<boolean>` ou getter; `delay` em ms (default 150).
- `showSkeleton` vira `true` só se o carregamento passar de `delay`; volta a `false` assim que termina.
- O timer é limpo ao sair do escopo (unmount).

O `WCrudView` já usa isso: `:skeleton="false"` volta ao loading imediato, `:loading-delay` muda o delay.
