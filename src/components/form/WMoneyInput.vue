<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

const props = withDefaults(
  defineProps<{
    /** Numeric model — the real value sent to the API (e.g. 1234.56). */
    modelValue: number | null
    /** Fixed decimal places (default: 2). */
    decimals?: number
    /** Show a "R$" prefix. Ignored when `prefix` is set. */
    currency?: boolean
    /** Custom leading addon (overrides `currency`). */
    prefix?: string
    /** Trailing addon. */
    suffix?: string
    /** Display locale for grouping/decimal separators (default: 'pt-BR'). */
    locale?: string
    disabled?: boolean
    placeholder?: string
    invalid?: boolean
  }>(),
  {
    decimals: 2,
    currency: false,
    locale: 'pt-BR',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const resolvedPrefix = computed(() =>
  props.prefix ?? (props.currency ? 'R$' : undefined),
)

const hasAddon = computed(() => !!resolvedPrefix.value || !!props.suffix)

const display = computed(() => {
  const v = props.modelValue
  if (v === null || v === undefined || Number.isNaN(v)) return ''
  return new Intl.NumberFormat(props.locale, {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  }).format(v)
})

function onInput(event: Event) {
  const digits = (event.target as HTMLInputElement).value.replace(/\D/g, '')
  if (!digits) {
    emit('update:modelValue', null)
    return
  }
  // Digits fill from the right: "1000" with decimals=2 -> 10.00
  const num = Number(digits) / Math.pow(10, props.decimals)
  emit('update:modelValue', num)
}
</script>

<template>
  <InputGroup v-if="hasAddon" class="w-money-input">
    <InputGroupAddon v-if="resolvedPrefix">{{ resolvedPrefix }}</InputGroupAddon>
    <InputText
      :model-value="display"
      inputmode="numeric"
      class="w-money-input__field"
      :placeholder="placeholder"
      :disabled="disabled"
      :invalid="invalid"
      @input="onInput"
    />
    <InputGroupAddon v-if="suffix">{{ suffix }}</InputGroupAddon>
  </InputGroup>
  <InputText
    v-else
    :model-value="display"
    inputmode="numeric"
    fluid
    class="w-money-input__field"
    :placeholder="placeholder"
    :disabled="disabled"
    :invalid="invalid"
    @input="onInput"
  />
</template>
