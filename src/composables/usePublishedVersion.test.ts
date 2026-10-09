import { describe, it, expect, beforeEach } from 'vitest'
import {
  createPublishedVersion,
  isChunkError,
  MIN_CHECK_INTERVAL_MS,
  RECENT_READ_MS,
  type PublishedVersionDeps,
} from './usePublishedVersion'

const json = (corpo: unknown, status = 200) =>
  ({ status, json: async () => corpo }) as unknown as Response
const html503 = () =>
  ({
    status: 503,
    json: async () => {
      throw new SyntaxError('Unexpected token <')
    },
  }) as unknown as Response

function cenario(over: Partial<PublishedVersionDeps> = {}) {
  let agora = 1_000_000
  const respostas: Response[] = []
  const memoria = new Map<string, string>()
  const chamadas = { fetch: 0, reload: 0, goTo: [] as string[], warn: 0 }
  const pendentes: unknown[] = []
  let online = true
  const deps: PublishedVersionDeps = {
    currentBuild: 'A',
    fetchVersion: async () => {
      chamadas.fetch++
      return respostas.shift() ?? json({ build: 'A' })
    },
    now: () => agora,
    online: () => online,
    pending: () => pendentes,
    reload: () => chamadas.reload++,
    goTo: (href) => chamadas.goTo.push(href),
    storage: { getItem: (k) => memoria.get(k) ?? null, setItem: (k, v) => void memoria.set(k, v) },
    warn: () => chamadas.warn++,
    ...over,
  }
  return {
    versao: createPublishedVersion(deps),
    respostas,
    chamadas,
    pendentes,
    avancar: (ms: number) => (agora += ms),
    ficarOffline: () => (online = false),
  }
}

const de = { name: 'alunos', path: '/alunos', matched: [{}] } as never
const para = { name: 'turmas', path: '/turmas' }

describe('createPublishedVersion', () => {
  let c: ReturnType<typeof cenario>
  beforeEach(() => {
    c = cenario()
  })

  it('503 em HTML durante o deploy não é versão nova nem leitura', async () => {
    c.respostas.push(html503())
    await c.versao.check()
    expect(c.versao.hasNewVersion).toBe(false)
    expect(c.versao.canReload()).toBe(false)
  })

  it('build novo lido, online e sem pendente: a troca de tela recarrega no destino', async () => {
    c.respostas.push(json({ build: 'B' }))
    await c.versao.check()
    expect(c.versao.onRouteChange(para, de, '/turmas')).toBe(false)
    expect(c.chamadas.goTo).toEqual(['/turmas'])
  })

  it('rollback: depois de B, voltar a ler A deixa de haver versão nova', async () => {
    c.respostas.push(json({ build: 'B' }), json({ build: 'A' }))
    await c.versao.check()
    c.avancar(MIN_CHECK_INTERVAL_MS)
    await c.versao.check()
    expect(c.versao.hasNewVersion).toBe(false)
  })

  it('leitura mais velha que o limite não autoriza recarga', async () => {
    c.respostas.push(json({ build: 'B' }))
    await c.versao.check()
    c.avancar(RECENT_READ_MS)
    expect(c.versao.canReload()).toBe(false)
  })

  it('offline não recarrega', async () => {
    c.respostas.push(json({ build: 'B' }))
    await c.versao.check()
    c.ficarOffline()
    expect(c.versao.onRouteChange(para, de, '/turmas')).toBe(true)
    expect(c.chamadas.goTo).toEqual([])
  })

  it('formulário pendente não recarrega; chunk ausente só avisa', async () => {
    c.respostas.push(json({ build: 'B' }))
    await c.versao.check()
    c.pendentes.push('form')
    expect(c.versao.onRouteChange(para, de, '/turmas')).toBe(true)
    expect(c.versao.onChunkError('/turmas')).toBe(false)
    expect(c.chamadas.warn).toBe(1)
  })

  it('chunk ausente duas vezes no mesmo build recarrega uma vez só', () => {
    expect(c.versao.onChunkError('/turmas')).toBe(true)
    const depoisDaRecarga = cenario({ storage: { getItem: () => 'A', setItem: () => {} } })
    expect(depoisDaRecarga.versao.onChunkError('/turmas')).toBe(false)
  })

  it('offline, chunk ausente não recarrega nem gasta a recarga do build', () => {
    c.ficarOffline()
    expect(c.versao.onChunkError('/turmas')).toBe(false)
    expect(c.chamadas.goTo).toEqual([])
  })

  it('com pendente, o aviso do chunk ausente sai uma vez só', () => {
    c.pendentes.push('form')
    c.versao.onChunkError('/turmas')
    c.versao.onChunkError('/turmas')
    expect(c.chamadas.warn).toBe(1)
  })

  it('armazenamento bloqueado: chunk ausente não recarrega', () => {
    const bloqueado = cenario({ storage: null })
    expect(bloqueado.versao.onChunkError('/turmas')).toBe(false)
    expect(bloqueado.chamadas.goTo).toEqual([])
  })

  it('mesma tela mudando a query não recarrega', async () => {
    c.respostas.push(json({ build: 'B' }))
    await c.versao.check()
    const mesma = { name: 'alunos', path: '/alunos' }
    expect(c.versao.onRouteChange(mesma, de, '/alunos?busca=x')).toBe(true)
  })

  it('primeira navegação nunca recarrega', async () => {
    c.respostas.push(json({ build: 'B' }))
    await c.versao.check()
    const inicio = { name: undefined, path: '/', matched: [] } as never
    expect(c.versao.onRouteChange(para, inicio, '/turmas')).toBe(true)
  })

  it('duas conferências dentro do intervalo fazem uma busca só', async () => {
    await c.versao.check()
    await c.versao.check()
    expect(c.chamadas.fetch).toBe(1)
  })

  it('volta à aba com versão nova recarrega', async () => {
    c.respostas.push(json({ build: 'B' }))
    await c.versao.onTabVisible()
    expect(c.chamadas.reload).toBe(1)
  })
})

describe('isChunkError', () => {
  it('reconhece as mensagens dos navegadores', () => {
    expect(
      isChunkError(new TypeError('Failed to fetch dynamically imported module: /assets/x.js')),
    ).toBe(true)
    expect(isChunkError(new TypeError('Importing a module script failed.'))).toBe(true)
    expect(isChunkError(new Error('outra coisa'))).toBe(false)
  })
})
