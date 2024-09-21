import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  languageOptions: {
    globals: {
      browser: true,
      es2021: true,
    },
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
  },
  rules: {
    'no-unused-vars': 'warn',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'eqeqeq': ['error', 'always'],
  },
});
