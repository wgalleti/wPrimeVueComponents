# O que e wPrimeVue Components?

**wPrimeVue Components** e uma biblioteca Vue 3 que fornece componentes e composables para construir interfaces CRUD completas usando PrimeVue 4.

## Problema

Em projetos com Django REST Framework, criar telas de listagem + formulario envolve repetir muito codigo:

- Configurar DataTable com paginacao server-side
- Criar Dialog com formulario
- Gerenciar estado de loading, saving, editing
- Integrar busca com debounce
- Tratar erros da API
- Confirmacao de exclusao

## Solucao

Com `useCrudManager` + `WCrudView`, voce define tudo via configuracao:

```ts
const crud = useCrudManager({
  endpoint: '/api/produtos/',
  columns: [
    { field: 'nome', header: 'Nome', sortable: true },
    { field: 'preco', header: 'Preco', type: 'currency' },
    { field: 'ativo', header: 'Ativo', type: 'boolean' },
  ],
  form: [
    { field: 'nome', label: 'Nome', required: true },
    { field: 'preco', label: 'Preco', type: 'currency' },
    { field: 'ativo', label: 'Ativo', type: 'switch', defaultValue: true },
  ],
})
```

```vue
<WCrudView :crud="crud" title="Produtos" />
```

Isso gera automaticamente:
- Tabela com paginacao, ordenacao e busca
- Botao "Novo" que abre dialog de criacao
- Botoes de editar/excluir em cada linha
- Formulario com todos os campos tipados
- Toast de sucesso/erro
- Confirmacao de exclusao

## Dependencias

| Pacote | Versao |
|--------|--------|
| Vue | >= 3.4 |
| PrimeVue | >= 4.2 |
| Axios | >= 1.0 |
| Day.js | >= 1.11 |

## Formato da API

A biblioteca espera respostas paginadas no formato DRF:

```json
{
  "results": [...],
  "count": 100
}
```

Ou no formato customizado:

```json
{
  "data": [...],
  "page": 1,
  "page_size": 20,
  "rows": 100
}
```
