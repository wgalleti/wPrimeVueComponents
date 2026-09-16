// @vitest-environment jsdom
//
// Cobre só os tipos de campo novos (segmented / choice / chips) — os demais já
// são exercitados pelos testes de CRUD.
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { defineComponent } from 'vue'
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

  describe('entrada livre', () => {
    const bairros: FieldDef = { field: 'bairros', label: 'Bairros', type: 'chips' }

    it('sem slot de gatilho, tem input; Enter adiciona o texto aparado', async () => {
      const w = montar([bairros], { bairros: ['Centro'] })
      const input = w.find('.w-chips__input')
      expect(input.exists()).toBe(true)
      await input.setValue('  Jardim Itália ')
      await input.trigger('keydown', { key: 'Enter' })
      expect(emitido(w)).toEqual([['bairros', ['Centro', 'Jardim Itália']]])
      expect((input.element as HTMLInputElement).value).toBe('')
    })

    it('com texto, segura o Enter no campo (data-kbd-hold); vazio, deixa o form pular', async () => {
      const w = montar([bairros], { bairros: [] })
      const input = w.find('.w-chips__input')
      expect(input.attributes('data-kbd-hold')).toBeUndefined()
      await input.setValue('Centro')
      expect(input.attributes('data-kbd-hold')).toBe('')
    })

    it('ignora vazio e repetido', async () => {
      const w = montar([bairros], { bairros: ['Centro'] })
      const input = w.find('.w-chips__input')
      await input.setValue('   ')
      await input.trigger('keydown', { key: 'Enter' })
      await input.setValue('Centro')
      await input.trigger('keydown', { key: 'Enter' })
      expect(emitido(w)).toEqual([])
    })

    it('Backspace no input vazio remove o último chip', async () => {
      const w = montar([bairros], { bairros: ['Centro', 'Bela Vista'] })
      await w.find('.w-chips__input').trigger('keydown', { key: 'Backspace' })
      expect(emitido(w)).toEqual([['bairros', ['Centro']]])
    })

    it('com slot de gatilho ou chipsInput=false, não há input', () => {
      const comSlot = montar(
        [bairros],
        { bairros: [] },
        {
          'chips-trigger-bairros': '<button class="gatilho">Mapa</button>',
        },
      )
      expect(comSlot.find('.w-chips__input').exists()).toBe(false)
      const desligado = montar([{ ...bairros, chipsInput: false }], { bairros: [] })
      expect(desligado.find('.w-chips__input').exists()).toBe(false)
    })
  })
})

