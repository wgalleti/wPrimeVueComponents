import { getCurrentScope, onScopeDispose, toValue, watch, type MaybeRefOrGetter } from 'vue'

/**
 * Registro único de formulários com alteração não salva no app.
 *
 * É a mesma lista que alimenta o aviso de saída da página (`beforeunload`) e que impede a
 * recarga automática da versão publicada (`installPublishedVersion`) — uma fonte só.
 */
const pendentes = new Set<string>()
let avisoInstalado = false
let sequencia = 0

function aoSairDaPagina(evento: BeforeUnloadEvent) {
  if (pendentes.size === 0) return
  evento.preventDefault()
  // Navegadores antigos só mostram o aviso com returnValue preenchido.
  evento.returnValue = ''
}

function instalarAviso() {
  if (avisoInstalado || typeof window === 'undefined') return
  window.addEventListener('beforeunload', aoSairDaPagina)
  avisoInstalado = true
}

/** Lista os formulários pendentes agora (chaves registradas). */
export function listPendingForms(): string[] {
  return [...pendentes]
}

/** Marca ou desmarca uma chave como pendente, fora de componente. */
export function setPendingForm(chave: string, pendente: boolean): void {
  if (pendente) {
    pendentes.add(chave)
    instalarAviso()
  } else {
    pendentes.delete(chave)
  }
}

/**
 * Mantém a chave pendente enquanto `sujo` for verdadeiro e o escopo estiver vivo.
 *
 * ```ts
 * usePendingForm(() => crud.dialogVisible.value && crud.isDirty.value)
 * ```
 */
export function usePendingForm(sujo: MaybeRefOrGetter<boolean>, chave?: string): void {
  const id = chave ?? `w-form-${++sequencia}`
  watch(() => Boolean(toValue(sujo)), (valor) => setPendingForm(id, valor), { immediate: true })
  if (getCurrentScope()) onScopeDispose(() => setPendingForm(id, false))
}

/** Só para teste: zera o registro. */
export function __resetPendingForms(): void {
  pendentes.clear()
}
