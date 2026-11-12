import { describe, it, expect, vi, afterEach } from 'vitest'
import { effectScope, ref, nextTick } from 'vue'
import { useDelayedLoading } from './useDelayedLoading'

afterEach(() => vi.useRealTimers())

describe('useDelayedLoading', () => {
  it('só mostra o esqueleto depois do delay', async () => {
    vi.useFakeTimers()
    const c = ref(true)
    const { showSkeleton } = effectScope().run(() => useDelayedLoading(c, { delay: 150 }))!
    vi.advanceTimersByTime(149)
    expect(showSkeleton.value).toBe(false)
    vi.advanceTimersByTime(1)
    expect(showSkeleton.value).toBe(true)
  })

  it('carregamento rápido nunca mostra e o fim apaga na hora', async () => {
    vi.useFakeTimers()
    const c = ref(true)
    const { showSkeleton } = effectScope().run(() => useDelayedLoading(() => c.value))!
    vi.advanceTimersByTime(100)
    c.value = false
    await nextTick()
    vi.advanceTimersByTime(500)
    expect(showSkeleton.value).toBe(false)

    c.value = true
    await nextTick()
    vi.advanceTimersByTime(150)
    expect(showSkeleton.value).toBe(true)
    c.value = false
    await nextTick()
    expect(showSkeleton.value).toBe(false)
  })

  it('limpa o timer ao sair do escopo', () => {
    vi.useFakeTimers()
    const scope = effectScope()
    const { showSkeleton } = scope.run(() => useDelayedLoading(ref(true)))!
    scope.stop()
    vi.advanceTimersByTime(500)
    expect(showSkeleton.value).toBe(false)
  })

  it('delay aceita getter', () => {
    vi.useFakeTimers()
    const d = ref(300)
    const { showSkeleton } = effectScope().run(() =>
      useDelayedLoading(ref(true), { delay: () => d.value }),
    )!
    vi.advanceTimersByTime(299)
    expect(showSkeleton.value).toBe(false)
    vi.advanceTimersByTime(1)
    expect(showSkeleton.value).toBe(true)
  })
})
