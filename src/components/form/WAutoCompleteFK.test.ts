// @vitest-environment jsdom
//
// Cobre o teclado do campo (↓ abre a lista, Enter com texto novo cadastra) e a
// auto-seleção quando a lista tem um registro só. Monta com o AutoComplete real
// do PrimeVue: o que se verifica é a chamada ao provider e o que sai no v-model.
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import WAutoCompleteFK from './WAutoCompleteFK.vue'
import WCrudFormDialog from '@/components/crud/WCrudFormDialog.vue'
import { W_DATA_PROVIDER_KEY, W_CONFIG_KEY } from '@/types/plugin'
import type { DataProvider } from '@/types/dataProvider'
import type { FieldDef } from '@/types/field'

vi.mock('@/composables/useAppToast', () => ({
  useAppToast: () => ({ success: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() }),
}))
vi.mock('@/composables/useAppConfirm', () => ({
  useAppConfirm: () => ({ confirmDelete: vi.fn(), confirmAction: vi.fn() }),
}))

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

type Linha = Record<string, unknown>

const campos: FieldDef[] = [
  { field: 'codigo', label: 'Código', type: 'number' },
  { field: 'nome', label: 'Nome', type: 'text' },
]

function lista(data: Linha[], rows = data.length) {
  return { data, page: 1, page_size: 20, rows }
}

function montar(props: Record<string, unknown> = {}, itens: Linha[] = []) {
  const provider = {
    list: vi.fn().mockResolvedValue(lista(itens)),
    get: vi.fn().mockResolvedValue({ data: null }),
    create: vi.fn().mockImplementation(async (_e: string, payload: Linha) => ({
      data: { id: 99, ...payload },
    })),
    update: vi.fn(),
    delete: vi.fn(),
  }
  const wrapper = mount(WAutoCompleteFK, {
    props: { modelValue: null, endpoint: '/itens', ...props },
    attachTo: document.body,
    global: {
      plugins: [PrimeVue],
      directives: { tooltip: Tooltip },
      provide: {
        [W_DATA_PROVIDER_KEY as symbol]: provider as unknown as DataProvider,
        [W_CONFIG_KEY as symbol]: {
          defaultPageSize: 20,
          dateFormat: 'DD/MM/YYYY',
          dateTimeFormat: 'DD/MM/YYYY HH:mm',
          locale: 'pt-BR',
          currency: 'BRL',
        },
      },
      stubs: { teleport: true },
    },
  })
  return { wrapper, provider }
}

const input = (w: ReturnType<typeof montar>['wrapper']) => w.find('input')

/** Digita no campo. Só `input` — o `setValue` do VTU dispara `change` junto, e o
 *  `forceSelection` do PrimeVue descarta texto sem correspondência no `change`
 *  (é o que acontece no blur, não enquanto se digita). */
async function digitar(w: ReturnType<typeof montar>['wrapper'], texto: string) {
  const el = input(w)
  ;(el.element as HTMLInputElement).value = texto
  await el.trigger('input')
}

const emitido = (w: ReturnType<typeof montar>['wrapper']) =>
  (w.emitted('update:modelValue') ?? []).map((e) => (e as [unknown])[0])

/** Chamadas ao `list` feitas pela busca do campo (page_size 20), sem a auto-seleção. */
const buscas = (provider: { list: ReturnType<typeof vi.fn> }) =>
  provider.list.mock.calls.filter((c) => (c[1] as Linha).page_size === 20)

describe('WAutoCompleteFK — seta para baixo abre a lista', () => {
  it('↓ com o painel fechado busca na hora, sem minLength nem debounce', async () => {
    const { wrapper, provider } = montar({ autoSelectSingle: false, minLength: 3 })
    await flushPromises()
    expect(buscas(provider)).toHaveLength(0)

    await input(wrapper).trigger('keydown', { key: 'ArrowDown', code: 'ArrowDown' })
    // Síncrono: nenhum timer avançado, e a query vazia lista os primeiros.
    expect(buscas(provider)).toHaveLength(1)
    expect(buscas(provider)[0][1]).toEqual({ page_size: 20 })
    wrapper.unmount()
  })

  it('↓ não busca com cascata obrigatória vazia', async () => {
    const { wrapper, provider } = montar({
      autoSelectSingle: false,
      drilldown: { field: 'unidade', value: null },
    })
    await flushPromises()
    await input(wrapper).trigger('keydown', { key: 'ArrowDown', code: 'ArrowDown' })
    expect(buscas(provider)).toHaveLength(0)
    wrapper.unmount()
  })
})

