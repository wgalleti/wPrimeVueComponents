# WFormRenderer

Componente standalone para renderizar formularios a partir de `FieldDef[]`. Extraido do `WCrudFormDialog` para uso independente em Cards, Dialogs e views complexas.

## Import

```vue
<script setup>
import { WFormRenderer } from '@wgalleti/primevue-components'
</script>
```

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `fields` | `FieldDef[]` | **obrigatorio** | Definicao dos campos |
| `formData` | `Record<string, unknown>` | **obrigatorio** | Dados do formulario (reativo) |
| `isEditing` | `boolean` | **obrigatorio** | Modo edicao (altera autofocus e disabledOnEdit) |
| `disabled` | `boolean` | `false` | Desabilita todos os campos |

## Eventos

| Evento | Payload | Descricao |
|---|---|---|
| `update:field` | `(field: string, value: unknown)` | Emitido quando um campo muda de valor |

## Metodos Expostos (ref)

| Metodo | Retorno | Descricao |
|---|---|---|
| `validateAll()` | `string[]` | Executa validacoes customizadas de todos os campos. Retorna array de mensagens de erro (vazio = valido) |
| `clearErrors()` | `void` | Limpa todas as mensagens de erro |

## Slots

| Slot | Scope | Descricao |
|---|---|---|
| `field-{fieldName}` | `{ field, formData, isEditing, setFormField }` | Override de campo individual |
| `image-{fieldName}` | `{ field, formData }` | Override do input de imagem |

## Diferenca entre WFormRenderer e WCrudFormDialog

| | WFormRenderer | WCrudFormDialog |
|---|---|---|
| Dialog | Nao inclui | Inclui (PrimeVue Dialog) |
| Botoes salvar/cancelar | Nao inclui | Inclui |
| Evento save | Nao tem | Emite `save` apos validacao |
| Uso | Embutido em Card, Dialog, qualquer container | Standalone como modal CRUD |

O `WCrudFormDialog` usa `WFormRenderer` internamente — a API externa do dialog nao mudou.

## Tipos de Campo Suportados

Todos os tipos do `FieldDef` sao suportados:

| Tipo | Componente PrimeVue | Notas |
|---|---|---|
| `text` | InputText | Suporta `mask` (maska) |
| `email` | InputText type=email | |
| `password` | Password | Com `feedback` opcional |
| `number` | InputNumber | `min`, `max`, `fraction` |
| `currency` | InputNumber | Prefixo R$, 2 decimais |
| `date` | DatePicker | Formato pt-BR |
| `datetime` | DatePicker showTime | Formato 24h |
| `select` | Select | `options`, `optionLabel` |
| `autocomplete` | AutoComplete | Com filtragem local |
| `fk` | WAutoCompleteFK | Busca na API + modal + CRUD inline |
| `switch` | ToggleSwitch | Com `switchLabel` |
| `textarea` | Textarea | `rows` configuravel |
| `color` | ColorPicker | Com input hex |
| `cpf_cnpj` | InputText + mask auto | Detecta CPF ou CNPJ |
| `mask` | InputText + maska | Pattern customizado |
| `image` | input file / slot | Upload com slot customizavel |

## Uso Basico — Formulario em Card

```vue
<script setup lang="ts">
import { WFormRenderer } from '@wgalleti/primevue-components'
import type { FieldDef } from '@wgalleti/primevue-components'

const form = reactive({
  nome: '',
  email: '',
  tipo: null,
})

const fields: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true, colSpan: 0.5 },
  { field: 'email', label: 'Email', type: 'email', colSpan: 0.5 },
  { field: 'tipo', label: 'Tipo', type: 'select', options: [
    { label: 'Pessoa Fisica', value: 'PF' },
    { label: 'Pessoa Juridica', value: 'PJ' },
  ]},
]
</script>

<template>
  <Card>
    <template #content>
      <WFormRenderer
        :fields="fields"
        :form-data="form"
        :is-editing="false"
        @update:field="(f, v) => { (form as Record<string, unknown>)[f] = v }"
      />
    </template>
  </Card>
</template>
```

