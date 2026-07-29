# WStatusTag

Tag de status com mapa de rótulo/severidade (padrão pt-BR embutido).

## API

<ApiTable name="WStatusTag" />

## Exemplo

```vue
<template>
  <!-- usa o mapa padrão (ativo, inativo, pendente, ...) -->
  <WStatusTag value="ativo" />

  <!-- mapa customizado -->
  <WStatusTag
    value="novo"
    :map="{
      novo: { label: 'Novo', severity: 'info' },
      arquivado: { label: 'Arquivado', severity: 'secondary' },
    }"
  />
</template>
```
