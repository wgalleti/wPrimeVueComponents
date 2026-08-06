import { describe, it, expect } from 'vitest'
import {
  allLeafValues,
  buildTree,
  collectLeafValues,
  deriveSelectionKeys,
  filterTree,
  indexByKey,
  toggleIds,
  normalizeTerm,
  TREE_GROUP_PREFIX,
  TREE_LEAF_PREFIX,
} from './treeSelect'

// Caso real que motivou o componente: telas de um portal agrupadas por módulo.
const telas = [
  { id: 1, nome: 'Lotes de semente', modulo: 'Sementes' },
  { id: 2, nome: 'Análises de qualidade', modulo: 'Sementes' },
  { id: 3, nome: 'Rastreio de lotes', modulo: 'Sementes' },
  { id: 4, nome: 'Notas fiscais', modulo: 'Estoque' },
  { id: 5, nome: 'Transferências', modulo: 'Estoque' },
  { id: 6, nome: 'Fornecedores', modulo: 'Cadastros' },
]

const arvore = () => buildTree(telas, { groupBy: 'modulo' })

const G = (chave: string) => `${TREE_GROUP_PREFIX}${chave}`
const L = (id: number) => `${TREE_LEAF_PREFIX}${id}`

describe('buildTree', () => {
  it('agrupa a lista plana preservando a ordem de primeira aparição', () => {
    const nodes = arvore()
    expect(nodes.map((n) => n.label)).toEqual(['Sementes', 'Estoque', 'Cadastros'])
    expect(nodes[0].children?.map((c) => c.value)).toEqual([1, 2, 3])
    expect(nodes[0].leaf).toBe(false)
    expect(nodes[0].value).toBeUndefined()
  })

  it('sem groupBy devolve lista rasa (só folhas na raiz)', () => {
    const nodes = buildTree(telas)
    expect(nodes).toHaveLength(6)
    expect(nodes.every((n) => n.leaf && n.value !== undefined)).toBe(true)
  })

  it('item com grupo vazio/nulo vira folha na raiz', () => {
    const nodes = buildTree(
      [
        { id: 1, nome: 'A', modulo: 'X' },
        { id: 2, nome: 'B', modulo: null },
        { id: 3, nome: 'C', modulo: '' },
      ],
      { groupBy: 'modulo' },
    )
    expect(nodes.map((n) => n.key)).toEqual([G('X'), L(2), L(3)])
  })

  it('aplica groupLabel no rótulo do nó-pai sem mexer na chave', () => {
    const nodes = buildTree(telas, { groupBy: 'modulo', groupLabel: (c) => c.toUpperCase() })
    expect(nodes[0].label).toBe('SEMENTES')
    expect(nodes[0].key).toBe(G('Sementes'))
  })

  it('respeita optionValue/optionLabel customizados e ignora registro sem id', () => {
    const nodes = buildTree(
      [
        { codigo: 'a', titulo: 'Alfa' },
        { codigo: null, titulo: 'Sem id' },
      ],
      { optionValue: 'codigo', optionLabel: 'titulo' },
    )
    expect(nodes).toHaveLength(1)
    expect(nodes[0]).toMatchObject({ value: 'a', label: 'Alfa' })
  })

  it('guarda o registro original em data (para os slots)', () => {
    expect(arvore()[0].children?.[0].data).toBe(telas[0])
  })
})

describe('deriveSelectionKeys', () => {
  it('grupo parcialmente marcado → partialChecked no pai, checked só nas folhas marcadas', () => {
    const keys = deriveSelectionKeys(arvore(), [1, 2])

    expect(keys[G('Sementes')]).toEqual({ checked: false, partialChecked: true })
    expect(keys[L(1)]).toEqual({ checked: true, partialChecked: false })
    expect(keys[L(2)]).toEqual({ checked: true, partialChecked: false })
    expect(keys[L(3)]).toBeUndefined()
    // grupo sem nenhuma folha marcada não entra no mapa
    expect(keys[G('Estoque')]).toBeUndefined()
  })

  it('todas as folhas marcadas → grupo checked, sem partial', () => {
    const keys = deriveSelectionKeys(arvore(), [1, 2, 3])
    expect(keys[G('Sementes')]).toEqual({ checked: true, partialChecked: false })
  })

  it('grupo de folha única marcada fica checked (não partial)', () => {
    const keys = deriveSelectionKeys(arvore(), [6])
    expect(keys[G('Cadastros')]).toEqual({ checked: true, partialChecked: false })
  })

  it('seleção vazia → mapa vazio', () => {
    expect(deriveSelectionKeys(arvore(), [])).toEqual({})
  })

  it('ignora id que não existe na árvore', () => {
    expect(deriveSelectionKeys(arvore(), [999])).toEqual({})
  })

  // ------------------------------------------------------------------
  // O teste que justifica o componente existir.
  // https://github.com/primefaces/primevue/issues/6928
  // ------------------------------------------------------------------
  it('mantém o estado correto com filtro escondendo parte das folhas do grupo', () => {
    const completa = arvore()
    const selecionadas = [2, 3] // 2 de 3 telas do módulo Sementes

    // Filtro que deixa visíveis SÓ as duas folhas marcadas — é o cenário em que
    // o Tree do PrimeVue marcaria o grupo como checked (partialChecked calculado
    // sobre a árvore filtrada). "Lotes de semente" (id 1, marcada como NÃO
    // selecionada) some da tela, mas continua existindo.
    const visivel = filterTree(completa, 'a', [])
    const sementesVisivel = visivel.find((n) => n.key === G('Sementes'))
    expect(sementesVisivel?.children?.map((c) => c.value)).toEqual([2, 3])

    // Derivação sobre a árvore INTEIRA: continua parcial. Correto.
    const correto = deriveSelectionKeys(completa, selecionadas)
    expect(correto[G('Sementes')]).toEqual({ checked: false, partialChecked: true })

    // Prova de que o cenário é mesmo o do bug: derivar sobre a visão filtrada
    // devolveria "checked" — o estado errado que este componente evita.
    const errado = deriveSelectionKeys(visivel, selecionadas)
    expect(errado[G('Sementes')]).toEqual({ checked: true, partialChecked: false })

    // E o mapa derivado da árvore inteira não muda quando o filtro muda.
    expect(deriveSelectionKeys(completa, selecionadas)).toEqual(correto)
    expect(deriveSelectionKeys(arvore(), selecionadas)).toEqual(correto)
  })

  it('folha escondida pelo filtro continua contando no estado do pai', () => {
    const completa = arvore()
    // só a folha 3 está marcada, e o filtro esconde justamente ela
    const visivel = filterTree(completa, 'Notas', [])
    expect(visivel.map((n) => n.key)).toEqual([G('Estoque')])

    const keys = deriveSelectionKeys(completa, [3])
    expect(keys[G('Sementes')]).toEqual({ checked: false, partialChecked: true })
  })
})

