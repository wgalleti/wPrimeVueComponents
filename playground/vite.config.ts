import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  // No GitHub Pages o playground é publicado como sub-site das docs
  // (/wPrimeVueComponents/playground/); em dev continua na raiz.
  base: process.env.PLAYGROUND_BASE ?? '/',
  plugins: [vue()],
  resolve: {
    // Instância única: o código da lib (aliased para ../src) e o app do playground
    // devem compartilhar o MESMO vue/primevue, senão os inject (Toast/Confirm) quebram.
    dedupe: ['vue', 'primevue'],
    alias: [
      // O workbench compila em runtime o HTML dos slots dos sidecars (que usam
      // <WStepSection>, <WSectionPanel>…): precisa do build do Vue com compilador.
      { find: /^vue$/, replacement: 'vue/dist/vue.esm-bundler.js' },
      // Lib internal @ alias must come first (more specific path)
      { find: /^@\//, replacement: resolve(__dirname, '../src') + '/' },
      { find: '@wgalleti/primevue-components', replacement: resolve(__dirname, '../src') },
    ],
  },
  server: {
    port: 5174,
  },
})
