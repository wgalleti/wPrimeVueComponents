<script setup lang="ts">
// `readonly` do Vue entra com apelido: existe uma PROP chamada `readonly`, e no
// template o binding do import ganharia dela — a função é sempre truthy, então
// `v-if="!readonly"` nunca renderizaria painel nem rodapé.
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  readonly as somenteLeitura,
  ref,
  watch,
} from 'vue'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import type { Geometry } from 'geojson'
import type { GeoJSON as LeafletGeoJSON, LatLng, Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useFormatters } from '@/composables/useFormatters'
import type {
  MapSelectFeature,
  MapSelectGeometry,
  MapSelectId,
  MapSelectPolygonStyle,
  MapSelectSelectionMode,
  MapSelectTooltips,
} from '@/types/mapSelect'

/** Aviso de Leaflet fora do ar. Extraído porque o `readonly` precisa reconhecê-lo:
 *  ali não existe lista ao lado para onde mandar o usuário. */
const ERRO_MAPA_PADRAO = 'O mapa não pôde ser carregado. Selecione os talhões pela lista ao lado.'
const ERRO_MAPA_READONLY = 'O mapa não pôde ser carregado.'

/**
 * Seleção múltipla de polígonos num mapa de satélite, com painel lateral de busca.
 *
 * O componente NÃO é dono da seleção: `modelValue` é a fonte da verdade e todo
 * clique (no polígono ou na lista) sai como `update:modelValue`. Isso mantém o
 * mapa e a lista sempre coerentes — os dois leem o mesmo array.
 *
 * O Leaflet entra por `import()` dinâmico: o mapa costuma viver dentro de um
 * Dialog, e carregar ~150 kB de biblioteca de mapa no bundle de quem só abre um
 * CRUD é desperdício. Se o `import()` falhar (offline, CSP), o mapa é substituído
 * por um aviso e o painel lateral continua funcionando — selecionar talhão pela
 * lista nunca depende do mapa ter subido.
 *
 * `layout` só troca POSICIONAMENTO (CSS): a marcação é a mesma nos dois modos.
 * No `'sobreposto'` o mapa ocupa tudo e o painel/rodapé flutuam por cima em
 * vidro. Eles continuam FORA do container do Leaflet (irmãos, não filhos), então
 * o mapa nunca vê os cliques do painel e o painel nunca precisa de
 * `L.DomEvent.disableClickPropagation` — arrastar/zoom por baixo segue intacto.
 *
 * `readonly` é a via de EXIBIÇÃO: sem painel e sem rodapé, sobra o mapa. Diferente
 * de `disabled`, que mantém os controles à vista, só travados.
 */
