<script setup lang="ts">
import { ref, watch, computed, inject, reactive, nextTick, onMounted } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import Chip from 'primevue/chip'
import Dialog from 'primevue/dialog'
import { useTabHost } from '@/types/routeTabs'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { W_DATA_PROVIDER_KEY } from '@/types/plugin'
import type { DataProvider } from '@/types/dataProvider'
import type { FieldDef, FieldSubRowsFetch } from '@/types/field'
import type { ColumnDef } from '@/types/column'
import type { ApiFieldMeta } from '@/utils/fieldMapper'
import { mapApiFieldsToFieldDefs, mapApiFieldsToColumnDefs } from '@/utils/fieldMapper'
import { useAppToast } from '@/composables/useAppToast'
import { useAppConfirm } from '@/composables/useAppConfirm'
import { extractApiError } from '@/composables/useApiError'
import WCrudFormDialog from '@/components/crud/WCrudFormDialog.vue'
import WCrudColumnRenderer from '@/components/crud/WCrudColumnRenderer.vue'

// Dentro da navegação por abas, o dialog pendura no pane da própria aba
// (some e volta com ela, intacto); fora de abas, o body de sempre.
const tabHost = useTabHost()

interface ColumnMeta {
  field: string
  header: string
}

/** Filtro em cascata já resolvido (nome do parâmetro + valor atual). */
interface DrilldownFilter {
  field: string
  value: unknown
  required?: boolean
}

/** Valor aceito no `v-model`: id, objeto ou — em `multiple` — lista de ids/objetos. */
type FKValue = string | number | Record<string, unknown>

const props = withDefaults(
  defineProps<{
    modelValue: FKValue | FKValue[] | null
    endpoint: string
    endpointParams?: Record<string, string | number | boolean>
    /** Filtro(s) em cascata resolvido(s): aplicado(s) como parâmetro na busca. Com
     *  `required` (default true), a busca só ocorre quando o valor estiver preenchido. */
    drilldown?: DrilldownFilter | DrilldownFilter[]
    /** Seleção múltipla: o campo vira chips e o `v-model` passa a ser uma lista
     *  de objetos. O modal de pesquisa ganha caixas de marcação. */
    multiple?: boolean
    /** Em `multiple`, quantos chips mostrar antes de resumir o resto em `+N`
     *  (0 = mostrar todos). Útil em campo estreito, tipo filtro de painel. */
    maxChips?: number
    optionLabel?: string
    /** Chave de uma segunda linha, em texto de apoio, dentro de cada sugestão — para
     *  o dado que **decide** a escolha aparecer antes dela (ex.: saldo em estoque).
     *  Vazia ou ausente na linha, a sugestão volta a ter uma linha só. */
    optionDescription?: string
    optionValue?: string
    placeholder?: string
    /** Placeholder exibido enquanto uma cascata obrigatória não estiver preenchida. */
    blockedPlaceholder?: string
    disabled?: boolean
    showClear?: boolean
    forceSelection?: boolean
    columns?: ColumnMeta[]
    minLength?: number
    dialogHeader?: string
    // CRUD no modal
    canCreate?: boolean
    canEdit?: boolean
    canDelete?: boolean
    /** Quando a lista (com os filtros/cascata atuais) tem **um** registro só, ele já
     *  entra selecionado — ao montar sem valor e ao preencher a cascata. Só no modo
     *  simples; limpar o campo não redispara. `false` desliga. */
    autoSelectSingle?: boolean
    crudFields?: FieldDef[]
    crudColumns?: ColumnDef[]
    /** Sub-linhas do grid do modal: recebe as linhas da página e devolve o mapa
     *  `id → sub-linhas` + as colunas (dinâmicas) do mini-grid. Linha com entrada
     *  no mapa abre expandida — ex.: lote (linha) com suas análises (sub-linhas). */
    subRows?: FieldSubRowsFetch
    dialogWidth?: string
    /** Foca o campo ao montar. Marca o input com o atributo nativo `autofocus`
     *  para que o `focus()` do PrimeVue Dialog (em onAfterEnter) o encontre e
     *  não roube o foco para o botão de fechar. */
    autofocus?: boolean
    /** `id` do input de digitação — alvo do `<label for>` do formulário. */
    inputId?: string
    /** Atributos extras no input de digitação (`aria-labelledby`, `aria-describedby`,
     *  `aria-required`, `aria-invalid`…). Vão direto no `<input>`, não no wrapper. */
    inputAttrs?: Record<string, unknown>
  }>(),
  {
    multiple: false,
    maxChips: 0,
    optionLabel: 'nome',
    optionValue: 'id',
    placeholder: 'Buscar...',
    disabled: false,
    showClear: true,
    forceSelection: true,
    minLength: 0,
    canCreate: undefined,
    canEdit: undefined,
    canDelete: undefined,
    autoSelectSingle: true,
    dialogWidth: '480px',
    autofocus: false,
  },
)

/** `pt` estável: objeto novo a cada render faria o InputText interno remontar
 *  (e perder o texto digitado). */
const acPt = computed(() => ({ pcInputText: { root: props.inputAttrs } }))

const emit = defineEmits<{
  /** Objeto selecionado — ou a lista de objetos quando `multiple`. */
  'update:modelValue': [value: Record<string, unknown> | Record<string, unknown>[] | null]
}>()

// O template tem múltiplos nós raiz (o campo + os overlays Dialog/WCrudFormDialog).
// Sem isto, `class`/`id`/`style` do consumidor não têm onde herdar e o Vue emite
// warning de "extraneous non-props attributes". Aplicamos os attrs no nó visível.
defineOptions({ inheritAttrs: false })

const dataProvider = inject<DataProvider>(W_DATA_PROVIDER_KEY)
if (!dataProvider) {
  throw new Error('[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin.')
}
const provider = dataProvider

