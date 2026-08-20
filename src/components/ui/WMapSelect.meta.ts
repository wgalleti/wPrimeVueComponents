import { defineComponentMeta } from '@/types/componentMeta'
import type { MapSelectFeature } from '@/types/mapSelect'

/** Quadrilátero simples a partir de um canto — só para o exemplo ao vivo. */
function quadra(lng: number, lat: number, w: number, h: number) {
  return {
    type: 'Polygon' as const,
    coordinates: [
      [
        [lng, lat],
        [lng + w, lat],
        [lng + w, lat - h],
        [lng, lat - h],
        [lng, lat],
      ] as [number, number][],
    ],
  }
}

const talhoes: MapSelectFeature[] = [
  {
    id: 'P41',
    nome: 'P41',
    subtitulo: 'Rotacionado',
    area: 82,
    geometria: quadra(-52.852, -27.856, 0.009, 0.007),
  },
  {
    id: 'P42',
    nome: 'P42',
    subtitulo: 'Rotacionado',
    area: 160,
    geometria: quadra(-52.843, -27.856, 0.01, 0.007),
  },
  {
    id: 'P43',
    nome: 'P43',
    subtitulo: 'Soja / Milho',
    area: 74,
    geometria: quadra(-52.833, -27.856, 0.009, 0.007),
  },
  {
    id: 'P44',
    nome: 'P44',
    subtitulo: 'Rotacionado',
    area: 100,
    geometria: quadra(-52.852, -27.863, 0.009, 0.007),
  },
  {
    id: 'P45',
    nome: 'P45',
    subtitulo: 'Soja / Milho',
    area: 58,
    geometria: quadra(-52.843, -27.863, 0.01, 0.007),
  },
  { id: 'P49', nome: 'P49', subtitulo: 'Sem contorno cadastrado', area: 31 },
]

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-map',
  summary:
    'Seleção múltipla de polígonos num mapa de satélite, com painel de busca, contador e área somada.',
  controls: {
    layout: { type: 'select', options: ['lado-a-lado', 'sobreposto'] },
    tooltips: { type: 'select', options: ['permanent', 'hover'] },
    selectionMode: { type: 'select', options: ['multiple', 'single', 'none'] },
  },
  examples: [
    {
      name: 'Talhões do setor',
      description:
        'Clique no polígono ou na lista — os dois leem o mesmo v-model. P49 não tem geometria: some do mapa, fica na lista.',
      props: {
        features: talhoes,
        modelValue: ['P42', 'P44'],
      },
    },
    {
      name: 'Controles sobre o mapa',
      description:
        'O mapa ocupa tudo e os controles flutuam em vidro. O botão no topo do painel recolhe ' +
        'para uma pílula (ícone + contador) e devolve o mapa inteiro.',
      props: {
        features: talhoes,
        modelValue: ['P42', 'P44'],
        layout: 'sobreposto',
        height: '520px',
      },
    },
    {
      name: 'Destaque por dado',
      description:
        'O `featureStyle` pinta o contorno a partir da própria feature — aqui os talhões que a ' +
        'recomendação prevê saem em verde, selecionados ou não. O ajuste é mesclado sobre o ' +
        'estilo base, então o preenchimento de "selecionado" continua valendo.',
      props: {
        features: talhoes,
        modelValue: ['P44'],
        layout: 'sobreposto',
        height: '460px',
        featureStyle: (feature: MapSelectFeature) =>
          ['P44', 'P45'].includes(String(feature.id)) ? { color: '#3ddc84', weight: 4 } : null,
      },
    },
    {
      name: 'Destaque de arrasto (highlightFeature)',
      description:
        'O `highlightFeature` acende um polígono por cima de tudo (estilo de selecionado), sem ' +
        'tocar na seleção — é o feedback do arrasto: quem chama liga o `hitTest(clientX, ' +
        'clientY)` no `pointermove` e publica aqui o id sob o dedo.',
      props: {
        features: talhoes,
        modelValue: ['P44'],
        highlightFeature: 'P42',
        layout: 'sobreposto',
        height: '380px',
      },
    },
    {
      name: 'Mapa baixo',
      description: 'A altura é do consumidor (o componente vive dentro de um Dialog).',
      props: {
        features: talhoes,
        modelValue: [],
        height: '300px',
      },
    },
    {
      name: 'Desabilitado',
      description: 'Os controles continuam à vista, esmaecidos — nada seleciona.',
      props: {
        features: talhoes,
        modelValue: ['P41'],
        disabled: true,
      },
    },
    {
      name: 'Só o desenho',
      description:
        'Sem painel de busca e sem barra de área: o mapa vira exibição. Para a listagem que já ' +
        'tem a própria busca, ou para conferir o contorno num cadastro. O `modelValue` continua ' +
        'destacando de fora.',
      props: {
        features: talhoes,
        modelValue: ['P41'],
        readonly: true,
        layout: 'sobreposto',
        height: '320px',
      },
    },
    {
      name: 'Muitos polígonos: hover + escolha única',
      description:
        'Para o mapa denso (100+ talhões): `tooltips="hover"` tira os rótulos permanentes ' +
        '(um nó DOM por talhão) e `selectionMode="single"` faz o clique escolher UM talhão ' +
        'mesmo no readonly — o painel some, mas o v-model continua saindo.',
      props: {
        features: talhoes,
        modelValue: [],
        readonly: true,
        selectionMode: 'single',
        tooltips: 'hover',
        height: '320px',
      },
    },
  ],
})
