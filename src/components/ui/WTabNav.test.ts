// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { defineComponent } from 'vue'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { createMemoryHistory, createRouter, type Router } from 'vue-router'
import WTabNav, { abasNaFaixa } from './WTabNav.vue'
import { useRouteTabs } from '@/composables/useRouteTabs'
import type { RouteTabsApi, UseRouteTabsOptions } from '@/types/routeTabs'

// jsdom não implementa matchMedia e o ContextMenu do PrimeVue consulta na montagem
window.matchMedia ??= ((query: string) =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }) as MediaQueryList) as typeof window.matchMedia

const Tela = defineComponent({ name: 'Tela', render: () => null })

let router: Router
let api: RouteTabsApi

function montar(
  resolveTabMeta: UseRouteTabsOptions['resolveTabMeta'] = (r) => ({
    title: String(r.name),
    icon: 'pi pi-file',
    closable: r.path !== '/a',
  }),
): VueWrapper {
  router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Tela },
      { path: '/a', name: 'a', component: Tela },
      { path: '/b', name: 'b', component: Tela },
      { path: '/c', name: 'c', component: Tela },
      { path: '/d', name: 'd', component: Tela },
    ],
  })
  // '/' fica fora das abas para a navegação inicial não deslocar os índices
  api = useRouteTabs({
    router,
    storage: null,
    isTabRoute: (r) => r.path !== '/',
    resolveTabMeta,
  })
  return mount(WTabNav, {
    props: { tabs: api },
    global: { plugins: [router, PrimeVue] },
    attachTo: document.body,
  })
}

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('WTabNav — render', () => {
  it('uma aba por rota aberta, com ícone, título e marcação da ativa', async () => {
    const w = montar()
    await router.push('/a')
    await router.push('/b')
    await flushPromises()
    const abas = w.findAll('[role="tab"]')
    expect(abas).toHaveLength(2)
    expect(abas[0].find('i.pi-file').exists()).toBe(true)
    expect(abas[0].find('.w-tab-nav__title').text()).toBe('a')
    expect(abas[1].attributes('aria-selected')).toBe('true')
    expect(abas[0].attributes('aria-selected')).toBe('false')
  })

  it('rótulo do grupo aparece uma vez antes do bloco de abas dele', async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: Tela },
        { path: '/a', name: 'a', component: Tela },
        { path: '/b', name: 'b', component: Tela },
      ],
    })
    api = useRouteTabs({
      router,
      storage: null,
      isTabRoute: (r) => r.path !== '/',
      resolveTabMeta: (r) => ({ title: String(r.name), group: 'Sementes' }),
    })
    const w = mount(WTabNav, {
      props: { tabs: api },
      global: { plugins: [router, PrimeVue] },
      attachTo: document.body,
    })
    await router.push('/a')
    await router.push('/b')
    await flushPromises()
    const grupos = w.findAll('.w-tab-nav__group')
    expect(grupos).toHaveLength(1)
    expect(grupos[0].text()).toBe('Sementes')
  })

  it('aba com grupo recebe a cor derivada (estável) e o rótulo ganha a mesma cor', async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: Tela },
        { path: '/a', name: 'a', component: Tela },
        { path: '/b', name: 'b', component: Tela },
      ],
    })
    api = useRouteTabs({
      router,
      storage: null,
      isTabRoute: (r) => r.path !== '/',
      resolveTabMeta: (r) =>
        r.path === '/a'
          ? { title: 'a', group: 'Sementes' }
          : { title: 'b', group: 'Estoque', color: 'rebeccapurple' },
    })
    const w = mount(WTabNav, {
      props: { tabs: api },
      global: { plugins: [router, PrimeVue] },
      attachTo: document.body,
    })
    await router.push('/a')
    await router.push('/b')
    await flushPromises()
    const abas = w.findAll('[role="tab"]')
    const grupos = w.findAll('.w-tab-nav__group')
    const corA = (abas[0].element as HTMLElement).style.getPropertyValue('--w-tab-group-color')
    // Série N (1..6): token do app → série categórica da suíte (--w-viz-N, tokens.css)
    expect(corA).toMatch(/^var\(--w-tab-group-([1-6]), var\(--w-viz-\1\)\)$/)
    expect((grupos[0].element as HTMLElement).style.getPropertyValue('--w-tab-group-color')).toBe(
      corA,
    )
    // Cor explícita na rota vence a derivada
    expect((abas[1].element as HTMLElement).style.getPropertyValue('--w-tab-group-color')).toBe(
      'rebeccapurple',
    )
  })

  const corDe = (aba: { element: Element }): string =>
    (aba.element as HTMLElement).style.getPropertyValue('--w-tab-group-color')

  it('aba sem grupo e sem cor ganha a série derivada da chave, e o ícone a recebe', async () => {
    const w = montar()
    await router.push('/a')
    await router.push('/b')
    await flushPromises()
    const abas = w.findAll('[role="tab"]')
    // Valor fixado de propósito: o hash da chave não pode mudar entre versões (a cor volta igual).
    expect(corDe(abas[0])).toBe('var(--w-tab-group-1, var(--w-viz-1))')
    expect(corDe(abas[1])).toBe('var(--w-tab-group-2, var(--w-viz-2))')
    // O CSS pinta `.w-tab-nav__item > i`: o ícone da aba precisa ser filho direto do item.
    expect(abas[0].element.querySelector('i.pi-file')?.parentElement).toBe(abas[0].element)
  })

  it('color da rota vence a série derivada também na aba sem grupo', async () => {
    const w = montar((r) => ({
      title: String(r.name),
      icon: 'pi pi-file',
      color: r.path === '/a' ? 'rebeccapurple' : undefined,
    }))
    await router.push('/a')
    await router.push('/b')
    await flushPromises()
    const abas = w.findAll('[role="tab"]')
    expect(corDe(abas[0])).toBe('rebeccapurple')
    expect(corDe(abas[1])).toBe('var(--w-tab-group-2, var(--w-viz-2))')
  })

  it('aba closable: false não mostra o X', async () => {
    const w = montar()
    await router.push('/a')
    await router.push('/b')
    await flushPromises()
    const abas = w.findAll('[role="tab"]')
    expect(abas[0].find('.w-tab-nav__close').exists()).toBe(false)
    expect(abas[1].find('.w-tab-nav__close').exists()).toBe(true)
  })
})

