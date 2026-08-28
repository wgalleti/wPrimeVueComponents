<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import ContextMenu from 'primevue/contextmenu'
import type { MenuItem } from 'primevue/menuitem'
import type { RouteTab, RouteTabsApi } from '@/types/routeTabs'

/**
 * Barra da navegação por abas (estilo browser/ERP) — o par do WTabViewport.
 * Não confundir com o WTabBar (abas de seção DENTRO de uma tela): esta barra
 * lista rotas abertas, fecha (X, botão do meio) e oferece o mesmo menu por
 * botão direito ou pelo `⋮` da aba: recarregar/fechar outras/fechar todas.
 * Abas com `group` ganham uma cor por grupo (fixa via `RouteTabMeta.color` ou
 * derivada do nome), só em acentos — ícone, fio da ativa, ponto do rótulo —
 * para o texto seguir neutro. Overflow rola na horizontal e a aba ativa se
 * mantém à vista. Todo o estado vem do `useRouteTabs` via prop.
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

const items = computed(() => props.tabs.tabs.value)
const activeKey = computed(() => props.tabs.activeKey.value)

const botoes = ref<HTMLElement[]>([])
const trilho = ref<HTMLElement | null>(null)

function registrar(el: unknown, indice: number): void {
  if (el instanceof HTMLElement) botoes.value[indice] = el
}

// A aba ativa sempre à vista — inclusive quando ativada por navegação
// externa (sidebar, palette), não só por clique na barra.
watch(activeKey, async () => {
  await nextTick()
  const indice = items.value.findIndex((t) => t.key === activeKey.value)
  botoes.value[indice]?.scrollIntoView?.({ inline: 'nearest', block: 'nearest' })
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

/** ←/→ andam entre as abas, circulando nas pontas (padrão ARIA de tablist). */
function navegar(indice: number, passo: number): void {
  const total = items.value.length
  if (!total) return
  const alvo = (indice + passo + total) % total
  ativar(items.value[alvo])
  botoes.value[alvo]?.focus()
}

// Menu de contexto: mesmo padrão do WCrudView (um ContextMenu, alvo corrente).
const menu = ref<InstanceType<typeof ContextMenu> | null>(null)
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
 * Paleta de grupos: matizes espaçadas em OKLCH com croma contido — cor de
 * acento, não de texto. Um grupo sem `color` explícita cai numa delas de forma
 * estável (hash do nome), então a mesma cor volta a cada sessão.
 */
const PALETA_GRUPOS = [
  'oklch(62% 0.14 250)', // azul
  'oklch(64% 0.13 150)', // verde
  'oklch(66% 0.14 45)', // laranja
  'oklch(60% 0.15 300)', // violeta
  'oklch(64% 0.12 195)', // ciano
  'oklch(62% 0.14 350)', // rosa
  'oklch(68% 0.12 95)', // âmbar
  'oklch(60% 0.12 20)', // terracota
]

function hashTexto(texto: string): number {
  let h = 0
  for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) >>> 0
  return h
}

/** Cor do grupo da aba: a fixada na rota, senão a derivada do nome do grupo. */
function corDoGrupo(tab: RouteTab): string | undefined {
  if (tab.color) return tab.color
  if (!tab.group) return undefined
  return PALETA_GRUPOS[hashTexto(tab.group) % PALETA_GRUPOS.length]
}

function estiloGrupo(tab: RouteTab): Record<string, string> | undefined {
  const cor = corDoGrupo(tab)
  return cor ? { '--w-tab-group-color': cor } : undefined
}

/** Rótulo do grupo antes do primeiro item de cada bloco (abas já vêm contíguas). */
function inicioDeGrupo(indice: number): boolean {
  const grupo = items.value[indice]?.group
  return Boolean(grupo) && grupo !== items.value[indice - 1]?.group
}
</script>

<template>
  <div class="w-tab-nav">
    <div
      ref="trilho"
      class="w-tab-nav__list"
      role="tablist"
      :aria-label="ariaLabel ?? 'Abas abertas'"
    >
      <template v-for="(tab, indice) in items" :key="tab.key">
        <span
          v-if="inicioDeGrupo(indice)"
          class="w-tab-nav__group"
          :style="estiloGrupo(tab)"
          aria-hidden="true"
        >
          {{ tab.group }}
        </span>
        <div
          :ref="(el) => registrar(el, indice)"
          role="tab"
          :tabindex="tab.key === activeKey ? 0 : -1"
          class="w-tab-nav__item"
          :class="{
            'w-tab-nav__item--ativa': tab.key === activeKey,
            'w-tab-nav__item--grupo': Boolean(corDoGrupo(tab)),
          }"
          :style="estiloGrupo(tab)"
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
    <div v-if="$slots.actions" class="w-tab-nav__actions">
      <slot name="actions" />
    </div>
    <ContextMenu ref="menu" :model="itensMenu" />
  </div>
</template>
