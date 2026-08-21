// @vitest-environment jsdom
//
// Duas frentes aqui: a SELEÇÃO pelo painel (que nunca depende do Leaflet ter
// subido) e o comportamento do MAPA — para este, o Leaflet é MOCKADO: o
// import() dinâmico do componente cai no fake abaixo, que registra mapas e
// layers criados para os testes de diff incremental, tooltip e fit.
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { toRaw } from 'vue'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import type { MapSelectFeature, MapSelectId } from '@/types/mapSelect'

// --- Mock do Leaflet --------------------------------------------------------

interface FakeTooltip {
  content: string
  options: Record<string, unknown>
}

interface FakeLayer {
  geometria: unknown
  opcoes: Record<string, unknown>
  removida: boolean
  mapa: FakeMap | null
  tooltip: FakeTooltip | null
  estilo: unknown
  fire: (evento: string, payload?: unknown) => void
  on: (evento: string, fn: () => void) => FakeLayer
  getBounds: () => { isValid: () => boolean }
}

interface FakeMap {
  opcoes: Record<string, unknown>
  fitBoundsCalls: { bounds: unknown; options: unknown }[]
  setViewCalls: unknown[]
}

const registro = vi.hoisted(() => ({
  mapas: [] as unknown[],
  camadas: [] as unknown[],
}))

vi.mock('leaflet', () => {
  const bounds = () => ({
    isValid: () => true,
    getSouthWest: () => ({ lat: -1, lng: -1 }),
    getNorthEast: () => ({ lat: 1, lng: 1 }),
  })

  function fakeMap(_el: unknown, opcoes: Record<string, unknown>) {
    const mapa = {
      opcoes,
      fitBoundsCalls: [] as { bounds: unknown; options: unknown }[],
      setViewCalls: [] as unknown[],
      fitBounds(b: unknown, o: unknown) {
        mapa.fitBoundsCalls.push({ bounds: b, options: o })
      },
      setView(...args: unknown[]) {
        mapa.setViewCalls.push(args)
      },
      invalidateSize() {},
      remove() {},
      // Conversão linear de mentira: containerPoint [x, y] → { lng: x, lat: y }.
      containerPointToLatLng(point: [number, number]) {
        return { lng: point[0], lat: point[1] }
      },
    }
    registro.mapas.push(mapa)
    return mapa
  }

  function fakeGeoJSON(geometria: unknown, opcoes: Record<string, unknown> = {}) {
    const eventos: Record<string, ((payload?: unknown) => void)[]> = {}
    const tooltipEl = document.createElement('div')
    const camada = {
      geometria,
      opcoes,
      removida: false,
      mapa: null as unknown,
      tooltip: null as FakeTooltip | null,
      estilo: null as unknown,
      on(evento: string, fn: (payload?: unknown) => void) {
        ;(eventos[evento] ??= []).push(fn)
        return camada
      },
      fire(evento: string, payload?: unknown) {
        for (const fn of eventos[evento] ?? []) fn(payload)
      },
      setStyle(estilo: unknown) {
        camada.estilo = estilo
        return camada
      },
      bindTooltip(content: string, options: Record<string, unknown>) {
        camada.tooltip = { content, options }
        return camada
      },
      unbindTooltip() {
        camada.tooltip = null
        return camada
      },
      getTooltip() {
        if (!camada.tooltip) return undefined
        return {
          getElement: () => tooltipEl,
          setContent: (content: string) => {
            if (camada.tooltip) camada.tooltip.content = content
          },
        }
      },
      addTo(mapa: unknown) {
        camada.mapa = mapa
        return camada
      },
      remove() {
        camada.removida = true
        camada.mapa = null
        return camada
      },
      getBounds: bounds,
    }
    registro.camadas.push(camada)
    return camada
  }

  const api = {
    map: fakeMap,
    tileLayer: () => ({ addTo: () => ({}) }),
    geoJSON: fakeGeoJSON,
    latLngBounds: () => bounds(),
  }
  return { ...api, default: api }
})

vi.mock('leaflet/dist/leaflet.css', () => ({}))

