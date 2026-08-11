<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { W_STEP_FLOW_KEY, type StepFlowOrientation } from '@/utils/stepFlow'

/**
 * Etapas numeradas e colapsáveis (a espinha do editor de documento).
 * Diferente do WProgressFlow, que só ILUSTRA o progresso: aqui cada etapa é um
 * bloco de conteúdo que abre e fecha, e o `v-model` diz qual está aberta.
 *
 * `0` = todas fechadas. É estado do consumidor de propósito: "continuar para a
 * próxima etapa" é uma decisão da tela, não do componente.
 */
const props = withDefaults(
  defineProps<{
    /** Número da etapa aberta (`v-model`). `0` fecha todas. */
    modelValue?: number
    /**
     * `vertical` empilha as etapas numa coluna (cada uma é um card).
     * `horizontal` põe os cabeçalhos lado a lado numa régua e abre só o corpo da
     * etapa ativa embaixo, na largura inteira — abaixo de 768px cai sozinho
     * para o empilhamento vertical (a régua não cabe).
     */
    orientation?: StepFlowOrientation
    /** Trava o clique no cabeçalho de todas as etapas. */
    disabled?: boolean
  }>(),
  {
    modelValue: 0,
    orientation: 'vertical',
    disabled: false,
  },
)

const emit = defineEmits<{ 'update:modelValue': [step: number] }>()

const active = computed(() => props.modelValue)
const disabled = computed(() => props.disabled)
const orientation = computed(() => props.orientation)

function toggle(step: number) {
  if (props.disabled) return
  emit('update:modelValue', props.modelValue === step ? 0 : step)
}

provide(W_STEP_FLOW_KEY, { active, toggle, disabled, orientation })

const root = ref<HTMLElement | null>(null)

/**
 * Setas / Home / End andam pela régua horizontal. Sem roving tabindex: os
 * cabeçalhos são botões e continuam todos no Tab — a seta é atalho, não a única
 * forma de chegar lá. Na vertical o Tab já resolve, então nem entra.
 */
function onKeydown(event: KeyboardEvent) {
  if (props.orientation !== 'horizontal') return
  const passo = { ArrowRight: 1, ArrowLeft: -1, Home: 0, End: 0 }[event.key]
  if (passo === undefined) return

  const triggers = Array.from(
    root.value?.querySelectorAll<HTMLButtonElement>(
      '.w-step-section__head .w-step-section__trigger:not(:disabled)',
    ) ?? [],
  )
  const atual = triggers.indexOf(document.activeElement as HTMLButtonElement)
  if (atual < 0 || triggers.length === 0) return

  const alvo =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? triggers.length - 1
        : (atual + passo + triggers.length) % triggers.length

  event.preventDefault()
  triggers[alvo].focus()
}
</script>

<template>
  <div ref="root" class="w-step-flow" :class="`w-step-flow--${orientation}`" @keydown="onKeydown">
    <slot />
  </div>
</template>
