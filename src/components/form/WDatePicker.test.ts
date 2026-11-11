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

  // O calendário em si (PrimeVue) não interessa aqui e pede matchMedia, que o jsdom não tem.
  const comPainel = { teleport: true, DatePicker: true }

  it('só data: atalho Hoje, sem OK (o clique no dia já fecha)', async () => {
    const w = mount(WDatePicker, {
      props: { modelValue: null },
      global: { plugins: [PrimeVue], stubs: comPainel },
    })
    await w.find('[aria-label="Abrir calendário"]').trigger('click')
    const rotulos = w.findAll('.w-datepicker-actions button').map((b) => b.text())
    expect(rotulos).toEqual(['Hoje', 'Limpar'])
  })

  it('com hora: Agora e Limpar à esquerda e OK que fecha e volta o foco ao campo', async () => {
    const w = mount(WDatePicker, {
      props: { modelValue: null, showTime: true },
      global: { plugins: [PrimeVue], stubs: comPainel },
      attachTo: document.body,
    })
    await w.find('[aria-label="Abrir calendário"]').trigger('click')
    const atalhos = w.findAll('.w-datepicker-shortcuts button').map((b) => b.text())
    expect(atalhos).toEqual(['Agora', 'Limpar'])
    const ok = w.findAll('.w-datepicker-actions > button')
    expect(ok.map((b) => b.text())).toEqual(['OK'])
    await ok[0].trigger('click')
    expect(document.activeElement).toBe(w.find('input').element)
    w.unmount()
  })
})