const toast = useAppToast()
const { confirmDelete: confirmDeleteDialog } = useAppConfirm()

// ---------------------------------------------------------------------------
// Inline autocomplete
// ---------------------------------------------------------------------------

const selectedItem = ref<Record<string, unknown> | null>(null)
/** Seleção quando `multiple` — o campo mostra um chip por item. */
const selectedItems = ref<Record<string, unknown>[]>([])
const suggestions = ref<Record<string, unknown>[]>([])
const searching = ref(false)

/** Valor entregue ao AutoComplete: objeto (single) ou lista (multiple). */
const acModel = computed(() => (props.multiple ? selectedItems.value : selectedItem.value))

/** Identificador escalar de um valor do v-model (id cru ou objeto já resolvido). */
function keyOf(v: unknown): unknown {
  if (v && typeof v === 'object') return (v as Record<string, unknown>)[props.optionValue]
  return v
}

function dedupeByKey(itens: Record<string, unknown>[]): Record<string, unknown>[] {
  const vistos = new Set<unknown>()
  const out: Record<string, unknown>[] = []
  for (const item of itens) {
    const k = keyOf(item)
    if (vistos.has(k)) continue
    vistos.add(k)
    out.push(item)
  }
  return out
}

function emitSelection() {
  emit('update:modelValue', props.multiple ? [...selectedItems.value] : selectedItem.value)
}

function labelOf(item: unknown): string {
  const v = (item as Record<string, unknown>)?.[props.optionLabel]
  return v == null ? '' : String(v)
}

/** Texto de apoio da sugestão. Vazio quando a linha não trouxe o campo. */
function descriptionOf(item: unknown): string {
  if (!props.optionDescription) return ''
  const v = (item as Record<string, unknown>)?.[props.optionDescription]
  return v == null ? '' : String(v)
}

/** Quantos chips ficam escondidos atrás do `+N` (0 quando cabem todos). */
const chipsOcultos = computed(() =>
  props.maxChips > 0 ? Math.max(0, selectedItems.value.length - props.maxChips) : 0,
)

/** Nomes resumidos no `+N` — viram tooltip para não esconder informação. */
const chipsOcultosLabel = computed(() =>
  selectedItems.value.slice(props.maxChips).map(labelOf).join(', '),
)

/** O `x` do chip remove só aquele item — sem deixar o clique subir para o chip
 *  (que abre a listagem). */
function onChipRemove(event: Event, remove: (event: Event) => void) {
  event?.stopPropagation?.()
  remove(event)
}

/** Limpar tudo: em `multiple` a lista inteira; no simples, o valor. */
function limparSelecao() {
  if (props.disabled) return
  textoDigitado.value = ''
  if (props.multiple) {
    if (!selectedItems.value.length) return
    selectedItems.value = []
  } else {
    if (!selectedItem.value) return
    selectedItem.value = null
  }
  emitSelection()
}

/** Com `maxChips`, cada chip fica com uma fração da largura do campo — assim
 *  eles dividem a linha (em vez de um por linha) e truncam o que não couber.
 *  A reserva cobre o chip `+N` e a área de digitação; o piso de 7rem impede
 *  chip ilegível em campo estreito (aí eles quebram para a linha de baixo). */
const chipStyle = computed(() =>
  props.multiple && props.maxChips > 0
    ? { '--w-fk-chip-max': `max(6rem, calc((100% - 6rem) / ${props.maxChips}))` }
    : undefined,
)

/** Mostra o "limpar" só quando há o que limpar (e o consumidor permite). */
const mostrarLimpar = computed(() => {
  if (!props.showClear || props.disabled) return false
  return props.multiple ? selectedItems.value.length > 0 : selectedItem.value !== null
})

let debounceTimer: ReturnType<typeof setTimeout> | null = null

/** Instância do AutoComplete: além do `$el`, usamos o estado do painel e o
 *  `search()` interno — o mesmo que o botão dropdown do PrimeVue chama (marca
 *  `searching` e emite `complete`; quando as sugestões chegam, ele abre o painel). */
interface AutoCompleteInstance {
  $el?: HTMLElement
  overlayVisible?: boolean
  search?: (event: Event, query: string, source: string) => void
  show?: () => void
}
const acRef = ref<AutoCompleteInstance | null>(null)

function inputEl(): HTMLInputElement | null {
  return (acRef.value?.$el?.querySelector?.('input') as HTMLInputElement | null) ?? null
}

/** O que o usuário digitou no campo (só via `input` — valor posto pelo componente
 *  ao resolver o v-model não conta). Zera ao selecionar/limpar. */
const textoDigitado = ref('')

/** Lê o texto no BUBBLE, nunca em capture: mexer num `ref` que a template usa
 *  antes de o PrimeVue tratar o `input` dispara a re-renderização no microtask
 *  entre os listeners — e o `<input v-bind>` do InputText re-aplica `value`
 *  (o Vue sempre re-patcha `value`) com o `d_value` ainda antigo, apagando a
 *  letra digitada antes de o AutoComplete lê-la. */
function onInputTexto(e: Event) {
  const target = e.target as HTMLInputElement | null
  if (target?.tagName !== 'INPUT') return
  textoDigitado.value = target.value ?? ''
}

/** Texto digitado é "novo" quando não é o rótulo do que já está selecionado. */
const textoNovo = computed(() => {
  const texto = textoDigitado.value.trim()
  if (!texto) return ''
  if (!props.multiple && selectedItem.value && labelOf(selectedItem.value) === texto) return ''
  return texto
})

/** Com texto novo e cadastro permitido, o Enter fica no campo (abre o cadastro)
 *  em vez de a navegação por Enter do formulário avançar o foco — `data-kbd-hold`
 *  é o que o `useFormKeyboardNav` respeita. Campo resolvido continua pulando.
 *  Mesma condição do `onEnterKey`: segurar sem agir seria um beco sem saída. */
