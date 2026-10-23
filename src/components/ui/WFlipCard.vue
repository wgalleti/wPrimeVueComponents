<script setup lang="ts">
import { computed } from 'vue'
import type { FlipCardLabels, FlipCardSlotProps } from '@/types/flipCard'

/**
 * Cartão de duas faces que vira por ação de quem consome: o botão mora dentro
 * dos slots e chama `flip()` do escopo (ou o pai muda `v-model:flipped`).
 *
 * Só a face ativa é renderizada, então a altura do cartão segue a face visível.
 * A troca é uma meia-volta em `rotateY` (sai 0→90°, entra −90°→0); com
 * `prefers-reduced-motion` vira só opacidade. Depois que a face nova entra, o
 * foco vai para o primeiro `[data-w-flip-focus]` dela ou, sem marcação, para a
 * própria face — nunca na montagem.
 */
defineOptions({ name: 'WFlipCard' })

const props = withDefaults(
  defineProps<{
    /** `aria-label` de cada face (role="group"). Padrão: "Frente" e "Verso". */
    labels?: FlipCardLabels
  }>(),
  { labels: () => ({}) },
)

/** Face visível: `false` mostra a frente, `true` o verso. Funciona sem v-model. */
const flipped = defineModel<boolean>('flipped', { default: false })

defineSlots<{
  /** Conteúdo da frente. */
  front?(props: FlipCardSlotProps): unknown
  /** Conteúdo do verso. */
  back?(props: FlipCardSlotProps): unknown
}>()

const frontLabel = computed(() => props.labels.front ?? 'Frente')
const backLabel = computed(() => props.labels.back ?? 'Verso')

function flip(value?: boolean) {
  flipped.value = value ?? !flipped.value
}

// Sem `appear` na Transition, after-enter não dispara na montagem: o foco só
// se move quando a face troca. Sem animação (reduced-motion), o hook dispara
// do mesmo jeito, no quadro seguinte.
function onAfterEnter(el: Element) {
  const face = el as HTMLElement
  const alvo = face.querySelector<HTMLElement>('[data-w-flip-focus]') ?? face
  alvo.focus()
}
</script>

<template>
  <div class="w-flip-card">
    <Transition name="w-flip-card" mode="out-in" @after-enter="onAfterEnter">
      <div
        v-if="!flipped"
        key="front"
        class="w-flip-card__face w-flip-card__face--front"
        role="group"
        :aria-label="frontLabel"
        tabindex="-1"
      >
        <slot name="front" :flipped="flipped" :flip="flip" />
      </div>
      <div
        v-else
        key="back"
        class="w-flip-card__face w-flip-card__face--back"
        role="group"
        :aria-label="backLabel"
        tabindex="-1"
      >
        <slot name="back" :flipped="flipped" :flip="flip" />
      </div>
    </Transition>
  </div>
</template>