const props = withDefaults(
  defineProps<{
    /** Ids selecionados (`v-model`). */
    modelValue?: MapSelectId[]
    /** Itens selecionáveis. Sem `geometria` o item some do mapa, não da lista. */
    features?: MapSelectFeature[]
    /** Geometria do escopo (ex.: o setor) usada no `fitBounds` inicial.
     *  Sem ela, o enquadramento é a união das geometrias das `features`. */
    scopeGeometry?: MapSelectGeometry | null
    /** Tiles. Default: satélite World_Imagery (ArcGIS/Esri). */
    tileUrl?: string
    tileAttribution?: string
    /** Zoom máximo do tile layer (o World_Imagery vai até 19). */
    maxZoom?: number
    searchPlaceholder?: string
    /** Rótulo do rodapé, à esquerda da área somada. */
    areaLabel?: string
    /** Unidade da área, no rodapé e no tooltip do polígono. */
    areaSuffix?: string
    /** Casas decimais da área. */
    areaDecimals?: number
    /** Altura do mapa (qualquer unidade CSS). */
    height?: string
    /** Arranjo do componente.
     *  - `'lado-a-lado'`: mapa à esquerda, painel de 300 px à direita, rodapé embaixo.
     *  - `'sobreposto'`: o mapa ocupa tudo; painel e rodapé flutuam sobre ele em vidro. */
    layout?: 'lado-a-lado' | 'sobreposto'
    /** Texto do contador. Default em pt-BR: "N talhões selecionados". */
    selectionLabel?: (count: number) => string
    clearLabel?: string
    /** `layout="sobreposto"`: rótulo acessível do botão que recolhe o painel. */
    collapseLabel?: string
    /** `layout="sobreposto"`: rótulo acessível do botão que reabre o painel. */
    expandLabel?: string
    /** Selo sobre o mapa (canto superior direito). `''` esconde. */
    badgeLabel?: string
    emptyMessage?: string
    /** Mensagem quando o Leaflet não carregou. */
    mapErrorMessage?: string
    disabled?: boolean
    /** Só o desenho: esconde o painel de busca e a barra de área, e nenhum clique
     *  seleciona. Para **exibir** geometrias (uma listagem, a conferência de um
     *  cadastro) — quando o mapa não é o controle de escolha, o painel de busca
     *  duplica a busca da própria tela e a área somada não tem o que somar.
     *  `modelValue` continua valendo: dá para destacar um polígono de fora. */
    readonly?: boolean
    /** Tooltip dos polígonos. `'permanent'` (default) mantém o rótulo sempre
     *  visível; `'hover'` só o mostra sob o cursor — com muitos polígonos
     *  (100+), o permanente vira um nó DOM por talhão reposicionado a cada
     *  pan/zoom, e o `'hover'` devolve a fluidez. */
    tooltips?: MapSelectTooltips
    /** Modo de seleção por clique. Sem valor, o default preserva o comportamento
     *  de sempre: interativo → `'multiple'`, `readonly` → `'none'`. Definido
     *  explicitamente, vale MESMO com `readonly` (que segue escondendo painel e
     *  rodapé): o clique no polígono emite `update:modelValue`. Em `'single'` o
     *  clique substitui a seleção (`[id]`) e clicar no selecionado desmarca. */
    selectionMode?: MapSelectSelectionMode
    /** Estilo do polígono não selecionado. */
    polygonStyle?: MapSelectPolygonStyle
    /** Estilo do polígono selecionado. */
    polygonSelectedStyle?: MapSelectPolygonStyle
  }>(),
  {
    modelValue: () => [],
    features: () => [],
    scopeGeometry: null,
    tileUrl:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    tileAttribution: 'Imagery © Esri, Maxar, Earthstar Geographics',
    maxZoom: 19,
    searchPlaceholder: 'Buscar talhão ou setor',
    areaLabel: 'Área selecionada',
    areaSuffix: 'ha',
    areaDecimals: 0,
    height: '460px',
    layout: 'lado-a-lado',
    selectionLabel: (count: number) =>
      count === 1 ? '1 talhão selecionado' : `${count} talhões selecionados`,
    clearLabel: 'Limpar seleção',
    collapseLabel: 'Recolher painel de seleção',
    expandLabel: 'Mostrar painel de seleção',
    badgeLabel: 'Satélite',
    emptyMessage: 'Nenhum talhão encontrado',
    mapErrorMessage: ERRO_MAPA_PADRAO,
    disabled: false,
    readonly: false,
    tooltips: 'permanent',
    selectionMode: undefined,
    // Tinta de mapa, não cor de UI: estes valores são lidos sobre a imagem de
    // satélite, onde os tokens do tema (claro/escuro) não valem. São props para
    // quem tiver outro fundo poder trocar.
    polygonStyle: () => ({
      color: '#ffffff',
      weight: 2,
      opacity: 0.85,
      fillColor: '#ffffff',
      fillOpacity: 0.06,
    }),
    polygonSelectedStyle: () => ({
      color: '#8fb6e4',
      weight: 3,
      opacity: 1,
      fillColor: '#1f5092',
      fillOpacity: 0.48,
    }),
  },
)

const emit = defineEmits<{ 'update:modelValue': [ids: MapSelectId[]] }>()

const { formatNumber } = useFormatters()

// --- Arranjo e painel flutuante --------------------------------------------

const isOverlay = computed(() => props.layout === 'sobreposto')

/** Texto customizado sempre vence; só o default é trocado no `readonly`. */
const mapErrorText = computed(() =>
  props.readonly && props.mapErrorMessage === ERRO_MAPA_PADRAO
    ? ERRO_MAPA_READONLY
    : props.mapErrorMessage,
)

