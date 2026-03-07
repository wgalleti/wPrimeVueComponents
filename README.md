# @wgalleti/primevue-components

Biblioteca de componentes Vue 3 + PrimeVue 4 para padronizar componentes reutilizáveis entre projetos. Inclui CRUD management, componentes de formulário, composables utilitários e mais.

## Instalação

```bash
# Via git (recomendado para projetos internos)
yarn add git+https://github.com/wgalleti/wPrimeVueComponents.git

# Ou npm link para desenvolvimento local
cd wPrimeVueComponents && yarn link
cd seu-projeto && yarn link @wgalleti/primevue-components
```

### Peer Dependencies

Certifique-se de ter instalado no seu projeto:

```bash
yarn add vue@^3.4 primevue@^4.0 axios@^1.0 dayjs@^1.11
```

## Setup

```typescript
// main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import api from './plugins/axios' // sua instância axios configurada

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)

app.use(WPrimeVuePlugin, {
  axios: api,              // obrigatório: instância axios do projeto
  defaultPageSize: 20,     // opcional (default: 20)
  dateFormat: 'DD/MM/YYYY', // opcional (default: 'DD/MM/YYYY')
  locale: 'pt-BR',         // opcional (default: 'pt-BR')
})
```

## Uso Rápido

### CRUD Completo em ~30 linhas

```vue
<script setup lang="ts">
import { useCrudManager, WCrudView } from '@wgalleti/primevue-components'
import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'

interface Produto {
  id: number
  nome: string
  preco: number
  ativo: boolean
}

const columns: ColumnDef[] = [
  { field: 'nome', header: 'Nome' },
  { field: 'preco', header: 'Preço', type: 'currency' },
  { field: 'ativo', header: 'Status', type: 'boolean' },
]

const form: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true },
  { field: 'preco', label: 'Preço', type: 'currency' },
  { field: 'ativo', label: 'Ativo', type: 'switch', defaultValue: true },
]

const crud = useCrudManager<Produto>({
  endpoint: '/api/v1/produtos/',
  columns,
  form,
})
</script>

<template>
  <WCrudView :crud="crud" title="Produtos" />
</template>
```

Isso gera automaticamente:
- Tabela paginada com busca
- Botão "Novo" que abre dialog de criação
- Botões de editar/excluir em cada linha
- Dialog de formulário com validação
- Toast de sucesso/erro
- Confirmação antes de excluir

## WFormRenderer — Formularios Standalone (v0.2.0+)

O `WFormRenderer` renderiza formularios a partir de `FieldDef[]` sem dialog, ideal para views complexas com Cards e Dialogs customizados.

```vue
<script setup lang="ts">
import { WFormRenderer } from '@wgalleti/primevue-components'
import { compraHeaderForm } from '@/schemas/estoque/compra'

const form = reactive({ data: new Date(), fornecedor: null, numero_nf: '', observacoes: '' })
</script>

<template>
  <Card>
    <template #content>
      <WFormRenderer
        :fields="compraHeaderForm"
        :form-data="form"
        :is-editing="false"
        @update:field="(f, v) => { (form as Record<string, unknown>)[f] = v }"
      />
    </template>
  </Card>
</template>
```

### Schemas Centralizados

A pratica recomendada e centralizar definicoes em arquivos de schema para reutilizacao em 3 contextos:

1. **`useCrudManager` / `WCrudView`** — tabela + dialog CRUD
2. **`WFormRenderer`** — formularios em Cards e Dialogs de views complexas
3. **`WAutoCompleteFK`** — CRUD inline no modal de busca FK (via `crudFields`/`crudColumns`)

```typescript
// src/schemas/core/produto.ts — dados puros, sem Vue
import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'

export const produtoColumns: ColumnDef[] = [
  { field: 'nome', header: 'Nome' },
  { field: 'preco_medio', header: 'Preco', type: 'currency' },
]

export const produtoForm: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true },
  { field: 'preco_medio', label: 'Preco', type: 'currency' },
]
```

Veja [WFormRenderer](./docs/components/w-form-renderer.md) para exemplos completos e convencoes.

## Documentacao Completa

- [Guia de Instalacao](./docs/installation.md)
- [Plugin e Configuracao](./docs/plugin.md)
- [useCrudManager](./docs/composables/use-crud-manager.md)
- [useApi](./docs/composables/use-api.md)
- [useFormatters](./docs/composables/use-formatters.md)
- [useAppToast](./docs/composables/use-app-toast.md)
- [useAppConfirm](./docs/composables/use-app-confirm.md)
- [useApiError](./docs/composables/use-api-error.md)
- [WCrudView](./docs/components/w-crud-view.md)
- [WCrudFormDialog](./docs/components/w-crud-form-dialog.md)
- [WFormRenderer](./docs/components/w-form-renderer.md) **(v0.2.0+)**
- [WCrudColumnRenderer](./docs/components/w-crud-column-renderer.md)
- [WAutoCompleteFK](./docs/components/w-auto-complete-fk.md)
- [WImageCropper](./docs/components/w-image-cropper.md)
- [Tipos](./docs/types.md)
- [Migracao de Projetos](./docs/migration.md)

## Licença

Uso interno — wGalleti.
