/** Um título do documento, para montar o índice lateral ("Nesta página"). */
export interface MarkdownHeading {
  /** `id` do heading no HTML — destino da âncora. */
  id: string
  /** Texto puro (sem marcação) exibido no índice. */
  text: string
  /** Nível do heading (2 = `##`, 3 = `###`…). */
  level: number
}

/** Resultado de `renderMarkdown` — HTML já sanitizado + o índice extraído. */
export interface MarkdownRenderResult {
  /** HTML pronto para `v-html` (passou por DOMPurify). */
  html: string
  /** Títulos encontrados, na ordem do documento. */
  headings: MarkdownHeading[]
}
