<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import Popover from 'primevue/popover'

/**
 * Célula editável no lugar: o valor aparece como botão e, ao clicar, abre um popover com o
 * editor (`editor`, com `close` no escopo). Sem `editable` vira texto puro, sem foco nem cursor.
 *
 * O componente não grava nada: o editor decide, chama `close()` e o app faz a chamada à API.
 * Ao abrir, o foco vai para o primeiro controle do editor; ao fechar, volta para o botão.
 */
const props = withDefaults(
  defineProps<{
    /** Nome do que a célula edita; é o `aria-label` do botão (ex.: "Prioridade de #3"). */
    label: string
    /** Valor atual em texto (ex.: "Alta"); entra no nome acessível do botão: "Prioridade de #3: Alta". */
    valueText?: string
    editable?: boolean
  }>(),
  { editable: true, valueText: '' },
)

const emit = defineEmits<{ open: []; close: [] }>()

const popover = ref<InstanceType<typeof Popover> | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const expanded = ref(false)

const accessibleName = computed(() =>
  props.valueText ? `${props.label}: ${props.valueText}` : props.label,
)

function toggle(event: Event) {
  if (props.editable) popover.value?.toggle(event)
}

function close() {
  popover.value?.hide()
}

const FOCUSABLE = 'input, button, [href], select, textarea, [tabindex]:not([tabindex="-1"])'

async function onShow() {
  expanded.value = true
  emit('open')
  await nextTick()
  const content = document.querySelector<HTMLElement>('.p-popover .w-inline-cell__editor')
  const first = content?.querySelector<HTMLElement>(`${FOCUSABLE}:not([disabled])`)
  first?.focus()
}

function onHide() {
  expanded.value = false
  emit('close')
  trigger.value?.focus()
}

defineExpose({ close })
</script>

<template>
  <span class="w-inline-cell" :class="{ 'w-inline-cell--editable': editable }">
    <button
      v-if="editable"
      ref="trigger"
      type="button"
      class="w-inline-cell__trigger"
      :aria-label="accessibleName"
      aria-haspopup="dialog"
      :aria-expanded="expanded"
      @click="toggle"
    >
      <slot />
    </button>
    <span v-else class="w-inline-cell__static"><slot /></span>

    <Popover v-if="editable" ref="popover" @show="onShow" @hide="onHide">
      <div class="w-inline-cell__editor">
        <slot name="editor" :close="close" />
      </div>
    </Popover>
  </span>
</template>
