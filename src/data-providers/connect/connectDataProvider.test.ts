import { describe, it, expect, vi } from 'vitest'
import { create, fromJson, toJson } from '@bufbuild/protobuf'
import { Code, ConnectError, createRouterTransport } from '@connectrpc/connect'
import {
  BadRequestSchema,
  ListParceriasResponseSchema,
  ParceriaSchema,
  ParceriaService,
} from '../../../tests/connect/fixture'
import { createConnectDataProvider, toFiltros } from './connectDataProvider'
import { extractApiError, extractFieldErrors } from '@/composables/useApiError'

const row = (id: string, nome: string) =>
  fromJson(ParceriaSchema, {
    id,
    nome,
    data_inicio: '2026-01-31T00:00:00Z',
    valor: '10.50',
    qtd_total: '7',
  })

function setup(impl: Record<string, (req: never) => unknown> = {}, onUnauthenticated?: () => void) {
  const calls: Record<string, unknown[]> = {}
  const raws: Record<string, unknown[]> = {}
  const spy = (name: string, fn: (req: never) => unknown) => (req: never) => {
    ;(calls[name] ??= []).push(
      toJson(
        ParceriaService.methods.find((m: { localName: string }) => m.localName === name)!.input,
        req,
      ),
    )
    ;(raws[name] ??= []).push(req)
    return fn(req)
  }
  const transport = createRouterTransport(({ service }) => {
    service(ParceriaService, {
      list: spy(
        'list',
        impl.list ?? (() => fromJson(ListParceriasResponseSchema, { count: '42', results: [] })),
      ),
      get: spy('get', impl.get ?? (() => row('1', 'A'))),
      create: spy('create', impl.create ?? (() => row('1', 'A'))),
      update: spy('update', impl.update ?? (() => row('1', 'A'))),
      delete: spy('delete', impl.delete ?? (() => ({}))),
      aprovar: spy('aprovar', impl.aprovar ?? (() => row('1', 'A'))),
    } as never)
  })
  const provider = createConnectDataProvider({
    transport,
    resources: { parcerias: ParceriaService },
    onUnauthenticated,
  })
  return { provider, calls, raws }
}

describe('toFiltros', () => {
  it('descarta reservados e vazios; array vira __in; mantém campo__op', () => {
    expect(
      toFiltros({
        page: 2,
        search: 'x',
        ordering: 'nome',
        status: 'ativo',
        vazio: '',
        nulo: null,
        ids: ['a', 'b'],
        valor__gte: 10,
        ativo: true,
      }),
    ).toEqual({ status: 'ativo', ids__in: 'a,b', valor__gte: '10', ativo: 'true' })
  })
})

