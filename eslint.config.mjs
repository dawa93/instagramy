import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});


const eslintConfig = [
  {
    ignores: ['node_modules/', 'dist/', '.yarn/', '.next/', 'next.config.ts', './next.config.ts'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'prettier',
    'plugin:prettier/recommended',
  ),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    plugins: {
      prettier: prettier,
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports,
    },
    rules: {
      // Prettier를 ESLint 규칙으로 사용
      'prettier/prettier': 'error',
      'import/order': [
        'error',
        {
          pathGroups: [
            {
              pattern: '{next,next/**}', // 기존 설정 유지 (필요 시 제거 가능)
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{react,react-dom}', // react와 next 관련 모듈
              group: 'external',
              position: 'before', // external 그룹 내에서 맨 위로
            },
            {
              pattern: 'swiper/**', // Swiper 모듈 추가
              group: 'external',
              position: 'before',
            },
          ],
          'newlines-between': 'always-and-inside-groups', // 그룹 간 줄 바꿈
          alphabetize: {
            order: 'asc', // 알파벳순 정렬
            caseInsensitive: true, // 대소문자 무시
          },
        },
      ],
      '@typescript-eslint/no-require-imports': 'off', // require시 에러 방지
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_', // _로 시작하는 변수는 무시
          argsIgnorePattern: '^_', // _로 시작하는 매개변수는 무시
        },
      ], // 사용하지 않는 변수 감지 및 삭제
      'unused-imports/no-unused-imports': 'error', // 사용하지 않는 import 감지 및 삭제
      'no-unused-vars': 'off', // 기본 규칙 비활성화 (TypeScript 규칙으로 대체)
      curly: ['error', 'all'], // 함수에 () 무조건 사용해야하는 규칙
      '@typescript-eslint/no-explicit-any': 'warn', // any를 에러말고 warn으로 변경
      'react-hooks/exhaustive-deps': 'off', // useEffect, useMemo등 의존성 경고 무시
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true, // &&, || 연산자 허용
        },
      ],
    },
  },
];

export default eslintConfig;
