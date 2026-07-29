import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      tsconfigPath: './tsconfig.json',
      // não publicar tipos de testes nem dos sidecars de autoria
      exclude: ['**/*.test.ts', '**/*.spec.ts', '**/*.meta.ts'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      // Multiplas entradas para subpath exports ("./components", etc.) e
      // tree-shaking mais granular no consumidor.
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        components: resolve(__dirname, 'src/components/index.ts'),
        composables: resolve(__dirname, 'src/composables/index.ts'),
        types: resolve(__dirname, 'src/types/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue', 'primevue', 'axios', 'dayjs', /^primevue\/.*/],
      output: {
        globals: {
          vue: 'Vue',
          primevue: 'PrimeVue',
          axios: 'axios',
          dayjs: 'dayjs',
        },
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
})
