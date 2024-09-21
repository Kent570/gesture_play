import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  languageOptions: {
    globals: {
      structuredClone: 'readonly',
    },
  },
  rules: {
    'no-unused-vars': 'error',
  },
});