describe('WAutoCompleteFK — único registro já vem preenchido', () => {
  it('lista com 1 item → seleciona e emite', async () => {
    const { wrapper, provider } = montar({}, [{ id: 1, nome: 'Único' }])
    await flushPromises()
    expect(provider.list).toHaveBeenCalledWith('/itens', { page_size: 2 })
    expect(emitido(wrapper)).toEqual([{ id: 1, nome: 'Único' }])
    expect(input(wrapper).element.value).toBe('Único')
    wrapper.unmount()
  })

  it('lista com 2 itens → não seleciona', async () => {
    const { wrapper } = montar({}, [
      { id: 1, nome: 'A' },
      { id: 2, nome: 'B' },
    ])
    await flushPromises()
    expect(emitido(wrapper)).toEqual([])
    wrapper.unmount()
  })

  it('já há valor → não consulta', async () => {
    const { wrapper, provider } = montar({ modelValue: { id: 5, nome: 'Fixo' } }, [
      { id: 1, nome: 'Único' },
    ])
    await flushPromises()
    expect(provider.list).not.toHaveBeenCalled()
    expect(emitido(wrapper)).toEqual([])
    wrapper.unmount()
  })

  it('autoSelectSingle=false → não consulta', async () => {
    const { wrapper, provider } = montar({ autoSelectSingle: false }, [{ id: 1, nome: 'Único' }])
    await flushPromises()
    expect(provider.list).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('multiple → não consulta', async () => {
    const { wrapper, provider } = montar({ multiple: true, modelValue: [] }, [
      { id: 1, nome: 'Único' },
    ])
    await flushPromises()
    expect(provider.list).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('cascata obrigatória vazia → não consulta; preenchida → seleciona o único filho', async () => {
    const { wrapper, provider } = montar({ drilldown: { field: 'unidade', value: null } }, [
      { id: 7, nome: 'Filho único' },
    ])
    await flushPromises()
    expect(provider.list).not.toHaveBeenCalled()

    await wrapper.setProps({ drilldown: { field: 'unidade', value: 3 } })
    await flushPromises()
    expect(provider.list).toHaveBeenCalledWith('/itens', { page_size: 2, unidade: 3 })
    expect(emitido(wrapper)).toEqual([{ id: 7, nome: 'Filho único' }])
    wrapper.unmount()
  })

  it('limpar o campo não redispara a auto-seleção', async () => {
    const { wrapper, provider } = montar({}, [{ id: 1, nome: 'Único' }])
    await flushPromises()
    expect(emitido(wrapper)).toHaveLength(1)
    await wrapper.setProps({ modelValue: { id: 1, nome: 'Único' } })

    await wrapper.find('.w-autocompletefk-clear').trigger('click')
    await wrapper.setProps({ modelValue: null })
    await flushPromises()
    expect(provider.list).toHaveBeenCalledTimes(1)
    expect(emitido(wrapper)).toEqual([{ id: 1, nome: 'Único' }, null])
    wrapper.unmount()
  })
})

describe('WAutoCompleteFK — Enter sem correspondência abre o cadastro', () => {
  it('texto novo + canCreate → abre o form com o nome preenchido; salvar seleciona', async () => {
    const { wrapper, provider } = montar({
      autoSelectSingle: false,
      canCreate: true,
      crudFields: campos,
    })
    await flushPromises()

    await digitar(wrapper, 'Milho safrinha')
    expect(wrapper.find('.w-autocompletefk').attributes('data-kbd-hold')).toBe('true')

    const evento = { key: 'Enter', code: 'Enter' }
    await input(wrapper).trigger('keydown', evento)
    await flushPromises()

    // Buscou o texto na hora (sem esperar o debounce) e não achou nada.
    expect(buscas(provider)[0][1]).toEqual({ page_size: 20, search: 'Milho safrinha' })
    const form = wrapper.findComponent(WCrudFormDialog)
    expect(form.props('visible')).toBe(true)
    expect(form.props('isEditing')).toBe(false)
    expect((form.props('formData') as Linha).nome).toBe('Milho safrinha')

    form.vm.$emit('save')
    await flushPromises()
    expect(provider.create).toHaveBeenCalledWith('/itens', { codigo: null, nome: 'Milho safrinha' })
    expect(wrapper.findComponent(WCrudFormDialog).props('visible')).toBe(false)
    expect(emitido(wrapper).at(-1)).toEqual({ id: 99, codigo: null, nome: 'Milho safrinha' })
    expect(wrapper.find('.w-autocompletefk').attributes('data-kbd-hold')).toBeUndefined()
    wrapper.unmount()
  })

  it('o cadastro embutido segue a tela da entidade: colunas, largura, títulos e payload', async () => {
    const { wrapper, provider } = montar({
      autoSelectSingle: false,
      canCreate: true,
      // o MESMO objeto que a tela da entidade passa ao useCrudManager
      crud: {
        form: campos,
        formColumns: 4,
        dialogWidth: '640px',
        labels: { createTitle: 'Novo item', successCreate: 'Item cadastrado' },
        createDefaults: () => ({ unidade: 7 }),
        transformPayload: (payload: Record<string, unknown>, isEditing: boolean) => ({
          ...payload,
          nome: `${payload.nome}!`,
          isEditing,
        }),
      },
    })
    await flushPromises()
    await digitar(wrapper, 'Soja')
    await input(wrapper).trigger('keydown', { key: 'Enter', code: 'Enter' })
    await flushPromises()

    const form = wrapper.findComponent(WCrudFormDialog)
    expect(form.props('title')).toBe('Novo item')
    expect(form.props('formColumns')).toBe(4)
    expect(form.props('width')).toBe('640px')

    form.vm.$emit('save')
    await flushPromises()
    expect(provider.create).toHaveBeenCalledWith('/itens', {
      codigo: null,
      nome: 'Soja!',
      unidade: 7,
      isEditing: false,
    })
    wrapper.unmount()
  })

  it('com sugestões, Enter não abre o cadastro', async () => {
    const { wrapper, provider } = montar(
      { autoSelectSingle: false, canCreate: true, crudFields: campos },
      [{ id: 1, nome: 'Milho' }],
    )
    await flushPromises()
    await digitar(wrapper, 'Mil')
    await input(wrapper).trigger('keydown', { key: 'Enter', code: 'Enter' })
    await flushPromises()
    expect(buscas(provider)).toHaveLength(1)
    expect(wrapper.findComponent(WCrudFormDialog).props('visible')).toBe(false)
    wrapper.unmount()
  })

  it('sem cadastro permitido, Enter não segura nem abre nada', async () => {
    const { wrapper, provider } = montar({ autoSelectSingle: false, canCreate: false })
    await flushPromises()
    await digitar(wrapper, 'Novo')
    expect(wrapper.find('.w-autocompletefk').attributes('data-kbd-hold')).toBeUndefined()
    await input(wrapper).trigger('keydown', { key: 'Enter', code: 'Enter' })
    await flushPromises()
    expect(buscas(provider)).toHaveLength(0)
    expect(wrapper.findComponent(WCrudFormDialog).exists()).toBe(false)
    wrapper.unmount()
  })

  it('extras.fields da busca inline habilita o cadastro (sem abrir o modal)', async () => {
    const { wrapper, provider } = montar({ autoSelectSingle: false })
    provider.list.mockResolvedValue({
      ...lista([]),
      extras: { fields: [{ name: 'nome', label: 'Nome', type: 'string' }] },
    })
    await flushPromises()
    // Sem fields ainda, Enter não é cadastro; ↓ busca e traz o `extras.fields`.
    await digitar(wrapper, 'Inédito')
    expect(wrapper.find('.w-autocompletefk').attributes('data-kbd-hold')).toBeUndefined()
    await input(wrapper).trigger('keydown', { key: 'ArrowDown', code: 'ArrowDown' })
    await flushPromises()
    expect(wrapper.find('.w-autocompletefk').attributes('data-kbd-hold')).toBe('true')
    await input(wrapper).trigger('keydown', { key: 'Enter', code: 'Enter' })
    await flushPromises()
    const form = wrapper.findComponent(WCrudFormDialog)
    expect(form.props('visible')).toBe(true)
    expect((form.props('formData') as Linha).nome).toBe('Inédito')
    wrapper.unmount()
  })
})
