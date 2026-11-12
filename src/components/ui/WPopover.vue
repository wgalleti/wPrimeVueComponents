<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Popover from 'primevue/popover'
import { useTabOverlay } from '@/utils/tabOverlay'

/**
 * `Popover` do PrimeVue com a âncora resolvida pela navegação por abas (o mesmo motivo do
 * `WDialog`): dentro de uma aba pendura no pane dela, fora cai no `body`. Passthrough total
 * de props, eventos e slots; um `append-to` explícito vence o default. Abre por ref:
 * `toggle(event)`, `show(event, target?)`, `hide()`.
 */
defineOptions({ name: 'WPopover', inheritAttrs: false })

const { appendTo, sync, fit } = useTabOverlay()
const inner = ref<InstanceType<typeof Popover> | null>(null)

// O PrimeVue realinha na abertura e a cada resize do conteúdo (ResizeObserver interno); o ajuste
// de flip roda depois de cada alinhamento dele.
type PopoverInternals = {
  alignOverlay: () => void
  container: HTMLElement | null
  target: HTMLElement | null
}
onMounted(() => {
  const p = inner.value as unknown as PopoverInternals | null
  if (!p) return
  const align = p.alignOverlay
  p.alignOverlay = () => {
    align()
    if (p.container && p.target) fit(p.container, p.target)
  }
})

function toggle(event: Event, target?: unknown): void {
  sync()
  inner.value?.toggle(event, target)
}
function show(event: Event, target?: unknown): void {
  sync()
  inner.value?.show(event, target)
}
function hide(): void {
  inner.value?.hide()
}

defineExpose({ toggle, show, hide })
</script>

<template>
  <Popover ref="inner" :append-to="appendTo" class="w-tab-overlay" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </Popover>
</template>
