<script lang="ts">
/** `useId` é Vue 3.5 e o peer aceita 3.4: um contador de MÓDULO (fora do setup,
 *  que roda por instância) basta para ligar `aria-controls` ao corpo. */
let seq = 0
const proximoId = () => `w-section-panel-${++seq}`
</script>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { W_SECTION_ACCORDION_KEY } from '@/utils/sectionAccordion'

/**
 * Uma seção do WSectionAccordion: cabeçalho clicável com ícone tonal, nome, frase
 * que diz o que a seção é, contagem de registros e chevron; corpo colapsável.
 *
 * O corpo fica montado quando fechado (`v-show`): uma grade de CRUD ali dentro
 * não refaz a request a cada abre-e-fecha.
 *
 * Fora de um WSectionAccordion o componente ainda funciona, como card colapsável
 * avulso com estado próprio (começa aberto).
 */
const props = withDefaults(
  defineProps<{
    /** Identificador da seção — é o que o `v-model` do acordeão carrega. */
    value: string
    title: string
    /** Frase abaixo do título: o que a seção é e o que acontece com ela. */
    description?: string
    /** Ícone PrimeIcons do tile à esquerda (ex.: `pi pi-list`). */
    icon?: string
    /** Badge de contagem à direita (registros da seção). */
    count?: number | string
    disabled?: boolean
  }>(),
  { disabled: false },
)

const accordion = inject(W_SECTION_ACCORDION_KEY, null)

/** Sem acordeão o componente é dono do próprio estado (card colapsável avulso). */
const localOpen = ref(true)

const open = computed(() => (accordion ? accordion.isOpen(props.value) : localOpen.value))
const isDisabled = computed(() => props.disabled || (accordion?.disabled.value ?? false))
const contentId = proximoId()

function toggle() {
  if (isDisabled.value) return
  if (accordion) accordion.toggle(props.value)
  else localOpen.value = !localOpen.value
}
</script>

<template>
  <section class="w-section-panel" :class="{ 'w-section-panel--open': open }">
    <div class="w-section-panel__header">
      <button
        type="button"
        class="w-section-panel__trigger"
        :aria-expanded="open"
        :aria-controls="contentId"
        :disabled="isDisabled"
        @click="toggle"
      >
        <span v-if="icon || $slots.icon" class="w-section-panel__icon" aria-hidden="true">
          <slot name="icon">
            <i :class="icon" />
          </slot>
        </span>
        <span class="w-section-panel__text">
          <span class="w-section-panel__title">{{ title }}</span>
          <span v-if="description" class="w-section-panel__description">{{ description }}</span>
        </span>
        <span v-if="count != null" class="w-section-panel__count">{{ count }}</span>
        <i
          class="w-section-panel__chevron"
          :class="open ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
          aria-hidden="true"
        />
      </button>
      <div v-if="$slots.actions" class="w-section-panel__actions">
        <slot name="actions" :open="open" />
      </div>
    </div>

    <div v-show="open" :id="contentId" class="w-section-panel__content">
      <slot />
    </div>
  </section>
</template>
