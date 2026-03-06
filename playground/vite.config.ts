import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
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
