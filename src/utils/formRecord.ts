/**
 * Regras de formulário que independem de onde o registro é gravado.
 *
 * Nasceram dentro do `useCrudManager` (que grava numa API) e saíram para cá quando o
 * `useSubviewCrud` passou a precisar das mesmas: um form é um form, o destino do
 * payload é que muda. Manter uma cópia em cada manager faria as duas divergirem no
 * primeiro `FieldType` novo.
 */
import type { FieldDef } from '@/types/field'
import { parseDate, toDateString, toDateTimeString } from './dates'
import { stripMask } from './masks'

/** Valor inicial de cada campo: `defaultValue` (avaliado, se função) ou `null`. */
export function getFieldDefaults(fields: FieldDef[]): Record<string, unknown> {
  const defaults: Record<string, unknown> = {}
  for (const f of fields) {
    defaults[f.field] =
      f.defaultValue !== undefined
        ? typeof f.defaultValue === 'function'
          ? (f.defaultValue as () => unknown)()
          : f.defaultValue
        : null
  }
  return defaults
}

/**
 * Lê um registro existente para dentro do form.
 *
 * Data vem do servidor como string e o `WDatePicker` trabalha com `Date` — por isso a
 * volta por `parseDate`. Devolve o snapshot dos valores carregados, que o chamador usa
 * como base do diff quando quiser mandar só o que mudou.
 */
export function loadItemIntoRecord(
  item: Record<string, unknown>,
  fields: FieldDef[],
  target: Record<string, unknown>,
): Record<string, unknown> {
  const snapshot: Record<string, unknown> = {}
  for (const f of fields) {
    let value = item[f.field] !== undefined ? item[f.field] : null
    if (value && (f.type === 'date' || f.type === 'datetime') && typeof value === 'string') {
      value = parseDate(value)
    }
    target[f.field] = value
    snapshot[f.field] = value
  }
  return snapshot
}

/**
 * Converte o form no registro que vai ser gravado: data vira string, FK vira id, campo
 * mascarado perde a máscara. Devolve objeto novo — o form não é tocado.
 */
export function convertFormRecord(
  record: Record<string, unknown>,
  fields: FieldDef[],
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...record }
  for (const f of fields) {
    const val = out[f.field]

    // Datas
    if (f.type === 'date' && val instanceof Date) {
      out[f.field] = toDateString(val)
    } else if (f.type === 'datetime' && val instanceof Date) {
      out[f.field] = toDateTimeString(val)
    }

    // FK — extrair o ID do objeto selecionado
    if (f.type === 'fk' && val !== null && typeof val === 'object') {
      const key = f.optionValue || 'id'
      out[f.field] = (val as Record<string, unknown>)[key] ?? val
    }

    // Máscaras — strip para gravar só dígitos
    if ((f.type === 'mask' || f.type === 'cpf_cnpj') && typeof val === 'string') {
      out[f.field] = stripMask(val)
    }
  }
  return out
}

/**
 * Primeira mensagem de erro do form, ou `null` se está tudo certo.
 *
 * A ordem importa: o `validate` do campo vence a obrigatoriedade, para a mensagem
 * específica ("CNPJ inválido") aparecer no lugar da genérica.
 */
export function validateFormRecord(
  fields: FieldDef[],
  formData: Record<string, unknown>,
): string | null {
  for (const f of fields) {
    if (f.validate) {
      const result = f.validate(formData[f.field])
      if (result) return result
    }
    if (f.required) {
      const val = formData[f.field]
      if (val === null || val === undefined || val === '') {
        return `${f.label} é obrigatório`
      }
    }
  }
  return null
}
