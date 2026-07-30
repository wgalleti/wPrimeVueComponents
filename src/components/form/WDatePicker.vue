<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Popover from 'primevue/popover'
import Button from 'primevue/button'
import { vMaska } from 'maska/vue'
import { useDateInput, type DateValueFormat } from '@/composables/useDateInput'

/**
 * Campo de data pt-BR padronizado.
 * - Exibe `DD/MM/YYYY` (ou `DD/MM/YYYY HH:mm` com `showTime`) e salva `YYYY-MM-DD`.
 * - Digitação direta com máscara: `30051988` vira `30/05/1988`.
 * - Ícone de calendário abre o seletor (Hoje / Limpar).
 * - `F2` preenche a data de hoje.
 * - `autonow`: no mount, se o valor for `null`, preenche hoje; senão mantém.
 */
const props = withDefaults(
  defineProps<{
    modelValue?: string | Date | null
    /** Formato do valor emitido: `'iso'` (YYYY-MM-DD, default) ou `'date'` (Date). */
    valueFormat?: DateValueFormat
    showTime?: boolean
    /** No mount: se o valor for `null`, preenche a data de hoje. */
    autonow?: boolean
    minDate?: string | Date
    maxDate?: string | Date
    disabled?: boolean
    showClear?: boolean
    placeholder?: string
    invalid?: boolean
    inputId?: string
  }>(),
  {
    modelValue: null,
    valueFormat: 'iso',
    showTime: false,
    autonow: false,
    disabled: false,
    showClear: true,
    invalid: false,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string | Date | null] }>()

const di = useDateInput({
  showTime: () => props.showTime,
  valueFormat: () => props.valueFormat,
})

const typed = ref('') // texto no input (DD/MM/YYYY[ HH:mm])
const panelDate = ref<Date | null>(null) // valor do calendário
const op = ref<InstanceType<typeof Popover> | null>(null)

const maskaOptions = computed(() => ({ mask: di.mask() }))
const minDateObj = computed(() => di.toDate(props.minDate) ?? undefined)
const maxDateObj = computed(() => di.toDate(props.maxDate) ?? undefined)

// Única sincronização externo → interno (o resto é orientado a eventos, sem watchers).
watch(
  () => props.modelValue,
  (v) => {
    const d = di.toDate(v)
    panelDate.value = d
    typed.value = di.toDisplay(d)
  },
  { immediate: true },
)

function commit(date: Date | null) {
  emit('update:modelValue', di.toValue(date))
}

function onTypedInput() {
  if (typed.value === '') {
    commit(null)
    return
  }
  // Só comita quando o texto formar uma data completa e válida.
  const d = di.fromDisplay(typed.value)
  if (d) commit(d)
}

function onBlur() {
  // Ao sair, normaliza o texto para o último valor válido (descarta digitação incompleta).
  typed.value = di.toDisplay(di.toDate(props.modelValue))
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'F2' && !props.disabled) {
    e.preventDefault()
    setToday()
  }
}

function onPick(value: unknown) {
  const d = (value as Date | null) ?? null
  commit(d)
  if (!props.showTime) op.value?.hide()
}

function setToday() {
  commit(di.today())
}

function clearValue() {
  commit(null)
  op.value?.hide()
}

function toggle(e: Event) {
  if (props.disabled) return
  op.value?.toggle(e)
}

onMounted(() => {
  if (props.autonow && props.modelValue == null) setToday()
})
</script>

<template>
  <div class="w-datepicker">
    <IconField>
      <InputText
        :id="inputId"
        v-model="typed"
        v-maska="maskaOptions"
        :placeholder="placeholder ?? di.placeholder()"
        :disabled="disabled"
        :invalid="invalid"
        fluid
        autocomplete="off"
        inputmode="numeric"
        @input="onTypedInput"
        @blur="onBlur"
        @keydown="onKeydown"
      />
      <InputIcon
        class="pi pi-calendar w-datepicker-icon"
        :class="{ 'w-datepicker-icon-disabled': disabled }"
        role="button"
        tabindex="-1"
        aria-label="Abrir calendário"
        @click="toggle"
      />
    </IconField>

    <Popover ref="op">
      <div class="w-datepicker-panel">
        <DatePicker
          :model-value="panelDate ?? undefined"
          inline
          :show-time="showTime"
          hour-format="24"
          :min-date="minDateObj"
          :max-date="maxDateObj"
          @update:model-value="onPick"
        />
        <div class="w-datepicker-actions">
          <Button label="Hoje" text size="small" @click="setToday" />
          <Button
            v-if="showClear"
            label="Limpar"
            text
            size="small"
            severity="secondary"
            @click="clearValue"
          />
        </div>
      </div>
    </Popover>
  </div>
</template>
