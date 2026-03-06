# Migracao de Projetos Existentes

Guia para migrar WorkHard e DojoHub para usar `@wgalleti/primevue-components`.

## Mapeamento de Imports

### WorkHard

| Antes | Depois |
|---|---|
| `import { useCrud } from '@/composables/useCrud'` | `import { useCrudManager } from '@wgalleti/primevue-components'` |
| `import { useApi } from '@/composables/useApi'` | `import { useApi } from '@wgalleti/primevue-components'` |
| `import { useFormatters } from '@/composables/useFormatters'` | `import { useFormatters } from '@wgalleti/primevue-components'` |
| `import { useAppToast } from '@/composables/useAppToast'` | `import { useAppToast } from '@wgalleti/primevue-components'` |
| `import { useApiError } from '@/composables/useApiError'` | `import { useApiError } from '@wgalleti/primevue-components'` |
| `import CrudView from '@/components/ui/CrudView.vue'` | `import { WCrudView } from '@wgalleti/primevue-components'` |
| `import CrudFormDialog from '@/components/ui/CrudFormDialog.vue'` | `import { WCrudFormDialog } from '@wgalleti/primevue-components'` |
| `import AutoCompleteFK from '@/components/ui/AutoCompleteFK.vue'` | `import { WAutoCompleteFK } from '@wgalleti/primevue-components'` |
| `import type { CrudColumn } from '@/types/shared/crud'` | `import type { ColumnDef } from '@wgalleti/primevue-components'` |
| `import type { CrudFormField } from '@/types/shared/crud'` | `import type { FieldDef } from '@wgalleti/primevue-components'` |

### DojoHub

| Antes | Depois |
|---|---|
| `import { useCrudManager } from '@/composables/useCrudManager'` | `import { useCrudManager } from '@wgalleti/primevue-components'` |
| `import DojoCrudView from '@/components/DojoCrudView.vue'` | `import { WCrudView } from '@wgalleti/primevue-components'` |
| `import DojoCrudFormDialog from '@/components/DojoCrudFormDialog.vue'` | `import { WCrudFormDialog } from '@wgalleti/primevue-components'` |
| `import AutoCompleteFK from '@/components/AutoCompleteFK.vue'` | `import { WAutoCompleteFK } from '@wgalleti/primevue-components'` |
| `import DojoImageCropper from '@/components/DojoImageCropper.vue'` | `import { WImageCropper } from '@wgalleti/primevue-components'` |

## Mudancas de API

### Renomeacao de Tipos

| WorkHard | DojoHub | Biblioteca |
|---|---|---|
| `CrudColumn` | `ColumnDef` | `ColumnDef` |
| `CrudFormField` | `FieldDef` | `FieldDef` |
| `CrudRowAction` | `RowAction` | `RowAction` |
| `CrudConfig` | `CrudManagerConfig` | `CrudManagerConfig` |
| `CrudReturn` | `CrudManager` | `CrudManagerReturn` |

### Composable Principal

**WorkHard** usa `useCrud()` — renomear para `useCrudManager()`:

```typescript
// Antes (WorkHard)
const crud = useCrud<Produto>({ endpoint: '...', columns, form })

// Depois
const crud = useCrudManager<Produto>({ endpoint: '...', columns, form })
```

**DojoHub** ja usa `useCrudManager()` — sem mudanca.

### Componentes no Template

```vue
<!-- Antes (WorkHard) -->
<CrudView :crud="crud" title="Produtos" />

<!-- Antes (DojoHub) -->
<DojoCrudView :crud="crud" title="Produtos" />

<!-- Depois -->
<WCrudView :crud="crud" title="Produtos" />
```

### Setup do Plugin

Ambos os projetos precisam adicionar o plugin no `main.ts`:

```typescript
import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import api from './plugins/axios'

app.use(WPrimeVuePlugin, { axios: api })
```

E remover a instancia axios dos composables locais (a lib usa a injetada).

## Passos de Migracao

### 1. Instalar a lib

```bash
yarn add @wgalleti/primevue-components@git+https://github.com/wgalleti/wPrimeVueComponents.git
```

### 2. Registrar o plugin

Adicionar `WPrimeVuePlugin` no `main.ts` (veja [Plugin](./plugin.md)).

### 3. Atualizar imports view por view

Migrar uma view de cada vez:
1. Trocar imports dos composables e componentes
2. Renomear tipos se necessario
3. Trocar nomes dos componentes no template
4. Testar a view

### 4. Remover codigo local

Apos migrar todas as views, remover:
- `src/composables/useCrud.ts` (ou `useCrudManager.ts`)
- `src/composables/useApi.ts`
- `src/composables/useFormatters.ts`
- `src/composables/useAppToast.ts`
- `src/composables/useApiError.ts`
- `src/components/ui/CrudView.vue` (ou `DojoCrudView.vue`)
- `src/components/ui/CrudFormDialog.vue` (ou `DojoCrudFormDialog.vue`)
- `src/components/ui/CrudColumnRenderer.vue`
- `src/components/ui/AutoCompleteFK.vue`
- `src/types/shared/crud.ts` (ou `src/types/crud.ts`)

### 5. Verificar

```bash
yarn type-check
yarn build
# Testar manualmente as views migradas
```

## Notas

- A migracao pode ser **incremental** — views nao migradas continuam usando o codigo local
- Nenhuma mudanca de backend e necessaria — a API de paginacao e a mesma
- Se um projeto tem customizacoes especificas nao suportadas pela lib, use os slots para manter o comportamento
