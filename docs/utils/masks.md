# Mascaras

Funcoes para formatacao e validacao de CPF, CNPJ e telefone.

## Formatacao

### `formatCpf(value)`

```ts
formatCpf('12345678901')  // "123.456.789-01"
formatCpf(null)           // "—"
```

### `formatCnpj(value)`

```ts
formatCnpj('12345678000195')  // "12.345.678/0001-95"
```

### `formatCpfCnpj(value)`

Detecta automaticamente pelo numero de digitos:

```ts
formatCpfCnpj('12345678901')      // "123.456.789-01"
formatCpfCnpj('12345678000195')   // "12.345.678/0001-95"
```

### `formatTelefone(value)`

```ts
formatTelefone('11999887766')  // "(11) 99988-7766"  (celular)
formatTelefone('1133445566')   // "(11) 3344-5566"   (fixo)
```

### `stripMask(value)`

Remove caracteres nao-numericos:

```ts
stripMask('123.456.789-01')  // "12345678901"
stripMask('(11) 99988-7766') // "11999887766"
```

## Validacao

### `validateCpf(value)`

Valida CPF com algoritmo de digitos verificadores:

```ts
validateCpf('52998224725')   // null (valido)
validateCpf('11111111111')   // "CPF invalido."
validateCpf('123')           // "CPF deve ter 11 digitos."
validateCpf(null)            // null (vazio e valido)
```

### `validateCnpj(value)`

```ts
validateCnpj('11222333000181')  // null (valido)
validateCnpj('11111111111111')  // "CNPJ invalido."
```

### `validateCpfCnpj(value)`

Detecta e valida automaticamente:

```ts
validateCpfCnpj('52998224725')       // valida como CPF
validateCpfCnpj('11222333000181')    // valida como CNPJ
validateCpfCnpj('1234')             // "CPF deve ter 11 digitos ou CNPJ deve ter 14 digitos."
```

## Uso no Formulario

```ts
form: [
  {
    field: 'cpf',
    label: 'CPF',
    type: 'cpf_cnpj',
    validate: validateCpfCnpj,
  },
  {
    field: 'telefone',
    label: 'Telefone',
    type: 'mask',
    mask: '(##) #####-####',
  },
]
```
