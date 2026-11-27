<script lang="ts">
/**
 * Prioridade+: quais abas ficam na faixa (uma entrada por aba, na ordem). Cabe tudo →
 * todas. Senão reserva a largura do "Mais" e tira abas do fim para o começo, nunca a
 * ativa, até caber — se só a ativa já não cabe, fica ela mesmo assim.
 * Grupos: `blocos[i]` é o índice da aba que abre o grupo da aba `i` e `rotulos[b]` a
 * largura do rótulo desse grupo, que conta enquanto houver aba dele na faixa.
 */
export function abasNaFaixa(
  larguras: number[],
  disponivel: number,
  ativa: number,
  mais = 0,
  rotulos: number[] = [],
  blocos: number[] = [],
): boolean[] {
  const naFaixa = larguras.map(() => true)
  const usado = (): number =>
    larguras.reduce((soma, largura, i) => soma + (naFaixa[i] ? largura : 0), 0) +
    rotulos.reduce(
      (soma, largura, b) =>
        soma + (blocos.some((bloco, i) => bloco === b && naFaixa[i]) ? largura : 0),
      0,
    )
  if (usado() <= disponivel) return naFaixa
  for (let i = larguras.length - 1; i >= 0 && usado() + mais > disponivel; i--)
    if (i !== ativa) naFaixa[i] = false
  return naFaixa
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import WMenu from './WMenu.vue'
import type { MenuItem } from 'primevue/menuitem'
import type { RouteTab, RouteTabsApi } from '@/types/routeTabs'

/**
 * Barra da navegação por abas (estilo browser/ERP) — o par do WTabViewport.
 * Não confundir com o WTabBar (abas de seção DENTRO de uma tela): esta barra
 * lista rotas abertas, fecha (X, botão do meio) e oferece o mesmo menu por
 * botão direito ou pelo `⋮` da aba: recarregar/fechar outras/fechar todas.
 * A aba ativa tem o fundo da página e emenda no painel de baixo. Toda aba tem
 * uma cor (fixa via `RouteTabMeta.color`, senão derivada do grupo ou da chave),
 * só em acentos — ícone e ponto do rótulo do grupo — para o texto seguir
 * neutro. A faixa não rola: as abas que não cabem na largura da barra vão para
 * o menu do botão "Mais (n)", e a ativa fica sempre à vista. Com
 * `scopeByGroup` no `useRouteTabs`, a barra desenha só as abas do grupo ativo,
 * sem o rótulo do grupo. Todo o estado vem do `useRouteTabs` via prop.
 */
const props = defineProps<{
  /** Instância retornada por `useRouteTabs` — o dono do estado. */
  tabs: RouteTabsApi
  ariaLabel?: string
}>()

/** Espelho informativo das ações — o default já chama a api. */
const emit = defineEmits<{
  activate: [tab: RouteTab]
  close: [tab: RouteTab]
  reload: [tab: RouteTab]
}>()

// `visibleTabs` é a lista inteira, ou — com `scopeByGroup` — só as abas do grupo ativo.
const items = computed(() => props.tabs.visibleTabs.value)
const activeKey = computed(() => props.tabs.activeKey.value)

const botoes = ref<HTMLElement[]>([])
const raiz = ref<HTMLElement | null>(null)
const trilho = ref<HTMLElement | null>(null)
const mais = ref<HTMLElement | null>(null)
const acoes = ref<HTMLElement | null>(null)

function registrar(el: unknown, indice: number): void {
  if (el instanceof HTMLElement) botoes.value[indice] = el
}

/** Chaves das abas que não couberam na faixa: estão no menu do "Mais". */
const ocultas = ref<ReadonlySet<string>>(new Set())
const menuMais = ref<InstanceType<typeof WMenu> | null>(null)
const maisAberto = ref(false)

// Quem manda é a largura da BARRA, não a da janela (ela pode estar ao lado de um menu aberto).
// A medida é síncrona, sem pintura no meio: `data-medindo` devolve tudo à faixa na largura
// natural (tabs.css), lê e tira — o que ficou de fora só aparece no próximo render.
function ajustar(): void {
  const barra = raiz.value
  const lista = trilho.value
  if (!barra || !lista) return
  const largura = (el: Element | null | undefined): number => el?.getBoundingClientRect().width ?? 0
  const px = (valor: string): number => parseFloat(valor) || 0
  const estilo = getComputedStyle(barra)
  const total = largura(barra) - px(estilo.paddingLeft) - px(estilo.paddingRight)
  if (total <= 0) return // barra escondida (display: none): sem medida, fica como está
  barra.toggleAttribute('data-medindo', true)
  const entre = px(getComputedStyle(lista).columnGap)
  let bloco = -1
  const blocos = items.value.map((tab, i) => {
    if (inicioDeGrupo(i)) bloco = i
    return tab.group ? bloco : -1
  })
  const larguras = items.value.map((_, i) => largura(botoes.value[i]) + entre)
  const rotulos = blocos.map((b, i) =>
    b === i ? largura(botoes.value[i]?.previousElementSibling) + entre : 0,
  )
  const reserva = largura(mais.value) + px(estilo.columnGap)
  const fixo = acoes.value ? largura(acoes.value) + px(estilo.columnGap) : 0
  barra.toggleAttribute('data-medindo', false)
  // + entre: a última peça não tem vão depois dela; + 1: arredondamento de subpixel do layout
  const naFaixa = abasNaFaixa(
    larguras,
    total - fixo + entre + 1,
    items.value.findIndex((tab) => tab.key === activeKey.value),
    reserva,
    rotulos,
    blocos,
  )
  ocultas.value = new Set(items.value.filter((_, i) => !naFaixa[i]).map((tab) => tab.key))
  if (!ocultas.value.size) menuMais.value?.hide()
}

// Recalcula com o DOM já atualizado: aba aberta ou fechada, título trocado pela tela, aba ativa.
watch([activeKey, items], ajustar, { deep: true, flush: 'post' })

let observador: ResizeObserver | undefined
onMounted(() => {
  ajustar()
  // A fonte do app que chega depois da primeira medida muda a largura dos títulos.
  void document.fonts?.ready.then(ajustar)
  if (!raiz.value || typeof ResizeObserver === 'undefined') return
  observador = new ResizeObserver(ajustar)
  observador.observe(raiz.value)
})
onBeforeUnmount(() => observador?.disconnect())

/** O rótulo sai da faixa junto com a última aba do grupo dele. */
function grupoOculto(indice: number): boolean {
  const grupo = items.value[indice].group
  for (let i = indice; items.value[i]?.group === grupo; i++)
    if (!ocultas.value.has(items.value[i].key)) return false
  return true
}

/** Menu do "Mais": as abas fora da faixa, na ordem, as de grupo sob o nome do grupo. */
const itensMais = computed<MenuItem[]>(() => {
  const menu: MenuItem[] = []
  for (const tab of items.value) {
    if (!ocultas.value.has(tab.key)) continue
    const item: MenuItem = { label: tab.title, icon: tab.icon, tab, command: () => ativar(tab) }
    const ultimo = menu[menu.length - 1]
    if (!tab.group || props.tabs.scopeByGroup) menu.push(item)
    else if (ultimo?.items && ultimo.label === tab.group) ultimo.items.push(item)
    else menu.push({ label: tab.group, items: [item] })
  }
  return menu
})

function ativar(tab: RouteTab): void {
  emit('activate', tab)
  void props.tabs.activate(tab.key)
}

function fechar(tab: RouteTab): void {
  if (!tab.closable) return
  emit('close', tab)
  void props.tabs.close(tab.key)
}

/** ←/→ andam entre as abas da faixa, circulando nas pontas (padrão ARIA de tablist). */
function navegar(indice: number, passo: number): void {
  const naFaixa = items.value.filter((tab) => !ocultas.value.has(tab.key))
  const posicao = naFaixa.indexOf(items.value[indice])
  const alvo = naFaixa[(posicao + passo + naFaixa.length) % naFaixa.length]
  if (!alvo) return
  ativar(alvo)
  botoes.value[items.value.indexOf(alvo)]?.focus()
}

// Menu de contexto: mesmo padrão do WCrudView (um ContextMenu, alvo corrente).
const menu = ref<InstanceType<typeof WMenu> | null>(null)
const alvoMenu = ref<RouteTab | null>(null)

const itensMenu = computed<MenuItem[]>(() => {
  const alvo = alvoMenu.value
  if (!alvo) return []
  return [
    {
      label: 'Recarregar',
      icon: 'pi pi-refresh',
      disabled: !alvo.hydrated,
      command: () => {
        emit('reload', alvo)
        props.tabs.reload(alvo.key)
      },
    },
    { separator: true },
    {
      label: 'Fechar',
      icon: 'pi pi-times',
      disabled: !alvo.closable,
      command: () => fechar(alvo),
    },
    {
      label: 'Fechar outras',
      icon: 'pi pi-times-circle',
      disabled: items.value.length <= 1,
      command: () => void props.tabs.closeOthers(alvo.key),
    },
    {
      label: 'Fechar todas',
      icon: 'pi pi-ban',
      command: () => void props.tabs.closeAll(),
    },
  ]
})

function abrirMenu(event: MouseEvent, tab: RouteTab): void {
  alvoMenu.value = tab
  menu.value?.show(event)
}

/**
 * Paleta das abas: 6 séries, cada uma lida de `--w-tab-group-N` (N = 1..6) com
 * fallback na série categórica da suíte (`--w-viz-N`, que por sua vez lê o
 * `--viz-N` do app e cai num OKLCH de croma contido — ver tokens.css). É o app
 * quem manda: pode redefinir as seis (ou igualar todas a `--primary`) sem tocar
 * na suite. Aba sem `color` explícita cai numa delas de forma estável (hash do
 * nome do grupo; sem grupo, da chave da aba), então a mesma cor volta a cada
 * sessão.
 */
const SERIES_DE_GRUPO = 6

function corDaSerie(n: number): string {
  return `var(--w-tab-group-${n}, var(--w-viz-${n}))`
}

function hashTexto(texto: string): number {
  let h = 0
  for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) >>> 0
  return h
}

