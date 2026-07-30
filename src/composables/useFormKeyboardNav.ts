import { nextTick, type Ref } from 'vue'

/**
 * Navegação por teclado em formulários, estilo aplicação desktop (DevExpress):
 * - `focusFirst()` posiciona o foco no primeiro campo ativo (e seleciona o texto).
 * - `handleKeydown` faz o Enter pular para o próximo campo, até o botão de salvar.
 *
 * Sem watchers nem addEventListener manual: o `handleKeydown` é bindado via
 * `@keydown` no container (o Vue gerencia o listener) e `focusFirst` é chamado
 * no `@show` do Dialog. Shift+Tab / Tab continuam nativos.
 *
 * Regras do Enter (para não atrapalhar a semântica de cada componente):
 * - `textarea` → Enter é quebra de linha (não pula).
 * - `button` → Enter é o clique/submit nativo (não pula).
 * - overlay de dropdown aberto (Select/AutoComplete/DatePicker/MultiSelect) →
 *   Enter seleciona o item; só o Enter seguinte pula o foco.
 * - marque um elemento com `data-kbd-skip` para excluí-lo da sequência (ex.: o
 *   botão Cancelar, para o Enter ir direto ao Salvar).
 */

// Elementos que recebem foco por tabulação.
const FOCUSABLE = [
  'input:not([type="hidden"]):not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ')

// Painéis de dropdown do PrimeVue: quando presentes, o Enter deve selecionar.
const OPEN_OVERLAY = [
  '.p-select-overlay',
  '.p-autocomplete-overlay',
  '.p-multiselect-overlay',
  '.p-datepicker-panel',
  '.p-cascadeselect-overlay',
  '.p-treeselect-overlay',
].join(', ')

export interface FormKeyboardNavOptions {
  /** Liga/desliga a navegação (default: sempre ligada). */
  enabled?: () => boolean
  /** Chamado quando o Enter passa do último elemento sem próximo foco. */
  onSubmit?: () => void
}

export function useFormKeyboardNav(
  container: Ref<HTMLElement | null>,
  options: FormKeyboardNavOptions = {},
) {
  const isEnabled = () => (options.enabled ? options.enabled() : true)

  function focusables(): HTMLElement[] {
    const root = container.value
    if (!root) return []
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.getClientRects().length > 0 && !el.hasAttribute('data-kbd-skip'),
    )
  }

  function focusFirst(): void {
    if (!isEnabled()) return
    nextTick(() => {
      const els = focusables()
      const first = els.find((el) => el.tagName !== 'BUTTON') ?? els[0]
      if (!first) return
      first.focus()
      // Seleciona o conteúdo de inputs de texto para facilitar sobrescrever.
      const input = first as HTMLInputElement
      if (typeof input.select === 'function') {
        try {
          input.select()
        } catch {
          /* nem todo input suporta select() */
        }
      }
    })
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (!isEnabled() || e.key !== 'Enter' || e.isComposing) return
    const target = e.target as HTMLElement
    if (target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON') return
    // Dropdown aberto → deixa o componente tratar o Enter (selecionar item).
    if (target.getAttribute('aria-expanded') === 'true') return
    if (document.querySelector(OPEN_OVERLAY)) return

    e.preventDefault()
    const els = focusables()
    const i = els.indexOf(target)
    if (i === -1) return
    const next = els[i + 1]
    if (next) next.focus()
    else options.onSubmit?.()
  }

  return { focusFirst, handleKeydown }
}
