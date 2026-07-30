# CRUD e Formulários — useCrudManager, WCrudView, WFormRenderer

Fonte da verdade dos tipos: `CrudManagerConfig`, `ColumnDef`, `FieldDef` (em `@wgalleti/primevue-components` — os `.d.ts` estão em `node_modules`). Consulte antes de inventar prop.

## useCrudManager + WCrudView

`useCrudManager(config)` centraliza **todas** as interações de dados (lista, paginação, busca, ordenação, create/update/delete, toasts, confirm). Retorna um objeto `crud` que você passa para `<WCrudView :crud="crud">`.

```ts
const crud = useCrudManager<Produto>({
  endpoint: '/api/v1/produtos/',   // string; usa o dataProvider injetado
  columns,                          // ColumnDef[] — a tabela
  form,                             // FieldDef[] — o formulário do dialog
  pageSize: 10,                     // opcional
  // --- opt-in de config (todos aditivos) ---
  keyboardNav: true,                // foco no 1º campo + Enter pula p/ próximo (estilo desktop)
  editMode: 'cell',                 // edição inline por célula (default: 'dialog')
  selectionMode: 'multiple',        // seleção múltipla → habilita bulkActions
  // outros: pk, formColumns, searchDebounce, partialUpdate, refetchOnSave,
  //   canCreate/canEdit/canDelete, rowActions, bulkActions, filterParams,
  //   transformPayload, createDefaults, onAfterSave, onAfterDelete, labels.
  //   Confirme no tipo CrudManagerConfig.
})
```

Retornos úteis do `crud` (além de alimentar o WCrudView): `selectedItems`, `clearSelection`, `columnFilters`, `setColumnFilter`, `clearColumnFilters`, `updateField`, `refresh`, `fetchAll`. Confirme no tipo `CrudManagerReturn`.

`<WCrudView>` aceita `title`, `subtitle`, `dialog-width`, e **slots** para sobrescrever qualquer seção (toolbar, ações de linha, etc.).

## ColumnDef (tabela)

```ts
{ field: 'preco', header: 'Preço', type: 'currency', align: 'right', sortable: true, style: 'width: 8rem' }
```

`type`: `text | boolean | date | datetime | number | currency | image | custom`. Sem `type` → texto cru. Para célula custom, use `type: 'custom'` + slot, ou `WCrudColumnRenderer`.

Outros campos: `format(value, row) => string` (render próprio), `visible`, `decimals`, `tagValue`/`tagSeverity` (renderiza como tag), e **`filter`** — filtro declarativo por coluna que aparece na barra de filtros e vai como parâmetro no `list`:

```ts
{ field: 'status', header: 'Status', filter: { type: 'select', options: [
  { label: 'Ativo', value: 'A' }, { label: 'Inativo', value: 'I' },
] } }
```
`filter.type`: `text | select | boolean | numeric`. Sem `param`, usa o `field`.

## FieldDef (formulário)

```ts
{
  field: 'categoria', label: 'Categoria', type: 'fk',
  endpoint: '/api/v1/categorias/', optionLabel: 'nome',
  required: true, colSpan: 0.5,
}
```

Campos comuns: `field`, `label`, `type`, `required`, `colSpan` (`'full'` | `0.5` | inteiro), `defaultValue`, `disabled` (bool | fn), `visible` (bool | fn), `placeholder`, `validate(v) => string|null`, `autofocus`.

`type` (FieldType): `text · email · password · number · currency · date · datetime · select · autocomplete · fk · switch · textarea · color · cpf_cnpj · mask · image · cep · transfer`.

Props por tipo:
- **select/autocomplete/transfer**: `options` (array ou `Ref`), `optionLabel`, `optionValue`, `showClear`, `searchFields`.
- **fk**: `endpoint`, `endpointParams`, `dependsOn` (cascata/drill-down), `blockedPlaceholder`, `crudFields`/`crudColumns` (CRUD dentro do modal).
- **number/currency**: `min`, `max`, `minFractionDigits`, `maxFractionDigits`, `prefix`, `suffix`, `fillFromRight` (moeda estilo POS), `decimals`.
- **date/datetime**: `autonow` (preenche hoje no mount se null), `minDate`, `maxDate`, `dateFormat`, `hourFormat`.
- **mask**: `mask`. **textarea**: `rows`. **cep**: `cepFields` (auto-preenche endereço via ViaCEP).
- **fieldGroup**: `{ id, title, description?, order?, columns? }` agrupa campos numa seção titulada.

## WFormRenderer (form standalone, sem dialog)

Para telas complexas (Cards, dialogs próprios) use `WFormRenderer` diretamente:

```vue
<WFormRenderer
  :fields="meusCampos"
  :form-data="form"
  :is-editing="false"
  :columns="2"
  @update:field="(f, v) => (form[f] = v)"
/>
```

Schemas de `FieldDef[]` devem ser **centralizados** em arquivos (ex.: `src/schemas/**`), reaproveitados entre o WCrudView e o WFormRenderer.
