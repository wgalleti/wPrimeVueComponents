# Migração — trocar código ad-hoc pelos componentes W*

Regra: cada trecho migrado deve **remover** código copiado (helpers de data, tabela manual, adaptadores de valor), não só adicionar.

## 1. DatePicker solto → WDatePicker

O padrão mais comum: `PrimeVue DatePicker` com adaptador string↔Date copiado em vários arquivos (`parseDate` / `formatValue` via `toISOString`). Isso tem **bug de timezone** (off-by-one em fuso negativo).

**Antes:**
```vue
<DatePicker
  :model-value="parseDate(form.data_emissao)"
  date-format="dd/mm/yy"
  show-button-bar
  @update:model-value="(d) => (form.data_emissao = formatValue(d))"
/>
```
```js
// helper copiado em ~N arquivos
const parseDate = (s) => (s ? new Date(`${s}T00:00:00`) : null)
const formatValue = (d) => (d ? d.toISOString().split('T')[0] : null) // ⚠️ UTC
```

**Depois:**
```vue
<WDatePicker v-model="form.data_emissao" />
```
- `v-model` já é `YYYY-MM-DD`. **Apague** `parseDate`/`formatValue` do arquivo.
- Datetime: `show-time`. Range (De/Até): `WDateRange`.

## 2. Tabela + dialog manual → useCrudManager + WCrudView

Telas que fazem `axios.get` + `<DataTable>` + dialog de form na mão viram configuração:

**Depois:**
```ts
const crud = useCrudManager({ endpoint: '/api/v1/notas/', columns, form })
```
```vue
<WCrudView :crud="crud" title="Notas Fiscais" />
```
Remova: fetch/paginação/busca manuais, estado de dialog, chamadas de create/update/delete, toasts e confirm — tudo passa a vir do composable.

## 3. Form dentro de Card/Dialog próprio → WFormRenderer

Mantém seu layout, troca os inputs manuais por `FieldDef[]` + `<WFormRenderer>`. Centralize o schema em `src/schemas/**` e reaproveite.

## 4. Validação de data/obrigatório

Não valide data na mão. Use `FieldDef.required` + `validate(v)`; o `WDatePicker`/`WFormRenderer` já tratam estado inválido e o `*` de obrigatório.

## Checklist por tela migrada

- [ ] Removidos os helpers de data copiados do arquivo.
- [ ] `v-model` das datas é string `YYYY-MM-DD` (ou `Date` só se a API exigir — raro).
- [ ] Fetch/CRUD manual substituído por `useCrudManager` quando for tabela+form.
- [ ] Schema de `FieldDef[]` centralizado, não inline duplicado.
- [ ] `yarn build` / `type-check` do app passam.
