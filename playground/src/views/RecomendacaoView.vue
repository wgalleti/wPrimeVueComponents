<script setup lang="ts">
import { computed, ref } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import {
  WCheckList,
  WEditableTable,
  WFormRenderer,
  WInfoCard,
  WMapSelect,
  WStepFlow,
  WStepSection,
} from '@wgalleti/primevue-components'
import type {
  CheckListItem,
  EditableColumnDef,
  EditableRow,
  FieldDef,
  MapSelectFeature,
  MapSelectId,
} from '@wgalleti/primevue-components'

// ---------------------------------------------------------------------------
// Preferências da página (as duas dimensões que TODO componente da suite
// precisa aguentar: tema e densidade)
// ---------------------------------------------------------------------------
const isDark = ref(document.documentElement.classList.contains('dark'))
const density = ref<'balanced' | 'compact'>('balanced')

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

// ---------------------------------------------------------------------------
// Talhões (geometria projetada no canto NO da gleba da Fazenda Mafra, como no
// design; coordenadas GeoJSON = [lng, lat])
// ---------------------------------------------------------------------------
function geo(pontos: string) {
  const lat0 = -27.856
  const lng0 = -52.852
  const dLat = 4.823e-5
  const dLng = 5.423e-5
  const anel = pontos.split(' ').map((p) => {
    const [x, y] = p.split(',').map(Number)
    return [lng0 + x * dLng, lat0 - y * dLat] as [number, number]
  })
  return { type: 'Polygon' as const, coordinates: [[...anel, anel[0]]] }
}

const talhoes: MapSelectFeature[] = [
  {
    id: 'P41',
    nome: 'P41',
    subtitulo: 'Rotacionado',
    area: 82,
    geometria: geo('40,40 200,30 210,160 46,168'),
  },
  {
    id: 'P42',
    nome: 'P42',
    subtitulo: 'Rotacionado',
    area: 160,
    geometria: geo('200,30 380,36 372,164 210,160'),
  },
  {
    id: 'P43',
    nome: 'P43',
    subtitulo: 'Soja / Milho',
    area: 74,
    geometria: geo('380,36 545,52 534,172 372,164'),
  },
  {
    id: 'P44',
    nome: 'P44',
    subtitulo: 'Rotacionado',
    area: 100,
    geometria: geo('46,168 210,160 214,292 54,300'),
  },
  {
    id: 'P45',
    nome: 'P45',
    subtitulo: 'Soja / Milho',
    area: 58,
    geometria: geo('210,160 372,164 368,296 214,292'),
  },
  {
    id: 'P46',
    nome: 'P46',
    subtitulo: 'Pastagem',
    area: 46,
    geometria: geo('372,164 534,172 528,300 368,296'),
  },
  // Talhão sem contorno cadastrado: fica na lista, não aparece no mapa.
  { id: 'P49', nome: 'P49', subtitulo: 'Rotacionado · sem contorno', area: 31 },
]

const mapaAberto = ref(false)
const mapaSelecao = ref<MapSelectId[]>([])

// Os dois arranjos lado a lado, para comparar sem recarregar a página.
// 'sobreposto' quer o modal quase cheio (é o caso de uso real); 'lado-a-lado'
// cabe num Dialog estreito.
const mapaLayout = ref<'lado-a-lado' | 'sobreposto'>('sobreposto')
const mapaLayouts = ['lado-a-lado', 'sobreposto']

const mapaDialogStyle = computed(() =>
  mapaLayout.value === 'sobreposto' ? { width: '94vw', height: '94vh' } : { width: '1080px' },
)

const mapaHeight = computed(() =>
  mapaLayout.value === 'sobreposto' ? 'calc(94vh - 11rem)' : '420px',
)

function abrirMapa() {
  mapaSelecao.value = [...(form.value.talhoes as MapSelectId[])]
  mapaAberto.value = true
}

function aplicarMapa() {
  form.value.talhoes = [...mapaSelecao.value]
  mapaAberto.value = false
}

// ---------------------------------------------------------------------------
// Etapa 1 — contexto e base de cálculo (FieldDef, com os tipos novos)
// ---------------------------------------------------------------------------
const form = ref<Record<string, unknown>>({
  setor: 'ROTACIONADO',
  operacao: 'PLANTIO_REPLANTIO',
  recomendante: 'Antonio',
  data: '2026-08-07',
  talhoes: ['P42', 'P44'],
  umidade_solo: 'ADEQUADA',
  observacao: 'Profundidade de 30 cm, 5 cm está seco',
  volume_bag: 700,
  sementes_bag: 5000000,
  forma_calculo: 'GERMINACAO',
})

