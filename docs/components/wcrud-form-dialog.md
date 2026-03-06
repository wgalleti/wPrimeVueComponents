# WCrudFormDialog

Dialog modal com formulario gerado automaticamente a partir da definicao de campos (`FieldDef[]`).

## Uso

Normalmente voce nao usa este componente diretamente — o `WCrudView` ja o renderiza internamente. Mas ele pode ser usado de forma independente:

```vue
<WCrudFormDialog
  :visible="crud.dialogVisible.value"
  :title="crud.dialogTitle.value"
  :fields="crud.config.form"
  :form-data="crud.formData"
  :is-editing="crud.isEditing.value"
  :saving="crud.saving.value"
  width="600px"
  @update:visible="(v) => { crud.dialogVisible.value = v }"
  @update:field="(field, val) => crud.setFormField(field, val)"
  @save="crud.save()"
/>
```

## Props

| Prop | Tipo | Padrao | Descricao |
|------|------|--------|-----------|
| `visible` | `boolean` | — | Controla visibilidade do dialog |
| `title` | `string` | — | Titulo do dialog |
| `fields` | `FieldDef[]` | — | Definicao dos campos |
| `formData` | `Record<string, unknown>` | — | Dados reativos do formulario |
| `isEditing` | `boolean` | — | Se esta editando ou criando |
| `saving` | `boolean` | — | Estado de salvamento |
| `width` | `string` | `'480px'` | Largura do dialog |

## Eventos

| Evento | Payload | Descricao |
|--------|---------|-----------|
| `update:visible` | `boolean` | Quando o dialog abre/fecha |
| `update:field` | `(field: string, value: unknown)` | Quando um campo muda |
| `save` | — | Quando o formulario e submetido |

## Tipos de Campo Suportados

| Tipo | Componente PrimeVue | Descricao |
|------|---------------------|-----------|
| `text` | `InputText` | Texto simples |
| `email` | `InputText` (type=email) | Email |
| `password` | `Password` | Senha com toggle |
| `number` | `InputNumber` | Numero com locale pt-BR |
| `currency` | `InputNumber` (mode=currency) | Valor monetario BRL |
| `date` | `DatePicker` | Seletor de data |
| `datetime` | `DatePicker` (showTime) | Data e hora |
| `select` | `Select` | Dropdown |
| `autocomplete` | `AutoComplete` | Autocomplete com opcoes locais |
| `fk` | `WAutoCompleteFK` | Autocomplete com busca na API |
| `switch` | `ToggleSwitch` | Toggle on/off |
| `textarea` | `Textarea` | Texto multilinha |
| `color` | `ColorPicker` + `InputText` | Seletor de cor |
| `cpf_cnpj` | `InputText` | CPF/CNPJ com mascara automatica |
| `mask` | `InputText` + maska | Campo com mascara customizada |
| `image` | `input[type=file]` | Upload de imagem |

## Layout do Formulario

O formulario usa um grid de 2 colunas. Controle o span com `colSpan`:

```ts
form: [
  { field: 'nome', label: 'Nome', colSpan: 1 },        // ocupa 2 colunas (padrao)
  { field: 'codigo', label: 'Codigo', colSpan: 0.5 },   // ocupa 1 coluna
  { field: 'preco', label: 'Preco', type: 'currency', colSpan: 0.5 },
]
```

- `colSpan: 1` (padrao) → largura total (2 colunas do grid)
- `colSpan: 0.5` → meia largura (1 coluna do grid)

## Validacao

```ts
form: [
  {
    field: 'cpf',
    label: 'CPF',
    type: 'cpf_cnpj',
    required: true,
    validate: (value) => {
      if (!value) return 'CPF obrigatorio'
      const digits = String(value).replace(/\D/g, '')
      if (digits.length !== 11) return 'CPF deve ter 11 digitos'
      return null // sem erro
    },
  },
]
```

## Visibilidade Condicional

```ts
form: [
  { field: 'tipo', label: 'Tipo', type: 'select', options: [...] },
  {
    field: 'cnpj',
    label: 'CNPJ',
    type: 'cpf_cnpj',
    visible: (formData) => formData.tipo === 'juridica',
  },
]
```

## Desabilitar em Edicao

```ts
form: [
  { field: 'codigo', label: 'Codigo', disabledOnEdit: true },
]
```

## Autofocus

```ts
form: [
  { field: 'nome', label: 'Nome', autofocus: true },
  // ou especifico por modo:
  { field: 'email', label: 'Email', autofocus: 'create' },
]
```

## Slots

### `field-{field}`

Renderizacao customizada de um campo:

```vue
<template #field-cor="{ field, formData, setFormField }">
  <div class="w-crud-form-col-full">
    <label class="w-crud-form-label">{{ field.label }}</label>
    <MyColorPicker
      :value="formData.cor"
      @change="(v) => setFormField('cor', v)"
    />
  </div>
</template>
```

### `footer`

Botoes customizados no rodape:

```vue
<template #footer="{ saving }">
  <Button label="Fechar" severity="secondary" @click="close" />
  <Button label="Salvar e Novo" :loading="saving" @click="saveAndNew" />
  <Button label="Salvar" :loading="saving" @click="save" />
</template>
```
