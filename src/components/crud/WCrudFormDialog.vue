<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import { useTabHost } from '@/types/routeTabs'
import Button from 'primevue/button'
import type { FieldDef } from '@/types/field'
import WFormRenderer from '@/components/form/WFormRenderer.vue'
import { useFormKeyboardNav } from '@/composables/useFormKeyboardNav'

// Dentro da navegação por abas, o dialog pendura no pane da própria aba
// (some e volta com ela, intacto); fora de abas, o body de sempre.
const tabHost = useTabHost()

const props = withDefaults(
  defineProps<{
    visible: boolean
    title: string
    fields: FieldDef[]
    formData: Record<string, unknown>
    isEditing: boolean
    saving: boolean
    disabled?: boolean
    width?: string
    /** Nº de colunas do grid do form (repassado ao WFormRenderer; default 2). */
    formColumns?: number
    /** Navegação por teclado estilo desktop: foca o 1º campo ao abrir e o Enter
     *  pula para o próximo campo até o botão de salvar. Opt-in. */
    keyboardNav?: boolean
  }>(),
  {
    width: '480px',
    disabled: false,
    formColumns: undefined,
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'update:field': [field: string, value: unknown]
  save: []
}>()

const rendererRef = ref<InstanceType<typeof WFormRenderer> | null>(null)
const formRef = ref<HTMLFormElement | null>(null)

function onSave() {
  if (rendererRef.value) {
    const errors = rendererRef.value.validateAll()
    if (errors.length === 0) {
      emit('save')
    }
  } else {
    emit('save')
  }
}

// Navegação por teclado (opt-in) — sem watchers: @keydown no <form> + @show no Dialog.
const { focusFirst, handleKeydown } = useFormKeyboardNav(formRef, {
  enabled: () => props.keyboardNav === true,
  onSubmit: onSave,
})

// Clear errors when dialog opens
watch(
  () => props.visible,
  (val) => {
    if (val && rendererRef.value) {
      rendererRef.value.clearErrors()
    }
  },
)
</script>

<template>
  <Dialog
    :append-to="tabHost?.hostEl.value ?? 'body'"
    :visible="visible"
    :header="title"
    :style="{ width }"
    modal
    :draggable="false"
    class="w-crud-form-dialog"
    @update:visible="emit('update:visible', $event)"
    @show="focusFirst"
  >
    <form ref="formRef" class="w-crud-form" @submit.prevent="onSave" @keydown="handleKeydown">
      <WFormRenderer
        ref="rendererRef"
        :fields="fields"
        :form-data="formData"
        :is-editing="isEditing"
        :disabled="disabled"
        :columns="formColumns"
        @update:field="(f, v) => emit('update:field', f, v)"
      >
        <!-- Forward field-* slots from parent -->
        <template
          v-for="field in fields"
          :key="`fwd-${field.field}`"
          #[`field-${field.field}`]="slotData"
        >
          <slot :name="`field-${field.field}`" v-bind="slotData" />
        </template>
        <!-- Forward image-* slots from parent -->
        <template
          v-for="field in fields.filter((f) => f.type === 'image')"
          :key="`img-${field.field}`"
          #[`image-${field.field}`]="slotData"
        >
          <slot :name="`image-${field.field}`" v-bind="slotData" />
        </template>
      </WFormRenderer>

      <!-- Depois dos campos, antes do rodapé: prévia do que vai ser gravado, saldo do
           que foi escolhido, aviso dependente do preenchimento. É conteúdo do form
           (reage ao que está digitado), não ação — por isso não vive no `#footer`. -->
      <slot name="after-fields" :form-data="formData" :is-editing="isEditing" />

      <!-- Footer -->
      <div class="w-crud-form-footer">
        <slot name="footer" :saving="saving" :disabled="disabled">
          <Button
            type="button"
            :label="disabled ? 'Fechar' : 'Cancelar'"
            severity="secondary"
            text
            :disabled="saving"
            data-kbd-skip
            @click="emit('update:visible', false)"
          />
          <Button
            v-if="!disabled"
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
