# useUrlParam

Uma chave da query (`?importar=1`, `?rateio=<id>`) como `ref`. É a base do "diálogo na URL":
abrir grava a chave, o F5 mantém o diálogo aberto e o link compartilhado já abre com ele.
Para o caso comum (diálogo booleano) use direto o [`url-key` do WDialog](/components/w-dialog#dialogo-na-url).

```ts
function useUrlParam(
  name: string,
  options?: { accept?: (value: string) => boolean },
): Ref<string | null>
```

|                    |                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| Ler                | `null` quando a chave não está na URL.                                                             |
| Escrever           | `ref.value = 'abc'` grava `?name=abc`; `ref.value = null` remove a chave.                          |
| Reagir             | Muda sozinho quando a query muda com a tela montada (link para a mesma tela, URL editada, Voltar). |
| `accept`           | Valor da URL que não passa é tratado como ausente **e removido da URL**.                           |
| Sem `vue-router`   | Vira um ref local em memória; avisa em dev.                                                        |
| Aba de rota oculta | Não suja a URL da aba ativa: a escrita espera a aba voltar (o ref já reflete o valor).             |

## Diálogo por id

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useUrlParam, WDialog } from '@wgalleti/primevue-components'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const rateioId = useUrlParam('rateio', { accept: (v) => UUID.test(v) })
const aberto = computed({
  get: () => rateioId.value !== null,
  set: (v) => !v && (rateioId.value = null),
})
// abrir: rateioId.value = linha.id — carregue o rateio por rateioId.value
</script>

<template>
  <WDialog v-model:visible="aberto" header="Rateio" modal>...</WDialog>
</template>
```

Para diálogo aninhado use duas chaves (`?rateio=<id>&parcela=<id>`), uma por `useUrlParam`.

## Limites

- **Nunca use o valor da query sem validar.** Passe `accept` para uuid, código, nome de serviço.
- A URL é trocada com `router.replace`: **não empilha histórico** — Voltar não fecha o diálogo.
- Só o estado "aberto" (e o id) volta no F5; **o que foi digitado não volta**.
- Diálogo sobre estado **não salvo** (documento em rascunho, sem id) não deve ir para a URL.
- O nome da chave é do app; chaves de telas diferentes na mesma URL não colidem se os nomes forem distintos.
