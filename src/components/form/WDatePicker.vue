<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import dayjs from 'dayjs'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import WPopover from '@/components/ui/WPopover.vue'
import WButton from '@/components/ui/WButton.vue'
import { vMaska } from 'maska/vue'
import { useDateInput, type DateValueFormat } from '@/composables/useDateInput'

/**
 * Campo de data pt-BR padronizado.
 * - Exibe `DD/MM/YYYY` (ou `DD/MM/YYYY HH:mm` com `showTime`) e salva `YYYY-MM-DD`.
 * - Digitação direta com máscara: `30051988` vira `30/05/1988`. Ao sair do campo, ano com 2
 *   dígitos completa (`19/11/26` → 2026); texto que não forma data (ou fora de min/max) limpa o
 *   valor e fica marcado inválido, em vez de voltar em silêncio ao valor anterior.
 * - Ícone de calendário abre o seletor (Hoje / Limpar). Com `showTime` o seletor não fecha ao
 *   escolher (falta a hora): os atalhos viram "Agora" / "Limpar" à esquerda e um **OK** à
 *   direita confirma e fecha, devolvendo o foco ao campo. `Esc` fecha sem mudar nada.
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
    /** Atributos extras no `<input>` (`aria-labelledby`, `aria-describedby`,
     *  `aria-required`…). */
    inputAttrs?: Record<string, unknown>
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
const typedInvalid = ref(false) // saiu do campo com texto que não forma data válida
let lastValue = '' // último valor emitido ou recebido, em texto de exibição
const panelDate = ref<Date | null>(null) // valor do calendário
const op = ref<InstanceType<typeof WPopover> | null>(null)
const inputRef = ref<InstanceType<typeof InputText> | null>(null)

const maskaOptions = computed(() => ({ mask: di.mask() }))
const minDateObj = computed(() => di.toDate(props.minDate) ?? undefined)
const maxDateObj = computed(() => di.toDate(props.maxDate) ?? undefined)

// Única sincronização externo → interno (o resto é orientado a eventos, sem watchers).
watch(
  () => props.modelValue,
  (v) => {
    const d = di.toDate(v)
    panelDate.value = d
    lastValue = di.toDisplay(d)
    // O `null` que o próprio blur emitiu não apaga o texto inválido: a pessoa precisa vê-lo.
    if (d || !typedInvalid.value) {
      typed.value = di.toDisplay(d)
      typedInvalid.value = false
    }
  },
  { immediate: true },
)

function inRange(date: Date) {
  const unit = props.showTime ? 'minute' : 'day'
  const d = dayjs(date)
  return (
    !(minDateObj.value && d.isBefore(minDateObj.value, unit)) &&
    !(maxDateObj.value && d.isAfter(maxDateObj.value, unit))
  )
}

function commit(date: Date | null) {
  // A máscara dispara `input` duas vezes por tecla, antes de a prop voltar: não reemite o mesmo valor.
  const display = di.toDisplay(date)
  if (display === lastValue) return
  lastValue = display
  emit('update:modelValue', di.toValue(date))
}

function onTypedInput() {
  typedInvalid.value = false
  if (typed.value === '') {
    commit(null)
    return
  }
  // Só comita quando o texto formar uma data completa, válida e dentro de min/max.
  const d = di.fromDisplay(typed.value)
  if (d && inRange(d)) commit(d)
}

function onBlur() {
  if (typed.value === '') return
  const d = di.fromDisplayLenient(typed.value)
  if (d && inRange(d)) {
    commit(d)
    typed.value = di.toDisplay(d)
    return
  }
  // Texto que não forma data: nunca volta em silêncio ao valor anterior. Limpa o valor (o
  // formulário acusa o obrigatório) e deixa o texto à vista, marcado como inválido.
  typedInvalid.value = true
  commit(null)
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

/** OK do seletor com hora: a escolha já foi aplicada; fecha e volta o foco ao campo. */
function confirm() {
  op.value?.hide()
  const el = (inputRef.value as { $el?: HTMLElement } | null)?.$el
  el?.focus()
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
        ref="inputRef"
        v-bind="inputAttrs"
        v-model="typed"
        v-maska="maskaOptions"
        :placeholder="placeholder ?? di.placeholder()"
        :disabled="disabled"
        :invalid="invalid || typedInvalid"
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

    <WPopover ref="op">
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
          <div class="w-datepicker-shortcuts">
            <WButton
              variant="ghost"
              :label="showTime ? 'Agora' : 'Hoje'"
              size="sm"
              @click="setToday"
            />
            <WButton
              v-if="showClear"
              variant="ghost"
              label="Limpar"
              size="sm"
              @click="clearValue"
            />
          </div>
          <WButton v-if="showTime" label="OK" size="sm" @click="confirm" />
        </div>
      </div>
    </WPopover>
  </div>
</template>
