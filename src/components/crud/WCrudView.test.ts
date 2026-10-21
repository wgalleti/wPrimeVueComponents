// @vitest-environment jsdom
//
// Cobre o nome acessível dos botões só-ícone (toolbar, ações de linha, rail).
// Tooltip do PrimeVue não vira nome — cada um precisa de `aria-label`.
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
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

describe('WCrudView — slots do form dialog repassados pela tela', () => {
  function montarComSlots(
    slots: Record<string, () => unknown>,
    props: Record<string, unknown> = {},
  ) {
    const provider: Partial<DataProvider> = {
      list: vi.fn().mockResolvedValue({ data: [], page: 1, page_size: 20, rows: 0 }),
    }
    let crudRef: ReturnType<typeof useCrudManager<Linha>> | null = null
    const Host = defineComponent({
      setup() {
        const crud = useCrudManager<Linha>({
          endpoint: '/itens',
          columns: [{ field: 'nome', header: 'Nome' }],
          form: [
            { field: 'nome', label: 'Nome', type: 'text' },
            { field: 'foto', label: 'Foto', type: 'image' },
          ],
        })
        crudRef = crud
        return () => h(WCrudView, { crud, title: 'Itens', ...props }, slots)
      },
    })
    const w = mount(Host, {
      attachTo: document.body,
      global: {
        plugins: [PrimeVue],
        directives: { tooltip: Tooltip },
        provide: {
          [W_DATA_PROVIDER_KEY as symbol]: provider as DataProvider,
          [W_CONFIG_KEY as symbol]: { defaultPageSize: 20, locale: 'pt-BR', currency: 'BRL' },
        },
        stubs: { teleport: true },
      },
    })
    return { w, crud: crudRef! }
  }

  it('sem #aside o form do dialog fica em uma coluna', async () => {
    const { w, crud } = montarComSlots({})
    await flushPromises()
    crud.openCreateDialog()
    await w.vm.$nextTick()
    const form = w.find('form.w-crud-form')
    expect(form.exists()).toBe(true)
    expect(form.classes()).not.toContain('w-crud-form--with-aside')
    // Campo `image` sem slot próprio cai no upload padrão da suíte.
    expect(form.find('[role="group"] .w-imgcropper').exists()).toBe(true)
    w.unmount()
  })

  it('#image-<campo>, #after-fields e #aside chegam ao dialog, com a largura do painel', async () => {
    const { w, crud } = montarComSlots(
      {
        'image-foto': () => h('p', { class: 'upload-proprio' }, 'meu upload'),
        'after-fields': () => h('p', { class: 'previa' }, 'prévia'),
        aside: () => h('p', { class: 'painel' }, 'lateral'),
      },
      { asideWidth: '18rem' },
    )
    await flushPromises()
    crud.openCreateDialog()
    await w.vm.$nextTick()
    const form = w.find('form.w-crud-form')
    expect(form.classes()).toContain('w-crud-form--with-aside')
    expect((form.element as HTMLElement).style.getPropertyValue('--w-form-aside')).toBe('18rem')
    expect(form.find('.w-crud-form-main .upload-proprio').text()).toBe('meu upload')
    expect(form.find('.w-crud-form-main .previa').text()).toBe('prévia')
    expect(form.find('.w-crud-form-aside .painel').text()).toBe('lateral')
    w.unmount()
  })
})

