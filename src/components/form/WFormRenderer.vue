<script setup lang="ts">
import { computed, reactive, isRef, watch } from 'vue'
import { vMaska } from 'maska/vue'
import { isFieldVisible } from '@/utils/formRecord'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import AutoComplete from 'primevue/autocomplete'
import ToggleSwitch from 'primevue/toggleswitch'
import ColorPicker from 'primevue/colorpicker'
import Password from 'primevue/password'
import type { FieldDef, FieldSubRowsFetch } from '@/types/field'
import WAutoCompleteFK from '@/components/form/WAutoCompleteFK.vue'
import WDatePicker from '@/components/form/WDatePicker.vue'
import WMoneyInput from '@/components/form/WMoneyInput.vue'
import WImageCropper from '@/components/form/WImageCropper.vue'
import WTransferList from '@/components/form/WTransferList.vue'
import { lookupCep } from '@/utils/cep'

const props = withDefaults(
  defineProps<{
    fields: FieldDef[]
    formData: Record<string, unknown>
    isEditing: boolean
    disabled?: boolean
    /** Nº de colunas do grid (default 2). Campos ocupam frações via `colSpan`;
     *  grupos podem sobrepor via `fieldGroup.columns`. */
    columns?: number
  }>(),
  {
    disabled: false,
    columns: 2,
  },
)

const emit = defineEmits<{
  'update:field': [field: string, value: unknown]
}>()

const fieldErrors = reactive<Record<string, string | null>>({})

// --- CEP state ---
const cepLoading = reactive<Record<string, boolean>>({})
const cepError = reactive<Record<string, string | null>>({})
const cepTimers = reactive<Record<string, ReturnType<typeof setTimeout> | null>>({})

function onCepInput(field: FieldDef, event: Event) {
  const raw = (event.target as HTMLInputElement).value
  const digits = raw.replace(/\D/g, '')
  emit('update:field', field.field, raw)

  // Clear previous error
  cepError[field.field] = null

  // Clear pending timer
  if (cepTimers[field.field]) {
    clearTimeout(cepTimers[field.field]!)
    cepTimers[field.field] = null
  }

  if (digits.length === 8) {
    cepTimers[field.field] = setTimeout(async () => {
      cepLoading[field.field] = true
      cepError[field.field] = null
      try {
        const result = await lookupCep(digits)
        if (!result) {
          cepError[field.field] = 'CEP não encontrado. Preencha os campos manualmente.'
        } else {
          // Fill mapped fields, but only when currently empty
          const mapping = field.cepFields || {}
          const keys = Object.keys(mapping) as Array<keyof typeof mapping>
          for (const key of keys) {
            const targetField = mapping[key]
            if (!targetField) continue
            const existing = props.formData[targetField]
            if (existing == null || existing === '') {
              emit('update:field', targetField, result[key] ?? '')
            }
          }
        }
      } finally {
        cepLoading[field.field] = false
      }
    }, 400)
  }
}

// --- Visibility & Disabled ---

const visibleFields = computed(() =>
  props.fields.filter((f) => isFieldVisible(f, props.formData, props.isEditing)),
)

function isFieldDisabled(field: FieldDef): boolean {
  if (props.disabled) return true
  // Somente-leitura / calculado → sempre desabilitado (o valor ainda vai no payload).
  if (field.readonly || field.computed) return true
  if (field.disabledOnEdit && props.isEditing) return true
  if (typeof field.disabled === 'function') return field.disabled(props.formData, props.isEditing)
  return !!field.disabled
}

/** Indireção tipada do `subRows`: devolver a função direto no template fazia o
 * vue-tsc entrar no ciclo WFormRenderer → WAutoCompleteFK → WCrudFormDialog e
 * degradar tudo para `any`. */
function subRowsFetchDe(field: FieldDef): FieldSubRowsFetch | undefined {
  return field.subRows
}

/** Resolve `endpointParams` estático ou por função (contexto do pai). */
function resolveEndpointParams(field: FieldDef) {
  const ep = field.endpointParams
  return typeof ep === 'function' ? ep() : ep
}

