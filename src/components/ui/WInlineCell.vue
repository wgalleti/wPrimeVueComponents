<script setup lang="ts">
import { ref } from 'vue'
import Popover from 'primevue/popover'

/**
 * Célula editável no lugar: o valor aparece como botão e, ao clicar, abre um popover com o
 * editor (`editor`, com `close` no escopo). Sem `editable` vira texto puro, sem foco nem cursor.
 *
 * O componente não grava nada: o editor decide, chama `close()` e o app faz a chamada à API.
 */
const props = withDefaults(
  defineProps<{
    /** Nome do que a célula edita; é o `aria-label` do botão (ex.: "Prioridade de #3"). */
    label: string
    editable?: boolean
  }>(),
  { editable: true },
)

const emit = defineEmits<{ open: []; close: [] }>()

const popover = ref<InstanceType<typeof Popover> | null>(null)

function toggle(event: Event) {
  if (props.editable) popover.value?.toggle(event)
}

function close() {
  popover.value?.hide()
}

defineExpose({ close })
</script>

<template>
  <span class="w-inline-cell" :class="{ 'w-inline-cell--editable': editable }">
    <button
      v-if="editable"
      type="button"
      class="w-inline-cell__trigger"
      :aria-label="label"
      aria-haspopup="dialog"
      @click="toggle"
    >
      <slot />
    </button>
    <span v-else class="w-inline-cell__static"><slot /></span>

    <Popover v-if="editable" ref="popover" @show="emit('open')" @hide="emit('close')">
      <div class="w-inline-cell__editor">
        <slot name="editor" :close="close" />
      </div>
    </Popover>
  </span>
</template>
