import { describe, it, expect } from 'vitest'
import { resolveBuildId, wBuildIdentity } from './buildIdentity'

describe('wBuildIdentity', () => {
  it('usa a versão da esteira quando existe', () => {
    expect(resolveBuildId(' 2026.10-1 ')).toEqual({ build: '2026.10-1', version: '2026.10-1' })
  })

  it('sem versão (ou "dev"), usa o carimbo do build', () => {
    const agora = () => new Date('2026-10-09T12:00:00.000Z')
    expect(resolveBuildId('', agora)).toEqual({ build: 'local-2026-10-09T12:00:00.000Z', version: null })
    expect(resolveBuildId('dev', agora).version).toBeNull()
  })

  it('embute o mesmo valor que publica em version.json', () => {
    const plugin = wBuildIdentity({ version: 'v9' })
    const emitidos: { fileName: string; source: string }[] = []
    plugin.generateBundle.call({ emitFile: (f) => emitidos.push(f) })

    expect(plugin.config().define.__BUILD_ID__).toBe('"v9"')
    expect(emitidos[0].fileName).toBe('version.json')
    expect(JSON.parse(emitidos[0].source)).toEqual({ build: 'v9', version: 'v9' })
  })
})
