# Field Mapper

Utilitarios para converter metadados de campos da API (como os do DRF OPTIONS) em `FieldDef[]` e `ColumnDef[]`.

## Uso

```ts
import { mapApiFieldsToFieldDefs, mapApiFieldsToColumnDefs } from '@wgalleti/primevue-components'
import type { ApiFieldMeta } from '@wgalleti/primevue-components'

// Metadados vindos da API (ex: OPTIONS /api/produtos/)
const apiFields: ApiFieldMeta[] = [
  { name: 'nome', label: 'Nome', type: 'string', required: true },
  { name: 'preco', label: 'Preco', type: 'decimal', required: true },
  { name: 'ativo', label: 'Ativo', type: 'boolean' },
  { name: 'categoria', label: 'Categoria', type: 'fk', endpoint: '/api/categorias/' },
  { name: 'tipo', label: 'Tipo', type: 'choice', choices: [
    { value: 'P', label: 'Produto' },
    { value: 'S', label: 'Servico' },
  ]},
]

const formFields = mapApiFieldsToFieldDefs(apiFields)
const columns = mapApiFieldsToColumnDefs(apiFields)
```

## `ApiFieldMeta`

```ts
interface ApiFieldMeta {
  name: string          // nome do campo
  label: string         // label para exibicao
  type: string          // tipo da API
  required?: boolean
  max_length?: number
  choices?: { value: string; label: string }[]
  read_only?: boolean
  endpoint?: string     // para FK
  option_label?: string // para FK
  option_value?: string // para FK
}
```

## Mapeamento de Tipos

| Tipo API | FieldDef type | ColumnDef type |
|----------|---------------|----------------|
| `string` | `text` | — |
| `integer` | `number` | `number` |
| `decimal` | `number` | `number` |
| `float` | `number` | `number` |
| `boolean` | `switch` | `boolean` |
| `choice` | `select` | — |
| `fk` | `fk` | — |
| `date` | `date` | `date` |
| `datetime` | `datetime` | `datetime` |
| `email` | `email` | — |
| `text` | `textarea` | — |

## Funcoes

### `mapApiFieldToFieldDef(apiField)`

Converte um campo da API para `FieldDef`.

### `mapApiFieldsToFieldDefs(apiFields)`

Converte array de campos, filtrando `read_only` e `id`.

### `mapApiFieldToColumnDef(apiField)`

Converte um campo para `ColumnDef`. Para FK, usa `{name}_nome` como field.

### `mapApiFieldsToColumnDefs(apiFields, maxColumns?)`

Converte array de campos em colunas, limitando a `maxColumns` (padrao: 6).

## CRUD Dinamico

```ts
const apiFields = ref<ApiFieldMeta[]>([])

// Busca metadados
const { data } = await axios.options('/api/produtos/')
apiFields.value = data.fields

const crud = useCrudManager({
  endpoint: '/api/produtos/',
  columns: mapApiFieldsToColumnDefs(apiFields.value),
  form: mapApiFieldsToFieldDefs(apiFields.value),
})
```
