export function stripMask(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatCpf(value: string | null | undefined): string {
  if (!value) return '—'
  const digits = stripMask(value)
  if (digits.length !== 11) return value
  return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

export function formatCnpj(value: string | null | undefined): string {
  if (!value) return '—'
  const digits = stripMask(value)
  if (digits.length !== 14) return value
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5',
  )
}

export function formatCpfCnpj(value: string | null | undefined): string {
  if (!value) return '—'
  const digits = stripMask(value)
  if (digits.length === 11) return formatCpf(value)
  if (digits.length === 14) return formatCnpj(value)
  return value
}

export function formatTelefone(value: string | null | undefined): string {
  if (!value) return '—'
  const digits = stripMask(value)
  if (digits.length === 11)
    return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  if (digits.length === 10)
    return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
  return value
}

export function validateCpf(value: string | null | undefined): string | null {
  if (!value) return null
  const cpf = stripMask(value)
  if (cpf.length !== 11) return 'CPF deve ter 11 dígitos.'
  if (/^(\d)\1{10}$/.test(cpf)) return 'CPF inválido.'
  let soma = 0
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i)
  let resto = soma % 11
  const d1 = resto < 2 ? 0 : 11 - resto
  if (parseInt(cpf[9]) !== d1) return 'CPF inválido.'
  soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i)
  resto = soma % 11
  const d2 = resto < 2 ? 0 : 11 - resto
  if (parseInt(cpf[10]) !== d2) return 'CPF inválido.'
  return null
}

export function validateCnpj(value: string | null | undefined): string | null {
  if (!value) return null
  const cnpj = stripMask(value)
  if (cnpj.length !== 14) return 'CNPJ deve ter 14 dígitos.'
  if (/^(\d)\1{13}$/.test(cnpj)) return 'CNPJ inválido.'
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  let soma = 0
  for (let i = 0; i < 12; i++) soma += parseInt(cnpj[i]) * pesos1[i]
  let resto = soma % 11
  const d1 = resto < 2 ? 0 : 11 - resto
  if (parseInt(cnpj[12]) !== d1) return 'CNPJ inválido.'
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  soma = 0
  for (let i = 0; i < 13; i++) soma += parseInt(cnpj[i]) * pesos2[i]
  resto = soma % 11
  const d2 = resto < 2 ? 0 : 11 - resto
  if (parseInt(cnpj[13]) !== d2) return 'CNPJ inválido.'
  return null
}

export function validateCpfCnpj(
  value: string | null | undefined,
): string | null {
  if (!value) return null
  const digits = stripMask(value)
  if (digits.length === 11) return validateCpf(value)
  if (digits.length === 14) return validateCnpj(value)
  return 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.'
}
