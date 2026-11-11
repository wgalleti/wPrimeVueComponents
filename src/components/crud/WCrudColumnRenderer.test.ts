// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { createMemoryHistory, createRouter } from 'vue-router'
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

describe('WCrudColumnRenderer — `dueDate` por linha', () => {
  const col = (dueDate: ColumnDef['dueDate']): ColumnDef => ({
    field: 'prazo',
    header: 'Prazo',
    type: 'relative',
    dueDate,
  })
  const passado = '2020-01-01'

  it('função: vermelho só quando ela diz que o prazo está aberto e a data passou', () => {
    const aberta = montar(col((r) => r.status === 'aberta'), passado, { status: 'aberta' })
    expect(aberta.find('.w-cell-relative').classes()).toContain('w-cell-relative--due')
    const feita = montar(col((r) => r.status === 'aberta'), passado, { status: 'feita' })
    expect(feita.find('.w-cell-relative').classes()).not.toContain('w-cell-relative--due')
  })

  it('função verdadeira com data futura não pinta', () => {
    const w = montar(col(() => true), '2999-01-01')
    expect(w.find('.w-cell-relative').classes()).not.toContain('w-cell-relative--due')
  })

  it('booleano segue como antes', () => {
    expect(montar(col(true), passado).find('.w-cell-relative').classes()).toContain(
      'w-cell-relative--due',
    )
  })
})

describe('WCrudColumnRenderer — `to` (link na célula)', () => {
  const to = (r: Record<string, unknown>) => (r.id ? `/imoveis/${r.id}` : undefined)

  it('sem router, string vira <a href> no texto e na identity', () => {
    const t = montar({ field: 'n', header: 'N', to }, 'Casa', { id: 7 })
    expect(t.find('a.w-cell-text').attributes('href')).toBe('/imoveis/7')
    const i = montar({ field: 'n', header: 'N', type: 'identity', to }, 'Casa', { id: 7 })
    expect(i.find('a.w-cell-identity__primary').attributes('href')).toBe('/imoveis/7')
  })

  it('undefined não vira link', () => {
    const w = montar({ field: 'n', header: 'N', to }, 'Casa', {})
    expect(w.find('a').exists()).toBe(false)
    expect(w.find('span.w-cell-text').text()).toBe('Casa')
  })

  it('com router vira RouterLink e o clique não sobe para a linha', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:p(.*)*', component: { render: () => null } }],
    })
    const w = mount(
      { template: '<div @click="$emit(\'row\')"><R :column="c" :value="v" :row-data="r" /></div>', components: { R: WCrudColumnRenderer }, emits: ['row'], data: () => ({ c: { field: 'n', header: 'N', to: () => ({ path: '/x' }) }, v: 'Casa', r: {} }) },
      { global: { plugins: [PrimeVue, router] } },
    )
    const a = w.find('a.w-cell-link')
    expect(a.attributes('href')).toBe('/x')
    await a.trigger('click')
    expect(w.emitted('row')).toBeUndefined()
  })
})
