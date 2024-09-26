/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['postcss.config.cjs', 'tailwind.config.js'],
      env: {
        node: true
      }
    }
  ],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'no-unused-vars': ['error', { 'args': 'none' }],
  }
};