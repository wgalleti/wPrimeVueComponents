// Sidecar de autoria (`*.meta.ts` ao lado de cada componente). Carrega só o que
// os TIPOS não expressam — categoria, ícone e exemplos ao vivo. Props/events/slots
// (incl. defaults e descrições via JSDoc) saem do próprio SFC, extraídos por
// `yarn meta` para src/generated/component-meta.json.
//
// Importado ao vivo pelos consumidores (workbench/docs) via import.meta.glob —
// NÃO entra no bundle publicado da lib.

/** Dica de controle para o workbench quando o tipo da prop não basta. */
export interface ControlHint {
  type?: 'text' | 'number' | 'boolean' | 'select' | 'color' | 'textarea'
  /** Opções para 'select' quando não dá pra inferir de um union type. */
  options?: (string | number)[]
  min?: number
  max?: number
  step?: number
}

/** Um cenário de uso, renderizado ao vivo no workbench e nas docs. */
export interface ComponentExample {
  /** Título curto (aba/seção). */
  name: string
  description?: string
  /** Valores de props deste cenário. */
  props?: Record<string, unknown>
  /** Conteúdo de slot por nome (template como string, para o snippet). */
  slots?: Record<string, string>
}

export interface ComponentSidecar {
  /** Categoria para agrupar na navegação (ex.: 'CRUD', 'Formulário', 'UI'). */
  category: string
  /** Ícone PrimeIcons (ex.: 'pi pi-chart-bar'). */
  icon?: string
  /** Resumo de uma linha (fallback quando o SFC não tem doc de topo). */
  summary?: string
  /** Exemplos ao vivo; o primeiro é o estado inicial do workbench. */
  examples?: ComponentExample[]
  /** Dicas de controle por prop, quando o tipo não basta para o workbench. */
  controls?: Record<string, ControlHint>
}

/** Helper de autoria: type-check + autocomplete no sidecar. */
export function defineComponentMeta(meta: ComponentSidecar): ComponentSidecar {
  return meta
}
