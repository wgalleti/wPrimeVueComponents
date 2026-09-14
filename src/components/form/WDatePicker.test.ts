// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WDatePicker from './WDatePicker.vue'

function montar(props: Record<string, unknown> = {}) {
  return mount(WDatePicker, {
    props: { modelValue: null, ...props },
    global: { plugins: [PrimeVue], stubs: { teleport: true } },
  })
}

describe('WDatePicker', () => {
  it('mostra o ISO como DD/MM/YYYY', () => {
    const w = montar({ modelValue: '2026-08-13' })
    expect((w.find('input').element as HTMLInputElement).value).toBe('13/08/2026')
  })

  it('inputId e inputAttrs caem no <input> de digitação', () => {
    const w = montar({
      inputId: 'f-data',
      inputAttrs: { 'aria-labelledby': 'lbl', 'aria-invalid': 'true' },
    })
    const input = w.find('input')
    expect(input.attributes('id')).toBe('f-data')
    expect(input.attributes('aria-labelledby')).toBe('lbl')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(w.find('[aria-label="Abrir calendário"]').exists()).toBe(true)
  })
})
