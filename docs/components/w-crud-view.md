# WCrudView

Componente principal que renderiza header, KPIs, DataTable com paginacao/ordenacao server-side e dialog de formulario.

## Uso Basico

```vue
<script setup lang="ts">
import { useCrudManager, WCrudView } from '@wgalleti/primevue-components'

const crud = useCrudManager({
  endpoint: '/api/produtos/',
  columns: [
    { field: 'nome', header: 'Nome', sortable: true },
    { field: 'preco', header: 'Preco', type: 'currency' },
  ],
  form: [
    { field: 'nome', label: 'Nome', required: true },
    { field: 'preco', label: 'Preco', type: 'currency' },
  ],
})
</script>

<template>
  <WCrudView :crud="crud" title="Produtos" subtitle="Gerenciar produtos" />
</template>
```

## Props

| Prop | Tipo | Padrao | Descricao |
|------|------|--------|-----------|
| `crud` | `CrudManagerReturn` | **obrigatorio** | Retorno do `useCrudManager` |
| `title` | `string` | **obrigatorio** | Titulo do CRUD |
| `subtitle` | `string` | — | Subtitulo exibido abaixo do titulo |
| `showSearch` | `boolean` | `true` | Exibe campo de busca no toolbar |
| `showHeader` | `boolean` | `true` | Exibe header com titulo e botao "Novo" |
| `dialogWidth` | `string` | `'480px'` | Largura do dialog de formulario |
| `autoInit` | `boolean` | `true` | Chama `crud.init()` automaticamente no mount |
| `showKpi` | `boolean` | `false` | Exibe KPI de total de registros |
| `kpiIcon` | `string` | `'pi pi-list'` | Icone do KPI padrao |
| `kpiLabel` | `string` | `'Total de Registros'` | Label do KPI padrao |
| `extraKpis` | `KpiItem[]` | `[]` | KPIs adicionais |
| `expandable` | `boolean` | `false` | Habilita linhas expandiveis |

## Eventos

| Evento | Payload | Descricao |
|--------|---------|-----------|
| `row-expand` | `data: unknown` | Quando uma linha e expandida |
| `row-collapse` | `data: unknown` | Quando uma linha e colapsada |

## Slots

### `header-actions`

Acoes extras no header, ao lado do botao "Novo":

```vue
<WCrudView :crud="crud" title="Produtos">
  <template #header-actions>
    <Button label="Exportar" icon="pi pi-download" severity="secondary" />
  </template>
</WCrudView>
```

### `before-table`

Conteudo entre o header e a tabela (substitui os KPIs):

```vue
<template #before-table>
  <div class="my-custom-stats">...</div>
</template>
```

### `toolbar-start`

Conteudo no inicio do toolbar (apos a busca):

```vue
<template #toolbar-start>
  <Select v-model="filtroCategoria" :options="categorias" placeholder="Categoria" />
</template>
```

### `toolbar-filters`

Alias para filtros no toolbar.

### `toolbar-actions`

Acoes no final do toolbar:

```vue
<template #toolbar-actions>
  <Button icon="pi pi-refresh" text @click="crud.refresh()" />
</template>
```

### `empty`

Estado vazio customizado:

```vue
<template #empty>
  <div class="text-center p-8">
    <p>Nenhum produto cadastrado</p>
  </div>
</template>
```

### `column-{field}`

Renderizacao customizada de uma coluna:

```vue
<template #column-nome="{ data, value }">
  <strong>{{ value }}</strong>
  <small class="block text-muted">{{ data.codigo }}</small>
</template>
```

### `row-actions`

Acoes customizadas por linha:

```vue
<template #row-actions="{ data, crud }">
  <Button icon="pi pi-eye" text rounded @click="viewDetail(data)" />
  <Button icon="pi pi-pencil" text rounded @click="crud.openEditDialog(data)" />
</template>
```

### `expansion`

Conteudo da linha expandida:

```vue
<WCrudView :crud="crud" title="Pedidos" expandable>
  <template #expansion="{ data }">
    <DataTable :value="data.itens" size="small">
      <Column field="produto" header="Produto" />
      <Column field="quantidade" header="Qtd" />
    </DataTable>
  </template>
</WCrudView>
```

### `form-dialog`

Substitui completamente o dialog de formulario:

```vue
<template #form-dialog="{ crud, dialogWidth }">
  <MyCustomDialog :crud="crud" :width="dialogWidth" />
</template>
```

### `field-{field}`

Renderizacao customizada de um campo do formulario:

```vue
<template #field-descricao="{ field, formData, setFormField }">
  <div class="w-crud-form-col-full">
    <label class="w-crud-form-label">{{ field.label }}</label>
    <MyRichEditor
      :model-value="formData.descricao"
      @update:model-value="(v) => setFormField('descricao', v)"
    />
  </div>
</template>
```

## KPIs

```vue
<WCrudView
  :crud="crud"
  title="Produtos"
  show-kpi
  :extra-kpis="[
    { icon: 'pi pi-check', label: 'Ativos', value: '42', color: '#22c55e' },
    { icon: 'pi pi-ban', label: 'Inativos', value: '8', color: '#ef4444' },
  ]"
/>
```

## Row Actions Customizadas

Por padrao, o componente gera botoes de editar e excluir. Para customizar:

```ts
const crud = useCrudManager({
  endpoint: '/api/pedidos/',
  columns: [...],
  form: [...],
  rowActions: [
    {
      action: 'view',
      icon: 'pi pi-eye',
      tooltip: 'Visualizar',
      handler: (data) => router.push(`/pedidos/${data.id}`),
    },
    {
      action: 'edit',
      icon: 'pi pi-pencil',
      tooltip: 'Editar',
    },
    {
      action: 'delete',
      icon: 'pi pi-trash',
      tooltip: 'Excluir',
      severity: 'danger',
      visible: (data) => data.status !== 'finalizado',
    },
  ],
})
```
