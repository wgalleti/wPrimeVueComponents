// @vitest-environment jsdom
//
// Cobre só os tipos de campo novos (segmented / choice / chips) — os demais já
// são exercitados pelos testes de CRUD.
import { readFileSync } from 'node:fs'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { defineComponent, nextTick, reactive } from 'vue'
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

describe('FieldDef type: number — useGrouping', () => {
  it('agrupa milhar por padrão e deixa de agrupar com useGrouping: false', async () => {
    const w = montar(
      [
        { field: 'quantidade', label: 'Quantidade', type: 'number' },
        { field: 'ano', label: 'Ano', type: 'number', useGrouping: false },
      ],
      { quantidade: 2020, ano: 2020 },
    )
    await w.vm.$nextTick()
    const inputs = w.findAll('input.p-inputnumber-input')
    expect((inputs[0].element as HTMLInputElement).value).toBe('2.020')
    expect((inputs[1].element as HTMLInputElement).value).toBe('2020')
    w.unmount()
  })
})

describe('FieldDef maxLength', () => {
  const validar = (w: VueWrapper) =>
    (w.vm as unknown as { validateAll: () => string[] }).validateAll()

  it('vira maxlength no input; contador só no textarea por padrão', () => {
    const w = montar(
      [
        { field: 'nome', label: 'Nome', maxLength: 10 },
        { field: 'obs', label: 'Obs', type: 'textarea', maxLength: 200 },
      ],
      { nome: 'abc', obs: 'olá' },
    )
    expect(w.find('input').attributes('maxlength')).toBe('10')
    expect(w.find('textarea').attributes('maxlength')).toBe('200')
    const contadores = w.findAll('.w-crud-form-counter')
    expect(contadores).toHaveLength(1)
    expect(contadores[0].text()).toBe('3/200')
  })

  it('showCounter liga no text e desliga no textarea', () => {
    const w = montar(
      [
        { field: 'nome', label: 'Nome', maxLength: 10, showCounter: true },
        { field: 'obs', label: 'Obs', type: 'textarea', maxLength: 200, showCounter: false },
      ],
      { nome: 'abc', obs: '' },
    )
    expect(w.findAll('.w-crud-form-counter').map((c) => c.text())).toEqual(['3/10'])
  })

  it('validateAll barra o valor maior que o limite, depois do validate próprio', () => {
    const w = montar([{ field: 'nome', label: 'Nome', maxLength: 3 }], { nome: 'abcd' })
    expect(validar(w)).toEqual(['Máximo de 3 caracteres.'])
    const ok = montar([{ field: 'nome', label: 'Nome', maxLength: 3 }], { nome: 'abc' })
    expect(validar(ok)).toEqual([])
  })
})

describe('FieldDef autocomplete / spellcheck', () => {
  it('vão ao input nativo do text, textarea e password', () => {
    const w = montar(
      [
        { field: 'codigo', label: 'Código', autocomplete: 'off', spellcheck: false },
        { field: 'obs', label: 'Obs', type: 'textarea', spellcheck: true },
        { field: 'senha', label: 'Senha', type: 'password', autocomplete: 'new-password' },
      ],
      { codigo: '', obs: '', senha: '' },
    )
    const inputs = w.findAll('input')
    expect(inputs[0].attributes('autocomplete')).toBe('off')
    expect(inputs[0].attributes('spellcheck')).toBe('false')
    expect(w.find('textarea').attributes('spellcheck')).toBe('true')
    expect(w.find('input[type="password"]').attributes('autocomplete')).toBe('new-password')
  })

  it('omitidos não viram atributo', () => {
    const w = montar([{ field: 'nome', label: 'Nome' }], { nome: '' })
    expect(w.find('input').attributes('spellcheck')).toBeUndefined()
    expect(w.find('input').attributes('autocomplete')).toBeUndefined()
  })
})

describe('opção desabilitada e descrição (select / choice)', () => {
  const planos: FieldDef = {
    field: 'plano',
    label: 'Plano',
    type: 'choice',
    options: [
      { label: 'Básico', value: 'B' },
      { label: 'Pro', value: 'P', disabled: true, description: 'Exige contrato anual' },
    ],
  }

  it('choice: opção travada fica desabilitada, mostra o motivo e não emite', async () => {
    const w = montar([planos], { plano: 'B' })
    const opcoes = w.findAll('.w-choice__option')
    expect(opcoes[0].attributes('disabled')).toBeUndefined()
    expect(opcoes[1].attributes('disabled')).toBeDefined()
    expect(opcoes[1].find('.w-fk-option__desc').text()).toBe('Exige contrato anual')
    await opcoes[1].trigger('click')
    expect(emitido(w)).toEqual([])
  })

  it('select: liga o optionDisabled do PrimeVue no campo `disabled`', async () => {
    const { default: Select } = await import('primevue/select')
    const w = montar([{ ...planos, type: 'select' }], { plano: 'B' })
    expect(w.findComponent(Select).props('optionDisabled')).toBe('disabled')
  })
})

