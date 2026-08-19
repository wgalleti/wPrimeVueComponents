<script setup lang="ts">
import { computed, shallowRef, watch, type ShallowRef } from 'vue'
import type { RouteTab, RouteTabsApi } from '@/types/routeTabs'
import WTabPane from './WTabPane'

/**
 * Painéis da navegação por abas: mantém TODA aba hidratada montada num
 * wrapper `v-show` (não `<KeepAlive>` — o DOM nunca sai da árvore, então um
 * dialog com `appendTo` no pane sobrevive intacto à troca de aba, e fechar
 * aba é só desmontar o pane). Substitui o `<RouterView>` do layout: o
 * componente da rota vem já resolvido do `useRouteTabs`.
 */
const props = defineProps<{
  /** Instância retornada por `useRouteTabs` — o dono do estado. */
  tabs: RouteTabsApi
}>()

const activeKey = computed(() => props.tabs.activeKey.value)
const liveTabs = computed(() => props.tabs.tabs.value.filter((t) => t.hydrated))

// Um ref de elemento por aba, entregue ao pane como alvo de appendTo.
const hosts = new Map<string, ShallowRef<HTMLElement | null>>()

function hostRef(key: string): ShallowRef<HTMLElement | null> {
  let host = hosts.get(key)
  if (!host) {
    host = shallowRef<HTMLElement | null>(null)
    hosts.set(key, host)
  }
  return host
}

function setHost(key: string, el: Element | null): void {
  const host = hostRef(key)
  if (el instanceof HTMLElement) {
    host.value = el
    return
  }
  // `null` vem do unmount do pane. Na troca de tela dentro da aba o pane é
  // SUBSTITUÍDO (chave nova, mesma key de aba) e a ordem mount/unmount não é
  // garantida — só limpa se o elemento atual realmente saiu do documento.
  if (host.value && !host.value.isConnected) host.value = null
}

watch(liveTabs, (tabs: RouteTab[]) => {
  const alive = new Set(tabs.map((t) => t.key))
  for (const key of hosts.keys()) {
    if (!alive.has(key)) hosts.delete(key)
  }
})
</script>

<template>
  <div class="w-tab-viewport">
    <!-- `remount` na chave: trocar de tela dentro da aba (modo 'module') e
         `reload()` substituem o pane INTEIRO — a tela que sai morre com o
         runtime dela, sem patch de componente dentro de um pane vivo (que
         quebra com dialogs/menus teleportados na âncora). -->
    <div
      v-for="tab in liveTabs"
      v-show="tab.key === activeKey"
      :key="`${tab.key}#${tab.remount}`"
      :ref="(el) => setHost(tab.key, el as Element | null)"
      class="w-tab-viewport__pane"
    >
      <!-- Wrapper de scroll: o pane fica parado (âncora dos overlays com
           appendTo local); só o conteúdo da tela rola. -->
      <div class="w-tab-viewport__scroll">
        <WTabPane
          :tab="tab"
          :api="tabs"
          :active="tab.key === activeKey"
          :host-el="hostRef(tab.key)"
        />
      </div>
    </div>
  </div>
</template>