const areaTalhoes = computed(() =>
  talhoes
    .filter((t) => (form.value.talhoes as MapSelectId[]).includes(t.id))
    .reduce((total, t) => total + (t.area ?? 0), 0),
)

const fields: FieldDef[] = [
  {
    field: 'setor',
    label: 'Setor',
    type: 'text',
    colSpan: 1,
    fieldGroup: { id: 'ctx', title: '', columns: 4 },
  },
  {
    field: 'operacao',
    label: 'Operação',
    type: 'select',
    colSpan: 1,
    options: [{ label: 'Plantio / Replantio', value: 'PLANTIO_REPLANTIO' }],
    fieldGroup: { id: 'ctx', title: '', columns: 4 },
  },
  {
    field: 'recomendante',
    label: 'Recomendante',
    type: 'text',
    colSpan: 1,
    fieldGroup: { id: 'ctx', title: '', columns: 4 },
  },
  {
    field: 'data',
    label: 'Data',
    type: 'date',
    colSpan: 1,
    fieldGroup: { id: 'ctx', title: '', columns: 4 },
  },
  {
    field: 'talhoes',
    label: 'Talhões',
    type: 'chips',
    optionValue: 'id',
    optionLabel: 'nome',
    options: talhoes as unknown as Record<string, unknown>[],
    chipsEmptyLabel: 'Nenhum talhão selecionado',
    chipsRemoveLabel: 'Remover talhão',
    fieldGroup: { id: 'ctx', title: '', columns: 4 },
  },
  {
    field: 'umidade_solo',
    label: 'Umidade de solo',
    type: 'choice',
    colSpan: 2,
    options: [
      { label: 'Pó', value: 'PO' },
      { label: 'Baixa', value: 'BAIXA' },
      { label: 'Média', value: 'MEDIA' },
      { label: 'Adequada', value: 'ADEQUADA' },
      { label: 'Muito alta', value: 'MUITO_ALTA' },
    ],
    fieldGroup: { id: 'ctx', title: '', columns: 4 },
  },
  {
    field: 'observacao',
    label: 'Observação',
    type: 'text',
    colSpan: 2,
    fieldGroup: { id: 'ctx', title: '', columns: 4 },
  },
  {
    field: 'volume_bag',
    label: 'Volume do BAG (kg)',
    type: 'number',
    colSpan: 1,
    fieldGroup: { id: 'base', title: 'Base de cálculo', columns: 4 },
  },
  {
    field: 'sementes_bag',
    label: 'Sementes por BAG',
    type: 'number',
    colSpan: 1,
    fieldGroup: { id: 'base', title: 'Base de cálculo', columns: 4 },
  },
  {
    field: 'forma_calculo',
    label: 'Forma de cálculo',
    type: 'segmented',
    colSpan: 2,
    options: [
      { label: 'Germinação', value: 'GERMINACAO' },
      { label: 'KG / ha', value: 'KG_HA' },
    ],
    fieldGroup: { id: 'base', title: 'Base de cálculo', columns: 4 },
  },
]

function setField(field: string, value: unknown) {
  form.value = { ...form.value, [field]: value }
}

// ---------------------------------------------------------------------------
// Etapa 2 — lotes e insumos (fórmulas da planilha, SPEC §2)
// ---------------------------------------------------------------------------
interface Insumo extends EditableRow {
  produto: string
  classe: string
  dose: number
  medida: string
}

interface Lote extends EditableRow {
  produto: string
  lote: string
  plantas_metro: number
  germinacao: number
  espacamento: number
  area: number
  volume: number
  insumos: Insumo[]
}

