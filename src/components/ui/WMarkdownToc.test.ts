// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WMarkdownToc from './WMarkdownToc.vue'
import type { MarkdownHeading } from '@/types/markdown'

const TITULOS: MarkdownHeading[] = [
  { id: 'objetivo', text: 'Objetivo', level: 2 },
  { id: 'como-funciona', text: 'Como funciona', level: 2 },
  { id: 'regra-de-saldo', text: 'Regra de saldo', level: 3 },
  { id: 'reabertura', text: 'Reabertura da nota', level: 3 },
  { id: 'riscos', text: 'Riscos', level: 2 },
]

function montar(props: Record<string, unknown> = {}) {
  return mount(WMarkdownToc, { props: { headings: TITULOS, ...props } })
}

describe('WMarkdownToc', () => {
  it('mostra só os `##`, com os `###` recolhidos', () => {
    const w = montar()
    expect(w.findAll('.w-md-toc__grupo')).toHaveLength(3)
    expect(w.findAll('.w-md-toc__item--n3')).toHaveLength(0)
    // Só o grupo com filhos ganha o gatilho de abrir.
    expect(w.findAll('button.w-md-toc__chevron')).toHaveLength(1)
  })

  it('abrir o grupo revela os subitens', async () => {
    const w = montar()
    await w.find('button.w-md-toc__chevron').trigger('click')
    const filhos = w.findAll('.w-md-toc__item--n3')
    expect(filhos).toHaveLength(2)
    expect(filhos[0].text()).toBe('Regra de saldo')
  })

  it('acordeão: abrir uma seção fecha a anterior', async () => {
    const w = mount(WMarkdownToc, {
      props: {
        headings: [
          ...TITULOS,
          { id: 'rollback', text: 'Rollback', level: 2 },
          { id: 'passo-1', text: 'Passo 1', level: 3 },
        ],
      },
    })
    const gatilhos = w.findAll('button.w-md-toc__chevron')
    expect(gatilhos).toHaveLength(2)

    await gatilhos[0].trigger('click')
    expect(w.findAll('.w-md-toc__item--n3')).toHaveLength(2)

    await gatilhos[1].trigger('click')
    const filhos = w.findAll('.w-md-toc__item--n3')
    expect(filhos).toHaveLength(1)
    expect(filhos[0].text()).toBe('Passo 1')

    // Clicar de novo na mesma fecha.
    await w.findAll('button.w-md-toc__chevron')[1].trigger('click')
    expect(w.findAll('.w-md-toc__item--n3')).toHaveLength(0)
  })

  it('documento curto não renderiza índice', () => {
    const w = mount(WMarkdownToc, { props: { headings: [TITULOS[0]] } })
    expect(w.find('.w-md-toc').exists()).toBe(false)
  })

  it('busca filtra por texto sem acento e já mostra o subitem que casou', async () => {
    const w = montar({ searchable: true })
    await w.find('.w-md-toc__busca input').setValue('reabertura')
    expect(w.findAll('.w-md-toc__grupo')).toHaveLength(1)
    expect(w.find('.w-md-toc__item--n2').text()).toBe('Como funciona')
    expect(w.findAll('.w-md-toc__item--n3')).toHaveLength(1)
  })

  it('busca sem resultado avisa em vez de sumir com o painel', async () => {
    const w = montar({ searchable: true })
    await w.find('.w-md-toc__busca input').setValue('inexistente')
    expect(w.findAll('.w-md-toc__grupo')).toHaveLength(0)
    expect(w.find('.w-md-toc__vazio').text()).toBe('Nenhuma seção encontrada')
  })

  it('sem `searchable` não há campo de busca', () => {
    expect(montar().find('.w-md-toc__busca').exists()).toBe(false)
  })
})
