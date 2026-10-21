// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useCardFit } from './useCardFit'

type Callback = (entries: { target?: Element; contentRect: { width: number } }[]) => void
let callbacks: Callback[] = []

function instalarResizeObserver() {
  callbacks = []
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(cb: Callback) {
        callbacks.push(cb)
      }
      observe() {}
      disconnect() {}
    },
  )
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
    fn(0)
    return 1
  })
  vi.stubGlobal('cancelAnimationFrame', () => {})
}

/** Componente mínimo: raiz e sonda, com o `estreito` exposto como classe. */
function montar(opcoes?: { regua?: number }) {
  return mount(
    defineComponent({
      setup() {
        const raiz = ref<HTMLElement | null>(null)
        const sonda = ref<HTMLElement | null>(null)
        const { estreito } = useCardFit(raiz, sonda, opcoes)
        return () =>
          h('div', { ref: raiz, class: { estreito: estreito.value } }, [
            h('div', { ref: sonda, class: 'sonda' }),
          ])
      },
    }),
  )
}

async function medir(alvo: Element | undefined, px: number) {
  for (const cb of callbacks) cb([{ target: alvo, contentRect: { width: px } }])
  await nextTick()
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useCardFit', () => {
  it('sem opção vale a régua de 840 mesmo com o piso cabendo', async () => {
    instalarResizeObserver()
    const w = montar()
    await medir(w.find('.sonda').element, 500)
    await medir(undefined, 700)
    expect(w.classes()).toContain('estreito')
    w.unmount()
  })

  it('régua 0: só o piso decide', async () => {
    instalarResizeObserver()
    const w = montar({ regua: 0 })
    await medir(w.find('.sonda').element, 500)
    await medir(undefined, 700)
    expect(w.classes()).not.toContain('estreito')
    await medir(undefined, 400)
    expect(w.classes()).toContain('estreito')
    w.unmount()
  })

  it('régua 0 com piso desconhecido (0) nunca é card', async () => {
    instalarResizeObserver()
    const w = montar({ regua: 0 })
    await medir(undefined, 100)
    expect(w.classes()).not.toContain('estreito')
    w.unmount()
  })
})