const lotes = ref<Lote[]>([
  {
    produto: 'HO APORE',
    lote: '32575111022',
    plantas_metro: 16,
    germinacao: 96,
    espacamento: 0.45,
    area: 160,
    volume: 12,
    insumos: [
      { produto: 'CERTEZA N', classe: 'QUIMICO', dose: 2, medida: 'ML_KG' },
      { produto: 'CONGREGA', classe: 'QUIMICO', dose: 0.1, medida: 'LT_HA' },
      { produto: 'STARFIX', classe: 'BIOLOGICO', dose: 4, medida: 'ML_KG' },
      { produto: 'AZOS', classe: 'BIOLOGICO', dose: 2, medida: 'ML_KG' },
      { produto: 'SALUZI', classe: 'QUIMICO', dose: 1, medida: 'ML_KG' },
      { produto: 'GRAFITE', classe: 'COADJUVANTE', dose: 2, medida: 'G_KG' },
    ],
  },
  {
    produto: 'BMX GUEPARDO',
    lote: '32575111023',
    plantas_metro: 16,
    germinacao: 92,
    espacamento: 0.42,
    area: 100,
    volume: 8,
    insumos: [
      { produto: 'CERTEZA N', classe: 'QUIMICO', dose: 2, medida: 'ML_KG' },
      { produto: 'STARFIX', classe: 'BIOLOGICO', dose: 4, medida: 'ML_KG' },
      { produto: 'AZOS', classe: 'BIOLOGICO', dose: 2, medida: 'ML_KG' },
    ],
  },
])

function haPorBag(lote: Lote): number {
  const sementesMetro = lote.germinacao ? (lote.plantas_metro * 100) / lote.germinacao : 0
  const populacao = lote.espacamento ? (10000 / lote.espacamento) * sementesMetro : 0
  return populacao ? Number(form.value.sementes_bag) / populacao : 0
}

function volumeKg(lote: Lote): number {
  return lote.volume * Number(form.value.volume_bag)
}

function quantidade(insumo: Insumo, lote: Lote): number {
  if (insumo.medida === 'ML_KG') return (insumo.dose * volumeKg(lote)) / 1000
  if (insumo.medida === 'LT_HA') return insumo.dose * lote.area
  return (volumeKg(lote) * insumo.dose) / 1000
}

function somaClasse(lote: Lote, classe: string): number {
  return lote.insumos.reduce((t, i) => t + (i.classe === classe ? quantidade(i, lote) : 0), 0)
}

const colunasLote: EditableColumnDef[] = [
  { field: 'produto', header: 'Produto' },
  { field: 'lote', header: 'Lote', width: 130 },
  { field: 'ha_por_bag', header: 'BAGs/ha', width: 100, align: 'right', decimals: 1 },
  { field: 'area', header: 'Área (ha)', width: 110, editor: 'number', decimals: 0, footer: 'sum' },
  { field: 'sugestao', header: 'Sugestão', width: 100, align: 'right', decimals: 1, footer: 'sum' },
  { field: 'volume', header: 'A tratar', width: 100, editor: 'number', decimals: 0, footer: 'sum' },
  { field: 'volume_kg', header: 'Volume (kg)', width: 130, decimals: 0, footer: 'sum' },
]

/** As colunas derivadas entram como campos calculados na própria linha. */
const linhasLote = computed<EditableRow[]>(() =>
  lotes.value.map((lote) => ({
    ...lote,
    ha_por_bag: haPorBag(lote),
    sugestao: haPorBag(lote) ? lote.area / haPorBag(lote) : 0,
    volume_kg: volumeKg(lote),
  })),
)

/** O v-model volta com as derivadas dentro; só os campos digitáveis são lidos. */
function onLotesChange(rows: EditableRow[]) {
  lotes.value = rows.map((row, index) => ({
    ...lotes.value[index],
    ...(row as Lote),
  })) as Lote[]
}

function onInsumosChange(loteIndex: number, rows: EditableRow[]) {
  const proximo = [...lotes.value]
  proximo[loteIndex] = { ...proximo[loteIndex], insumos: rows as Insumo[] }
  lotes.value = proximo
}

const colunasInsumo: EditableColumnDef[] = [
  { field: 'produto', header: 'Produto', editor: 'text' },
  {
    field: 'classe',
    header: 'Classe',
    width: 150,
    editor: 'select',
    options: [
      { label: 'Biológico', value: 'BIOLOGICO' },
      { label: 'Químico', value: 'QUIMICO' },
      { label: 'Coadjuvante', value: 'COADJUVANTE' },
    ],
  },
  { field: 'dose', header: 'Dose', width: 110, editor: 'number', decimals: 1 },
  {
    field: 'medida',
    header: 'Medida',
    width: 130,
    editor: 'select',
    options: [
      { label: 'ML / KG', value: 'ML_KG' },
      { label: 'LT / HÁ', value: 'LT_HA' },
      { label: 'G / KG', value: 'G_KG' },
    ],
  },
  { field: 'quantidade', header: 'Quantidade', width: 130, decimals: 1, footer: 'sum' },
]

