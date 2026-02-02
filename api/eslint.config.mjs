import { dirname } from 'path'
import { fileURLToPath } from 'url'
import nextPlugin from '@next/eslint-plugin-next'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  // Ignore patterns
  {
    ignores: ['.next/', 'node_modules/', 'coverage/', '*.config.js', 'public/openapi.json'],
  },

  // Base TypeScript config
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },

  ...tseslint.configs.recommended,

  // Next.js config
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Custom rules
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },

  // Prettier must be last
  eslintConfigPrettier
)

