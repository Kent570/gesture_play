import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  languageOptions: {
    globals: {
      structuredClone: 'readonly', // Define structuredClone as a read-only global
    },
    parserOptions: {
      ecmaVersion: 2021, // Specify the ECMAScript version
    },
  },
  rules: {
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
  },
});
//changes