describe('type cep — consulta injetável', () => {
  const endereco = { logradouro: 'Rua A', bairro: 'Centro', localidade: 'Cuiabá', uf: 'MT' }
  const campoCep = (extra: Partial<FieldDef> = {}): FieldDef => ({
    field: 'cep',
    label: 'CEP',
    type: 'cep',
    cepFields: { logradouro: 'rua', uf: 'estado' },
    ...extra,
  })

  async function digitar(w: VueWrapper, valor: string) {
    const input = w.find('input')
    ;(input.element as HTMLInputElement).value = valor
    await input.trigger('input')
    await vi.advanceTimersByTimeAsync(400)
  }

  it('usa a consulta do plugin e preenche os campos mapeados', async () => {
    vi.useFakeTimers()
    const { W_CONFIG_KEY } = await import('@/types/plugin')
    const lookup = vi.fn().mockResolvedValue(endereco)
    const w = mount(WFormRenderer, {
      props: { fields: [campoCep()], formData: {}, isEditing: false },
      global: { plugins: [PrimeVue], provide: { [W_CONFIG_KEY]: { cepLookup: lookup } } },
    })
    await digitar(w, '78000-000')
    expect(lookup).toHaveBeenCalledWith('78000000')
    expect(emitido(w)).toContainEqual(['rua', 'Rua A'])
    expect(emitido(w)).toContainEqual(['estado', 'MT'])
    vi.useRealTimers()
  })

  it('a do campo vence a do plugin; erro vira o aviso de não encontrado', async () => {
    vi.useFakeTimers()
    const { W_CONFIG_KEY } = await import('@/types/plugin')
    const doPlugin = vi.fn()
    const doCampo = vi.fn().mockRejectedValue(new Error('rede'))
    const w = mount(WFormRenderer, {
      props: { fields: [campoCep({ cepLookup: doCampo })], formData: {}, isEditing: false },
      global: { plugins: [PrimeVue], provide: { [W_CONFIG_KEY]: { cepLookup: doPlugin } } },
    })
    await digitar(w, '78000000')
    expect(doCampo).toHaveBeenCalled()
    expect(doPlugin).not.toHaveBeenCalled()
    expect(w.find('.w-crud-form-cep-error').exists()).toBe(true)
    vi.useRealTimers()
  })
})

describe('WFormRenderer — switch com ajuda', () => {
  const comAjuda: FieldDef = {
    field: 'boas_vindas',
    label: 'Boas-vindas enviadas',
    type: 'switch',
    hint: 'Marque quando o cliente já recebeu a mensagem',
  }

  it('com hint o switch ganha --hint e a ajuda fica ligada ao input', () => {
    const w = montar([comAjuda], { boas_vindas: false })
    const caixa = w.find('.w-crud-form-switch')
    expect(caixa.classes()).toContain('w-crud-form-switch--hint')
    const ajuda = caixa.find('.w-crud-form-hint')
    expect(ajuda.text()).toBe('Marque quando o cliente já recebeu a mensagem')
    expect(w.find('input[type="checkbox"]').attributes('aria-describedby')).toContain(
      ajuda.attributes('id'),
    )
  })

  it('sem hint nada muda: sem a classe --hint', () => {
    const w = montar([{ field: 'ativo', label: 'Ativo', type: 'switch' }], { ativo: true })
    expect(w.find('.w-crud-form-switch').classes()).not.toContain('w-crud-form-switch--hint')
  })

  it('CSS: grade auto 1fr, interruptor nas duas linhas e ajuda na 2ª embaixo do rótulo', () => {
    // jsdom não calcula layout: confere as regras em crud.css.
    const css = readFileSync('src/assets/crud.css', 'utf8')
    expect(css).toMatch(
      /\.w-crud-form-switch--hint \{[^}]*display: grid;[^}]*grid-template-columns: auto 1fr;/,
    )
    expect(css).toMatch(
      /\.w-crud-form-switch--hint > \.p-toggleswitch \{[^}]*grid-row: 1 \/ span 2;/,
    )
    expect(css).toMatch(/\.w-crud-form-switch--hint \.w-crud-form-hint \{[^}]*grid-column: 2;/)
  })
})

