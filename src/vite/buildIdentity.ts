/**
 * Plugin Vite: embute a identidade do build (`__BUILD_ID__`) e publica o MESMO valor em
 * `version.json`, na raiz do dist — fora de `assets/`, que é imutável no cache.
 *
 * Identificador = versão da esteira (`VITE_APP_VERSION`); sem ela, o carimbo do momento do
 * build — dois builds locais também são versões diferentes.
 *
 * ```ts
 * import { wBuildIdentity } from '@wgalleti/primevue-components/vite'
 * plugins: [vue(), wBuildIdentity()]
 * ```
 */

interface EmitContext {
  emitFile: (file: { type: 'asset'; fileName: string; source: string }) => unknown
}

export interface BuildIdentityOptions {
  /** Versão publicada. Default: `process.env.VITE_APP_VERSION`. */
  version?: string
  /** Nome do arquivo emitido. Default: `version.json`. */
  fileName?: string
}

export function resolveBuildId(version: string | undefined, now: () => Date = () => new Date()): {
  build: string
  version: string | null
} {
  const versao = (version ?? '').trim()
  const temVersao = Boolean(versao) && versao !== 'dev'
  return { build: temVersao ? versao : `local-${now().toISOString()}`, version: temVersao ? versao : null }
}

export function wBuildIdentity(options: BuildIdentityOptions = {}) {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {}
  const identidade = resolveBuildId(options.version ?? env.VITE_APP_VERSION)
  return {
    name: 'w-build-identity',
    config: () => ({ define: { __BUILD_ID__: JSON.stringify(identidade.build) } }),
    // generateBundle não roda no servidor de desenvolvimento: o arquivo só existe no build.
    generateBundle(this: EmitContext) {
      this.emitFile({
        type: 'asset',
        fileName: options.fileName ?? 'version.json',
        source: `${JSON.stringify(identidade)}\n`,
      })
    },
  }
}
