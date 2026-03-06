<script setup lang="ts">
import { computed, reactive, isRef, watch } from 'vue'
import { vMaska } from 'maska/vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import AutoComplete from 'primevue/autocomplete'
import DatePicker from 'primevue/datepicker'
import ToggleSwitch from 'primevue/toggleswitch'
import ColorPicker from 'primevue/colorpicker'
import Password from 'primevue/password'
import type { FieldDef } from '@/types/crud'
import WAutoCompleteFK from '@/components/form/WAutoCompleteFK.vue'

const props = withDefaults(
  defineProps<{
    visible: boolean
    title: string
    fields: FieldDef[]
    formData: Record<string, unknown>
    isEditing: boolean
    saving: boolean
    width?: string
  }>(),
  {
    width: '480px',
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'update:field': [field: string, value: unknown]
  save: []
}>()

const fieldErrors = reactive<Record<string, string | null>>({})

// --- Visibility & Disabled ---

const visibleFields = computed(() =>
  props.fields.filter((f) => {
    if (f.visible === undefined || f.visible === true) return true
    if (typeof f.visible === 'function') return f.visible(props.formData, props.isEditing)
    return f.visible
  }),
)

function isFieldDisabled(field: FieldDef): boolean {
  if (field.disabledOnEdit && props.isEditing) return true
  if (typeof field.disabled === 'function')
    return field.disabled(props.formData, props.isEditing)
  return !!field.disabled
}

function unwrapRef<V>(val: V): V extends import('vue').Ref<infer U> ? U : V {
  return isRef(val) ? (val as { value: unknown }).value as never : val as never
}

// --- Autofocus ---

const autofocusField = computed(() => {
  const mode = props.isEditing ? 'edit' : 'create'
  const explicit = props.fields.find(
    (f) => f.autofocus === true || f.autofocus === mode,
  )
  if (explicit) return explicit.field
  const first = visibleFields.value.find((f) => {
    if (f.type === 'switch' || f.type === 'fk' || f.type === 'select' || f.type === 'image')
      return false
    if (f.disabled === true) return false
    if (f.disabledOnEdit && props.isEditing) return false
    return true
  })
  return first?.field ?? null
})

function shouldAutofocus(field: FieldDef): boolean {
  return field.field === autofocusField.value
}

// --- Mask format conversion (PrimeVue InputMask → maska) ---

function convertMask(mask?: string): string | undefined {
  if (!mask) return undefined
  return mask.replace(/9/g, '#').replace(/a/g, 'S').replace(/\*/g, 'X')
}

// --- CPF/CNPJ inline mask ---

function displayCpfCnpj(value: unknown): string {
  if (!value) return ''
  const digits = String(value).replace(/\D/g, '').slice(0, 14)
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

function onCpfCnpjInput(fieldName: string, event: Event) {
  const raw = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 14)
  emit('update:field', fieldName, raw)
}

// --- AutoComplete local (para type=autocomplete com options) ---

const autocompleteSuggestions = reactive<Record<string, unknown[]>>({})

function getAutocompleteValue(field: FieldDef) {
  const val = props.formData[field.field]
  if (val == null) return null
  const optionValue = field.optionValue || 'value'
  const options = unwrapRef(field.options) || []
  return (options as Record<string, unknown>[]).find(
    (o) => o[optionValue] === val,
  ) ?? null
}

function getFilteredSuggestions(field: FieldDef) {
  return autocompleteSuggestions[field.field] || []
}

function onAutocompleteSearch(field: FieldDef, event: { query: string }) {
  const query = (event.query || '').toLowerCase()
  const options = unwrapRef(field.options) || []
  const optionLabel = field.optionLabel || 'label'
  autocompleteSuggestions[field.field] = (options as Record<string, unknown>[]).filter(
    (o) => String(o[optionLabel] || '').toLowerCase().includes(query),
  )
}

function onAutocompleteSelect(field: FieldDef, event: { value: Record<string, unknown> }) {
  const optionValue = field.optionValue || 'value'
  emit('update:field', field.field, event.value[optionValue])
}

// --- Color ---

function getColorPickerValue(field: FieldDef): string {
  const val = props.formData[field.field]
  return val ? String(val).replace('#', '') : 'FFFFFF'
}

function onColorChange(field: FieldDef, value: string) {
  emit('update:field', field.field, `#${value}`)
}

// --- Validation ---

function validateField(field: FieldDef) {
  if (typeof field.validate === 'function') {
    const error = field.validate(props.formData[field.field])
    fieldErrors[field.field] = error || null
  }
}

function validateAll(): boolean {
  let valid = true
  for (const field of props.fields) {
    if (typeof field.validate === 'function') {
      const error = field.validate(props.formData[field.field])
      fieldErrors[field.field] = error || null
      if (error) valid = false
    }
  }
  return valid
}

function onSave() {
  if (validateAll()) {
    emit('save')
  }
}

// Clear errors when dialog opens
watch(
  () => props.visible,
  (val) => {
    if (val) {
      Object.keys(fieldErrors).forEach((k) => delete fieldErrors[k])
    }
  },
)
</script>

<template>
  <Dialog
    :visible="visible"
    :header="title"
    :style="{ width }"
    modal
    :draggable="false"
    class="w-crud-form-dialog"
    @update:visible="emit('update:visible', $event)"
  >
    <form class="w-crud-form" @submit.prevent="onSave">
      <div class="w-crud-form-fields">
      <template v-for="field in visibleFields" :key="field.field">
        <slot
          :name="`field-${field.field}`"
          :field="field"
          :form-data="formData"
          :is-editing="isEditing"
          :set-form-field="(f: string, v: unknown) => emit('update:field', f, v)"
        >
          <!-- Switch -->
          <div
            v-if="field.type === 'switch'"
            class="w-crud-form-switch"
          >
            <ToggleSwitch
              :model-value="formData[field.field] as boolean"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />
            <label class="w-crud-form-switch-label">{{ field.switchLabel || field.label }}</label>
          </div>

          <!-- Color -->
          <div v-else-if="field.type === 'color'" class="w-crud-form-col-full">
            <label class="w-crud-form-label">
              {{ field.label }}
              <span v-if="field.required" class="w-crud-form-required">*</span>
            </label>
            <div class="w-crud-form-color-row">
              <ColorPicker
                :model-value="getColorPickerValue(field)"
                :disabled="isFieldDisabled(field)"
                @update:model-value="onColorChange(field, $event as string)"
              />
              <InputText
                :model-value="formData[field.field] as string"
                class="w-28"
                maxlength="7"
                placeholder="#000000"
                :disabled="isFieldDisabled(field)"
                @update:model-value="(val) => emit('update:field', field.field, val)"
              />
            </div>
          </div>

          <!-- Image -->
          <div v-else-if="field.type === 'image'" class="w-crud-form-col-full">
            <label class="w-crud-form-label">
              {{ field.label }}
            </label>
            <slot :name="`image-${field.field}`" :field="field" :form-data="formData">
              <input
                type="file"
                :accept="field.accept || 'image/*'"
                :disabled="isFieldDisabled(field)"
                @change="(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0] ?? null
                  emit('update:field', field.field, file)
                }"
              />
            </slot>
          </div>

          <!-- All other types -->
          <div
            v-else
            :class="field.colSpan === 0.5 ? 'w-crud-form-col-half' : 'w-crud-form-col-full'"
          >
            <label class="w-crud-form-label">
              {{ field.label }}
              <span v-if="field.required" class="w-crud-form-required">*</span>
            </label>

            <!-- Text with mask (maska) -->
            <InputText
              v-if="(!field.type || field.type === 'text') && field.mask"
              v-maska="{ mask: convertMask(field.mask) }"
              :model-value="formData[field.field] as string"
              fluid
              :autofocus="shouldAutofocus(field) || undefined"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <!-- Text -->
            <InputText
              v-else-if="!field.type || field.type === 'text'"
              :model-value="formData[field.field] as string"
              fluid
              :autofocus="shouldAutofocus(field) || undefined"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <!-- Email -->
            <InputText
              v-else-if="field.type === 'email'"
              :model-value="formData[field.field] as string"
              type="email"
              fluid
              :autofocus="shouldAutofocus(field) || undefined"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <!-- Password -->
            <Password
              v-else-if="field.type === 'password'"
              :model-value="formData[field.field] as string"
              fluid
              toggle-mask
              :feedback="field.feedback !== false"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <!-- Number -->
            <InputNumber
              v-else-if="field.type === 'number'"
              :model-value="formData[field.field] as number"
              fluid
              locale="pt-BR"
              :min="field.min"
              :max="field.max"
              :min-fraction-digits="field.minFractionDigits"
              :max-fraction-digits="field.maxFractionDigits"
              :suffix="field.suffix"
              :prefix="field.prefix"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <!-- Currency -->
            <InputNumber
              v-else-if="field.type === 'currency'"
              :model-value="formData[field.field] as number"
              fluid
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              :min="field.min"
              :max="field.max"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <!-- Select -->
            <Select
              v-else-if="field.type === 'select'"
              :model-value="formData[field.field]"
              fluid
              :options="unwrapRef(field.options) as any[]"
              :option-label="field.optionLabel || 'label'"
              :option-value="field.optionValue || 'value'"
              :show-clear="field.showClear !== false"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <!-- AutoComplete (options locais) -->
            <AutoComplete
              v-else-if="field.type === 'autocomplete'"
              :model-value="getAutocompleteValue(field)"
              fluid
              :suggestions="getFilteredSuggestions(field) as any[]"
              :option-label="field.optionLabel || 'label'"
              dropdown
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @complete="onAutocompleteSearch(field, $event)"
              @item-select="onAutocompleteSelect(field, $event)"
              @clear="emit('update:field', field.field, null)"
            />

            <!-- FK (busca na API) -->
            <WAutoCompleteFK
              v-else-if="field.type === 'fk'"
              :model-value="formData[field.field] as any"
              :endpoint="field.endpoint!"
              :option-label="field.optionLabel || 'nome'"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              :show-clear="field.showClear !== false"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <!-- Date -->
            <DatePicker
              v-else-if="field.type === 'date'"
              :model-value="formData[field.field] as Date"
              fluid
              :date-format="field.dateFormat || 'dd/mm/yy'"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <!-- Datetime -->
            <DatePicker
              v-else-if="field.type === 'datetime'"
              :model-value="formData[field.field] as Date"
              fluid
              show-time
              :hour-format="field.hourFormat || '24'"
              :date-format="field.dateFormat || 'dd/mm/yy'"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <!-- CPF/CNPJ -->
            <InputText
              v-else-if="field.type === 'cpf_cnpj'"
              :model-value="displayCpfCnpj(formData[field.field])"
              fluid
              maxlength="18"
              :placeholder="field.placeholder || '000.000.000-00'"
              :disabled="isFieldDisabled(field)"
              :invalid="!!fieldErrors[field.field]"
              @input="onCpfCnpjInput(field.field, $event)"
              @blur="validateField(field)"
            />

            <!-- Mask (maska) -->
            <InputText
              v-else-if="field.type === 'mask'"
              v-maska="{ mask: convertMask(field.mask) }"
              :model-value="formData[field.field] as string"
              fluid
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              :invalid="!!fieldErrors[field.field]"
              @update:model-value="(val) => emit('update:field', field.field, val)"
              @blur="validateField(field)"
            />

            <!-- Textarea -->
            <Textarea
              v-else-if="field.type === 'textarea'"
              :model-value="formData[field.field] as string"
              fluid
              :autofocus="shouldAutofocus(field) || undefined"
              :rows="field.rows || 3"
              :placeholder="field.placeholder"
              :disabled="isFieldDisabled(field)"
              @update:model-value="(val) => emit('update:field', field.field, val)"
            />

            <small v-if="fieldErrors[field.field]" class="w-crud-form-error">
              {{ fieldErrors[field.field] }}
            </small>
          </div>
        </slot>
      </template>
      </div>

      <!-- Footer -->
      <div class="w-crud-form-footer">
        <slot name="footer" :saving="saving">
          <Button
            type="button"
            label="Cancelar"
            severity="secondary"
            text
            :disabled="saving"
            @click="emit('update:visible', false)"
          />
          <Button
            type="submit"
            :label="isEditing ? 'Atualizar' : 'Salvar'"
            icon="pi pi-check"
            :loading="saving"
          />
        </slot>
      </div>
    </form>
  </Dialog>
</template>
