// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WCheckList from './WCheckList.vue'
import type { CheckListItem } from '@/types/checkList'

const itens: CheckListItem[] = [
  { nivel: 'ok', label: 'Área distribuída bate com os talhões (260 ha)' },
  { nivel: 'warn', label: '1 lote(s) ainda sem cálculo' },
  { nivel: 'ok', label: 'Saldo de sementes suficiente' },
  { nivel: 'bad', label: 'Estoque insuficiente: CONGREGA' },
]

function montar(props: Record<string, unknown> = {}) {
  return mount(WCheckList, { props: { title: 'Verificações', items: itens, ...props } })
}

describe('WCheckList — contador', () => {
  it('conta só os níveis ok sobre o total', () => {
    expect(montar().find('.w-check-list__count').text()).toBe('2/4')
  })

  it('tudo ok fecha o contador', () => {
    const w = montar({
      items: [
        { nivel: 'ok', label: 'a' },
        { nivel: 'ok', label: 'b' },
      ],
    })
    expect(w.find('.w-check-list__count').text()).toBe('2/2')
  })

  it('nada ok zera o contador', () => {
    const w = montar({ items: [{ nivel: 'bad', label: 'a' }] })
    expect(w.find('.w-check-list__count').text()).toBe('0/1')
  })

  it('lista vazia conta 0/0', () => {
    expect(montar({ items: [] }).find('.w-check-list__count').text()).toBe('0/0')
  })

  it('showCount: false esconde o contador', () => {
    expect(montar({ showCount: false }).find('.w-check-list__count').exists()).toBe(false)
  })

  it('o contador acompanha os itens', async () => {
    const w = montar()
    await w.setProps({ items: [...itens, { nivel: 'ok', label: 'nova' }] })
    expect(w.find('.w-check-list__count').text()).toBe('3/5')
  })
})

describe('WCheckList — itens', () => {
  it('um ícone por nível', () => {
    const w = montar()
    expect(w.findAll('.w-check-list__icon--ok')).toHaveLength(2)
    expect(w.findAll('.w-check-list__icon--warn')).toHaveLength(1)
    expect(w.findAll('.w-check-list__icon--bad')).toHaveLength(1)
    expect(w.find('.w-check-list__icon--ok').classes()).toContain('pi-check-circle')
    expect(w.find('.w-check-list__icon--warn').classes()).toContain('pi-exclamation-triangle')
    expect(w.find('.w-check-list__icon--bad').classes()).toContain('pi-times-circle')
  })

  it('mostra o rótulo de cada verificação', () => {
    const w = montar()
    expect(w.findAll('.w-check-list__item')).toHaveLength(4)
    expect(w.text()).toContain('Estoque insuficiente: CONGREGA')
  })

  it('lista vazia mostra o emptyMessage', () => {
    const w = montar({ items: [], emptyMessage: 'Nada a verificar' })
    expect(w.find('.w-check-list__empty').text()).toBe('Nada a verificar')
  })
})
