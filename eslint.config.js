import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      '**/dist/**',
      'docs/.vitepress/cache/**',
      'docs/public/**',
      'graphify-out/**',
      '**/*.d.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        // typescript-eslint parses <script lang="ts"> inside .vue via vue-eslint-parser
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // Convenção do projeto: componentes usam prefixo W (nome único é intencional).
      'vue/multi-word-component-names': 'off',
      // Falso-positivo: casts TS com união (`as number | null`) em templates disparam
      // essa regra de "filtro Vue 2", que o Vue 3 nem tem.
      'vue/no-deprecated-filter': 'off',
      // Props opcionais são tipadas via `?` no defineProps<T>() — `undefined` é a
      // semântica correta; defaults explícitos seriam ruído numa lib script-setup tipada.
      'vue/require-default-prop': 'off',
      // O objeto `crud` (retorno do useCrudManager) é estado compartilhado mutado por
      // referência via `.value` (padrão intencional). `shallowOnly` permite mutar
      // propriedades aninhadas da prop, mas ainda barra reatribuir a prop em si.
      'vue/no-mutating-props': ['error', { shallowOnly: true }],
      // `any` é proibido pelo projeto — usar unknown + narrowing.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  // Desliga regras de formatação que conflitam com o Prettier (mantém como última entrada).
  prettier,
)