import WMapSelect from './WMapSelect.vue'

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

// `readonly` é a via de EXIBIÇÃO: quem só mostra o desenho não tem o que buscar
// (a tela já tem a própria busca) nem o que somar (não há seleção). O contrato é
// "some o painel e o rodapé, e nada emite" — o `disabled`, por contraste, mantém
// tudo à vista, só esmaecido.
describe('WMapSelect — readonly', () => {
  const somenteLeitura = (props: Record<string, unknown> = {}) =>
    montar({ readonly: true, ...props })

  it('marca o modificador e esconde painel e rodapé', () => {
    const w = somenteLeitura()
    expect(w.classes()).toContain('w-map-select--readonly')
    expect(w.find('.w-map-select__panel').exists()).toBe(false)
    expect(w.find('.w-map-select__footer').exists()).toBe(false)
    expect(w.find('input[type="text"]').exists()).toBe(false)
    expect(itens(w)).toHaveLength(0)
  })

  it('o mapa continua lá — é só ele que sobra', () => {
    const w = somenteLeitura()
    expect(w.find('.w-map-select__canvas').exists()).toBe(true)
  })

  it('vale também no sobreposto, e sem botão de recolher (não há painel)', () => {
    const w = somenteLeitura({ layout: 'sobreposto' })
    expect(w.classes()).toContain('w-map-select--overlay')
    expect(w.find('.w-map-select__collapse').exists()).toBe(false)
    expect(w.classes()).not.toContain('w-map-select--collapsed')
  })

  it('o modelValue segue valendo para destacar de fora, sem emitir de volta', async () => {
    const w = somenteLeitura({ modelValue: ['P41'] })
    await w.setProps({ modelValue: ['P42', 'P43'] })
    expect(emitido(w)).toEqual([])
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

// --- Comportamento do mapa (Leaflet mockado) --------------------------------

describe('WMapSelect — mapa', () => {
  beforeEach(() => {
    registro.mapas.length = 0
    registro.camadas.length = 0
  })

  /** Monta e espera o import() dinâmico do Leaflet (mockado) resolver. */
  async function montarMapa(props: Record<string, unknown> = {}) {
    const w = montar(props)
    await flushPromises()
    return w
  }

  const mapa = () => registro.mapas[registro.mapas.length - 1] as FakeMap

  /** Layers vivas no mapa (o fitToScope também cria layers, mas nunca as adiciona). */
  const ativas = () => (registro.camadas as FakeLayer[]).filter((c) => !c.removida && c.mapa)

  // O componente recebe as features via props REATIVAS: a geometria que chega ao
  // Leaflet é o proxy do Vue — toRaw() devolve o objeto original da fixture.
  const camadaDe = (feature: MapSelectFeature) =>
    ativas().find((c) => toRaw(c.geometria) === feature.geometria)

  it('cria o mapa com preferCanvas', async () => {
    await montarMapa()
    expect(mapa().opcoes.preferCanvas).toBe(true)
  })

  it('desenha uma layer por feature com geometria', async () => {
    await montarMapa()
    expect(ativas()).toHaveLength(3) // P49 não tem geometria
  })

  describe('tooltips', () => {
    it('default permanent: tooltip sempre visível, mesma classe', async () => {
      await montarMapa()
      const tip = camadaDe(talhoes[0])?.tooltip
      expect(tip?.options.permanent).toBe(true)
      expect(tip?.options.sticky).toBeUndefined()
      expect(tip?.options.className).toBe('w-map-select__tip')
      expect(tip?.content).toBe('P41 · 82 ha')
    })

    it('hover: não permanente, sticky, mesma classe', async () => {
      await montarMapa({ tooltips: 'hover' })
      const tip = camadaDe(talhoes[0])?.tooltip
      expect(tip?.options.permanent).toBe(false)
      expect(tip?.options.sticky).toBe(true)
      expect(tip?.options.className).toBe('w-map-select__tip')
    })
  })

  describe('diff incremental de features', () => {
    it('anexar uma página preserva as layers já desenhadas e só cria as novas', async () => {
      const pagina1 = talhoes.slice(0, 2)
      const w = await montarMapa({ features: pagina1 })
      const antes = ativas()
      expect(antes).toHaveLength(2)

      const extra: MapSelectFeature = {
        id: 'P50',
        nome: 'P50',
        area: 40,
        geometria: quadra(-52.82, -27.85),
      }
      await w.setProps({ features: [...pagina1, extra] })

      // As duas primeiras são as MESMAS instâncias — nada foi destruído.
      expect(camadaDe(pagina1[0])).toBe(antes[0])
      expect(camadaDe(pagina1[1])).toBe(antes[1])
      expect(ativas()).toHaveLength(3)
    })

    it('o fitBounds acontece só na primeira leva — página nova não move o mapa', async () => {
      const pagina1 = talhoes.slice(0, 2)
      const w = await montarMapa({ features: pagina1 })
      expect(mapa().fitBoundsCalls).toHaveLength(1)

      await w.setProps({
        features: [...pagina1, { id: 'P50', nome: 'P50', geometria: quadra(-52.82, -27.85) }],
      })
      expect(mapa().fitBoundsCalls).toHaveLength(1)
    })

    it('id que saiu tem a layer removida', async () => {
      const w = await montarMapa()
      const removivel = camadaDe(talhoes[0])
      await w.setProps({ features: talhoes.slice(1) })
      expect(removivel?.removida).toBe(true)
      expect(ativas()).toHaveLength(2)
    })

    it('geometria trocada (referência nova) recria a layer do id', async () => {
      const w = await montarMapa()
      const original = camadaDe(talhoes[1])
      const novaGeometria = quadra(-52.99, -27.99)
      const trocadas = talhoes.map((f) => (f.id === 'P42' ? { ...f, geometria: novaGeometria } : f))
      await w.setProps({ features: trocadas })

      expect(original?.removida).toBe(true)
      const recriada = ativas().find((c) => toRaw(c.geometria) === novaGeometria)
      expect(recriada).toBeTruthy()
      // As demais seguem intactas.
      expect(camadaDe(talhoes[0])?.removida).toBe(false)
    })
  })

  describe('selectionMode', () => {
    it('default interativo é multiple: o clique no polígono acumula ids', async () => {
      const w = await montarMapa({ modelValue: ['P42'] })
      camadaDe(talhoes[0])?.fire('click')
      expect(ultimo(w)).toEqual(['P42', 'P41'])
    })

    it('readonly sem selectionMode: nada emite (modo none) e marca --unselectable', async () => {
      const w = await montarMapa({ readonly: true })
      expect(w.classes()).toContain('w-map-select--unselectable')
      camadaDe(talhoes[0])?.fire('click')
      expect(emitido(w)).toEqual([])
    })

    it('none explícito: nem o modo interativo emite', async () => {
      const w = await montarMapa({ selectionMode: 'none' })
      expect(w.classes()).toContain('w-map-select--unselectable')
      camadaDe(talhoes[0])?.fire('click')
      expect(emitido(w)).toEqual([])
    })

    it('single: o clique substitui a seleção; clicar no selecionado desmarca', async () => {
      const w = await montarMapa({ selectionMode: 'single', modelValue: ['P42'] })
      camadaDe(talhoes[0])?.fire('click')
      expect(ultimo(w)).toEqual(['P41'])

      await w.setProps({ modelValue: ['P41'] })
      camadaDe(talhoes[0])?.fire('click')
      expect(ultimo(w)).toEqual([])
    })

    it('selectionMode explícito vale MESMO com readonly (painel segue escondido)', async () => {
      const w = await montarMapa({ readonly: true, selectionMode: 'single' })
      expect(w.find('.w-map-select__panel').exists()).toBe(false)
      expect(w.find('.w-map-select__footer').exists()).toBe(false)
      expect(w.classes()).not.toContain('w-map-select--unselectable')

      camadaDe(talhoes[1])?.fire('click')
      expect(ultimo(w)).toEqual(['P42'])
    })

    it('single vale também para o clique na lista', async () => {
      const w = await montarMapa({ selectionMode: 'single', modelValue: ['P42'] })
      await clicar(w, 'P41')
      expect(ultimo(w)).toEqual(['P41'])
    })

    it('disabled continua mudo em qualquer modo', async () => {
      const w = await montarMapa({ selectionMode: 'single', disabled: true })
      camadaDe(talhoes[0])?.fire('click')
      expect(emitido(w)).toEqual([])
    })
  })

  describe('métodos expostos', () => {
    interface ApiExposta {
      fitToScope: () => void
      fitToFeature: (id: MapSelectId) => void
    }

    it('fitToFeature enquadra a layer do id com padding', async () => {
      const w = await montarMapa()
      const antes = mapa().fitBoundsCalls.length
      ;(w.vm as unknown as ApiExposta).fitToFeature('P41')
      expect(mapa().fitBoundsCalls).toHaveLength(antes + 1)
      expect(mapa().fitBoundsCalls[antes].options).toEqual({ padding: [20, 20] })
    })

    it('fitToFeature de id sem layer é no-op', async () => {
      const w = await montarMapa()
      const antes = mapa().fitBoundsCalls.length
      ;(w.vm as unknown as ApiExposta).fitToFeature('P49') // sem geometria
      ;(w.vm as unknown as ApiExposta).fitToFeature('inexistente')
      expect(mapa().fitBoundsCalls).toHaveLength(antes)
    })

    it('fitToScope exposto reenquadra sob demanda', async () => {
      const w = await montarMapa()
      const antes = mapa().fitBoundsCalls.length
      ;(w.vm as unknown as ApiExposta).fitToScope()
      expect(mapa().fitBoundsCalls).toHaveLength(antes + 1)
    })
  })
})

// --- Destaque por feature ---------------------------------------------------
//
// O `featureStyle` existe para o mapa mostrar um DADO do domínio (o talhão que a
// recomendação prevê, a área já colhida) sem obrigar o consumidor a reescrever
// os dois estilos base. Por isso o que ele devolve é MESCLADO, não substituído.
describe('WMapSelect — destaque por feature', () => {
  beforeEach(() => {
    registro.mapas.length = 0
    registro.camadas.length = 0
  })

  async function montarMapa(props: Record<string, unknown> = {}) {
    const w = montar(props)
    await flushPromises()
    return w
  }

  const ativas = () => (registro.camadas as FakeLayer[]).filter((c) => !c.removida && c.mapa)

  const camadaDe = (feature: MapSelectFeature) =>
    ativas().find((c) => toRaw(c.geometria) === feature.geometria)

  const verde = (feature: MapSelectFeature) =>
    feature.id === 'P42' ? { color: '#3ddc84', weight: 4 } : null

  it('mescla o ajuste sobre o estilo base e deixa o resto intacto', async () => {
    await montarMapa({ featureStyle: verde })
    const destacada = camadaDe(talhoes[1])?.estilo as Record<string, unknown>
    expect(destacada.color).toBe('#3ddc84')
    expect(destacada.weight).toBe(4)
    // O que o ajuste não citou continua vindo do polygonStyle.
    expect(destacada.fillOpacity).toBe(0.06)
  })

  it('feature fora da regra segue no estilo padrão', async () => {
    await montarMapa({ featureStyle: verde })
    expect((camadaDe(talhoes[0])?.estilo as Record<string, unknown>).color).toBe('#ffffff')
  })

  it('o destaque sobrevive à seleção: mescla sobre o estilo de selecionado', async () => {
    const w = await montarMapa({ featureStyle: verde })
    await w.setProps({ modelValue: ['P42'] })
    const estilo = camadaDe(talhoes[1])?.estilo as Record<string, unknown>
    expect(estilo.color).toBe('#3ddc84')
    // Preenchimento é do estado selecionado — o destaque não o desfaz.
    expect(estilo.fillColor).toBe('#1f5092')
  })

  it('a regra recebe o estado de seleção da feature', async () => {
    const vistos: boolean[] = []
    const w = await montarMapa({
      featureStyle: (feature: MapSelectFeature, selecionada: boolean) => {
        if (feature.id === 'P42') vistos.push(selecionada)
        return null
      },
    })
    await w.setProps({ modelValue: ['P42'] })
    expect(vistos).toContain(false)
    expect(vistos).toContain(true)
  })

  it('trocar a regra repinta o que já estava desenhado', async () => {
    const w = await montarMapa()
    expect((camadaDe(talhoes[1])?.estilo as Record<string, unknown>).color).toBe('#ffffff')
    await w.setProps({ featureStyle: verde })
    expect((camadaDe(talhoes[1])?.estilo as Record<string, unknown>).color).toBe('#3ddc84')
  })

  it('sem a prop, nada muda', async () => {
    await montarMapa()
    expect((camadaDe(talhoes[1])?.estilo as Record<string, unknown>).color).toBe('#ffffff')
  })
})

// --- hitTest e highlightFeature ---------------------------------------------
//
// O arrasto (bag → talhão) não tem "elemento sob o dedo" no renderer canvas: o
// hitTest é geométrico (ray casting sobre o GeoJSON) e o highlightFeature é o
// feedback transitório do gesto — acende o polígono sob o dedo sem tocar na
// seleção. O mock converte containerPoint [x, y] direto em { lng: x, lat: y },
// então o "clientX/clientY" dos testes é a própria coordenada geográfica.
describe('WMapSelect — hitTest e highlightFeature', () => {
  beforeEach(() => {
    registro.mapas.length = 0
    registro.camadas.length = 0
  })

  async function montarMapa(props: Record<string, unknown> = {}) {
    const w = montar(props)
    await flushPromises()
    return w
  }

  const ativas = () => (registro.camadas as FakeLayer[]).filter((c) => !c.removida && c.mapa)

  const camadaDe = (feature: MapSelectFeature) =>
    ativas().find((c) => toRaw(c.geometria) === feature.geometria)

  interface ApiExposta {
    hitTest: (x: number, y: number) => MapSelectId | null
  }

  it('devolve o id do polígono que contém o ponto', async () => {
    const w = await montarMapa()
    // Dentro de P41: quadra(-52.85, -27.85) cobre lng −52,85..−52,84, lat −27,86..−27,85.
    expect((w.vm as unknown as ApiExposta).hitTest(-52.845, -27.855)).toBe('P41')
    expect((w.vm as unknown as ApiExposta).hitTest(-52.835, -27.855)).toBe('P42')
  })

  it('fora de qualquer polígono devolve null', async () => {
    const w = await montarMapa()
    expect((w.vm as unknown as ApiExposta).hitTest(-40, -20)).toBeNull()
  })

  it('feature sem geometria nunca é acertada', async () => {
    const w = await montarMapa({ features: [{ id: 'P49', nome: 'P49' }] })
    expect((w.vm as unknown as ApiExposta).hitTest(-52.845, -27.855)).toBeNull()
  })

  it('MultiPolygon: acerta qualquer um dos polígonos', async () => {
    const multi: MapSelectFeature = {
      id: 'M1',
      nome: 'M1',
      geometria: {
        type: 'MultiPolygon',
        coordinates: [
          quadra(-52.85, -27.85).coordinates,
          quadra(-52.7, -27.7).coordinates,
        ],
      },
    }
    const w = await montarMapa({ features: [multi] })
    expect((w.vm as unknown as ApiExposta).hitTest(-52.845, -27.855)).toBe('M1')
    expect((w.vm as unknown as ApiExposta).hitTest(-52.695, -27.705)).toBe('M1')
    expect((w.vm as unknown as ApiExposta).hitTest(-52.5, -27.5)).toBeNull()
  })

  it('highlightFeature aplica o estilo de selecionado sem mexer na seleção', async () => {
    const w = await montarMapa({ modelValue: [] })
    expect((camadaDe(talhoes[0])?.estilo as Record<string, unknown>).fillColor).toBe('#ffffff')

    await w.setProps({ highlightFeature: 'P41' })
    expect((camadaDe(talhoes[0])?.estilo as Record<string, unknown>).fillColor).toBe('#1f5092')
    // Nada foi emitido: destaque é feedback, não seleção.
    expect(emitido(w)).toEqual([])

    await w.setProps({ highlightFeature: null })
    expect((camadaDe(talhoes[0])?.estilo as Record<string, unknown>).fillColor).toBe('#ffffff')
  })

  it('o destaque vence o featureStyle enquanto durar', async () => {
    const verde = (feature: MapSelectFeature) =>
      feature.id === 'P41' ? { fillColor: '#3ddc84' } : null
    const w = await montarMapa({ featureStyle: verde })
    expect((camadaDe(talhoes[0])?.estilo as Record<string, unknown>).fillColor).toBe('#3ddc84')

    await w.setProps({ highlightFeature: 'P41' })
    expect((camadaDe(talhoes[0])?.estilo as Record<string, unknown>).fillColor).toBe('#1f5092')
  })
})


// --- Rótulo e cartão de detalhe ---------------------------------------------
//
// A divisão que estes testes protegem: o componente decide QUANDO abrir e ONDE
// posicionar o cartão; o CONTEÚDO é do slot. É o que permite a tela evoluir o
// cartão sem tocar na suite.
describe('WMapSelect — rótulo e cartão de detalhe', () => {
  beforeEach(() => {
    registro.mapas.length = 0
    registro.camadas.length = 0
  })

  async function montarMapa(props: Record<string, unknown> = {}, slots?: Record<string, string>) {
    const w = mount(WMapSelect, {
      props: { features: talhoes, modelValue: [], ...props },
      slots,
      global: { plugins: [PrimeVue] },
    })
    await flushPromises()
    return w
  }

  const ativas = () => (registro.camadas as FakeLayer[]).filter((c) => !c.removida && c.mapa)

  const camadaDe = (feature: MapSelectFeature) =>
    ativas().find((c) => toRaw(c.geometria) === feature.geometria)

  const cartao = (w: VueWrapper) => w.find('.w-map-select__detail')

  const ponto = (x: number, y: number) => ({ containerPoint: { x, y } })

  describe('featureLabel', () => {
    it('sem a prop, o rótulo segue "nome · área"', async () => {
      await montarMapa()
      expect(camadaDe(talhoes[0])?.tooltip?.content).toBe('P41 · 82 ha')
    })

    it('a função manda no texto do rótulo', async () => {
      await montarMapa({ featureLabel: (f: MapSelectFeature) => `T-${f.nome}` })
      expect(camadaDe(talhoes[0])?.tooltip?.content).toBe('T-P41')
    })

    it('texto vazio não vira tooltip fantasma', async () => {
      await montarMapa({ featureLabel: () => '' })
      expect(camadaDe(talhoes[0])?.tooltip).toBeNull()
    })
  })

  describe('featureDetail', () => {
    it('default é none: nenhum cartão, nem no hover', async () => {
      const w = await montarMapa()
      camadaDe(talhoes[0])?.fire('mouseover')
      await flushPromises()
      expect(cartao(w).exists()).toBe(false)
      expect(w.emitted('feature-enter')).toBeUndefined()
    })

    it('hover abre com o conteúdo do slot e fecha ao sair', async () => {
      const w = await montarMapa(
        { featureDetail: 'hover' },
        { 'feature-detail': '<b class="alvo">{{ params.feature.nome }}</b>' },
      )

      camadaDe(talhoes[0])?.fire('mouseover', ponto(120, 300))
      await flushPromises()
      expect(cartao(w).exists()).toBe(true)
      expect(w.find('.alvo').text()).toBe('P41')
      expect(w.emitted('feature-enter')?.length).toBe(1)

      camadaDe(talhoes[0])?.fire('mouseout')
      await flushPromises()
      expect(cartao(w).exists()).toBe(false)
      expect(w.emitted('feature-leave')?.length).toBe(1)
    })

    it('passear pelo mesmo polígono não reemite feature-enter', async () => {
      const w = await montarMapa({ featureDetail: 'hover' })
      camadaDe(talhoes[0])?.fire('mouseover', ponto(10, 300))
      camadaDe(talhoes[0])?.fire('mouseover', ponto(20, 300))
      await flushPromises()
      expect(w.emitted('feature-enter')?.length).toBe(1)
    })

    it('sem slot, o cartão mostra nome e subtítulo da feature', async () => {
      const w = await montarMapa({ featureDetail: 'hover' })
      camadaDe(talhoes[0])?.fire('mouseover', ponto(50, 300))
      await flushPromises()
      expect(cartao(w).text()).toContain('P41')
      expect(cartao(w).text()).toContain('Rotacionado')
    })

    it('no hover o cartão não recebe o ponteiro (senão piscaria)', async () => {
      const w = await montarMapa({ featureDetail: 'hover' })
      camadaDe(talhoes[0])?.fire('mouseover', ponto(50, 300))
      await flushPromises()
      expect(cartao(w).classes()).toContain('w-map-select__detail--hover')
    })

    it('click abre e o clique no mesmo polígono fecha', async () => {
      const w = await montarMapa({ featureDetail: 'click' })

      camadaDe(talhoes[0])?.fire('click', ponto(80, 300))
      await flushPromises()
      expect(cartao(w).exists()).toBe(true)

      camadaDe(talhoes[0])?.fire('click', ponto(80, 300))
      await flushPromises()
      expect(cartao(w).exists()).toBe(false)
    })

    it('Esc fecha o cartão', async () => {
      const w = await montarMapa({ featureDetail: 'click' })
      camadaDe(talhoes[0])?.fire('click', ponto(80, 300))
      await flushPromises()

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await flushPromises()
      expect(cartao(w).exists()).toBe(false)
    })

    it('o ponto apontado vira a posição do cartão', async () => {
      const w = await montarMapa({ featureDetail: 'hover' })
      camadaDe(talhoes[0])?.fire('mouseover', ponto(140, 260))
      await flushPromises()
      expect(cartao(w).attributes('style')).toContain('left: 140px')
      expect(cartao(w).attributes('style')).toContain('top: 260px')
    })

    it('perto do topo o cartão vira para baixo', async () => {
      const w = await montarMapa({ featureDetail: 'hover' })
      camadaDe(talhoes[0])?.fire('mouseover', ponto(140, 40))
      await flushPromises()
      expect(cartao(w).classes()).toContain('w-map-select__detail--abaixo')
    })

    it('no canto o cartão não é posicionado pelo cursor', async () => {
      const w = await montarMapa({ featureDetail: 'hover', detailPlacement: 'canto' })
      camadaDe(talhoes[0])?.fire('mouseover', ponto(140, 260))
      await flushPromises()
      expect(cartao(w).classes()).toContain('w-map-select__detail--canto')
      expect(cartao(w).attributes('style')).toBeUndefined()
    })

    it('trocar o modo fecha o cartão aberto', async () => {
      const w = await montarMapa({ featureDetail: 'hover' })
      camadaDe(talhoes[0])?.fire('mouseover', ponto(50, 300))
      await flushPromises()

      await w.setProps({ featureDetail: 'click' })
      await flushPromises()
      expect(cartao(w).exists()).toBe(false)
    })

    it('fecharDetalhe() fecha de fora', async () => {
      const w = await montarMapa({ featureDetail: 'click' })
      camadaDe(talhoes[0])?.fire('click', ponto(50, 300))
      await flushPromises()

      ;(w.vm as unknown as { fecharDetalhe: () => void }).fecharDetalhe()
      await flushPromises()
      expect(cartao(w).exists()).toBe(false)
    })
  })

  describe('feature-click', () => {
    it('sai a cada clique, com a feature inteira', async () => {
      const w = await montarMapa()
      camadaDe(talhoes[1])?.fire('click')
      await flushPromises()
      const [[feature]] = w.emitted('feature-click') as [MapSelectFeature][]
      expect(feature.id).toBe('P42')
    })

    it('sai também no mapa de leitura, onde nada seleciona', async () => {
      const w = await montarMapa({ readonly: true, selectionMode: 'none' })
      camadaDe(talhoes[1])?.fire('click')
      await flushPromises()
      expect(w.emitted('feature-click')?.length).toBe(1)
      expect(w.emitted('update:modelValue')).toBeUndefined()
    })
  })
})
