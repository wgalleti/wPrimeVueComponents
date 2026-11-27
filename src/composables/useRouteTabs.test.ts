import { describe, it, expect, beforeEach, vi } from 'vitest'
import { defineComponent } from 'vue'
import { createMemoryHistory, createRouter, type Router } from 'vue-router'
import { useRouteTabs } from './useRouteTabs'
import type { RouteTabsApi } from '@/types/routeTabs'

const Tela = defineComponent({ name: 'Tela', render: () => null })

function criarRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Tela },
      { path: '/clientes', name: 'clientes', component: Tela },
      { path: '/notas/:id', name: 'nota-editor', component: Tela, props: true },
      { path: '/livre', name: 'livre', component: Tela },
      { path: '/antiga', redirect: '/clientes' },
      {
        path: '/modulo',
        redirect: '/modulo/painel',
        children: [{ path: 'painel', name: 'modulo-painel', component: Tela }],
      },
    ],
  })
}

/** Storage em memória, para testar persistência sem jsdom. */
function criarStorage(dados: Record<string, string> = {}): Storage {
  return {
    getItem: (k: string) => dados[k] ?? null,
    setItem: (k: string, v: string) => {
      dados[k] = v
    },
    removeItem: (k: string) => {
      delete dados[k]
    },
    clear: () => Object.keys(dados).forEach((k) => delete dados[k]),
    key: () => null,
    get length() {
      return Object.keys(dados).length
    },
  } as Storage
}

let router: Router
let api: RouteTabsApi
let dados: Record<string, string>

function montar(extra: Partial<Parameters<typeof useRouteTabs>[0]> = {}): void {
  router = criarRouter()
  dados = {}
  api = useRouteTabs({
    router,
    storage: criarStorage(dados),
    resolveTabMeta: (r) => (typeof r.name === 'string' ? { title: r.name } : {}),
    ...extra,
  })
}

beforeEach(() => montar())

describe('useRouteTabs — abertura e identidade', () => {
  it('cada path vira uma aba; params distintos = abas distintas', async () => {
    await router.push('/clientes')
    await router.push('/notas/1')
    await router.push('/notas/2')
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/clientes', '/notas/1', '/notas/2'])
    expect(api.activeKey.value).toBe('/notas/2')
  })

  it('mudança só de query atualiza a aba, não abre outra', async () => {
    await router.push('/clientes')
    await router.push('/clientes?busca=abc')
    expect(api.tabs.value).toHaveLength(1)
    expect(api.tabs.value[0].fullPath).toBe('/clientes?busca=abc')
  })

  it('voltar a uma aba existente reativa sem duplicar', async () => {
    await router.push('/clientes')
    await router.push('/notas/1')
    await router.push('/clientes')
    expect(api.tabs.value).toHaveLength(2)
    expect(api.activeKey.value).toBe('/clientes')
  })

  it('rota fora de isTabRoute não vira aba', async () => {
    montar({ isTabRoute: (r) => r.path !== '/livre' })
    await router.push('/clientes')
    await router.push('/livre')
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/clientes'])
    expect(api.activeKey.value).toBeNull()
  })

  it('aba nova entra colada no fim do próprio grupo', async () => {
    montar({
      resolveTabMeta: (r) => ({
        group: r.path.startsWith('/notas') ? 'Sementes' : 'Cadastros',
      }),
    })
    await router.push('/clientes') // Cadastros
    await router.push('/notas/1') // Sementes
    await router.push('/notas/2') // Sementes — junto da /notas/1
    await router.push('/') // Cadastros — volta para o bloco de Cadastros
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/clientes', '/', '/notas/1', '/notas/2'])
    expect(api.tabs.value[2].group).toBe('Sementes')
  })

  it('resolve componente e props (props: true → params) da view', async () => {
    await router.push('/notas/7')
    const runtime = api.runtime('/notas/7')
    expect(runtime?.component).toBeTruthy()
    expect(runtime?.props).toEqual({ id: '7' })
  })
})