// --- Campos calculados ---
// Derivam o valor dos demais campos e o escrevem de volta no formData (para irem no
// payload). O SOURCE do watch chama `calculate` — assim as dependências reativas exatas
// (ex.: `formData.produto.unidade_medida`) são coletadas e o watch dispara quando elas
// mudam. (Um `watch(() => formData, …, { deep })` não reage de forma confiável ao
// `formData` que chega por prop no fluxo do WCrudFormDialog.) Só emite quando o valor
// muda de fato (o `!==` evita laço). A função `calculate` deve cair no valor atual quando
// não puder derivar (ex.: na edição, com a FK já como id).
const calculatedFields = computed(() =>
  props.fields.filter((f) => typeof f.calculate === 'function'),
)

watch(
  () => calculatedFields.value.map((f) => f.calculate!(props.formData, props.isEditing)),
  (nexts) => {
    calculatedFields.value.forEach((f, i) => {
      if (props.formData[f.field] !== nexts[i]) emit('update:field', f.field, nexts[i])
    })
  },
  { immediate: true },
)

function unwrapRef<V>(val: V): V extends import('vue').Ref<infer U> ? U : V {
  return isRef(val) ? ((val as { value: unknown }).value as never) : (val as never)
}

// --- Autofocus ---

const autofocusField = computed(() => {
  const mode = props.isEditing ? 'edit' : 'create'
  const explicit = props.fields.find((f) => f.autofocus === true || f.autofocus === mode)
  if (explicit) return explicit.field
  const first = visibleFields.value.find((f) => {
    // Tipos sem campo de digitação não são candidatos a foco inicial.
    const semInput = ['switch', 'fk', 'select', 'image', 'segmented', 'choice', 'chips', 'transfer']
    if (f.type && semInput.includes(f.type)) return false
    if (f.disabled === true) return false
    if (f.disabledOnEdit && props.isEditing) return false
    return true
  })
  return first?.field ?? null
})

function shouldAutofocus(field: FieldDef): boolean {
  return field.field === autofocusField.value
}

// --- Mask format conversion (PrimeVue InputMask -> maska) ---

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
  return (options as Record<string, unknown>[]).find((o) => o[optionValue] === val) ?? null
}

function getFilteredSuggestions(field: FieldDef) {
  return autocompleteSuggestions[field.field] || []
}

function onAutocompleteSearch(field: FieldDef, event: { query: string }) {
  const query = (event.query || '').toLowerCase()
  const options = unwrapRef(field.options) || []
  const optionLabel = field.optionLabel || 'label'
  autocompleteSuggestions[field.field] = (options as Record<string, unknown>[]).filter((o) =>
    String(o[optionLabel] || '')
      .toLowerCase()
      .includes(query),
  )
}

function onAutocompleteSelect(field: FieldDef, event: { value: Record<string, unknown> }) {
  const optionValue = field.optionValue || 'value'
  emit('update:field', field.field, event.value[optionValue])
}

// --- Options (segmented / choice / chips) ---
// Os três tipos leem a MESMA tripla `options`/`optionLabel`/`optionValue` do
// select — quem troca um Select por pílulas não reescreve o FieldDef.

function fieldOptions(field: FieldDef): Record<string, unknown>[] {
  return (unwrapRef(field.options) || []) as Record<string, unknown>[]
}

function optionLabelOf(field: FieldDef, option: Record<string, unknown>): string {
  return String(option[field.optionLabel || 'label'] ?? '')
}

function optionValueOf(field: FieldDef, option: Record<string, unknown>): unknown {
  return option[field.optionValue || 'value']
}

function isOptionSelected(field: FieldDef, option: Record<string, unknown>): boolean {
  return props.formData[field.field] === optionValueOf(field, option)
}

/** Escolha única: clicar na opção ativa mantém a escolha (não desmarca). */
function pickOption(field: FieldDef, option: Record<string, unknown>) {
  if (isFieldDisabled(field)) return
  emit('update:field', field.field, optionValueOf(field, option))
}

// --- Chips (valor múltiplo, removível) ---
// O valor é um ARRAY. Cada item pode ser o objeto inteiro (usa `optionLabel`) ou
// só o id (procura o rótulo em `options`; sem match, mostra o próprio valor).

interface ChipEntry {
  key: string
  label: string
}

function chipEntries(field: FieldDef): ChipEntry[] {
  const raw = props.formData[field.field]
  if (!Array.isArray(raw)) return []
  const labelKey = field.optionLabel || 'nome'
  const valueKey = field.optionValue || 'id'
  const options = fieldOptions(field)

  return raw.map((item, index) => {
    if (item !== null && typeof item === 'object') {
      const obj = item as Record<string, unknown>
      return { key: String(obj[valueKey] ?? index), label: String(obj[labelKey] ?? '') }
    }
    const match = options.find((o) => o[valueKey] === item)
    return {
      key: String(item ?? index),
      label: match ? String(match[labelKey] ?? item) : String(item),
    }
  })
}