describe('filterTree', () => {
  it('termo vazio devolve a árvore inteira', () => {
    expect(filterTree(arvore(), '  ')).toHaveLength(3)
  })

  it('mantém o grupo inteiro quando o rótulo do grupo casa', () => {
    const out = filterTree(arvore(), 'estoque')
    expect(out).toHaveLength(1)
    expect(out[0].children).toHaveLength(2)
  })

  it('poda folhas que não casam e descarta grupo sem sobra', () => {
    const out = filterTree(arvore(), 'fornecedor')
    expect(out.map((n) => n.key)).toEqual([G('Cadastros')])
    expect(out[0].children?.map((c) => c.value)).toEqual([6])
  })

  it('busca sem acento e sem caixa', () => {
    expect(filterTree(arvore(), 'ANALISES')[0].children?.[0].value).toBe(2)
    expect(filterTree(arvore(), 'transferencias')[0].children?.[0].value).toBe(5)
  })

  it('considera campos extras do registro', () => {
    const nodes = buildTree([{ id: 1, nome: 'Alfa', sigla: 'ZZZ' }])
    expect(filterTree(nodes, 'zzz')).toHaveLength(0)
    expect(filterTree(nodes, 'zzz', ['sigla'])).toHaveLength(1)
  })

  it('preserva a key na cópia podada (é ela que reconecta à árvore inteira)', () => {
    const completa = arvore()
    const podado = filterTree(completa, 'Lotes de semente')[0]
    expect(podado.key).toBe(G('Sementes'))
    expect(podado.children).toHaveLength(1)
    // o nó da árvore inteira, achado pela mesma key, ainda tem os 3 filhos
    expect(indexByKey(completa).get(podado.key)?.children).toHaveLength(3)
  })
})

describe('collectLeafValues / allLeafValues', () => {
  it('devolve todos os ids de folha sob um grupo', () => {
    expect(collectLeafValues(arvore()[0])).toEqual([1, 2, 3])
  })

  it('numa folha devolve o próprio id', () => {
    expect(collectLeafValues(arvore()[0].children![1])).toEqual([2])
  })

  it('grupo vazio não produz id', () => {
    expect(collectLeafValues({ key: 'g:x', label: 'x', leaf: false, children: [] })).toEqual([])
  })

  it('allLeafValues cobre a árvore toda na ordem', () => {
    expect(allLeafValues(arvore())).toEqual([1, 2, 3, 4, 5, 6])
  })
})

describe('toggleIds', () => {
  it('marca o grupo inteiro sem duplicar o que já estava', () => {
    expect(toggleIds([1], [1, 2, 3], true)).toEqual([1, 2, 3])
  })

  it('desmarca todas as folhas do grupo e mantém o resto', () => {
    expect(toggleIds([1, 2, 3, 4], [1, 2, 3], false)).toEqual([4])
  })

  it('preserva a ordem de quem já estava selecionado', () => {
    expect(toggleIds([5, 1], [2], true)).toEqual([5, 1, 2])
  })

  it('não explode com array indefinido', () => {
    expect(toggleIds(undefined as unknown as number[], [1], true)).toEqual([1])
  })
})

describe('indexByKey', () => {
  it('indexa grupos e folhas', () => {
    const index = indexByKey(arvore())
    expect(index.size).toBe(3 + 6)
    expect(index.get(G('Sementes'))?.label).toBe('Sementes')
    expect(index.get(L(4))?.value).toBe(4)
  })
})

describe('normalizeTerm', () => {
  it('remove acento e baixa a caixa', () => {
    expect(normalizeTerm('Transferências')).toBe('transferencias')
  })
  it('nulo vira string vazia', () => {
    expect(normalizeTerm(null)).toBe('')
    expect(normalizeTerm(undefined)).toBe('')
  })
})
