import { describe, it, expect, vi } from 'vitest'
import { createApp } from 'vue'

// toast/confirm dependem de serviços do PrimeVue; mockamos para isolar a lógica de dados.
vi.mock('./useAppToast', () => ({
  useAppToast: () => ({ success: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() }),
}))
vi.mock('./useAppConfirm', () => ({
  useAppConfirm: () => ({ confirmDelete: vi.fn() }),
}))

import { useCrudManager } from './useCrudManager'
import { W_DATA_PROVIDER_KEY, W_CONFIG_KEY } from '@/types/plugin'
import type { DataProvider } from '@/types/dataProvider'
import type { CrudManagerConfig } from '@/types/manager'

type AnyRecord = Record<string, unknown>
const tick = () => new Promise((r) => setTimeout(r, 0))

function setup<T extends AnyRecord = AnyRecord>(
  config: CrudManagerConfig<T>,
  provider: Partial<DataProvider>,
) {
  const app = createApp({ render: () => null })
  app.provide(W_DATA_PROVIDER_KEY, provider as DataProvider)
  app.provide(W_CONFIG_KEY, {
    defaultPageSize: 20,
    dateFormat: 'DD/MM/YYYY',
    dateTimeFormat: 'DD/MM/YYYY HH:mm',
    locale: 'pt-BR',
    currency: 'BRL',
  })
  return app.runWithContext(() => useCrudManager<T>(config))
}

const okList = (data: AnyRecord[] = [], rows = data.length) =>
  vi.fn().mockResolvedValue({ data, page: 1, page_size: 20, rows })

describe('useCrudManager — guardas', () => {
  it('lança erro quando não há dataProvider registrado', () => {
    const app = createApp({ render: () => null })
    expect(() =>
      app.runWithContext(() => useCrudManager({ endpoint: '/x', columns: [], form: [] })),
    ).toThrow(/dataProvider/)
  })
})

describe('useCrudManager — fetch', () => {
  it('init busca a lista e popula itens/paginação', async () => {
    const list = okList([{ id: 1 }, { id: 2 }], 2)
    const crud = setup({ endpoint: '/produtos', columns: [], form: [] }, { list })
    await crud.init()
    expect(list).toHaveBeenCalledWith('/produtos', { page: 1, page_size: 20 })
    expect(crud.items.value).toHaveLength(2)
    expect(crud.pagination.rows).toBe(2)
    expect(crud.pagination.totalPages).toBe(1)
  })

  it('aplica filterParams em toda listagem', async () => {
    const list = okList()
    const crud = setup(
      { endpoint: '/p', columns: [], form: [], filterParams: () => ({ ativo: true }) },
      { list },
    )
    await crud.init()
    expect(list.mock.calls[0][1]).toMatchObject({ ativo: true })
  })

  it('onSort envia ordering (- para desc)', async () => {
    const list = okList()
    const crud = setup({ endpoint: '/p', columns: [], form: [] }, { list })
    crud.onSort({ sortField: 'nome', sortOrder: -1 })
    await tick()
    expect(list.mock.calls[list.mock.calls.length - 1]?.[1]).toMatchObject({ ordering: '-nome' })
    crud.onSort({ sortField: 'nome', sortOrder: 1 })
    await tick()
    expect(list.mock.calls[list.mock.calls.length - 1]?.[1]).toMatchObject({ ordering: 'nome' })
  })
})

