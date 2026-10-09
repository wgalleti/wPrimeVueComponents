// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WEmptyState from './WEmptyState.vue'

describe('WEmptyState', () => {
  it('mostra o ícone, o título e a descrição', () => {
    const w = mount(WEmptyState, {
      props: { icon: 'pi pi-users', title: 'Nada', description: 'Sem alunos' },
    })
    expect(w.find('.w-empty-state-icon i').classes()).toContain('pi-users')
    expect(w.find('.w-empty-state-title').text()).toBe('Nada')
    expect(w.find('.w-empty-state-description').text()).toBe('Sem alunos')
  })

  it('a ilustração substitui o ícone', () => {
    const w = mount(WEmptyState, {
      props: { title: 'Nada' },
      slots: { illustration: '<svg class="arte" />' },
    })
    expect(w.find('.w-empty-state-illustration .arte').exists()).toBe(true)
    expect(w.find('.w-empty-state-icon').exists()).toBe(false)
  })

  it('compact marca a variante e a ação emite', async () => {
    const w = mount(WEmptyState, { props: { title: 'Nada', compact: true, actionLabel: 'Novo' } })
    expect(w.classes()).toContain('w-empty-state--compact')
    await w.find('button').trigger('click')
    expect(w.emitted('action')).toHaveLength(1)
  })
})
