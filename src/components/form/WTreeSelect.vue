<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Tree from 'primevue/tree'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Button from 'primevue/button'
import {
  allLeafValues,
  buildTree,
  collectLeafValues,
  deriveSelectionKeys,
  filterTree,
  indexByKey,
  toggleIds,
  type TreeSelectId,
  type TreeSelectNode,
  type TreeSelectOption,
} from '@/utils/treeSelect'

/**
 * Seleção múltipla em árvore com checkbox, alimentada por uma lista PLANA + um
 * campo de agrupamento. O `v-model` é um array de ids de FOLHA — nunca o mapa de
 * chaves do PrimeVue, e nunca com id de grupo dentro (grupo é só visual).
 *
 * ---------------------------------------------------------------------------
 * POR QUE A SELEÇÃO É DERIVADA AQUI E NÃO DELEGADA AO `Tree` — NÃO "SIMPLIFIQUE"
 * ---------------------------------------------------------------------------
 * O `Tree` com `selectionMode="checkbox"` sabe manter sozinho o mapa
 * `{ chave: { checked, partialChecked } }`, propagando para pais e filhos. Trocar
 * o que está aqui por um `v-model:selectionKeys` parece uma simplificação óbvia.
 * Não é: existe um bug ABERTO que quebra exatamente a combinação que usamos
 * (checkbox + filtro).
 *
 *   https://github.com/primefaces/primevue/issues/6928  (aberta, "Help Wanted")
 *
 * Com o filtro ativo, o `partialChecked` dos ancestrais passa a se referir à
 * árvore FILTRADA em vez da árvore inteira. O mecanismo está no código do
 * PrimeVue 4.5: `TreeNode.propagateUp()` conta `this.node.children`, e sob filtro
 * `this.node` é uma CÓPIA que o `findFilteredNodes()` produziu contendo só os
 * filhos que casaram com a busca. Um grupo com 12 telas, 3 marcadas e filtro
 * mostrando só essas 3 aparece como totalmente marcado — e ao salvar o usuário
 * marca o que não queria.
 *
 * O repositório do PrimeVue foi arquivado em junho/2026 e está read-only: não vai
 * ser corrigido upstream.
 *
 * Por isso, aqui:
 *  1. a fonte da verdade é o `modelValue` (ids de folha) — sem estado espelhado;
 *  2. o `selectionKeys` é DERIVADO sobre a árvore INTEIRA (`fullTree`), nunca
 *     sobre a visão filtrada, então é correto por construção;
 *  3. o `Tree` recebe `:selection-keys` como prop CONTROLADA (não `v-model:`) —
 *     o mapa que ele calcularia é simplesmente descartado.
 *
 * Escolha do evento: `node-select` / `node-unselect`, e não `update:selectionKeys`.
 * Os dois saem do mesmo `onCheckboxChange` do `Tree`, mas carregam coisas
 * diferentes: `update:selectionKeys` entrega o mapa JÁ PROPAGADO (o resultado do
 * `propagateUp` bugado), enquanto `node-select`/`node-unselect` entregam só o nó
 * clicado e a direção do clique — a intenção crua do usuário, que nenhuma conta
 * do PrimeVue tocou. É o único ponto estável da API para este caso.
 *
 * Detalhe que fecha o cerco: sob filtro o nó do evento é uma cópia podada, então
 * ler `event.node.children` alternaria só as folhas VISÍVEIS. Resolvemos o nó
 * pela `key` dentro do índice da árvore inteira (`fullIndex`) e alternamos todas
 * as folhas dele — o mesmo resultado com ou sem filtro na tela.
 */
const props = withDefaults(
  defineProps<{
    /** Ids das folhas selecionadas (`v-model`). Nunca contém id de grupo. */
    modelValue?: TreeSelectId[]
    /** Lista PLANA de registros. O agrupamento é feito aqui, por `groupBy`. */
    options?: TreeSelectOption[]
    /** Campo do id da folha (default: `id`). */
    optionValue?: string
    /** Campo do rótulo visível (default: `nome`). */
    optionLabel?: string
    /** Campo que agrupa os registros. Sem ele, a lista sai rasa. */
    groupBy?: string
    /** Rótulo do nó-pai a partir do valor bruto do agrupamento. */
    groupLabel?: (chave: string) => string
    /** Campo de busca interno. */
    filter?: boolean
    filterPlaceholder?: string
    /** Campos extras do registro considerados na busca (além do rótulo). */
    filterFields?: string[]
    loading?: boolean
    disabled?: boolean
    /** Texto quando não há nenhuma opção. */
    emptyMessage?: string
    /** Texto quando a busca não encontrou nada. */
    filterEmptyMessage?: string
    /** Contador `N de M selecionados` acima da árvore. */
    showCount?: boolean
    /** Atalhos "Marcar todos" / "Limpar". */
    showToggleAll?: boolean
    /** Abre todos os grupos na montagem. */
    defaultExpanded?: boolean
    ariaLabel?: string
  }>(),
  {
    modelValue: () => [],
    options: () => [],
    optionValue: 'id',
    optionLabel: 'nome',
    filter: false,
    filterPlaceholder: 'Buscar...',
    filterFields: () => [],
    loading: false,
    disabled: false,
    emptyMessage: 'Nenhum item disponível',
    filterEmptyMessage: 'Nenhum item encontrado',
    showCount: true,
    showToggleAll: true,
    defaultExpanded: false,
  },
)

const emit = defineEmits<{ 'update:modelValue': [ids: TreeSelectId[]] }>()

