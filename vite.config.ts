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
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    lib: {
      // Multiplas entradas para subpath exports ("./components", etc.) e
      // tree-shaking mais granular no consumidor.
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        components: resolve(import.meta.dirname, 'src/components/index.ts'),
        composables: resolve(import.meta.dirname, 'src/composables/index.ts'),
        types: resolve(import.meta.dirname, 'src/types/index.ts'),
        // Plugins Vite (Node) para o app consumidor: `@wgalleti/primevue-components/vite`.
        vite: resolve(import.meta.dirname, 'src/vite/index.ts'),
        // Provedor gRPC (Connect): subpath próprio para o projeto REST não precisar dos peers.
        connect: resolve(import.meta.dirname, 'src/data-providers/connect/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      // `leaflet` é dependência (o consumidor a recebe pelo npm), mas não entra
      // no bundle: o WMapSelect a carrega por import() dinâmico e quem nunca
      // abre o mapa não paga por ela. O CSS (`leaflet/dist/leaflet.css`) NÃO é
      // externo de propósito — vai junto no style.css da suite.
      // `markdown-it` e `dompurify` seguem a mesma lógica: são dependencies
      // (o consumidor as recebe pelo npm), mas ficam fora do bundle — quem não
      // usa WMarkdownView/WMarkdownEditor não paga por elas (tree-shaking).
      // Os plugins do markdown seguem `markdown-it`; `highlight.js` e `mermaid`
      // entram por import() dinâmico — só o documento que tem código ou
      // diagrama paga por eles, e em chunk separado.
      external: [
        'vue',
        // peer opcional: entra no bundle do consumidor, nunca no da suite —
        // duplicar o router quebraria o inject das chaves dele (useRoute).
        'vue-router',
        'primevue',
        'axios',
        // subcaminhos (plugin, locale) são UMD com require('dayjs'): no bundle viram require em ESM
        /^dayjs(\/.*)?$/,
        // peers opcionais do provedor Connect (entrada `./connect`)
        /^@connectrpc\/.*/,
        /^@bufbuild\/.*/,
        'leaflet',
        // `echarts` segue a lógica do leaflet: dependência entregue pelo npm,
        // carregada por import() dinâmico no WChart — fora do bundle da suite.
        'echarts',
        /^echarts\/.*/,
        'markdown-it',
        'dompurify',
        'mermaid',
        /^markdown-it-.*/,
        /^highlight\.js.*/,
        /^primevue\/.*/,
        // dependência como as de cima; embutida, o preserveModules a gravaria em dist/node_modules,
        // pasta que o npm pack descarta.
        /^maska(\/.*)?$/,
      ],
      output: {
        // Um arquivo por módulo em vez de um chunk `components-*` com tudo: o bundler do
        // consumidor descarta o que não foi importado (sideEffects: só CSS no package.json).
        preserveModules: true,
        preserveModulesRoot: 'src',
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