describe('WCrudView — card pela largura da área da listagem', () => {
  type Callback = (entries: { target?: Element; contentRect: { width: number } }[]) => void
  let callbacks: Callback[] = []
  const desconectados = vi.fn()

  function instalarResizeObserver() {
    callbacks = []
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: Callback) {
          callbacks.push(cb)
        }
        observe() {}
        disconnect() {
          desconectados()
        }
      },
    )
    vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
      fn(0)
      return 1
    })
    vi.stubGlobal('cancelAnimationFrame', () => {})
  }

  async function largura(px: number) {
    for (const cb of callbacks) cb([{ contentRect: { width: px } }])
    await nextTick()
  }

  async function pronto(config = {}, props = {}) {
    const w = montar(config, props)
    await flushPromises()
    await nextTick()
    return w
  }

  const emCard = (w: ReturnType<typeof montar>) => w.find('.w-crud-cards-wrap').exists()
  const temAlternador = (w: ReturnType<typeof montar>) => w.find('.w-crud-view-toggle').exists()

  afterEach(() => {
    vi.unstubAllGlobals()
    localStorage.clear()
  })

  it('área abaixo de 840px vira card sem alternador; acima, tabela com alternador', async () => {
    instalarResizeObserver()
    const w = await pronto()
    await largura(700)
    expect(emCard(w)).toBe(true)
    expect(temAlternador(w)).toBe(false)
    await largura(900)
    expect(emCard(w)).toBe(false)
    expect(temAlternador(w)).toBe(true)
    w.unmount()
  })

  it('a janela não decide: matchMedia estreito com área larga continua tabela', async () => {
    instalarResizeObserver()
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
    const w = await pronto()
    await largura(900)
    expect(emCard(w)).toBe(false)
    w.unmount()
  })

  it('largura 0 (aba escondida) mantém o modo que estava', async () => {
    instalarResizeObserver()
    const w = await pronto()
    await largura(700)
    await largura(0)
    expect(emCard(w)).toBe(true)
    w.unmount()
  })

  // Decisão de produto: o piso não força card. Acima de 840 é tabela, que rola.
  it('acima de 840 com colunas que não cabem continua tabela, com piso para rolar', async () => {
    instalarResizeObserver()
    const w = await pronto({
      columns: [
        { field: 'nome', header: 'Nome' },
        { field: 'a', header: 'A', style: 'width: 40rem' },
      ],
    })
    await largura(900)
    expect(emCard(w)).toBe(false)
    expect(w.find('.w-crud-probe').exists()).toBe(false)
    expect(w.find('table').attributes('style')).toContain(
      '--w-crud-min: calc(var(--w-col-title-min) + 40rem)',
    )
    w.unmount()
  })

  it('volta para a tabela só com folga acima de 840 (sem oscilar na borda)', async () => {
    instalarResizeObserver()
    const w = await pronto()
    await largura(839)
    expect(emCard(w)).toBe(true)
    await largura(855)
    expect(emCard(w)).toBe(true)
    await largura(870)
    expect(emCard(w)).toBe(false)
    await largura(845)
    expect(emCard(w)).toBe(false)
    await largura(839)
    expect(emCard(w)).toBe(true)
    w.unmount()
  })

  // A área monta 2px estreita (barra lateral assentando) e cresce para 842: o card
  // da montagem não foi troca do observer, então não ganha folga e volta à tabela.
  it('card da montagem não ganha folga: área que cresce para 842 vira tabela', async () => {
    instalarResizeObserver()
    const original = HTMLElement.prototype.getBoundingClientRect
    HTMLElement.prototype.getBoundingClientRect = function () {
      const width = this.classList.contains('w-crud-content-main') ? 838 : 0
      return { width } as DOMRect
    }
    try {
      const w = await pronto()
      expect(emCard(w)).toBe(true)
      await largura(842)
      expect(emCard(w)).toBe(false)
      w.unmount()
    } finally {
      HTMLElement.prototype.getBoundingClientRect = original
    }
  })

  it('a preferência guardada sobrevive ao card forçado', async () => {
    instalarResizeObserver()
    localStorage.setItem('wcrud:view:itens', 'table')
    const w = await pronto({}, { persistState: 'itens' })
    await largura(700)
    expect(emCard(w)).toBe(true)
    expect(localStorage.getItem('wcrud:view:itens')).toBe('table')
    await largura(900)
    expect(emCard(w)).toBe(false)
    w.unmount()
  })

  // `fit`: lista embutida — só o piso da tabela decide, sem a régua de 840.
  describe('cardMode fit', () => {
    async function piso(w: ReturnType<typeof montar>, px: number) {
      const target = w.find('.w-crud-probe > div').element
      for (const cb of callbacks) cb([{ target, contentRect: { width: px } }])
      await nextTick()
    }

    it('área de 700 com colunas que cabem (piso 500) continua tabela com alternador', async () => {
      instalarResizeObserver()
      const w = await pronto({}, { cardMode: 'fit' })
      expect(w.find('.w-crud-probe').exists()).toBe(true)
      await piso(w, 500)
      await largura(700)
      expect(emCard(w)).toBe(false)
      expect(temAlternador(w)).toBe(true)
      w.unmount()
    })

    it('área abaixo do piso vira card sem alternador; volta à tabela com folga', async () => {
      instalarResizeObserver()
      const w = await pronto({}, { cardMode: 'fit' })
      await piso(w, 500)
      await largura(400)
      expect(emCard(w)).toBe(true)
      expect(temAlternador(w)).toBe(false)
      await largura(510)
      expect(emCard(w)).toBe(true)
      await largura(530)
      expect(emCard(w)).toBe(false)
      w.unmount()
    })

    it('piso desconhecido (0) nunca força card', async () => {
      instalarResizeObserver()
      const w = await pronto({}, { cardMode: 'fit' })
      await largura(300)
      expect(emCard(w)).toBe(false)
      w.unmount()
    })

    it('a sonda tem a largura do piso da tabela', async () => {
      instalarResizeObserver()
      const w = await pronto(
        {
          columns: [
            { field: 'nome', header: 'Nome' },
            { field: 'a', header: 'A', style: 'width: 40rem' },
          ],
        },
        { cardMode: 'fit' },
      )
      expect(w.find('.w-crud-probe > div').attributes('style')).toContain(
        'width: calc(var(--w-col-title-min) + 40rem)',
      )
      w.unmount()
    })
  })

  it('cardMode never ignora a largura e mantém o alternador', async () => {
    instalarResizeObserver()
    const w = await pronto({}, { cardMode: 'never' })
    await largura(500)
    expect(emCard(w)).toBe(false)
    expect(temAlternador(w)).toBe(true)
    expect(w.find('table').attributes('style')).toContain('--w-crud-min')
    w.unmount()
  })

  it('cardMode always é card mesmo largo, sem alternador', async () => {
    instalarResizeObserver()
    const w = await pronto({}, { cardMode: 'always' })
    await largura(1400)
    expect(emCard(w)).toBe(true)
    expect(temAlternador(w)).toBe(false)
    w.unmount()
  })

  it('no card, os registros são itens de uma lista nomeada pelo título', async () => {
    instalarResizeObserver()
    const w = await pronto({}, { cardMode: 'always' })
    const lista = w.find('[role="list"]')
    expect(lista.attributes('aria-label')).toBe('Itens')
    const itens = lista.findAll('[role="listitem"]')
    expect(itens).toHaveLength(1)
    expect(itens[0].text()).toContain('Soja')
    w.unmount()
  })

  it('desconecta o observer ao desmontar', async () => {
    instalarResizeObserver()
    desconectados.mockClear()
    const w = await pronto()
    w.unmount()
    expect(desconectados).toHaveBeenCalled()
  })

  it('sem ResizeObserver (SSR, jsdom) fica a tabela', async () => {
    vi.stubGlobal('ResizeObserver', undefined)
    const w = await pronto()
    expect(emCard(w)).toBe(false)
    w.unmount()
  })
})

