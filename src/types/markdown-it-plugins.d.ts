/**
 * Plugins oficiais do markdown-it que não publicam tipos.
 *
 * São todos `PluginSimple` (recebem a instância e registram regras) — a única
 * exceção é o `markdown-it-container`, que leva nome e opções de render.
 */
declare module 'markdown-it-abbr' {
  import type { PluginSimple } from 'markdown-it'
  const plugin: PluginSimple
  export default plugin
}

declare module 'markdown-it-deflist' {
  import type { PluginSimple } from 'markdown-it'
  const plugin: PluginSimple
  export default plugin
}

declare module 'markdown-it-footnote' {
  import type { PluginSimple } from 'markdown-it'
  const plugin: PluginSimple
  export default plugin
}

declare module 'markdown-it-ins' {
  import type { PluginSimple } from 'markdown-it'
  const plugin: PluginSimple
  export default plugin
}

declare module 'markdown-it-mark' {
  import type { PluginSimple } from 'markdown-it'
  const plugin: PluginSimple
  export default plugin
}

declare module 'markdown-it-sub' {
  import type { PluginSimple } from 'markdown-it'
  const plugin: PluginSimple
  export default plugin
}

declare module 'markdown-it-sup' {
  import type { PluginSimple } from 'markdown-it'
  const plugin: PluginSimple
  export default plugin
}

declare module 'markdown-it-container' {
  import type { MarkdownIt, Renderer, Token } from 'markdown-it'

  interface ContainerOptions {
    /** Recebe o texto após o `:::` e decide se o bloco é deste container. */
    validate?: (params: string) => boolean
    /** Gera a marcação de abertura (`nesting === 1`) e de fechamento. */
    render?: (
      tokens: Token[],
      idx: number,
      options: unknown,
      env: unknown,
      self: Renderer,
    ) => string
    marker?: string
  }

  const plugin: (md: MarkdownIt, name: string, options?: ContainerOptions) => void
  export default plugin
}
