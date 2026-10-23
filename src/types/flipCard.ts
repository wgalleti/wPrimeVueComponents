/** Rótulos acessíveis (`aria-label`) das faces do WFlipCard. */
export interface FlipCardLabels {
  front?: string
  back?: string
}

/** Escopo dos slots `front` e `back` do WFlipCard. */
export interface FlipCardSlotProps {
  /** `true` quando o verso é a face visível. */
  flipped: boolean
  /** Sem argumento alterna; `flip(true)`/`flip(false)` fixa a face. */
  flip: (value?: boolean) => void
}
