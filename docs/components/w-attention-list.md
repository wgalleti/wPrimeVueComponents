# WAttentionList

Pontos de atenção de uma tela operacional: o que pede ação, com a contagem e o atalho para o
filtro ou a tela. A ordem é de quem chama — ponha o que pede ação primeiro no topo. Sem listener
de `item-click` nem `to`, as linhas são só leitura.

| `severity` | Uso |
|---|---|
| `danger` | bloqueia ou gera retrabalho já |
| `warning` | vai virar problema |
| `info` / `success` | informação ou situação boa |
| `neutral` | contagem sem urgência (default) |

## API

<ApiTable name="WAttentionList" />

## Exemplo — atenção como filtro da lista

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { WAttentionList } from '@wgalleti/primevue-components'
import type { AttentionItem } from '@wgalleti/primevue-components'

const foco = ref<string | null>(null)
const itens = computed<AttentionItem[]>(() => [
  { key: 'sem_anamnese', icon: 'pi pi-heart', label: 'Sem anamnese', value: 100, severity: 'danger',
    active: foco.value === 'sem_anamnese' },
])
</script>

<template>
  <WAttentionList
    title="Atenção"
    :items="itens"
    @item-click="({ item }) => (foco = foco === item.key ? null : item.key ?? null)"
  />
</template>
```

Para o resumo em números ao lado, use o `WKpiGrid` com `active` no item aplicado como filtro.