const segurarEnter = computed(() => cadastroInline.value && textoNovo.value !== '')

onMounted(() => {
  if (!props.autofocus) return
  nextTick(() => {
    const input = inputEl()
    if (!input) return
    // O atributo nativo faz o Dialog.focus() (onAfterEnter) mirar este input
    // em vez do botão fechar; o focus() cobre o caso fora de Dialog.
    input.setAttribute('autofocus', '')
    input.focus()
    input.select?.()
  })
})

// ---------------------------------------------------------------------------
// Filtro em cascata (drill-down)
// ---------------------------------------------------------------------------

function isEmptyValue(v: unknown): boolean {
  return v === null || v === undefined || v === ''
}

/** Um campo FK guarda o objeto inteiro; extrai o identificador escalar para o filtro. */
function normalizeDrillValue(v: unknown): unknown {
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>
    return o.id ?? o.value ?? o
  }
  return v
}

const drilldownList = computed<DrilldownFilter[]>(() => {
  const d = props.drilldown
  if (!d) return []
  return Array.isArray(d) ? d : [d]
})

/** true quando alguma cascata obrigatória ainda não tem valor → não busca. */
const blockedByRequired = computed(() =>
  drilldownList.value.some(
    (d) => (d.required ?? true) && isEmptyValue(normalizeDrillValue(d.value)),
  ),
)

/** Parâmetros de filtro derivados das cascatas com valor preenchido. */
function drilldownParams(): Record<string, unknown> {
  const params: Record<string, unknown> = {}
  for (const d of drilldownList.value) {
    const val = normalizeDrillValue(d.value)
    if (!isEmptyValue(val)) params[d.field] = val
  }
  return params
}

const effectivePlaceholder = computed(() =>
  blockedByRequired.value && props.blockedPlaceholder
    ? props.blockedPlaceholder
    : props.placeholder,
)

/** Em `multiple` o placeholder some quando já há chips — ele descreve o estado
 *  "sem filtro"; ao lado de uma seleção viraria informação contraditória. */
const placeholderVisivel = computed(() =>
  props.multiple && selectedItems.value.length ? undefined : effectivePlaceholder.value,
)

async function fetchOne(id: string | number): Promise<Record<string, unknown> | null> {
  try {
    const response = await provider.get(props.endpoint, id)
    return response.data
  } catch {
    return null
  }
}

async function fetchById(id: string | number) {
  selectedItem.value = await fetchOne(id)
}

/** Resolve a lista do v-model: objeto já resolvido passa direto, id vira GET. */
async function resolveMany(valores: FKValue[]): Promise<Record<string, unknown>[]> {
  const itens = await Promise.all(
    valores.map(async (v) => {
      if (v && typeof v === 'object') {
        const obj = v as Record<string, unknown>
        if (props.optionLabel in obj) return obj
        const id = obj[props.optionValue]
        return id != null ? await fetchOne(id as string | number) : null
      }
      // Reaproveita o que já está resolvido — evita GET a cada mudança da lista.
      const atual = selectedItems.value.find((i) => i[props.optionValue] === v)
      return atual ?? (await fetchOne(v as string | number))
    }),
  )
  return itens.filter((i): i is Record<string, unknown> => i !== null)
}

/** Contador de requisição: resposta antiga (busca mais lenta) não sobrescreve a nova. */
let searchSeq = 0
/** Busca em curso (para o Enter esperar antes de decidir se cadastra). */
let buscaEmCurso: Promise<void> | null = null
/** Query da última busca concluída — o Enter só rebusca se o texto mudou. */
let ultimaQueryBuscada: string | null = null
/** Pedido explícito (↓ ou Enter): o próximo `complete` ignora `minLength` e debounce. */
let buscaImediata = false

async function search(query: string) {
  const seq = ++searchSeq
  // Cascata obrigatória sem valor → não busca (evita listar tudo).
  if (blockedByRequired.value) {
    suggestions.value = []
    return
  }
  searching.value = true
  try {
    const params: Record<string, unknown> = {
      page_size: 20,
      ...props.endpointParams,
      ...drilldownParams(),
    }
    if (query) params.search = query
    const response = await provider.list(props.endpoint, params)
    if (seq !== searchSeq) return
    suggestions.value = response.data
    ultimaQueryBuscada = query
    // Metadata de campos: sem isto o cadastro auto-detectado (`showCreate`) só
    // existiria depois de abrir o modal — e o Enter inline precisa dele antes.
    if (response.extras?.fields && !props.columns?.length && !props.crudFields?.length) {
      apiFields.value = response.extras.fields as ApiFieldMeta[]
    }
  } catch {
    if (seq === searchSeq) suggestions.value = []
  } finally {
    if (seq === searchSeq) searching.value = false
  }
}

function onSearch(event: { query: string }) {
  const query = event.query || ''
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
  if (buscaImediata) {
    buscaImediata = false
    buscaEmCurso = search(query).finally(() => {
      buscaEmCurso = null
    })
    return
  }
  if (query.length < props.minLength) {
    suggestions.value = []
    return
  }
  debounceTimer = setTimeout(() => {
    debounceTimer = null
    buscaEmCurso = search(query).finally(() => {
      buscaEmCurso = null
    })
  }, 300)
}

/** Busca imediata pelo caminho do PrimeVue (`search()` interno): ele marca
 *  `searching` e, quando as sugestões chegam, abre o painel sozinho. */
function pedirBusca(e: Event, query: string) {
  const ac = acRef.value
  if (!ac?.search) return
  buscaImediata = true
  ac.search(e, query, 'dropdown')
  buscaImediata = false
}

function onSelect(event: { value: Record<string, unknown> }) {
  textoDigitado.value = ''
  // Em `multiple` o AutoComplete já mantém a lista — tratado em `onAcUpdate`.
  if (props.multiple) return
  selectedItem.value = event.value
  emit('update:modelValue', event.value)
}

