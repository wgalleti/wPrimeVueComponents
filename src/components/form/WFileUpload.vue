<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'

/**
 * Upload de arquivo(s) genérico (single ou multiple), sem dependência pesada.
 * O `v-model` guarda `File` (single) ou `File[]` (multiple). Valida tamanho por
 * arquivo e emite `error` para os que excederem.
 */
const props = withDefaults(
  defineProps<{
    modelValue?: File | File[] | null
    multiple?: boolean
    accept?: string
    /** Tamanho máximo por arquivo em bytes (default 10MB). */
    maxSize?: number
    disabled?: boolean
    chooseLabel?: string
  }>(),
  {
    modelValue: null,
    multiple: false,
    accept: undefined,
    maxSize: 10_485_760,
    disabled: false,
    chooseLabel: 'Selecionar arquivo',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: File | File[] | null]
  error: [message: string]
}>()

const input = ref<HTMLInputElement | null>(null)
const files = computed<File[]>(() => {
  const v = props.modelValue
  if (!v) return []
  return Array.isArray(v) ? v : [v]
})

function open() {
  input.value?.click()
}

function onChange(e: Event) {
  const el = e.target as HTMLInputElement
  const picked = Array.from(el.files || [])
  el.value = ''
  const valid: File[] = []
  for (const f of picked) {
    if (f.size > props.maxSize) {
      emit('error', `"${f.name}" acima do limite de ${(props.maxSize / 1_048_576).toFixed(1)}MB.`)
      continue
    }
    valid.push(f)
  }
  if (!valid.length) return
  emit('update:modelValue', props.multiple ? [...files.value, ...valid] : valid[0])
}

function removeAt(i: number) {
  if (!props.multiple) {
    emit('update:modelValue', null)
    return
  }
  const next = files.value.slice()
  next.splice(i, 1)
  emit('update:modelValue', next.length ? next : null)
}

function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1_048_576).toFixed(1)} MB`
}
</script>

<template>
  <div class="w-fileupload" style="display: flex; flex-direction: column; gap: 0.5rem">
    <div>
      <Button
        type="button"
        :label="chooseLabel"
        icon="pi pi-upload"
        outlined
        size="small"
        :disabled="disabled"
        @click="open"
      />
    </div>
    <input
      ref="input"
      type="file"
      :accept="accept"
      :multiple="multiple"
      style="display: none"
      @change="onChange"
    />
    <ul
      v-if="files.length"
      style="
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      "
    >
      <li
        v-for="(f, i) in files"
        :key="`${f.name}-${i}`"
        style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem"
      >
        <i class="pi pi-file" style="opacity: 0.6" />
        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
          {{ f.name }}
        </span>
        <span style="opacity: 0.6">{{ fmtSize(f.size) }}</span>
        <Button
          type="button"
          icon="pi pi-times"
          text
          rounded
          size="small"
          severity="danger"
          :disabled="disabled"
          @click="removeAt(i)"
        />
      </li>
    </ul>
    <slot v-else name="empty">
      <span style="font-size: 0.8rem; opacity: 0.6">Nenhum arquivo selecionado</span>
    </slot>
  </div>
</template>
