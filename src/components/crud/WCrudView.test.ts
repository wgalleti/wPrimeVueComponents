// @vitest-environment jsdom
//
// Cobre o nome acessível dos botões só-ícone (toolbar, ações de linha, rail).
// Tooltip do PrimeVue não vira nome — cada um precisa de `aria-label`.
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import WCrudView from './WCrudView.vue'
import { useCrudManager } from '@/composables/useCrudManager'
import { W_DATA_PROVIDER_KEY, W_CONFIG_KEY } from '@/types/plugin'
import type { DataProvider } from '@/types/dataProvider'
import type { CrudManagerConfig } from '@/types/manager'

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

function montar(
  config: Partial<CrudManagerConfig<Linha>> = {},
  props: Record<string, unknown> = {},
) {
  const provider: Partial<DataProvider> = {
    list: vi.fn().mockResolvedValue({
      data: [{ id: 1, nome: 'Soja', ativo: true }],
      page: 1,
      page_size: 20,
      rows: 1,
    }),
  }
  const Host = defineComponent({
    setup() {
      const crud = useCrudManager<Linha>({
        endpoint: '/itens',
        columns: [{ field: 'nome', header: 'Nome' }],
        form: [{ field: 'nome', label: 'Nome', type: 'text' }],
        ...config,
      })
      return () => h(WCrudView, { crud, title: 'Itens', ...props })
    },
  })
  return mount(Host, {
    attachTo: document.body,
    global: {
      plugins: [PrimeVue],
      directives: { tooltip: Tooltip },
      provide: {
        [W_DATA_PROVIDER_KEY as symbol]: provider as DataProvider,
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
}

/** Botões só-ícone (sem texto visível) que ficaram sem nome acessível. */
function semNome(root: Element): string[] {
  return Array.from(root.querySelectorAll('button'))
    .filter((b) => !b.textContent?.trim())
    .filter((b) => !b.getAttribute('aria-label') && !b.getAttribute('aria-labelledby'))
    .map((b) => b.className)
}

describe('WCrudView — nome acessível dos botões só-ícone', () => {
  it('toolbar (colunas, exportar, tabela/cards) e ações de linha têm aria-label', async () => {
    const w = montar(
      {},
      { exportCsv: true, csvScope: 'page', persistState: 'teste', views: ['table', 'cards'] },
    )
    await flushPromises()
    await w.vm.$nextTick()
    expect(semNome(w.element)).toEqual([])
    expect(w.find('[aria-label="Editar"]').exists()).toBe(true)
    expect(w.find('[aria-label="Duplicar"]').exists()).toBe(true)
    expect(w.find('[aria-label="Excluir"]').exists()).toBe(true)
    expect(w.find('[aria-label="Colunas"]').exists()).toBe(true)
    expect(w.find('[aria-label="Exportar página (CSV)"]').exists()).toBe(true)
    expect(w.find('[aria-label="Ver como tabela"]').attributes('aria-pressed')).toBe('true')
    expect(w.find('[aria-label="Ver como cards"]').attributes('aria-pressed')).toBe('false')
    expect(w.find('input[aria-label="Buscar"]').exists()).toBe(true)
    w.unmount()
  })

  it('rail: novo, ações (desabilitadas sem seleção), imprimir e exportar têm nome', async () => {
    const w = montar({}, { actionRail: true, showPrint: true, exportCsv: true, csvScope: 'all' })
    await flushPromises()
    await w.vm.$nextTick()
    const rail = w.find('.w-crud-rail')
    expect(semNome(rail.element)).toEqual([])
    expect(rail.find('[aria-label="Novo"]').exists()).toBe(true)
    expect(rail.find('[aria-label="Imprimir"]').attributes('disabled')).toBeDefined()
    expect(rail.find('[aria-label="Editar"]').attributes('disabled')).toBeDefined()
    expect(rail.find('[aria-label="Exportar tudo (CSV)"]').exists()).toBe(true)
    w.unmount()
  })

  it('action customizada sem tooltip usa o identificador como nome', async () => {
    const w = montar({
      rowActions: [
        { action: 'baixar', icon: 'pi pi-download', tooltip: 'Baixar' },
        { action: 'x', icon: 'pi pi-star' },
      ],
    })
    await flushPromises()
    await w.vm.$nextTick()
    expect(w.find('[aria-label="Baixar"]').exists()).toBe(true)
    expect(w.find('[aria-label="x"]').exists()).toBe(true)
    w.unmount()
  })
})

describe('WCrudView — contagem total junto ao título', () => {
  it('mostra o total do filtro ao lado do título, com aria-live', async () => {
    const w = montar()
    await flushPromises()
    await w.vm.$nextTick()
    const count = w.find('.w-crud-title-row .w-crud-count')
    expect(count.exists()).toBe(true)
    expect(count.text()).toBe('1 registro')
    expect(count.attributes('aria-live')).toBe('polite')
    expect(w.find('.w-crud-toolbar .w-crud-count').exists()).toBe(false)
    w.unmount()
  })

  it('sem header a contagem vai para a toolbar; hideCount desliga', async () => {
    const w = montar({}, { showHeader: false })
    await flushPromises()
    await w.vm.$nextTick()
    expect(w.find('.w-crud-toolbar .w-crud-count').text()).toBe('1 registro')

    const w2 = montar({}, { hideCount: true })
    await flushPromises()
    await w2.vm.$nextTick()
    expect(w2.find('.w-crud-count').exists()).toBe(false)
    w.unmount()
    w2.unmount()
  })

  it('paginador em pt-BR: "{first}–{last} de {totalRecords}"', async () => {
    const w = montar()
    await flushPromises()
    await w.vm.$nextTick()
    expect(w.find('.p-paginator-current').text()).toBe('1–1 de 1')
    w.unmount()
  })
})

describe('WCrudView — filtros de coluna moram na toolbar do grid', () => {
  const colunas = [
    { field: 'nome', header: 'Nome' },
    {
      field: 'status',
      header: 'Situação',
      filter: { type: 'select' as const, options: [{ label: 'Ativo', value: 'A' }] },
    },
    { field: 'ativo', header: 'Ativo', filter: { type: 'boolean' as const, param: 'is_ativo' } },
  ]

  it('tabela: filtros declarativos ficam na toolbar, ao lado da busca; nada fora dela', async () => {
    const w = montar({ columns: colunas })
    await flushPromises()
    await w.vm.$nextTick()
    const toolbar = w.find('.p-datatable-header .w-crud-toolbar-start')
    expect(toolbar.exists()).toBe(true)
    expect(toolbar.find('input[aria-label="Buscar"]').exists()).toBe(true)
    expect(toolbar.find('[aria-label="Situação"]').exists()).toBe(true)
    expect(toolbar.find('[aria-label="Ativo"]').exists()).toBe(true)
    expect(w.find('.w-crud-filters').exists()).toBe(false)
    // Fora do cabeçalho da tabela não há nenhum controle de filtro.
    expect(w.findAll('[aria-label="Situação"]')).toHaveLength(1)
    w.unmount()
  })

  it('cards: a mesma toolbar carrega os filtros', async () => {
    const w = montar({ columns: colunas }, { viewToggle: true, defaultView: 'cards' })
    await flushPromises()
    await w.vm.$nextTick()
    const toolbar = w.find('.w-crud-toolbar--standalone .w-crud-toolbar-start')
    expect(toolbar.exists()).toBe(true)
    expect(toolbar.find('[aria-label="Situação"]').exists()).toBe(true)
    expect(toolbar.find('input[aria-label="Buscar"]').exists()).toBe(true)
    w.unmount()
  })

  it('"Limpar filtros" aparece na toolbar só com filtro ativo', async () => {
    const w = montar({ columns: colunas })
    await flushPromises()
    await w.vm.$nextTick()
    const limpar = () =>
      w.findAll('.w-crud-toolbar-start button').find((b) => b.text() === 'Limpar filtros')
    expect(limpar()).toBeUndefined()
    const crud = w.findComponent(WCrudView).props('crud') as {
      setColumnFilter: (k: string, v: unknown) => void
      columnFilters: Record<string, unknown>
    }
    crud.setColumnFilter('is_ativo', true)
    await flushPromises()
    await w.vm.$nextTick()
    expect(limpar()).toBeDefined()
    await limpar()!.trigger('click')
    await flushPromises()
    expect(crud.columnFilters.is_ativo).toBeUndefined()
    expect(limpar()).toBeUndefined()
    w.unmount()
  })
})
