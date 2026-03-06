# useFormatters

Composable com funcoes de formatacao para datas, numeros, moeda, CPF/CNPJ e telefone.

## Uso

```ts
import { useFormatters } from '@wgalleti/primevue-components'

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
  validateCpf,
  validateCnpj,
  validateCpfCnpj,
} = useFormatters()
```

## Funcoes de Formatacao

### `formatCurrency(value)`

```ts
formatCurrency(1234.5)   // "R$ 1.234,50"
formatCurrency(null)     // "—"
```

### `formatNumber(value, decimals?)`

```ts
formatNumber(1234.567)      // "1.234,57"
formatNumber(1234.567, 0)   // "1.235"
formatNumber(null)          // "—"
```

### `formatDate(value, format?)`

```ts
formatDate('2024-03-15')           // "15/03/2024"
formatDate('2024-03-15', 'YYYY')   // "2024"
formatDate(null)                   // "—"
```

### `formatDateTime(value)`

```ts
formatDateTime('2024-03-15T14:30:00') // "15/03/2024 14:30"
```

### `formatPercent(value)`

```ts
formatPercent(85.5) // "85,50%"
```

### `formatCpf(value)`

```ts
formatCpf('12345678901') // "123.456.789-01"
```

### `formatCnpj(value)`

```ts
formatCnpj('12345678000195') // "12.345.678/0001-95"
```

### `formatCpfCnpj(value)`

Detecta automaticamente se e CPF (11 digitos) ou CNPJ (14 digitos).

### `formatTelefone(value)`

```ts
formatTelefone('11999887766')  // "(11) 99988-7766"
formatTelefone('1133445566')   // "(11) 3344-5566"
```

## Funcoes de Validacao

### `validateCpf(value)`

```ts
validateCpf('12345678901')  // null (valido) ou "CPF invalido."
validateCpf('111')          // "CPF deve ter 11 digitos."
```

### `validateCnpj(value)`

```ts
validateCnpj('12345678000195')  // null ou "CNPJ invalido."
```

### `validateCpfCnpj(value)`

Valida como CPF ou CNPJ automaticamente.

## Funcoes de Data

### `parseDate(value)`

Converte string ISO para `Date`:

```ts
parseDate('2024-03-15')  // Date object
parseDate(null)          // null
```

### `toDateString(value)`

Converte `Date` para string `YYYY-MM-DD`:

```ts
toDateString(new Date(2024, 2, 15))  // "2024-03-15"
```

### `toDateTimeString(value)`

Converte `Date` para ISO string.

## Configuracao

O locale e moeda usam os valores do plugin:

```ts
app.use(WPrimeVuePlugin, {
  axios: api,
  locale: 'pt-BR',
  currency: 'BRL',
})
```
