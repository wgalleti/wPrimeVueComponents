# WDetailHeader

Cabeçalho de página de detalhe com botão voltar, ícone, título e tag de status.

## API

<ApiTable name="WDetailHeader" />

## Exemplo

```vue
<template>
  <WDetailHeader
    title="Contrato 2024-08"
    subtitle="Cliente: Maria Silva"
    icon="pi pi-file"
    status="ativo"
    :status-map="{
      ativo: { label: 'Ativo', severity: 'success' },
      encerrado: { label: 'Encerrado', severity: 'danger' },
    }"
  />
</template>
```
