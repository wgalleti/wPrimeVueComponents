// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { defineComponent, h, type Ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter, RouterView, useRoute, type Router } from 'vue-router'
import WTabViewport from '@/components/ui/WTabViewport.vue'
import { useRouteTabs } from './useRouteTabs'
import { useUrlParam, type UseUrlParamOptions } from './useUrlParam'
import type { RouteTabsApi } from '@/types/routeTabs'

let params: Record<string, Ref<string | null>>
let opcoes: UseUrlParamOptions
const Tela = defineComponent({
  setup() {
    params[useRoute().path] = useUrlParam('k', opcoes)
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

async function ir(to: string): Promise<void> {
  await router.push(to)
  await flushPromises()
}

async function montarSimples(inicial: string): Promise<void> {
  router = criarRouter()
  await router.push(inicial)
  mount(RouterView, { global: { plugins: [router] } })
  await flushPromises()
}

beforeEach(() => {
  params = {}
  opcoes = {}
})

describe('useUrlParam', () => {
  it('lê a chave da URL; ausente é null', async () => {
    await montarSimples('/a?k=abc')
    expect(params['/a'].value).toBe('abc')
    await ir('/a')
    expect(params['/a'].value).toBeNull()
  })

  it('atribuir grava na URL e null remove a chave (sem empilhar histórico)', async () => {
    await montarSimples('/a?x=1')
    params['/a'].value = 'z'
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/a?x=1&k=z')
    expect(params['/a'].value).toBe('z')
    params['/a'].value = null
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/a?x=1')
    expect(params['/a'].value).toBeNull()
    router.back()
    await flushPromises()
    expect(router.currentRoute.value.fullPath).not.toContain('k=')
  })

  it('reage à query que muda com a tela montada', async () => {
    await montarSimples('/a?k=1')
    await ir('/a?k=2')
    expect(params['/a'].value).toBe('2')
    await ir('/a')
    expect(params['/a'].value).toBeNull()
  })

  it('accept: valor recusado vira null e sai da URL', async () => {
    opcoes = { accept: (v) => /^\d+$/.test(v) }
    await montarSimples('/a?k=drop')
    await flushPromises()
    expect(params['/a'].value).toBeNull()
    expect(router.currentRoute.value.fullPath).toBe('/a')
    await ir('/a?k=42')
    expect(params['/a'].value).toBe('42')
    await ir('/a?k=x')
    expect(params['/a'].value).toBeNull()
    expect(router.currentRoute.value.fullPath).toBe('/a')
  })

  it('sem vue-router funciona como ref local', () => {
    let p: Ref<string | null> | undefined
    mount(defineComponent({ setup: () => ((p = useUrlParam('k')), () => h('div')) }))
    expect(p!.value).toBeNull()
    p!.value = 'a'
    expect(p!.value).toBe('a')
  })
})

describe('useUrlParam — dentro de abas', () => {
  function montarComAbas(): void {
    router = criarRouter()
    api = useRouteTabs({ router, storage: null, isTabRoute: (r) => r.path !== '/' })
    mount(WTabViewport, { props: { tabs: api }, global: { plugins: [router] } })
  }

  it('escrita da aba oculta não suja a URL ativa, mas o ref reflete; reconcilia na volta', async () => {
    montarComAbas()
    await ir('/a')
    await ir('/b')
    params['/a'].value = '9'
    await flushPromises()
    expect(params['/a'].value).toBe('9')
    expect(router.currentRoute.value.fullPath).toBe('/b')
    await api.activate('/a')
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/a?k=9')
  })
})