describe('useCrudManager — save', () => {
  it('cria via provider.create com o payload do formulário', async () => {
    const created = { id: 9, nome: 'Novo' }
    const list = okList()
    const create = vi.fn().mockResolvedValue({ data: created })
    const crud = setup(
      {
        endpoint: '/p',
        columns: [],
        form: [{ field: 'nome', label: 'Nome' }],
        refetchOnSave: false,
      },
      { list, create },
    )
    crud.setFormField('nome', 'Novo')
    const res = await crud.save()
    expect(create).toHaveBeenCalledWith('/p', { nome: 'Novo' }, undefined)
    expect(res).toEqual(created)
  })

  it('edição com partialUpdate envia apenas os campos alterados (diff)', async () => {
    const list = okList()
    const update = vi.fn().mockResolvedValue({ data: { id: 1, nome: 'B', ativo: true } })
    const crud = setup(
      {
        endpoint: '/p',
        columns: [],
        form: [
          { field: 'nome', label: 'Nome' },
          { field: 'ativo', label: 'Ativo', type: 'switch' },
        ],
        pk: 'id',
        partialUpdate: true,
        refetchOnSave: false,
      },
      { list, update },
    )
    crud.openEditDialog({ id: 1, nome: 'A', ativo: true })
    crud.setFormField('nome', 'B')
    await crud.save()
    expect(update).toHaveBeenCalledWith('/p', 1, { nome: 'B' }, undefined)
  })
})

describe('useCrudManager — seleção múltipla', () => {
  it('selectedItems começa vazio; clearSelection e recarga limpam', async () => {
    const list = okList([{ id: 1 }], 1)
    const crud = setup(
      { endpoint: '/p', columns: [], form: [], selectionMode: 'multiple' },
      { list },
    )
    expect(crud.selectedItems.value).toEqual([])
    crud.selectedItems.value = [{ id: 1 }]
    crud.clearSelection()
    expect(crud.selectedItems.value).toEqual([])
    crud.selectedItems.value = [{ id: 1 }]
    await crud.init() // recarregar torna a seleção obsoleta → limpa
    expect(crud.selectedItems.value).toEqual([])
  })
})

describe('useCrudManager — filtros de coluna', () => {
  it('setColumnFilter envia o param no list e volta pra página 1; vazio/clear removem', async () => {
    const list = okList()
    const crud = setup({ endpoint: '/p', columns: [], form: [] }, { list })
    crud.pagination.page = 3
    crud.setColumnFilter('status', 'ativo')
    await tick()
    const call = list.mock.calls[list.mock.calls.length - 1][1]
    expect(call).toMatchObject({ status: 'ativo', page: 1 })
    expect(crud.columnFilters).toEqual({ status: 'ativo' })

    crud.setColumnFilter('status', null) // valor vazio remove o filtro
    await tick()
    expect(crud.columnFilters).toEqual({})

    crud.setColumnFilter('status', 'ativo')
    crud.clearColumnFilters()
    await tick()
    expect(crud.columnFilters).toEqual({})
  })
})

describe('useCrudManager — edição inline', () => {
  it('updateField faz PATCH de um único campo e atualiza o item local', async () => {
    const list = okList([{ id: 1, nome: 'A', preco: 10 }], 1)
    const update = vi.fn().mockResolvedValue({ data: { id: 1, nome: 'A', preco: 25 } })
    const crud = setup(
      { endpoint: '/p', columns: [], form: [{ field: 'preco', label: 'Preço', type: 'number' }] },
      { list, update },
    )
    await crud.init()
    await crud.updateField({ id: 1, nome: 'A', preco: 10 }, 'preco', 25)
    expect(update).toHaveBeenCalledWith('/p', 1, { preco: 25 })
    expect(crud.items.value[0]).toMatchObject({ preco: 25 })
  })
})

describe('useCrudManager — exclusão', () => {
  it('performDelete exclui via provider (sem confirm), remove o item e chama onAfterDelete', async () => {
    const list = okList([{ id: 1 }, { id: 2 }], 2)
    const del = vi.fn().mockResolvedValue(undefined)
    const onAfterDelete = vi.fn()
    const crud = setup(
      { endpoint: '/p', columns: [], form: [], onAfterDelete },
      { list, delete: del },
    )
    await crud.init()
    await crud.performDelete({ id: 1 })
    expect(del).toHaveBeenCalledWith('/p', 1)
    expect(crud.items.value.map((i) => i.id)).toEqual([2])
    expect(crud.pagination.rows).toBe(1)
    expect(onAfterDelete).toHaveBeenCalledWith({ id: 1 })
  })
})