/** Estado do painel flutuante — interno de propósito: recolher é gesto de
 *  visualização ("quero ver o mapa"), não dado do formulário. */
const collapsed = ref(false)

function setCollapsed(value: boolean) {
  if (collapsed.value === value) return
  collapsed.value = value
}

/** Recolher devolve o mapa inteiro: o próprio painel vira a pílula (ícone +
 *  contador) e cabeçalho/lista saem por `display:none` — somem junto da ordem
 *  de tabulação e da árvore de acessibilidade, sem precisar de `inert`. */
function toggleCollapsed() {
  setCollapsed(!collapsed.value)
}

const collapseTitle = computed(() => (collapsed.value ? props.expandLabel : props.collapseLabel))

// --- Seleção ---------------------------------------------------------------

const selected = computed(() => new Set(props.modelValue))

/** `selectionMode` explícito manda — inclusive com `readonly` (que só esconde
 *  painel/rodapé). Sem ele, o default de sempre: interativo → múltipla,
 *  `readonly` → nada seleciona. */
const effectiveSelectionMode = computed<MapSelectSelectionMode>(
  () => props.selectionMode ?? (props.readonly ? 'none' : 'multiple'),
)

function isSelected(id: MapSelectId): boolean {
  return selected.value.has(id)
}

function toggle(id: MapSelectId) {
  if (props.disabled) return
  const mode = effectiveSelectionMode.value
  if (mode === 'none') return
  const next =
    mode === 'single'
      ? isSelected(id)
        ? []
        : [id]
      : isSelected(id)
        ? props.modelValue.filter((x) => x !== id)
        : [...props.modelValue, id]
  emit('update:modelValue', next)
}

function clear() {
  if (props.disabled || effectiveSelectionMode.value === 'none' || !props.modelValue.length) return
  emit('update:modelValue', [])
}

const selectedFeatures = computed(() => props.features.filter((f) => isSelected(f.id)))

const selectedArea = computed(() =>
  selectedFeatures.value.reduce((total, f) => total + (f.area ?? 0), 0),
)

const countText = computed(() => props.selectionLabel(selectedFeatures.value.length))

// --- Busca -----------------------------------------------------------------

const term = ref('')

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

const visibleFeatures = computed(() => {
  const needle = normalize(term.value.trim())
  if (!needle) return props.features
  return props.features.filter((f) => normalize(`${f.nome} ${f.subtitulo ?? ''}`).includes(needle))
})

function areaText(feature: MapSelectFeature): string {
  if (feature.area == null) return ''
  return `${formatNumber(feature.area, props.areaDecimals)} ${props.areaSuffix}`.trim()
}

const areaTotalText = computed(() => formatNumber(selectedArea.value, props.areaDecimals))

// --- Mapa ------------------------------------------------------------------

type Leaflet = typeof import('leaflet')

const container = ref<HTMLDivElement | null>(null)
const root = ref<HTMLDivElement | null>(null)
const footer = ref<HTMLDivElement | null>(null)
const mapError = ref(false)

let leaflet: Leaflet | null = null
let map: LeafletMap | null = null
let observer: ResizeObserver | null = null
let footerObserver: ResizeObserver | null = null
const layers = new Map<MapSelectId, LeafletGeoJSON>()
/** Geometria com que cada layer foi desenhada — a comparação é por REFERÊNCIA:
 *  consumidor que trocar o contorno manda um objeto novo. */
const layerGeoms = new Map<MapSelectId, MapSelectGeometry>()

/** O enquadramento acontece UMA vez — na primeira leva de features (ou quando a
 *  `scopeGeometry` chegar). `features` alimentado por páginas não pode refazer o
 *  `fitBounds` a cada leva: o mapa pularia na frente do usuário. Reenquadrar de
 *  novo é gesto explícito, pelo `fitToScope()` exposto. */
let fitted = false
/** O primeiro fit pode ter sido só pela união das features; quando a
 *  `scopeGeometry` chegar depois, ela ainda vale UM reenquadramento. */
let fittedToScope = false

function styleFor(id: MapSelectId): MapSelectPolygonStyle {
  return isSelected(id) ? props.polygonSelectedStyle : props.polygonStyle
}

