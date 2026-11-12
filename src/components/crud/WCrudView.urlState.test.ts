// @vitest-environment jsdom
//
// `urlState`: estado da lista na query da URL (router.replace), restaurado antes do 1º fetch.
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import WCrudView from './WCrudView.vue'
import { useCrudManager } from '@/composables/useCrudManager'
import { W_DATA_PROVIDER_KEY, W_CONFIG_KEY } from '@/types/plugin'
import type { DataProvider } from '@/types/dataProvider'

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
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  }
})

type Linha = Record<string, unknown>

async function montar(url: string, props: Record<string, unknown> = {}, bindRow = false) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/lista', component: { template: '<div />' } },
      { path: '/outra', component: { template: '<div />' } },
    ],
  })
  await router.push(url)
  const replace = vi.spyOn(router, 'replace')
  const push = vi.spyOn(router, 'push')
  // A API devolve a página pedida (como a real); sem isso o `page` do mock sobrescreveria a restaurada.
  const list = vi.fn().mockImplementation(async (_e: string, p: { page: number }) => ({
    data: [
      { id: 1, nome: 'Soja' },
      { id: 2, nome: 'Milho' },
    ],
    page: p.page,
    page_size: 20,
    rows: 2,
  }))
  const provider: Partial<DataProvider> = { list }
  const selecionada = ref<Linha | null>(null)
  let crud!: ReturnType<typeof useCrudManager<Linha>>
  const Host = defineComponent({
    setup() {
      crud = useCrudManager<Linha>({
        endpoint: '/itens',
        columns: [
          { field: 'nome', header: 'Nome', sortable: true },
          {
            field: 'status',
            header: 'Status',
            filter: {
              type: 'select',
              param: 'status',
              options: [
                { label: 'A', value: 1 },
                { label: 'B', value: 2 },
              ],
            },
          },
        ],
        form: [{ field: 'nome', label: 'Nome', type: 'text' }],
      })
      return () =>
        h(WCrudView, {
          crud,
          title: 'Itens',
          ...(bindRow
            ? {
                selectedRow: selecionada.value,
                'onUpdate:selectedRow': (v: Linha | null) => (selecionada.value = v),
              }
            : {}),
          ...props,
        })
    },
  })
  const w = mount(Host, {
    attachTo: document.body,
    global: {
      plugins: [PrimeVue, router],
      directives: { tooltip: Tooltip },
      provide: {
        [W_DATA_PROVIDER_KEY as symbol]: provider as DataProvider,
        [W_CONFIG_KEY as symbol]: { defaultPageSize: 20, dateFormat: 'DD/MM/YYYY' },
      },
    },
  })
  await flushPromises()
  return { w, router, list, replace, push, selecionada, crud: () => crud }
}

