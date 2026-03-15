# WPageHeader

Cabecalho de pagina simples para titulo, subtitulo e acoes principais.

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `title` | `string` | obrigatorio | Titulo principal |
| `subtitle` | `string` | `undefined` | Subtitulo opcional |
| `actionLabel` | `string` | `undefined` | Label do botao principal |
| `actionIcon` | `string` | `undefined` | Icone PrimeIcons do botao |

## Slots

| Slot | Descricao |
|---|---|
| `actions` | Acoes adicionais ao lado do botao principal |

## Exemplo

```vue
<WPageHeader title="Alunos" subtitle="Gestao de alunos da academia">
  <template #actions>
    <Button label="Exportar" severity="secondary" />
  </template>
</WPageHeader>
```
