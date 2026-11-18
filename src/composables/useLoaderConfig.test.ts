// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { W_CONFIG_KEY } from '@/types/plugin'
import { useLoaderConfig } from './useLoaderConfig'

function read(provided?: unknown) {
  let out: ReturnType<typeof useLoaderConfig> = null
  const C = defineComponent({
    setup() {
      out = useLoaderConfig()
      return () => h('div')
    },
  })
  mount(C, {
    global: { provide: provided === undefined ? {} : { [W_CONFIG_KEY as symbol]: provided } },
  })
  return out
}

describe('useLoaderConfig', () => {
  it('null sem nenhuma configuração provida', () => {
    expect(read()).toBeNull()
  })

  it('null quando a configuração não tem loader (ou ele não tem src)', () => {
    expect(read({ locale: 'pt-BR' })).toBeNull()
    expect(read({ loader: { src: '' } })).toBeNull()
  })

  it('aplica os padrões 300/500 e preserva o resto', () => {
    expect(read({ loader: { src: '/a.webp', srcset: '/a@2x.webp 2x', still: '/a.png' } })).toEqual({
      src: '/a.webp',
      srcset: '/a@2x.webp 2x',
      still: '/a.png',
      delay: 300,
      minDuration: 500,
    })
  })

  it('respeita delay e minDuration, inclusive 0, e descarta valor inválido', () => {
    expect(read({ loader: { src: '/a.webp', delay: 0, minDuration: 0 } })).toMatchObject({
      delay: 0,
      minDuration: 0,
    })
    expect(read({ loader: { src: '/a.webp', delay: -1, minDuration: NaN } })).toMatchObject({
      delay: 300,
      minDuration: 500,
    })
  })
})
