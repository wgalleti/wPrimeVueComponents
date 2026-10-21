import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue'
import { BREAKPOINTS } from '@/composables/useBreakpoint'

/** Folga na volta do card para a grade. Trocar de modo muda a altura e pode pôr
 *  ou tirar a barra de rolagem vertical da página (~15px de largura): sem folga,
 *  rente ao limite, a troca alteraria a própria medida que a decidiu. */
const HISTERESE = 24

/**
 * Decide se a grade de um componente vira card pela largura do PRÓPRIO
 * elemento (ResizeObserver), não pela da janela — com a barra lateral do app a
 * janela passa de 840 muito antes de a tabela caber. Interno: é a régua comum do
 * `WEditableTable` e do `WCrudView`, não API da suíte.
 *
 * - `raiz`: o elemento cuja largura é a régua.
 * - `sonda`: uma caixa com a largura do piso da grade, que o navegador resolve
 *   (rem, tokens, calc do app) e o observer lê em px. Opcional: sem ela o piso é
 *   0 ("não sei") e vale só a régua de 840.
 * - `regua`: largura mínima abaixo da qual é card mesmo com o piso cabendo.
 *   Default 840 (`BREAKPOINTS.retrato`). Com 0 só o piso decide — piso 0 aí é
 *   "nunca card", porque não há régua nenhuma a respeitar.
 *
 * Tem de ser JS e não `@container`: o card troca marcação, e o CSS só segue a
 * classe que sai de `estreito` — uma fonte só, JS e CSS nunca discordam. O modo
 * (`auto`/`never`/`always`) fica no componente: aqui sai só a medida.
 */
export function useCardFit(
  raiz: Ref<HTMLElement | null>,
  sonda: Ref<HTMLElement | null>,
  { regua = BREAKPOINTS.retrato }: { regua?: number } = {},
) {
  const estreito = ref(false)
  let largura = 0
  let piso = 0
  let observer: ResizeObserver | null = null
  let quadro = 0
  let trocou = false

  /** Card quando a largura não comporta a grade: abaixo da régua (840, ou a
   *  dada) OU do piso, o que for maior. Piso 0 é "não sei" (jsdom, sem colunas),
   *  nunca "cabe": vale só a régua — e com régua 0 nunca é card. Largura 0 é elemento escondido (aba inativa, `v-show`,
   *  KeepAlive): mantém o modo, senão a tabela piscaria para card ao voltar. As
   *  duas medidas independem do modo — a sonda tem a largura do piso em qualquer
   *  modo —, e a folga cobre o que o modo mexe na página. A folga só vale depois
   *  de uma troca feita pelo observer: o card da montagem não mexeu em nada, e
   *  com ela a área que monta 2px estreita (barra lateral assentando) ficaria
   *  presa em card a 842px. */
  function decidir(): boolean | null {
    if (largura <= 0) return null
    const limite = Math.max(regua, piso)
    const folga = estreito.value && trocou ? HISTERESE : 0
    return largura < limite + folga
  }

  function aplicar(proximo: boolean | null) {
    if (proximo == null || proximo === estreito.value) return
    // Trocar a classe no próprio callback muda a altura do elemento observado e o
    // navegador dispara "ResizeObserver loop…" no `window` — o app consumidor
    // manda isso para o monitoramento. O quadro seguinte aplica sem laço.
    cancelAnimationFrame(quadro)
    quadro = requestAnimationFrame(() => {
      estreito.value = proximo
      trocou = true
    })
  }

  onMounted(() => {
    if (!raiz.value) return
    // Medida síncrona antes da primeira pintura: sem ela o tablet veria a grade
    // por um quadro antes de virar card.
    largura = raiz.value.getBoundingClientRect().width
    piso = sonda.value?.getBoundingClientRect().width ?? 0
    const inicial = decidir()
    if (inicial != null) estreito.value = inicial
    if (typeof ResizeObserver === 'undefined') return
    observer = new ResizeObserver((entries) => {
      // Dois alvos no mesmo observer: o elemento e a sonda do piso (que muda com
      // colunas, densidade ou fonte). Cada entrada atualiza a sua medida.
      for (const entry of entries) {
        if (sonda.value && entry.target === sonda.value) piso = entry.contentRect.width
        else largura = entry.contentRect.width
      }
      aplicar(decidir())
    })
    observer.observe(raiz.value)
    if (sonda.value) observer.observe(sonda.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    cancelAnimationFrame(quadro)
  })

  return { estreito: readonly(estreito) }
}
