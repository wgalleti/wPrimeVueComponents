# WTreeSelect

Seleção múltipla numa árvore com checkbox, alimentada por uma **lista plana** + um campo de agrupamento. O `v-model` é um **array de ids de folha** — não o mapa de chaves do PrimeVue, e nunca com id de grupo dentro.

Caso típico: liberar telas de um portal para um perfil. Dezenas de telas agrupadas por módulo; o administrador marca o módulo inteiro ou abre e escolhe uma a uma.

## API

<ApiTable name="WTreeSelect" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'

const telas = [
  { id: 1, nome: 'Lotes de semente', modulo: 'Sementes' },
  { id: 2, nome: 'Análises de qualidade', modulo: 'Sementes' },
  { id: 3, nome: 'Notas fiscais', modulo: 'Estoque' },
  { id: 4, nome: 'Fornecedores', modulo: 'Cadastros' },
]

const liberadas = ref<number[]>([1, 3])
</script>

<template>
  <WTreeSelect
    v-model="liberadas"
    :options="telas"
    group-by="modulo"
    filter
    filter-placeholder="Buscar tela..."
    aria-label="Telas liberadas"
    empty-message="Nenhuma tela cadastrada"
  />
</template>
```

Sem `group-by` a árvore vira uma lista rasa de checkboxes. Com `group-label` você formata o rótulo do nó-pai sem mexer no valor que veio da API:

```vue
<WTreeSelect
  v-model="liberadas"
  :options="telas"
  group-by="modulo"
  :group-label="(chave) => chave.toUpperCase()"
/>
```

## Comportamento

- **Só folha entra no `v-model`.** O nó de grupo é visual. Emitir id de grupo obrigaria todo consumidor a filtrá-los na saída.
- **Marcar/desmarcar um grupo alterna todas as folhas dele** — inclusive as que o filtro estiver escondendo. É a leitura coerente com o checkbox do grupo, que sempre reflete o conjunto completo.
- **Busca sem acento e sem caixa.** `filter-fields` acrescenta campos do registro além do rótulo (ex.: uma sigla).
- Buscar **não altera a seleção**; grupos com resultado abrem sozinhos para o resultado não ficar atrás de um nó fechado.
- `loading` mostra o spinner do `Tree`; lista vazia mostra `empty-message`; busca sem resultado mostra `filter-empty-message`.

## Slots

| Slot | Escopo | Para quê |
|---|---|---|
| `header` | `{ selectedCount, total }` | substitui o contador e os atalhos "Marcar todos"/"Limpar" |
| `node` | `{ node }` | conteúdo do nó (badge, ícone, descrição secundária) |
| `empty` | `{ filtering }` | estado vazio |

## Por que a seleção é derivada, e não delegada ao `Tree`

Trocar a derivação interna por um `v-model:selectionKeys` parece uma simplificação óbvia. **Não é.**

O `Tree` do PrimeVue com `selectionMode="checkbox"` mantém a seleção como `{ chave: { checked, partialChecked } }` e propaga sozinho para pais e filhos. Com o **filtro ativo**, o `partialChecked` dos ancestrais passa a se referir à árvore **filtrada** em vez da árvore inteira:

- Issue: [primefaces/primevue#6928](https://github.com/primefaces/primevue/issues/6928) — aberta, "Help Wanted".
- Mecanismo: `TreeNode.propagateUp()` conta `this.node.children`, e sob filtro `this.node` é uma **cópia** que o `findFilteredNodes()` produziu com apenas os filhos que casaram com a busca.
- Efeito prático: um grupo com 12 telas, 3 marcadas, filtro mostrando só essas 3 → o grupo aparece **totalmente marcado**. Ao salvar, o usuário libera o que não queria.
- O repositório do PrimeVue foi **arquivado em junho/2026 e está read-only** — não será corrigido upstream.

E checkbox + filtro é exatamente a combinação que este componente existe para servir. Por isso:

1. a fonte da verdade é o `modelValue` (ids de folha), sem estado espelhado;
2. o `selectionKeys` é **derivado sobre a árvore inteira**, nunca sobre a visão filtrada — correto por construção;
3. o `Tree` recebe `:selection-keys` como prop **controlada** (não `v-model:`); o mapa que ele calcularia é descartado;
4. os eventos usados são `node-select` / `node-unselect` (o nó clicado e a direção do clique — a intenção crua do usuário), e **não** `update:selectionKeys`, que entrega justamente o mapa já propagado pelo código com defeito;
5. o nó do evento é resolvido pela `key` no índice da **árvore inteira** — sob filtro ele é uma cópia podada, e ler `event.node.children` alternaria só as folhas visíveis.

A cobertura está em `src/utils/treeSelect.test.ts` (derivação pura) e `src/components/form/WTreeSelect.test.ts` (montagem real com o `Tree`, incluindo o cenário com filtro ativo).
