<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { W_SECTION_ACCORDION_KEY } from '@/utils/sectionAccordion'

/**
 * As seções de um editor master-detail como painéis de um acordeão único: uma
 * moldura só, sem blocos "flutuando". Diferente do WStepFlow, aqui não há ordem
 * nem etapa ativa — cada seção abre e fecha por conta própria e várias ficam
 * abertas ao mesmo tempo (o padrão é TODAS abertas; o usuário recolhe o que não
 * interessa no momento).
 *
 * O `v-model` é a lista de `value` das seções abertas. Sem `v-model` o
 * componente é dono do próprio estado, começando com tudo aberto.
 */
const props = withDefaults(
  defineProps<{
    /** `value` das seções abertas (`v-model`). Omitido = estado interno, tudo aberto. */
    modelValue?: string[]
    /** Trava o clique no cabeçalho de todas as seções. */
    disabled?: boolean
  }>(),
  { modelValue: undefined, disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [open: string[]] }>()

/** Sem `v-model`, guardamos só o que o usuário FECHOU — assim toda seção nova já nasce aberta. */
const fechadas = ref(new Set<string>())

const controlado = computed(() => props.modelValue !== undefined)
const disabled = computed(() => props.disabled)

function isOpen(value: string) {
  return controlado.value ? (props.modelValue as string[]).includes(value) : !fechadas.value.has(value)
}

function toggle(value: string) {
  if (props.disabled) return
  if (controlado.value) {
    const atual = props.modelValue as string[]
    emit(
      'update:modelValue',
      atual.includes(value) ? atual.filter((v) => v !== value) : [...atual, value],
    )
    return
  }
  const proximo = new Set(fechadas.value)
  if (proximo.has(value)) proximo.delete(value)
  else proximo.add(value)
  fechadas.value = proximo
}

provide(W_SECTION_ACCORDION_KEY, { isOpen, toggle, disabled })
</script>

<template>
  <div class="w-section-accordion">
    <slot />
  </div>
</template>
