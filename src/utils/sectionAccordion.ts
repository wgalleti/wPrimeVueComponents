import type { ComputedRef, InjectionKey } from 'vue'

/**
 * Contrato entre WSectionAccordion (container) e WSectionPanel (seção). Vive num
 * módulo próprio porque `<script setup>` não exporta valores — a chave precisa
 * ser importável pelos dois SFCs.
 */
export interface SectionAccordionContext {
  /** A seção `value` está aberta? */
  isOpen: (value: string) => boolean
  /** Abre a seção fechada, fecha a aberta. */
  toggle: (value: string) => void
  /** Trava o clique no cabeçalho de todas as seções. */
  disabled: ComputedRef<boolean>
}

export const W_SECTION_ACCORDION_KEY: InjectionKey<SectionAccordionContext> =
  Symbol('w-section-accordion')
