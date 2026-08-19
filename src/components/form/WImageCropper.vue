<script setup lang="ts">
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue'
import Dialog from 'primevue/dialog'
import { useTabHost } from '@/types/routeTabs'
import Button from 'primevue/button'
import Slider from 'primevue/slider'

// Dentro da navegação por abas, o dialog pendura no pane da própria aba
// (some e volta com ela, intacto); fora de abas, o body de sempre.
const tabHost = useTabHost()

/**
 * Upload de imagem com preview e crop (pan + zoom) integrado.
 * Sem dependência externa — o recorte é feito via <canvas>.
 * Emite um `File` recortado (ou `null`), consumível direto pelo
 * `useCrudManager`, que detecta campos de imagem e envia como multipart.
 */
const props = withDefaults(
  defineProps<{
    modelValue?: File | string | null
    accept?: string
    /** Tamanho máximo em bytes (default 5MB). */
    maxSize?: number
    /** Proporção do recorte (1 = quadrado). Ignorado quando `circular`. */
    aspectRatio?: number
    /** Stencil circular (avatar). Força proporção 1 e saída PNG com alpha. */
    circular?: boolean
    /** Dimensões do preview em px. */
    width?: number
    height?: number
  }>(),
  {
    modelValue: null,
    accept: 'image/*',
    maxSize: 5_242_880,
    aspectRatio: 1,
    circular: false,
    width: 200,
    height: 200,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: File | null]
  error: [message: string]
}>()

// ---------------------------------------------------------------------------
// Preview
// ---------------------------------------------------------------------------
const objectUrl = ref<string | null>(null)
watch(
  () => props.modelValue,
  (v) => {
    if (objectUrl.value) {
      URL.revokeObjectURL(objectUrl.value)
      objectUrl.value = null
    }
    if (v instanceof File) objectUrl.value = URL.createObjectURL(v)
  },
  { immediate: true },
)
onBeforeUnmount(() => {
  if (objectUrl.value) URL.revokeObjectURL(objectUrl.value)
})

const previewSrc = computed<string | null>(() => {
  if (props.modelValue instanceof File) return objectUrl.value
  if (typeof props.modelValue === 'string' && props.modelValue) return props.modelValue
  return null
})

// ---------------------------------------------------------------------------
// File picking + validation
// ---------------------------------------------------------------------------
const fileInput = ref<HTMLInputElement | null>(null)
function openPicker() {
  fileInput.value?.click()
}

function acceptsFile(file: File): boolean {
  const acc = (props.accept || '').trim()
  if (!acc || acc === '*' || acc.includes('image/*')) return file.type.startsWith('image/')
  return acc
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .some((t) => {
      if (t.endsWith('/*')) return file.type.startsWith(t.slice(0, -1))
      if (t.startsWith('.')) return file.name.toLowerCase().endsWith(t.toLowerCase())
      return file.type === t
    })
}

let originalName = 'image.png'
let originalType = 'image/png'
let cropImage: HTMLImageElement | null = null

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = '' // permite re-selecionar o mesmo arquivo
  if (!file) return
  if (!acceptsFile(file)) {
    emit('error', 'Tipo de arquivo não suportado.')
    return
  }
  if (file.size > props.maxSize) {
    emit('error', `Imagem acima do limite de ${(props.maxSize / 1_048_576).toFixed(1)}MB.`)
    return
  }
  originalName = file.name
  originalType = file.type || 'image/png'
  const reader = new FileReader()
  reader.onload = () => {
    const img = new Image()
    img.onload = () => {
      cropImage = img
      naturalW.value = img.naturalWidth
      naturalH.value = img.naturalHeight
      zoom.value = 1
      imgSrc.value = img.src
      offset.x = (vpW.value - dispW.value) / 2
      offset.y = (vpH.value - dispH.value) / 2
      cropOpen.value = true
    }
    img.onerror = () => emit('error', 'Não foi possível carregar a imagem.')
    img.src = String(reader.result)
  }
  reader.onerror = () => emit('error', 'Falha ao ler o arquivo.')
  reader.readAsDataURL(file)
}

function remove() {
  emit('update:modelValue', null)
}

// ---------------------------------------------------------------------------
// Crop stage (pan + zoom)
// ---------------------------------------------------------------------------
const VP = 300 // maior lado do viewport de recorte, em px de tela
const cropOpen = ref(false)
const imgSrc = ref('')
const naturalW = ref(0)
const naturalH = ref(0)
const zoom = ref(1)
const offset = reactive({ x: 0, y: 0 })

const effAspect = computed(() => (props.circular ? 1 : props.aspectRatio || 1))
const vpW = computed(() => (effAspect.value >= 1 ? VP : Math.round(VP * effAspect.value)))
const vpH = computed(() => (effAspect.value >= 1 ? Math.round(VP / effAspect.value) : VP))
const baseScale = computed(() =>
  naturalW.value && naturalH.value
    ? Math.max(vpW.value / naturalW.value, vpH.value / naturalH.value)
    : 1,
)
const dispScale = computed(() => baseScale.value * zoom.value)
const dispW = computed(() => naturalW.value * dispScale.value)
const dispH = computed(() => naturalH.value * dispScale.value)

function clampOffset() {
  offset.x = Math.min(0, Math.max(vpW.value - dispW.value, offset.x))
  offset.y = Math.min(0, Math.max(vpH.value - dispH.value, offset.y))
}
watch(zoom, clampOffset)

const imgStyle = computed(() => ({
  width: `${dispW.value}px`,
  height: `${dispH.value}px`,
  transform: `translate(${offset.x}px, ${offset.y}px)`,
}))

