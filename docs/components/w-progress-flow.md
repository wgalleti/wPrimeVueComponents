# WProgressFlow

Componente visual para indicar progresso em fluxos curtos por etapas.

## API

<ApiTable name="WProgressFlow" />

## Exemplo

```vue
<WProgressFlow
  :steps="[
    { key: 'dados', label: 'Dados basicos' },
    { key: 'contexto', label: 'Contexto do aluno' },
    { key: 'revisao', label: 'Revisao' },
  ]"
  current-step="contexto"
/>
```