function linhasInsumo(lote: Lote): EditableRow[] {
  return lote.insumos.map((i) => ({ ...i, quantidade: quantidade(i, lote) }))
}

function novoLote() {
  lotes.value = [
    ...lotes.value,
    {
      produto: 'Novo lote',
      lote: '—',
      plantas_metro: 16,
      germinacao: 95,
      espacamento: 0.45,
      area: 0,
      volume: 0,
      insumos: [],
    },
  ]
}

function novoInsumo(loteIndex: number) {
  const proximo = [...lotes.value]
  proximo[loteIndex] = {
    ...proximo[loteIndex],
    insumos: [
      ...proximo[loteIndex].insumos,
      { produto: 'Novo insumo', classe: 'QUIMICO', dose: 0, medida: 'ML_KG' },
    ],
  }
  lotes.value = proximo
}

// ---------------------------------------------------------------------------
// Etapa 3 — resumo para o TS
// ---------------------------------------------------------------------------
const colunasResumo: EditableColumnDef[] = [
  { field: 'lote', header: 'Lote' },
  { field: 'volume_kg', header: 'Volume (kg)', width: 150, decimals: 0, footer: 'sum' },
  { field: 'biologico', header: 'Biológico (L)', width: 140, decimals: 1, footer: 'sum' },
  { field: 'bio_taxa', header: 'ml/kg', width: 110, decimals: 1 },
  { field: 'quimico', header: 'Químico (L)', width: 140, decimals: 1, footer: 'sum' },
  { field: 'qui_taxa', header: 'ml/kg', width: 110, decimals: 1 },
]

const linhasResumo = computed<EditableRow[]>(() =>
  lotes.value.map((lote) => {
    const bio = somaClasse(lote, 'BIOLOGICO')
    const qui = somaClasse(lote, 'QUIMICO')
    const kg = volumeKg(lote)
    return {
      lote: `${lote.produto} · ${lote.lote}`,
      volume_kg: kg,
      biologico: bio,
      bio_taxa: kg ? (bio * 1000) / kg : 0,
      quimico: qui,
      qui_taxa: kg ? (qui * 1000) / kg : 0,
    }
  }),
)

// ---------------------------------------------------------------------------
// Aside — resumo e verificações
// ---------------------------------------------------------------------------
const areaTotal = computed(() => lotes.value.reduce((t, l) => t + l.area, 0))
const volumeTotal = computed(() => lotes.value.reduce((t, l) => t + l.volume, 0))
const volumeKgTotal = computed(() => lotes.value.reduce((t, l) => t + volumeKg(l), 0))
const caldaTotal = computed(() =>
  lotes.value.reduce(
    (t, l) => t + l.insumos.reduce((s, i) => s + (i.medida === 'G_KG' ? 0 : quantidade(i, l)), 0),
    0,
  ),
)

const resumo = computed(() => [
  {
    label: 'Área atendida',
    value: areaTotal.value,
    format: 'number' as const,
    decimals: 0,
    suffix: 'ha',
  },
  { label: 'BAGs a tratar', value: volumeTotal.value, format: 'number' as const, decimals: 0 },
  {
    label: 'Volume total',
    value: volumeKgTotal.value,
    format: 'number' as const,
    decimals: 0,
    suffix: 'kg',
  },
  {
    label: 'Calda total',
    value: caldaTotal.value,
    format: 'number' as const,
    decimals: 1,
    suffix: 'L',
  },
])

const verificacoes = computed<CheckListItem[]>(() => {
  const areaOk = Math.abs(areaTotal.value - areaTalhoes.value) < 0.01
  const semCalculo = lotes.value.filter((l) => !haPorBag(l)).length
  return [
    {
      nivel: areaOk ? 'ok' : 'warn',
      label: areaOk
        ? `Área distribuída bate com os talhões (${areaTalhoes.value} ha)`
        : `Faltam ${(areaTalhoes.value - areaTotal.value).toFixed(0)} ha para cobrir os talhões`,
    },
    {
      nivel: semCalculo ? 'warn' : 'ok',
      label: semCalculo
        ? `${semCalculo} lote(s) ainda sem cálculo`
        : 'Todos os lotes têm BAGs/ha calculado',
    },
    { nivel: 'ok', label: 'Saldo de sementes suficiente para o tratamento' },
    { nivel: volumeKgTotal.value > 12000 ? 'bad' : 'ok', label: 'Estoque de insumos suficiente' },
  ]
})

