// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WMoneyInput from './WMoneyInput.vue'

function montar(props: Record<string, unknown>) {
  return mount(WMoneyInput, {
    props: { modelValue: null, ...props },
    global: { plugins: [PrimeVue] },
  })
}

describe('WMoneyInput', () => {
  it('formata o valor e emite number ao digitar', async () => {
    const w = montar({ modelValue: 1234.56, currency: true })
    expect((w.find('input').element as HTMLInputElement).value).toBe('1.234,56')
    await w.find('input').setValue('12345')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([123.45])
  })

  it('texto do input volta ao modelo quando o pai trava o valor', async () => {
    for (const props of [{ suffix: '%' }, {}]) {
      // Pai que ignora a emissão: o modelo fica em 100.
      const w = montar({ ...props, modelValue: 100 })
      const input = w.find('input')
      await input.setValue('15000')
      await flushPromises()
      expect((input.element as HTMLInputElement).value).toBe('100,00')
    }
  })

  it('inputId e inputAttrs caem no <input>, com ou sem addon', () => {
    const attrs = { 'aria-labelledby': 'lbl', 'aria-required': 'true' }
    for (const props of [{ currency: true }, {}]) {
      const w = montar({ ...props, inputId: 'f-valor', inputAttrs: attrs })
      const input = w.find('input')
      expect(input.attributes('id')).toBe('f-valor')
      expect(input.attributes('aria-labelledby')).toBe('lbl')
      expect(input.attributes('aria-required')).toBe('true')
    }
  })

  it('min/max: clamp só ao sair do campo, inclusive no modo %', async () => {
    const w = montar({ modelValue: 150, suffix: '%', min: 0, max: 100 })
    expect(w.emitted('update:modelValue')).toBeUndefined()
    await w.find('input').trigger('blur')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([100])

    const baixo = montar({ modelValue: 2, min: 5 })
    await baixo.find('input').trigger('blur')
    expect(baixo.emitted('update:modelValue')?.at(-1)).toEqual([5])

    const dentro = montar({ modelValue: 50, min: 0, max: 100 })
    await dentro.find('input').trigger('blur')
    expect(dentro.emitted('update:modelValue')).toBeUndefined()
  })
})
