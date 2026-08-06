// @vitest-environment jsdom
//
// Teste de integração REAL com o Tree do PrimeVue: monta o componente, clica em
// checkbox de verdade e confere duas coisas — o que sai no v-model e o que o DOM
// RENDERIZA (data-p-checked / data-p-partialchecked do Checkbox de cada nó, que é
// o estado que o usuário enxerga).
//
// O caso que importa é o do filtro ativo: é ele que o PrimeVue erra sozinho.
// https://github.com/primefaces/primevue/issues/6928
import { describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WTreeSelect from './WTreeSelect.vue'
import { TREE_GROUP_PREFIX, TREE_LEAF_PREFIX, type TreeSelectId } from '@/utils/treeSelect'

const telas = [
  { id: 1, nome: 'Lotes de semente', modulo: 'Sementes' },
  { id: 2, nome: 'Análises de qualidade', modulo: 'Sementes' },
  { id: 3, nome: 'Rastreio de lotes', modulo: 'Sementes' },
  { id: 4, nome: 'Notas fiscais', modulo: 'Estoque' },
  { id: 5, nome: 'Transferências', modulo: 'Estoque' },
  { id: 6, nome: 'Fornecedores', modulo: 'Cadastros' },
]

type Props = Record<string, unknown>

function montar(props: Props = {}) {
  return mount(WTreeSelect, {
    props: {
      options: telas,
      groupBy: 'modulo',
      filter: true,
      defaultExpanded: true,
      ...props,
    },
    global: { plugins: [PrimeVue] },
  })
}

/** O `<li role="treeitem">` de um nó, achado pelo rótulo. */
function item(wrapper: VueWrapper, label: string) {
  const nodes = wrapper.findAll('li[role="treeitem"]')
  const found = nodes.find((n) => n.find('[data-pc-section="nodelabel"]').text() === label)
  if (!found) throw new Error(`nó "${label}" não está na tela`)
  return found
}

/**
 * Estado RENDERIZADO do checkbox do nó — o que o usuário vê, não o que o
 * componente acha. Sai do próprio Checkbox que o Tree monta.
 */
function estado(wrapper: VueWrapper, label: string) {
  const box = item(wrapper, label).find('[data-pc-name="pcnodecheckbox"]')
  return {
    checked: box.attributes('data-p-checked'),
    partial: box.attributes('data-p-partialchecked') ?? 'false',
  }
}

function clicar(wrapper: VueWrapper, label: string) {
  return item(wrapper, label).find('[data-pc-section="nodecontent"]').trigger('click')
}

const emitido = (wrapper: VueWrapper): TreeSelectId[][] =>
  (wrapper.emitted('update:modelValue') ?? []).map((e) => (e as [TreeSelectId[]])[0])

const ultimo = (wrapper: VueWrapper) => {
  const todos = emitido(wrapper)
  return todos[todos.length - 1]
}

async function digitar(wrapper: VueWrapper, termo: string) {
  await wrapper.find('input[type="text"]').setValue(termo)
}

describe('WTreeSelect — montagem', () => {
  it('agrupa a lista plana e mostra grupos + folhas', () => {
    const w = montar({ modelValue: [] })
    const labels = w.findAll('[data-pc-section="nodelabel"]').map((n) => n.text())
    expect(labels).toContain('Sementes')
    expect(labels).toContain('Lotes de semente')
    expect(w.text()).toContain('0 de 6 selecionados')
  })

  it('defaultExpanded abre também os grupos que chegam depois (options assíncrono)', async () => {
    const w = mount(WTreeSelect, {
      props: { options: [], groupBy: 'modulo', modelValue: [], defaultExpanded: true },
      global: { plugins: [PrimeVue] },
    })
    await w.setProps({ options: telas })
    expect(item(w, 'Lotes de semente').exists()).toBe(true)
  })

  it('usa groupLabel no nó-pai', () => {
    const w = montar({ modelValue: [], groupLabel: (c: string) => c.toUpperCase() })
    expect(w.text()).toContain('SEMENTES')
  })
})

describe('WTreeSelect — derivação de checked/partialChecked', () => {
  it('grupo parcialmente marcado aparece como parcial, não como marcado', () => {
    const w = montar({ modelValue: [1, 2] })
    expect(estado(w, 'Sementes')).toMatchObject({ checked: 'false', partial: 'true' })
    expect(estado(w, 'Lotes de semente').checked).toBe('true')
    expect(estado(w, 'Rastreio de lotes').checked).toBe('false')
  })

  it('grupo com todas as folhas marcadas aparece como marcado', () => {
    const w = montar({ modelValue: [1, 2, 3] })
    expect(estado(w, 'Sementes')).toMatchObject({ checked: 'true', partial: 'false' })
  })

  it('o estado acompanha o modelValue (fonte da verdade, sem espelho interno)', async () => {
    const w = montar({ modelValue: [1] })
    expect(estado(w, 'Sementes').partial).toBe('true')
    await w.setProps({ modelValue: [1, 2, 3] })
    expect(estado(w, 'Sementes')).toMatchObject({ checked: 'true', partial: 'false' })
    await w.setProps({ modelValue: [] })
    expect(estado(w, 'Sementes').checked).toBe('false')
  })
})

// ---------------------------------------------------------------------------
// O TESTE QUE JUSTIFICA O COMPONENTE
// ---------------------------------------------------------------------------
describe('WTreeSelect — com o filtro ativo', () => {
  it('o grupo continua PARCIAL mesmo quando o filtro esconde a folha desmarcada', async () => {
    const w = montar({ modelValue: [2, 3] })
    expect(estado(w, 'Sementes')).toMatchObject({ checked: 'false', partial: 'true' })

    // "a" casa com Análises (2) e Rastreio (3) — as duas marcadas — e esconde
    // "Lotes de semente" (1), a única desmarcada do grupo.
    await digitar(w, 'a')
    expect(() => item(w, 'Lotes de semente')).toThrow()
    expect(item(w, 'Análises de qualidade').exists()).toBe(true)

    // É AQUI que o Tree sozinho marcaria o grupo inteiro (issue 6928).
    expect(estado(w, 'Sementes')).toMatchObject({ checked: 'false', partial: 'true' })

    // E volta ao normal ao limpar, sem ter corrompido nada.
    await digitar(w, '')
    expect(estado(w, 'Sementes')).toMatchObject({ checked: 'false', partial: 'true' })
    expect(emitido(w)).toEqual([]) // filtrar não altera a seleção
  })

  // Reprodução exata do 6928: com o filtro ativo, alternar uma folha VISÍVEL faz
  // o propagateUp do Tree recontar só os filhos filtrados e marcar o grupo
  // inteiro. Medido num Tree cru (v-model:selectionKeys + filter) neste mesmo
  // jsdom: 'Sementes' vai de {checked:false, partial:true} para
  // {checked:true, partial:false} — e a folha escondida entra na seleção sem o
  // usuário ter pedido. Aqui o estado tem de ficar de pé.
  it('alternar folha visível sob filtro não contamina o grupo nem a folha escondida', async () => {
    const w = montar({ modelValue: [2, 3] })
    await digitar(w, 'a')

    // desmarca e remarca a folha visível (o gesto que dispara o bug)
    await clicar(w, 'Análises de qualidade')
    expect(ultimo(w)).toEqual([3])
    await w.setProps({ modelValue: ultimo(w) })

    expect(estado(w, 'Sementes')).toMatchObject({ checked: 'false', partial: 'true' })

    await clicar(w, 'Análises de qualidade')
    expect(ultimo(w)).toEqual([3, 2])
    await w.setProps({ modelValue: ultimo(w) })

    // grupo segue parcial e a folha escondida (1) nunca entrou na seleção
    expect(estado(w, 'Sementes')).toMatchObject({ checked: 'false', partial: 'true' })
    expect(ultimo(w)).not.toContain(1)

    await digitar(w, '')
    expect(estado(w, 'Lotes de semente').checked).toBe('false')
  })

  it('marcar o grupo com filtro ativo alterna TODAS as folhas, não só as visíveis', async () => {
    const w = montar({ modelValue: [] })
    await digitar(w, 'a') // Sementes mostra só 2 das 3 folhas
    await clicar(w, 'Sementes')
    expect(ultimo(w)).toEqual([1, 2, 3])
  })

  it('desmarcar o grupo com filtro ativo limpa também a folha escondida', async () => {
    const w = montar({ modelValue: [1, 2, 3, 4] })
    await digitar(w, 'a')
    await clicar(w, 'Sementes')
    expect(ultimo(w)).toEqual([4])
  })

  it('marcar uma folha visível não mexe nas escondidas', async () => {
    const w = montar({ modelValue: [] })
    await digitar(w, 'Notas')
    await clicar(w, 'Notas fiscais')
    expect(ultimo(w)).toEqual([4])
  })

  it('busca sem acento e sem caixa', async () => {
    const w = montar({ modelValue: [] })
    await digitar(w, 'TRANSFERENCIAS')
    expect(item(w, 'Transferências').exists()).toBe(true)
  })
})

describe('WTreeSelect — marcar/desmarcar grupo', () => {
  it('marcar o grupo seleciona todas as folhas dele', async () => {
    const w = montar({ modelValue: [] })
    await clicar(w, 'Sementes')
    expect(ultimo(w)).toEqual([1, 2, 3])
  })

  it('desmarcar o grupo remove só as folhas dele', async () => {
    const w = montar({ modelValue: [1, 2, 3, 4] })
    await clicar(w, 'Sementes')
    expect(ultimo(w)).toEqual([4])
  })

  it('folha marcada/desmarcada individualmente', async () => {
    const w = montar({ modelValue: [1] })
    await clicar(w, 'Análises de qualidade')
    expect(ultimo(w)).toEqual([1, 2])

    const w2 = montar({ modelValue: [1, 2] })
    await clicar(w2, 'Lotes de semente')
    expect(ultimo(w2)).toEqual([2])
  })

  it('atalhos marcar todos / limpar', async () => {
    const w = montar({ modelValue: [] })
    await w
      .findAll('button')
      .find((b) => b.text() === 'Marcar todos')!
      .trigger('click')
    expect(ultimo(w)).toEqual([1, 2, 3, 4, 5, 6])

    const w2 = montar({ modelValue: [1, 2] })
    await w2
      .findAll('button')
      .find((b) => b.text() === 'Limpar')!
      .trigger('click')
    expect(ultimo(w2)).toEqual([])
  })

  it('disabled não emite nada', async () => {
    const w = montar({ modelValue: [], disabled: true })
    await clicar(w, 'Sementes')
    expect(emitido(w)).toEqual([])
  })
})

describe('WTreeSelect — o v-model só carrega id de folha', () => {
  it('nenhum id de grupo escapa, em nenhuma das operações', async () => {
    const w = montar({ modelValue: [] })
    await clicar(w, 'Sementes')
    await clicar(w, 'Notas fiscais')
    await digitar(w, 'a')
    await clicar(w, 'Cadastros')

    const idsValidos = new Set(telas.map((t) => t.id))
    const emissoes = emitido(w)
    expect(emissoes.length).toBeGreaterThan(0)
    for (const ids of emissoes) {
      for (const id of ids) {
        expect(idsValidos.has(id as number)).toBe(true)
        expect(String(id).startsWith(TREE_GROUP_PREFIX)).toBe(false)
        expect(String(id).startsWith(TREE_LEAF_PREFIX)).toBe(false)
      }
    }
  })

  it('não duplica id já selecionado', async () => {
    const w = montar({ modelValue: [1] })
    await clicar(w, 'Sementes')
    expect(ultimo(w)).toEqual([1, 2, 3])
  })
})

describe('WTreeSelect — estados vazios', () => {
  it('lista vazia mostra o emptyMessage e nenhuma árvore', () => {
    const w = montar({ options: [], modelValue: [], emptyMessage: 'Nenhuma tela cadastrada' })
    expect(w.find('.w-tree-select__empty').text()).toBe('Nenhuma tela cadastrada')
    expect(w.find('[data-pc-name="tree"]').exists()).toBe(false)
  })

  it('emptyMessage tem default em pt-BR', () => {
    const w = montar({ options: [], modelValue: [] })
    expect(w.find('.w-tree-select__empty').text()).toBe('Nenhum item disponível')
  })

  it('busca sem resultado mostra o filterEmptyMessage, não o emptyMessage', async () => {
    const w = montar({ modelValue: [], emptyMessage: 'vazio', filterEmptyMessage: 'nada aqui' })
    await digitar(w, 'zzzzzz')
    expect(w.find('.w-tree-select__empty').text()).toBe('nada aqui')
  })

  it('slot #empty sobrescreve a mensagem', () => {
    const w = mount(WTreeSelect, {
      props: { options: [], modelValue: [] },
      slots: { empty: '<span class="custom">cadastre uma tela</span>' },
      global: { plugins: [PrimeVue] },
    })
    expect(w.find('.custom').text()).toBe('cadastre uma tela')
  })

  it('carregando não mostra estado vazio', () => {
    const w = montar({ options: [], modelValue: [], loading: true })
    expect(w.find('.w-tree-select__empty').exists()).toBe(false)
  })
})

describe('WTreeSelect — lista rasa (sem groupBy)', () => {
  it('renderiza só folhas e alterna uma a uma', async () => {
    const w = montar({ groupBy: undefined, modelValue: [] })
    expect(w.findAll('li[role="treeitem"]')).toHaveLength(6)
    await clicar(w, 'Fornecedores')
    expect(ultimo(w)).toEqual([6])
  })
})