describe('required no validateAll', () => {
  const validar = (w: VueWrapper) =>
    (w.vm as unknown as { validateAll: () => string[] }).validateAll()

  const campos: FieldDef[] = [
    { field: 'nome', label: 'Nome', required: true },
    { field: 'ativo', label: 'Ativo', type: 'switch', required: true },
    { field: 'qtd', label: 'Qtd', type: 'number', required: true },
    { field: 'obs', label: 'Obs', required: true, visible: false },
  ]

  it('marca todos os vazios de uma vez, com aria-invalid e mensagem no campo', async () => {
    const w = montar(campos, { nome: '  ', ativo: null, qtd: null })
    expect(validar(w)).toEqual(['Nome é obrigatório', 'Ativo é obrigatório', 'Qtd é obrigatório'])
    await w.vm.$nextTick()
    expect(w.find('input[aria-invalid="true"]').exists()).toBe(true)
    expect(w.findAll('.w-crud-form-error').map((e) => e.text())).toContain('Nome é obrigatório')
    w.unmount()
  })

  it('switch e transfer também mostram a mensagem', async () => {
    const w = montar(
      [
        { field: 'ativo', label: 'Ativo', type: 'switch', required: true },
        { field: 'itens', label: 'Itens', type: 'transfer', required: true, options: [] },
      ],
      { ativo: null, itens: [] },
    )
    validar(w)
    await w.vm.$nextTick()
    expect(w.findAll('.w-crud-form-error').map((e) => e.text())).toEqual([
      'Ativo é obrigatório',
      'Itens é obrigatório',
    ])
    w.unmount()
  })

  it('false e 0 passam; campo oculto não barra', () => {
    const w = montar(campos, { nome: 'a', ativo: false, qtd: 0 })
    expect(validar(w)).toEqual([])
  })

  it('validate próprio vence a mensagem de obrigatório', () => {
    const w = montar([{ field: 'n', label: 'N', required: true, validate: () => 'N inválido' }], {
      n: '',
    })
    expect(validar(w)).toEqual(['N inválido'])
  })

  it('o blur não marca required', async () => {
    const w = montar([campos[0]], { nome: '' })
    await w.find('input').trigger('blur')
    expect(w.find('.w-crud-form-error').exists()).toBe(false)
  })

  it('campo de slot field-* mostra o erro; sem slot a mensagem não duplica', async () => {
    const comSlot = montar([campos[0]], { nome: '' }, { 'field-nome': '<input class="meu" />' })
    validar(comSlot)
    await comSlot.vm.$nextTick()
    expect(comSlot.findAll('.w-crud-form-error--slot').map((e) => e.text())).toEqual([
      'Nome é obrigatório',
    ])
    const semSlot = montar([campos[0]], { nome: '' })
    validar(semSlot)
    await semSlot.vm.$nextTick()
    expect(semSlot.findAll('.w-crud-form-error').length).toBe(1)
    expect(semSlot.find('.w-crud-form-error--slot').exists()).toBe(false)
  })

  it('foca o primeiro campo inválido na ordem da tela', async () => {
    const w = mount(WFormRenderer, {
      attachTo: document.body,
      props: {
        fields: [
          { field: 'a', label: 'A' },
          { field: 'b', label: 'B', required: true },
          { field: 'c', label: 'C', required: true },
        ] as FieldDef[],
        formData: { a: 'x', b: '', c: '' },
        isEditing: false,
      },
      global: { plugins: [PrimeVue] },
    })
    validar(w)
    await w.vm.$nextTick()
    await w.vm.$nextTick()
    expect(document.activeElement?.id).toMatch(/-b$/)
    w.unmount()
  })

  it('erro de campo de slot rola até a mensagem', async () => {
    const w = mount(WFormRenderer, {
      attachTo: document.body,
      props: { fields: [campos[0]], formData: { nome: '' }, isEditing: false },
      slots: { 'field-nome': '<input />' },
      global: { plugins: [PrimeVue] },
    })
    const rolar = vi.fn()
    Element.prototype.scrollIntoView = rolar
    validar(w)
    await w.vm.$nextTick()
    await w.vm.$nextTick()
    expect(rolar).toHaveBeenCalledWith({ block: 'nearest' })
    w.unmount()
    Reflect.deleteProperty(Element.prototype, 'scrollIntoView')
  })
})

