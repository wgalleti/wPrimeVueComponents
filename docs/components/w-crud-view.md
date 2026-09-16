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

## API

<ApiTable name="WCrudView" />

## Selecao de linha (`v-model:selectedRow`)

A linha selecionada (a mesma que guia o action rail e o menu de contexto) pode ser
sincronizada com o consumidor via `v-model:selectedRow` — util para espelhar a
selecao em outra visao do mesmo dado (mapa, grafico, painel). Sem o binding, nada
muda: a selecao continua interna.

O componente tambem expoe `scrollToRow(pk)` (via template ref) para o sentido
inverso: selecionou fora (ex.: clique num poligono do mapa), a tabela rola ate a
linha. So alcanca a **pagina atual** — linha em outra pagina nao e buscada; e do
consumidor decidir o que fazer nesse caso.

```vue
<script setup lang="ts">
const crudView = ref()
const linhaSelecionada = ref(null)

function aoSelecionarNoMapa(id) {
  const linha = crud.items.value.find((t) => t.id === id) ?? null
  linhaSelecionada.value = linha
  if (linha) crudView.value?.scrollToRow(id)
}
</script>

<template>
  <WCrudView ref="crudView" :crud="crud" title="Talhoes" v-model:selected-row="linhaSelecionada" />
</template>
```

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

Conteúdo no início do toolbar, logo após a busca e **antes** dos filtros de coluna (ex.: um
seletor de contexto que não é filtro).

### `toolbar-filters`

Filtros que o `ColumnDef.filter` não cobre — FK com busca no servidor, alternador de
"sem corretor", período. Renderiza na toolbar do grid, **depois** dos filtros declarativos e
antes do "Limpar filtros". É o único lugar de um filtro; ver [Filtros](#filtros).

```vue
<template #toolbar-filters>
  <WAutoCompleteFK
    :model-value="crud.columnFilters.categoria ?? null"
    v-bind="categoriaFk"
    placeholder="Categoria"
    @update:model-value="(v) => crud.setColumnFilter('categoria', v?.id ?? undefined)"
  />
</template>
```

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

## Tabela e cards

A visão alterna entre `table` (linha) e `cards` pelo botão da toolbar; `defaultView` decide a
inicial e `persistState` guarda a escolha do usuário em `localStorage`. `cardFields` (default
`4`) diz quantas colunas visíveis entram no card — a **primeira é o título**, as demais viram
`rótulo: valor`. Se o schema começa com um id técnico, reordene o `ColumnDef[]`.

**Abaixo de 840px a visão é forçada em `cards`** e o alternador some: nessa largura a tabela
não se lê, e não há escolha a oferecer. A preferência guardada **não** é sobrescrita — ela
volta intacta quando a janela cresce. O corte é o `isRetrato` do
[`useBreakpoint`](/composables/use-breakpoint).

Para desenhar o card inteiro, use o slot `card` (com `cardBare` para remover o chrome padrão).

## Filtros

**Todo filtro mora na toolbar do grid, ao lado da busca** — nunca numa faixa própria acima da
tabela, num painel lateral ou no cabeçalho da página. A ordem na toolbar é fixa: busca →
`toolbar-start` → filtros declarativos (`ColumnDef.filter`) → `toolbar-filters` → "Limpar
filtros" (aparece quando há algum filtro ativo). Na visão em cards a toolbar é a mesma.

O caminho padrão é o **declarativo**, no schema da coluna:

```ts
{ field: 'status', header: 'Situação', filter: { type: 'select', options: STATUS_OPCOES } },
{ field: 'ativo',  header: 'Ativo',    filter: { type: 'boolean' } },
{ field: 'nome',   header: 'Nome',     filter: { type: 'text', param: 'nome__icontains' } },
```

`type`: `text` (com atraso de digitação) · `select` · `boolean` · `numeric`. `param` é o nome
do parâmetro na API (default: o `field`) — tem de existir na allowlist do servidor. O valor vai
para `crud.columnFilters` e a lista reconsulta.

O slot `toolbar-filters` é para o que o declarativo não faz (FK assíncrona, período, toggle) —
ele fala com o mesmo `crud.setColumnFilter`, então "Limpar filtros" limpa os dois. O que **não**
é filtro (um funil clicável, KPIs) fica em `before-table`.

## Contagem e paginador

O título vem acompanhado da **contagem total do filtro/busca atual** ("32 registros", texto
abafado, `aria-live="polite"` — leitor de tela anuncia quando o filtro muda). O total sai do
`rows` da resposta paginada; sem paginação, do tamanho da lista. Com `showHeader: false` a
contagem vai para a toolbar, ao lado da busca. `hideCount` desliga.

O paginador (tabela e cards) reporta em pt-BR: `1–20 de 132` (`{first}–{last} de
{totalRecords}`).

Com isso o KPI "Total de registros" (`show-kpi`) só faz sentido quando há outros KPIs ao lado
— sozinho, ele repetia a contagem.

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