/** Em `multiple`, o AutoComplete emite a lista inteira ao marcar/remover chip. */
function onAcUpdate(value: unknown) {
  if (!props.multiple) return
  selectedItems.value = dedupeByKey(
    Array.isArray(value) ? (value as Record<string, unknown>[]) : [],
  )
  emitSelection()
}

function onClear() {
  textoDigitado.value = ''
  // Em `multiple`, o AutoComplete emite `clear` também quando só descarta o texto
  // digitado (`forceSelection` sem correspondência) — limpar a lista aqui apagaria
  // a seleção inteira a cada busca sem match. O clear real chega como
  // `update:modelValue` (ícone de limpar), tratado em `onAcUpdate`.
  if (props.multiple) return
  selectedItem.value = null
  emitSelection()
}

// Resolve initial value
watch(
  () => props.modelValue,
  async (newVal) => {
    if (props.multiple) {
      const lista = newVal == null ? [] : Array.isArray(newVal) ? newVal : [newVal]
      const chaves = lista.map(keyOf)
      const atuais = selectedItems.value.map((i) => i[props.optionValue])
      // Mesma lista (na mesma ordem) → nada a resolver; evita loop com o emit.
      if (chaves.length === atuais.length && chaves.every((k, i) => k === atuais[i])) return
      selectedItems.value = await resolveMany(lista)
      return
    }
    if (newVal != null) {
      if (typeof newVal === 'object' && newVal !== null && props.optionLabel in newVal) {
        selectedItem.value = newVal as Record<string, unknown>
        return
      }
      if (!selectedItem.value || selectedItem.value[props.optionValue] !== newVal) {
        await fetchById(newVal as string | number)
      }
    } else {
      selectedItem.value = null
    }
  },
  { immediate: true },
)

// ---------------------------------------------------------------------------
// Único registro → já vem selecionado
// ---------------------------------------------------------------------------

let autoSelSeq = 0

/** Se a lista (com filtros e cascata atuais) tem um registro só, seleciona-o.
 *  Roda ao montar sem valor e quando a cascata passa a estar preenchida — nunca
 *  quando o usuário limpa (senão limpar fica impossível). */
async function tentarAutoSelecao() {
  if (props.disabled || props.multiple || !props.autoSelectSingle) return
  // Quem chama logo após emitir `null` precisa do pai ter propagado o v-model.
  await nextTick()
  if (blockedByRequired.value) return
  if (selectedItem.value || props.modelValue != null) return
  const seq = ++autoSelSeq
  try {
    const response = await provider.list(props.endpoint, {
      page_size: 2,
      ...props.endpointParams,
      ...drilldownParams(),
    })
    if (seq !== autoSelSeq) return
    if (selectedItem.value || props.modelValue != null) return
    const unico =
      typeof response.rows === 'number' ? response.rows === 1 : response.data.length === 1
    if (!unico || !response.data[0]) return
    selectedItem.value = response.data[0]
    emit('update:modelValue', response.data[0])
  } catch {
    // Auto-seleção é conveniência: falhou, o campo segue vazio.
  }
}

onMounted(() => {
  void tentarAutoSelecao()
})

// ---------------------------------------------------------------------------
// Modal — State
// ---------------------------------------------------------------------------

const modalVisible = ref(false)
const modalData = ref<Record<string, unknown>[]>([])
const modalLoading = ref(false)
const modalSearch = ref('')
const modalPage = ref(1)
const modalPageSize = ref(15)
const modalTotalRecords = ref(0)
const modalSelection = ref<Record<string, unknown> | Record<string, unknown>[] | null>(null)

/** Itens marcados no modal, normalizados (single ou multiple). */
const modalSelecionados = computed<Record<string, unknown>[]>(() => {
  const sel = modalSelection.value
  if (!sel) return []
  return Array.isArray(sel) ? sel : [sel]
})
const modalSortField = ref<string | null>(null)
const modalSortOrder = ref<1 | -1 | 0>(0)
let modalSearchTimer: ReturnType<typeof setTimeout> | null = null

// --- Sub-linhas (expansão automática por linha com dados) ---
const subRowsMap = ref<Record<string, Record<string, unknown>[]>>({})
const subRowsColumns = ref<ColumnDef[]>([])
const expandedRows = ref<Record<string, boolean>>({})

/** Busca as sub-linhas da página atual e abre as linhas que têm o que mostrar. */
async function fetchSubRows() {
  if (!props.subRows) return
  try {
    const { map, columns } = await props.subRows(modalData.value)
    subRowsMap.value = map || {}
    subRowsColumns.value = columns || []
    const abertos: Record<string, boolean> = {}
    for (const row of modalData.value) {
      const id = String(row[props.optionValue])
      if (subRowsMap.value[id]?.length) abertos[id] = true
    }
    expandedRows.value = abertos
  } catch {
    // Sub-linha é enriquecimento: falhou, o grid segue só com as linhas.
    subRowsMap.value = {}
    subRowsColumns.value = []
    expandedRows.value = {}
  }
}

function subRowsDe(row: Record<string, unknown>): Record<string, unknown>[] {
  return subRowsMap.value[String(row[props.optionValue])] || []
}

// Metadata from extras.fields
const apiFields = ref<ApiFieldMeta[]>([])
const crudAvailable = computed(() => {
  // Se o usuário forneceu crudFields, CRUD está habilitado
  if (props.crudFields?.length) return true
  // Se a API retornou extras.fields, CRUD está disponível
  return apiFields.value.length > 0
})

// Respeita props explícitas, senão auto-detecta
const showCreate = computed(() => props.canCreate ?? crudAvailable.value)
/** Cadastro pelo Enter no campo: permitido E com form para abrir (`canCreate`
 *  explícito sem `crudFields` nem `extras.fields` não tem o que mostrar). */
