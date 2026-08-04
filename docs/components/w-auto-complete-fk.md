# WAutoCompleteFK

Componente de campo Foreign Key com dupla interface: autocomplete inline para buscas rapidas e modal com tabela para selecao em datasets maiores.

## Import

```vue
<script setup>
import { WAutoCompleteFK } from '@wgalleti/primevue-components'
</script>
```

## API

<ApiTable name="WAutoCompleteFK" />

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

## endpointParams

Adicionado na **v0.3.3** para resolver um bug onde query strings no `endpoint` (ex: `/api/v1/produtos/?categoria=combustivel`) quebravam a URL de detalhe. O componente constroi URLs de detalhe concatenando `endpoint + id + /`, entao query strings no endpoint geravam URLs invalidas como `/api/v1/produtos/?categoria=combustivel019cea52.../`.

Com `endpointParams`, os filtros sao passados separadamente:
- **Busca e modal**: `GET /api/v1/produtos/?page_size=20&categoria=combustivel&search=diesel`
- **Detalhe**: `GET /api/v1/produtos/019cea52.../` (sem os params extras)

### Standalone

```vue
<WAutoCompleteFK
  v-model="selectedProduto"
  endpoint="/api/v1/produtos/"
  :endpoint-params="{ categoria: 'combustivel' }"
  option-label="nome"
/>
```

### FieldDef

```typescript
{
  field: 'produto',
  label: 'Combustivel',
  type: 'fk',
  endpoint: '/api/v1/produtos/',
  endpointParams: { categoria: 'combustivel' },
  optionLabel: 'nome',
}
```

> **Importante**: nunca coloque query strings diretamente no `endpoint`. Use `endpointParams` para filtros fixos.

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

## Selecao multipla (v0.9.6+)

Com `multiple`, o campo vira uma lista de chips e o modal de pesquisa ganha caixas de marcacao.
Tipico em filtro de painel/relatorio ("comparar estes 3 fornecedores").

```vue
<WAutoCompleteFK
  v-model="fornecedores"
  endpoint="/api/v1/fornecedores/"
  multiple
  option-label="nome"
  placeholder="Todos"
  dialog-header="Selecionar fornecedores"
/>
```

Comportamento:

- **v-model** e uma **lista de objetos**. Pode entrar como lista de ids (cada id vira um `GET endpoint/{id}/`),
  lista de objetos ja resolvidos, ou `[]` / `null` para vazio. O que sai no `update:modelValue` e sempre a
  lista de objetos — mapeie para ids no consumidor: `fornecedores.map((f) => f.id)`.
- **Chips**: remover um chip emite a lista sem ele; `showClear` limpa tudo.
- **Modal**: abre ja marcando o que esta selecionado e o botao mostra a contagem (`Selecionar (3)`).
  Duplo clique **acrescenta** a marcacao (sem fechar o modal); `Enter` no grid confirma — inclusive
  vazio, que limpa a selecao.
- **Duplicados** sao descartados pela chave `optionValue`.
- **Cascata (`drilldown`)**: ao trocar o pai, a lista inteira e limpa, como no modo simples.

> `multiple` e para uso **standalone** (filtros, telas de comparacao). O `FieldDef` de formulario
> (`type: 'fk'`) continua single — relacao N:N em formulario ainda nao e suportada.

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