// drag to pan
const dragging = ref(false)
let dragStart = { x: 0, y: 0, ox: 0, oy: 0 }
function onPointerDown(e: PointerEvent) {
  dragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  dragStart = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
}
function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  offset.x = dragStart.ox + (e.clientX - dragStart.x)
  offset.y = dragStart.oy + (e.clientY - dragStart.y)
  clampOffset()
}
function onPointerUp() {
  dragging.value = false
}

function outputType(): string {
  if (props.circular) return 'image/png'
  return originalType === 'image/jpeg' ||
    originalType === 'image/png' ||
    originalType === 'image/webp'
    ? originalType
    : 'image/png'
}
function outputName(type: string): string {
  const ext = type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg'
  return `${originalName.replace(/\.[^.]+$/, '') || 'image'}.${ext}`
}

function confirmCrop() {
  if (!cropImage) return
  const scale = dispScale.value
  const sx = -offset.x / scale
  const sy = -offset.y / scale
  const sw = vpW.value / scale
  const sh = vpH.value / scale
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(sw))
  canvas.height = Math.max(1, Math.round(sh))
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    emit('error', 'Canvas indisponível neste ambiente.')
    return
  }
  if (props.circular) {
    ctx.beginPath()
    ctx.ellipse(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      canvas.height / 2,
      0,
      0,
      Math.PI * 2,
    )
    ctx.clip()
  }
  ctx.drawImage(cropImage, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
  const type = outputType()
  canvas.toBlob(
    (blob) => {
      if (!blob) {
        emit('error', 'Falha ao processar a imagem.')
        return
      }
      emit('update:modelValue', new File([blob], outputName(type), { type }))
      cropOpen.value = false
    },
    type,
    0.92,
  )
}
</script>

<template>
  <div class="w-imgcropper">
    <div
      class="w-imgcropper-preview"
      :class="{ 'is-circular': circular, 'is-empty': !previewSrc }"
      :style="{ width: `${width}px`, height: `${height}px` }"
    >
      <template v-if="previewSrc">
        <img :src="previewSrc" alt="" class="w-imgcropper-img" />
        <div class="w-imgcropper-actions">
          <Button
            type="button"
            icon="pi pi-pencil"
            rounded
            text
            aria-label="Trocar imagem"
            @click="openPicker"
          />
          <Button
            type="button"
            icon="pi pi-trash"
            rounded
            text
            severity="danger"
            aria-label="Remover imagem"
            @click="remove"
          />
        </div>
      </template>
      <slot v-else name="placeholder" :open="openPicker">
        <button type="button" class="w-imgcropper-empty" @click="openPicker">
          <i class="pi pi-image" />
          <span>Selecionar imagem</span>
        </button>
      </slot>
    </div>

    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      class="w-imgcropper-file"
      @change="onFileChange"
    />

    <Dialog
      v-model:visible="cropOpen"
      :append-to="tabHost?.hostEl.value ?? 'body'"
      modal
      header="Ajustar imagem"
      :dismissable-mask="false"
      :style="{ width: 'auto' }"
    >
      <div class="w-imgcropper-stage">
        <div
          class="w-imgcropper-viewport"
          :class="{ 'is-circular': circular }"
          :style="{ width: `${vpW}px`, height: `${vpH}px` }"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointerleave="onPointerUp"
        >
          <img
            v-if="imgSrc"
            :src="imgSrc"
            alt=""
            class="w-imgcropper-cropimg"
            :style="imgStyle"
            draggable="false"
          />
          <div class="w-imgcropper-stencil" :class="{ 'is-circular': circular }"></div>
        </div>
        <div class="w-imgcropper-zoom">
          <i class="pi pi-search-minus" />
          <Slider v-model="zoom" :min="1" :max="4" :step="0.01" class="w-imgcropper-slider" />
          <i class="pi pi-search-plus" />
        </div>
      </div>
      <template #footer>
        <Button type="button" label="Cancelar" text @click="cropOpen = false" />
        <Button type="button" label="Confirmar" @click="confirmCrop" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.w-imgcropper-preview {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid var(--p-content-border-color, #e2e8f0);
  background: var(--p-content-background, #f8fafc);
}
.w-imgcropper-preview.is-circular {
  border-radius: 50%;
}
.w-imgcropper-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.w-imgcropper-actions {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 4px;
  background: color-mix(in srgb, #000 45%, transparent);
  opacity: 0;
  transition: opacity 0.15s ease;
}
.w-imgcropper-preview:hover .w-imgcropper-actions,
.w-imgcropper-preview:focus-within .w-imgcropper-actions {
  opacity: 1;
}
.w-imgcropper-empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  border: none;
  background: transparent;
  color: var(--p-text-muted-color, #64748b);
  font-size: 0.85rem;
}
.w-imgcropper-empty i {
  font-size: 1.5rem;
}
.w-imgcropper-file {
  display: none;
}
.w-imgcropper-stage {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
.w-imgcropper-viewport {
  position: relative;
  overflow: hidden;
  touch-action: none;
  cursor: grab;
  background: #1e1e1e;
  border-radius: 4px;
}
.w-imgcropper-viewport:active {
  cursor: grabbing;
}
.w-imgcropper-viewport.is-circular {
  border-radius: 50%;
}
.w-imgcropper-cropimg {
  position: absolute;
  top: 0;
  left: 0;
  max-width: none;
  user-select: none;
  -webkit-user-drag: none;
}
.w-imgcropper-stencil {
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow: 0 0 0 1px color-mix(in srgb, #fff 60%, transparent) inset;
}
.w-imgcropper-stencil.is-circular {
  border-radius: 50%;
}
.w-imgcropper-zoom {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  color: var(--p-text-muted-color, #64748b);
}
.w-imgcropper-slider {
  flex: 1;
}
</style>