const cadastroInline = computed(() => showCreate.value && crudAvailable.value)
const showEdit = computed(() => props.canEdit ?? crudAvailable.value)
const showDelete = computed(() => props.canDelete ?? crudAvailable.value)
const hasRowActions = computed(() => showEdit.value || showDelete.value)

// Campos do form — prioridade: props > auto-gerados do extras
const formFields = computed<FieldDef[]>(() => {
  if (props.crudFields?.length) return props.crudFields
  return mapApiFieldsToFieldDefs(apiFields.value)
})

// Colunas do modal — prioridade: crudColumns > props.columns > auto-geradas > fallback
const modalColumns = computed<ColumnDef[]>(() => {
  if (props.crudColumns?.length) return props.crudColumns
  if (props.columns?.length) {
    return props.columns.map((c) => ({
      field: c.field,
      header: c.header,
      sortable: true,
    }))
  }
  if (apiFields.value.length) {
    return mapApiFieldsToColumnDefs(apiFields.value)
  }
  return [{ field: props.optionLabel, header: props.optionLabel, sortable: true }]
})

// ---------------------------------------------------------------------------
// Modal — Fetch
// ---------------------------------------------------------------------------

async function fetchModalData() {
  // Cascata obrigatória sem valor → não lista (o modal mostra estado vazio).
  if (blockedByRequired.value) {
    modalData.value = []
    modalTotalRecords.value = 0
    return
  }
  modalLoading.value = true
  try {
    const params: Record<string, unknown> = {
      page: modalPage.value,
      page_size: modalPageSize.value,
      ...props.endpointParams,
      ...drilldownParams(),
    }
    if (modalSearch.value) params.search = modalSearch.value
    if (modalSortField.value && modalSortOrder.value !== 0) {
      params.ordering =
        modalSortOrder.value === -1 ? `-${modalSortField.value}` : modalSortField.value
    }
    const response = await provider.list(props.endpoint, params)
    modalData.value = response.data
    modalTotalRecords.value = response.rows
    void fetchSubRows()

    // Captura metadata de campos na primeira requisição
    if (response.extras?.fields && !props.columns?.length && !props.crudFields?.length) {
      apiFields.value = response.extras.fields as ApiFieldMeta[]
    }
  } catch {
    modalData.value = []
    modalTotalRecords.value = 0
  } finally {
    modalLoading.value = false
  }
}

function onInputKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  // F2 abre o modal de pesquisa (atalho estilo desktop).
  if (e.key === 'F2') {
    e.preventDefault()
    openModal()
    return
  }
  // ↓ com o painel fechado abre a lista (o PrimeVue ignora a seta nesse estado).
  // Pedido explícito: sem `minLength` nem debounce; vazio lista os primeiros.
  if (e.key === 'ArrowDown' && acRef.value && acRef.value.overlayVisible === false) {
    if (blockedByRequired.value) return
    e.preventDefault()
    pedirBusca(e, (e.target as HTMLInputElement | null)?.value ?? '')
    return
  }
  if (e.key === 'Enter' && !e.isComposing) void onEnterKey(e)
}

/** Enter com texto novo e sem correspondência → abre o cadastro com o texto no
 *  nome. Com sugestões, não interfere (o PrimeVue escolhe a focada). */
async function onEnterKey(e: KeyboardEvent) {
  const texto = textoNovo.value
  if (!texto || !cadastroInline.value || blockedByRequired.value) return
  // Enter é pedido explícito: se a busca deste texto ainda não terminou
  // (debounce pendente, em curso, ou abaixo do `minLength`), busca agora.
  if (ultimaQueryBuscada !== texto || buscaEmCurso) {
    pedirBusca(e, texto)
    if (buscaEmCurso) await buscaEmCurso
  }
  // O próprio Enter dispara o `change` nativo e o `forceSelection` do PrimeVue
  // descarta o texto (vira ''): isso não é desistência. Só aborta se o usuário
  // continuou digitando outra coisa enquanto a busca corria.
  const agora = textoDigitado.value.trim()
  if (agora !== '' && agora !== texto) return
  if (suggestions.value.length) {
    // Há o que escolher: garante o painel aberto (Escape pode tê-lo fechado).
    if (acRef.value?.overlayVisible === false) acRef.value.show?.()
    return
  }
  e.preventDefault()
  e.stopPropagation()
  abrirCriacaoCom(texto)
}

function openModal() {
  if (props.disabled) return
  modalSearch.value = ''
  modalPage.value = 1
  modalSortField.value = null
  modalSortOrder.value = 0
  // Em `multiple` o modal abre já com o que está selecionado no campo.
  modalSelection.value = props.multiple ? [...selectedItems.value] : null
  modalVisible.value = true
  fetchModalData()
}

function onModalPage(event: { page: number; rows: number }) {
  modalPage.value = event.page + 1
  modalPageSize.value = event.rows
  fetchModalData()
}

function onModalSort(event: { sortField?: string; sortOrder?: 1 | -1 | 0 }) {
  modalSortField.value = (event.sortField as string) ?? null
  modalSortOrder.value = event.sortOrder ?? 0
  modalPage.value = 1
  fetchModalData()
}

function confirmModalSelection() {
  if (props.multiple) {
    selectedItems.value = dedupeByKey(modalSelecionados.value)
    emitSelection()
    modalVisible.value = false
    return
  }
  const sel = modalSelecionados.value[0]
  if (!sel) return
  selectedItem.value = sel
  emit('update:modelValue', sel)
  modalVisible.value = false
}

