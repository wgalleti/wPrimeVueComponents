// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WEditableTable from './WEditableTable.vue'
import type { EditableColumnDef, EditableRow } from '@/types/editableTable'

const colunas: EditableColumnDef[] = [
  { field: 'produto', header: 'Produto', editor: 'text' },
  { field: 'area', header: 'Área (ha)', editor: 'number', decimals: 0, footer: 'sum' },
  { field: 'volume_kg', header: 'Volume (kg)', decimals: 0, footer: 'sum' },
]

const lotes: EditableRow[] = [
  { produto: 'HO APORE', area: 160, volume_kg: 8400 },
  { produto: 'BMX GUEPARDO', area: 100, volume_kg: 5600 },
]

// O Select do PrimeVue escuta orientação por matchMedia, que o jsdom não tem.
beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  }
})

function montar(props: Record<string, unknown> = {}) {
  return mount(WEditableTable, {
    props: { modelValue: lotes, columns: colunas, ...props },
    global: { plugins: [PrimeVue] },
  })
}

const emitido = (w: VueWrapper): EditableRow[][] =>
  (w.emitted('update:modelValue') ?? []).map((e) => (e as [EditableRow[]])[0])

const ultimo = (w: VueWrapper) => {
  const todos = emitido(w)
  return todos[todos.length - 1]
}

const rodape = (w: VueWrapper) => w.findAll('.w-editable-table__footer td').map((td) => td.text())

describe('WEditableTable — render', () => {
  it('monta cabeçalho e uma linha por item', () => {
    const w = montar()
    expect(w.findAll('thead th').map((th) => th.text())).toEqual([
      'Produto',
      'Área (ha)',
      'Volume (kg)',
    ])
    expect(w.findAll('.w-editable-table__row')).toHaveLength(2)
  })

  it('célula sem editor sai formatada em pt-BR com sufixo', () => {
    const w = montar({
      columns: [{ field: 'volume_kg', header: 'Volume', decimals: 1, suffix: ' kg' }],
    })
    expect(w.find('.w-editable-table__text').text()).toBe('8.400,0 kg')
  })

  it('format() vence decimals/suffix', () => {
    const w = montar({
      columns: [
        {
          field: 'produto',
          header: 'Produto',
          format: (v: unknown, row: EditableRow) => `${String(v)} · ${row.area} ha`,
        },
      ],
    })
    expect(w.find('.w-editable-table__text').text()).toBe('HO APORE · 160 ha')
  })

  it('lista vazia mostra o emptyMessage', () => {
    const w = montar({ modelValue: [], emptyMessage: 'Nenhum lote adicionado' })
    expect(w.find('.w-editable-table__empty').text()).toBe('Nenhum lote adicionado')
  })

  it('coluna numérica alinha à direita mesmo sem align explícito', () => {
    const w = montar()
    const th = w.findAll('thead th')[1]
    expect(th.classes()).toContain('w-editable-table__cell--right')
    expect(th.classes()).toContain('w-editable-table__cell--num')
  })
})

describe('WEditableTable — edição de célula', () => {
  it('editar texto emite o array inteiro com só aquela linha trocada', async () => {
    const w = montar()
    await w.findAll('input[type="text"]')[0].setValue('HO APORE II')

    const proximo = ultimo(w)
    expect(proximo[0]).toEqual({ produto: 'HO APORE II', area: 160, volume_kg: 8400 })
    expect(proximo[1]).toEqual(lotes[1]) // a outra linha sai intacta
  })

  it('não muta o modelValue recebido (emite array novo)', async () => {
    const original = [{ produto: 'A', area: 10, volume_kg: 0 }]
    const w = montar({ modelValue: original })
    await w.findAll('input[type="text"]')[0].setValue('B')
    expect(original[0].produto).toBe('A')
    expect(ultimo(w)).not.toBe(original)
  })

  it('editor select troca o valor pelo optionValue', async () => {
    const w = montar({
      modelValue: [{ classe: 'QUIMICO' }],
      columns: [
        {
          field: 'classe',
          header: 'Classe',
          editor: 'select',
          options: [
            { label: 'Biológico', value: 'BIOLOGICO' },
            { label: 'Químico', value: 'QUIMICO' },
          ],
        },
      ],
    })
    w.findComponent({ name: 'Select' }).vm.$emit('update:modelValue', 'BIOLOGICO')
    await w.vm.$nextTick()
    expect(ultimo(w)).toEqual([{ classe: 'BIOLOGICO' }])
  })

  it('disabled trava os editores', () => {
    const w = montar({ disabled: true })
    expect(w.find('input[type="text"]').attributes('disabled')).toBeDefined()
  })

  it('coluna com disabled por linha trava só aquela célula', () => {
    const w = montar({
      columns: [
        {
          field: 'produto',
          header: 'Produto',
          editor: 'text',
          disabled: (_row: EditableRow, index: number) => index === 0,
        },
      ],
    })
    const inputs = w.findAll('input[type="text"]')
    expect(inputs[0].attributes('disabled')).toBeDefined()
    expect(inputs[1].attributes('disabled')).toBeUndefined()
  })
})

