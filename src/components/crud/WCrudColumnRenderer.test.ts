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

describe('WCrudColumnRenderer — enum/status com tagValue e tagSeverity', () => {
  const rotulos: Record<string, string> = { draft: 'Rascunho', published: 'Publicado' }
  const col: ColumnDef = {
    field: 'status',
    header: 'Status',
    tagValue: (v) => rotulos[String(v)] ?? String(v),
    tagSeverity: (v) => (v === 'published' ? 'success' : 'secondary'),
  }

  it('coluna sem type vira tag com o rótulo e a cor da opção', () => {
    const w = montar(col, 'published')
    expect(w.text()).toBe('Publicado')
    expect(w.find('.p-tag').classes()).toContain('w-tag--success')
    const w2 = montar(col, 'draft')
    expect(w2.find('.p-tag').classes()).toContain('w-tag--secondary')
  })

  it('só tagSeverity: o rótulo cai no format e depois no valor cru', () => {
    const w = montar({ field: 'fase', header: 'Fase', tagSeverity: () => 'info' }, 'A')
    expect(w.text()).toBe('A')
    expect(w.find('.p-tag').classes()).toContain('w-tag--info')
  })

  it('valor nulo continua como traço', () => {
    expect(montar(col, null).text()).toBe('—')
  })
})

describe('WCrudColumnRenderer — format vence o formatador do tipo', () => {
  it('currency com format renderiza o texto próprio', () => {
    const col: ColumnDef = {
      field: 'preco',
      header: 'Valor',
      type: 'currency',
      format: (v, row) => (row?.pago ? `R$ ${v}` : 'Grátis'),
    }
    expect(montar(col, 0, { pago: false }).text()).toBe('Grátis')
  })

  it('date sem format segue formatando pela suíte', () => {
    const col: ColumnDef = { field: 'data', header: 'Data', type: 'date' }
    expect(montar(col, '2026-09-21').text()).toBe('21/09/2026')
  })
})

describe('WCrudColumnRenderer — vazio com `empty` e `emptySeverity`', () => {
  const col: ColumnDef = {
    field: 'corretor',
    header: 'Corretor',
    type: 'identity',
    empty: 'Sem corretor',
    emptySeverity: 'warn',
  }

  it("'' e null viram o texto de `empty`, com a classe de atenção", () => {
    for (const v of [null, undefined, '']) {
      const w = montar(col, v)
      expect(w.find('.w-cell-empty').text()).toBe('Sem corretor')
      expect(w.find('.w-cell-empty').classes()).toContain('w-cell-empty--warn')
      expect(w.find('.w-cell-avatar').exists()).toBe(false)
    }
  })

  it("sem `empty` nada muda: null é o travessão sem destaque e '' passa como valor", () => {
    const nulo = montar({ field: 'x', header: 'X' }, null)
    expect(nulo.find('.w-cell-empty').text()).toBe('—')
    expect(nulo.find('.w-cell-empty').classes()).not.toContain('w-cell-empty--warn')
    expect(montar({ field: 'x', header: 'X' }, '').find('.w-cell-empty').exists()).toBe(false)
  })
})