function removeChip(field: FieldDef, index: number) {
  if (isFieldDisabled(field)) return
  const raw = props.formData[field.field]
  if (!Array.isArray(raw)) return
  emit(
    'update:field',
    field.field,
    raw.filter((_, i) => i !== index),
  )
}

// --- Color ---

function getColorPickerValue(field: FieldDef): string {
  const val = props.formData[field.field]
  return val ? String(val).replace('#', '') : 'FFFFFF'
}

function onColorChange(field: FieldDef, value: string) {
  emit('update:field', field.field, `#${value}`)
}

// --- Drill-down (filtro em cascata das FKs) ---

/** Resolve o `dependsOn` do campo em filtros já com o valor atual do formulário. */
function resolveDrilldown(field: FieldDef) {
  const dep = field.dependsOn
  if (!dep) return undefined
  const list = Array.isArray(dep) ? dep : [dep]
  return list.map((d) => ({
    field: d.param || d.field,
    value: props.formData[d.field],
    required: d.required,
  }))
}

// --- Validation ---

function validateField(field: FieldDef) {
  if (typeof field.validate === 'function') {
    const error = field.validate(props.formData[field.field])
    fieldErrors[field.field] = error || null
  }
}

/**
 * Só campos visíveis: um `validate` de campo oculto barraria o save sem ter onde
 * mostrar o erro (o campo não está na tela). O erro de campo que ficou oculto é
 * limpo para não reaparecer se ele voltar.
 */
function validateAll(): string[] {
  const errors: string[] = []
  for (const field of props.fields) {
    if (!isFieldVisible(field, props.formData, props.isEditing)) {
      fieldErrors[field.field] = null
      continue
    }
    if (typeof field.validate === 'function') {
      const error = field.validate(props.formData[field.field])
      fieldErrors[field.field] = error || null
      if (error) errors.push(error)
    }
  }
  return errors
}

function clearErrors() {
  Object.keys(fieldErrors).forEach((k) => delete fieldErrors[k])
}

// --- Field Groups ---

interface FieldGroup {
  id: string
  title?: string
  description?: string
  columns?: number
  fields: FieldDef[]
}

// --- Grid columns / span ---

function groupColumns(group: FieldGroup): number {
  return Math.max(1, Math.floor(group.columns ?? props.columns))
}

/** Resolve o colSpan do campo em nº de colunas do grid do grupo.
 *  - omitido ou 'full' → linha inteira
 *  - 0.5 → metade da linha (independe do nº de colunas)
 *  - inteiro ≥ 1 → N colunas (limitado ao total) */
function fieldSpan(field: FieldDef, cols: number): number {
  const span = field.colSpan
  if (span == null || span === 'full') return cols
  if (span === 0.5) return Math.max(1, Math.round(cols / 2))
  return Math.min(Math.max(1, Math.floor(span)), cols)
}

function fieldSpanStyle(field: FieldDef, group: FieldGroup) {
  return { '--w-col-span': fieldSpan(field, groupColumns(group)) }
}

function fieldSpanClass(field: FieldDef, group: FieldGroup): string {
  return fieldSpan(field, groupColumns(group)) === groupColumns(group)
    ? 'w-crud-form-col-full'
    : 'w-crud-form-col-half'
}

const groupedFields = computed((): FieldGroup[] => {
  const groupMap = new Map<string, FieldGroup>()
  const groupOrder: string[] = []
  const groupExplicitOrder = new Map<string, number>()

  for (const field of visibleFields.value) {
    const groupId = field.fieldGroup?.id ?? '__default__'

    if (!groupMap.has(groupId)) {
      groupMap.set(groupId, {
        id: groupId,
        title: field.fieldGroup?.title,
        description: field.fieldGroup?.description,
        columns: field.fieldGroup?.columns,
        fields: [],
      })
      groupOrder.push(groupId)
      if (field.fieldGroup?.order != null) {
        groupExplicitOrder.set(groupId, field.fieldGroup.order)
      }
    }

    groupMap.get(groupId)!.fields.push(field)
  }

  return groupOrder
    .slice()
    .sort((a, b) => {
      const orderA = groupExplicitOrder.get(a)
      const orderB = groupExplicitOrder.get(b)
      if (orderA != null && orderB != null) return orderA - orderB
      if (orderA != null) return -1
      if (orderB != null) return 1
      return groupOrder.indexOf(a) - groupOrder.indexOf(b)
    })
    .map((id) => groupMap.get(id)!)
})

