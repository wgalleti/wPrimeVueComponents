# WProgressFlow

Componente visual para indicar progresso em fluxos curtos por etapas.

## API

<ApiTable name="WProgressFlow" />

No celular (< 600 px) a orientação horizontal empilha na vertical — marcador à esquerda, rótulo e
descrição ao lado, conector vertical —, porque 4–5 etapas lado a lado sobrepõem os rótulos.
Fora do celular nada muda.

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
