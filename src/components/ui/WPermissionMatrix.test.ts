// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WPermissionMatrix from './WPermissionMatrix.vue'
import type { PermissionValue } from '@/types/permissionMatrix'

const operations = [
  { key: 'ver', label: 'Ver' },
  { key: 'editar', label: 'Editar' },
  { key: 'gerenciar', label: 'Gerenciar' },
]
const rows = [
  { id: 'leads', label: 'Leads', grupo: 'CRM', ops: ['ver', 'editar'] },
  { id: 'contatos', label: 'Contatos', grupo: 'CRM', ops: ['ver', 'editar'] },
  { id: 'perfis', label: 'Perfis', grupo: 'Acessos', ops: ['ver', 'gerenciar'] },
]

function make(extra: Record<string, unknown> = {}) {
  return mount(WPermissionMatrix, {
    attachTo: document.body,
    props: {
      rows,
      operations,
      groupBy: 'grupo',
      cardMode: 'never',
      isAvailable: (r: Record<string, unknown>, op: string) => (r.ops as string[]).includes(op),
      isLocked: (r: Record<string, unknown>, op: string) => r.id === 'perfis' && op === 'gerenciar',
      lockedReason: () => 'Peça a outro administrador',
      ...extra,
    },
    global: { plugins: [PrimeVue] },
  })
}

const box = (w: ReturnType<typeof make>, label: string) => w.find(`input[aria-label="${label}"]`)
const last = (w: ReturnType<typeof make>) =>
  w.emitted('update:modelValue')!.at(-1)![0] as PermissionValue

describe('WPermissionMatrix', () => {
  it('grade com grupos; célula por operação com nome "linha: operação"; inexistente vazia', () => {
    const w = make()
    expect(w.find('table').attributes('role')).toBe('grid')
    expect(w.findAll('.w-permission-matrix__group-label').map((g) => g.text())).toEqual([
      'CRM',
      'Acessos',
    ])
    expect(box(w, 'Leads: Ver').exists()).toBe(true)
    expect(box(w, 'Leads: Gerenciar').exists()).toBe(false)
    expect(w.findAll('.w-permission-matrix__cell--na')).toHaveLength(3)
  })

  it('clicar na célula liga e desliga a operação da linha', async () => {
    const w = make({ modelValue: { leads: ['ver'] } })
    await box(w, 'Leads: Editar').setValue(true)
    expect(last(w)).toEqual({ leads: ['ver', 'editar'] })
    await w.setProps({ modelValue: { leads: ['ver', 'editar'] } })
    await box(w, 'Leads: Ver').setValue(false)
    expect(last(w)).toEqual({ leads: ['editar'] })
  })

  it('célula fixa: desabilitada, cadeado e motivo sob o nome da linha', () => {
    const w = make({ modelValue: { perfis: ['gerenciar'] } })
    expect(box(w, 'Perfis: Gerenciar').attributes('disabled')).toBeDefined()
    expect(w.find('.w-permission-matrix__note').text()).toContain(
      'Gerenciar: Peça a outro administrador',
    )
  })

  it('marcar a linha toda respeita a fixa (marcada fica, desmarcada fica)', async () => {
    const w = make({ modelValue: { perfis: ['gerenciar'] } })
    await box(w, 'Perfis: todas').setValue(true)
    expect(last(w)).toEqual({ perfis: ['gerenciar', 'ver'] })
    await w.setProps({ modelValue: { perfis: ['gerenciar', 'ver'] } })
    await box(w, 'Perfis: todas').setValue(false)
    expect(last(w)).toEqual({ perfis: ['gerenciar'] })
  })

  it('coluna marca só as linhas que têm a operação; grupo marca o grupo inteiro', async () => {
    const w = make({ modelValue: { fora: ['x'] } })
    await box(w, 'Editar: marcar em todas as linhas').setValue(true)
    expect(last(w)).toEqual({ fora: ['x'], leads: ['editar'], contatos: ['editar'] })
    await box(w, 'CRM: marcar tudo').setValue(true)
    expect(last(w)).toEqual({
      fora: ['x'],
      leads: ['editar', 'ver'],
      contatos: ['editar', 'ver'],
    })
  })

  it('estado indeterminado na linha com marcação parcial', () => {
    const w = make({ modelValue: { leads: ['ver'] } })
    expect((box(w, 'Leads: todas').element as HTMLInputElement).indeterminate).toBe(true)
  })

  it('teclado de grade: uma célula no Tab, setas andam e pulam a vazia/fixa', async () => {
    const w = make()
    const tabbable = w.findAll('td input').filter((i) => i.attributes('tabindex') === '0')
    expect(tabbable).toHaveLength(1)
    expect(tabbable[0].attributes('aria-label')).toBe('Leads: todas')

    const verLeads = box(w, 'Leads: Ver')
    ;(verLeads.element as HTMLInputElement).focus()
    await verLeads.trigger('focus')
    await verLeads.trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Leads: Editar')
    await box(w, 'Leads: Editar').trigger('keydown', { key: 'ArrowRight' })
    // Leads não tem Gerenciar: fica onde está
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Leads: Editar')
    await box(w, 'Leads: Editar').trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Contatos: Editar')
    await box(w, 'Contatos: Editar').trigger('keydown', { key: 'Home' })
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Contatos: todas')
    w.unmount()
  })

  it('disabled trava tudo; card mostra o nome da operação ao lado do checkbox', () => {
    const travada = make({ disabled: true })
    expect(travada.findAll('td input').every((i) => i.attributes('disabled') != null)).toBe(true)
    const card = make({ cardMode: 'always' })
    expect(card.classes()).toContain('w-permission-matrix--cards')
    expect(card.find('thead').exists()).toBe(false)
    expect(card.find('.w-permission-matrix__cell .w-permission-matrix__check').text()).toBe('Todas')
  })
})

describe('WPermissionMatrix — muitas operações', () => {
  // jsdom não calcula layout: confere a regra no CSS que a suíte publica.
  const css = readFileSync('src/assets/ui.css', 'utf8')

  it('a grade rola na horizontal e a coluna dos nomes fica fixa, com largura mínima', () => {
    expect(css).toMatch(
      /\.w-permission-matrix:not\(\.w-permission-matrix--cards\) \.w-permission-matrix__table \{\s*min-width: max-content;/,
    )
    expect(css).toMatch(
      /__name \{\s*position: sticky;[^}]*min-width: var\(--w-permission-name-min, 11rem\);/,
    )
  })
})
