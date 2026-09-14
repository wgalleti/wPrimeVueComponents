// @vitest-environment jsdom
//
// Enter como Tab: o foco avança entre os campos do container, `data-kbd-skip`
// tira o elemento da sequência e `data-kbd-hold` segura o foco no campo (para o
// próprio componente tratar o Enter). O jsdom não faz layout, então
// `getClientRects` é simulado para todo elemento contar como visível.
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { defineComponent, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useFormKeyboardNav } from './useFormKeyboardNav'

const getClientRects = HTMLElement.prototype.getClientRects
beforeAll(() => {
  HTMLElement.prototype.getClientRects = function () {
    return [{}] as unknown as DOMRectList
  }
})
afterAll(() => {
  HTMLElement.prototype.getClientRects = getClientRects
})

function montar(template: string, onSubmit = vi.fn()) {
  const Form = defineComponent({
    setup() {
      const formRef = ref<HTMLElement | null>(null)
      const { handleKeydown, focusFirst } = useFormKeyboardNav(formRef, { onSubmit })
      return { formRef, handleKeydown, focusFirst }
    },
    template,
  })
  const wrapper = mount(Form, { attachTo: document.body })
  return { wrapper, onSubmit }
}

const enter = { key: 'Enter' }

describe('useFormKeyboardNav — Enter avança', () => {
  it('Enter no primeiro campo foca o segundo; no último, chama onSubmit', async () => {
    const { wrapper, onSubmit } = montar(`
      <div ref="formRef" @keydown.capture="handleKeydown">
        <input id="a" /><input id="b" />
      </div>`)
    const a = wrapper.find('#a')
    const b = wrapper.find('#b')
    ;(a.element as HTMLElement).focus()
    await a.trigger('keydown', enter)
    expect(document.activeElement).toBe(b.element)
    await b.trigger('keydown', enter)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('data-kbd-skip pula o elemento', async () => {
    const { wrapper } = montar(`
      <div ref="formRef" @keydown.capture="handleKeydown">
        <input id="a" /><button id="cancelar" data-kbd-skip>Cancelar</button><button id="salvar">Salvar</button>
      </div>`)
    const a = wrapper.find('#a')
    ;(a.element as HTMLElement).focus()
    await a.trigger('keydown', enter)
    expect(document.activeElement).toBe(wrapper.find('#salvar').element)
    wrapper.unmount()
  })
})

describe('useFormKeyboardNav — data-kbd-hold segura o foco', () => {
  it('no ancestral do campo: Enter não avança (e não submete), mas é prevenido', async () => {
    const { wrapper, onSubmit } = montar(`
      <div ref="formRef" @keydown.capture="handleKeydown">
        <div data-kbd-hold><input id="a" /></div><input id="b" />
      </div>`)
    const a = wrapper.find('#a')
    ;(a.element as HTMLElement).focus()
    const evento = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    a.element.dispatchEvent(evento)
    expect(evento.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(a.element)
    expect(onSubmit).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('sem o atributo (campo resolvido), o mesmo Enter volta a avançar', async () => {
    const Form = defineComponent({
      setup() {
        const formRef = ref<HTMLElement | null>(null)
        const segurar = ref(true)
        const { handleKeydown } = useFormKeyboardNav(formRef)
        return { formRef, handleKeydown, segurar }
      },
      template: `
        <div ref="formRef" @keydown.capture="handleKeydown">
          <div :data-kbd-hold="segurar || undefined"><input id="a" /></div><input id="b" />
        </div>`,
    })
    const wrapper = mount(Form, { attachTo: document.body })
    const a = wrapper.find('#a')
    ;(a.element as HTMLElement).focus()
    await a.trigger('keydown', enter)
    expect(document.activeElement).toBe(a.element)

    ;(wrapper.vm as unknown as { segurar: boolean }).segurar = false
    await wrapper.vm.$nextTick()
    await a.trigger('keydown', enter)
    expect(document.activeElement).toBe(wrapper.find('#b').element)
    wrapper.unmount()
  })
})
