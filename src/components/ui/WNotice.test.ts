// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WNotice from './WNotice.vue'

describe('WNotice', () => {
  it('só danger usa role alert; warn, info e success, status', () => {
    const role = (severity: 'info' | 'warn' | 'danger' | 'success') =>
      mount(WNotice, { props: { severity } }).attributes('role')
    expect([role('danger'), role('warn'), role('info'), role('success')]).toEqual([
      'alert',
      'status',
      'status',
      'status',
    ])
  })

  it('mostra título e slot', () => {
    const w = mount(WNotice, { props: { title: 'Atenção' }, slots: { default: 'Texto' } })
    expect(w.find('.w-notice-title').text()).toBe('Atenção')
    expect(w.find('.w-notice-text').text()).toBe('Texto')
  })

  it('closable emite close; sem closable não há botão', async () => {
    expect(mount(WNotice).find('button').exists()).toBe(false)
    const w = mount(WNotice, { props: { closable: true } })
    await w.find('button').trigger('click')
    expect(w.emitted('close')).toHaveLength(1)
  })
})
