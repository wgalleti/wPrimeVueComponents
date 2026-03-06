# WCrudFormDialog

Componente de dialog modal com formulario gerado automaticamente a partir da definicao de campos (`FieldDef[]`).

Usado internamente pelo `WCrudView`, mas pode ser usado standalone.

## Import

```vue
<script setup>
import { WCrudFormDialog } from '@wgalleti/primevue-components'
</script>
```

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `visible` | `boolean` | **obrigatorio** | Controla visibilidade (v-model) |
| `title` | `string` | `'Novo Registro'` | Titulo do dialog |
| `fields` | `FieldDef[]` | **obrigatorio** | Definicao dos campos |
| `formData` | `Record<string, unknown>` | **obrigatorio** | Dados do formulario (reativo) |
| `isEditing` | `boolean` | `false` | Modo edicao |
| `saving` | `boolean` | `false` | Estado de salvamento (desabilita botoes) |
| `width` | `string` | `'480px'` | Largura do dialog |
| `saveLabel` | `string` | `'Salvar'` | Label do botao salvar |
| `cancelLabel` | `string` | `'Cancelar'` | Label do botao cancelar |

## Eventos

| Evento | Payload | Descricao |
|---|---|---|
| `update:visible` | `boolean` | Fecha o dialog |
| `save` | — | Formulario submetido (apos validacao) |
| `cancel` | — | Botao cancelar clicado |

## Slots

| Slot | Scope | Descricao |
|---|---|---|
| `header` | — | Override do header do dialog |
| `before-fields` | `{ formData, isEditing }` | Conteudo antes dos campos |
| `after-fields` | `{ formData, isEditing }` | Conteudo apos os campos |
| `field-{fieldName}` | `{ formData, isEditing, setFormField }` | Override de campo individual |
| `footer` | `{ saving }` | Override dos botoes de acao |

## Tipos de Campo Suportados

| Tipo | Componente PrimeVue | Notas |
|---|---|---|
| `text` | InputText | |
| `email` | InputText type=email | |
| `password` | Password | Com `feedback` opcional |
| `number` | InputNumber | `min`, `max`, `fraction` |
| `currency` | InputNumber | Prefixo R$, 2 decimais |
| `date` | DatePicker | Formato pt-BR |
| `datetime` | DatePicker showTime | Formato 24h |
| `select` | Select | `options`, `optionLabel` |
| `autocomplete` | AutoComplete | Com filtragem local |
| `fk` | WAutoCompleteFK | Busca na API + modal |
| `switch` | ToggleSwitch | Com `switchLabel` |
| `textarea` | Textarea | `rows` configuravel |
| `color` | ColorPicker | |
| `cpf_cnpj` | InputText + mask auto | Detecta CPF ou CNPJ |
| `mask` | InputText + maska | Pattern customizado |
| `image` | WImageCropper | Upload + crop |

## Layout do Grid

O formulario usa grid de 2 colunas:

- `colSpan: 1` (default) → campo ocupa a linha inteira
- `colSpan: 0.5` → campo ocupa metade da linha

```typescript
// Dois campos lado a lado
{ field: 'first_name', label: 'Nome', colSpan: 0.5 },
{ field: 'last_name', label: 'Sobrenome', colSpan: 0.5 },

// Campo que ocupa a linha toda
{ field: 'email', label: 'Email' },
```

## Uso Standalone

```vue
<script setup>
const dialogVisible = ref(false)
const formData = reactive({ nome: '', email: '' })

const fields: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true },
  { field: 'email', label: 'Email', type: 'email' },
]

const handleSave = async () => {
  await api.post('/api/v1/convites/', formData)
  dialogVisible.value = false
}
</script>

<template>
  <Button label="Convidar" @click="dialogVisible = true" />

  <WCrudFormDialog
    v-model:visible="dialogVisible"
    title="Novo Convite"
    :fields="fields"
    :form-data="formData"
    @save="handleSave"
  />
</template>
```
