// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { W_CONFIG_KEY } from '@/types/plugin'
import type { WLoaderConfig } from '@/types/plugin'
import WLoader from './WLoader.vue'

const comLoader = (loader: WLoaderConfig, props = {}) =>
  mount(WLoader, { props, global: { provide: { [W_CONFIG_KEY as symbol]: { loader } } } })

describe('WLoader sem configuração', () => {
  it('mostra o anel neutro, sem picture nem img', () => {
    const w = mount(WLoader)
    expect(w.find('.w-loader__ring').exists()).toBe(true)
    expect(w.find('picture').exists()).toBe(false)
    expect(w.find('img').exists()).toBe(false)
  })

  it('role=status com o label (padrão Carregando) em texto de leitor de tela', () => {
    const w = mount(WLoader)
    expect(w.attributes('role')).toBe('status')
    expect(w.find('.w-loader__label').text()).toBe('Carregando')
    expect(w.find('.w-loader__ring').attributes('aria-hidden')).toBe('true')
    expect(mount(WLoader, { props: { label: 'Atualizando' } }).text()).toBe('Atualizando')
  })

  it('size md por padrão e aceita sm/lg', () => {
    expect(mount(WLoader).classes()).toContain('w-loader--md')
    expect(mount(WLoader, { props: { size: 'sm' } }).classes()).toContain('w-loader--sm')
    expect(mount(WLoader, { props: { size: 'lg' } }).classes()).toContain('w-loader--lg')
  })

  it('config sem src também cai no anel', () => {
    const w = comLoader({ src: '' })
    expect(w.find('img').exists()).toBe(false)
    expect(w.find('.w-loader__ring').exists()).toBe(true)
  })
})

describe('WLoader com loader configurado', () => {
  it('renderiza picture/img com src, srcset, alt vazio e decoding async', () => {
    const w = comLoader({ src: '/l.webp', srcset: '/l@2x.webp 2x' })
    const img = w.find('picture > img')
    expect(img.attributes('src')).toBe('/l.webp')
    expect(img.attributes('srcset')).toBe('/l@2x.webp 2x')
    expect(img.attributes('alt')).toBe('')
    expect(img.attributes('decoding')).toBe('async')
    expect(w.find('.w-loader__ring').exists()).toBe(false)
  })

  it('still vira source de prefers-reduced-motion; sem still não há source', () => {
    const w = comLoader({ src: '/l.webp', still: '/l.png' })
    const source = w.find('picture > source')
    expect(source.attributes('media')).toBe('(prefers-reduced-motion: reduce)')
    expect(source.attributes('srcset')).toBe('/l.png')
    expect(comLoader({ src: '/l.webp' }).find('source').exists()).toBe(false)
  })

  it('o label continua acessível, e a imagem é decorativa', () => {
    const w = comLoader({ src: '/l.webp' }, { label: 'Carregando gráfico' })
    expect(w.attributes('role')).toBe('status')
    expect(w.find('.w-loader__label').text()).toBe('Carregando gráfico')
  })
})

describe('WLoader overlay', () => {
  it('sem overlay não tem a classe; com overlay vira o véu e mantém o tamanho', () => {
    expect(mount(WLoader).classes()).not.toContain('w-loader--overlay')
    const w = mount(WLoader, { props: { overlay: true, size: 'lg' } })
    expect(w.classes()).toEqual(expect.arrayContaining(['w-loader--overlay', 'w-loader--lg']))
    expect(w.find('.w-loader__ring').exists()).toBe(true)
  })
})

describe('WLoader loading', () => {
  afterEach(() => vi.useRealTimers())

  it('undefined: sempre desenha, como antes', () => {
    expect(mount(WLoader).find('[role="status"]').exists()).toBe(true)
  })

  it('false: não renderiza nada', () => {
    const w = mount(WLoader, { props: { loading: false } })
    expect(w.html()).toBe('<!--v-if-->')
  })

  it('true: só aparece depois do atraso (padrão 300) e some respeitando o mínimo (500)', async () => {
    vi.useFakeTimers()
    const w = mount(WLoader, { props: { loading: true } })
    vi.advanceTimersByTime(299)
    await nextTick()
    expect(w.find('[role="status"]').exists()).toBe(false)
    vi.advanceTimersByTime(1)
    await nextTick()
    expect(w.find('[role="status"]').exists()).toBe(true)

    vi.advanceTimersByTime(100)
    await w.setProps({ loading: false })
    expect(w.find('[role="status"]').exists()).toBe(true)
    vi.advanceTimersByTime(399)
    await nextTick()
    expect(w.find('[role="status"]').exists()).toBe(true)
    vi.advanceTimersByTime(1)
    await nextTick()
    expect(w.find('[role="status"]').exists()).toBe(false)
  })

  it('usa delay e minDuration do loader configurado', async () => {
    vi.useFakeTimers()
    const w = comLoader({ src: '/l.webp', delay: 50, minDuration: 0 }, { loading: true })
    vi.advanceTimersByTime(50)
    await nextTick()
    expect(w.find('img').exists()).toBe(true)
    await w.setProps({ loading: false })
    expect(w.find('img').exists()).toBe(false)
  })
})
