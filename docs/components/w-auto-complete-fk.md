# WAutoCompleteFK

Componente de campo Foreign Key com dupla interface: autocomplete inline para buscas rapidas e modal com tabela para selecao em datasets maiores.

## Import

```vue
<script setup>
import { WAutoCompleteFK } from '@wgalleti/primevue-components'
</script>
```

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `modelValue` | `unknown` | — | Valor selecionado (ID ou objeto) |
| `endpoint` | `string` | **obrigatorio** | Endpoint da API para buscar opcoes |
| `optionLabel` | `string` | `'nome'` | Propriedade do objeto para exibicao |
| `optionValue` | `string` | `'id'` | Propriedade do objeto para valor |
| `placeholder` | `string` | `'Buscar...'` | Placeholder do input |
| `disabled` | `boolean` | `false` | Desabilitar campo |
| `showClear` | `boolean` | `true` | Mostrar botao limpar |
| `dialogHeader` | `string` | `undefined` | Titulo do modal de busca |
| `crudFields` | `FieldDef[]` | `undefined` | Campos do formulario para CRUD inline no modal (v0.2.0+) |
| `crudColumns` | `ColumnDef[]` | `undefined` | Colunas da tabela para CRUD inline no modal (v0.2.0+) |

## Eventos

| Evento | Payload | Descricao |
|---|---|---|
| `update:modelValue` | `unknown` | Valor selecionado mudou |

## Comportamento

### Autocomplete Inline
- Digitacao dispara busca na API (debounce 300ms)
- Busca com parametro `?search=termo`
- Exibe ate 20 sugestoes
- Seleciona ao clicar

### Modal de Busca
- Botao de lupa abre modal com DataTable completo
- Paginacao e busca independentes
- Colunas auto-detectadas do `extras.fields` da API
- Selecao ao clicar na linha

### Resolucao de Valor
- Aceita ID numerico: busca objeto na API (`GET endpoint/{id}/`)
- Aceita objeto completo: exibe direto
- Se valor muda externamente, re-resolve

## CRUD Inline no Modal (v0.2.0+)

Quando `crudFields` e `crudColumns` sao fornecidos, o modal de busca inclui botoes para criar e editar registros diretamente, sem sair do formulario atual.

### Comportamento com CRUD inline
- Botao "Novo" aparece no modal de busca
- Botao de editar aparece em cada linha da tabela
- Criar/editar abre um sub-dialog com formulario gerado pelo `WFormRenderer`
- Apos salvar, a tabela e atualizada automaticamente
- O registro criado/editado pode ser selecionado imediatamente

### Standalone com CRUD inline

```vue
<script setup>
import { pessoaColumns, pessoaForm } from '@/schemas/core/pessoa'
</script>

<WAutoCompleteFK
  v-model="selectedFornecedor"
  endpoint="/api/v1/pessoas/"
  option-label="nome"
  placeholder="Buscar fornecedor..."
  dialog-header="Selecionar Fornecedor"
  :crud-fields="pessoaForm"
  :crud-columns="pessoaColumns"
/>
```

## Uso com FieldDef

```typescript
const form: FieldDef[] = [
  {
    field: 'categoria',
    label: 'Categoria',
    type: 'fk',
    endpoint: '/api/v1/categorias/',
    optionLabel: 'nome',
    required: true,
  },
]
```

### FieldDef com CRUD inline

```typescript
import { pessoaColumns, pessoaForm } from '@/schemas/core/pessoa'

const form: FieldDef[] = [
  {
    field: 'fornecedor',
    label: 'Fornecedor',
    type: 'fk',
    endpoint: '/api/v1/pessoas/',
    optionLabel: 'nome',
    required: true,
    crudFields: pessoaForm,
    crudColumns: pessoaColumns,
  },
]
```

## Uso Standalone

```vue
<WAutoCompleteFK
  v-model="selectedCategoria"
  endpoint="/api/v1/categorias/"
  option-label="descricao"
  placeholder="Selecione a categoria"
/>
```

## Formato de Resposta Esperado

```json
// Lista (GET /api/v1/categorias/?search=ele)
{
  "data": [
    { "id": 1, "nome": "Eletronica" },
    { "id": 2, "nome": "Eletrodomesticos" }
  ],
  "page": 1,
  "page_size": 20,
  "rows": 2,
  "extras": {
    "fields": [
      { "field": "nome", "label": "Nome" },
      { "field": "ativa", "label": "Ativa" }
    ]
  }
}

// Detalhe (GET /api/v1/categorias/1/)
{ "id": 1, "nome": "Eletronica", "ativa": true }
```
