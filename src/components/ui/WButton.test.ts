// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WButton from './WButton.vue'

const montar = (props: Record<string, unknown> = {}, extra: Record<string, unknown> = {}) =>
  mount(WButton, { props, global: { plugins: [PrimeVue] }, ...extra })

afterEach(() => vi.restoreAllMocks())

describe('WButton', () => {
  it('padrão: primary, md, type=button, rótulo e clique', async () => {
    const onClick = vi.fn()
    const w = montar({ label: 'Salvar', icon: 'pi pi-check' }, { attrs: { onClick } })
    const b = w.find('button')
    expect(b.attributes('type')).toBe('button')
    expect(b.classes()).toEqual(expect.arrayContaining(['w-button--primary', 'w-button--md']))
    expect(b.classes()).not.toContain('p-button-text')
    expect(b.text()).toContain('Salvar')
    await b.trigger('click')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('variant e size viram a aparência do Button do PrimeVue', () => {
    expect(montar({ label: 'x', variant: 'ghost' }).find('button').classes()).toEqual(
      expect.arrayContaining(['p-button-text', 'p-button-secondary']),
    )
    expect(montar({ label: 'x', variant: 'secondary' }).find('button').classes()).toContain(
      'p-button-outlined',
    )
    const danger = montar({ label: 'x', variant: 'danger', size: 'sm' }).find('button')
    expect(danger.classes()).toEqual(
      expect.arrayContaining([
        'p-button-danger',
        'p-button-sm',
        'w-button--danger',
        'w-button--sm',
      ]),
    )
  })

  it('loading bloqueia o clique, marca aria-busy e mantém o rótulo no fluxo', async () => {
    const onClick = vi.fn()
    const w = montar({ label: 'Salvar', loading: true }, { attrs: { onClick } })
    const b = w.find('button')
    expect(b.attributes('aria-busy')).toBe('true')
    expect(b.attributes('disabled')).toBeDefined()
    expect(b.classes()).toEqual(expect.arrayContaining(['w-button--loading', 'w-button--bare']))
    expect(b.find('.p-button-label').exists()).toBe(true)
    await b.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('iconOnly: sem rótulo visível, nome por ariaLabel, redondo', () => {
    const b = montar({
      icon: 'pi pi-trash',
      iconOnly: true,
      ariaLabel: 'Excluir',
      label: 'X',
    }).find('button')
    expect(b.attributes('aria-label')).toBe('Excluir')
    expect(b.classes()).toEqual(expect.arrayContaining(['p-button-icon-only', 'p-button-rounded']))
    expect(b.find('.p-button-label').exists()).toBe(false)
  })

  it('iconOnly sem ariaLabel avisa em dev', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    montar({ icon: 'pi pi-trash', iconOnly: true })
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ariaLabel'))
  })

  it('to vira RouterLink', () => {
    const w = montar(
      { label: 'Abrir', to: '/imoveis' },
      { global: { plugins: [PrimeVue], stubs: { RouterLink: RouterLinkStub } } },
    )
    expect(w.findComponent(RouterLinkStub).props('to')).toBe('/imoveis')
  })

  it('slot default substitui o conteúdo', () => {
    const w = montar({}, { slots: { default: '<b class="custom">Ok</b>' } })
    expect(w.find('.custom').text()).toBe('Ok')
  })

  it('size="small" vale como sm e avisa em DEV', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const b = montar({ label: 'x', size: 'small' }).find('button')
    expect(b.classes()).toEqual(expect.arrayContaining(['p-button-sm', 'w-button--sm']))
    expect(warn.mock.calls.some((c) => String(c[0]).includes('"sm"'))).toBe(true)
    warn.mockRestore()
  })
})
