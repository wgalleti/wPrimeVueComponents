<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import type { FieldDef } from '@/types/crud'
import WFormRenderer from '@/components/form/WFormRenderer.vue'

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
  }>(),
  {
    width: '480px',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'update:field': [field: string, value: unknown]
  save: []
}>()

const rendererRef = ref<InstanceType<typeof WFormRenderer> | null>(null)

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
    :visible="visible"
    :header="title"
    :style="{ width }"
    modal
    :draggable="false"
    class="w-crud-form-dialog"
    @update:visible="emit('update:visible', $event)"
  >
    <form class="w-crud-form" @submit.prevent="onSave">
      <WFormRenderer
        ref="rendererRef"
        :fields="fields"
        :form-data="formData"
        :is-editing="isEditing"
        :disabled="disabled"
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
          v-for="field in fields.filter(f => f.type === 'image')"
          :key="`img-${field.field}`"
          #[`image-${field.field}`]="slotData"
        >
          <slot :name="`image-${field.field}`" v-bind="slotData" />
        </template>
      </WFormRenderer>

      <!-- Footer -->
      <div class="w-crud-form-footer">
        <slot name="footer" :saving="saving" :disabled="disabled">
          <Button
            type="button"
            :label="disabled ? 'Fechar' : 'Cancelar'"
            severity="secondary"
            text
            :disabled="saving"
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
