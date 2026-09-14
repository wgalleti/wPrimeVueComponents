// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WCrudColumnRenderer from './WCrudColumnRenderer.vue'
import type { ColumnDef } from '@/types/column'

function montar(column: ColumnDef, value: unknown, rowData: Record<string, unknown> = {}) {
  return mount(WCrudColumnRenderer, {
    props: { column, value, rowData },
    global: { plugins: [PrimeVue] },
  })
}

describe('WCrudColumnRenderer — type boolean', () => {
  const col: ColumnDef = { field: 'ativo', header: 'Ativo', type: 'boolean' }

  it('default mantém Ativo/Inativo com a classe de status própria', () => {
    const on = montar(col, true)
    expect(on.text()).toBe('Ativo')
    expect(on.find('.p-tag').classes()).toContain('w-tag--success')
    const off = montar(col, false)
    expect(off.text()).toBe('Inativo')
    expect(off.find('.p-tag').classes()).toContain('w-tag--danger')
  })

  it('trueLabel/falseLabel trocam o texto sem mexer na cor', () => {
    const w = montar({ ...col, trueLabel: 'Sim', falseLabel: 'Não' }, false)
    expect(w.text()).toBe('Não')
    expect(w.find('.p-tag').classes()).toContain('w-tag--danger')
  })

  it('falseSeverity: null → texto neutro, sem tag (evita a dupla negação)', () => {
    const w = montar(
      {
        field: 'nao_exige_analise',
        header: 'Exige análise',
        type: 'boolean',
        trueLabel: 'Não exige',
        falseLabel: '—',
        falseSeverity: null,
      },
      false,
    )
    expect(w.find('.p-tag').exists()).toBe(false)
    expect(w.find('.w-cell-neutral').text()).toBe('—')
  })

  it('trueSeverity troca a cor do verdadeiro', () => {
    const w = montar({ ...col, trueSeverity: 'info' }, true)
    expect(w.find('.p-tag').classes()).toContain('w-tag--info')
  })

  it('tagValue/tagSeverity (funções) continuam vencendo os estáticos', () => {
    const w = montar(
      { ...col, trueLabel: 'X', tagValue: () => 'Custom', tagSeverity: () => 'warn' },
      true,
    )
    expect(w.text()).toBe('Custom')
    expect(w.find('.p-tag').classes()).toContain('w-tag--warn')
  })

  it('null renderiza o travessão', () => {
    expect(montar(col, null).text()).toBe('—')
  })
})