describe("useRouteTabs — mode: 'module' (lista + detalhe na mesma aba)", () => {
  /** Detalhe de nota compartilha a aba da listagem de clientes (módulo único). */
  const porModulo = () =>
    montar({
      mode: 'module',
      moduleRoot: (r) => (r.name === 'nota-editor' ? '/clientes' : r.path),
    })

  it("mode 'module' sem moduleRoot é erro de configuração", () => {
    expect(() => montar({ mode: 'module' })).toThrowError(/moduleRoot/)
  })

  it('lista → detalhe reusa a aba, remonta a view e atualiza o fullPath', async () => {
    porModulo()
    await router.push('/clientes')
    await router.push('/notas/1')
    expect(api.tabs.value).toHaveLength(1)
    expect(api.tabs.value[0].fullPath).toBe('/notas/1')
    expect(api.tabs.value[0].remount).toBe(1)
    expect(api.tabs.value[0].title).toBe('nota-editor')
  })

  it('detalhe → outro detalhe remonta de novo (id novo = tela nova)', async () => {
    porModulo()
    await router.push('/notas/1')
    await router.push('/notas/2')
    expect(api.tabs.value).toHaveLength(1)
    expect(api.tabs.value[0].remount).toBe(1)
    expect(api.runtime('/clientes')?.props).toEqual({ id: '2' })
  })

  it('shouldRemount=false mantém a view viva e só troca os props (novo → id)', async () => {
    montar({
      mode: 'module',
      moduleRoot: (r) => (r.name === 'nota-editor' ? '/clientes' : r.path),
      shouldRemount: (de, para) => !(de.name === para.name && de.params.id === 'novo'),
    })
    await router.push('/notas/novo')
    const runtime = api.runtime('/clientes')
    await router.replace('/notas/7')
    expect(api.tabs.value[0].remount).toBe(0)
    expect(api.runtime('/clientes')).toBe(runtime)
    expect(runtime?.props).toEqual({ id: '7' })
    expect(runtime?.route.path).toBe('/notas/7')
    expect(api.tabs.value[0].fullPath).toBe('/notas/7')
    // Troca que o app NÃO liberou segue remontando.
    await router.push('/notas/8')
    expect(api.tabs.value[0].remount).toBe(1)
  })

  it('título dinâmico do detalhe não gruda: voltar à lista restaura o default', async () => {
    porModulo()
    await router.push('/clientes')
    await router.push('/notas/1')
    api.setTitle('/clientes', 'NF 46032')
    await router.push('/clientes')
    expect(api.tabs.value[0].title).toBe('clientes')
  })

  it('mudança só de query não remonta nem mexe no título', async () => {
    porModulo()
    await router.push('/clientes')
    api.setTitle('/clientes', 'Filtrada')
    await router.push('/clientes?busca=x')
    expect(api.tabs.value[0].remount).toBe(0)
    expect(api.tabs.value[0].title).toBe('Filtrada')
  })

  it('close guard veta a troca de tela dentro da mesma aba', async () => {
    porModulo()
    await router.push('/notas/1')
    api.runtime('/clientes')!.closeGuards.push(() => false)
    await router.push('/clientes').catch(() => undefined)
    expect(router.currentRoute.value.fullPath).toBe('/notas/1')
    expect(api.tabs.value[0].remount).toBe(0)
  })

  it('shell restaurada hidratada em OUTRA tela re-resolve o título', async () => {
    const persistido = JSON.stringify({
      v: 1,
      activeKey: null,
      tabs: [
        {
          key: '/clientes',
          fullPath: '/notas/1',
          title: 'NF 46032',
          closable: true,
        },
      ],
    })
    montar({
      mode: 'module',
      moduleRoot: (r) => (r.name === 'nota-editor' ? '/clientes' : r.path),
    })
    dados['w-route-tabs'] = persistido
    // hidratou na listagem — o título do detalhe persistido não pode grudar
    await router.push('/clientes')
    expect(api.tabs.value).toHaveLength(1)
    expect(api.tabs.value[0].title).toBe('clientes')
  })

  it('shell restaurada hidratada no MESMO path mantém o título persistido', async () => {
    const persistido = JSON.stringify({
      v: 1,
      activeKey: null,
      tabs: [
        {
          key: '/clientes',
          fullPath: '/notas/1',
          title: 'NF 46032',
          closable: true,
        },
      ],
    })
    montar({
      mode: 'module',
      moduleRoot: (r) => (r.name === 'nota-editor' ? '/clientes' : r.path),
    })
    dados['w-route-tabs'] = persistido
    await router.push('/notas/1')
    expect(api.tabs.value[0].title).toBe('NF 46032')
  })

  it('close guard não roda ao trocar para OUTRA aba (pane segue vivo)', async () => {
    porModulo()
    await router.push('/notas/1')
    let chamado = false
    api.runtime('/clientes')!.closeGuards.push(() => {
      chamado = true
      return false
    })
    await router.push('/livre')
    expect(router.currentRoute.value.fullPath).toBe('/livre')
    expect(chamado).toBe(false)
  })
})

