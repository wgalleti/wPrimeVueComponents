import { describe, it, expect, beforeEach } from 'vitest'
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

describe('useRouteTabs — maxTabs', () => {
  it('acima do limite fecha a mais antiga não-ativa', async () => {
    montar({ maxTabs: 2 })
    await router.push('/clientes')
    await router.push('/notas/1')
    await router.push('/notas/2')
    expect(api.tabs.value.map((t) => t.key)).toEqual(['/notas/1', '/notas/2'])
  })
})
