// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WProgress from './WProgress.vue'

describe('WProgress', () => {
  it('determinado: aria-valuenow, valuetext e fração no estilo', () => {
    const w = mount(WProgress, { props: { value: 40, label: 'Importando' } })
    const bar = w.find('[role="progressbar"]')
    expect(bar.attributes('aria-valuenow')).toBe('40')
    expect(bar.attributes('aria-valuetext')).toBe('Importando: 40%')
    expect(w.find('.w-progress-fill').attributes('style')).toContain('0.4')
  })

  it('sem value é indeterminado, sem aria-valuenow', () => {
    const w = mount(WProgress)
    expect(w.classes()).toContain('w-progress--indeterminate')
    expect(w.find('[role="progressbar"]').attributes('aria-valuenow')).toBeUndefined()
  })

  it('limita o valor a 0-100 e strip não mostra legenda', () => {
    const w = mount(WProgress, { props: { value: 150, size: 'strip', label: 'X' } })
    expect(w.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('100')
    expect(w.find('.w-progress-label').exists()).toBe(false)
  })
})