const term = ref('')
const expandedKeys = ref<Record<string, boolean>>({})

/** Árvore inteira — a única base válida para derivar estado. */
const fullTree = computed(() =>
  buildTree(props.options, {
    optionValue: props.optionValue,
    optionLabel: props.optionLabel,
    groupBy: props.groupBy,
    groupLabel: props.groupLabel,
  }),
)

/** Índice `key → nó` da árvore inteira; traduz evento da árvore visível em ids. */
const fullIndex = computed(() => indexByKey(fullTree.value))

const isFiltering = computed(() => props.filter && term.value.trim().length > 0)

/** O que aparece na tela. Só isto é filtrado — o estado, nunca. */
const visibleTree = computed(() =>
  isFiltering.value ? filterTree(fullTree.value, term.value, props.filterFields) : fullTree.value,
)

/** Derivado sobre `fullTree`, de propósito. Ver o comentário no topo. */
const selectionKeys = computed(() => deriveSelectionKeys(fullTree.value, props.modelValue))

const totalLeaves = computed(() => allLeafValues(fullTree.value).length)
const selectedCount = computed(() => {
  const validos = new Set(allLeafValues(fullTree.value))
  return props.modelValue.filter((id) => validos.has(id)).length
})

const showHeader = computed(
  () => (props.showCount || props.showToggleAll) && (totalLeaves.value > 0 || props.loading),
)
const isEmpty = computed(() => !props.loading && visibleTree.value.length === 0)
const emptyText = computed(() =>
  isFiltering.value ? props.filterEmptyMessage : props.emptyMessage,
)

function expandFrom(nodes: readonly TreeSelectNode[]) {
  const next = { ...expandedKeys.value }
  for (const node of nodes) if (node.children?.length) next[node.key] = true
  expandedKeys.value = next
}

// `immediate` porque `options` costuma chegar de uma request DEPOIS da montagem:
// expandir só no setup deixaria a árvore fechada justamente no caso mais comum.
// Cada grupo é aberto no máximo uma vez, então grupo que o usuário fechou na mão
// não reabre sozinho se a lista for recarregada.
const jaAbertos = new Set<string>()
watch(
  fullTree,
  (nodes) => {
    if (!props.defaultExpanded) return
    const novos = nodes.filter((n) => n.children?.length && !jaAbertos.has(n.key))
    if (!novos.length) return
    novos.forEach((n) => jaAbertos.add(n.key))
    expandFrom(novos)
  },
  { immediate: true },
)

// Buscar sem abrir os grupos que casaram esconderia o resultado atrás de um
// nó fechado. Ao limpar, a expansão do usuário fica como estava.
watch(term, (valor) => {
  if (valor.trim()) expandFrom(visibleTree.value)
})

/**
 * Traduz o clique num nó (grupo ou folha) para ids de folha.
 * Resolve pela `key` no índice da árvore INTEIRA — `node` pode ser uma cópia
 * podada pelo filtro, com menos filhos do que o grupo realmente tem.
 */
function onNodeToggle(node: TreeSelectNode, check: boolean) {
  if (props.disabled) return
  const completo = fullIndex.value.get(node.key)
  if (!completo) return
  emit('update:modelValue', toggleIds(props.modelValue, collectLeafValues(completo), check))
}

function selectAll() {
  if (props.disabled) return
  emit('update:modelValue', allLeafValues(fullTree.value))
}

function clearAll() {
  if (props.disabled) return
  emit('update:modelValue', [])
}
</script>

<template>
  <div class="w-tree-select" :class="{ 'w-tree-select--disabled': disabled }">
    <slot name="header" :selected-count="selectedCount" :total="totalLeaves">
      <div v-if="showHeader" class="w-tree-select__head">
        <span v-if="showCount" class="w-tree-select__count">
          {{ selectedCount }} de {{ totalLeaves }} selecionados
        </span>
        <span v-else />
        <div v-if="showToggleAll" class="w-tree-select__actions">
          <Button
            type="button"
            label="Marcar todos"
            text
            data-kbd-skip
            tabindex="-1"
            :disabled="disabled || selectedCount === totalLeaves || !totalLeaves"
            @click="selectAll"
          />
          <Button
            type="button"
            label="Limpar"
            text
            data-kbd-skip
            tabindex="-1"
            :disabled="disabled || !selectedCount"
            @click="clearAll"
          />
        </div>
      </div>
    </slot>

    <IconField v-if="filter" class="w-tree-select__filter">
      <InputIcon class="pi pi-search" />
      <InputText
        v-model="term"
        :placeholder="filterPlaceholder"
        :disabled="disabled"
        :aria-label="filterPlaceholder"
        data-kbd-skip
        fluid
      />
    </IconField>

    <Tree
      v-if="!isEmpty"
      :value="visibleTree"
      selection-mode="checkbox"
      :selection-keys="selectionKeys"
      :expanded-keys="expandedKeys"
      :loading="loading"
      :aria-label="ariaLabel"
      class="w-tree-select__tree"
      @update:expanded-keys="expandedKeys = $event"
      @node-select="onNodeToggle($event as TreeSelectNode, true)"
      @node-unselect="onNodeToggle($event as TreeSelectNode, false)"
    >
      <template #default="slotProps">
        <slot name="node" :node="slotProps.node as TreeSelectNode">
          {{ (slotProps.node as TreeSelectNode).label }}
        </slot>
      </template>
    </Tree>

    <div v-else class="w-tree-select__empty">
      <slot name="empty" :filtering="isFiltering">{{ emptyText }}</slot>
    </div>
  </div>
</template>