function tooltipText(feature: MapSelectFeature): string {
  const area = areaText(feature)
  return area ? `${feature.nome} · ${area}` : feature.nome
}

function bindTip(layer: LeafletGeoJSON, feature: MapSelectFeature) {
  layer.bindTooltip(
    tooltipText(feature),
    props.tooltips === 'hover'
      ? {
          permanent: false,
          sticky: true,
          direction: 'center',
          className: 'w-map-select__tip',
          opacity: 1,
        }
      : { permanent: true, direction: 'center', className: 'w-map-select__tip', opacity: 1 },
  )
}

/** `interactive: false` tira o polígono do hit-test do Leaflet (e o cursor de
 *  mão junto). Com tooltip `'hover'` a layer precisa continuar interativa mesmo
 *  sem seleção — o cursor é suprimido via CSS (`--unselectable`). */
const layersInteractive = computed(
  () => effectiveSelectionMode.value !== 'none' || props.tooltips === 'hover',
)

function createLayer(feature: MapSelectFeature) {
  if (!leaflet || !map || !feature.geometria) return
  const layer = leaflet.geoJSON(feature.geometria as unknown as Geometry, {
    style: () => styleFor(feature.id),
    interactive: layersInteractive.value,
  })
  layer.on('click', () => toggle(feature.id))
  bindTip(layer, feature)
  layer.addTo(map)
  layers.set(feature.id, layer)
  layerGeoms.set(feature.id, feature.geometria)
}

/** Sincroniza as layers com `features` por DIFF de `id`: remove as que saíram,
 *  cria só as novas e recria a que trocou de `geometria` (referência). Páginas
 *  chegando incrementalmente não destroem o que já está desenhado. */
function drawFeatures() {
  if (!leaflet || !map) return

  const current = new Map<MapSelectId, MapSelectFeature>()
  for (const feature of props.features) {
    if (feature.geometria) current.set(feature.id, feature)
  }

  layers.forEach((layer, id) => {
    if (current.has(id)) return
    layer.remove()
    layers.delete(id)
    layerGeoms.delete(id)
  })

  current.forEach((feature, id) => {
    const existing = layers.get(id)
    if (existing && layerGeoms.get(id) === feature.geometria) {
      // Mesma geometria: só o texto do tooltip pode ter mudado (nome/área).
      existing.getTooltip()?.setContent(tooltipText(feature))
      return
    }
    if (existing) {
      existing.remove()
      layers.delete(id)
      layerGeoms.delete(id)
    }
    createLayer(feature)
  })

  syncStyles()

  if (!fitted && (layers.size || props.scopeGeometry)) {
    fitToScope()
    fitted = true
    fittedToScope = Boolean(props.scopeGeometry)
  }
}

/** Reaplica o estilo (e a classe do tooltip) conforme a seleção atual. */
function syncStyles() {
  layers.forEach((layer, id) => {
    const on = isSelected(id)
    layer.setStyle(styleFor(id))
    const element = layer.getTooltip()?.getElement()
    element?.classList.toggle('w-map-select__tip--on', on)
  })
}

function fitToScope() {
  if (!leaflet || !map) return
  const corners: LatLng[] = []

  if (props.scopeGeometry) {
    const scope = leaflet.geoJSON(props.scopeGeometry as unknown as Geometry).getBounds()
    if (scope.isValid()) corners.push(scope.getSouthWest(), scope.getNorthEast())
  }

  if (!corners.length) {
    layers.forEach((layer) => {
      const bounds = layer.getBounds()
      if (bounds.isValid()) corners.push(bounds.getSouthWest(), bounds.getNorthEast())
    })
  }

  if (corners.length) map.fitBounds(leaflet.latLngBounds(corners), { padding: [20, 20] })
  else map.setView([0, 0], 2)
}

/** Enquadra a layer de um id, com o mesmo padding do escopo. No-op se o id não
 *  tem layer (sem geometria, ainda não chegou, mapa fora do ar). */
