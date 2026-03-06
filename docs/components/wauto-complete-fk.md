# WAutoCompleteFK

Autocomplete com busca na API para campos de chave estrangeira (FK). Inclui botao de busca avancada que abre um modal com DataTable.

## Uso

```vue
<WAutoCompleteFK
  v-model="formData.categoria"
  endpoint="/api/categorias/"
  option-label="nome"
  placeholder="Selecione uma categoria"
/>
```

## Props

| Prop | Tipo | Padrao | Descricao |
|------|------|--------|-----------|
| `modelValue` | `unknown` | — | Valor selecionado (v-model) |
| `endpoint` | `string` | **obrigatorio** | URL da API para busca |
| `optionLabel` | `string` | `'nome'` | Campo do objeto a exibir |
| `placeholder` | `string` | — | Placeholder do input |
| `disabled` | `boolean` | `false` | Desabilita o componente |
| `showClear` | `boolean` | `true` | Exibe botao de limpar |

## Eventos

| Evento | Payload | Descricao |
|--------|---------|-----------|
| `update:modelValue` | `unknown` | Quando o valor muda |

## Como Funciona

### Autocomplete Inline

1. O usuario digita no campo
2. Apos 300ms de debounce, uma requisicao `GET {endpoint}?search={query}` e feita
3. Os resultados aparecem como sugestoes

### Modal de Busca Avancada

1. O usuario clica no botao de busca (icone de lupa dentro do input)
2. Um dialog abre com um DataTable paginado
3. O usuario pode buscar e navegar pela lista completa
4. Ao selecionar uma linha, o valor e preenchido e o modal fecha

## Uso no Formulario

No `FieldDef`, use `type: 'fk'`:

```ts
form: [
  {
    field: 'categoria',
    label: 'Categoria',
    type: 'fk',
    endpoint: '/api/categorias/',
    optionLabel: 'nome',
  },
]
```

O `useCrudManager` extrai automaticamente o ID do objeto selecionado ao salvar (usando `optionValue` ou `'id'` como padrao).

## Formato da API

O endpoint deve aceitar:

```
GET /api/categorias/?search=term&page=1&page_size=20
```

E retornar formato paginado DRF:

```json
{
  "results": [
    { "id": 1, "nome": "Categoria A" },
    { "id": 2, "nome": "Categoria B" }
  ],
  "count": 50
}
```

## Classes CSS

| Classe | Descricao |
|--------|-----------|
| `.w-autocompletefk` | Container raiz (flex row) |
| `.w-autocompletefk-trigger` | Botao de busca avancada |
| `.w-autocompletefk-toolbar` | Toolbar do modal |
| `.w-autocompletefk-toolbar-search` | Campo de busca do modal |
| `.w-autocompletefk-toolbar-actions` | Acoes do toolbar do modal |
| `.w-autocompletefk-empty` | Estado vazio do modal |
| `.w-autocompletefk-footer` | Footer do modal |
