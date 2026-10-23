// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import WFlipCard from './WFlipCard.vue'
import type { FlipCardSlotProps } from '@/types/flipCard'

// Captura o `flip` do escopo para acionar a troca como o botão do consumidor faria.
let escopo: FlipCardSlotProps | null = null

function montar(props: Record<string, unknown> = {}, opcoes: { transicaoReal?: boolean } = {}) {
  const wrapper = mount(WFlipCard, {
    props,
    slots: {
      front: (s: FlipCardSlotProps) => {
        escopo = s
        return 'frente'
      },
      back: (s: FlipCardSlotProps) => {
        escopo = s
        return 'verso'
      },
    },
    attachTo: document.body,
    global: opcoes.transicaoReal ? { stubs: { transition: false } } : {},
  })
  return wrapper
}

beforeEach(() => {
  document.body.innerHTML = ''
  escopo = null
})

describe('WFlipCard — faces', () => {
  it('renderiza só a frente por padrão', () => {
    const wrapper = montar()
    expect(wrapper.find('.w-flip-card__face--front').text()).toBe('frente')
    expect(wrapper.find('.w-flip-card__face--back').exists()).toBe(false)
    expect(escopo?.flipped).toBe(false)
  })

  it('com flipped=true renderiza só o verso', () => {
    const wrapper = montar({ flipped: true })
    expect(wrapper.find('.w-flip-card__face--back').text()).toBe('verso')
    expect(wrapper.find('.w-flip-card__face--front').exists()).toBe(false)
    expect(escopo?.flipped).toBe(true)
  })
})

describe('WFlipCard — flip()', () => {
  it('sem argumento emite update:flipped com o valor invertido', () => {
    const wrapper = montar({ flipped: false })
    escopo!.flip()
    expect(wrapper.emitted('update:flipped')).toEqual([[true]])
  })

  it('flip(true) fixa a face: emite true e não alterna quando já está no verso', async () => {
    const wrapper = montar({ flipped: false })
    escopo!.flip(true)
    expect(wrapper.emitted('update:flipped')).toEqual([[true]])
    await wrapper.setProps({ flipped: true })
    escopo!.flip(true)
    expect(wrapper.emitted('update:flipped')).toEqual([[true]])
    escopo!.flip(false)
    expect(wrapper.emitted('update:flipped')).toEqual([[true], [false]])
  })

  it('sem v-model, troca a face sozinho', async () => {
    const wrapper = montar()
    escopo!.flip()
    await nextTick()
    expect(wrapper.find('.w-flip-card__face--back').exists()).toBe(true)
  })
})

describe('WFlipCard — foco', () => {
  function montarComFoco(props: Record<string, unknown> = {}) {
    return mount(WFlipCard, {
      props,
      slots: {
        front: `<template #front="{ flip }">
          <button class="fora">x</button>
          <button class="ir" data-w-flip-focus @click="flip()">Dados e fórmula</button>
        </template>`,
        back: `<template #back="{ flip }">
          <p>tabela</p>
          <button class="voltar" data-w-flip-focus @click="flip()">Voltar</button>
        </template>`,
      },
      attachTo: document.body,
      global: { stubs: { transition: false } },
    })
  }

  it('não move o foco na montagem', async () => {
    montarComFoco()
    await flushPromises()
    expect(document.activeElement).toBe(document.body)
  })

  it('após a troca, foca o [data-w-flip-focus] da face nova', async () => {
    const wrapper = montarComFoco()
    await wrapper.find('.ir').trigger('click')
    await vi.waitFor(() => expect(document.activeElement?.className).toBe('voltar'))
    await wrapper.find('.voltar').trigger('click')
    await vi.waitFor(() => expect(document.activeElement?.className).toBe('ir'))
  })

  it('sem [data-w-flip-focus], foca a própria face', async () => {
    const wrapper = montar({}, { transicaoReal: true })
    escopo!.flip()
    await vi.waitFor(() =>
      expect(document.activeElement).toBe(wrapper.find('.w-flip-card__face--back').element),
    )
  })
})

describe('WFlipCard — acessibilidade', () => {
  it('cada face é um grupo com aria-label padrão', () => {
    const face = montar().find('.w-flip-card__face--front')
    expect(face.attributes('role')).toBe('group')
    expect(face.attributes('aria-label')).toBe('Frente')
    expect(face.attributes('tabindex')).toBe('-1')
    expect(
      montar({ flipped: true }).find('.w-flip-card__face--back').attributes('aria-label'),
    ).toBe('Verso')
  })

  it('labels viram aria-label, com o padrão no que faltar', () => {
    expect(
      montar({ labels: { front: 'Gráfico' } })
        .find('.w-flip-card__face--front')
        .attributes('aria-label'),
    ).toBe('Gráfico')
    expect(
      montar({ flipped: true, labels: { front: 'Gráfico' } })
        .find('.w-flip-card__face--back')
        .attributes('aria-label'),
    ).toBe('Verso')
    expect(
      montar({ flipped: true, labels: { back: 'Dados do gráfico' } })
        .find('.w-flip-card__face--back')
        .attributes('aria-label'),
    ).toBe('Dados do gráfico')
  })
})
