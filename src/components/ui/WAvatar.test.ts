// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import WAvatar from './WAvatar.vue'
import { initialsOf, toneOf } from '@/utils/initials'

describe('initialsOf / toneOf', () => {
  it('usa a primeira letra da primeira e da última palavra', () => {
    expect(initialsOf('maria da silva')).toBe('MS')
    expect(initialsOf('  Carlos ')).toBe('C')
    expect(initialsOf('')).toBe('')
    expect(initialsOf(null)).toBe('')
  })

  it('a cor é estável e fica entre 1 e 6', () => {
    expect(toneOf('Ana')).toBe(toneOf('  ana '))
    for (const n of ['Ana', 'Bruno', 'Carla', 'Diego', 'Eva', 'Fábio']) {
      expect(toneOf(n)).toBeGreaterThanOrEqual(1)
      expect(toneOf(n)).toBeLessThanOrEqual(6)
    }
  })
})

describe('WAvatar', () => {
  it('mostra as iniciais e o nome como texto alternativo', () => {
    const w = mount(WAvatar, { props: { name: 'Maria da Silva' } })
    expect(w.text()).toBe('MS')
    expect(w.attributes('aria-label')).toBe('Maria da Silva')
    expect(w.classes().some((c) => c.startsWith('w-avatar--tone-'))).toBe(true)
  })

  it('a foto vence as iniciais', () => {
    const w = mount(WAvatar, { props: { name: 'Maria', src: '/m.png' } })
    expect(w.find('img').attributes('src')).toBe('/m.png')
    expect(w.text()).toBe('')
  })

  it('sem nome nem foto mostra o ícone de pessoa vazio', () => {
    const w = mount(WAvatar, { props: { name: null } })
    expect(w.classes()).toContain('w-avatar--empty')
    expect(w.find('.pi-user').exists()).toBe(true)
    expect(w.attributes('aria-label')).toBe('Sem pessoa')
  })

  it('o tamanho vira modificador', () => {
    expect(mount(WAvatar, { props: { name: 'A', size: 'sm' } }).classes()).toContain('w-avatar--sm')
  })
})
