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

### Rótulo programático

`inputId` põe o `id` no input de digitação do AutoComplete (alvo do `<label for>`);
`inputAttrs` entra no mesmo input (`aria-labelledby`, `aria-describedby`, `aria-required`…),
não no wrapper. O `WFormRenderer` já passa os dois; standalone, rotule assim:

```vue
<label :for="`${id}-produto`">Produto</label>
<WAutoCompleteFK v-model="produto" endpoint="/produtos" :input-id="`${id}-produto`" />
```

## Comportamento

### Autocomplete Inline
- Digitacao dispara busca na API (debounce 300ms)
- Busca com parametro `?search=termo`
- Exibe ate 20 sugestoes
- Seleciona ao clicar

### Teclado

| Tecla | Painel | O que faz |
|---|---|---|
| `↓` | fechado | Abre a lista na hora: busca imediata com o texto atual (vazio lista os primeiros 20), sem esperar o debounce nem o `minLength`. Cascata obrigatória vazia continua sem buscar. |
| `↓` / `↑` | aberto | Navega entre as sugestões (PrimeVue). |
| `Enter` | aberto | Escolhe a sugestão focada — a primeira já nasce focada, então digitar e dar Enter seleciona. |
| `Enter` | fechado, texto novo, sem correspondência | Abre o **cadastro** com o texto já no campo do nome (`optionLabel` se existir no form; senão o primeiro campo de texto). Ao salvar, o registro entra selecionado e o foco volta ao campo. Só quando há cadastro para abrir: `canCreate` com `crudFields`, ou auto-detectado pelo `extras.fields` (que a busca inline também captura). |
| `Enter` | fechado, campo resolvido | Nada aqui — a navegação por Enter do formulário avança o foco. |
| `F2` | — | Abre o modal de pesquisa. |

Dentro de um formulário com `useFormKeyboardNav`, o campo marca o wrapper com `data-kbd-hold`
enquanto há texto novo e cadastro permitido — é o que segura o Enter no campo (em vez de o
formulário pular para o próximo) para ele virar cadastro. Texto igual ao rótulo do que já está
selecionado não é "novo".

### Único registro já vem preenchido (`autoSelectSingle`)

Quando a lista — com `endpointParams` e a cascata (`drilldown`) atuais — tem **um registro só**,
ele já entra selecionado (e sai no `update:modelValue`). Dispara ao montar sem valor e quando a
cascata passa a estar preenchida; **não** dispara quando o usuário limpa o campo, senão limpar
ficaria impossível. Só no modo simples (`multiple` ignora). Default `true`; `false` desliga:

```vue
<WAutoCompleteFK v-model="local" endpoint="/api/v1/locais/" :auto-select-single="false" />
```

No `FieldDef` (`type: 'fk'`), a chave é a mesma: `autoSelectSingle: false`.

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
- **Chips**: correm lado a lado e truncam com reticencias (nome completo no tooltip) — nenhum chip estica
  o campo. Clicar no chip abre a listagem ja marcada com a selecao atual; o `x` do chip so remove aquele item.
- **Placeholder**: some assim que ha selecao (ele descreve o estado "sem filtro").
- **Limpar tudo**: com `showClear` (padrao), um `x` aparece ao lado da lupa quando ha selecao, nos dois
  modos (simples e multiplo).
- **`maxChips`**: em campo estreito (filtro de painel), mostra N chips e resume o resto num chip `+N`,
  com os nomes escondidos no tooltip. `0` (padrao) mostra todos.

```vue
<WAutoCompleteFK
  v-model="fornecedores"
  endpoint="/api/v1/fornecedores/"
  multiple
  :max-chips="1"
  placeholder="Todos"
/>
```
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
