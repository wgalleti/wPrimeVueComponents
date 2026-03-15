# WSectionHeader

Cabecalho para secoes internas de pagina, cards e fluxos guiados.

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `title` | `string` | obrigatorio | Titulo da secao |
| `subtitle` | `string` | `undefined` | Texto auxiliar |
| `icon` | `string` | `undefined` | Icone opcional |
| `compact` | `boolean` | `false` | Reduz espacamento inferior |

## Slots

| Slot | Descricao |
|---|---|
| `icon` | Override do bloco de icone |
| `meta` | Meta-informacoes ao lado do titulo |
| `actions` | Acoes da secao |

## Exemplo

```vue
<WSectionHeader
  title="Contato de emergencia"
  subtitle="Use alguem que a academia possa acionar rapidamente."
  icon="pi pi-shield"
>
  <template #actions>
    <Button label="Limpar" text />
  </template>
</WSectionHeader>
```
