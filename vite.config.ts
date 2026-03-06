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
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WPrimeVueComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
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
