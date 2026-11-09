import { describe, it, expect, vi } from 'vitest'
import { createApp } from 'vue'
import { fromJson } from '@bufbuild/protobuf'
import { createRouterTransport } from '@connectrpc/connect'

vi.mock('@/composables/useAppToast', () => ({
  useAppToast: () => ({ success: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() }),
}))
vi.mock('@/composables/useAppConfirm', () => ({
  useAppConfirm: () => ({ confirmDelete: vi.fn(), confirmDiscard: vi.fn() }),
}))

import { useCrudManager } from '@/composables/useCrudManager'
import { W_DATA_PROVIDER_KEY, W_CONFIG_KEY } from '@/types/plugin'
import {
  ListParceriasResponseSchema,
  ParceriaSchema,
  ParceriaService,
} from '../../../tests/connect/fixture'
import { createConnectDataProvider } from './connectDataProvider'

// Ponta a ponta: useCrudManager (código da suíte, intacto) sobre o provedor Connect.
describe('useCrudManager sobre o provedor Connect', () => {
  it('lista, edita só o campo alterado e exclui', async () => {
    const seen: Record<string, unknown[]> = {}
    const transport = createRouterTransport(({ service }) => {
      service(ParceriaService, {
        list: (req: unknown) => {
          ;(seen.list ??= []).push(req)
          return fromJson(ListParceriasResponseSchema, {
            count: '1',
            results: [{ id: 'u1', nome: 'A', valor: '1.00' }],
          })
        },
        update: (req: { updateMask?: { paths: string[] } }) => {
          ;(seen.update ??= []).push(req.updateMask?.paths)
          return fromJson(ParceriaSchema, { id: 'u1', nome: 'B', valor: '1.00' })
        },
        delete: (req: { id: string }) => {
          ;(seen.delete ??= []).push(req.id)
          return {}
        },
      } as never)
    })
    const app = createApp({ render: () => null })
    app.provide(
      W_DATA_PROVIDER_KEY,
      createConnectDataProvider({ transport, resources: { parcerias: ParceriaService } }),
    )
    app.provide(W_CONFIG_KEY, { defaultPageSize: 25 })
    const crud = app.runWithContext(() =>
      useCrudManager({
        endpoint: 'parcerias',
        columns: [],
        form: [
          { field: 'nome', label: 'Nome' },
          { field: 'valor', label: 'Valor' },
        ],
      }),
    )

    await crud.init()
    expect(crud.items.value).toHaveLength(1)
    expect(crud.pagination.rows).toBe(1)
    expect(crud.pagination.pageSize).toBe(25)

    crud.setSearch('x')
    crud.onSort({ sortField: 'nome', sortOrder: -1 })
    await new Promise((r) => setTimeout(r, 0))
    expect(seen.list.at(-1)).toMatchObject({ ordem: ['-nome'], pagina: 1, tamanho: 25 })

    crud.openEditDialog(crud.items.value[0])
    crud.setFormField('nome', 'B')
    await crud.save()
    expect(seen.update).toEqual([['nome']])

    await crud.performDelete(crud.items.value[0])
    expect(seen.delete).toEqual(['u1'])
  })
})
