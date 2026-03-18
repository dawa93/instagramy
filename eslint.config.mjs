import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import eslintConfigPrettier from 'eslint-config-prettier';

import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports,
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          pathGroups: [
            {
              pattern: '{next,next/**}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{react,react-dom}',
              group: 'external',
              position: 'before',
            },
            { pattern: 'swiper/**', group: 'external', position: 'before' },
          ],
          'newlines-between': 'always-and-inside-groups',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      'unused-imports/no-unused-imports': 'error',
      'no-unused-vars': 'off',

      curly: ['error', 'all'],
      '@typescript-eslint/no-explicit-any': 'warn',

      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true },
      ],
    },
  },

  eslintConfigPrettier,
]);