function onRowDblClick(event: { data: Record<string, unknown> }) {
  // Em `multiple`, o duplo clique acrescenta à marcação e o modal continua
  // aberto — fechar a cada item tornaria a seleção de vários penosa.
  if (props.multiple) {
    modalSelection.value = dedupeByKey([...modalSelecionados.value, event.data])
    return
  }
  selectedItem.value = event.data
  emit('update:modelValue', event.data)
  modalVisible.value = false
}

// --- Modal: teclado (foco → pesquisa → grid) ---
const modalSearchInput = ref<{ $el?: HTMLElement } | null>(null)
const modalTableWrap = ref<HTMLElement | null>(null)
let lastSearched = ''

function onModalShow() {
  lastSearched = ''
  nextTick(() => {
    const el = modalSearchInput.value?.$el as HTMLInputElement | undefined
    el?.focus?.()
    el?.select?.()
  })
}

function focusModalGrid() {
  nextTick(() => {
    const row = modalTableWrap.value?.querySelector<HTMLElement>('.p-datatable-tbody > tr')
    row?.focus()
  })
}

function onModalSearchKeydown(e: KeyboardEvent) {
  if (e.key !== 'Enter' || e.isComposing) return
  e.preventDefault()
  const q = modalSearch.value.trim()
  // Vazio ou já pesquisado → move o foco para o grid.
  if (q === '' || q === lastSearched) {
    focusModalGrid()
    return
  }
  // Texto novo → pesquisa imediata (cancela o debounce); o próximo Enter vai ao grid.
  if (modalSearchTimer) clearTimeout(modalSearchTimer)
  lastSearched = q
  modalPage.value = 1
  fetchModalData()
}

function onModalGridKeydown(e: KeyboardEvent) {
  // Enter no grid = confirmar a seleção (marcada com Espaço). Interceptado (capture)
  // antes do handler nativo do DataTable para não apenas alternar a marca.
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    // Em `multiple` o Enter confirma a marcação atual, inclusive vazia (= limpar).
    if (props.multiple || modalSelecionados.value.length) confirmModalSelection()
  }
  // Espaço e setas: tratados nativamente pelo DataTable (marca/navega).
}

watch(modalSearch, () => {
  if (modalSearchTimer) clearTimeout(modalSearchTimer)
  modalSearchTimer = setTimeout(() => {
    modalPage.value = 1
    lastSearched = modalSearch.value.trim()
    fetchModalData()
  }, 300)
})

// Reage à mudança das cascatas: rebusca (se o modal estiver aberto) e limpa a
// seleção que ficou obsoleta ao trocar a origem — sem apagar na carga inicial.
watch(
  () => drilldownList.value.map((d) => normalizeDrillValue(d.value)),
  (novos, antigos) => {
    if (modalVisible.value) {
      modalPage.value = 1
      fetchModalData()
    }
    if (!antigos) return
    const mudou = novos.some((v, i) => v !== antigos[i])
    if (!mudou) return
    const tinhaValorAntes = antigos.some((v) => !isEmptyValue(v))
    if (tinhaValorAntes) {
      if (props.multiple) {
        if (selectedItems.value.length) {
          selectedItems.value = []
          emitSelection()
        }
      } else if (selectedItem.value) {
        selectedItem.value = null
        emit('update:modelValue', null)
      }
    }
    // Cascata preenchida/desbloqueada: se o pai só tem um filho, já entra.
    if (!blockedByRequired.value) void tentarAutoSelecao()
  },
)

// ---------------------------------------------------------------------------
// Modal — CRUD
// ---------------------------------------------------------------------------

const formDialogVisible = ref(false)
const formSaving = ref(false)
const editingItem = ref<Record<string, unknown> | null>(null)
const formData = reactive<Record<string, unknown>>({})

const isEditing = computed(() => editingItem.value !== null)
/** "Novo registro — Recomendante": o `dialogHeader` (label do campo) diz o quê. */
const formDialogTitle = computed(() => {
  const acao = isEditing.value ? 'Editar registro' : 'Novo registro'
  return props.dialogHeader ? `${acao} — ${props.dialogHeader}` : acao
})

function getDefaults(): Record<string, unknown> {
  const defaults: Record<string, unknown> = {}
  for (const f of formFields.value) {
    defaults[f.field] =
      f.defaultValue !== undefined
        ? typeof f.defaultValue === 'function'
          ? (f.defaultValue as () => unknown)()
          : f.defaultValue
        : null
  }
  return defaults
}

function resetForm() {
  const defs = getDefaults()
  for (const key of Object.keys(formData)) {
    delete formData[key]
  }
  for (const [key, val] of Object.entries(defs)) {
    formData[key] = val
  }
}

function openCreateForm() {
  editingItem.value = null
  resetForm()
  formDialogVisible.value = true
}

/** Cadastro a partir do campo: o texto digitado já entra no campo do nome
 *  (`optionLabel` se existir no form; senão o primeiro campo de texto). */
function abrirCriacaoCom(texto: string) {
  editingItem.value = null
  resetForm()
  const campos = formFields.value
  const campo =
    campos.find((f) => f.field === props.optionLabel) ??
    campos.find((f) => !f.type || f.type === 'text')
  if (campo) formData[campo.field] = texto
  formDialogVisible.value = true
}

/** Devolve o foco ao input do campo (depois de fechar o cadastro inline). */
function focarInput(limpar: boolean) {
  nextTick(() => {
    const input = inputEl()
    if (!input) return
    if (limpar) input.value = ''
    input.focus()
  })
}

function openEditForm(item: Record<string, unknown>) {
  editingItem.value = item
  for (const f of formFields.value) {
    formData[f.field] = item[f.field] !== undefined ? item[f.field] : null
  }
  formDialogVisible.value = true
}

function setFormField(field: string, value: unknown) {
  formData[field] = value
}