describe('useRouteTabs — fechar', () => {
  it('fechar aba ativa ativa a vizinha da esquerda', async () => {
    await router.push('/clientes')
    await router.push('/notas/1')
    await router.push('/notas/2')
    await api.close('/notas/2')
    expect(api.activeKey.value).toBe('/notas/1')
    expect(api.tabs.value).toHaveLength(2)
  })

  it('fechar a última aba navega para homePath', async () => {
    await router.push('/clientes')
    await api.close('/clientes')
    expect(router.currentRoute.value.path).toBe('/')
    // o próprio homePath vira aba ao chegar
    expect(api.activeKey.value).toBe('/')
  })

  it('close guard veta o fechamento', async () => {
    await router.push('/clientes')
    api.runtime('/clientes')?.closeGuards.push(() => false)
    expect(await api.close('/clientes')).toBe(false)
    expect(api.tabs.value).toHaveLength(1)
  })

  it('aba closable: false não fecha', async () => {
    montar({ resolveTabMeta: () => ({ closable: false }) })
    await router.push('/clientes')
    expect(await api.close('/clientes')).toBe(false)
    expect(api.tabs.value).toHaveLength(1)
  })

  it('closeOthers preserva a aba alvo e as vetadas', async () => {
    await router.push('/clientes')
    await router.push('/notas/1')
    await router.push('/notas/2')
    api.runtime('/notas/1')?.closeGuards.push(() => false)
    await api.closeOthers('/notas/2')
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/notas/1', '/notas/2'])
    expect(api.activeKey.value).toBe('/notas/2')
  })

  it('closeAll fecha tudo e vai para homePath', async () => {
    await router.push('/clientes')
    await router.push('/notas/1')
    await api.closeAll()
    expect(router.currentRoute.value.path).toBe('/')
  })
})

describe('useRouteTabs — reload e título', () => {
  it('reload incrementa remount e limpa guards da instância antiga', async () => {
    await router.push('/clientes')
    api.runtime('/clientes')?.closeGuards.push(() => false)
    api.reload('/clientes')
    const tab = api.tabs.value[0]
    expect(tab.remount).toBe(1)
    expect(api.runtime('/clientes')?.closeGuards).toHaveLength(0)
  })

  it('setTitle troca o título e null restaura o default', async () => {
    await router.push('/notas/9')
    api.setTitle('/notas/9', 'NF 000009')
    expect(api.tabs.value[0].title).toBe('NF 000009')
    api.setTitle('/notas/9', null)
    expect(api.tabs.value[0].title).toBe('nota-editor')
  })
})

