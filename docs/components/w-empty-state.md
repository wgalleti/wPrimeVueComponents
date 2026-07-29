# WEmptyState

Estado vazio generico com icone, titulo, descricao e CTA opcional.

## API

<ApiTable name="WEmptyState" />

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
