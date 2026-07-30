<script setup lang="ts">
import DatePicker from 'primevue/datepicker'

/**
 * Seletor de intervalo de datas (período). Wrapper fino do DatePicker em modo
 * range com padrões pt-BR. O `v-model` guarda `[início, fim]` como `Date[]`.
 */
withDefaults(
  defineProps<{
    modelValue?: Date[] | null
    placeholder?: string
    minDate?: Date
    maxDate?: Date
    showButtonBar?: boolean
    disabled?: boolean
  }>(),
  {
    modelValue: null,
    placeholder: 'Selecione o período',
    showButtonBar: true,
    disabled: false,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: Date[] | null] }>()

function onUpdate(v: unknown) {
  emit('update:modelValue', (v as Date[] | null) ?? null)
}
</script>

<template>
  <DatePicker
    :model-value="modelValue ?? undefined"
    selection-mode="range"
    :placeholder="placeholder"
    :min-date="minDate"
    :max-date="maxDate"
    :show-button-bar="showButtonBar"
    :disabled="disabled"
    date-format="dd/mm/yy"
    fluid
    @update:model-value="onUpdate"
  />
</template>
