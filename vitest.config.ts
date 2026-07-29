import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

// Config de testes separada do build da lib (vite.config.ts) para não interferir.
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    // utils/composables puros rodam em 'node'; testes de componente que
    // precisarem de DOM anotam `// @vitest-environment jsdom` no topo do arquivo.
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts', 'tests/**/*.{test,spec}.ts'],
  },
})
