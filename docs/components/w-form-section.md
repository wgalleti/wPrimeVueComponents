# WFormSection

Container visual para agrupar campos relacionados em formularios.

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `title` | `string` | obrigatorio | Titulo do grupo |
| `description` | `string` | `undefined` | Texto de apoio |
| `variant` | `'default' \| 'muted' \| 'outlined'` | `'default'` | Variante visual |

## Slots

| Slot | Descricao |
|---|---|
| default | Conteudo da secao |
| `actions` | Acoes no cabecalho |

## Exemplo

```vue
<WFormSection
  title="Dados iniciais"
  description="Peça apenas o minimo necessario para iniciar o cadastro."
>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <!-- campos -->
  </div>
</WFormSection>
```
