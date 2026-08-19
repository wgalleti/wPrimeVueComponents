// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { defineComponent } from 'vue'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { createMemoryHistory, createRouter, type Router } from 'vue-router'
import WTabNav from './WTabNav.vue'
import { useRouteTabs } from '@/composables/useRouteTabs'
import type { RouteTabsApi } from '@/types/routeTabs'

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

function montar(): VueWrapper {
  router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Tela },
      { path: '/a', name: 'a', component: Tela },
      { path: '/b', name: 'b', component: Tela },
    ],
  })
  // '/' fica fora das abas para a navegação inicial não deslocar os índices
  api = useRouteTabs({
    router,
    storage: null,
    isTabRoute: (r) => r.path !== '/',
    resolveTabMeta: (r) => ({
      title: String(r.name),
      icon: 'pi pi-file',
      closable: r.path !== '/a',
    }),
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
})
