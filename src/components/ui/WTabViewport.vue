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
  hostRef(key).value = el instanceof HTMLElement ? el : null
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
    <div
      v-for="tab in liveTabs"
      v-show="tab.key === activeKey"
      :key="tab.key"
      :ref="(el) => setHost(tab.key, el as Element | null)"
      class="w-tab-viewport__pane"
    >
      <WTabPane
        :tab="tab"
        :api="tabs"
        :active="tab.key === activeKey"
        :host-el="hostRef(tab.key)"
      />
    </div>
  </div>
</template>
