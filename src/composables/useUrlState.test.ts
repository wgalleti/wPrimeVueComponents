// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter, RouterView, useRoute, type Router } from 'vue-router'
import WTabViewport from '@/components/ui/WTabViewport.vue'
import { useRouteTabs } from './useRouteTabs'
import { useUrlState, type UrlState } from './useUrlState'
import type { RouteTabsApi } from '@/types/routeTabs'

// Cada tela montada guarda o seu UrlState pelo path em que nasceu (a última instância vence).
let estados: Record<string, UrlState | null>
const Tela = defineComponent({
  setup() {
    const path = useRoute().path
    estados[path] = useUrlState()
    return () => h('div')
  },
})

let router: Router
let api: RouteTabsApi

function criarRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/a', '/b'].map((path) => ({ path, component: Tela })),
  })
}

function montarComAbas(): void {
  router = criarRouter()
  api = useRouteTabs({ router, storage: null, isTabRoute: (r) => r.path !== '/' })
  mount(WTabViewport, { props: { tabs: api }, global: { plugins: [router] } })
}

async function ir(to: string): Promise<void> {
  await router.push(to)
  await flushPromises()
}

beforeEach(() => {
  estados = {}
})

describe('useUrlState — dentro de abas de rota', () => {
  it('lê a rota da aba, não a global — inclusive ao recarregar a aba oculta', async () => {
    montarComAbas()
    await ir('/a?k=1')
    await ir('/b?k=2')
    expect(estados['/a']?.get('k')).toBe('1')

    const antes = estados['/a']
    api.reload('/a')
    await flushPromises()
    expect(estados['/a']).not.toBe(antes) // remontou oculta
    expect(estados['/a']?.get('k')).toBe('1')
    expect(router.currentRoute.value.fullPath).toBe('/b?k=2')
  })

  it('ref() reage à query na aba ativa e fica parada na aba oculta', async () => {
    montarComAbas()
    await ir('/a?k=1')
    const k = estados['/a']!.ref('k')
    await ir('/a?k=3')
    expect(k.value).toBe('3')
    await ir('/b?k=7')
    expect(k.value).toBe('3')
    await ir('/a')
    expect(k.value).toBeUndefined()
  })

  it('escreve na URL quando a aba é a ativa', async () => {
    montarComAbas()
    await ir('/a?x=1')
    estados['/a']!.write({ k: '5' })
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/a?x=1&k=5')
  })

  it('escrita da aba oculta não toca a URL e é aplicada quando a aba volta', async () => {
    montarComAbas()
    await ir('/a?k=1')
    await ir('/b')
    estados['/a']!.write({ k: '9' })
    estados['/a']!.write({ y: '2' })
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/b')

    await api.activate('/a')
    await flushPromises()
    expect(router.currentRoute.value.query).toEqual({ k: '9', y: '2' })
    expect(api.tabs.value.find((t) => t.key === '/a')?.fullPath).toBe('/a?k=9&y=2')
  })

  it('aba que volta por link com outra URL descarta a escrita guardada', async () => {
    montarComAbas()
    await ir('/a?k=1')
    await ir('/b')
    estados['/a']!.write({ k: '9' })
    await ir('/a?k=5')
    expect(router.currentRoute.value.fullPath).toBe('/a?k=5')
    expect(estados['/a']!.get('k')).toBe('5')
  })
})

describe('useUrlState — fora de abas', () => {
  it('lê e reage à rota global', async () => {
    router = criarRouter()
    mount(RouterView, { global: { plugins: [router] } })
    await ir('/a?k=1')
    const k = estados['/a']!.ref('k')
    expect(estados['/a']!.get('k')).toBe('1')
    await ir('/a?k=2')
    expect(k.value).toBe('2')
  })

  it('sem vue-router devolve null', () => {
    let estado: UrlState | null | undefined
    mount(defineComponent({ setup: () => ((estado = useUrlState('', false)), () => h('div')) }))
    expect(estado).toBeNull()
  })
})
