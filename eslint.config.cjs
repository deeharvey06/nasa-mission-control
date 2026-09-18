const js = require('@eslint/js');
const globals = require('globals');
const react = require('eslint-plugin-react');
const hooks = require('eslint-plugin-react-hooks');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/build/**',
      '**/coverage/**',
      'cypress/videos/**',
      'cypress/screenshots/**',
    ],
  },
  js.configs.recommended,
  { files: ['**/*.{js,jsx,cjs}'], languageOptions: { globals: globals.node } },
  {
    files: ['client/src/**/*.{js,jsx}'],
    languageOptions: {
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, __API_URL__: 'readonly' },
    },
    plugins: { react, 'react-hooks': hooks },
    settings: { react: { version: '18.3' } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...hooks.configs.recommended.rules,
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/*.test.{js,jsx}', 'client/src/setupTests.js'],
    languageOptions: { globals: globals.jest },
  },
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        expect: 'readonly',
        cy: 'readonly',
        Cypress: 'readonly',
      },
    },
  },
];
