<script setup lang="ts">
import Button from 'primevue/button'
import type { RouteLocationRaw } from 'vue-router'
import type { ButtonSize, ButtonVariant } from '@/types/button'

/**
 * Botão da suíte sobre o `Button` do PrimeVue: o app escolhe o papel (`variant`) e o tamanho,
 * nunca `severity`/`text`/`outlined` soltos. `loading` bloqueia o clique sem mudar a largura;
 * `to` vira RouterLink; `iconOnly` exige `ariaLabel`.
 */
defineOptions({ name: 'WButton' })

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    /** Ícone PrimeIcons (`pi pi-check`). */
    icon?: string
    iconPos?: 'left' | 'right' | 'top' | 'bottom'
    label?: string
    /** Mostra o spinner, bloqueia o clique e marca `aria-busy`; a largura não muda. */
    loading?: boolean
    disabled?: boolean
    /** Só o ícone (redondo): exige `ariaLabel`. */
    iconOnly?: boolean
    ariaLabel?: string
    /** Destino: o botão vira RouterLink (exige vue-router). */
    to?: RouteLocationRaw
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    iconPos: 'left',
    loading: false,
    disabled: false,
    type: 'button',
  },
)

defineSlots<{
  /** Substitui o conteúdo inteiro (ícone + rótulo). */
  default?: () => unknown
}>()

if (import.meta.env.DEV && props.iconOnly && !props.ariaLabel) {
  console.warn('[WButton] `iconOnly` sem `ariaLabel`: o botão fica sem nome para leitor de tela.')
}
</script>

<template>
  <Button
    :as="to ? 'router-link' : undefined"
    :to="to"
    :type="to ? undefined : type"
    :label="iconOnly ? undefined : label"
    :icon="icon"
    :icon-pos="iconPos"
    :size="size === 'sm' ? 'small' : undefined"
    :severity="variant === 'danger' ? 'danger' : variant === 'ghost' ? 'secondary' : undefined"
    :outlined="variant === 'secondary'"
    :text="variant === 'ghost' || (variant === 'danger' && iconOnly)"
    :rounded="iconOnly"
    :loading="loading"
    :disabled="disabled || loading"
    :aria-label="ariaLabel ?? (iconOnly ? label : undefined)"
    :aria-busy="loading || undefined"
    :class="[
      'w-button',
      `w-button--${variant}`,
      `w-button--${size}`,
      { 'w-button--loading': loading, 'w-button--bare': !icon && !iconOnly },
    ]"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </Button>
</template>
