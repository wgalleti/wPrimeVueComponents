<script setup lang="ts">
import { computed } from 'vue'
import SelectButton from 'primevue/selectbutton'

export interface SegmentedOption {
  label: string
  value: unknown
  icon?: string
}

/**
 * Grupo de opções lado a lado (substitui `SelectButton` e `ToggleButton`). `multiple` aceita
 * várias; com uma opção só vira alternador (`aria-pressed`): o modelo é boolean, ou o valor da
 * opção / `null`. Sem alternativa vazia no modo simples: sempre há uma opção marcada.
 */
const props = withDefaults(
  defineProps<{
    options: SegmentedOption[]
    multiple?: boolean
    size?: 'sm' | 'md'
    /** Nome acessível do grupo (ou do alternador, se o rótulo da opção não bastar). */
    ariaLabel?: string
    disabled?: boolean
  }>(),
  { multiple: false, size: 'md', disabled: false },
)

const model = defineModel<unknown>()

/** Alternador: uma opção e sem `multiple`. */
const toggle = computed(() => props.options.length === 1 && !props.multiple)
const option = computed(() => props.options[0])
const pressed = computed(() =>
  typeof model.value === 'boolean' ? model.value : model.value === option.value?.value,
)

function flip() {
  const next = !pressed.value
  const boolean = typeof model.value === 'boolean' || typeof option.value?.value === 'boolean'
  model.value = boolean ? next : next ? option.value?.value : null
}
</script>

<template>
  <button
    v-if="toggle && option"
    type="button"
    class="w-segmented w-segmented--toggle"
    :class="[`w-segmented--${size}`, { 'w-segmented--on': pressed }]"
    :aria-pressed="pressed"
    :aria-label="ariaLabel"
    :disabled="disabled"
    @click="flip"
  >
    <i v-if="option.icon" :class="option.icon" aria-hidden="true" />
    {{ option.label }}
  </button>
  <SelectButton
    v-else
    v-model="model"
    :options="options"
    option-label="label"
    option-value="value"
    :multiple="multiple"
    :allow-empty="multiple"
    :size="size === 'sm' ? 'small' : undefined"
    :aria-label="ariaLabel"
    :disabled="disabled"
    :class="['w-segmented', `w-segmented--${size}`]"
  >
    <template #option="{ option: o }">
      <i v-if="o.icon" :class="o.icon" aria-hidden="true" />
      <span>{{ o.label }}</span>
    </template>
  </SelectButton>
</template>