describe('WTabNav — ações', () => {
  it('clique ativa a aba (navega para o fullPath dela)', async () => {
    const w = montar()
    await router.push('/a')
    await router.push('/b')
    await flushPromises()
    await w.findAll('[role="tab"]')[0].trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/a')
    expect(w.emitted('activate')?.[0]?.[0]).toMatchObject({ key: '/a' })
  })

  it('X fecha a aba sem ativá-la', async () => {
    const w = montar()
    await router.push('/b')
    await router.push('/a')
    await flushPromises()
    await w.findAll('[role="tab"]')[0].find('.w-tab-nav__close').trigger('click')
    await flushPromises()
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/a'])
    expect(router.currentRoute.value.path).toBe('/a')
    expect(w.emitted('close')?.[0]?.[0]).toMatchObject({ key: '/b' })
  })

  it('botão do meio fecha a aba', async () => {
    const w = montar()
    await router.push('/b')
    await router.push('/a')
    await flushPromises()
    await w.findAll('[role="tab"]')[0].trigger('auxclick', { button: 1 })
    await flushPromises()
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/a'])
  })

  it('←/→ circulam entre as abas ativando', async () => {
    const w = montar()
    await router.push('/a')
    await router.push('/b')
    await flushPromises()
    await w.findAll('[role="tab"]')[1].trigger('keydown', { key: 'ArrowRight' })
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/a')
  })

  it('menu de contexto abre com recarregar/fechar/fechar outras/fechar todas', async () => {
    const w = montar()
    await router.push('/a')
    await flushPromises()
    await w.findAll('[role="tab"]')[0].trigger('contextmenu')
    await flushPromises()
    const rotulos = Array.from(document.querySelectorAll('[data-pc-section="itemlabel"]')).map(
      (el) => el.textContent,
    )
    expect(rotulos).toEqual(['Recarregar', 'Fechar', 'Fechar outras', 'Fechar todas'])
  })

  it('botão ⋮ abre o mesmo menu sem ativar a aba', async () => {
    const w = montar()
    await router.push('/b')
    await router.push('/a')
    await flushPromises()
    await w.findAll('[role="tab"]')[0].find('.w-tab-nav__menu').trigger('click')
    await flushPromises()
    const rotulos = Array.from(document.querySelectorAll('[data-pc-section="itemlabel"]')).map(
      (el) => el.textContent,
    )
    expect(rotulos).toEqual(['Recarregar', 'Fechar', 'Fechar outras', 'Fechar todas'])
    expect(router.currentRoute.value.path).toBe('/a')
    expect(w.emitted('activate')).toBeUndefined()
  })
})

