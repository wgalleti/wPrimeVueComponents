// @vitest-environment jsdom
//
// O que se testa aqui é a SELEÇÃO — a parte do componente que não depende do
// Leaflet ter subido. O mapa entra por import() dinâmico e no jsdom não há
// layout: o painel lateral (busca, lista, contador, área) é o que precisa
// funcionar sozinho, porque é ele que segura a tela quando o mapa falha.
import { describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WMapSelect from './WMapSelect.vue'
import type { MapSelectFeature, MapSelectId } from '@/types/mapSelect'

function quadra(lng: number, lat: number) {
  return {
    type: 'Polygon' as const,
    coordinates: [
      [
        [lng, lat],
        [lng + 0.01, lat],
        [lng + 0.01, lat - 0.01],
        [lng, lat - 0.01],
        [lng, lat],
      ] as [number, number][],
    ],
  }
}

const talhoes: MapSelectFeature[] = [
  { id: 'P41', nome: 'P41', subtitulo: 'Rotacionado', area: 82, geometria: quadra(-52.85, -27.85) },
  {
    id: 'P42',
    nome: 'P42',
    subtitulo: 'Rotacionado',
    area: 160,
    geometria: quadra(-52.84, -27.85),
  },
  {
    id: 'P43',
    nome: 'P43',
    subtitulo: 'Soja / Milho',
    area: 74,
    geometria: quadra(-52.83, -27.85),
  },
  // Sem contorno cadastrado: some do mapa, fica na lista.
  { id: 'P49', nome: 'P49', subtitulo: 'Pastagem', area: 31 },
]

function montar(props: Record<string, unknown> = {}) {
  return mount(WMapSelect, {
    props: { features: talhoes, modelValue: [], ...props },
    global: { plugins: [PrimeVue] },
  })
}

const itens = (w: VueWrapper) => w.findAll('.w-map-select__item')

function clicar(w: VueWrapper, nome: string) {
  const alvo = itens(w).find((i) => i.find('.w-map-select__item-name').text() === nome)
  if (!alvo) throw new Error(`talhão "${nome}" não está na lista`)
  return alvo.trigger('click')
}

const emitido = (w: VueWrapper): MapSelectId[][] =>
  (w.emitted('update:modelValue') ?? []).map((e) => (e as [MapSelectId[]])[0])

const ultimo = (w: VueWrapper) => {
  const todos = emitido(w)
  return todos[todos.length - 1]
}

describe('WMapSelect — lista', () => {
  it('lista todas as features, inclusive a que não tem geometria', () => {
    const w = montar()
    expect(itens(w)).toHaveLength(4)
    expect(w.text()).toContain('P49')
  })

  it('marca a feature sem geometria com o aviso de contorno ausente', () => {
    const w = montar()
    expect(w.findAll('.w-map-select__item-nogeo')).toHaveLength(1)
  })

  it('mostra nome, subtítulo e área formatada em pt-BR', () => {
    const w = montar()
    const primeiro = itens(w)[0]
    expect(primeiro.find('.w-map-select__item-name').text()).toBe('P41')
    expect(primeiro.find('.w-map-select__item-sub').text()).toBe('Rotacionado')
    expect(primeiro.find('.w-map-select__item-area').text()).toBe('82 ha')
  })
})

describe('WMapSelect — seleção', () => {
  it('clicar adiciona o id; clicar de novo remove', async () => {
    const w = montar({ modelValue: ['P42'] })
    await clicar(w, 'P41')
    expect(ultimo(w)).toEqual(['P42', 'P41'])

    await w.setProps({ modelValue: ultimo(w) })
    await clicar(w, 'P42')
    expect(ultimo(w)).toEqual(['P41'])
  })

  it('o estado visual vem do modelValue (sem espelho interno)', async () => {
    const w = montar({ modelValue: ['P42'] })
    expect(w.findAll('.w-map-select__item--on')).toHaveLength(1)
    await w.setProps({ modelValue: ['P41', 'P42', 'P43'] })
    expect(w.findAll('.w-map-select__item--on')).toHaveLength(3)
  })

  it('a feature sem geometria é selecionável pela lista', async () => {
    const w = montar()
    await clicar(w, 'P49')
    expect(ultimo(w)).toEqual(['P49'])
  })

  it('limpar seleção zera o v-model', async () => {
    const w = montar({ modelValue: ['P41', 'P42'] })
    await w.find('.w-map-select__clear').trigger('click')
    expect(ultimo(w)).toEqual([])
  })

  it('limpar não emite nada quando já está vazio', async () => {
    const w = montar({ modelValue: [] })
    await w.find('.w-map-select__clear').trigger('click')
    expect(emitido(w)).toEqual([])
  })

  it('disabled não emite nada', async () => {
    const w = montar({ modelValue: [], disabled: true })
    await clicar(w, 'P41')
    expect(emitido(w)).toEqual([])
  })
})

describe('WMapSelect — contador e área', () => {
  it('contador em pt-BR, singular e plural', async () => {
    const w = montar({ modelValue: [] })
    expect(w.find('.w-map-select__count').text()).toBe('0 talhões selecionados')
    await w.setProps({ modelValue: ['P41'] })
    expect(w.find('.w-map-select__count').text()).toBe('1 talhão selecionado')
    await w.setProps({ modelValue: ['P41', 'P42'] })
    expect(w.find('.w-map-select__count').text()).toBe('2 talhões selecionados')
  })

  it('o rodapé soma a área só das selecionadas', async () => {
    const w = montar({ modelValue: ['P42', 'P44'] })
    // P44 nem existe na lista: id órfão não entra na conta.
    expect(w.find('.w-map-select__area strong').text()).toBe('160')
    await w.setProps({ modelValue: ['P42', 'P41'] })
    expect(w.find('.w-map-select__area strong').text()).toBe('242')
  })

  it('selectionLabel customizado troca o texto do contador', () => {
    const w = montar({ selectionLabel: (n: number) => `${n} área(s)` })
    expect(w.find('.w-map-select__count').text()).toBe('0 área(s)')
  })
})

describe('WMapSelect — layout sobreposto', () => {
  const sobreposto = (props: Record<string, unknown> = {}) =>
    montar({ layout: 'sobreposto', ...props })

  const recolher = (w: VueWrapper) => w.find('.w-map-select__collapse')

  it('o default é lado-a-lado: sem modificador de layout e sem botão de recolher', () => {
    const w = montar()
    expect(w.classes()).not.toContain('w-map-select--overlay')
    expect(w.classes()).not.toContain('w-map-select--collapsed')
    expect(recolher(w).exists()).toBe(false)
  })

  it('sobreposto marca o modificador e mantém painel, lista e rodapé', () => {
    const w = sobreposto()
    expect(w.classes()).toContain('w-map-select--overlay')
    expect(w.find('.w-map-select__panel').exists()).toBe(true)
    expect(itens(w)).toHaveLength(4)
    expect(w.find('.w-map-select__footer').exists()).toBe(true)
  })

  // O painel flutua por CIMA do mapa, mas é IRMÃO dele — nunca filho do
  // container do Leaflet. É isso que faz o clique no painel não virar clique no
  // mapa (e dispensa o L.DomEvent.disableClickPropagation).
  it('painel e rodapé ficam fora do container do Leaflet', () => {
    const w = sobreposto()
    const canvas = w.find('.w-map-select__canvas').element
    expect(canvas.contains(w.find('.w-map-select__panel').element)).toBe(false)
    expect(canvas.contains(w.find('.w-map-select__footer').element)).toBe(false)
  })

  it('recolher e expandir alternam o modificador e o aria-expanded', async () => {
    const w = sobreposto()
    expect(recolher(w).attributes('aria-expanded')).toBe('true')
    expect(w.classes()).not.toContain('w-map-select--collapsed')

    await recolher(w).trigger('click')
    expect(w.classes()).toContain('w-map-select--collapsed')
    expect(recolher(w).attributes('aria-expanded')).toBe('false')

    await recolher(w).trigger('click')
    expect(w.classes()).not.toContain('w-map-select--collapsed')
    expect(recolher(w).attributes('aria-expanded')).toBe('true')
  })

  it('o aria-label do botão diz o que o clique vai fazer', async () => {
    const w = sobreposto({ collapseLabel: 'Esconder', expandLabel: 'Mostrar' })
    expect(recolher(w).attributes('aria-label')).toBe('Esconder')
    await recolher(w).trigger('click')
    expect(recolher(w).attributes('aria-label')).toBe('Mostrar')
  })

  it('a pílula mostra o contador só quando há seleção', async () => {
    const w = sobreposto({ modelValue: [] })
    expect(w.find('.w-map-select__collapse-count').exists()).toBe(false)
    await w.setProps({ modelValue: ['P41', 'P42'] })
    expect(w.find('.w-map-select__collapse-count').text()).toBe('2')
  })

  it('selecionar pela lista continua igual no sobreposto', async () => {
    const w = sobreposto({ modelValue: ['P42'] })
    await clicar(w, 'P41')
    expect(ultimo(w)).toEqual(['P42', 'P41'])

    await w.setProps({ modelValue: ultimo(w) })
    await clicar(w, 'P42')
    expect(ultimo(w)).toEqual(['P41'])
  })

  it('busca, contador, limpar e área somada seguem funcionando no sobreposto', async () => {
    const w = sobreposto({ modelValue: ['P41', 'P42'] })
    expect(w.find('.w-map-select__count').text()).toBe('2 talhões selecionados')
    expect(w.find('.w-map-select__area strong').text()).toBe('242')

    await w.find('input[type="text"]').setValue('soja')
    expect(itens(w)).toHaveLength(1)

    await w.find('.w-map-select__clear').trigger('click')
    expect(ultimo(w)).toEqual([])
  })

  it('trocar de layout em runtime não mexe na seleção', async () => {
    const w = montar({ modelValue: ['P41'] })
    await w.setProps({ layout: 'sobreposto' })
    expect(w.classes()).toContain('w-map-select--overlay')
    expect(w.findAll('.w-map-select__item--on')).toHaveLength(1)
    expect(emitido(w)).toEqual([])
  })

  it('expõe o estado do painel para o consumidor', async () => {
    const w = sobreposto()
    const api = w.vm as unknown as { collapsed: boolean; setCollapsed: (v: boolean) => void }
    expect(api.collapsed).toBe(false)
    api.setCollapsed(true)
    await w.vm.$nextTick()
    expect(w.classes()).toContain('w-map-select--collapsed')
  })
})

describe('WMapSelect — busca', () => {
  it('filtra por nome e por subtítulo, sem caixa e sem acento', async () => {
    const w = montar()
    const input = w.find('input[type="text"]')

    await input.setValue('p4')
    expect(itens(w)).toHaveLength(4)

    await input.setValue('SOJA')
    expect(itens(w)).toHaveLength(1)
    expect(w.text()).toContain('P43')

    await input.setValue('pastagem')
    expect(itens(w)).toHaveLength(1)
    expect(w.text()).toContain('P49')
  })

  it('busca sem resultado mostra o emptyMessage e não perde a seleção', async () => {
    const w = montar({ modelValue: ['P41'], emptyMessage: 'Nada por aqui' })
    await w.find('input[type="text"]').setValue('zzzz')
    expect(itens(w)).toHaveLength(0)
    expect(w.find('.w-map-select__empty').text()).toBe('Nada por aqui')
    expect(w.find('.w-map-select__area strong').text()).toBe('82')
    expect(emitido(w)).toEqual([])
  })
})
