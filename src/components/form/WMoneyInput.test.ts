// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
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
})