describe('abasNaFaixa — prioridade+', () => {
  it('cabe tudo: todas ficam e o "Mais" não é reservado', () => {
    expect(abasNaFaixa([100, 100, 100], 300, 0, 60)).toEqual([true, true, true])
  })

  it('não cabe: reserva o "Mais" e tira do fim para o começo', () => {
    expect(abasNaFaixa([100, 100, 100, 100], 260, 0, 60)).toEqual([true, true, false, false])
  })

  it('ativa no fim fica na faixa; saem as do meio', () => {
    expect(abasNaFaixa([100, 100, 100, 100], 260, 3, 60)).toEqual([true, false, false, true])
  })

  it('só cabe a ativa: ela fica mesmo sem caber', () => {
    expect(abasNaFaixa([100, 100, 100], 120, 1, 60)).toEqual([false, true, false])
    expect(abasNaFaixa([100, 100], 40, 0, 60)).toEqual([true, false])
  })

  it('nenhuma aba, ou nenhuma ativa', () => {
    expect(abasNaFaixa([], 100, -1, 60)).toEqual([])
    expect(abasNaFaixa([100, 100], 120, -1, 60)).toEqual([false, false])
  })

  it('rótulo do grupo conta enquanto houver aba dele na faixa', () => {
    // Dois grupos de duas abas (rótulos de 50 nas abas 0 e 2); sem os rótulos caberiam 3 abas.
    const larguras = [100, 100, 100, 100]
    const rotulos = [50, 0, 50, 0]
    const blocos = [0, 0, 2, 2]
    expect(abasNaFaixa(larguras, 400, 0, 60, rotulos, blocos)).toEqual([true, true, false, false])
    // A ativa segura o rótulo do grupo dela mesmo com a primeira aba do grupo fora da faixa.
    expect(abasNaFaixa(larguras, 250, 3, 60, rotulos, blocos)).toEqual([false, false, false, true])
  })
})