// ---------------------------------------------------------------------------
// Etapas
// ---------------------------------------------------------------------------
const etapa = ref(1)
/** As duas orientações lado a lado: a coluna (padrão) e a régua no topo. */
const orientacao = ref<'vertical' | 'horizontal'>('vertical')

const resumoEtapa1 = computed(
  () =>
    `${(form.value.talhoes as MapSelectId[]).join(', ') || 'sem talhão'} · ${areaTalhoes.value} ha · ${
      form.value.forma_calculo === 'GERMINACAO' ? 'germinação' : 'kg/ha'
    }`,
)
const resumoEtapa2 = computed(
  () => `${areaTotal.value} ha · ${volumeTotal.value} BAGs · ${volumeKgTotal.value} kg`,
)
const resumoEtapa3 = computed(
  () =>
    `Biológico ${linhasResumo.value
      .reduce((t, r) => t + Number(r.biologico), 0)
      .toFixed(1)} L · Químico ${linhasResumo.value
      .reduce((t, r) => t + Number(r.quimico), 0)
      .toFixed(1)} L`,
)
</script>

<template>
  <div class="demo" :data-density="density">
    <header class="demo__head">
      <div>
        <h1 class="demo__title">Recomendação — componentes novos</h1>
        <p class="demo__sub">
          WMapSelect · WEditableTable · WStepFlow/WStepSection (coluna ou régua) · WCheckList ·
          WInfoCard variant="metric" · FieldDef segmented/choice/chips
        </p>
      </div>
      <div class="demo__toggles">
        <Button
          :label="isDark ? 'Modo claro' : 'Modo escuro'"
          :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
          outlined
          @click="toggleTheme"
        />
        <Button
          :label="density === 'compact' ? 'Densidade: compact' : 'Densidade: balanced'"
          icon="pi pi-arrows-v"
          outlined
          @click="density = density === 'compact' ? 'balanced' : 'compact'"
        />
        <Button
          :label="orientacao === 'horizontal' ? 'Etapas: régua' : 'Etapas: coluna'"
          :icon="orientacao === 'horizontal' ? 'pi pi-arrows-h' : 'pi pi-arrows-v'"
          outlined
          @click="orientacao = orientacao === 'horizontal' ? 'vertical' : 'horizontal'"
        />
      </div>
    </header>

    <div class="demo__layout">
      <WStepFlow v-model="etapa" :orientation="orientacao" class="demo__flow">
        <WStepSection :step="1" title="Contexto e base de cálculo" :summary="resumoEtapa1">
          <WFormRenderer
            :fields="fields"
            :form-data="form"
            :is-editing="false"
            :columns="4"
            @update:field="setField"
          >
            <template #chips-trigger-talhoes>
              <button type="button" class="demo__chip-trigger" @click="abrirMapa">
                <i class="pi pi-map" />Selecionar no mapa
              </button>
            </template>
            <template #chips-summary-talhoes>
              Área total <strong>{{ areaTalhoes }} ha</strong>
            </template>
          </WFormRenderer>

          <template #footer>
            <Button
              label="Continuar para as sementes"
              icon="pi pi-arrow-right"
              icon-pos="right"
              outlined
              @click="etapa = 2"
            />
          </template>
        </WStepSection>

        <WStepSection
          :step="2"
          title="Sementes e lotes"
          :count="lotes.length"
          :summary="resumoEtapa2"
        >
          <WEditableTable
            :model-value="linhasLote"
            :columns="colunasLote"
            expandable
            removable
            add-label="Adicionar lote"
            empty-message="Nenhum lote adicionado"
            @update:model-value="onLotesChange"
            @add="novoLote"
          >
            <template #expansion="{ index }">
              <div class="demo__insumos">
                <div class="demo__insumos-head">
                  <i class="pi pi-bolt" />
                  <span>Insumos do lote</span>
                  <span class="demo__insumos-hint">
                    Biológico {{ somaClasse(lotes[index], 'BIOLOGICO').toFixed(1) }} L · Químico
                    {{ somaClasse(lotes[index], 'QUIMICO').toFixed(1) }} L
                  </span>
                </div>
                <WEditableTable
                  :model-value="linhasInsumo(lotes[index])"
                  :columns="colunasInsumo"
                  removable
                  add-label="Novo insumo"
                  empty-message="Nenhum insumo neste lote"
                  @update:model-value="(rows) => onInsumosChange(index, rows)"
                  @add="novoInsumo(index)"
                />
              </div>
            </template>
          </WEditableTable>

          <template #footer>
            <Button
              label="Continuar para o resumo"
              icon="pi pi-arrow-right"
              icon-pos="right"
              outlined
              @click="etapa = 3"
            />
          </template>
        </WStepSection>

        <WStepSection :step="3" title="Resumo para o TS" :summary="resumoEtapa3">
          <WEditableTable :model-value="linhasResumo" :columns="colunasResumo" />
        </WStepSection>
      </WStepFlow>

      <aside class="demo__aside">
        <WInfoCard title="Resumo da recomendação" variant="metric" :fields="resumo" />
        <WCheckList title="Verificações" :items="verificacoes" />
      </aside>
    </div>

    <Dialog v-model:visible="mapaAberto" modal :style="mapaDialogStyle">
      <template #header>
        <div class="demo__map-head">
          <span class="demo__map-title">Selecionar talhões</span>
          <SelectButton
            v-model="mapaLayout"
            :options="mapaLayouts"
            :allow-empty="false"
            aria-label="Arranjo do mapa"
          />
        </div>
      </template>

      <WMapSelect
        v-model="mapaSelecao"
        :features="talhoes"
        :layout="mapaLayout"
        :height="mapaHeight"
        search-placeholder="Buscar talhão ou setor"
      />
      <template #footer>
        <Button label="Cancelar" text @click="mapaAberto = false" />
        <Button label="Aplicar seleção" icon="pi pi-check" @click="aplicarMapa" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