function fitToFeature(id: MapSelectId, options?: { padding?: [number, number]; maxZoom?: number }) {
  if (!map) return
  const layer = layers.get(id)
  if (!layer) return
  const bounds = layer.getBounds()
  // `maxZoom` limita a aproximação: enquadrar UM talhão sem teto cola a câmera
  // nele e o usuário perde a vizinhança — quem chama escolhe o quão perto.
  if (bounds.isValid()) map.fitBounds(bounds, { padding: [20, 20], ...options })
}

/** Recria todas as layers (opções de criação — tooltip/interatividade —
 *  mudaram). Não mexe no enquadramento. */
function rebuildLayers() {
  if (!leaflet || !map) return
  layers.forEach((layer) => layer.remove())
  layers.clear()
  layerGeoms.clear()
  drawFeatures()
}

/** O mapa costuma nascer escondido (dentro de um Dialog): sem isto o Leaflet
 *  calcula 0×0 e desenha só um pedaço quando o container aparece. */
function refreshSize() {
  if (!map || !container.value) return
  if (container.value.clientWidth > 0 && container.value.clientHeight > 0) map.invalidateSize()
}

/** No `sobreposto` o rodapé é uma barra flutuante: o painel precisa parar acima
 *  dela e a atribuição do Leaflet precisa subir. Como a altura depende do que o
 *  consumidor põe no `#footer`, ela é MEDIDA e publicada em `--w-map-foot-h` —
 *  chutar um valor fixo quebraria com dois botões empilhados. */
function measureFooter() {
  if (!root.value || !footer.value) return
  if (!isOverlay.value) {
    root.value.style.removeProperty('--w-map-foot-h')
    return
  }
  const h = footer.value.offsetHeight
  if (h > 0) root.value.style.setProperty('--w-map-foot-h', `${h}px`)
}

async function setupMap() {
  if (!container.value) return
  try {
    const mod = (await import('leaflet')) as unknown as Leaflet & { default?: Leaflet }
    leaflet = mod.default ?? mod
  } catch {
    mapError.value = true
    return
  }

  // O componente pode ter sido desmontado durante o import().
  if (!container.value) return

  try {
    // `preferCanvas`: com 100+ polígonos o renderer SVG vira uma árvore DOM
    // pesada; no canvas os paths são pintados num único elemento.
    map = leaflet.map(container.value, {
      zoomControl: true,
      attributionControl: true,
      preferCanvas: true,
    })
    leaflet
      .tileLayer(props.tileUrl, {
        maxZoom: props.maxZoom,
        attribution: props.tileAttribution,
      })
      .addTo(map)
    drawFeatures()
    // Sem feature e sem escopo ainda não houve fit: o mapa precisa de UMA view
    // inicial (o Leaflet não opera sem centro/zoom definidos).
    if (!fitted) map.setView([0, 0], 2)
    refreshSize()

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => refreshSize())
      observer.observe(container.value)
    }
  } catch {
    mapError.value = true
  }
}