async function saveForm() {
  formSaving.value = true
  try {
    const payload = { ...formData }

    // FK — extrair ID de objetos selecionados
    for (const f of formFields.value) {
      const val = payload[f.field]
      if (f.type === 'fk' && val !== null && typeof val === 'object') {
        const key = f.optionValue || 'id'
        payload[f.field] = (val as Record<string, unknown>)[key] ?? val
      }
    }

    let response

    if (isEditing.value && editingItem.value) {
      const pk = editingItem.value[props.optionValue]
      response = await provider.update(props.endpoint, pk as string | number, payload)
      // Atualiza na lista do modal
      const idx = modalData.value.findIndex((i) => i[props.optionValue] === pk)
      if (idx !== -1) {
        modalData.value[idx] = response.data
      }
      toast.success('Registro atualizado com sucesso')
    } else {
      // Cria herdando o(s) pai(s) da cascata (dependsOn) — ex.: um novo lote nasce
      // no produto selecionado. Sem semear o pai o backend rejeitaria o filho órfão.
      // Só completa chaves ausentes: um campo do form com o mesmo nome prevalece.
      const parent = drilldownParams()
      for (const [key, value] of Object.entries(parent)) {
        const current = payload[key]
        if (current === undefined || current === null || current === '') {
          payload[key] = value
        }
      }
      response = await provider.create(props.endpoint, payload)
      // Adiciona na lista e seleciona automaticamente
      modalData.value.unshift(response.data)
      modalTotalRecords.value++
      toast.success('Registro criado com sucesso')
    }

    formDialogVisible.value = false
    editingItem.value = null

    if (!modalVisible.value) {
      // Cadastro inline (Enter no campo): o registro entra direto na seleção
      // e o foco volta ao input — sem passar pelo modal.
      textoDigitado.value = ''
      if (props.multiple) {
        selectedItems.value = dedupeByKey([...selectedItems.value, response.data])
        emitSelection()
      } else {
        selectedItem.value = response.data
        emit('update:modelValue', response.data)
      }
      // Em `multiple` o input de digitação guarda o texto; a label vem no chip.
      focarInput(props.multiple)
      return
    }

    // Auto-seleciona o registro criado/editado (em `multiple`, acrescenta)
    modalSelection.value = props.multiple
      ? dedupeByKey([...modalSelecionados.value, response.data])
      : response.data
  } catch (err) {
    toast.error(extractApiError(err, 'Erro ao salvar registro'))
  } finally {
    formSaving.value = false
  }
}

function confirmDelete(item: Record<string, unknown>) {
  confirmDeleteDialog(async () => {
    try {
      const pk = item[props.optionValue]
      await provider.delete(props.endpoint, pk as string | number)
      const idx = modalData.value.findIndex((i) => i[props.optionValue] === pk)
      if (idx !== -1) {
        modalData.value.splice(idx, 1)
        modalTotalRecords.value--
      }
      // Se o item deletado estava selecionado, sai da seleção
      if (props.multiple) {
        if (selectedItems.value.some((i) => i[props.optionValue] === pk)) {
          selectedItems.value = selectedItems.value.filter((i) => i[props.optionValue] !== pk)
          emitSelection()
        }
        modalSelection.value = modalSelecionados.value.filter((i) => i[props.optionValue] !== pk)
      } else {
        if (selectedItem.value && selectedItem.value[props.optionValue] === pk) {
          selectedItem.value = null
          emit('update:modelValue', null)
        }
        if (modalSelecionados.value[0]?.[props.optionValue] === pk) {
          modalSelection.value = null
        }
      }
      toast.success('Registro excluído com sucesso')
    } catch (err) {
      toast.error(extractApiError(err, 'Erro ao excluir registro'))
    }
  })
}
</script>

