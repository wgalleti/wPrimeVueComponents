// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
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

  describe('digitação', () => {
    // v-model de verdade: o que o campo emite volta como prop, como num formulário.
    function controlado(props: Record<string, unknown> = {}) {
      const w: VueWrapper = mount(WDatePicker, {
        props: {
          modelValue: '2026-12-19',
          ...props,
          'onUpdate:modelValue': (v: unknown) => w.setProps({ modelValue: v }),
        },
        global: { plugins: [PrimeVue], stubs: { teleport: true, DatePicker: true } },
      })
      return w
    }
    async function digitar(w: VueWrapper, texto: string) {
      const input = w.find('input')
      ;(input.element as HTMLInputElement).value = texto
      await input.trigger('input')
    }
    const emitidos = (w: VueWrapper) => (w.emitted('update:modelValue') ?? []).map((e) => e[0])
    const valor = (w: VueWrapper) => (w.find('input').element as HTMLInputElement).value

    it('data completa emite uma vez só (a máscara dispara input em dobro)', async () => {
      const w = controlado()
      await digitar(w, '19/11/2026')
      await digitar(w, '19/11/2026')
      expect(emitidos(w)).toEqual(['2026-11-19'])
    })

    it('ano com 2 dígitos não vira 2020 no meio da digitação; completa ao sair', async () => {
      const w = controlado()
      await digitar(w, '19/11/20')
      expect(emitidos(w)).toEqual([])
      await digitar(w, '19/11/26')
      await w.find('input').trigger('blur')
      expect(emitidos(w)).toEqual(['2026-11-19'])
      expect(valor(w)).toBe('19/11/2026')
    })

    it('texto incompleto ao sair limpa o valor e fica à vista, marcado inválido', async () => {
      const w = controlado()
      await digitar(w, '19/11/2')
      await w.find('input').trigger('blur')
      expect(emitidos(w)).toEqual([null])
      expect(valor(w)).toBe('19/11/2')
      expect(w.find('input').attributes('aria-invalid')).toBe('true')
      await digitar(w, '19/11/2026')
      expect(emitidos(w)).toEqual([null, '2026-11-19'])
      expect(w.find('input').attributes('aria-invalid')).not.toBe('true')
    })

    it('data digitada fora de min/max não entra', async () => {
      const w = controlado({ modelValue: null, minDate: '2026-11-19' })
      await digitar(w, '18/11/2026')
      await w.find('input').trigger('blur')
      expect(emitidos(w)).toEqual([])
      expect(w.find('input').attributes('aria-invalid')).toBe('true')
      await digitar(w, '19/11/2026')
      expect(emitidos(w)).toEqual(['2026-11-19'])
    })
  })
})
