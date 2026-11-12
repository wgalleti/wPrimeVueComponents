# WPermissionMatrix

Matriz linha × operação — o caso do perfil de acesso (tela × ver/editar/gerenciar). Cada célula é
um checkbox com nome `"linha: operação"`; há "marcar tudo" por **linha** (coluna "Todas"), por
**coluna** (no cabeçalho da operação) e por **grupo** (na faixa do grupo). Nenhum deles mexe em
célula **fixa** (`isLocked`) nem em célula que **não existe** (`isAvailable`).

O valor é `{ [idDaLinha]: chavesDasOperações[] }` no `v-model`; ids fora de `rows` ficam intactos.

## API

<ApiTable name="WPermissionMatrix" />

## Exemplo

```vue
<script setup>
import { WPermissionMatrix } from '@wgalleti/primevue-components'

const operacoes = [
  { key: 'ver', label: 'Ver' },
  { key: 'editar', label: 'Editar' },
  { key: 'gerenciar', label: 'Gerenciar' },
]
// telas: [{ codigo: 'crm.leads', rotulo: 'Leads', grupo: 'CRM', opcoes: ['ver', 'editar'] }, …]
const concessoes = ref({ 'crm.leads': ['ver'] })
</script>

<template>
  <WPermissionMatrix
    v-model="concessoes"
    :rows="telas"
    :operations="operacoes"
    row-key="codigo"
    row-label="rotulo"
    group-by="grupo"
    :is-available="(tela, op) => tela.opcoes.includes(op)"
    :is-locked="(tela, op) => `${tela.codigo}.${op}` === 'acessos.perfis.gerenciar'"
    :locked-reason="() => 'Para não perder o acesso a esta tela, peça a outro administrador.'"
  />
</template>
```

O valor por linha casa com a concessão `tela.opcao` do servidor:

```js
const lista = Object.entries(v).flatMap(([tela, ops]) => ops.map((op) => `${tela}.${op}`))
```

## Célula fixa e célula inexistente

- **Inexistente** (`isAvailable` falso): a célula fica vazia (`—`), fora do teclado e dos "marcar
  tudo"; no card ela some.
- **Fixa** (`isLocked`): o checkbox fica desabilitado com cadeado e o valor não muda em nenhum
  sentido. O `lockedReason` vira `title` e uma linha de apoio sob o nome da linha
  (`Gerenciar: motivo`) — o motivo fica visível, não só no hover.

## Teclado e acessibilidade

A tabela tem `role="grid"`. Só uma célula entra no Tab (tabindex itinerante); as **setas** andam
entre as células, pulando as vazias e as fixas; **Home**/**End** vão ao começo ("Todas") e ao fim
da linha; **Espaço** marca. Os "marcar tudo" ficam indeterminados com marcação parcial e se
chamam `"Leads: todas"`, `"Editar: marcar em todas as linhas"`, `"CRM: marcar tudo"`.

## Card (componente estreito)

Abaixo de 840px de largura do **próprio** componente (a régua do `WEditableTable`), cada linha
vira um card: nome em cima, "Todas" e as operações com o nome ao lado do checkbox, quebrando
linha. O cabeçalho de colunas sai (o "marcar a coluna" só existe na grade). `cardMode`
(`auto` | `never` | `always`) fixa o modo.
