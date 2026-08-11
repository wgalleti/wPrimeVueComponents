<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { W_STEP_FLOW_KEY } from '@/utils/stepFlow'

/**
 * Uma etapa do WStepFlow: badge numerada + linha conectora, cabeçalho clicável
 * (título, contador e resumo) e corpo colapsável com rodapé de ação.
 *
 * A orientação NÃO é prop daqui: vem do contexto do flow. Na vertical a etapa é
 * um card na coluna; na horizontal o cabeçalho vira um trecho da régua e só o
 * corpo da etapa ativa é desenhado, embaixo, na largura inteira.
 *
 * Fora de um WStepFlow o componente ainda funciona: ele cai num estado local
 * aberto (e em vertical), para poder ser usado como card colapsável avulso.
 */
const props = withDefaults(
  defineProps<{
    /** Número da etapa (1-based) — é o valor que o `v-model` do flow carrega. */
    step: number
    title: string
    /** Texto à direita do título (o "resumo" da etapa fechada). */
    summary?: string
    /** Badge de contagem entre o título e o resumo. */
    count?: number | string
    disabled?: boolean
  }>(),
  { disabled: false },
)

const flow = inject(W_STEP_FLOW_KEY, null)

/** Sem flow o componente é dono do próprio estado (card colapsável avulso). */
const localOpen = ref(true)

const open = computed(() => (flow ? flow.active.value === props.step : localOpen.value))
const isDisabled = computed(() => props.disabled || (flow?.disabled.value ?? false))
const horizontal = computed(() => flow?.orientation.value === 'horizontal')
/** Fora do flow não há próxima etapa, então não há linha para ligar. Dentro do
 *  flow a linha existe sempre e o CSS a apaga na ponta (`:last-child` na
 *  vertical, `:first-child` na horizontal, onde a linha vem antes da badge). */
const hasLine = computed(() => flow !== null)
/**
 * "Já passei por aqui" — inferido da posição, não de validação: o componente não
 * conhece regra de negócio. Só a régua horizontal marca isso; a coluna vertical
 * continua exatamente como era.
 */
const done = computed(() => horizontal.value && flow != null && props.step < flow.active.value)

function toggle() {
  if (isDisabled.value) return
  if (flow) flow.toggle(props.step)
  else localOpen.value = !localOpen.value
}
</script>

<template>
  <div v-if="!horizontal" class="w-step-section" :class="{ 'w-step-section--open': open }">
    <div class="w-step-section__rail">
      <span
        class="w-step-section__badge"
        :class="{ 'w-step-section__badge--on': open }"
        aria-hidden="true"
      >
        {{ step }}
      </span>
      <span v-if="hasLine" class="w-step-section__line" />
    </div>

    <div class="w-step-section__body">
      <div class="w-step-section__card">
        <div class="w-step-section__header">
          <button
            type="button"
            class="w-step-section__trigger"
            :aria-expanded="open"
            :aria-current="open ? 'step' : undefined"
            :disabled="isDisabled"
            @click="toggle"
          >
            <i
              class="w-step-section__chevron"
              :class="open ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
            />
            <h2 class="w-step-section__title">{{ title }}</h2>
            <span v-if="count != null" class="w-step-section__count">{{ count }}</span>
            <span v-if="summary" class="w-step-section__summary">{{ summary }}</span>
          </button>
          <div v-if="$slots.actions" class="w-step-section__actions">
            <slot name="actions" :open="open" />
          </div>
        </div>

        <template v-if="open">
          <div class="w-step-section__content">
            <slot />
          </div>
          <div v-if="$slots.footer" class="w-step-section__footer">
            <slot name="footer" />
          </div>
        </template>
      </div>
    </div>
  </div>

  <div
    v-else
    class="w-step-section w-step-section--horizontal"
    :class="{ 'w-step-section--open': open, 'w-step-section--done': done }"
  >
    <div class="w-step-section__head">
      <span
        v-if="hasLine"
        class="w-step-section__line"
        :class="{ 'w-step-section__line--done': done || open }"
      />
      <button
        type="button"
        class="w-step-section__trigger"
        :aria-expanded="open"
        :aria-current="open ? 'step' : undefined"
        :disabled="isDisabled"
        @click="toggle"
      >
        <span
          class="w-step-section__badge"
          :class="{
            'w-step-section__badge--on': open,
            'w-step-section__badge--done': done,
          }"
          aria-hidden="true"
        >
          <i v-if="done" class="pi pi-check" />
          <template v-else>{{ step }}</template>
        </span>
        <h2 class="w-step-section__title">{{ title }}</h2>
        <span v-if="count != null" class="w-step-section__count">{{ count }}</span>
        <span v-if="summary" class="w-step-section__summary">{{ summary }}</span>
      </button>
      <div v-if="$slots.actions" class="w-step-section__actions">
        <slot name="actions" :open="open" />
      </div>
    </div>

    <div v-if="open" class="w-step-section__panel">
      <div class="w-step-section__content">
        <slot />
      </div>
      <div v-if="$slots.footer" class="w-step-section__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