describe('validate recebe o contexto do form', () => {
  it('passa formData e isEditing como 2º argumento', () => {
    const chamadas: unknown[] = []
    const campo: FieldDef = {
      field: 'senha',
      label: 'Senha',
      validate: (v, ctx) => {
        chamadas.push([v, ctx])
        return !v && !ctx.isEditing ? 'Obrigatória na criação' : null
      },
    }
    const criando = montar([campo], { senha: '' })
    expect((criando.vm as unknown as { validateAll: () => string[] }).validateAll()).toEqual([
      'Obrigatória na criação',
    ])
    expect(chamadas[0]).toEqual(['', { formData: { senha: '' }, isEditing: false }])

    const editando = mount(WFormRenderer, {
      props: { fields: [campo], formData: { senha: '' }, isEditing: true },
      global: { plugins: [PrimeVue] },
    })
    expect((editando.vm as unknown as { validateAll: () => string[] }).validateAll()).toEqual([])
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

describe('WFormRenderer — marca do foco inicial', () => {
  it('campo numérico ganha o atributo `autofocus` no input nativo', () => {
    const w = montar(
      [
        { field: 'plantas_metro', label: 'Plantas finais por metro', type: 'number' },
        { field: 'germinacao', label: 'Germinação (%)', type: 'number' },
      ],
      { plantas_metro: null, germinacao: null },
    )
    const inputs = w.findAll('input')
    // O Dialog do PrimeVue procura `[autofocus]` no conteúdo; sem a marca ele foca
    // o botão de fechar, e o form abria com o foco no "X".
    expect(inputs[0].attributes('autofocus')).toBeDefined()
    expect(inputs[1].attributes('autofocus')).toBeUndefined()
  })

  it('`autofocus` explícito manda mesmo estando depois na lista', () => {
    const w = montar(
      [
        { field: 'plantas_metro', label: 'Plantas', type: 'number' },
        { field: 'germinacao', label: 'Germinação', type: 'number', autofocus: true },
      ],
      { plantas_metro: null, germinacao: null },
    )
    const inputs = w.findAll('input')
    expect(inputs[0].attributes('autofocus')).toBeUndefined()
    expect(inputs[1].attributes('autofocus')).toBeDefined()
  })
})

// ---------------------------------------------------------------------------
// Acessibilidade: rótulo programático, obrigatório, apoio e erro
// ---------------------------------------------------------------------------

describe('WFormRenderer — rótulo programático (WCAG 1.3.1 / 3.3.2)', () => {
  beforeAll(() => {
    // O Select do PrimeVue escuta orientação da tela no mount.
    if (!window.matchMedia) {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))
    }
  })

  const nome: FieldDef = { field: 'nome', label: 'Nome', type: 'text', required: true }
  const obs: FieldDef = { field: 'obs', label: 'Observação', type: 'textarea', hint: 'Opcional' }
  const qtd: FieldDef = { field: 'qtd', label: 'Quantidade', type: 'number', required: true }
  const tipo: FieldDef = {
    field: 'tipo',
    label: 'Tipo',
    type: 'select',
    options: [{ label: 'A', value: 'a' }],
  }
  const ativo: FieldDef = { field: 'ativo', label: 'Ativo', type: 'switch' }

  it('label `for` aponta para o id do input, único por instância do form', () => {
    // Dois forms com o MESMO campo na mesma app (ex.: dialog + filtro lateral):
    // os ids não podem colidir — `useId()` distingue por instância.
    const Dois = defineComponent({
      components: { WFormRenderer },
      setup: () => ({ fields: [nome] }),
      template: `<div>
        <WFormRenderer class="a" :fields="fields" :form-data="{ nome: '' }" :is-editing="false" />
        <WFormRenderer class="b" :fields="fields" :form-data="{ nome: '' }" :is-editing="false" />
      </div>`,
    })
    const w = mount(Dois, { global: { plugins: [PrimeVue] } })
    const label1 = w.find('.a label.w-crud-form-label')
    const input1 = w.find('.a input')
    expect(label1.attributes('for')).toBe(input1.attributes('id'))
    expect(input1.attributes('id')).toMatch(/-nome$/)
    expect(w.find('.b input').attributes('id')).not.toBe(input1.attributes('id'))
    expect(w.find('.b label.w-crud-form-label').attributes('for')).toBe(
      w.find('.b input').attributes('id'),
    )
  })

  it('obrigatório vira aria-required e o asterisco fica fora da árvore acessível', () => {
    const w = montar([nome], { nome: '' })
    expect(w.find('input').attributes('aria-required')).toBe('true')
    expect(w.find('.w-crud-form-required').attributes('aria-hidden')).toBe('true')
    expect(w.find('input').attributes('aria-labelledby')).toBe(
      w.find('label.w-crud-form-label').attributes('id'),
    )
  })

  it('hint entra no aria-describedby; erro vira aria-invalid + role=alert', async () => {
    const w = montar([obs], { obs: '' })
    const ta = w.find('textarea')
    const hint = w.find('.w-crud-form-hint')
    expect(hint.text()).toBe('Opcional')
    expect(ta.attributes('aria-describedby')).toBe(hint.attributes('id'))
    expect(ta.attributes('aria-invalid')).toBeUndefined()

    const w2 = montar([{ ...nome, validate: () => 'Obrigatório' }], { nome: '' })
    ;(w2.vm as unknown as { validateAll: () => string[] }).validateAll()
    await w2.vm.$nextTick()
    const erro = w2.find('.w-crud-form-error')
    expect(erro.attributes('role')).toBe('alert')
    expect(w2.find('input').attributes('aria-invalid')).toBe('true')
    expect(w2.find('input').attributes('aria-describedby')).toBe(erro.attributes('id'))
  })

  it('InputNumber recebe o id no input interno (inputId) e aria-required', () => {
    const w = montar([qtd], { qtd: null })
    const input = w.find('input')
    expect(w.find('label').attributes('for')).toBe(input.attributes('id'))
    expect(input.attributes('aria-required')).toBe('true')
  })

  it('Select: combobox rotulado por aria-labelledby (o `for` não alcança um span)', () => {
    const w = montar([tipo], { tipo: null })
    const combo = w.find('[role="combobox"]')
    const label = w.find('label.w-crud-form-label')
    expect(combo.attributes('id')).toBe(label.attributes('for'))
    expect(combo.attributes('aria-labelledby')).toBe(label.attributes('id'))
  })

  it('switch: label for → input do ToggleSwitch', () => {
    const w = montar([ativo], { ativo: true })
    const input = w.find('input[type="checkbox"]')
    expect(w.find('label.w-crud-form-switch-label').attributes('for')).toBe(input.attributes('id'))
  })

  it('grupos de pílulas são role=group rotulados pelo label', () => {
    const w = montar([{ ...formas, required: true }], { forma_calculo: 'KG_HA' })
    const grupo = w.find('.w-segmented')
    expect(grupo.attributes('role')).toBe('group')
    expect(grupo.attributes('aria-labelledby')).toBe(w.find('label').attributes('id'))
    expect(grupo.attributes('aria-required')).toBe('true')
  })

  it('slot field-* recebe o fieldId para o consumidor rotular o próprio controle', () => {
    const w = montar(
      [nome],
      { nome: '' },
      {
        'field-nome': `<template #field-nome="{ fieldId }"><input class="custom" :id="fieldId" /></template>`,
      },
    )
    expect(w.find('input.custom').attributes('id')).toMatch(/-nome$/)
  })
})