## Uso com Schemas Centralizados

A pratica recomendada e centralizar as definicoes de `FieldDef[]` em arquivos de schema separados para reutilizacao em multiplos contextos (CRUD, formularios, FK inline).

### Definicao do Schema

```typescript
// src/schemas/core/produto.ts
import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'

export const produtoColumns: ColumnDef[] = [
  { field: 'nome', header: 'Nome' },
  { field: 'unidade_medida', header: 'Unidade', style: 'width: 8rem' },
  { field: 'preco_medio', header: 'Preco Medio', type: 'currency' },
  { field: 'ativo', header: 'Status', type: 'boolean' },
]

export const produtoForm: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true },
  { field: 'unidade_medida', label: 'Unidade de Medida', type: 'select', colSpan: 0.5, options: [
    { label: 'Unidade', value: 'UN' },
    { label: 'Litro', value: 'LT' },
    { label: 'Quilograma', value: 'KG' },
  ]},
  { field: 'preco_medio', label: 'Preco Medio', type: 'currency', colSpan: 0.5 },
  { field: 'ativo', label: 'Ativo', type: 'switch', defaultValue: true },
]
```

### Reuso 1 — CRUD (WCrudView)

```vue
<script setup lang="ts">
import { useCrudManager, WCrudView } from '@wgalleti/primevue-components'
import { produtoColumns, produtoForm } from '@/schemas/core/produto'

const crud = useCrudManager({
  endpoint: '/api/v1/produtos/',
  columns: produtoColumns,
  form: produtoForm,
})
</script>

<template>
  <WCrudView :crud="crud" title="Produtos" />
</template>
```

### Reuso 2 — WFormRenderer em view complexa

```vue
<script setup lang="ts">
import { WFormRenderer } from '@wgalleti/primevue-components'
import { compraHeaderForm, compraItemForm } from '@/schemas/estoque/compra'

const form = reactive({ data: new Date(), fornecedor: null, numero_nf: '', observacoes: '' })
const itemForm = reactive({ produto: null, local_estoque: null, quantidade: 0, valor_unitario: 0 })
</script>

<template>
  <!-- Cabecalho da compra -->
  <Card>
    <template #content>
      <WFormRenderer
        :fields="compraHeaderForm"
        :form-data="form"
        :is-editing="!isNovo"
        @update:field="(f, v) => { (form as Record<string, unknown>)[f] = v }"
      />
    </template>
  </Card>

  <!-- Dialog de item -->
  <Dialog v-model:visible="itemDialogVisible" header="Adicionar Item" modal>
    <WFormRenderer
      :fields="compraItemForm"
      :form-data="itemForm"
      :is-editing="editingIndex !== null"
      @update:field="(f, v) => { (itemForm as Record<string, unknown>)[f] = v }"
    />
    <!-- Campo calculado fica fora do schema -->
    <div class="flex flex-col gap-1 mt-4">
      <label class="text-xs font-medium text-muted-color">Total</label>
      <InputNumber
        :model-value="(itemForm.quantidade || 0) * (itemForm.valor_unitario || 0)"
        mode="currency" currency="BRL" locale="pt-BR" disabled
      />
    </div>
  </Dialog>
</template>
```

### Reuso 3 — CRUD inline no WAutoCompleteFK

Os schemas podem alimentar as props `crudFields` e `crudColumns` de campos FK, habilitando CRUD inline no modal de busca.