describe('WTabNav — quando as abas não cabem', () => {
  // jsdom não calcula layout: a barra, cada aba, cada rótulo de grupo e o "Mais" medem o que o teste diz.
  let redimensionar: () => void = () => undefined

  function medir(barra: number): void {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const width = this.classList.contains('w-tab-nav')
        ? barra
        : this.getAttribute('role') === 'tab'
          ? 100
          : this.classList.contains('w-tab-nav__more')
            ? 60
            : this.classList.contains('w-tab-nav__group')
              ? 50
              : 0
      return { left: 0, right: width, top: 0, bottom: 0, width, height: 0 } as DOMRect
    })
  }

  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: () => void) {
          redimensionar = cb
        }
        observe(): void {}
        disconnect(): void {}
      },
    )
  })
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  /** Quatro abas de 100 numa barra de `barra` px; a ativa é a última aberta. */
  async function abrir(
    barra: number,
    meta?: UseRouteTabsOptions['resolveTabMeta'],
    ordem = ['/a', '/b', '/c', '/d'],
  ): Promise<VueWrapper> {
    medir(barra)
    const w = montar(meta)
    for (const rota of ordem) await router.push(rota)
    await flushPromises()
    return w
  }
  const naFaixa = (w: VueWrapper): string[] =>
    w.findAll('[role="tab"]:not([hidden])').map((aba) => aba.find('.w-tab-nav__title').text())
  const noMenu = (): HTMLElement[] => Array.from(document.querySelectorAll('[role="menuitem"]'))

  it('"Mais (n)" aparece com a contagem das abas que saíram da faixa', async () => {
    const w = await abrir(260)
    const mais = w.find('.w-tab-nav__more')
    expect(naFaixa(w)).toEqual(['a', 'd'])
    expect(mais.attributes('hidden')).toBeUndefined()
    expect(mais.attributes('aria-label')).toBe('Mais abas (2)')
    expect(mais.attributes('aria-haspopup')).toBe('menu')
    expect(mais.attributes('aria-expanded')).toBe('false')
    expect(mais.find('.w-tab-nav__more-count').text()).toBe('2')
  })

  it('a barra alarga: as abas voltam à faixa e o "Mais" some', async () => {
    const w = await abrir(260)
    medir(1000)
    redimensionar()
    await flushPromises()
    expect(naFaixa(w)).toEqual(['a', 'b', 'c', 'd'])
    expect(w.find('.w-tab-nav__more').attributes('hidden')).toBeDefined()
  })

  it('a aba ativa nunca sai da faixa, nem quando só ela cabe', async () => {
    const w = await abrir(120)
    expect(naFaixa(w)).toEqual(['d'])
    expect(w.find('[aria-selected="true"]').attributes('hidden')).toBeUndefined()
    expect(w.find('.w-tab-nav__more').attributes('aria-label')).toBe('Mais abas (3)')
  })

  it('item do menu ativa a aba, que passa a ocupar a faixa', async () => {
    const w = await abrir(260)
    await w.find('.w-tab-nav__more').trigger('click')
    await flushPromises()
    expect(noMenu().map((item) => item.textContent?.trim())).toEqual(['b', 'c'])
    noMenu()[0].querySelector('a')?.click()
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/b')
    expect(w.emitted('activate')?.[0]?.[0]).toMatchObject({ key: '/b' })
    expect(naFaixa(w)).toEqual(['a', 'b'])
  })

  it('X do item do menu fecha a aba sem ativá-la', async () => {
    const w = await abrir(260)
    await w.find('.w-tab-nav__more').trigger('click')
    await flushPromises()
    noMenu()[0].querySelector<HTMLElement>('.w-tab-nav__close')?.click()
    await flushPromises()
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/a', '/c', '/d'])
    expect(w.emitted('close')?.[0]?.[0]).toMatchObject({ key: '/b' })
    expect(router.currentRoute.value.path).toBe('/d')
  })

  it('←/→ circulam só pelas abas da faixa', async () => {
    const w = await abrir(260)
    await w.find('[aria-selected="true"]').trigger('keydown', { key: 'ArrowLeft' })
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/a')
  })

  it('rótulo do grupo sai com a última aba dele; no menu, as abas vêm sob o nome do grupo', async () => {
    const w = await abrir(240, (r) => ({
      title: String(r.name),
      group: r.path < '/c' ? 'Sementes' : 'Estoque',
    }))
    expect(naFaixa(w)).toEqual(['d'])
    const rotulos = w.findAll('.w-tab-nav__group')
    expect(rotulos.map((r) => r.text())).toEqual(['Sementes', 'Estoque'])
    expect(rotulos[0].attributes('hidden')).toBeDefined()
    expect(rotulos[1].attributes('hidden')).toBeUndefined()
    await w.find('.w-tab-nav__more').trigger('click')
    await flushPromises()
    const grupos = Array.from(document.querySelectorAll('[data-pc-section="submenulabel"]'))
    expect(grupos.map((g) => g.textContent?.trim())).toEqual(['Sementes', 'Estoque'])
    expect(noMenu().map((item) => item.textContent?.trim())).toEqual(['a', 'b', 'c'])
  })
})
