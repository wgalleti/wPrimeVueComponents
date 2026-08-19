<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { useTabHost } from '@/types/routeTabs'

/**
 * `Dialog` do PrimeVue com a âncora resolvida pela navegação por abas: dentro
 * de uma aba, pendura no pane dela — some e volta com a aba (v-show, sem
 * fechar) e morre junto quando a aba fecha ou a tela troca. Fora de abas, o
 * `body` de sempre. Passthrough total: props/eventos do Dialog via attrs
 * (incluindo `v-model:visible`) e todos os slots repassados; um `append-to`
 * explícito do consumidor vence o default.
 */
defineOptions({ name: 'WDialog', inheritAttrs: false })

const tabHost = useTabHost()
</script>

<template>
  <Dialog :append-to="tabHost?.hostEl.value ?? 'body'" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </Dialog>
</template>
