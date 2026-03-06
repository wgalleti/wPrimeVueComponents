# Datas

Funcoes utilitarias para manipulacao de datas usando Day.js.

## Funcoes

### `parseDate(value)`

Converte string para `Date`. Suporta formato `YYYY-MM-DD` e ISO.

```ts
import { parseDate } from '@wgalleti/primevue-components'

parseDate('2024-03-15')              // Date
parseDate('2024-03-15T14:30:00Z')    // Date
parseDate(null)                       // null
```

### `toDateString(value)`

Converte `Date` para string `YYYY-MM-DD` (formato para API).

```ts
toDateString(new Date(2024, 2, 15))  // "2024-03-15"
toDateString('2024-03-15')           // "2024-03-15" (passthrough)
toDateString(null)                    // null
```

### `toDateTimeString(value)`

Converte `Date` para ISO string (formato para API).

```ts
toDateTimeString(new Date())  // "2024-03-15T14:30:00.000Z"
```

### `formatDateValue(value, format?)`

Formata data para exibicao.

```ts
formatDateValue('2024-03-15')              // "15/03/2024"
formatDateValue('2024-03-15', 'DD/MM/YY')  // "15/03/24"
formatDateValue(null)                       // "—"
```

### `formatDateTimeValue(value)`

Formata data/hora para exibicao.

```ts
formatDateTimeValue('2024-03-15T14:30:00') // "15/03/2024 14:30"
```

## Uso Interno

Estas funcoes sao usadas internamente pelo `useCrudManager` para:
- Converter strings da API em `Date` ao abrir o dialog de edicao
- Converter `Date` do DatePicker em string ao salvar

E pelo `WCrudColumnRenderer` para formatar datas na tabela.
