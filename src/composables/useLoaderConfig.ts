import { inject } from 'vue'
import { W_CONFIG_KEY } from '@/types/plugin'
import type { WLoaderConfigResolved, WPluginConfig } from '@/types/plugin'

export const LOADER_DEFAULT_DELAY = 300
export const LOADER_DEFAULT_MIN_DURATION = 500

const ms = (v: unknown, fallback: number) =>
  typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : fallback

/**
 * Loader de marca do app, com os padrões aplicados, ou `null` quando não há `loader` na
 * configuração (ou ele não tem `src`). Tolera o consumidor que provê `W_CONFIG_KEY` à mão, sem
 * o plugin, e o que não provê nada: nos dois casos `null` e o componente segue como sempre foi.
 */
export function useLoaderConfig(): WLoaderConfigResolved | null {
  const loader = inject<WPluginConfig | undefined>(W_CONFIG_KEY, undefined)?.loader
  if (!loader?.src) return null
  return {
    ...loader,
    delay: ms(loader.delay, LOADER_DEFAULT_DELAY),
    minDuration: ms(loader.minDuration, LOADER_DEFAULT_MIN_DURATION),
  }
}