describe('createConnectDataProvider', () => {
  it('list: filtros/ordem/página/tamanho/busca viram ListRequest e count/results voltam para o grid', async () => {
    const { provider, calls } = setup({
      list: () =>
        fromJson(ListParceriasResponseSchema, {
          count: '42',
          results: [
            { id: 'u1', nome: 'Alfa', data_inicio: '2026-01-31T00:00:00Z', qtd_total: '7' },
          ],
        }),
    })

    const res = await provider.list('/api/v2/parcerias/', {
      page: 3,
      page_size: 500,
      search: 'alf',
      ordering: '-nome',
      status: 'ativo',
      nome__icontains: 'a',
    })

    expect(calls.list[0]).toEqual({
      filtros: { status: 'ativo', nome__icontains: 'a' },
      ordem: ['-nome'],
      pagina: 3,
      tamanho: 200,
      busca: 'alf',
    })
    expect(res.rows).toBe(42)
    expect(res.page).toBe(3)
    expect(res.page_size).toBe(200)
    // nomes de campo do proto (snake_case); Timestamp volta como RFC3339, sem heurística de data
    expect(res.data[0]).toMatchObject({
      id: 'u1',
      nome: 'Alfa',
      data_inicio: '2026-01-31T00:00:00Z',
      qtd_total: '7',
    })
  })

  it('valores padrão do proto3 (false, 0, "") chegam, não somem', async () => {
    const { provider } = setup({
      get: () => fromJson(ParceriaSchema, { id: 'u1' }),
    })
    const { data } = await provider.get('parcerias', 'u1')
    expect(data).toMatchObject({ nome: '', ativo: false, prioridade: 0, qtd_total: '0' })
  })

  it('lista vazia ({} sem count/results) vira rows=0 e data=[]', async () => {
    const { provider } = setup({ list: () => ({}) })
    const res = await provider.list('parcerias')
    expect(res.rows).toBe(0)
    expect(res.data).toEqual([])
  })

  it('get/delete/ação usam IdRequest', async () => {
    const { provider, calls } = setup()
    await provider.get('parcerias', 'u1')
    await provider.delete('parcerias', 'u1')
    const out = await provider.action('parcerias', 'u1', 'Aprovar')
    expect(calls.get[0]).toEqual({ id: 'u1' })
    expect(calls.delete[0]).toEqual({ id: 'u1' })
    expect(calls.aprovar[0]).toEqual({ id: 'u1' })
    expect(out.data).toMatchObject({ id: '1', nome: 'A' })
  })

  it('create: payload do formulário vira a mensagem (Timestamp = data-hora)', async () => {
    const { provider, calls } = setup()
    await provider.create('parcerias', {
      nome: 'Nova',
      data_inicio: '2026-02-01T10:00:00Z',
      valor: '9.90',
      so_do_form: 1,
    })
    expect(calls.create[0]).toEqual({
      nome: 'Nova',
      dataInicio: '2026-02-01T10:00:00Z',
      valor: '9.90',
    })
  })

  it('update: update_mask só com os campos alterados, em snake_case do proto (camelCase do form também)', async () => {
    const { provider, calls, raws } = setup()
    await provider.update('parcerias', 'u1', {
      nome: 'Novo',
      dataInicio: '2026-03-01T10:00:00Z',
      fora: 'x',
    })
    expect(calls.update[0]).toEqual({
      id: 'u1',
      parceria: { nome: 'Novo', dataInicio: '2026-03-01T10:00:00Z' },
      updateMask: 'nome,dataInicio',
    })
    expect((raws.update[0] as { updateMask: { paths: string[] } }).updateMask.paths).toEqual([
      'nome',
      'data_inicio',
    ])
    await provider.update('parcerias', 'u1', { valor: '1.00' })
    expect((raws.update[1] as { updateMask: { paths: string[] } }).updateMask.paths).toEqual([
      'valor',
    ])
  })

  it('data pura em campo Timestamp falha com erro no campo, sem virar meia-noite UTC', async () => {
    const { provider, calls } = setup()
    const err = await provider
      .create('parcerias', { nome: 'x', data_inicio: '2026-02-01' })
      .catch((e) => e)
    expect(err.response.status).toBe(400)
    expect(extractFieldErrors(err).data_inicio).toMatch(/date-time/)
    expect(calls.create).toBeUndefined()
  })

  it('rejeita FormData e recurso não registrado', async () => {
    const { provider } = setup()
    await expect(provider.create('parcerias', new FormData())).rejects.toMatchObject({
      response: { status: 400 },
    })
    await expect(provider.list('outro')).rejects.toMatchObject({ response: { status: 404 } })
  })

  describe('erros', () => {
    function badRequest() {
      const detail = create(BadRequestSchema, {
        fieldViolations: [
          { field: 'nome', description: 'obrigatório' },
          { field: 'valor', description: 'inválido' },
        ],
      } as never)
      return new ConnectError('invalid', Code.InvalidArgument, undefined, [
        { desc: BadRequestSchema, value: detail } as never,
      ])
    }

    it('BadRequest vira erro por campo e a mensagem do toast', async () => {
      const { provider } = setup({
        create: () => {
          throw badRequest()
        },
      })
      const err = await provider.create('parcerias', { nome: '' }).catch((e) => e)
      expect(err.response.status).toBe(400)
      expect(extractFieldErrors(err)).toEqual({ nome: 'obrigatório', valor: 'inválido' })
      expect(extractApiError(err)).toBe('Nome: obrigatório\nValor: inválido')
    })

    it.each([
      [Code.NotFound, 404, 'Registro não encontrado.'],
      [Code.PermissionDenied, 403, 'Você não tem permissão para realizar esta ação.'],
      [Code.ResourceExhausted, 429, 'Muitas requisições. Tente novamente em instantes.'],
    ])('código %s -> status %s e mensagem do REST', async (code, status, msg) => {
      const { provider } = setup({
        get: () => {
          throw new ConnectError('x', code)
        },
      })
      const err = await provider.get('parcerias', '1').catch((e) => e)
      expect(err.response.status).toBe(status)
      expect(extractApiError(err, 'fallback')).toBe(msg)
    })

    it('failed_precondition mostra a mensagem do servidor; internal cai no fallback', async () => {
      const { provider } = setup({
        aprovar: () => {
          throw new ConnectError('Já aprovada', Code.FailedPrecondition)
        },
        get: () => {
          throw new ConnectError('boom', Code.Internal)
        },
      })
      const conflito = await provider.action('parcerias', '1', 'Aprovar').catch((e) => e)
      expect(conflito.response.status).toBe(409)
      expect(extractApiError(conflito)).toBe('Já aprovada')
      const interno = await provider.get('parcerias', '1').catch((e) => e)
      expect(extractApiError(interno, 'Erro ao carregar registro')).toBe(
        'Erro ao carregar registro',
      )
    })

    it('unauthenticated dispara o handler de sessão e o erro segue', async () => {
      const onUnauthenticated = vi.fn()
      const { provider } = setup(
        {
          list: () => {
            throw new ConnectError('token', Code.Unauthenticated)
          },
        },
        onUnauthenticated,
      )
      const err = await provider.list('parcerias').catch((e) => e)
      expect(onUnauthenticated).toHaveBeenCalledOnce()
      expect(err.response.status).toBe(401)
    })
  })
})
