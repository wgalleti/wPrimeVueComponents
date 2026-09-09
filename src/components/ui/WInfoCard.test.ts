// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WInfoCard, { type InfoField } from './WInfoCard.vue'

const fields: InfoField[] = [
  { label: 'Recomendação', value: 'RC-0002' },
  { label: 'Depósito', value: 'MAR-SEMENTES-02' },
  { label: 'Área', value: 223.5, format: 'number', decimals: 1, suffix: 'ha' },
  { label: 'Responsável', value: null },
]

function montar(props: Record<string, unknown> = {}) {
  return mount(WInfoCard, { props: { fields, ...props } })
}

describe('WInfoCard', () => {
  it('renderiza um campo por linha da lista', () => {
    expect(montar().findAll('.w-info-card-field')).toHaveLength(fields.length)
  })

  it('só renderiza o título quando ele existe', () => {
    expect(montar().find('.w-info-card-title').exists()).toBe(false)
    expect(montar({ title: 'Documento' }).find('.w-info-card-title').text()).toBe('Documento')
  })

  it('mostra traço no valor vazio', () => {
    const valores = montar().findAll('.w-info-card-value')
    expect(valores[valores.length - 1].text()).toBe('-')
  })

  it('formata número com as casas pedidas', () => {
    expect(montar().findAll('.w-info-card-value')[2].text()).toBe('223,5')
  })

  it('a variante `metric` troca a grade por linhas e mostra o sufixo', () => {
    const w = montar({ variant: 'metric' })
    expect(w.find('.w-info-card-grid').exists()).toBe(false)
    expect(w.findAll('.w-info-card-metric')).toHaveLength(fields.length)
    expect(w.find('.w-info-card-metric-suffix').text()).toBe('ha')
  })
})
