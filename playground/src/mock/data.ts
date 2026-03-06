export interface Produto {
  id: number
  nome: string
  categoria: number
  preco: number
  estoque: number
  ativo: boolean
  created_at: string
}

export interface Categoria {
  id: number
  nome: string
  ativa: boolean
}

export const categorias: Categoria[] = [
  { id: 1, nome: 'Eletrônicos', ativa: true },
  { id: 2, nome: 'Alimentos', ativa: true },
  { id: 3, nome: 'Vestuário', ativa: true },
  { id: 4, nome: 'Ferramentas', ativa: false },
  { id: 5, nome: 'Esportes', ativa: true },
]

export const produtos: Produto[] = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  nome: `Produto ${String(i + 1).padStart(3, '0')}`,
  categoria: categorias[i % categorias.length].id,
  preco: Math.round((Math.random() * 500 + 10) * 100) / 100,
  estoque: Math.floor(Math.random() * 200),
  ativo: Math.random() > 0.2,
  created_at: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().slice(0, 10),
}))