onMounted(() => {
  void setupMap()
  measureFooter()
  if (typeof ResizeObserver !== 'undefined' && footer.value) {
    footerObserver = new ResizeObserver(() => measureFooter())
    footerObserver.observe(footer.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  footerObserver?.disconnect()
  footerObserver = null
  layers.clear()
  layerGeoms.clear()
  map?.remove()
  map = null
})

watch(() => props.features, drawFeatures)
watch(() => props.modelValue, syncStyles, { deep: true })

// A `scopeGeometry` pode chegar DEPOIS da primeira página de features (duas
// requests em paralelo): ela ainda vale um único reenquadramento.
watch(
  () => props.scopeGeometry,
  (geo) => {
    if (!map || !geo || fittedToScope) return
    fitToScope()
    fitted = true
    fittedToScope = true
  },
)

// Tooltip e interatividade são opções de CRIAÇÃO da layer: mudou, recria tudo.
watch([() => props.tooltips, layersInteractive], () => rebuildLayers())

// Recolher/expandir e trocar de arranjo mexem na caixa do mapa. O
// ResizeObserver do canvas já pegaria, mas ele dispara no frame seguinte: sem o
// invalidateSize explícito o Leaflet chega a pintar um quadro com tile cortado.
watch([collapsed, isOverlay], () => {
  void nextTick(() => {
    measureFooter()
    refreshSize()
  })
})

defineExpose({
  refreshSize,
  /** Painel flutuante recolhido? (só faz sentido no `layout="sobreposto"`.) */
  collapsed: somenteLeitura(collapsed),
  setCollapsed,
  /** Reenquadra no escopo (ou na união das features) — o fit automático só
   *  acontece uma vez; páginas novas de `features` não movem o mapa. */
  fitToScope,
  /** Enquadra o polígono de um id (padding igual ao do escopo). No-op sem layer. */
  fitToFeature,
})
</script>

<template>
  <div
    ref="root"
    class="w-map-select"
    :class="{
      'w-map-select--disabled': disabled,
      'w-map-select--readonly': readonly,
      'w-map-select--unselectable': effectiveSelectionMode === 'none',
      'w-map-select--overlay': isOverlay,
      'w-map-select--collapsed': isOverlay && collapsed && !readonly,
    }"
  >
    <div class="w-map-select__body">
      <div class="w-map-select__map" :style="{ '--w-map-h': height }">
        <div ref="container" class="w-map-select__canvas" />
        <div v-if="mapError" class="w-map-select__fallback">
          <i class="pi pi-map" />
          <span>{{ mapErrorText }}</span>
        </div>
        <span v-else-if="badgeLabel" class="w-map-select__badge">
          <i class="pi pi-globe" />{{ badgeLabel }}
        </span>
      </div>

      <div v-if="!readonly" class="w-map-select__panel">
        <button
          v-if="isOverlay"
          type="button"
          class="w-map-select__collapse"
          :aria-expanded="!collapsed"
          :aria-label="collapseTitle"
          :title="collapseTitle"
          @click="toggleCollapsed"
        >
          <i class="pi" :class="collapsed ? 'pi-list' : 'pi-chevron-right'" />
          <span v-if="modelValue.length" class="w-map-select__collapse-count">
            {{ modelValue.length }}
          </span>
        </button>

        <div class="w-map-select__panel-head">
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText
              v-model="term"
              fluid
              data-kbd-skip
              :placeholder="searchPlaceholder"
              :aria-label="searchPlaceholder"
            />
          </IconField>
          <div class="w-map-select__meta">
            <span class="w-map-select__count">{{ countText }}</span>
            <button
              type="button"
              class="w-map-select__clear"
              :disabled="disabled || !modelValue.length"
              @click="clear"
            >
              {{ clearLabel }}
            </button>
          </div>
        </div>

        <ul class="w-map-select__list">
          <li v-for="feature in visibleFeatures" :key="feature.id">
            <slot name="item" :feature="feature" :selected="isSelected(feature.id)">
              <button
                type="button"
                class="w-map-select__item"
                :class="{ 'w-map-select__item--on': isSelected(feature.id) }"
                :aria-pressed="isSelected(feature.id)"
                :disabled="disabled"
                @click="toggle(feature.id)"
              >
                <span class="w-map-select__box">
                  <i v-if="isSelected(feature.id)" class="pi pi-check" />
                </span>
                <span class="w-map-select__item-text">
                  <span class="w-map-select__item-name">{{ feature.nome }}</span>
                  <span v-if="feature.subtitulo" class="w-map-select__item-sub">
                    {{ feature.subtitulo }}
                  </span>
                </span>
                <i
                  v-if="!feature.geometria"
                  class="pi pi-exclamation-circle w-map-select__item-nogeo"
                  title="Talhão sem contorno cadastrado"
                />
                <span v-if="feature.area != null" class="w-map-select__item-area">
                  {{ areaText(feature) }}
                </span>
              </button>
            </slot>
          </li>
          <li v-if="!visibleFeatures.length" class="w-map-select__empty">
            <slot name="empty">{{ emptyMessage }}</slot>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="!readonly" ref="footer" class="w-map-select__footer">
      <slot name="footer" :area="selectedArea" :features="selectedFeatures">
        <span class="w-map-select__area">
          {{ areaLabel }}
          <strong>{{ areaTotalText }}</strong>
          <span class="w-map-select__area-unit">{{ areaSuffix }}</span>
        </span>
      </slot>
    </div>
  </div>
</template>
