# useApiError

Extrai mensagens de erro legiveis de respostas da API (especialmente Django REST Framework).

## Uso

```ts
import { extractApiError } from '@wgalleti/primevue-components'

try {
  await api.post('/items/', data)
} catch (err) {
  const message = extractApiError(err, 'Erro ao salvar')
  toast.error(message)
}
```

## `extractFieldErrors(error)`

Devolve `{ campo: mensagem }` de uma resposta 400 (DRF `{ campo: [msgs] }`; no provedor Connect, o
`BadRequest.field_violations`). `detail` e `non_field_errors` ficam de fora. O `useCrudManager` usa isso para
preencher `crud.fieldErrors`, que o `WCrudView` mostra no campo do formulario.

## `extractApiError(error, fallback?)`

| Param | Tipo | Padrao |
|-------|------|--------|
| `error` | `unknown` | **obrigatorio** |
| `fallback` | `string` | `'Erro inesperado'` |

### Formatos Suportados

**DRF - campo `detail`:**
```json
{ "detail": "Token invalido." }
```
Resultado: `"Token invalido."`

**DRF - erros de validacao:**
```json
{
  "nome": ["Este campo e obrigatorio."],
  "email": ["Email invalido."]
}
```
Resultado: `"Nome: Este campo e obrigatorio.\nEmail: Email invalido."`

**DRF - `non_field_errors`:**
```json
{
  "non_field_errors": ["As senhas nao conferem."]
}
```
Resultado: `"As senhas nao conferem."`

## `useApiError()`

Composable que retorna `{ extractApiError }`:

```ts
const { extractApiError } = useApiError()
```
