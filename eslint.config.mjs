// import globals from 'globals';
// import pluginJs from '@eslint/js';


export default [
  {
    languageOptions: {
      globals: {
        chrome: 'readonly', // Keep this if you need it; remove if not
        transcript: 'readonly', // Keep this if you need it; remove if not
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': 'warn', // Warn about unused variables
      'quotes': ['error', 'single'], // Enforce single quotes
      'semi': ['error', 'always'], // Require semicolons
      'eqeqeq': ['error', 'always'], // Require strict equality
    },
  },
];