describe('useRouteTabs — persistência', () => {
  it('grava a lista no storage a cada mutação', async () => {
    await router.push('/clientes')
    const salvo = JSON.parse(dados['w-route-tabs'])
    expect(salvo.tabs).toEqual([
      { key: '/clientes', fullPath: '/clientes', title: 'clientes', closable: true },
    ])
    expect(salvo.activeKey).toBe('/clientes')
  })

  it('restaura shells do storage; a URL atual ganha e hidrata', async () => {
    dados['w-route-tabs'] = JSON.stringify({
      v: 1,
      activeKey: '/notas/1',
      tabs: [
        { key: '/clientes', fullPath: '/clientes?busca=x', title: 'clientes', closable: true },
        { key: '/notas/1', fullPath: '/notas/1', title: 'nota-editor', closable: true },
      ],
    })
    api = useRouteTabs({ router: (router = criarRouter()), storage: criarStorage(dados) })
    await router.push('/notas/2')
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/clientes', '/notas/1', '/notas/2'])
    expect(api.activeKey.value).toBe('/notas/2')
    expect(api.isLive('/notas/2')).toBe(true)
    expect(api.isLive('/clientes')).toBe(false) // shell: só hidrata ao ativar
  })

  it('aba salva que virou redirect, sumiu ou saiu de isTabRoute não volta', async () => {
    // '/sumiu' não casa rota de propósito: o router avisa, e o aviso é esperado aqui
    const aviso = vi.spyOn(console, 'warn').mockImplementation(() => {})
    dados['w-route-tabs'] = JSON.stringify({
      v: 1,
      activeKey: '/clientes',
      tabs: [
        { key: '/clientes', fullPath: '/clientes', title: 'clientes', closable: true },
        { key: '/antiga', fullPath: '/antiga?x=1', title: 'antiga', closable: true },
        { key: '/sumiu', fullPath: '/sumiu', title: 'sumiu', closable: true },
        { key: '/livre', fullPath: '/livre', title: 'livre', closable: true },
        { key: '/modulo/painel', fullPath: '/modulo/painel', title: 'painel', closable: true },
      ],
    })
    api = useRouteTabs({
      router: (router = criarRouter()),
      storage: criarStorage(dados),
      isTabRoute: (r) => r.path !== '/livre',
    })
    await router.push('/notas/1')
    // filha de pai com `redirect` continua: só o último registro conta
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/clientes', '/modulo/painel', '/notas/1'])
    expect(aviso).toHaveBeenCalledWith(expect.stringContaining('/sumiu'))
    aviso.mockRestore()
  })

  it('storageKey mudou (outro usuário, sem reload) → zera e restaura as certas', async () => {
    let usuario = 'a'
    dados['lz:a'] = JSON.stringify({
      v: 1,
      activeKey: '/clientes',
      tabs: [{ key: '/clientes', fullPath: '/clientes', title: 'clientes', closable: true }],
    })
    api = useRouteTabs({
      router: (router = criarRouter()),
      storage: criarStorage(dados),
      storageKey: () => `lz:${usuario}`,
    })
    await router.push('/clientes')
    expect(api.tabs.value).toHaveLength(1)

    usuario = 'b' // login trocou sem reload
    await router.push('/notas/1')
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/notas/1'])
    expect(JSON.parse(dados['lz:b']).tabs).toHaveLength(1)
    expect(JSON.parse(dados['lz:a']).tabs).toHaveLength(1) // as do A ficaram lá
  })

  it('estado corrompido no storage começa sem abas', async () => {
    dados['w-route-tabs'] = '{nem-json'
    api = useRouteTabs({ router: (router = criarRouter()), storage: criarStorage(dados) })
    await router.push('/clientes')
    expect(api.tabs.value).toHaveLength(1)
  })
})

