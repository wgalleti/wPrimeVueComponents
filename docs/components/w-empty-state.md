# WEmptyState

Estado vazio generico com icone, titulo, descricao e CTA opcional.

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `icon` | `string` | obrigatorio | Icone PrimeIcons |
| `title` | `string` | obrigatorio | Titulo do estado vazio |
| `description` | `string` | `undefined` | Descricao opcional |
| `actionLabel` | `string` | `undefined` | Label do CTA |
| `actionIcon` | `string` | `undefined` | Icone do CTA |

## Emits

| Evento | Descricao |
|---|---|
| `action` | Disparado ao clicar no CTA |

## Exemplo

```vue
<WEmptyState
  icon="pi pi-users"
  title="Nenhum aluno cadastrado"
  description="Comece criando o primeiro aluno da academia."
  action-label="Novo aluno"
  action-icon="pi pi-plus"
  @action="abrirFluxo"
/>
```
