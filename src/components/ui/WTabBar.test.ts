// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import WTabBar from './WTabBar.vue'
import type { TabItem } from '@/types/tabs'

const abas: TabItem[] = [
  { value: 'documento', label: 'Documento', icon: 'pi pi-file' },
  { value: 'tarefas', label: 'Tarefas', badge: '3/8' },
  { value: 'historico', label: 'Histórico', disabled: true },
]

function montar(modelValue = 'documento') {
  return mount(WTabBar, {
    props: { modelValue, items: abas, ariaLabel: 'Seções' },
    attachTo: document.body,
  })
}

describe('WTabBar — render', () => {
  it('renderiza uma aba por item, com ícone e badge quando informados', () => {
    const w = montar()
    const tabs = w.findAll('[role="tab"]')
    expect(tabs).toHaveLength(3)
    expect(tabs[0].find('i.pi-file').exists()).toBe(true)
    expect(tabs[1].find('.w-tab-bar__badge').text()).toBe('3/8')
    expect(w.find('[role="tablist"]').attributes('aria-label')).toBe('Seções')
  })

  it('marca a aba ativa (aria-selected, tabindex) e desabilita a disabled', () => {
    const w = montar()
    const tabs = w.findAll('[role="tab"]')
    expect(tabs[0].attributes('aria-selected')).toBe('true')
    expect(tabs[0].attributes('tabindex')).toBe('0')
    expect(tabs[1].attributes('aria-selected')).toBe('false')
    expect(tabs[1].attributes('tabindex')).toBe('-1')
    expect(tabs[2].attributes('disabled')).toBeDefined()
  })
})

describe('WTabBar — seleção', () => {
  it('clique emite update:modelValue com o value da aba', async () => {
    const w = montar()
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([['tarefas']])
  })

  it('aba desabilitada não emite ao clicar', async () => {
    const w = montar()
    await w.findAll('[role="tab"]')[2].trigger('click')
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('WTabBar — teclado', () => {
  it('→ vai para a próxima aba habilitada', async () => {
    const w = montar()
    await w.findAll('[role="tab"]')[0].trigger('keydown', { key: 'ArrowRight' })
    expect(w.emitted('update:modelValue')).toEqual([['tarefas']])
  })

  it('→ pula a aba desabilitada e circula de volta pro início', async () => {
    const w = montar('tarefas')
    await w.findAll('[role="tab"]')[1].trigger('keydown', { key: 'ArrowRight' })
    expect(w.emitted('update:modelValue')).toEqual([['documento']])
  })

  it('← na primeira circula pro fim pulando a desabilitada', async () => {
    const w = montar()
    await w.findAll('[role="tab"]')[0].trigger('keydown', { key: 'ArrowLeft' })
    expect(w.emitted('update:modelValue')).toEqual([['tarefas']])
  })
})

describe('WTabBar — urlKey', () => {
  async function comRouter(url: string, modelValue = 'documento') {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/tela', component: { template: '<div />' } }],
    })
    await router.push(url)
    const replace = vi.spyOn(router, 'replace')
    const push = vi.spyOn(router, 'push')
    const w = mount(WTabBar, {
      props: { modelValue, items: abas, urlKey: 'aba' },
      global: { plugins: [router] },
    })
    return { router, replace, push, w }
  }

  it('restaura a aba da query', async () => {
    const { w } = await comRouter('/tela?aba=tarefas')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['tarefas'])
  })

  it('valor fora dos items ou desabilitado cai no padrão e sai da URL', async () => {
    for (const aba of ['nao-existe', 'historico']) {
      const { w, router } = await comRouter(`/tela?aba=${aba}`)
      await flushPromises()
      expect(w.emitted('update:modelValue')).toBeUndefined()
      expect(router.currentRoute.value.query.aba).toBeUndefined()
    }
  })

  it('grava só o diferente do padrão, com replace e sem push', async () => {
    const { w, router, replace, push } = await comRouter('/tela')
    await w.setProps({ modelValue: 'tarefas' })
    await flushPromises()
    expect(router.currentRoute.value.query.aba).toBe('tarefas')
    await w.setProps({ modelValue: 'documento' })
    await flushPromises()
    expect(router.currentRoute.value.query.aba).toBeUndefined()
    expect(replace).toHaveBeenCalledTimes(2)
    expect(push).not.toHaveBeenCalled()
  })

  it('não grava depois que a rota muda (tela oculta)', async () => {
    const { w, router, replace } = await comRouter('/tela')
    router.addRoute({ path: '/outra', component: { template: '<div />' } })
    await router.push('/outra')
    await w.setProps({ modelValue: 'tarefas' })
    await flushPromises()
    expect(replace).not.toHaveBeenCalled()
    expect(router.currentRoute.value.query.aba).toBeUndefined()
  })

  it('sem router avisa em dev e não quebra', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const w = mount(WTabBar, { props: { modelValue: 'documento', items: abas, urlKey: 'aba' } })
    expect(w.findAll('[role="tab"]')).toHaveLength(3)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })
})
