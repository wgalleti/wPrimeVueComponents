// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import PrimeVue from 'primevue/config'
import WCrudSubview from './WCrudSubview.vue'
import { useSubviewCrud } from '@/composables/useSubviewCrud'
import type { EditableColumnDef } from '@/types/editableTable'
import type { FieldDef } from '@/types/field'

const toastMock = { success: vi.fn(), error: vi.fn(), warn: vi.fn(), info: vi.fn() }
const confirmMock = vi.fn((onAccept: () => void) => onAccept())

vi.mock('@/composables/useAppToast', () => ({ useAppToast: () => toastMock }))
vi.mock('@/composables/useAppConfirm', () => ({
  useAppConfirm: () => ({ confirmDelete: confirmMock, confirmAction: vi.fn() }),
}))

const colunas: EditableColumnDef[] = [
  { field: 'produto', header: 'Produto' },
  { field: 'dose', header: 'Dose', editor: 'number', decimals: 1, footer: 'sum' },
]

const form: FieldDef[] = [
  { field: 'produto', label: 'Produto', type: 'text', required: true },
  { field: 'dose', label: 'Dose', type: 'number', defaultValue: 0 },
]

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

beforeEach(() => vi.clearAllMocks())

/** Host mínimo: o componente recebe um manager real, como na tela. */
function montar(props: Record<string, unknown> = {}, iniciais = [{ produto: 'STARFIX', dose: 4 }]) {
  const linhas = ref<Record<string, unknown>[]>([...iniciais])
  const Host = defineComponent({
    setup(_, { expose }) {
      const crud = useSubviewCrud({
        rows: () => linhas.value,
        onChange: (novas) => {
          linhas.value = novas
        },
        form,
      })
      expose({ crud })
      return () => h(WCrudSubview, { crud, columns: colunas, title: 'Insumos', ...props })
    },
  })
  const wrapper = mount(Host, { global: { plugins: [PrimeVue] } })
  return { wrapper, linhas }
}

describe('WCrudSubview', () => {
  it('mostra o título com a contagem de linhas', () => {
    const { wrapper } = montar()
    expect(wrapper.find('.w-crud-subview__title').text()).toContain('Insumos')
    expect(wrapper.find('.w-crud-subview__count').text()).toBe('1')
  })

  it('renderiza uma ação de editar e uma de excluir por linha', () => {
    const { wrapper } = montar()
    expect(wrapper.findAll('[aria-label="Editar"]')).toHaveLength(1)
    expect(wrapper.findAll('[aria-label="Excluir"]')).toHaveLength(1)
  })

  it('excluir passa pela confirmação antes de tirar a linha', async () => {
    const { wrapper, linhas } = montar()

    await wrapper.find('[aria-label="Excluir"]').trigger('click')

    expect(confirmMock).toHaveBeenCalled()
    expect(linhas.value).toHaveLength(0)
  })

  it('editar abre o dialog com o registro carregado', async () => {
    const { wrapper } = montar()

    await wrapper.find('[aria-label="Editar"]').trigger('click')

    const crud = (wrapper.vm as unknown as { crud: ReturnType<typeof useSubviewCrud> }).crud
    expect(crud.dialogVisible.value).toBe(true)
    expect(crud.isEditing.value).toBe(true)
    expect(crud.formData.produto).toBe('STARFIX')
  })

  it('documento travado esconde as ações de linha e o botão de adicionar', () => {
    const { wrapper } = montar({ disabled: true, addLabel: 'Novo insumo' })
    expect(wrapper.find('[aria-label="Editar"]').exists()).toBe(false)
    expect(wrapper.find('[aria-label="Excluir"]').exists()).toBe(false)
    expect(wrapper.find('.w-editable-table__add').exists()).toBe(false)
  })

  it('o botão de adicionar abre o dialog em modo criação', async () => {
    const { wrapper } = montar({ addLabel: 'Novo insumo' })

    await wrapper.find('.w-editable-table__add').trigger('click')

    const crud = (wrapper.vm as unknown as { crud: ReturnType<typeof useSubviewCrud> }).crud
    expect(crud.dialogVisible.value).toBe(true)
    expect(crud.isEditing.value).toBe(false)
  })

  it('toolbar-extra chega à barra da tabela, ao lado do adicionar', () => {
    const linhas = ref<Record<string, unknown>[]>([{ produto: 'STARFIX', dose: 4 }])
    const Host = defineComponent({
      setup() {
        const crud = useSubviewCrud({
          rows: () => linhas.value,
          onChange: (novas) => {
            linhas.value = novas
          },
          form,
        })
        return () =>
          h(
            WCrudSubview,
            { crud, columns: colunas, title: 'Insumos', addLabel: 'Novo insumo' },
            { 'toolbar-extra': () => h('button', { class: 'extra' }, 'Aplicar receita') },
          )
      },
    })
    const wrapper = mount(Host, { global: { plugins: [PrimeVue] } })

    const barra = wrapper.find('.w-editable-table__toolbar')
    expect(barra.find('.w-editable-table__add').exists()).toBe(true)
    expect(barra.find('.extra').exists()).toBe(true)
  })

  it('mantém o rodapé de totais da tabela editável', () => {
    const { wrapper } = montar({}, [
      { produto: 'STARFIX', dose: 4 },
      { produto: 'CERTEZA N', dose: 2 },
    ])
    expect(wrapper.find('tfoot').text()).toContain('6,0')
  })

  it('edição por célula devolve o array ao dono', async () => {
    const { wrapper, linhas } = montar()

    const tabela = wrapper.findComponent({ name: 'WEditableTable' })
    tabela.vm.$emit('update:modelValue', [{ produto: 'STARFIX', dose: 9 }])
    await wrapper.vm.$nextTick()

    expect(linhas.value[0]).toMatchObject({ dose: 9 })
  })
})
