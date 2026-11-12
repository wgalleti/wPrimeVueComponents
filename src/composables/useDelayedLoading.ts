import { onScopeDispose, readonly, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

export interface UseDelayedLoadingOptions {
  /** Milissegundos de carregamento antes de o esqueleto aparecer (valor, ref ou getter). Default 150. */
  delay?: MaybeRefOrGetter<number>
}

/**
 * Esqueleto sem piscar: `showSkeleton` só vira true se o carregamento passar de `delay` ms
 * e volta a false assim que termina. Só decide o que desenhar — nunca segura o dado.
 */
export function useDelayedLoading(
  loading: MaybeRefOrGetter<boolean>,
  { delay = 150 }: UseDelayedLoadingOptions = {},
) {
  const showSkeleton = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const clear = () => {
    if (timer !== undefined) clearTimeout(timer)
    timer = undefined
  }

  watch(
    () => toValue(loading),
    (active) => {
      clear()
      if (!active) {
        showSkeleton.value = false
        return
      }
      timer = setTimeout(() => {
        timer = undefined
        showSkeleton.value = true
      }, toValue(delay))
    },
    { immediate: true },
  )

  onScopeDispose(clear)

  return { showSkeleton: readonly(showSkeleton) }
}
