# WSegmented

Grupo de opções lado a lado, no lugar de `SelectButton` e `ToggleButton`. Aparência pelos tokens
do app; sem valor literal na tela.

- Simples (padrão): uma opção sempre marcada. `multiple`: várias, e o modelo é uma lista.
- **Uma opção só** vira alternador (`aria-pressed`). O modelo é boolean, ou o valor da opção /
  `null` quando a opção não é boolean.
- `ariaLabel` dá o nome do grupo; `size="sm"` para barras de ferramentas densas.

## API

<ApiTable name="WSegmented" />

## Exemplo

```vue
<template>
  <WSegmented
    v-model="visao"
    aria-label="Visão"
    :options="[
      { label: 'Lista', value: 'lista', icon: 'pi pi-list' },
      { label: 'Cartões', value: 'cartoes', icon: 'pi pi-th-large' },
    ]"
  />

  <!-- alternador: modelo boolean -->
  <WSegmented v-model="soAtivos" :options="[{ label: 'Só ativos', value: true }]" />
</template>
```