describe('WCrudView — piso da tabela', () => {
  const colunas = [
    { field: 'codigo', header: 'Código', style: 'width: 8rem' },
    { field: 'nome', header: 'Nome' },
    { field: 'grupo', header: 'Grupo' },
    { field: 'motivo', header: 'Motivo', style: 'min-width: 20rem; width: 9rem' },
  ]

  async function pronto(config = {}, props = {}) {
    const w = montar({ columns: colunas, ...config }, props)
    await flushPromises()
    await w.vm.$nextTick()
    return w
  }

  it('o título é a primeira coluna sem largura: piso próprio e classe na tabela', async () => {
    const w = await pronto()
    expect(w.find('table').attributes('style')).toContain(
      '--w-crud-min: calc(8rem + var(--w-col-title-min) + var(--w-col-min) + 20rem)',
    )
    const titulos = w.findAll('th.w-crud-col-title')
    expect(titulos).toHaveLength(1)
    expect(titulos[0].text()).toContain('Nome')
    w.unmount()
  })

  it('a classe da coluna chega ao Column como string, sem aviso de tipo do Vue', async () => {
    const aviso = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const w = await pronto()
    const deClasse = aviso.mock.calls.filter(([m]) => /headerClass|bodyClass/.test(String(m)))
    expect(deClasse).toEqual([])
    aviso.mockRestore()
    w.unmount()
  })

  it('sem nenhuma coluna fluida o título é a primeira, com o maior entre o token e a declarada', async () => {
    const w = await pronto({
      columns: [{ field: 'codigo', header: 'Código', style: 'width: 8rem' }],
    })
    expect(w.find('table').attributes('style')).toContain(
      '--w-crud-min: calc(max(var(--w-col-title-min), 8rem))',
    )
    w.unmount()
  })

  it('seleção múltipla e coluna de ações (sem rail) entram no piso', async () => {
    const w = await pronto(
      { columns: [{ field: 'nome', header: 'Nome' }], selectionMode: 'multiple' },
      { actionRail: false },
    )
    expect(w.find('table').attributes('style')).toContain(
      '--w-crud-min: calc(var(--w-col-narrow) + var(--w-col-title-min) + 8.5rem)',
    )
    w.unmount()
  })

  it('o piso segue as colunas visíveis (coluna oculta pelo seletor sai do piso)', async () => {
    localStorage.setItem('wcrud:cols:itens', JSON.stringify({ hidden: ['grupo'] }))
    const w = await pronto({}, { persistState: 'itens' })
    expect(w.find('table').attributes('style')).toContain(
      '--w-crud-min: calc(8rem + var(--w-col-title-min) + 20rem)',
    )
    localStorage.clear()
    w.unmount()
  })
})
