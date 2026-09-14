import { nextTick, type Ref } from 'vue'

/**
 * Navegação por teclado em formulários, estilo aplicação desktop (DevExpress):
 * - `focusFirst()` posiciona o foco no primeiro campo ativo (e seleciona o texto).
 * - `handleKeydown` faz o Enter pular para o próximo campo, até o botão de salvar.
 *
 * Sem watchers nem addEventListener manual: o `handleKeydown` é bindado via
 * `@keydown.capture` no container (o Vue gerencia o listener) e `focusFirst` é
 * chamado no `@show` do Dialog. Shift+Tab / Tab continuam nativos.
 *
 * Por que **capture**: o Select do PrimeVue abre o painel no Enter e o Vue
 * re-renderiza entre o listener dele e o do container — no bubble, o handler
 * já encontra o painel aberto e deixa passar, e o Enter vira "abrir, escolher,
 * avançar": três teclas para um campo já preenchido. No capture o handler vê o
 * Select ainda fechado e trata o Enter como Tab antes de o componente agir.
 * Quem binda em bubble (`@keydown`) continua funcionando, só sem esse ganho.
 *
 * Regras do Enter (para não atrapalhar a semântica de cada componente):
 * - `textarea` → Enter é quebra de linha (não pula).
 * - `button` → Enter é o clique/submit nativo (não pula). Exceção: opção de
 *   segmented/choice/SelectButton é campo, não ação — Enter pula o grupo
 *   inteiro (Espaço e clique escolhem).
 * - Select/MultiSelect FECHADO → Enter é Tab (o painel abre com Espaço ou seta).
 * - painel do PRÓPRIO campo aberto (`aria-expanded`: Select, AutoComplete,
 *   DatePicker, MultiSelect…) → Enter seleciona o item; só o Enter seguinte
 *   pula o foco. Painel aberto de outro campo (um filtro da página, por
 *   exemplo) não interfere.
 * - Enter num `input` nunca é o submit implícito do `<form>`: quem submete é o
 *   Enter no último campo (`onSubmit`) ou o botão de salvar.
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

// Componentes cujo Enter nativo, com o painel fechado, ABRE o painel. Para eles
// o Enter é Tab: o handler do componente não chega a rodar (ver capture acima).
const OPENS_ON_ENTER = '.p-select, .p-multiselect, .p-cascadeselect, .p-treeselect'

// Grupos de escolha única feitos de botões: o Enter numa opção pula o grupo
// inteiro, como se fosse um campo só.
const OPTION_GROUP = '.w-segmented, .w-choice, .p-selectbutton, [role="radiogroup"]'

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
    if (target.tagName === 'TEXTAREA') return
    const group = target.closest<HTMLElement>(OPTION_GROUP)
    if (target.tagName === 'BUTTON' && !group) return

    // Nada de submit implícito: o form só submete pelo `onSubmit` ou pelo botão.
    e.preventDefault()

    // Painel do próprio campo aberto → o componente trata o Enter (seleciona).
    if (target.closest('[aria-expanded="true"]')) return

    // Fechado, o Enter abriria o painel; aqui ele só avança. Só faz diferença
    // quando bindado em capture — em bubble o componente já rodou.
    if (target.closest(OPENS_ON_ENTER)) e.stopPropagation()

    const els = focusables()
    const i = els.indexOf(target)
    if (i === -1) return
    const next = els.slice(i + 1).find((el) => !group || !group.contains(el))
    if (next) next.focus()
    else options.onSubmit?.()
  }

  return { focusFirst, handleKeydown }
}
