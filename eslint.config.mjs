import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022, // Use ECMAScript 2022 (which includes structuredClone)
    },
  },
  rules: {
    "no-unused-vars": "off", // Disable the no-unused-vars rule
  },
});
