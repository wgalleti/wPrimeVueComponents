# useFormatters

Composable com funcoes de formatacao e validacao para locale brasileiro (pt-BR).

## Import

```typescript
import { useFormatters } from '@wgalleti/primevue-components'
```

## Uso

```typescript
const {
  formatCurrency,
  formatNumber,
  formatDate,
  formatDateTime,
  formatPercent,
  formatCpf,
  formatCnpj,
  formatCpfCnpj,
  formatTelefone,
  parseDate,
  toDateString,
  toDateTimeString,
  validateCpf,
  validateCnpj,
  validateCpfCnpj,
} = useFormatters()
```

## Formatadores

| Funcao | Entrada | Saida | Exemplo |
|---|---|---|---|
| `formatCurrency(val)` | `number` | `string` | `1500.5` → `R$ 1.500,50` |
| `formatNumber(val, decimals?)` | `number, number` | `string` | `1500.5, 2` → `1.500,50` |
| `formatDate(val, format?)` | `string \| Date` | `string` | `'2024-03-15'` → `15/03/2024` |
| `formatDateTime(val)` | `string \| Date` | `string` | → `15/03/2024 14:30` |
| `formatPercent(val)` | `number` | `string` | `0.15` → `15,00%` |
| `formatCpf(val)` | `string` | `string` | `'12345678900'` → `123.456.789-00` |
| `formatCnpj(val)` | `string` | `string` | → `12.345.678/0001-00` |
| `formatCpfCnpj(val)` | `string` | `string` | Auto-detecta por tamanho |
| `formatTelefone(val)` | `string` | `string` | → `(11) 99999-9999` |

## Conversores de Data

| Funcao | Descricao |
|---|---|
| `parseDate(val)` | ISO string ou Date → `Date \| null` |
| `toDateString(val)` | Date → `'YYYY-MM-DD'` (para API) |
| `toDateTimeString(val)` | Date → ISO 8601 completo (para API) |

## Validadores

Retornam `string` (mensagem de erro) ou `null` (valido).

| Funcao | Descricao |
|---|---|
| `validateCpf(val)` | Valida CPF com digitos verificadores |
| `validateCnpj(val)` | Valida CNPJ com digitos verificadores |
| `validateCpfCnpj(val)` | Auto-detecta e valida |

### Uso com FieldDef

```typescript
const { validateCpfCnpj } = useFormatters()

const form: FieldDef[] = [
  {
    field: 'documento',
    label: 'CPF/CNPJ',
    type: 'cpf_cnpj',
    validate: validateCpfCnpj,
  },
]
```

### Uso em colunas

```typescript
const { formatCurrency, formatDate } = useFormatters()

const columns: ColumnDef[] = [
  { field: 'valor', header: 'Valor', format: (v) => formatCurrency(v as number) },
  { field: 'vencimento', header: 'Vencimento', format: (v) => formatDate(v as string) },
]
```