describe('erro some ao corrigir o valor', () => {
  type Vm = { validateAll: () => string[] }
  const nomeObr: FieldDef = { field: 'nome', label: 'Nome', required: true }
  const email: FieldDef = {
    field: 'email',
    label: 'Email',
    validate: (v) => (typeof v === 'string' && v.includes('@') ? null : 'Email inválido'),
  }
  const textos = (w: VueWrapper) => w.findAll('.w-crud-form-error').map((e) => e.text())

  function reativo(
    fields: FieldDef[],
    dados: Record<string, unknown>,
    errors?: Record<string, string>,
  ) {
    const formData = reactive(dados)
    const w = mount(WFormRenderer, {
      props: { fields, formData, isEditing: false, errors },
      global: { plugins: [PrimeVue] },
    })
    return { w, formData }
  }

  it('some quando fica válido; permanece (com a nova mensagem) enquanto inválido', async () => {
    const { w, formData } = reativo([email], { email: 'x' })
    ;(w.vm as unknown as Vm).validateAll()
    await nextTick()
    expect(textos(w)).toEqual(['Email inválido'])
    formData.email = 'xy'
    await nextTick()
    expect(textos(w)).toEqual(['Email inválido'])
    formData.email = 'a@b'
    await nextTick()
    expect(textos(w)).toEqual([])
    w.unmount()
  })

  it('required some ao digitar', async () => {
    const { w, formData } = reativo([nomeObr], { nome: '' })
    ;(w.vm as unknown as Vm).validateAll()
    await nextTick()
    expect(textos(w)).toEqual(['Nome é obrigatório'])
    formData.nome = 'A'
    await nextTick()
    expect(textos(w)).toEqual([])
    w.unmount()
  })

  it('validação cruzada: corrigir o início limpa o erro do fim', async () => {
    const fim: FieldDef = {
      field: 'fim',
      label: 'Fim',
      validate: (v, { formData }) =>
        Number(v) < Number(formData.inicio) ? 'Fim antes do início' : null,
    }
    const { w, formData } = reativo([{ field: 'inicio', label: 'Início', type: 'number' }, fim], {
      inicio: 10,
      fim: 5,
    })
    ;(w.vm as unknown as Vm).validateAll()
    await nextTick()
    expect(textos(w)).toEqual(['Fim antes do início'])
    formData.inicio = 1
    await nextTick()
    expect(textos(w)).toEqual([])
    w.unmount()
  })

  it('nunca cria erro: digitar num campo sem erro (ou em outro) não marca ninguém', async () => {
    const { w, formData } = reativo([nomeObr, email], { nome: 'A', email: '' })
    formData.nome = ''
    formData.email = 'zz'
    await nextTick()
    expect(textos(w)).toEqual([])
    w.unmount()
  })

  it('erro do servidor some quando o próprio campo muda; o de outro campo permanece', async () => {
    const errors = reactive<Record<string, string>>({ nome: 'Já existe', email: 'Duplicado' })
    const { w, formData } = reativo([nomeObr, email], { nome: 'A', email: 'a@b' }, errors)
    expect(textos(w)).toEqual(['Já existe', 'Duplicado'])
    formData.nome = 'B'
    await nextTick()
    expect(textos(w)).toEqual(['Duplicado'])
    w.unmount()
  })

  it('servidor + reactive errors, nas duas ordens: nada ressuscita, nada de cliente se perde', async () => {
    for (const valorPrimeiro of [true, false]) {
      const errors = reactive<Record<string, string>>({ nome: 'Já existe', email: 'Duplicado' })
      const { w, formData } = reativo([nomeObr, email], { nome: 'A', email: 'a@b' }, errors)
      if (valorPrimeiro) {
        formData.nome = 'B'
        delete errors.nome
      } else {
        delete errors.nome
        formData.nome = 'B'
      }
      await nextTick()
      expect(textos(w)).toEqual(['Duplicado'])
      // outra chave muda: a limpa não volta
      formData.email = 'c@d'
      delete errors.email
      await nextTick()
      expect(textos(w)).toEqual([])
      w.unmount()
    }
  })

  it('valor inválido no campo com erro de servidor vira erro do cliente e sobrevive ao errors', async () => {
    const errors = reactive<Record<string, string>>({ nome: 'Já existe', email: 'Duplicado' })
    const { w, formData } = reativo([nomeObr, email], { nome: 'A', email: 'a@b' }, errors)
    formData.nome = ''
    delete errors.nome
    await nextTick()
    expect(textos(w)).toEqual(['Nome é obrigatório', 'Duplicado'])
    w.unmount()
  })

  it('duas recusas seguidas com a mesma mensagem: o erro reaparece', async () => {
    const errors = reactive<Record<string, string>>({ nome: 'Já existe' })
    const { w, formData } = reativo([nomeObr], { nome: 'A' }, errors)
    formData.nome = 'B'
    delete errors.nome
    await nextTick()
    expect(textos(w)).toEqual([])
    errors.nome = 'Já existe'
    await nextTick()
    expect(textos(w)).toEqual(['Já existe'])
    w.unmount()
  })

  it('errors fixo: o erro limpo localmente não volta enquanto a chave não muda', async () => {
    const errors = reactive<Record<string, string>>({ nome: 'Já existe' })
    const { w, formData } = reativo([nomeObr, email], { nome: 'A', email: '' }, errors)
    formData.nome = 'B'
    await nextTick()
    expect(textos(w)).toEqual([])
    errors.outra = 'x' // mexe no objeto sem tocar na chave `nome`
    await nextTick()
    expect(textos(w)).toEqual([])
    w.unmount()
  })

  it('salvar de novo: a mesma recusa, em objeto novo, reaparece', async () => {
    const { w, formData } = reativo([nomeObr], { nome: 'A' }, { nome: 'Já existe' })
    formData.nome = 'B'
    await nextTick()
    expect(textos(w)).toEqual([])
    expect((w.vm as unknown as Vm).validateAll()).toEqual([])
    await w.setProps({ errors: { nome: 'Já existe' } })
    expect(textos(w)).toEqual(['Já existe'])
    w.unmount()
  })

  it('recusa do servidor em valor que não mudou continua à vista no validateAll, sem barrar', async () => {
    const { w } = reativo([nomeObr, email], { nome: 'A', email: 'x' }, { nome: 'Já existe' })
    expect((w.vm as unknown as Vm).validateAll()).toEqual(['Email inválido'])
    await nextTick()
    expect(textos(w)).toEqual(['Já existe', 'Email inválido'])
    w.unmount()
  })

  it('erro do cropper e do CEP não somem porque OUTRO campo mudou; o do cropper some com o próprio valor', async () => {
    const campos: FieldDef[] = [
      { field: 'foto', label: 'Foto', type: 'image' },
      { field: 'cep', label: 'CEP', type: 'cep' },
      { field: 'nome', label: 'Nome' },
    ]
    const { w, formData } = reativo(campos, { foto: null, cep: '', nome: 'A' })
    w.findComponent({ name: 'WImageCropper' }).vm.$emit('error', 'Arquivo muito grande')
    await nextTick()
    formData.nome = 'B'
    await nextTick()
    expect(textos(w)).toEqual(['Arquivo muito grande'])
    formData.foto = 'x.png'
    await nextTick()
    expect(textos(w)).toEqual([])
    w.unmount()
  })

  it('erro de CEP não some porque OUTRO campo mudou', async () => {
    vi.useFakeTimers()
    const cep: FieldDef = { field: 'cep', label: 'CEP', type: 'cep', cepLookup: async () => null }
    const { w, formData } = reativo([cep, nomeObr], { cep: '', nome: 'A' })
    const input = w.find('input')
    ;(input.element as HTMLInputElement).value = '78000000'
    await input.trigger('input')
    await vi.advanceTimersByTimeAsync(400)
    expect(w.find('.w-crud-form-cep-error').exists()).toBe(true)
    formData.nome = 'B'
    await nextTick()
    expect(w.find('.w-crud-form-cep-error').exists()).toBe(true)
    vi.useRealTimers()
    w.unmount()
  })
})

describe('update:field — escrita automática', () => {
  it('campo calculado emite com automatico=true, também na montagem', () => {
    const w = montar(
      [
        { field: 'a', label: 'A', type: 'number' },
        { field: 'dobro', label: 'Dobro', type: 'number', calculate: (f) => Number(f.a) * 2 },
      ],
      { a: 2, dobro: 0 },
    )
    expect(emitido(w)).toEqual([['dobro', 4, true]])
  })

  it('edição do usuário emite sem o terceiro argumento', async () => {
    const w = montar([{ field: 'nome', label: 'Nome', type: 'text' }], { nome: '' })
    await w.find('input').setValue('x')
    expect(emitido(w).at(-1)).toEqual(['nome', 'x'])
  })
})
