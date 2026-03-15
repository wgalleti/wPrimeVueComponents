# WActionBar

Faixa flexivel para acoes principais, filtros e acoes secundarias.

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `align` | `'between' \| 'start' \| 'end'` | `'between'` | Alinhamento principal |
| `stackOnMobile` | `boolean` | `true` | Empilha em telas pequenas |

## Slots

| Slot | Descricao |
|---|---|
| default | Conteudo principal |
| `primary` | Grupo principal |
| `filters` | Filtros |
| `secondary` | Grupo secundario |

## Exemplo

```vue
<WActionBar>
  <template #primary>
    <Button label="Salvar e continuar" />
  </template>
  <template #secondary>
    <Button label="Cancelar" text />
  </template>
</WActionBar>
```
