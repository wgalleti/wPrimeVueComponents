# useApiError

Composable para extrair mensagens de erro legiveis de respostas da API (Django REST Framework).

## Import

```typescript
import { useApiError } from '@wgalleti/primevue-components'
```

## Uso

```typescript
const { extractApiError } = useApiError()

try {
  await api.post('/api/v1/produtos/', data)
} catch (error) {
  const message = extractApiError(error, 'Erro ao salvar produto')
  toast.error(message)
}
```

## API

```typescript
interface ApiError {
  /**
   * Extrai mensagem legivel de um erro Axios/DRF.
   * @param error - Erro capturado (AxiosError, Error, ou unknown)
   * @param fallback - Mensagem padrao se nao conseguir extrair. Default: 'Erro inesperado'
   * @returns Mensagem de erro formatada
   */
  extractApiError(error: unknown, fallback?: string): string
}
```

## Formatos DRF Suportados

```json
// String simples
{ "detail": "Not found." }

// Array de erros
["Campo obrigatorio", "Valor invalido"]

// Erros por campo
{
  "email": ["Este campo e obrigatorio"],
  "nome": ["Valor muito longo"]
}

// Nested
{
  "detail": {
    "non_field_errors": ["Combinacao ja existe"]
  }
}
```

Todos sao normalizados para uma unica string legivel.