describe('WEditableTable — rodapé de totais', () => {
  it('soma as colunas footer: "sum" em pt-BR e rotula a primeira coluna livre', () => {
    const w = montar()
    expect(rodape(w)).toEqual(['Total', '260', '14.000'])
  })

  it('a soma acompanha o modelValue', async () => {
    const w = montar()
    await w.setProps({ modelValue: [{ produto: 'X', area: 12.5, volume_kg: 700 }] })
    expect(rodape(w)).toEqual(['Total', '13', '700'])
  })

  it('footer como função recebe as linhas e imprime texto livre', () => {
    const w = montar({
      columns: [
        { field: 'produto', header: 'Produto' },
        {
          field: 'area',
          header: 'Área',
          footer: (rows: EditableRow[]) => `${rows.length} lote(s)`,
        },
      ],
    })
    expect(rodape(w)).toEqual(['Total', '2 lote(s)'])
  })

  it('sem coluna com footer não existe rodapé', () => {
    const w = montar({ columns: [{ field: 'produto', header: 'Produto' }] })
    expect(w.find('.w-editable-table__footer').exists()).toBe(false)
  })

  it('slot #footer-{field} sobrescreve a célula do rodapé', () => {
    const w = mount(WEditableTable, {
      props: { modelValue: lotes, columns: colunas },
      slots: { 'footer-area': '<b class="custom">tudo</b>' },
      global: { plugins: [PrimeVue] },
    })
    expect(w.find('.custom').text()).toBe('tudo')
  })
})

describe('WEditableTable — adicionar / remover', () => {
  it('addLabel mostra o botão e emite add', async () => {
    const w = montar({ addLabel: 'Adicionar lote' })
    const botao = w.find('.w-editable-table__add')
    expect(botao.text()).toContain('Adicionar lote')
    await botao.trigger('click')
    expect(w.emitted('add')).toHaveLength(1)
  })

  it('sem addLabel e sem slot #toolbar não há barra', () => {
    const w = montar()
    expect(w.find('.w-editable-table__toolbar').exists()).toBe(false)
  })

  it('toolbar-extra entra depois do botão de adicionar, sem substituí-lo', () => {
    const w = mount(WEditableTable, {
      props: { modelValue: lotes, columns: colunas, addLabel: 'Adicionar lote' },
      slots: { 'toolbar-extra': '<button class="extra">Aplicar receita</button>' },
      global: { plugins: [PrimeVue] },
    })
    const barra = w.find('.w-editable-table__toolbar')
    expect(barra.find('.w-editable-table__add').exists()).toBe(true)
    expect(barra.find('.extra').exists()).toBe(true)
    // A ordem é o contrato: o atalho fica à direita do "adicionar".
    const filhos = Array.from(barra.element.children).map((el) => el.className)
    expect(filhos[0]).toContain('w-editable-table__add')
    expect(filhos[1]).toContain('extra')
  })

  it('toolbar-extra sozinho já monta a barra', () => {
    const w = mount(WEditableTable, {
      props: { modelValue: lotes, columns: colunas },
      slots: { 'toolbar-extra': '<button class="extra">Aplicar receita</button>' },
      global: { plugins: [PrimeVue] },
    })
    expect(w.find('.w-editable-table__toolbar').exists()).toBe(true)
    expect(w.find('.w-editable-table__add').exists()).toBe(false)
  })

  it('remover emite o evento com a linha e o array já sem ela', async () => {
    const w = montar({ removable: true })
    await w.findAll('.w-editable-table__remove')[0].trigger('click')

    expect(w.emitted('remove')?.[0]).toEqual([lotes[0], 0])
    expect(ultimo(w)).toEqual([lotes[1]])
  })
})

describe('WEditableTable — expansão', () => {
  it('sem expandable não há coluna de toggle nem slot de expansão', () => {
    const w = montar()
    expect(w.find('.w-editable-table__toggle').exists()).toBe(false)
  })

  it('o toggle abre e fecha a linha, uma independente da outra', async () => {
    const w = mount(WEditableTable, {
      props: { modelValue: lotes, columns: colunas, expandable: true },
      slots: { expansion: '<div class="detalhe">insumos</div>' },
      global: { plugins: [PrimeVue] },
    })

    expect(w.findAll('.detalhe')).toHaveLength(0)

    await w.findAll('.w-editable-table__toggle')[0].trigger('click')
    expect(w.findAll('.detalhe')).toHaveLength(1)

    await w.findAll('.w-editable-table__toggle')[1].trigger('click')
    expect(w.findAll('.detalhe')).toHaveLength(2)

    await w.findAll('.w-editable-table__toggle')[0].trigger('click')
    expect(w.findAll('.detalhe')).toHaveLength(1)
  })
})

describe('grupos de cabeçalho', () => {
  const colunasComGrupo: EditableColumnDef[] = [
    { field: 'produto', header: 'Produto' },
    { field: 'sugestao', header: 'Sugestão', group: 'Bags' },
    { field: 'volume', header: 'A tratar', group: 'Bags' },
    { field: 'volume_kg', header: 'Volume (kg)' },
  ]

  it('sem `group` em nenhuma coluna, não renderiza a linha de grupos', () => {
    const wrapper = montar()
    expect(wrapper.find('.w-editable-table__group-row').exists()).toBe(false)
  })

  it('funde colunas vizinhas do mesmo grupo num rótulo com colspan', () => {
    const wrapper = montar({ columns: colunasComGrupo })
    const row = wrapper.find('.w-editable-table__group-row')
    expect(row.exists()).toBe(true)
    const label = row.find('.w-editable-table__group--label')
    expect(label.text()).toBe('Bags')
    expect(label.attributes('colspan')).toBe('2')
    // As colunas sem grupo ficam com a célula de cima vazia (uma por coluna).
    const celulas = row.findAll('th.w-editable-table__group')
    expect(celulas).toHaveLength(3)
  })
})
