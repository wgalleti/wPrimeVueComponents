import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // Instância única: o código da lib (aliased para ../src) e o app do playground
    // devem compartilhar o MESMO vue/primevue, senão os inject (Toast/Confirm) quebram.
    dedupe: ['vue', 'primevue'],
    alias: [
      // Lib internal @ alias must come first (more specific path)
      { find: /^@\//, replacement: resolve(__dirname, '../src') + '/' },
      { find: '@wgalleti/primevue-components', replacement: resolve(__dirname, '../src') },
    ],
  },
  server: {
    port: 5174,
  },
})