describe('useRouteTabs — scopeByGroup (abas por espaço de trabalho)', () => {
  /** '/notas/*' = Sementes · '/livre' = sem grupo · o resto = Cadastros. */
  const grupoDe = (path: string): string | undefined =>
    path.startsWith('/notas') ? 'Sementes' : path === '/livre' ? undefined : 'Cadastros'
  const porGrupo = (extra: Partial<Parameters<typeof useRouteTabs>[0]> = {}): void =>
    montar({
      scopeByGroup: true,
      resolveTabMeta: (r) => ({ title: String(r.name), group: grupoDe(r.path) }),
      ...extra,
    })
  const chaves = (lista: { key: string }[]): string[] => lista.map((t) => t.key)
  const abrir = async (...rotas: string[]): Promise<void> => {
    for (const rota of rotas) await router.push(rota)
  }
  /** Estado gravado antes de `lastActive` existir: só `v`, `activeKey` e `tabs`. */
  const estadoAntigo = (activeKey: string | null): string =>
    JSON.stringify({
      v: 1,
      activeKey,
      tabs: [
        { key: '/clientes', fullPath: '/clientes', title: 'c', closable: true, group: 'Cadastros' },
        { key: '/notas/1', fullPath: '/notas/1', title: 'n1', closable: true, group: 'Sementes' },
        { key: '/notas/2', fullPath: '/notas/2', title: 'n2', closable: true, group: 'Sementes' },
      ],
    })

  it('visibleTabs traz só as abas do grupo ativo e troca ao ativar aba de outro grupo', async () => {
    porGrupo()
    await abrir('/clientes', '/notas/1', '/notas/2')
    expect(chaves(api.tabs.value)).toEqual(['/clientes', '/notas/1', '/notas/2'])
    expect(api.activeGroup.value).toBe('Sementes')
    expect(chaves(api.visibleTabs.value)).toEqual(['/notas/1', '/notas/2'])
    await api.activate('/clientes')
    expect(api.activeGroup.value).toBe('Cadastros')
    expect(chaves(api.visibleTabs.value)).toEqual(['/clientes'])
  })

  it('sem scopeByGroup, visibleTabs é a própria lista', async () => {
    montar({ resolveTabMeta: (r) => ({ group: grupoDe(r.path) }) })
    await abrir('/clientes', '/notas/1', '/notas/2')
    expect(api.scopeByGroup).toBe(false)
    expect(api.visibleTabs.value).toHaveLength(3)
    expect(api.visibleTabs.value).toEqual(api.tabs.value)
    expect(api.activeGroup.value).toBe('Sementes')
  })

  it('rota fora das abas mantém o grupo da última aba ativa', async () => {
    porGrupo({ isTabRoute: (r) => r.path !== '/modulo/painel' })
    await abrir('/clientes', '/notas/1', '/modulo/painel')
    expect(api.activeKey.value).toBeNull()
    expect(api.activeGroup.value).toBe('Sementes')
    expect(chaves(api.visibleTabs.value)).toEqual(['/notas/1'])
  })

  it('abas sem grupo formam um grupo à parte (undefined)', async () => {
    porGrupo()
    await abrir('/clientes', '/livre')
    expect(api.activeGroup.value).toBeUndefined()
    expect(chaves(api.visibleTabs.value)).toEqual(['/livre'])
  })

  it('activateGroup volta à última aba ativa do grupo; grupo sem aba devolve false', async () => {
    porGrupo()
    await abrir('/clientes', '/notas/1', '/notas/2', '/notas/1', '/clientes')
    expect(await api.activateGroup('Sementes')).toBe(true)
    expect(api.activeKey.value).toBe('/notas/1')
    expect(await api.activateGroup('Estoque')).toBe(false)
    expect(api.activeKey.value).toBe('/notas/1')
  })

  it('o último ativo por grupo sobrevive a persistir + restaurar', async () => {
    porGrupo()
    await abrir('/clientes', '/notas/1', '/notas/2', '/notas/1', '/clientes')
    expect(JSON.parse(dados['w-route-tabs']).lastActive).toEqual({
      Cadastros: '/clientes',
      Sementes: '/notas/1',
    })
    // reload: instância e router novos sobre o mesmo storage
    api = useRouteTabs({
      router: (router = criarRouter()),
      storage: criarStorage(dados),
      scopeByGroup: true,
    })
    await router.push('/clientes')
    expect(await api.activateGroup('Sementes')).toBe(true)
    expect(api.activeKey.value).toBe('/notas/1')
  })

  it('estado persistido antigo (sem lastActive) restaura; activateGroup cai na última do grupo', async () => {
    porGrupo()
    dados['w-route-tabs'] = estadoAntigo('/notas/1')
    await router.push('/clientes')
    expect(chaves(api.tabs.value)).toEqual(['/clientes', '/notas/1', '/notas/2'])
    expect(chaves(api.visibleTabs.value)).toEqual(['/clientes'])
    expect(await api.activateGroup('Sementes')).toBe(true)
    expect(api.activeKey.value).toBe('/notas/2')
  })

  it('reload em rota fora das abas volta no grupo da última aba ativa', async () => {
    porGrupo({ isTabRoute: (r) => r.path !== '/modulo/painel' })
    dados['w-route-tabs'] = estadoAntigo('/notas/1')
    await router.push('/modulo/painel')
    expect(api.activeKey.value).toBeNull()
    expect(api.activeGroup.value).toBe('Sementes')
    expect(chaves(api.visibleTabs.value)).toEqual(['/notas/1', '/notas/2'])
  })

  it('fechar a ativa passa a vez à vizinha do MESMO grupo; a última do grupo leva ao homePath', async () => {
    porGrupo()
    await abrir('/clientes', '/notas/1', '/notas/2', '/notas/1')
    // a vizinha da esquerda na lista é /clientes, de outro grupo: quem assume é a /notas/2
    await api.close('/notas/1')
    expect(api.activeKey.value).toBe('/notas/2')
    await api.close('/notas/2')
    expect(router.currentRoute.value.path).toBe('/')
    expect(chaves(api.tabs.value)).toEqual(['/clientes', '/'])
  })

  it('fechar aba que não é a ativa não navega', async () => {
    porGrupo()
    await abrir('/clientes', '/notas/1', '/notas/2')
    await api.close('/clientes')
    expect(api.activeKey.value).toBe('/notas/2')
    expect(chaves(api.tabs.value)).toEqual(['/notas/1', '/notas/2'])
  })

  it('closeOthers fecha só as outras abas do grupo da aba', async () => {
    porGrupo()
    await abrir('/clientes', '/', '/notas/1', '/notas/2')
    await api.closeOthers('/notas/2')
    expect(chaves(api.tabs.value)).toEqual(['/clientes', '/', '/notas/2'])
    expect(api.activeKey.value).toBe('/notas/2')
  })

  it('closeAll fecha só o grupo ativo; a aba que sobrou nele assume', async () => {
    porGrupo({
      resolveTabMeta: (r) => ({ group: grupoDe(r.path), closable: r.path !== '/notas/1' }),
    })
    await abrir('/clientes', '/notas/1', '/notas/2')
    await api.closeAll()
    expect(chaves(api.tabs.value)).toEqual(['/clientes', '/notas/1'])
    expect(api.activeKey.value).toBe('/notas/1')
  })

  it('closeAll sem sobra no grupo vai ao homePath e não toca nos outros grupos', async () => {
    porGrupo({ homePath: '/livre' })
    await abrir('/clientes', '/notas/1', '/notas/2')
    await api.closeAll()
    expect(router.currentRoute.value.path).toBe('/livre')
    expect(chaves(api.tabs.value)).toEqual(['/clientes', '/livre'])
  })

  it('closeAll({ allGroups: true }) fecha as abas de todos os grupos e mantém as não fecháveis', async () => {
    porGrupo({
      resolveTabMeta: (r) => ({
        group: grupoDe(r.path),
        closable: r.path !== '/clientes' && r.path !== '/notas/1',
      }),
    })
    await abrir('/clientes', '/', '/notas/1', '/notas/2')
    await api.closeAll({ allGroups: true })
    expect(chaves(api.tabs.value)).toEqual(['/clientes', '/notas/1'])
    // assume a que sobrou do grupo ativo, não a primeira da lista
    expect(api.activeKey.value).toBe('/notas/1')
  })

  it('closeAll({ allGroups: true }): grupo ativo sem sobra assume a primeira da lista; sem sobra nenhuma, homePath', async () => {
    porGrupo({
      homePath: '/livre',
      resolveTabMeta: (r) => ({ group: grupoDe(r.path), closable: r.path !== '/clientes' }),
    })
    await abrir('/clientes', '/notas/1', '/notas/2')
    await api.closeAll({ allGroups: true })
    expect(chaves(api.tabs.value)).toEqual(['/clientes'])
    expect(api.activeKey.value).toBe('/clientes')

    porGrupo({ homePath: '/livre' })
    await abrir('/clientes', '/notas/1')
    await api.closeAll({ allGroups: true })
    expect(router.currentRoute.value.path).toBe('/livre')
    expect(chaves(api.tabs.value)).toEqual(['/livre'])
  })

  it('sem scopeByGroup, allGroups não muda nada', async () => {
    await abrir('/clientes', '/notas/1')
    await api.closeAll({ allGroups: true })
    expect(router.currentRoute.value.path).toBe('/')
    expect(chaves(api.tabs.value)).toEqual(['/'])
  })

  it('maxTabs fecha primeiro do grupo ativo; sem vítima nele, a mais antiga de outro grupo', async () => {
    porGrupo({ maxTabs: 3 })
    await abrir('/clientes', '/', '/notas/1', '/notas/2')
    // sem scopeByGroup sairia a /clientes (a mais antiga da lista)
    expect(chaves(api.tabs.value)).toEqual(['/clientes', '/', '/notas/2'])
    // /livre fica sozinha no grupo dela: a vítima vem de outro grupo
    await router.push('/livre')
    expect(chaves(api.tabs.value)).toEqual(['/', '/notas/2', '/livre'])
  })
})

describe('useRouteTabs — maxTabs', () => {
  it('acima do limite fecha a mais antiga não-ativa', async () => {
    montar({ maxTabs: 2 })
    await router.push('/clientes')
    await router.push('/notas/1')
    await router.push('/notas/2')
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/notas/1', '/notas/2'])
  })
})
