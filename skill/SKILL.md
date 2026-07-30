---
name: wpvc
description: "Use when working in an app that consumes @wgalleti/primevue-components (Vue 3 + PrimeVue 4) — first-time setup, building CRUD screens/forms with useCrudManager + FieldDef, using the W* components (WCrudView, WFormRenderer, WDatePicker, WAutoCompleteFK, WMoneyInput...), or migrating ad-hoc date/form/table code to the library. Trigger on tasks like 'add a CRUD', 'novo cadastro', 'formulário', 'campo de data', 'substituir DatePicker'."
---

# wPrimeVueComponents (wpvc)

Biblioteca interna de componentes **Vue 3 + PrimeVue 4** para CRUD, formulários e UI padronizada em pt-BR. O objetivo é escrever telas por **configuração** (`ColumnDef`/`FieldDef`), não por composição manual de inputs.

## Quando usar esta skill

- Setup inicial da lib num app novo (plugin, dataProvider, CSS).
- Criar uma tela de CRUD, um formulário, ou um campo específico (data, FK, moeda).
- Migrar código ad-hoc (DatePicker solto, tabela manual, helpers copiados) para os componentes W*.

## Regra de ouro

1. **Não componha inputs à mão.** Descreva a tela com `useCrudManager({ endpoint, columns, form })` + `<WCrudView>`, ou `FieldDef[]` + `<WFormRenderer>`.
2. **axios/dataProvider vêm do plugin** (injetados). Nunca crie instância axios dentro da tela nem importe axios direto.
3. **Endpoints são strings**; a resposta paginada esperada é `{ data, page, page_size, rows }`.
4. **Datas**: use `WDatePicker` (v-model string `YYYY-MM-DD`). Nunca `parseDate`/`toISOString` à mão.
5. Antes de inventar prop, confirme a API nos tipos publicados: `node_modules/@wgalleti/primevue-components/dist/*.d.ts` (`FieldDef`, `ColumnDef`, `CrudManagerConfig`, props dos componentes).

## Fluxo rápido

**Setup** (uma vez por projeto) → `references/setup.md`. Ou rode `npx @wgalleti/primevue-components init`.

**CRUD completo** (tabela + form + toast + confirm):

```vue
<script setup lang="ts">
import { useCrudManager, WCrudView } from '@wgalleti/primevue-components'
import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'

const columns: ColumnDef[] = [
  { field: 'nome', header: 'Nome' },
  { field: 'preco', header: 'Preço', type: 'currency' },
  { field: 'data', header: 'Data', type: 'date' },
]
const form: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true },
  { field: 'preco', label: 'Preço', type: 'currency', colSpan: 0.5 },
  { field: 'data', label: 'Data', type: 'date', autonow: true, colSpan: 0.5 },
]
const crud = useCrudManager({ endpoint: '/api/v1/produtos/', columns, form })
</script>

<template>
  <WCrudView :crud="crud" title="Produtos" />
</template>
```

Detalhes de `useCrudManager`, `ColumnDef`, `FieldDef` (todos os tipos e props): `references/crud.md`.

**Formulário standalone** (sem dialog, dentro de Card/Dialog seu): `WFormRenderer` com `FieldDef[]` — ver `references/crud.md`.

**Campos específicos e componentes W*** (WDatePicker, WAutoCompleteFK, WMoneyInput, WTransferList, UI): `references/components.md`.

**Migrar código existente** (DatePicker→WDatePicker, tabela manual→WCrudView, apagar helpers copiados): `references/migration.md`.

## Gotchas (leia antes de debugar)

- Registre o `WPrimeVuePlugin` **depois** de `PrimeVue`, `ToastService` e `ConfirmationService` — os componentes usam Toast/Confirm.
- O `axios` passado ao plugin deve já ter `baseURL` e auth configurados.
- Importe o CSS **uma vez**: `import '@wgalleti/primevue-components/style.css'`.
- "No PrimeVue Toast provided" / inject quebrado em **monorepo com a lib aliased pra source**: adicione `resolve.dedupe: ['vue', 'primevue']` no `vite.config`. (Instalação normal via npm não precisa.)
- Resposta da API precisa ser `{ data, page, page_size, rows }`. Erros no formato DRF (`{ detail }`, `{ campo: [erros] }`).
