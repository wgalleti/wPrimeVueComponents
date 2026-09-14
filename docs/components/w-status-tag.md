# WStatusTag

Tag de status com mapa de rótulo/severidade (padrão pt-BR embutido).

## API

<ApiTable name="WStatusTag" />

A tag é o `<Tag>` do PrimeVue com a classe `w-tag w-tag--<severity>`: a cor vem dos tokens do
app (`--success`, `--danger`, `--warning`, `--info` e os `-soft`), não da paleta fixa do
PrimeVue — ver [Classes CSS](/css/classes#cores-de-status).

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
