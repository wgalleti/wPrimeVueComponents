/**
 * Lógica pura por trás do `WTreeSelect` — sem Vue, sem PrimeVue, testável isolada.
 *
 * O componente NÃO delega a seleção ao `Tree` do PrimeVue (ver o comentário longo
 * em `WTreeSelect.vue`). Tudo o que a árvore precisa saber é derivado aqui, sempre
 * a partir da árvore INTEIRA e do array de ids selecionados.
 */

export type TreeSelectId = string | number

export type TreeSelectOption = Record<string, unknown>

/** Nó no formato que o `Tree` do PrimeVue consome (`key`/`label`/`children`). */
export interface TreeSelectNode {
  /** Chave única e estável. Prefixada para não colidir grupo com folha. */
  key: string
  label: string
  /** Id da folha. Ausente em nó de grupo — grupo é visual, nunca entra no v-model. */
  value?: TreeSelectId
  children?: TreeSelectNode[]
  /** Registro original da lista plana, entregue aos slots. */
  data?: TreeSelectOption
  leaf: boolean
}

/** Estado de um nó no formato que o `Tree` lê (`checked` / `partialChecked`). */
export interface TreeSelectionState {
  checked: boolean
  partialChecked: boolean
}

export type TreeSelectionKeys = Record<string, TreeSelectionState>

/** Prefixo da chave de um nó de grupo. */
export const TREE_GROUP_PREFIX = 'g:'
/** Prefixo da chave de um nó folha. */
export const TREE_LEAF_PREFIX = 'n:'

export interface BuildTreeOptions {
  /** Campo do id da folha (default: `id`). */
  optionValue?: string
  /** Campo do rótulo visível (default: `nome`). */
  optionLabel?: string
  /** Campo que agrupa. Sem ele, a árvore é rasa (só folhas na raiz). */
  groupBy?: string
  /** Rótulo do nó-pai a partir do valor bruto do agrupamento. */
  groupLabel?: (chave: string) => string
}

/** Normaliza para busca: minúsculas e sem acento (rótulos são pt-BR). */
export function normalizeTerm(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase()
}

/**
 * Converte a lista PLANA em árvore de dois níveis.
 *
 * - Sem `groupBy`, ou item com valor de grupo vazio/nulo → folha na raiz.
 * - Grupos saem na ordem da primeira ocorrência (nada de ordenação implícita,
 *   quem manda na ordem é quem monta a lista).
 */
export function buildTree(
  options: readonly TreeSelectOption[],
  { optionValue = 'id', optionLabel = 'nome', groupBy, groupLabel }: BuildTreeOptions = {},
): TreeSelectNode[] {
  const roots: TreeSelectNode[] = []
  const groups = new Map<string, TreeSelectNode>()

  for (const option of options ?? []) {
    const id = option[optionValue] as TreeSelectId | undefined
    if (id === undefined || id === null) continue

    const leaf: TreeSelectNode = {
      key: `${TREE_LEAF_PREFIX}${id}`,
      label: String(option[optionLabel] ?? id),
      value: id,
      data: option,
      leaf: true,
    }

    const rawGroup = groupBy ? option[groupBy] : undefined
    if (rawGroup === undefined || rawGroup === null || rawGroup === '') {
      roots.push(leaf)
      continue
    }

    const chave = String(rawGroup)
    let group = groups.get(chave)
    if (!group) {
      group = {
        key: `${TREE_GROUP_PREFIX}${chave}`,
        label: groupLabel ? groupLabel(chave) : chave,
        children: [],
        leaf: false,
      }
      groups.set(chave, group)
      roots.push(group)
    }
    group.children!.push(leaf)
  }

  return roots
}

/** Todos os ids de folha sob um nó (o próprio, se for folha). */
export function collectLeafValues(node: TreeSelectNode): TreeSelectId[] {
  if (!node.children?.length) {
    return node.value === undefined ? [] : [node.value]
  }
  return node.children.flatMap(collectLeafValues)
}

