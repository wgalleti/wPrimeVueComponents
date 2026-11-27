<script setup lang="ts">
import { nextTick, watch } from 'vue'
import Dialog from 'primevue/dialog'
import { useUrlParam } from '@/composables/useUrlParam'
import { useTabHost } from '@/types/routeTabs'

/**
 * `Dialog` do PrimeVue com a âncora resolvida pela navegação por abas: dentro
 * de uma aba, pendura no pane dela — some e volta com a aba (v-show, sem
 * fechar) e morre junto quando a aba fecha ou a tela troca. Fora de abas, o
 * `body` de sempre. Passthrough total: props/eventos do Dialog via attrs
 * (incluindo `v-model:visible`) e todos os slots repassados; um `append-to`
 * explícito do consumidor vence o default. Sem `breakpoints` do consumidor, vale o padrão da
 * régua da suíte (tablet em pé 95vw, celular 100vw), para o dialog de largura fixa não estourar
 * a tela; com `breakpoints` (ou `breakpoints` vazio `{}`), vale o dele.
 *
 * Com `urlKey`, `visible` espelha `?<urlKey>=1` (`router.replace`, sem empilhar histórico): abrir
 * grava, fechar remove, e a URL com a chave (F5, link) pede a abertura. A URL nunca abre nem
 * fecha por baixo do consumidor: ela só pede, pelo mesmo `update:visible` do clique, e quem
 * recusa o fechamento vê a chave voltar. `urlKey` é lida na montagem. Sem `urlKey`, nada muda.
 */
defineOptions({ name: 'WDialog', inheritAttrs: false })

const props = defineProps<{
  /** Liga `visible` à query `?<urlKey>=1`. Exige `vue-router`; sem ele avisa em dev. */
  urlKey?: string
  visible?: boolean
}>()
const emit = defineEmits<{ 'update:visible': [value: boolean] }>()

const tabHost = useTabHost()

// Só `1` vale; qualquer outro valor é tratado como ausente e limpo.
const param = props.urlKey ? useUrlParam(props.urlKey, { accept: (v) => v === '1' }) : null
if (param) {
  if (param.value === '1' && !props.visible) emit('update:visible', true)
  else if (props.visible) param.value = '1'

  watch(
    () => props.visible,
    (aberto) => {
      param.value = aberto ? '1' : null
    },
  )
  watch(param, async (valor) => {
    if (valor === '1' && !props.visible) emit('update:visible', true)
    else if (valor === null && props.visible) {
      emit('update:visible', false)
      await nextTick()
      // Consumidor recusou (ex.: descarte cancelado): a URL volta a refletir o diálogo.
      if (props.visible) param.value = '1'
    }
  })
}

const BREAKPOINTS_PADRAO = { '839px': '95vw', '599px': '100vw' }
</script>

<template>
  <Dialog
    :append-to="tabHost?.hostEl.value ?? 'body'"
    :breakpoints="BREAKPOINTS_PADRAO"
    v-bind="$attrs"
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </Dialog>
</template>