/* Tokens de densidade do design system do portal. Aqui só para o toggle da
   página ter efeito — no app eles vêm do tokens.css via `data-density`. */
.demo[data-density='balanced'] {
  --control-h: 38px;
  --control-h-sm: 32px;
  --control-px: 12px;
  --field-gap: 6px;
  --row-h: 44px;
  --cell-py: 11px;
  --card-pad: 20px;
  --section-gap: 24px;
  --ui-font: 14px;
}

.demo[data-density='compact'] {
  --control-h: 32px;
  --control-h-sm: 28px;
  --control-px: 10px;
  --field-gap: 4px;
  --row-h: 36px;
  --cell-py: 7px;
  --card-pad: 16px;
  --section-gap: 18px;
  --ui-font: 13px;
}

.demo {
  display: flex;
  flex-direction: column;
  gap: var(--section-gap, 1.5rem);
}

.demo__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.demo__title {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--p-text-color);
}

.demo__sub {
  margin-top: 0.25rem;
  font-size: 0.8125rem;
  color: var(--p-text-muted-color);
}

.demo__map-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

.demo__map-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--p-text-color);
}

.demo__toggles {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.demo__layout {
  display: flex;
  align-items: flex-start;
  gap: var(--section-gap, 1.5rem);
}

.demo__flow {
  flex: 1;
  min-width: 0;
}

.demo__aside {
  width: 300px;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  position: sticky;
  top: 1rem;
}

.demo__chip-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 1.5rem;
  padding: 0 0.5625rem;
  border: 1px dashed var(--border-strong, var(--p-content-border-color));
  border-radius: 999px;
  background: transparent;
  color: var(--p-primary-color);
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
}

.demo__chip-trigger i {
  font-size: 0.625rem;
}

.demo__insumos {
  border: 1px solid var(--p-content-border-color);
  border-radius: 0.625rem;
  background: var(--p-content-background);
  overflow: hidden;
}

.demo__insumos-head {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.6875rem 0.875rem;
  border-bottom: 1px solid var(--p-content-border-color);
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--p-text-muted-color);
}

.demo__insumos-hint {
  margin-left: auto;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 1100px) {
  .demo__layout {
    flex-direction: column;
  }

  .demo__aside {
    width: 100%;
    position: static;
  }
}
</style>
