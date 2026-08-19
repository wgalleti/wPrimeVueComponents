// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { createMemoryHistory, createRouter, useRoute, type Router } from 'vue-router'
import WTabViewport from './WTabViewport.vue'
import { useRouteTabs } from '@/composables/useRouteTabs'
import { useTabHost } from '@/types/routeTabs'
import type { RouteTabsApi } from '@/types/routeTabs'

// Tela que expõe o que enxerga: a rota (congelada por aba) e o host da aba.
const Tela = defineComponent({
  name: 'Tela',
  setup() {
    const route = useRoute()
    const host = useTabHost()
    host?.setTitle(`titulo:${route.path}`)
    return () => h('div', { class: 'tela' }, `rota:${route.fullPath}`)
  },
})

let router: Router
let api: RouteTabsApi

function montar(): VueWrapper {
  router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: Tela },
      { path: '/a', component: Tela },
      { path: '/b', component: Tela },
    ],
  })
  // a navegação inicial para '/' não deve virar aba — fora do interesse aqui
  api = useRouteTabs({ router, storage: null, isTabRoute: (r) => r.path !== '/' })
  return mount(WTabViewport, {
    props: { tabs: api },
    global: { plugins: [router] },
    attachTo: document.body,
  })
}

beforeEach(async () => {
  document.body.innerHTML = ''
})

describe('WTabViewport — pool de panes', () => {
  it('mantém a aba anterior montada (v-show), só a ativa visível', async () => {
    const w = montar()
    await router.push('/a')
    await flushPromises()
    await router.push('/b')
    await flushPromises()
    const panes = w.findAll('.w-tab-viewport__pane')
    expect(panes).toHaveLength(2)
    expect(panes[0].isVisible()).toBe(false)
    expect(panes[1].isVisible()).toBe(true)
    // o DOM da aba oculta continua na árvore — estado e dialogs sobrevivem
    expect(panes[0].find('.tela').exists()).toBe(true)
  })

  it('congela a rota por pane: a aba oculta não vê a navegação global', async () => {
    const w = montar()
    await router.push('/a?f=1')
    await flushPromises()
    await router.push('/b')
    await flushPromises()
    const panes = w.findAll('.w-tab-viewport__pane')
    expect(panes[0].text()).toBe('rota:/a?f=1')
    expect(panes[1].text()).toBe('rota:/b')
  })

  it('fechar a aba desmonta o pane dela', async () => {
    const w = montar()
    await router.push('/a')
    await flushPromises()
    await router.push('/b')
    await flushPromises()
    await api.close('/a')
    await flushPromises()
    expect(w.findAll('.w-tab-viewport__pane')).toHaveLength(1)
    expect(w.text()).toContain('rota:/b')
  })

  it('reload remonta o componente da aba', async () => {
    const w = montar()
    await router.push('/a')
    await flushPromises()
    const antes = w.find('.tela').element
    api.reload('/a')
    await nextTick()
    await flushPromises()
    expect(w.find('.tela').element).not.toBe(antes)
  })

  it('useTabHost dá setTitle (título dinâmico) e hostEl do pane', async () => {
    const w = montar()
    await router.push('/a')
    await flushPromises()
    expect(api.tabs.value[0].title).toBe('titulo:/a')
    const runtimeHost = w.find('.w-tab-viewport__pane').element
    expect(runtimeHost).toBeTruthy()
  })
})