/** Todos os ids de folha da árvore, na ordem em que aparecem. */
export function allLeafValues(nodes: readonly TreeSelectNode[]): TreeSelectId[] {
  return nodes.flatMap(collectLeafValues)
}

/** Índice `key → nó` da árvore INTEIRA — é por aqui que um evento vira ids. */
export function indexByKey(nodes: readonly TreeSelectNode[]): Map<string, TreeSelectNode> {
  const index = new Map<string, TreeSelectNode>()
  const visit = (node: TreeSelectNode) => {
    index.set(node.key, node)
    node.children?.forEach(visit)
  }
  nodes.forEach(visit)
  return index
}

/**
 * Deriva o mapa `selectionKeys` a partir dos ids selecionados.
 *
 * Chame SEMPRE com a árvore inteira — nunca com a visão filtrada. Um grupo é
 * `checked` quando todas as folhas dele estão selecionadas e `partialChecked`
 * quando só algumas estão; como a conta é sobre o conjunto completo, o filtro
 * não tem como corromper o estado.
 */
export function deriveSelectionKeys(
  nodes: readonly TreeSelectNode[],
  selected: readonly TreeSelectId[],
): TreeSelectionKeys {
  const chosen = new Set<TreeSelectId>(selected ?? [])
  const keys: TreeSelectionKeys = {}

  const visit = (node: TreeSelectNode): TreeSelectionState => {
    if (!node.children?.length) {
      const checked = node.value !== undefined && chosen.has(node.value)
      if (checked) keys[node.key] = { checked: true, partialChecked: false }
      return { checked, partialChecked: false }
    }

    let todas = true
    let alguma = false
    for (const child of node.children) {
      const estado = visit(child)
      if (estado.checked) alguma = true
      else todas = false
      if (estado.partialChecked) {
        alguma = true
        todas = false
      }
    }

    if (todas) keys[node.key] = { checked: true, partialChecked: false }
    else if (alguma) keys[node.key] = { checked: false, partialChecked: true }
    return { checked: todas, partialChecked: !todas && alguma }
  }

  nodes.forEach(visit)
  return keys
}

/**
 * Poda a árvore pelo termo de busca, devolvendo CÓPIAS que preservam a `key`.
 *
 * Grupo cujo rótulo casa é mantido inteiro; senão sobram só as folhas que casam.
 * A chave sobrevive à poda de propósito: é ela que reconecta um evento da árvore
 * visível ao nó correspondente da árvore inteira.
 */
export function filterTree(
  nodes: readonly TreeSelectNode[],
  term: string,
  extraFields: readonly string[] = [],
): TreeSelectNode[] {
  const q = normalizeTerm(term).trim()
  if (!q) return [...nodes]

  const matches = (node: TreeSelectNode): boolean => {
    if (normalizeTerm(node.label).includes(q)) return true
    return extraFields.some((field) => normalizeTerm(node.data?.[field]).includes(q))
  }

  const out: TreeSelectNode[] = []
  for (const node of nodes) {
    if (!node.children?.length) {
      if (matches(node)) out.push(node)
      continue
    }
    if (matches(node)) {
      out.push(node)
      continue
    }
    const children = filterTree(node.children, term, extraFields)
    if (children.length) out.push({ ...node, children })
  }
  return out
}

/** Adiciona ou remove `ids` do array atual, preservando a ordem e sem duplicar. */
export function toggleIds(
  current: readonly TreeSelectId[],
  ids: readonly TreeSelectId[],
  check: boolean,
): TreeSelectId[] {
  const alvo = new Set<TreeSelectId>(ids)
  if (!check) return (current ?? []).filter((id) => !alvo.has(id))

  const out = [...(current ?? [])]
  const existente = new Set<TreeSelectId>(out)
  for (const id of ids) {
    if (!existente.has(id)) {
      existente.add(id)
      out.push(id)
    }
  }
  return out
}
