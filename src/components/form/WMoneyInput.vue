<script setup lang="ts">
import { computed, nextTick } from 'vue'
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
    /** Piso do valor (inclusive): ao sair do campo, abaixo dele vira ele. */
    min?: number
    /** Teto do valor (inclusive): ao sair do campo, acima dele vira ele (ex.: 100 no modo %). */
    max?: number
    disabled?: boolean
    placeholder?: string
    invalid?: boolean
    /** `id` do `<input>` — alvo do `<label for>` do formulário. */
    inputId?: string
    /** Atributos extras no `<input>` (`aria-labelledby`, `aria-describedby`,
     *  `aria-required`…). Sempre no input, mesmo quando há prefixo/sufixo. */
    inputAttrs?: Record<string, unknown>
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

const resolvedPrefix = computed(() => props.prefix ?? (props.currency ? 'R$' : undefined))

const hasAddon = computed(() => !!resolvedPrefix.value || !!props.suffix)

const display = computed(() => {
  const v = props.modelValue
  if (v === null || v === undefined || Number.isNaN(v)) return ''
  return new Intl.NumberFormat(props.locale, {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  }).format(v)
})

async function onInput(event: Event) {
  const el = event.target as HTMLInputElement
  const digits = el.value.replace(/\D/g, '')
  // Digits fill from the right: "1000" with decimals=2 -> 10.00
  emit('update:modelValue', digits ? Number(digits) / Math.pow(10, props.decimals) : null)
  // Se o pai rejeita ou trava o valor, o modelo não muda e o input ficaria com o texto cru digitado.
  await nextTick()
  if (el.value !== display.value) el.value = display.value
}

// Clamp no blur, não a cada dígito: digitar "150" a caminho de "15,00" passaria pelo teto.
function onBlur() {
  const v = props.modelValue
  if (v == null || Number.isNaN(v)) return
  let next = v
  if (props.max != null && next > props.max) next = props.max
  if (props.min != null && next < props.min) next = props.min
  if (next !== v) emit('update:modelValue', next)
}
</script>

<template>
  <InputGroup v-if="hasAddon" class="w-money-input">
    <InputGroupAddon v-if="resolvedPrefix">{{ resolvedPrefix }}</InputGroupAddon>
    <InputText
      :id="inputId"
      v-bind="inputAttrs"
      :model-value="display"
      inputmode="numeric"
      class="w-money-input__field"
      :placeholder="placeholder"
      :disabled="disabled"
      :invalid="invalid"
      @input="onInput"
      @blur="onBlur"
    />
    <InputGroupAddon v-if="suffix">{{ suffix }}</InputGroupAddon>
  </InputGroup>
  <InputText
    v-else
    :id="inputId"
    v-bind="inputAttrs"
    :model-value="display"
    inputmode="numeric"
    fluid
    class="w-money-input__field"
    :placeholder="placeholder"
    :disabled="disabled"
    :invalid="invalid"
    @input="onInput"
    @blur="onBlur"
  />
</template>
