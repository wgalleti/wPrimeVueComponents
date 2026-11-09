# API gRPC (Connect)

A suite fala com a API Go (`api2`, `wapigo.kit.v1`) pelo protocolo **Connect**, como o REST: o
`dataProvider` troca, a tela nao. `useCrudManager`, `useSubviewCrud`, `WCrudView` e `WAutoCompleteFK`
continuam recebendo `endpoint` como string — aqui ele e a **chave do servico** registrado no provedor.
Projeto REST/DRF nao muda nada e nao precisa instalar os pacotes abaixo.

## Instalacao

```bash
yarn add @connectrpc/connect @connectrpc/connect-web @bufbuild/protobuf
yarn add -D @bufbuild/buf @bufbuild/protoc-gen-es
```

O provedor mora em um subpath proprio (`@wgalleti/primevue-components/connect`), entao os tres pacotes
sao peers **opcionais**.

## Tipos gerados (no projeto, nao na suite)

```yaml
# buf.gen.yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt: target=ts
```

```bash
buf generate ../backend/proto   # gera src/gen/app/v1/parceria_pb.ts com ParceriaService
```

## Transporte, token e organizacao

```ts
import { createConnectTransport } from '@connectrpc/connect-web'
import type { Interceptor } from '@connectrpc/connect'

const auth: Interceptor = (next) => async (req) => {
  req.header.set('Authorization', `Bearer ${session.accessToken}`)
  req.header.set('X-Organizacao', session.organizacaoId)
  return next(req)
}

const transport = createConnectTransport({
  baseUrl: `${import.meta.env.VITE_API_URL}/api/v2/rpc`,
  interceptors: [auth],
  // useBinaryFormat: true  // JSON e o padrao; binario tambem funciona
})
```

Login e refresh continuam REST; o access token e o mesmo.

## Registro

```ts
import { createConnectDataProvider } from '@wgalleti/primevue-components/connect'
import { ParceriaService } from './gen/app/v1/parceria_pb'

const dataProvider = createConnectDataProvider({
  transport,
  resources: {
    parcerias: ParceriaService, // endpoint da suite -> descriptor gerado
  },
  onUnauthenticated: () => session.expire(), // mesmo papel do interceptor 401 do axios
})

app.use(WPrimeVuePlugin, { dataProvider })
```

## CRUD

```vue
<script setup lang="ts">
import { useCrudManager, WCrudView } from '@wgalleti/primevue-components'

const crud = useCrudManager({
  endpoint: 'parcerias', // chave registrada acima
  columns: [{ field: 'nome', header: 'Nome' }],
  form: [
    { field: 'nome', label: 'Nome', required: true },
    { field: 'data_inicio', label: 'Inicio', type: 'date' },
  ],
})
</script>

<template>
  <WCrudView :crud="crud" title="Parcerias" />
</template>
```

FK com busca e cadastro embutido: `{ field: 'parceria', type: 'fk', endpoint: 'parcerias', ... }` —
`WAutoCompleteFK` usa `List` (busca) e `Get`/`Create`/`Update`/`Delete` (cadastro embutido).

Acao de estado (metodo proprio do servico recebendo `IdRequest`):

```ts
import { inject } from 'vue'
import { W_DATA_PROVIDER_KEY, type DataProvider } from '@wgalleti/primevue-components'

const provider = inject<DataProvider>(W_DATA_PROVIDER_KEY)!
rowActions: [{ action: 'aprovar', icon: 'pi pi-check',
  handler: (row) => provider.action!('parcerias', row.id, 'Aprovar').then(crud.refresh) }]
```

## Como a suite traduz

| Suite | Connect |
|---|---|
| `page`, `page_size` | `ListRequest.pagina`, `tamanho` (1-based; maximo 200, a suite ajusta) |
| `ordering` (`-campo`) | `ListRequest.ordem` |
| `search` | `ListRequest.busca` |
| demais parametros (filtros de coluna, `endpointParams`, `dependsOn`) | `ListRequest.filtros` (`campo` ou `campo__op`; array vira `campo__in` separado por virgula) |
| `count` / `results` | `rows` / `data` do grid |
| diff do formulario (`partialUpdate`, padrao) | `Update.update_mask.paths`, so os campos alterados |
| `Create` | campos do form viram a `Create<X>Request` |
| `Delete` | `IdRequest` |

- **Nomes de campo**: o grid e o form usam os nomes do proto (`snake_case`). Na leitura a suite usa
  `toJson({ useProtoFieldName: true })`; no envio aceita `snake_case` ou `camelCase` e grava o mask
  sempre em `snake_case`. Chave que nao existe na mensagem e ignorada (nao vai no mask).
- **Datas**: data pura e `string` `YYYY-MM-DD` no proto e passa como veio, igual ao REST. `Timestamp` e sempre data-hora (data pura em campo Timestamp falha com erro 400 no campo) (RFC3339 na leitura; datetime sem fuso no envio e hora local).
- **Dinheiro e int64** chegam como string; `FormData` (upload) nao e suportado — envie o arquivo a parte
  e mande a referencia no payload.
- **Mantenha `partialUpdate: true`** (padrao): com `false` o mask leva todos os campos.

## Erros

| `ConnectError.code` | Comportamento (igual ao REST) |
|---|---|
| `invalid_argument` + `google.rpc.BadRequest` | `field_violations` viram erro no campo do formulario (`fieldErrors`) e o toast lista os campos |
| `failed_precondition` | toast com a mensagem do servidor (status 409) |
| `not_found` | "Registro nao encontrado." (404) |
| `permission_denied` | "Voce nao tem permissao para realizar esta acao." (403) |
| `resource_exhausted` | "Muitas requisicoes. Tente novamente em instantes." (429) |
| `unauthenticated` | chama `onUnauthenticated` e segue como 401 |
| `internal` e demais | toast com o texto padrao da operacao ("Erro ao salvar registro") |

Os erros saem no formato que a suite ja le (`error.response.status` / `error.response.data`), entao
`extractApiError` e `extractFieldErrors` funcionam para os dois provedores.
