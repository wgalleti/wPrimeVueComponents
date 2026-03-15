# WProgressFlow

Componente visual para indicar progresso em fluxos curtos por etapas.

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `steps` | `Array<{ key: string; label: string; description?: string }>` | obrigatorio | Lista de etapas |
| `currentStep` | `string` | obrigatorio | Chave da etapa atual |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientacao do fluxo |

## Slots

| Slot | Descricao |
|---|---|
| `step` | Override de cada etapa (`{ step, index, state }`) |

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
