// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WTransferList from './WTransferList.vue'

const source = [
  { id: 1, nome: 'VIP' },
  { id: 2, nome: 'Parceiro' },
  { id: 3, nome: 'Inadimplente' },
]

function montar(props: Record<string, unknown> = {}) {
  return mount(WTransferList, {
    props: { source, selected: [], ...props },
    global: { plugins: [PrimeVue] },
  })
}

const rotulos = (w: ReturnType<typeof montar>, painel: number) =>
  w
    .findAll('.w-transfer__pane')
    [painel].findAll('.w-transfer__item-label')
    .map((n) => n.text())

describe('WTransferList', () => {
  it('separa disponíveis e selecionados', () => {
    const w = montar({ selected: [2] })
    expect(rotulos(w, 0)).toEqual(['VIP', 'Inadimplente'])
    expect(rotulos(w, 1)).toEqual(['Parceiro'])
  })

  it('clicar num disponível emite a seleção com ele', async () => {
    const w = montar({ selected: [2] })
    await w.findAll('.w-transfer__pane')[0].find('.w-transfer__item').trigger('click')
    expect(w.emitted('update:selected')?.[0]).toEqual([[2, 1]])
  })

  it('busca filtra pelo rótulo', async () => {
    const w = montar()
    await w.findAll('.w-transfer__pane')[0].find('input').setValue('parc')
    expect(rotulos(w, 0)).toEqual(['Parceiro'])
  })

  it('listHeight vira o knob da altura; sem ela vale o token', () => {
    expect(montar({ listHeight: '24rem' }).attributes('style')).toContain(
      '--w-transfer-list-max-h: 24rem',
    )
    expect(montar().attributes('style')).toBeUndefined()
  })
})
