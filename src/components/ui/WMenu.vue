<script setup lang="ts">
import { ref } from 'vue'
import Menu from 'primevue/menu'
import ContextMenu from 'primevue/contextmenu'
import type { MenuItem } from 'primevue/menuitem'
import type { MenuMode } from '@/types/button'
import { useTabOverlay } from '@/utils/tabOverlay'

/**
 * Menu de ações sobre `Menu` (popup) ou `ContextMenu` do PrimeVue, ancorado na navegação por
 * abas como o `WDialog`: dentro de uma aba pendura no pane dela, fora cai no `body`. Abre por
 * ref: `toggle(event)` (popup, no botão) ou `show(event)` (context, no ponteiro); `hide()`.
 * Props/eventos/slots do PrimeVue passam direto; `append-to` explícito vence o default.
 */
defineOptions({ name: 'WMenu', inheritAttrs: false })

withDefaults(
  defineProps<{
    items: MenuItem[]
    mode?: MenuMode
  }>(),
  { mode: 'popup' },
)

const { appendTo, sync } = useTabOverlay()
const inner = ref<{
  toggle: (e: Event, target?: unknown) => void
  show: (e: Event, target?: unknown) => void
  hide: () => void
} | null>(null)

function toggle(event: Event): void {
  sync()
  inner.value?.toggle(event)
}
function show(event: Event): void {
  sync()
  inner.value?.show(event)
}
function hide(): void {
  inner.value?.hide()
}

defineExpose({ toggle, show, hide })
</script>

<template>
  <component
    :is="mode === 'context' ? ContextMenu : Menu"
    ref="inner"
    :model="items"
    :popup="mode === 'popup' ? true : undefined"
    :append-to="appendTo"
    class="w-tab-overlay"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </component>
</template>
