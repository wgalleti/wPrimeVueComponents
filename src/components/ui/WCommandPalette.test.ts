// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import WCommandPalette from './WCommandPalette.vue'

const items = [
  { id: 'a', label: 'Imóveis', group: 'Cadastros', icon: 'pi pi-home' },
  { id: 'b', label: 'Leads', group: 'Funil' },
  { id: 'c', label: 'Corretores', group: 'Cadastros' },
]

let w: VueWrapper
const abrir = (props: Record<string, unknown> = {}) => {
  w = mount(WCommandPalette, {
    props: {
      items,
      visible: true,
      'onUpdate:visible': (v: boolean) => w.setProps({ visible: v }),
      ...props,
    },
    attachTo: document.body,
  })
  return w
}
const q = <T extends Element>(s: string) => document.body.querySelector<T>(s)
const opcoes = () =>
  [...document.body.querySelectorAll('[role=option]')].map((o) => o.textContent?.trim())
const tecla = (key: string, init: KeyboardEventInit = {}, alvo: EventTarget = window) =>
  alvo.dispatchEvent(
    new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }),
  )

afterEach(() => {
  w?.unmount()
  document.body.innerHTML = ''
})

describe('WCommandPalette', () => {
  it('sem termo mostra recentes primeiro e o resto agrupado', async () => {
    abrir({ recent: ['b'] })
    await nextTick()
    const grupos = [...document.body.querySelectorAll('[role=group]')].map((g) =>
      g.getAttribute('aria-label'),
    )
    expect(grupos).toEqual(['Recentes', 'Cadastros'])
    expect(opcoes()[0]).toContain('Leads')
  })

  it('termo filtra sem acento em lista única e navega por setas + Enter', async () => {
    abrir()
    await nextTick()
    const input = q<HTMLInputElement>('input')!
    input.value = 'cadastros'
    input.dispatchEvent(new Event('input'))
    await nextTick()
    expect(opcoes()).toHaveLength(2)
    expect(input.getAttribute('aria-activedescendant')).toBe(q('[role=option]')!.id)
    tecla('ArrowDown', {}, input)
    await nextTick()
    tecla('Enter', {}, input)
    await nextTick()
    expect(w.emitted('select')![0][0]).toMatchObject({ id: 'c' })
    expect(w.emitted('update:visible')!.at(-1)).toEqual([false])
  })

  it('Esc fecha; Tab não tira o foco do campo', async () => {
    abrir()
    await nextTick()
    const input = q<HTMLInputElement>('input')!
    expect(tecla('Tab', {}, input)).toBe(false)
    tecla('Escape', {}, input)
    await nextTick()
    expect(w.emitted('update:visible')!.at(-1)).toEqual([false])
  })

  it('Ctrl+K alterna e "/" abre só fora de campo de texto', async () => {
    abrir({ visible: false })
    tecla('k', { ctrlKey: true })
    await nextTick()
    expect(w.emitted('update:visible')![0]).toEqual([true])
    tecla('k', { metaKey: true })
    await nextTick()
    expect(w.emitted('update:visible')![1]).toEqual([false])

    const campo = document.createElement('input')
    document.body.appendChild(campo)
    tecla('/', {}, campo)
    await nextTick()
    expect(w.emitted('update:visible')).toHaveLength(2)
    tecla('/', {}, document.body)
    await nextTick()
    expect(w.emitted('update:visible')![2]).toEqual([true])
  })

  it('shortcut=false desliga os atalhos globais', async () => {
    abrir({ visible: false, shortcut: false })
    tecla('k', { ctrlKey: true })
    await nextTick()
    expect(w.emitted('update:visible')).toBeUndefined()
  })

  it('mostra aviso quando nada casa', async () => {
    abrir()
    await nextTick()
    const input = q<HTMLInputElement>('input')!
    input.value = 'zzz'
    input.dispatchEvent(new Event('input'))
    await nextTick()
    expect(q('[role=status]')!.textContent).toContain('zzz')
  })

  it('ignora Ctrl+K com campo de texto em foco, modal aberto ou tecla repetida', async () => {
    abrir({ visible: false })
    const campo = document.createElement('input')
    document.body.appendChild(campo)
    tecla('k', { ctrlKey: true }, campo)
    tecla('k', { ctrlKey: true, repeat: true })
    const modal = document.createElement('div')
    modal.className = 'p-dialog-mask'
    document.body.appendChild(modal)
    tecla('k', { ctrlKey: true })
    await nextTick()
    expect(w.emitted('update:visible')).toBeUndefined()
  })

  it('shortcut liga e desliga o listener depois de montado', async () => {
    abrir({ visible: false, shortcut: false })
    await w.setProps({ shortcut: true })
    tecla('k', { ctrlKey: true })
    await nextTick()
    expect(w.emitted('update:visible')).toHaveLength(1)
    await w.setProps({ shortcut: false })
    tecla('k', { ctrlKey: true })
    expect(w.emitted('update:visible')).toHaveLength(1)
  })

  it('isola o fundo com inert e devolve o foco ao fechar', async () => {
    const fundo = document.createElement('button')
    document.body.appendChild(fundo)
    fundo.focus()
    abrir({ visible: false })
    await w.setProps({ visible: true })
    await nextTick()
    expect(fundo.inert).toBe(true)
    await w.setProps({ visible: false })
    await nextTick()
    expect(fundo.inert).toBe(false)
    expect(document.activeElement).toBe(fundo)
  })

  it('aria: expanded segue a lista e o aviso de vazio fica fora do listbox', async () => {
    abrir()
    await nextTick()
    const input = q<HTMLInputElement>('input')!
    expect(input.getAttribute('aria-autocomplete')).toBe('list')
    expect(input.getAttribute('aria-expanded')).toBe('true')
    input.value = 'zzz'
    input.dispatchEvent(new Event('input'))
    await nextTick()
    expect(input.getAttribute('aria-expanded')).toBe('false')
    const aviso = q('[role=status]')!
    expect(aviso.getAttribute('aria-live')).toBe('polite')
    expect(q('[role=listbox]')!.contains(aviso)).toBe(false)
  })
})