<template>
  <div
    class="w-autocompletefk"
    :class="{ 'w-autocompletefk-has-clear': mostrarLimpar }"
    :style="chipStyle"
    :data-kbd-hold="segurarEnter || undefined"
    v-bind="$attrs"
    @input="onInputTexto"
  >
    <!-- `auto-option-focus`: a primeira sugestão já nasce focada, então digitar
         e dar Enter escolhe — sem seta para baixo antes. É o que faz o campo
         fluir na navegação por Enter dos formulários. Teclado extra (no
         `onInputKeydown`): ↓ abre a lista, F2 pesquisa, Enter com texto novo
         e sem correspondência abre o cadastro. -->
    <AutoComplete
      ref="acRef"
      :model-value="acModel"
      :suggestions="suggestions"
      :multiple="multiple"
      :option-label="optionLabel"
      :placeholder="placeholderVisivel"
      :disabled="disabled"
      :force-selection="forceSelection"
      :loading="searching"
      :show-clear="false"
      :input-id="inputId"
      :pt="acPt"
      fluid
      auto-option-focus
      @complete="onSearch"
      @item-select="onSelect"
      @update:model-value="onAcUpdate"
      @clear="onClear"
      @keydown="onInputKeydown"
    >
      <!-- Sugestão em duas linhas quando `optionDescription` aponta para algo
           preenchido. Sem ela o slot não é declarado, e o AutoComplete volta ao
           render padrão de uma linha — nada muda para quem não usa. -->
      <template v-if="optionDescription" #option="{ option }">
        <span class="w-fk-option">
          <span class="w-fk-option__label">{{ labelOf(option) }}</span>
          <span v-if="descriptionOf(option)" class="w-fk-option__desc">
            {{ descriptionOf(option) }}
          </span>
        </span>
      </template>

      <!-- Chip clicado abre a listagem já marcada com a seleção atual. Com
           `maxChips`, os excedentes viram um chip `+N` (somem do campo, mas
           continuam no tooltip) — chip nenhum pode esticar a caixa. -->
      <template v-if="multiple" #chip="{ value, index, removeCallback }">
        <Chip
          v-if="!maxChips || index < maxChips"
          v-tooltip.top="labelOf(value)"
          class="p-autocomplete-chip w-autocompletefk-chip"
          :label="labelOf(value)"
          removable
          @click="openModal"
          @remove="onChipRemove($event, removeCallback)"
        />
        <Chip
          v-else-if="index === maxChips"
          v-tooltip.top="chipsOcultosLabel"
          class="p-autocomplete-chip w-autocompletefk-chip w-autocompletefk-chip-more"
          :label="`+${chipsOcultos}`"
          @click="openModal"
        />
        <span v-else class="w-autocompletefk-chip-hidden" />
      </template>
    </AutoComplete>
    <button
      v-if="mostrarLimpar"
      v-tooltip.top="'Limpar'"
      type="button"
      aria-label="Limpar"
      data-kbd-skip
      tabindex="-1"
      class="w-autocompletefk-clear"
      @click="limparSelecao"
    >
      <i class="pi pi-times" />
    </button>
    <button
      v-tooltip.top="'Pesquisar (F2)'"
      type="button"
      aria-label="Pesquisar (F2)"
      :disabled="disabled"
      data-kbd-skip
      tabindex="-1"
      class="w-autocompletefk-trigger"
      @click="openModal"
    >
      <i class="pi pi-search" />
    </button>
  </div>

  <!-- Modal de Pesquisa + CRUD -->
  <Dialog
    v-model:visible="modalVisible"
    :append-to="tabHost?.hostEl.value ?? 'body'"
    :header="dialogHeader || 'Pesquisar'"
    :style="{ width: '80vw' }"
    modal
    :draggable="false"
    class="w-autocompletefk-dialog"
    @show="onModalShow"
  >
    <div class="w-autocompletefk-toolbar">
      <IconField class="w-autocompletefk-toolbar-search">
        <InputIcon class="pi pi-search" />
        <InputText
          ref="modalSearchInput"
          v-model="modalSearch"
          placeholder="Pesquisar..."
          class="w-full"
          autofocus
          @keydown="onModalSearchKeydown"
        />
      </IconField>
      <div class="w-autocompletefk-toolbar-actions">
        <Button
          v-if="showCreate"
          label="Novo"
          icon="pi pi-plus"
          size="small"
          @click="openCreateForm"
        />
      </div>
    </div>

    <div ref="modalTableWrap" @keydown.capture="onModalGridKeydown">
      <DataTable
        v-model:selection="modalSelection"
        v-model:expanded-rows="expandedRows"
        :meta-key-selection="false"
        :value="modalData"
        :loading="modalLoading"
        paginator
        lazy
        striped-rows
        removable-sort
        size="small"
        :rows="modalPageSize"
        :total-records="modalTotalRecords"
        :sort-field="modalSortField ?? undefined"
        :sort-order="modalSortOrder"
        :selection-mode="multiple ? 'multiple' : 'single'"
        :data-key="optionValue"
        @page="onModalPage"
        @sort="(e: any) => onModalSort({ sortField: e.sortField, sortOrder: e.sortOrder })"
        @row-dblclick="onRowDblClick"
      >
        <Column :selection-mode="multiple ? 'multiple' : 'single'" header-style="width: 3rem" />
        <Column
          v-for="col in modalColumns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          :sortable="(col as ColumnDef).sortable ?? true"
          :style="(col as ColumnDef).style"
        >
          <template #body="{ data }">
            <WCrudColumnRenderer
              v-if="(col as ColumnDef).type"
              :column="col as ColumnDef"
              :value="data[col.field]"
              :row-data="data"
            />
            <template v-else>
              {{ data[col.field] }}
            </template>
          </template>
        </Column>

        <!-- Coluna de ações CRUD -->
        <Column v-if="hasRowActions" header="" :style="{ width: '6rem' }">
          <template #body="{ data }">
            <div class="flex items-center justify-end gap-1">
              <Button
                v-if="showEdit"
                v-tooltip.top="'Editar'"
                icon="pi pi-pencil"
                aria-label="Editar"
                text
                rounded
                size="small"
                @click="openEditForm(data)"
              />
              <Button
                v-if="showDelete"
                v-tooltip.top="'Excluir'"
                icon="pi pi-trash"
                aria-label="Excluir"
                text
                rounded
                size="small"
                severity="danger"
                @click="confirmDelete(data)"
              />
            </div>
          </template>
        </Column>

        <!-- Sub-linhas: mini-grid por linha expandida (colunas vêm do `subRows`) -->
        <template v-if="subRows" #expansion="{ data }">
          <table class="w-fk-subrows">
            <thead>
              <tr>
                <th v-for="col in subRowsColumns" :key="col.field">{{ col.header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sub, i) in subRowsDe(data)" :key="i">
                <td v-for="col in subRowsColumns" :key="col.field">
                  {{ sub[col.field] ?? '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </template>

        <template #empty>
          <div class="w-autocompletefk-empty">Nenhum registro encontrado</div>
        </template>
      </DataTable>
    </div>

    <template #footer>
      <div class="w-autocompletefk-footer">
        <Button label="Cancelar" severity="secondary" text @click="modalVisible = false" />
        <Button
          :label="
            multiple && modalSelecionados.length
              ? `Selecionar (${modalSelecionados.length})`
              : 'Selecionar'
          "
          icon="pi pi-check"
          :disabled="!multiple && !modalSelecionados.length"
          @click="confirmModalSelection"
        />
      </div>
    </template>
  </Dialog>

  <!-- Form Dialog (CRUD) — nested sobre o modal -->
  <WCrudFormDialog
    v-if="crudAvailable"
    :visible="formDialogVisible"
    :title="formDialogTitle"
    :fields="formFields"
    :form-data="formData"
    :is-editing="isEditing"
    :saving="formSaving"
    :width="dialogWidth"
    @update:visible="
      (v) => {
        formDialogVisible = v
        if (!v) editingItem = null
      }
    "
    @update:field="setFormField"
    @save="saveForm"
  />
</template>