```typescript
// src/schemas/estoque/compra.ts
import { pessoaColumns, pessoaForm } from '../core/pessoa'
import { produtoColumns, produtoForm } from '../core/produto'
import { localEstoqueColumns, localEstoqueForm } from './local-estoque'

export const compraHeaderForm: FieldDef[] = [
  { field: 'data', label: 'Data', type: 'date', colSpan: 0.5 },
  {
    field: 'fornecedor',
    label: 'Fornecedor',
    type: 'fk',
    endpoint: '/api/v1/pessoas/',
    placeholder: 'Buscar fornecedor...',
    colSpan: 0.5,
    crudFields: pessoaForm,      // habilita criar/editar pessoa no modal FK
    crudColumns: pessoaColumns,
  },
  { field: 'numero_nf', label: 'Numero NF', colSpan: 0.5 },
  { field: 'observacoes', label: 'Observacoes', type: 'textarea' },
]

export const compraItemForm: FieldDef[] = [
  {
    field: 'produto',
    label: 'Produto',
    type: 'fk',
    endpoint: '/api/v1/produtos/',
    placeholder: 'Buscar produto...',
    colSpan: 0.5,
    crudFields: produtoForm,
    crudColumns: produtoColumns,
  },
  {
    field: 'local_estoque',
    label: 'Local de Estoque',
    type: 'fk',
    endpoint: '/api/v1/locais-estoque/',
    placeholder: 'Buscar local...',
    colSpan: 0.5,
    crudFields: localEstoqueForm,
    crudColumns: localEstoqueColumns,
  },
  { field: 'quantidade', label: 'Quantidade', type: 'number', minFractionDigits: 1, maxFractionDigits: 2, colSpan: 0.5 },
  { field: 'valor_unitario', label: 'Valor Unitario', type: 'currency', colSpan: 0.5 },
]
```

## Convencao de Schemas

### Regras

1. **Dados puros** — sem imports de Vue, sem `reactive`, sem componentes
2. **Naming**: `{entidade}Columns`, `{entidade}Form` para entidades simples
3. **Entidades complexas**: adicionar sufixos — `{entidade}HeaderForm`, `{entidade}ItemForm`, `{entidade}ItemColumns`
4. **Campos calculados** (ex: Total) ficam no template da view, fora do schema
5. **Opcoes estaticas** no schema; opcoes dinamicas (da API) sao mergeadas na view

### Helper mergeFieldOverrides

Para customizar schemas base sem duplicar:

```typescript
// src/schemas/shared/options.ts
import type { FieldDef } from '@wgalleti/primevue-components'

export function mergeFieldOverrides(
  base: FieldDef[],
  overrides: Record<string, Partial<FieldDef>>,
): FieldDef[] {
  return base.map((f) => ({ ...f, ...(overrides[f.field] || {}) }))
}
```

```typescript
// Uso: pessoa com campo extra obrigatorio
import { pessoaForm } from '@/schemas/core/pessoa'
import { mergeFieldOverrides } from '@/schemas/shared/options'

const pessoaFornecedorForm = mergeFieldOverrides(pessoaForm, {
  cnpj: { required: true },
})
```

## Validacao

```vue
<script setup lang="ts">
import { WFormRenderer } from '@wgalleti/primevue-components'

const formRef = ref<InstanceType<typeof WFormRenderer>>()

const fields: FieldDef[] = [
  {
    field: 'email',
    label: 'Email',
    type: 'email',
    validate: (v) => {
      if (v && !String(v).includes('@')) return 'Email invalido'
      return null
    },
  },
]

async function salvar() {
  const errors = formRef.value?.validateAll() || []
  if (errors.length) return

  // salvar...
}
</script>

<template>
  <WFormRenderer ref="formRef" :fields="fields" :form-data="form" :is-editing="false"
    @update:field="(f, v) => { (form as Record<string, unknown>)[f] = v }" />
  <Button label="Salvar" @click="salvar" />
</template>
```

## Override de Campo Individual

```vue
<WFormRenderer :fields="fields" :form-data="form" :is-editing="false"
  @update:field="(f, v) => { (form as Record<string, unknown>)[f] = v }">
  <template #field-observacoes="{ formData }">
    <div class="w-crud-form-col-full">
      <label class="w-crud-form-label">Observacoes Especiais</label>
      <Editor v-model="formData.observacoes" />
    </div>
  </template>
</WFormRenderer>
```
