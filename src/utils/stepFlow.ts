import type { ComputedRef, InjectionKey } from 'vue'

/**
 * Contrato entre WStepFlow (container) e WStepSection (etapa). Vive num módulo
 * próprio porque `<script setup>` não exporta valores — a chave precisa ser
 * importável pelos dois SFCs.
 *
 * Quem é a última etapa (a que não desenha linha conectora) NÃO passa por aqui:
 * é `:last-child` no CSS. Registrar as etapas em runtime só serviria para
 * descobrir, com um tick de atraso, algo que o seletor já sabe na primeira
 * pintura.
 */
/** Como o flow arruma as etapas: coluna (padrão) ou régua no topo. */
export type StepFlowOrientation = 'vertical' | 'horizontal'

export interface StepFlowContext {
  /** Etapa aberta. `0` = todas fechadas. */
  active: ComputedRef<number>
  /** Alterna a etapa: abre a informada, ou fecha tudo se já era a aberta. */
  toggle: (step: number) => void
  disabled: ComputedRef<boolean>
  /**
   * Orientação do flow. Vem pelo contexto de propósito: a etapa se desenha
   * conforme o container, sem o consumidor repetir a prop em cada WStepSection.
   * Fora de um flow a etapa assume `vertical` (card colapsável avulso).
   */
  orientation: ComputedRef<StepFlowOrientation>
}

export const W_STEP_FLOW_KEY: InjectionKey<StepFlowContext> = Symbol('w-step-flow')
