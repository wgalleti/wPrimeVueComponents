// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WAttentionList from './WAttentionList.vue'
import type { AttentionItem } from '@/types/attentionList'

const itens: AttentionItem[] = [
  { key: 'a', icon: 'pi pi-heart', label: 'Sem anamnese', value: 100, severity: 'danger' },
  { key: 'b', icon: 'pi pi-phone', label: 'Sem telefone', value: 0, active: true },
]

describe('WAttentionList', () => {
  it('sem listener, as linhas são estáticas', () => {
    const w = mount(WAttentionList, { props: { title: 'Atenção', items: itens } })
    expect(w.findAll('button')).toHaveLength(0)
    expect(w.find('.w-attention-list__item--danger .w-attention-list__value').text()).toBe('100')
  })

  it('com listener, cada linha é botão, marca a ativa e emite a linha clicada', async () => {
    const w = mount(WAttentionList, { props: { items: itens, onItemClick: () => {} } })
    const botoes = w.findAll('button')
    expect(botoes).toHaveLength(2)
    expect(botoes[1].attributes('aria-pressed')).toBe('true')
    await botoes[0].trigger('click')
    expect(w.emitted('item-click')?.[0]).toEqual([{ item: itens[0], index: 0 }])
  })

  it('lista vazia mostra a mensagem', () => {
    const w = mount(WAttentionList, { props: { items: [], emptyMessage: 'Tudo em dia' } })
    expect(w.find('.w-attention-list__empty').text()).toBe('Tudo em dia')
  })
})
