import type { InternalAxiosRequestConfig } from 'axios'
import { produtos, categorias } from './data'
import type { Produto, Categoria } from './data'

function paginate<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  return {
    data: items.slice(start, start + pageSize),
    page,
    page_size: pageSize,
    rows: items.length,
  }
}

function filterBySearch<T extends Record<string, unknown>>(items: T[], search: string, fields: string[]): T[] {
  if (!search) return items
  const q = search.toLowerCase()
  return items.filter((item) =>
    fields.some((f) => String(item[f] ?? '').toLowerCase().includes(q)),
  )
}

function sortItems<T extends Record<string, unknown>>(items: T[], ordering: string): T[] {
  if (!ordering) return items
  const desc = ordering.startsWith('-')
  const field = desc ? ordering.slice(1) : ordering
  return [...items].sort((a, b) => {
    const va = a[field] ?? ''
    const vb = b[field] ?? ''
    let cmp = 0
    if (typeof va === 'number' && typeof vb === 'number') {
      cmp = va - vb
    } else {
      cmp = String(va).localeCompare(String(vb))
    }
    return desc ? -cmp : cmp
  })
}

export function mockHandler(config: InternalAxiosRequestConfig): unknown | null {
  const url = config.url?.replace(/\/$/, '') ?? ''
  const params = config.params ?? {}
  const method = (config.method ?? 'get').toLowerCase()
  const page = Number(params.page) || 1
  const pageSize = Number(params.page_size) || 10
  const search = String(params.search ?? '')
  const ordering = String(params.ordering ?? '')

  // --- Produtos ---
  if (url.match(/^\/api\/produtos$/) && method === 'get') {
    let result = filterBySearch(produtos, search, ['nome'])
    result = sortItems(result, ordering)
    return paginate(result, page, pageSize)
  }

  if (url.match(/^\/api\/produtos\/(\d+)$/) && method === 'get') {
    const id = Number(url.split('/').pop())
    return produtos.find((p) => p.id === id) ?? null
  }

  if (url.match(/^\/api\/produtos$/) && method === 'post') {
    const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
    const newItem: Produto = {
      id: Math.max(...produtos.map((p) => p.id)) + 1,
      nome: body.nome ?? '',
      categoria: body.categoria ?? 1,
      preco: Number(body.preco) || 0,
      estoque: Number(body.estoque) || 0,
      ativo: body.ativo ?? true,
      created_at: new Date().toISOString().slice(0, 10),
    }
    produtos.unshift(newItem)
    return newItem
  }

  if (url.match(/^\/api\/produtos\/(\d+)$/) && method === 'patch') {
    const id = Number(url.split('/').pop())
    const index = produtos.findIndex((p) => p.id === id)
    if (index === -1) return null
    const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
    Object.assign(produtos[index], body)
    return produtos[index]
  }

  if (url.match(/^\/api\/produtos\/(\d+)$/) && method === 'delete') {
    const id = Number(url.split('/').pop())
    const index = produtos.findIndex((p) => p.id === id)
    if (index !== -1) produtos.splice(index, 1)
    return {}
  }

  // --- Categorias ---
  if (url.match(/^\/api\/categorias$/) && method === 'get') {
    let result = filterBySearch(categorias, search, ['nome'])
    result = sortItems(result, ordering)
    return paginate(result, page, pageSize)
  }

  if (url.match(/^\/api\/categorias\/(\d+)$/) && method === 'get') {
    const id = Number(url.split('/').pop())
    return categorias.find((c) => c.id === id) ?? null
  }

  return null
}
