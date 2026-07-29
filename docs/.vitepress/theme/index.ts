import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ApiTable from './ApiTable.vue'

// Tema padrão do VitePress + componentes globais para as docs.
// <ApiTable name="WKpiCard" /> renderiza props/events/slots a partir do
// manifest gerado (src/generated/component-meta.json) — nunca escrito à mão.
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ApiTable', ApiTable)
  },
} satisfies Theme
