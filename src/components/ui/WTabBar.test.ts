// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
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
