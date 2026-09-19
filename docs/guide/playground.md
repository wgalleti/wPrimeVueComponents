# Playground

Aplicacao de teste local para desenvolvimento e validacao dos componentes.

## Estrutura

```
playground/
├── package.json          # Dependencias do playground
├── vite.config.ts        # Vite com alias para ../src
├── index.html
├── src/
│   ├── main.ts           # Setup Vue + PrimeVue + WPlugin
│   ├── App.vue           # Layout com sidebar de navegacao
│   ├── router.ts         # Rotas para cada exemplo
│   ├── plugins/
│   │   └── axios.ts      # Mock axios ou json-server
│   ├── mock/
│   │   ├── server.ts     # Mock server (MSW ou handler manual)
│   │   └── data.ts       # Dados fake para testes
│   └── views/
│       ├── HomeView.vue           # Index com lista de exemplos
│       ├── BasicCrudView.vue      # CRUD simples (texto, numero, boolean)
│       ├── AdvancedCrudView.vue   # CRUD com FK, imagem, mascara, validacao
│       ├── CustomActionsView.vue  # Row actions customizadas
│       ├── FiltersCrudView.vue    # Filtros dinamicos + KPIs
│       ├── ExpandableCrudView.vue # Linhas expandiveis
│       ├── StandaloneFormView.vue # WCrudFormDialog standalone
│       ├── FormattersView.vue     # Demo dos useFormatters
│       └── FKFieldView.vue        # Demo do WAutoCompleteFK isolado
└── tsconfig.json
```

## Executar

```bash
# Na raiz do projeto
cd playground
yarn install
yarn dev
# Abre http://localhost:5174
```

## Como o Playground Importa a Lib

O `vite.config.ts` do playground usa alias para apontar diretamente ao source:

```typescript
// playground/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@wgalleti/primevue-components': resolve(__dirname, '../src'),
    },
  },
})
```

Isso permite desenvolver a lib e ver mudancas em tempo real sem rebuild.

## Mock API

O playground usa dados mockados para simular a API DRF. Duas abordagens possiveis:

### Opcao 1: Axios interceptor (simples)

```typescript
// playground/src/plugins/axios.ts
import axios from 'axios'
import { mockData } from '../mock/data'

const api = axios.create()

api.interceptors.request.use((config) => {
  // Intercepta e retorna dados fake
  const endpoint = config.url?.replace(/\/$/, '') ?? ''
  const mock = mockData[endpoint]
  if (mock) {
    return Promise.reject({
      __MOCK__: true,
      data: mock.handler(config),
    })
  }
  return config
})

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.__MOCK__) return { data: error.data }
    return Promise.reject(error)
  },
)

export default api
```

### Opcao 2: json-server (mais realista)

```bash
yarn add -D json-server
```

```json
// playground/db.json
{
  "produtos": [
    { "id": 1, "nome": "Notebook", "preco": 3500, "ativo": true },
    { "id": 2, "nome": "Mouse", "preco": 89.90, "ativo": true }
  ]
}
```

## Cenarios de Teste

Cada view do playground testa um cenario especifico:

| View | Testa |
|---|---|
| BasicCrudView | Campos text, number, currency, boolean, date. Paginacao e busca |
| AdvancedCrudView | FK, imagem, mascara, cpf_cnpj, validacao customizada, campos condicionais |
| CustomActionsView | Row actions customizadas, visibilidade condicional, handlers |
| FiltersCrudView | filterParams, KPIs, toolbar slots |
| ExpandableCrudView | Linhas expandiveis com conteudo customizado |
| StandaloneFormView | WCrudFormDialog usado fora do WCrudView |
| FormattersView | Todos os formatadores e validadores |
| FKFieldView | WAutoCompleteFK isolado com modal |

## Adicionar Novo Exemplo

1. Criar view em `playground/src/views/NovoExemploView.vue`
2. Adicionar rota em `playground/src/router.ts`
3. Adicionar link na sidebar do `App.vue`
4. Adicionar dados mock se necessario em `playground/src/mock/data.ts`
