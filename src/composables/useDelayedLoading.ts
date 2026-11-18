import { onScopeDispose, readonly, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

export interface UseDelayedLoadingOptions {
  /** Milissegundos de carregamento antes de o esqueleto aparecer (valor, ref ou getter). Default 150. */
  delay?: MaybeRefOrGetter<number>
  /**
   * Milissegundos mínimos de `showSkeleton` em tela depois que apareceu, mesmo que o carregamento
   * termine antes (valor, ref ou getter). Evita o clarão do loader de marca. Default 0: some na hora.
   */
  minDuration?: MaybeRefOrGetter<number>
}

/**
 * Esqueleto sem piscar: `showSkeleton` só vira true se o carregamento passar de `delay` ms
 * e volta a false assim que termina (ou, com `minDuration`, assim que completar esse tempo em
 * tela). Só decide o que desenhar — nunca segura o dado.
 */
export function useDelayedLoading(
  loading: MaybeRefOrGetter<boolean>,
  { delay = 150, minDuration = 0 }: UseDelayedLoadingOptions = {},
) {
  const showSkeleton = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined
  let shownAt = 0

  const clear = () => {
    if (timer !== undefined) clearTimeout(timer)
    timer = undefined
  }

  watch(
    () => toValue(loading),
    (active) => {
      clear()
      if (!active) {
        const restante = toValue(minDuration) - (Date.now() - shownAt)
        if (showSkeleton.value && restante > 0) {
          timer = setTimeout(() => {
            timer = undefined
            showSkeleton.value = false
          }, restante)
        } else showSkeleton.value = false
        return
      }
      if (showSkeleton.value) return
      timer = setTimeout(() => {
        timer = undefined
        shownAt = Date.now()
        showSkeleton.value = true
      }, toValue(delay))
    },
    { immediate: true },
  )

  onScopeDispose(clear)

  return { showSkeleton: readonly(showSkeleton) }
}
