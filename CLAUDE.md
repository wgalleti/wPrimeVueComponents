# wPrimeVueComponents — Project Instructions

## Overview

Biblioteca de componentes Vue 3 baseada em PrimeVue 4 para padronizar componentes reutilizáveis em projetos internos. O escopo inclui CRUD management, componentes de UI, composables utilitários e mais — tudo o que for recorrente entre projetos. Distribuída como pacote npm privado com build via Vite library mode.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3.4+ (Composition API, `<script setup>`) |
| UI Base | PrimeVue 4.x (unstyled mode + Tailwind passthrough) |
| Styling | Tailwind CSS 4.x + tailwindcss-primeui |
| Language | TypeScript 5.7+ (strict mode) |
| Build | Vite 6.x (library mode) |
| HTTP | Axios 1.x (injetado via plugin, NÃO bundleado) |
| Dates | dayjs 1.x |
| Masks | maska 3.x |
| Package Manager | yarn |

## Architecture

```
src/
├── index.ts              # Re-export público (composables + components + types)
├── plugin.ts             # Vue plugin install()
├── types/                # Interfaces TypeScript exportadas
│   ├── index.ts
│   ├── crud.ts           # ColumnDef, FieldDef, RowAction, CrudManagerConfig
│   └── api.ts            # ApiResponse, PaginatedResponse
├── composables/          # Hooks reutilizáveis
│   ├── index.ts
│   ├── useCrudManager.ts # Composable principal de CRUD
│   ├── useApi.ts         # Fetch paginado low-level
│   ├── useAppToast.ts    # Wrapper PrimeVue Toast
│   ├── useAppConfirm.ts  # Wrapper PrimeVue ConfirmDialog
│   ├── useApiError.ts    # Extração de erros DRF
│   ├── useFormatters.ts  # Formatters BR (moeda, data, CPF, CNPJ, tel)
│   └── usePagination.ts  # Helper de paginação
├── components/           # Componentes Vue (prefixo W)
│   ├── index.ts
│   ├── crud/             # Componentes de CRUD
│   │   ├── WCrudView.vue
│   │   ├── WCrudFormDialog.vue
│   │   └── WCrudColumnRenderer.vue
│   ├── form/             # Componentes de formulário standalone
│   │   ├── WAutoCompleteFK.vue
│   │   └── WImageCropper.vue
│   └── ui/               # Componentes de UI genéricos (futuros)
└── utils/                # Funções utilitárias internas
    ├── dates.ts
    └── masks.ts
```

A pasta `components/` é organizada por domínio. Novos componentes que não sejam CRUD vão em `form/`, `ui/`, ou novas pastas conforme a necessidade.

## Conventions

### Naming
- Componentes: prefixo `W` + PascalCase (`WCrudView`, `WAutoCompleteFK`)
- Composables: `useXxx` (`useCrudManager`, `useAppToast`)
- Types: PascalCase sem prefixo (`ColumnDef`, `FieldDef`, `CrudManagerConfig`)
- Utils: camelCase, funções puras

### Code Style
- Sempre `<script setup lang="ts">` em componentes
- Generics em composables: `useCrudManager<T>(config)`
- Props com `defineProps<{}>()` tipado (sem runtime validation)
- Emits com `defineEmits<{}>()` tipado
- `ref()` para valores simples, `reactive()` para objetos complexos
- `computed()` para derivados, nunca getters manuais
- Sem `any` — usar `unknown` + type narrowing quando necessário
- Exports nomeados em todos os `index.ts` para tree-shaking

### Component Design
- Todos os componentes devem ter slots para override de qualquer seção visual
- Props devem ter defaults sensatos — funcionar com configuração mínima
- Eventos tipados via `defineEmits`
- Sem estado global nos componentes — estado vem do composable via props

### API Contract
- Axios é injetado via plugin, nunca importado diretamente
- Composables acessam axios via `inject('w-axios')`
- Resposta paginada esperada: `{ data: T[], page: number, page_size: number, rows: number }`
- Erros no formato DRF: `{ detail: string }`, `{ field: [errors] }`, ou string

### Build & Distribution
- Vite library mode: ESM output + declaration files
- Peer dependencies: vue, primevue, axios, dayjs (NÃO bundlear)
- Dependencies bundleadas: maska
- package.json exports: `"."`, `"./components"`, `"./composables"`, `"./types"`

## Development

```bash
# Instalar dependências
yarn install

# Dev (playground)
yarn dev

# Build da lib
yarn build

# Type check
yarn type-check
```

## Do NOT
- Criar instância axios interna — sempre usar a injetada
- Usar PrimeVue `useStyle()` — styling é responsabilidade do projeto consumidor
- Importar Tailwind classes hardcoded — usar PrimeVue passthrough tokens
- Usar `__all__` ou wildcard exports
- Adicionar dependências pesadas sem discutir antes
- Quebrar a API pública sem bump de major version