/**
 * Cor da aba: a fixada na rota, senão a derivada do grupo. Sem grupo, deriva da
 * chave — não do título, que a tela troca com a aba aberta (`setTitle`).
 */
function corDaAba(tab: RouteTab): string {
  return tab.color || corDaSerie((hashTexto(tab.group || tab.key) % SERIES_DE_GRUPO) + 1)
}

function estiloDaAba(tab: RouteTab): Record<string, string> {
  return { '--w-tab-group-color': corDaAba(tab) }
}

/**
 * Rótulo do grupo antes do primeiro item de cada bloco (abas já vêm contíguas). Com
 * `scopeByGroup` a barra é de um grupo só e o app já diz qual: sem rótulo.
 */
function inicioDeGrupo(indice: number): boolean {
  const grupo = items.value[indice]?.group
  return !props.tabs.scopeByGroup && Boolean(grupo) && grupo !== items.value[indice - 1]?.group
}
</script>

<template>
  <div ref="raiz" class="w-tab-nav">
    <div
      ref="trilho"
      class="w-tab-nav__list"
      role="tablist"
      :aria-label="ariaLabel ?? 'Abas abertas'"
    >
      <!-- `hidden` e não `v-if`: a aba fora da faixa segue no DOM para ser medida de novo. -->
      <template v-for="(tab, indice) in items" :key="tab.key">
        <span
          v-if="inicioDeGrupo(indice)"
          class="w-tab-nav__group"
          :style="estiloDaAba(tab)"
          :hidden="grupoOculto(indice)"
          aria-hidden="true"
        >
          {{ tab.group }}
        </span>
        <div
          :ref="(el) => registrar(el, indice)"
          role="tab"
          :tabindex="tab.key === activeKey ? 0 : -1"
          class="w-tab-nav__item"
          :class="{ 'w-tab-nav__item--ativa': tab.key === activeKey }"
          :style="estiloDaAba(tab)"
          :hidden="ocultas.has(tab.key)"
          :aria-selected="tab.key === activeKey"
          @click="ativar(tab)"
          @auxclick.middle.prevent="fechar(tab)"
          @contextmenu.prevent="abrirMenu($event, tab)"
          @keydown.right.prevent="navegar(indice, 1)"
          @keydown.left.prevent="navegar(indice, -1)"
          @keydown.enter.prevent="ativar(tab)"
        >
          <slot name="tab" :tab="tab" :active="tab.key === activeKey">
            <i v-if="tab.icon" :class="tab.icon" aria-hidden="true" />
            <span class="w-tab-nav__title" :title="tab.title">{{ tab.title }}</span>
          </slot>
          <button
            type="button"
            class="w-tab-nav__menu"
            :aria-label="`Opções de ${tab.title}`"
            tabindex="-1"
            @click.stop="abrirMenu($event, tab)"
          >
            <i class="pi pi-ellipsis-v" aria-hidden="true" />
          </button>
          <button
            v-if="tab.closable"
            type="button"
            class="w-tab-nav__close"
            :aria-label="`Fechar ${tab.title}`"
            tabindex="-1"
            @click.stop="fechar(tab)"
          >
            <i class="pi pi-times" aria-hidden="true" />
          </button>
        </div>
      </template>
    </div>
    <button
      ref="mais"
      type="button"
      class="w-tab-nav__more"
      :hidden="!ocultas.size"
      aria-haspopup="menu"
      :aria-expanded="maisAberto"
      :aria-label="`Mais abas (${ocultas.size})`"
      @click="menuMais?.toggle($event)"
    >
      Mais
      <span class="w-tab-nav__more-count">{{ ocultas.size }}</span>
      <i class="pi pi-chevron-down" aria-hidden="true" />
    </button>
    <div v-if="$slots.actions" ref="acoes" class="w-tab-nav__actions">
      <slot name="actions" />
    </div>
    <WMenu ref="menu" mode="context" :items="itensMenu" />
    <WMenu ref="menuMais" :items="itensMais" @show="maisAberto = true" @hide="maisAberto = false">
      <template #item="{ item, props: pt }">
        <div class="w-tab-nav__more-item" :style="estiloDaAba(item.tab)">
          <a v-bind="pt.action">
            <i v-if="item.icon" :class="item.icon" aria-hidden="true" />
            <span v-bind="pt.label" :title="item.tab.title">{{ item.tab.title }}</span>
          </a>
          <button
            v-if="item.tab.closable"
            type="button"
            class="w-tab-nav__close"
            :aria-label="`Fechar ${item.tab.title}`"
            tabindex="-1"
            @click.stop="fechar(item.tab)"
          >
            <i class="pi pi-times" aria-hidden="true" />
          </button>
        </div>
      </template>
    </WMenu>
  </div>
</template>
