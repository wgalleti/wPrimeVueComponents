import { computed, ref, watch, type Ref } from 'vue'
import { useUrlState } from './useUrlState'

export interface UseUrlParamOptions {
  /**
   * Valida o valor que veio da URL. Quem não passa é tratado como ausente e a chave é
   * removida da URL. Use sempre que o valor alimentar uma busca ou ação (uuid, código,
   * nome de serviço) — texto livre da query nunca vai direto para o app.
   */
  accept?: (value: string) => boolean
}

/**
 * Uma chave da query (`?name=valor`) como ref: `null` quando ausente; atribuir grava via
 * `router.replace` (sem empilhar histórico) e `null` remove a chave. Reage quando a query
 * muda com a tela montada (link, edição da URL, Voltar). Dentro de aba de rota oculta não
 * suja a URL da aba ativa: a escrita espera a aba voltar (regra do `useUrlState`).
 *
 * Sem `vue-router` vira um ref local em memória (e avisa em dev).
 */
export function useUrlParam(name: string, options: UseUrlParamOptions = {}): Ref<string | null> {
  const url = useUrlState()
  if (!url) return ref<string | null>(null)

  // Espelho local: numa aba oculta a escrita fica pendente, mas o ref precisa refletir já.
  const current = ref<string | null>(null)
  watch(
    url.ref(name),
    (v) => {
      if (v !== undefined && !(options.accept?.(v) ?? true)) url.write({ [name]: null })
      current.value = v !== undefined && (options.accept?.(v) ?? true) ? v : null
    },
    { immediate: true, flush: 'sync' },
  )

  return computed({
    get: () => current.value,
    set: (v) => {
      current.value = v
      url.write({ [name]: v })
    },
  })
}
