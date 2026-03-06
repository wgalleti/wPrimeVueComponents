# WCrudView

Componente container que monta a interface CRUD completa: header, busca, tabela paginada, acoes de linha e dialog de formulario.

## Import

```vue
<script setup>
import { WCrudView } from '@wgalleti/primevue-components'
</script>
```

## Uso Basico

```vue
<template>
  <WCrudView :crud="crud" title="Produtos" />
</template>
```

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `crud` | `CrudManagerReturn<T>` | **obrigatorio** | Retorno do `useCrudManager()` |
| `title` | `string` | **obrigatorio** | Titulo da pagina |
| `subtitle` | `string` | `undefined` | Subtitulo |
| `showSearch` | `boolean` | `true` | Exibir campo de busca |
| `showHeader` | `boolean` | `true` | Exibir header com titulo e botao novo |
| `dialogWidth` | `string` | `'480px'` | Largura do dialog de formulario |
| `autoInit` | `boolean` | `true` | Chamar `crud.init()` automaticamente no mount |
| `showKpi` | `boolean` | `false` | Exibir barra de KPIs |
| `kpiIcon` | `string` | `'pi pi-list'` | Icone do KPI principal |
| `kpiLabel` | `string` | `'Total de Registros'` | Label do KPI principal |
| `extraKpis` | `KpiItem[]` | `[]` | KPIs adicionais |
| `expandable` | `boolean` | `false` | Habilitar linhas expandiveis |

## Slots

### Header e Toolbar

| Slot | Descricao |
|---|---|
| `header-actions` | Botoes extras ao lado do "Novo" |
| `toolbar-start` | Inicio da barra de ferramentas (antes da busca) |
| `toolbar-filters` | Filtros customizados na barra |
| `toolbar-actions` | Acoes extras na barra |

### Tabela

| Slot | Descricao | Scope |
|---|---|---|
| `before-table` | Conteudo acima da tabela (KPIs, filtros) | — |
| `column-{field}` | Renderizacao customizada de uma coluna | `{ data, value }` |
| `row-actions` | Acoes extras nas linhas | `{ data }` |
| `expansion` | Conteudo da linha expandida | `{ data }` |
| `empty` | Mensagem quando nao ha registros | — |

### Formulario

| Slot | Descricao | Scope |
|---|---|---|
| `form-header` | Conteudo acima do formulario | `{ isEditing }` |
| `form-footer` | Conteudo abaixo do formulario (acima dos botoes) | `{ isEditing }` |
| `field-{field}` | Override completo de um campo do form | `{ formData, isEditing, setFormField }` |
| `form-dialog` | Override completo do dialog | `{ dialogWidth }` |

## Exemplos

### Com slots de coluna customizada

```vue
<WCrudView :crud="crud" title="Usuarios">
  <template #column-avatar="{ data }">
    <img :src="data.avatar" class="w-8 h-8 rounded-full" />
  </template>

  <template #column-status="{ data }">
    <Tag :value="data.status" :severity="statusSeverity(data.status)" />
  </template>
</WCrudView>
```

### Com filtros na toolbar

```vue
<WCrudView :crud="crud" title="Pedidos">
  <template #toolbar-filters>
    <Select
      v-model="statusFilter"
      :options="statusOptions"
      placeholder="Status"
      class="w-48"
    />
    <DatePicker
      v-model="dateFilter"
      placeholder="Data"
      date-format="dd/mm/yy"
    />
  </template>
</WCrudView>
```

### Com acoes extras no header

```vue
<WCrudView :crud="crud" title="Relatorios">
  <template #header-actions>
    <Button
      label="Exportar"
      icon="pi pi-download"
      severity="secondary"
      @click="exportar"
    />
  </template>
</WCrudView>
```

### Com linhas expandiveis

```vue
<WCrudView :crud="crud" title="Pedidos" expandable>
  <template #expansion="{ data }">
    <div class="p-4">
      <h4>Itens do Pedido #{{ data.id }}</h4>
      <DataTable :value="data.itens" size="small">
        <Column field="produto" header="Produto" />
        <Column field="quantidade" header="Qtd" />
        <Column field="preco" header="Preco" />
      </DataTable>
    </div>
  </template>
</WCrudView>
```

### Com KPIs

```vue
<WCrudView
  :crud="crud"
  title="Financeiro"
  show-kpi
  kpi-icon="pi pi-dollar"
  kpi-label="Total de Lancamentos"
  :extra-kpis="[
    { icon: 'pi pi-arrow-up', label: 'Receitas', value: totalReceitas, color: 'green' },
    { icon: 'pi pi-arrow-down', label: 'Despesas', value: totalDespesas, color: 'red' },
  ]"
/>
```

### Com campo de formulario customizado

```vue
<WCrudView :crud="crud" title="Eventos" dialog-width="640px">
  <template #field-endereco="{ formData, setFormField }">
    <div class="col-span-2">
      <label>Endereco</label>
      <AddressAutocomplete
        :model-value="formData.endereco"
        @update:model-value="(v) => setFormField('endereco', v)"
      />
    </div>
  </template>
</WCrudView>
```

### Sem auto-init (controle manual)

```vue
<script setup>
const crud = useCrudManager({ ... })

// Carrega dados apenas quando filtro estiver pronto
watch(tenantId, async (id) => {
  if (id) await crud.init()
})
</script>

<template>
  <WCrudView :crud="crud" title="Dados" :auto-init="false" />
</template>
```