describe('WCrudView — urlState', () => {
  it('restaura busca, filtro, página e ordenação numa só carga', async () => {
    const { list, w } = await montar('/lista?search=so&f_status=2&page=3&sort=-nome')
    expect(list).toHaveBeenCalledTimes(1)
    expect(list.mock.calls[0][1]).toMatchObject({
      search: 'so',
      status: 2,
      page: 3,
      ordering: '-nome',
    })
    w.unmount()
  })

  it('ignora ordenação de coluna não ordenável e filtro fora das opções', async () => {
    const { list, w } = await montar('/lista?sort=status&f_status=9')
    expect(list.mock.calls[0][1]).not.toHaveProperty('ordering')
    expect(list.mock.calls[0][1]).not.toHaveProperty('status')
    w.unmount()
  })

  it('grava só o que difere do padrão e remove o que voltou ao padrão', async () => {
    const { w, router, crud } = await montar('/lista')
    expect(router.currentRoute.value.query).toEqual({})
    crud().columnFilters.status = 1
    crud().pagination.page = 2
    await flushPromises()
    expect(router.currentRoute.value.query).toEqual({ f_status: '1', page: '2' })
    delete crud().columnFilters.status
    crud().pagination.page = 1
    await flushPromises()
    expect(router.currentRoute.value.query).toEqual({})
    w.unmount()
  })

  it('usa replace, nunca push, e não navega quando nada mudou', async () => {
    const { w, replace, push, crud } = await montar('/lista?page=2')
    expect(replace).not.toHaveBeenCalled() // o que foi restaurado já está na URL
    crud().sort.field = 'nome'
    crud().sort.order = 1
    await flushPromises()
    expect(replace).toHaveBeenCalledTimes(1)
    expect(push).not.toHaveBeenCalled()
    w.unmount()
  })

  it('não grava depois que a rota deixa de ser a da montagem', async () => {
    const { w, router, replace, crud } = await montar('/lista')
    await router.push('/outra')
    crud().pagination.page = 4
    await flushPromises()
    expect(replace).not.toHaveBeenCalled()
    expect(router.currentRoute.value.query).toEqual({})
    w.unmount()
  })

  it('prefixo separa as chaves', async () => {
    const { w, router, list } = await montar('/lista?orc_page=2&page=5', { urlState: 'orc' })
    expect(list.mock.calls[0][1]).toMatchObject({ page: 2 })
    expect(router.currentRoute.value.query).toEqual({ orc_page: '2', page: '5' })
    w.unmount()
  })

  it('restaura a linha selecionada pelo id; grava ao selecionar', async () => {
    const { w, selecionada, router } = await montar('/lista?id=2', {}, true)
    expect(selecionada.value).toMatchObject({ id: 2, nome: 'Milho' })
    expect(router.currentRoute.value.query.id).toBe('2')
    selecionada.value = null
    await flushPromises()
    expect(router.currentRoute.value.query.id).toBeUndefined()
    w.unmount()
  })

  it('id que não está nos itens limpa a seleção e a query', async () => {
    const { w, selecionada, router } = await montar('/lista?id=99&page=1', {}, true)
    expect(selecionada.value).toBeNull()
    expect(router.currentRoute.value.query.id).toBeUndefined()
    w.unmount()
  })

  it('desligado com urlState false: não lê nem grava', async () => {
    const { w, router, list, crud } = await montar('/lista?page=3', { urlState: false })
    expect(list.mock.calls[0][1]).toMatchObject({ page: 1 })
    crud().pagination.page = 2
    await flushPromises()
    expect(router.currentRoute.value.query).toEqual({ page: '3' })
    w.unmount()
  })

  async function semRouter(props: Record<string, unknown>) {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const list = vi.fn().mockResolvedValue({ data: [], page: 1, page_size: 20, rows: 0 })
    const Host = defineComponent({
      setup() {
        const crud = useCrudManager<Linha>({
          endpoint: '/itens',
          columns: [{ field: 'nome', header: 'Nome' }],
          form: [{ field: 'nome', label: 'Nome', type: 'text' }],
        })
        return () => h(WCrudView, { crud, title: 'Itens', ...props })
      },
    })
    const w = mount(Host, {
      global: {
        plugins: [PrimeVue],
        directives: { tooltip: Tooltip },
        provide: {
          [W_DATA_PROVIDER_KEY as symbol]: { list } as unknown as DataProvider,
          [W_CONFIG_KEY as symbol]: { defaultPageSize: 20, dateFormat: 'DD/MM/YYYY' },
        },
      },
    })
    await flushPromises()
    expect(list).toHaveBeenCalledTimes(1)
    w.unmount()
    const avisou = warn.mock.calls.length > 0
    warn.mockRestore()
    return avisou
  }

  it('sem router e sem a prop (default ligado): silêncio', async () => {
    expect(await semRouter({})).toBe(false)
  })

  it('sem router e com a prop explícita: avisa em dev e a lista segue', async () => {
    expect(await semRouter({ urlState: true })).toBe(true)
  })
})