defineExpose({ validateAll, clearErrors })
</script>

<template>
  <div class="w-crud-form">
    <div v-for="group in groupedFields" :key="group.id" class="w-crud-form-group">
      <div v-if="group.title" class="w-crud-form-group-header">
        <h3 class="w-crud-form-group-title">{{ group.title }}</h3>
        <p v-if="group.description" class="w-crud-form-group-desc">{{ group.description }}</p>
      </div>
      <div class="w-crud-form-fields" :style="{ '--w-form-cols': groupColumns(group) }">
        <template v-for="field in group.fields" :key="field.field">
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
              :style="fieldSpanStyle(field, group)"
            >
              <ToggleSwitch
                :model-value="formData[field.field] as boolean"
                :disabled="isFieldDisabled(field)"
                @update:model-value="(val) => emit('update:field', field.field, val)"
              />
              <label class="w-crud-form-switch-label">{{ field.switchLabel || field.label }}</label>
            </div>

            <!-- Color -->
            <div
              v-else-if="field.type === 'color'"
              :class="fieldSpanClass(field, group)"
              :style="fieldSpanStyle(field, group)"
            >
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
            <div
              v-else-if="field.type === 'image'"
              :class="fieldSpanClass(field, group)"
              :style="fieldSpanStyle(field, group)"
            >
              <label class="w-crud-form-label">
                {{ field.label }}
              </label>
              <slot :name="`image-${field.field}`" :field="field" :form-data="formData">
                <WImageCropper
                  :model-value="formData[field.field] as File | string | null"
                  :accept="field.accept || 'image/*'"
                  @update:model-value="(file) => emit('update:field', field.field, file)"
                  @error="
                    (msg) => {
                      fieldErrors[field.field] = msg
                    }
                  "
                />
              </slot>
              <small v-if="fieldErrors[field.field]" class="w-crud-form-error">
                {{ fieldErrors[field.field] }}
              </small>
            </div>

            <!-- Transfer (dual list) -->
            <div
              v-else-if="field.type === 'transfer'"
              :class="fieldSpanClass(field, group)"
              :style="fieldSpanStyle(field, group)"
            >
              <label class="w-crud-form-label">
                {{ field.label }}
                <span v-if="field.required" class="w-crud-form-required">*</span>
              </label>
              <WTransferList
                :source="(unwrapRef(field.options) as any[]) || []"
                :selected="(formData[field.field] as any[]) || []"
                :track-by="field.optionValue || 'id'"
                :option-label="field.optionLabel || 'nome'"
                :search-fields="field.searchFields"
                :disabled="isFieldDisabled(field)"
                @update:selected="(val) => emit('update:field', field.field, val)"
              />
            </div>

            <!-- All other types -->
            <div v-else :class="fieldSpanClass(field, group)" :style="fieldSpanStyle(field, group)">
              <label class="w-crud-form-label">
                {{ field.label }}
                <span v-if="field.required" class="w-crud-form-required">*</span>
                <i
                  v-if="cepLoading[field.field]"
                  class="pi pi-spin pi-spinner w-crud-form-cep-spinner"
                />
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

              <!-- Currency (fill-from-right, calculator style) -->
              <WMoneyInput
                v-else-if="field.type === 'currency' && field.fillFromRight"
                :model-value="formData[field.field] as number | null"
                :decimals="field.decimals ?? 2"
                currency
                :prefix="field.prefix"
                :suffix="field.suffix"
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
                :autofocus="shouldAutofocus(field) || undefined"
                :endpoint="field.endpoint!"
                :endpoint-params="resolveEndpointParams(field)"
                :drilldown="resolveDrilldown(field)"
                :blocked-placeholder="field.blockedPlaceholder"
                :option-label="field.optionLabel || 'nome'"
                :option-description="field.optionDescription"
                :placeholder="field.placeholder"
                :disabled="isFieldDisabled(field)"
                :show-clear="field.showClear !== false"
                :dialog-header="field.label"
                :crud-fields="field.crudFields"
                :crud-columns="field.crudColumns"
                :sub-rows="subRowsFetchDe(field)"
                :dialog-width="field.dialogWidth"
                :can-create="field.canCreate"
                :can-edit="field.canEdit"
                :can-delete="field.canDelete"
                @update:model-value="(val) => emit('update:field', field.field, val)"
              />

              <!-- Date -->
              <WDatePicker
                v-else-if="field.type === 'date'"
                :model-value="formData[field.field] as Date | string | null"
                value-format="date"
                :autonow="field.autonow"
                :min-date="field.minDate"
                :max-date="field.maxDate"
                :placeholder="field.placeholder"
                :disabled="isFieldDisabled(field)"
                @update:model-value="(val) => emit('update:field', field.field, val)"
              />

              <!-- Datetime -->
              <WDatePicker
                v-else-if="field.type === 'datetime'"
                :model-value="formData[field.field] as Date | string | null"
                value-format="date"
                show-time
                :autonow="field.autonow"
                :min-date="field.minDate"
                :max-date="field.maxDate"
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

              <!-- CEP -->
              <InputText
                v-else-if="field.type === 'cep'"
                v-maska="{ mask: '#####-###' }"
                :model-value="formData[field.field] as string"
                fluid
                :placeholder="field.placeholder || '00000-000'"
                :disabled="isFieldDisabled(field)"
                :invalid="!!cepError[field.field]"
                @input="onCepInput(field, $event)"
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

              <!-- Segmented (escolha única, 2-3 opções curtas, num trilho) -->
              <div v-else-if="field.type === 'segmented'" class="w-segmented">
                <button
                  v-for="option in fieldOptions(field)"
                  :key="String(optionValueOf(field, option))"
                  type="button"
                  class="w-segmented__option"
                  :class="{ 'w-segmented__option--on': isOptionSelected(field, option) }"
                  :aria-pressed="isOptionSelected(field, option)"
                  :disabled="isFieldDisabled(field)"
                  @click="pickOption(field, option)"
                >
                  {{ optionLabelOf(field, option) }}
                </button>
              </div>

              <!-- Choice (escolha única em chips, N opções) -->
              <div v-else-if="field.type === 'choice'" class="w-choice">
                <button
                  v-for="option in fieldOptions(field)"
                  :key="String(optionValueOf(field, option))"
                  type="button"
                  class="w-choice__option"
                  :class="{ 'w-choice__option--on': isOptionSelected(field, option) }"
                  :aria-pressed="isOptionSelected(field, option)"
                  :disabled="isFieldDisabled(field)"
                  @click="pickOption(field, option)"
                >
                  <i
                    v-if="isOptionSelected(field, option) && field.choiceIcon !== ''"
                    :class="field.choiceIcon || 'pi pi-check-circle'"
                  />
                  {{ optionLabelOf(field, option) }}
                </button>
              </div>

              <!-- Chips (valor múltiplo removível + gatilho + resumo) -->
              <div v-else-if="field.type === 'chips'" class="w-chips">
                <span
                  v-for="(chip, chipIndex) in chipEntries(field)"
                  :key="chip.key"
                  class="w-chips__chip"
                >
                  {{ chip.label }}
                  <button
                    type="button"
                    class="w-chips__remove"
                    :title="field.chipsRemoveLabel || 'Remover'"
                    :aria-label="field.chipsRemoveLabel || 'Remover'"
                    :disabled="isFieldDisabled(field)"
                    @click="removeChip(field, chipIndex)"
                  >
                    <i class="pi pi-times" />
                  </button>
                </span>

                <span
                  v-if="!chipEntries(field).length && field.chipsEmptyLabel"
                  class="w-chips__empty"
                >
                  {{ field.chipsEmptyLabel }}
                </span>

                <slot
                  :name="`chips-trigger-${field.field}`"
                  :field="field"
                  :form-data="formData"
                  :disabled="isFieldDisabled(field)"
                  :set-form-field="(f: string, v: unknown) => emit('update:field', f, v)"
                />

                <span class="w-chips__summary">
                  <slot
                    :name="`chips-summary-${field.field}`"
                    :field="field"
                    :form-data="formData"
                    :items="chipEntries(field)"
                  />
                </span>
              </div>

              <small v-if="cepError[field.field]" class="w-crud-form-cep-error">
                {{ cepError[field.field] }}
              </small>
              <small v-else-if="fieldErrors[field.field]" class="w-crud-form-error">
                {{ fieldErrors[field.field] }}
              </small>
            </div>
          </slot>
        </template>
      </div>
    </div>
  </div>
</template>
