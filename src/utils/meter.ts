// Regra de cor do WMeter quando a severidade não é informada.

export type MeterSeverity = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

/** Tolerância abaixo do ritmo que ainda é "atenção" (warning), não "atrasado". */
export const METER_WARNING_BAND = 0.1

/**
 * - sem meta (null/0): `neutral`;
 * - com ritmo (`expected`): `success` no ritmo ou acima, `warning` até 10%
 *   abaixo, `danger` abaixo disso;
 * - sem ritmo: `success` com a meta batida, senão `primary` (em andamento —
 *   sem ritmo não há como dizer que está atrasado).
 */
export function meterSeverity({
  value,
  goal,
  expected,
}: {
  value: number
  goal?: number | null
  expected?: number | null
}): MeterSeverity {
  if (goal == null || goal <= 0) return 'neutral'
  if (expected != null && expected > 0) {
    if (value >= expected) return 'success'
    if (value >= expected * (1 - METER_WARNING_BAND)) return 'warning'
    return 'danger'
  }
  return value >= goal ? 'success' : 'primary'
}
