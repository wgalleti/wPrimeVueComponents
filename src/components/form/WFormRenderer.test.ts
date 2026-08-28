// @vitest-environment jsdom
//
// Cobre só os tipos de campo novos (segmented / choice / chips) — os demais já
// são exercitados pelos testes de CRUD.
import { describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WFormRenderer from './WFormRenderer.vue'
import type { FieldDef } from '@/types/field'

function montar(fields: FieldDef[], formData: Record<string, unknown>, slots = {}) {
  return mount(WFormRenderer, {
    props: { fields, formData, isEditing: false },
    slots,
    global: { plugins: [PrimeVue] },
  })
}

const emitido = (w: VueWrapper) =>
  (w.emitted('update:field') ?? []).map((e) => e as [string, unknown])

const formas: FieldDef = {
  field: 'forma_calculo',
  label: 'Forma de cálculo',
  type: 'segmented',
  options: [
    { label: 'Germinação', value: 'GERMINACAO' },
    { label: 'KG / ha', value: 'KG_HA' },
  ],
}

const umidade: FieldDef = {
  field: 'umidade_solo',
  label: 'Umidade de solo',
  type: 'choice',
  options: [
    { label: 'Pó', value: 'PO' },
    { label: 'Baixa', value: 'BAIXA' },
    { label: 'Adequada', value: 'ADEQUADA' },
  ],
}

const talhoes: FieldDef = {
  field: 'talhoes',
  label: 'Talhões',
  type: 'chips',
  optionValue: 'id',
  optionLabel: 'nome',
  options: [
    { id: 1, nome: 'P42' },
    { id: 2, nome: 'P44' },
  ],
}

describe('FieldDef type: segmented', () => {
  it('desenha uma pílula por opção e marca a ativa', () => {
    const w = montar([formas], { forma_calculo: 'KG_HA' })
    const opcoes = w.findAll('.w-segmented__option')
    expect(opcoes.map((o) => o.text())).toEqual(['Germinação', 'KG / ha'])
    expect(opcoes[1].classes()).toContain('w-segmented__option--on')
    expect(opcoes[1].attributes('aria-pressed')).toBe('true')
  })

  it('clicar emite o optionValue', async () => {
    const w = montar([formas], { forma_calculo: 'GERMINACAO' })
    await w.findAll('.w-segmented__option')[1].trigger('click')
    expect(emitido(w)).toEqual([['forma_calculo', 'KG_HA']])
  })

  it('respeita disabled', async () => {
    const w = montar([{ ...formas, disabled: true }], { forma_calculo: 'GERMINACAO' })
    const opcao = w.findAll('.w-segmented__option')[1]
    expect(opcao.attributes('disabled')).toBeDefined()
    await opcao.trigger('click')
    expect(emitido(w)).toEqual([])
  })

  it('respeita visible', () => {
    const w = montar([{ ...formas, visible: false }], {})
    expect(w.find('.w-segmented').exists()).toBe(false)
  })
})

describe('FieldDef type: choice', () => {
  it('marca a opção escolhida e mostra o ícone só nela', () => {
    const w = montar([umidade], { umidade_solo: 'ADEQUADA' })
    const opcoes = w.findAll('.w-choice__option')
    expect(opcoes).toHaveLength(3)
    expect(opcoes[2].classes()).toContain('w-choice__option--on')
    expect(w.findAll('.w-choice__option i')).toHaveLength(1)
  })

  it('clicar troca a escolha', async () => {
    const w = montar([umidade], { umidade_solo: 'PO' })
    await w.findAll('.w-choice__option')[1].trigger('click')
    expect(emitido(w)).toEqual([['umidade_solo', 'BAIXA']])
  })

  it('required mostra o asterisco do label', () => {
    const w = montar([{ ...umidade, required: true }], {})
    expect(w.find('.w-crud-form-required').exists()).toBe(true)
  })
})

describe('FieldDef type: chips', () => {
  it('resolve o rótulo de ids pelas options', () => {
    const w = montar([talhoes], { talhoes: [1, 2] })
    expect(w.findAll('.w-chips__chip').map((c) => c.text())).toEqual(['P42', 'P44'])
  })

  it('resolve o rótulo quando o valor já é o objeto', () => {
    const w = montar([talhoes], { talhoes: [{ id: 9, nome: 'P99' }] })
    expect(w.find('.w-chips__chip').text()).toBe('P99')
  })

  it('remover o chip emite o array sem aquele item', async () => {
    const w = montar([talhoes], { talhoes: [1, 2] })
    await w.findAll('.w-chips__remove')[0].trigger('click')
    expect(emitido(w)).toEqual([['talhoes', [2]]])
  })

  it('valor vazio mostra o chipsEmptyLabel', () => {
    const w = montar([{ ...talhoes, chipsEmptyLabel: 'Nenhum talhão' }], { talhoes: [] })
    expect(w.find('.w-chips__empty').text()).toBe('Nenhum talhão')
  })

  it('slots de gatilho e resumo entram no campo', () => {
    const w = montar(
      [talhoes],
      { talhoes: [1] },
      {
        'chips-trigger-talhoes': '<button class="gatilho">Selecionar no mapa</button>',
        'chips-summary-talhoes': '<span class="resumo">Área total 260 ha</span>',
      },
    )
    expect(w.find('.gatilho').text()).toBe('Selecionar no mapa')
    expect(w.find('.resumo').text()).toBe('Área total 260 ha')
  })

  it('disabled trava a remoção', async () => {
    const w = montar([{ ...talhoes, disabled: true }], { talhoes: [1] })
    await w.find('.w-chips__remove').trigger('click')
    expect(emitido(w)).toEqual([])
  })
})

describe('validateAll', () => {
  const campos: FieldDef[] = [
    { field: 'nome', label: 'Nome', validate: (v) => (v ? null : 'Nome obrigatório') },
    {
      field: 'preco',
      label: 'Preço',
      type: 'number',
      visible: (f) => !f.bonificacao,
      validate: (v) => (Number(v) > 0 ? null : 'Preço deve ser maior que zero'),
    },
  ]

  it('valida campo visível', () => {
    const w = montar(campos, { nome: 'x', preco: 0, bonificacao: false })
    expect((w.vm as { validateAll: () => string[] }).validateAll()).toEqual([
      'Preço deve ser maior que zero',
    ])
  })

  it('campo oculto não barra o save (e o erro dele é limpo)', () => {
    const w = montar(campos, { nome: 'x', preco: null, bonificacao: true })
    expect((w.vm as { validateAll: () => string[] }).validateAll()).toEqual([])
  })
})
