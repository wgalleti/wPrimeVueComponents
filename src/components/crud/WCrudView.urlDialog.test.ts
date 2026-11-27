// @vitest-environment jsdom
//
// `urlState`: o formulário de criar/editar na query (`novo=1`, `abrir=<pk>`) — F5 e link reabrem.
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import WCrudView from './WCrudView.vue'
import { useCrudManager } from '@/composables/useCrudManager'
import { W_DATA_PROVIDER_KEY, W_CONFIG_KEY } from '@/types/plugin'
import type { CrudManagerConfig } from '@/types/manager'
import type { DataProvider } from '@/types/dataProvider'
import { resetWarnOnce } from '@/utils/warnOnce'

const { toast, confirmDiscard } = vi.hoisted(() => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
  confirmDiscard: vi.fn(),
}))
vi.mock('@/composables/useAppToast', () => ({ useAppToast: () => toast }))
vi.mock('@/composables/useAppConfirm', () => ({
  useAppConfirm: () => ({ confirmDelete: vi.fn(), confirmAction: vi.fn(), confirmDiscard }),
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
beforeEach(() => {
  toast.warn.mockReset()
  confirmDiscard.mockReset()
})

type Linha = Record<string, unknown>
const BANCO: Record<string, Linha> = {
  '1': { id: 1, nome: 'Soja' },
  '2': { id: 2, nome: 'Milho' },
  '50': { id: 50, nome: 'Trigo' }, // fora da página carregada
}
const naoAchou = () => Promise.reject({ response: { status: 404, data: { detail: 'Not found.' } } })

async function montar(
  url: string,
  {
    props = {},
    config = {},
    get,
  }: {
    props?: Record<string, unknown>
    config?: Partial<CrudManagerConfig<Linha>>
    get?: (e: string, id: string | number) => Promise<{ data: Linha }>
  } = {},
) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/lista', component: { template: '<div />' } },
      { path: '/outra', component: { template: '<div />' } },
    ],
  })
  await router.push(url)
  const list = vi.fn().mockResolvedValue({
    data: [BANCO['1'], BANCO['2']],
    page: 1,
    page_size: 20,
    rows: 2,
  })
  const getFn = vi.fn(
    get ??
      (async (_e: string, id: string | number) =>
        BANCO[id] ? { data: { ...BANCO[id] } } : naoAchou()),
  )
  const update = vi.fn(async (_e: string, id: string | number, body: Linha) => ({
    data: { ...BANCO[id], ...body },
  }))
  const provider: Partial<DataProvider> = { list, get: getFn, update } as Partial<DataProvider>
  let crud!: ReturnType<typeof useCrudManager<Linha>>
  const Host = defineComponent({
    setup() {
      crud = useCrudManager<Linha>({
        endpoint: '/itens',
        columns: [{ field: 'nome', header: 'Nome' }],
        form: [{ field: 'nome', label: 'Nome', type: 'text' }],
        ...config,
      })
      return () => h(WCrudView, { crud, title: 'Itens', ...props })
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
  const query = () => router.currentRoute.value.query
  return { w, router, get: getFn, query, crud: () => crud }
}

/** Promessa resolvida à mão, para a corrida. */
function adiada<T>() {
  let resolve!: (v: T) => void
  const promise = new Promise<T>((r) => (resolve = r))
  return { promise, resolve }
}

describe('WCrudView — formulário na URL', () => {
  it('grava novo=1 ao criar e limpa ao fechar', async () => {
    const { w, query, crud } = await montar('/lista')
    crud().openCreateDialog()
    await flushPromises()
    expect(query()).toEqual({ novo: '1' })
    crud().dialogVisible.value = false
    await flushPromises()
    expect(query()).toEqual({})
    w.unmount()
  })

  it('duplicar também grava novo=1', async () => {
    const { w, query, crud } = await montar('/lista')
    crud().openDuplicateDialog(BANCO['1'])
    await flushPromises()
    expect(query()).toEqual({ novo: '1' })
    w.unmount()
  })

  it('grava abrir=<pk> ao editar e limpa ao fechar e ao salvar', async () => {
    const { w, query, crud } = await montar('/lista')
    crud().openEditDialog(crud().items.value[1])
    await flushPromises()
    expect(query()).toEqual({ abrir: '2' })
    crud().dialogVisible.value = false
    await flushPromises()
    expect(query()).toEqual({})
    crud().openEditDialog(crud().items.value[1])
    await flushPromises()
    crud().formData.nome = 'Milho safrinha'
    await crud().save()
    await flushPromises()
    expect(crud().dialogVisible.value).toBe(false)
    expect(query()).toEqual({})
    w.unmount()
  })

  it('restaura novo=1 abrindo o formulário de criar', async () => {
    const { w, crud, query } = await montar('/lista?novo=1')
    expect(crud().dialogVisible.value).toBe(true)
    expect(crud().editingItem.value).toBeNull()
    expect(query()).toEqual({ novo: '1' })
    w.unmount()
  })

  it('restaura abrir buscando por id um registro fora da página atual', async () => {
    const { w, crud, get, query } = await montar('/lista?abrir=50', {
      config: { fetchDetailOnEdit: true },
    })
    expect(get).toHaveBeenCalledTimes(1) // o detalhe buscado não é buscado de novo
    expect(get).toHaveBeenCalledWith('/itens', '50')
    expect(crud().dialogVisible.value).toBe(true)
    expect(crud().isEditing.value).toBe(true)
    expect(crud().editingItem.value).toMatchObject({ id: 50, nome: 'Trigo' })
    expect(query()).toEqual({ abrir: '50' })
    w.unmount()
  })

  it('id inexistente não abre, limpa a chave e avisa com mensagem genérica', async () => {
    const { w, crud, query } = await montar('/lista?abrir=99&page=1')
    expect(crud().dialogVisible.value).toBe(false)
    expect(query()).toEqual({ page: '1' })
    expect(toast.warn).toHaveBeenCalledWith('Registro não encontrado.')
    w.unmount()
  })

  it('abrir ganha de novo; novo sai da URL', async () => {
    const { w, crud, query } = await montar('/lista?novo=1&abrir=2')
    expect(crud().editingItem.value).toMatchObject({ id: 2 })
    expect(query()).toEqual({ abrir: '2' })
    w.unmount()
  })

  it('sem criar: novo=1 é limpo sem aviso', async () => {
    const { w, crud, query } = await montar('/lista?novo=1', { config: { canCreate: false } })
    expect(crud().dialogVisible.value).toBe(false)
    expect(query()).toEqual({})
    expect(toast.warn).not.toHaveBeenCalled()
    w.unmount()
  })

  it('sem editar e com a ação view: abrir abre em visualização', async () => {
    const { w, crud } = await montar('/lista?abrir=2', {
      config: { canEdit: false, rowActions: [{ action: 'view', icon: 'pi pi-eye' }] },
    })
    expect(crud().isViewing.value).toBe(true)
    expect(crud().editingItem.value).toMatchObject({ id: 2 })
    w.unmount()
  })

  it('formulário próprio (canCreate e canEdit falsos): não lê, não escreve, não limpa', async () => {
    const { w, crud, get, query } = await montar('/lista?abrir=2&novo=1', {
      config: { canCreate: false, canEdit: false },
    })
    expect(get).not.toHaveBeenCalled()
    expect(crud().dialogVisible.value).toBe(false)
    expect(query()).toEqual({ abrir: '2', novo: '1' })
    crud().openViewDialog(BANCO['1'])
    await flushPromises()
    expect(query()).toEqual({ abrir: '2', novo: '1' })
    w.unmount()
  })

  it('abrir muda por fora com o diálogo limpo: troca de registro', async () => {
    const { w, crud, router } = await montar('/lista?abrir=1')
    expect(crud().editingItem.value).toMatchObject({ id: 1 })
    await router.replace({ path: '/lista', query: { abrir: '2' } })
    await flushPromises()
    expect(confirmDiscard).not.toHaveBeenCalled()
    expect(crud().dialogVisible.value).toBe(true)
    expect(crud().editingItem.value).toMatchObject({ id: 2 })
    w.unmount()
  })

  it('abrir some por fora com o formulário alterado e a pessoa fica: diálogo e chave voltam', async () => {
    confirmDiscard.mockResolvedValue(false)
    const { w, crud, router, query } = await montar('/lista?abrir=1')
    crud().formData.nome = 'Alterado'
    await router.replace({ path: '/lista', query: {} })
    await flushPromises()
    expect(confirmDiscard).toHaveBeenCalledTimes(1)
    expect(crud().dialogVisible.value).toBe(true)
    expect(crud().formData.nome).toBe('Alterado')
    expect(query()).toEqual({ abrir: '1' })
    w.unmount()
  })

  it('abrir some por fora com o formulário alterado e a pessoa descarta: fecha', async () => {
    confirmDiscard.mockResolvedValue(true)
    const { w, crud, router, query } = await montar('/lista?abrir=1')
    crud().formData.nome = 'Alterado'
    await router.replace({ path: '/lista', query: {} })
    await flushPromises()
    expect(crud().dialogVisible.value).toBe(false)
    expect(query()).toEqual({})
    w.unmount()
  })

  it('sair para outra rota com o diálogo aberto não fecha nem pergunta', async () => {
    const { w, crud, router } = await montar('/lista?abrir=1')
    crud().formData.nome = 'Alterado'
    await router.push('/outra')
    await flushPromises()
    expect(confirmDiscard).not.toHaveBeenCalled()
    expect(crud().dialogVisible.value).toBe(true)
    w.unmount()
  })

  it('em dev, dois sem prefixo na mesma rota avisam', async () => {
    resetWarnOnce()
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const a = await montar('/lista')
    expect(warn).not.toHaveBeenCalled()
    const b = await montar('/lista')
    expect(warn.mock.calls.some(([m]) => String(m).includes('sem prefixo'))).toBe(true)
    warn.mockRestore()
    a.w.unmount()
    b.w.unmount()
  })

  it('corrida A → B antes de A responder: termina com B aberto', async () => {
    const a = adiada<{ data: Linha }>()
    const b = adiada<{ data: Linha }>()
    const { w, crud, router, query } = await montar('/lista?abrir=1', {
      get: (_e, id) => (String(id) === '1' ? a.promise : b.promise),
    })
    await router.replace({ path: '/lista', query: { abrir: '2' } })
    await flushPromises()
    // A responde primeiro, já superado: não pode abrir (senão o B acharia o diálogo ocupado).
    a.resolve({ data: { ...BANCO['1'] } })
    await flushPromises()
    expect(crud().dialogVisible.value).toBe(false)
    b.resolve({ data: { ...BANCO['2'] } })
    await flushPromises()
    expect(crud().editingItem.value).toMatchObject({ id: 2 })
    expect(query()).toEqual({ abrir: '2' })
    w.unmount()
  })

  it('desmontar no meio da busca não abre nem escreve', async () => {
    const a = adiada<{ data: Linha }>()
    const { w, crud, router } = await montar('/lista?abrir=1', { get: () => a.promise })
    const replace = vi.spyOn(router, 'replace')
    w.unmount()
    a.resolve({ data: { ...BANCO['1'] } })
    await flushPromises()
    expect(crud().dialogVisible.value).toBe(false)
    expect(replace).not.toHaveBeenCalled()
  })

  it('com prefixo, só as chaves do prefixo', async () => {
    const { w, crud, get, query } = await montar('/lista?orc_abrir=2&abrir=1', {
      props: { urlState: 'orc' },
    })
    expect(get).toHaveBeenCalledWith('/itens', '2')
    expect(crud().editingItem.value).toMatchObject({ id: 2 })
    crud().dialogVisible.value = false
    await flushPromises()
    expect(query()).toEqual({ abrir: '1' })
    w.unmount()
  })

  it('urlState false: não lê nem escreve', async () => {
    const { w, crud, get, query } = await montar('/lista?abrir=2', { props: { urlState: false } })
    expect(get).not.toHaveBeenCalled()
    crud().openCreateDialog()
    await flushPromises()
    expect(query()).toEqual({ abrir: '2' })
    w.unmount()
  })

  it('a escrita do próprio componente não reabre nem busca', async () => {
    const { w, crud, get, router } = await montar('/lista')
    const open = vi.spyOn(crud(), 'openEditDialog')
    crud().openEditDialog(crud().items.value[0])
    await flushPromises()
    crud().dialogVisible.value = false
    await flushPromises()
    expect(get).not.toHaveBeenCalled()
    expect(open).toHaveBeenCalledTimes(1)
    expect(crud().dialogVisible.value).toBe(false)
    expect(router.currentRoute.value.query).toEqual({})
    w.unmount()
  })
})

describe('WCrudView — id da URL validado', () => {
  it.each(['../../x', 'a?b=1', 'a/b', 'a#b'])(
    'abrir=%s: sem pedido, sem diálogo, chave limpa',
    async (v) => {
      const { w, crud, get, query } = await montar(`/lista?abrir=${encodeURIComponent(v)}&page=1`)
      expect(get).not.toHaveBeenCalled()
      expect(crud().dialogVisible.value).toBe(false)
      expect(query()).toEqual({ page: '1' })
      expect(toast.warn).not.toHaveBeenCalled()
      w.unmount()
    },
  )

  it('abrir inválido por fora (query muda depois): mesma regra', async () => {
    const { w, crud, get, router, query } = await montar('/lista')
    await router.replace({ path: '/lista', query: { abrir: '../../x' } })
    await flushPromises()
    expect(get).not.toHaveBeenCalled()
    expect(crud().dialogVisible.value).toBe(false)
    expect(query()).toEqual({})
    w.unmount()
  })

  it('uuid e inteiro seguem funcionando', async () => {
    const uuid = '0190a1b2-c3d4-7e5f-8a9b-0c1d2e3f4a5b'
    BANCO[uuid] = { id: uuid, nome: 'U' }
    const a = await montar(`/lista?abrir=${uuid}`)
    expect(a.get).toHaveBeenCalledWith('/itens', uuid)
    expect(a.crud().dialogVisible.value).toBe(true)
    a.w.unmount()
    delete BANCO[uuid]
    const b = await montar('/lista?abrir=42', {
      get: async () => ({ data: { id: 42, nome: 'X' } }),
    })
    expect(b.get).toHaveBeenCalledWith('/itens', '42')
    expect(b.crud().dialogVisible.value).toBe(true)
    b.w.unmount()
  })
})
