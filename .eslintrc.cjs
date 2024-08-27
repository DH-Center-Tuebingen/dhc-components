/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:storybook/recommended'
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    node: true
  }, rules: {
    ['vue/multi-word-component-names']: 'off',
    ['vue/html-indent']: [
      'warn',
      4
    ],
    ['curly']: 'warn',
    ['no-console']: 'off',
    ['no-unused-vars']: ['warn', { 'argsIgnorePattern': '^_' }],
    ['no-extra-boolean-cast']: 'off',
    ['no-extra-semi']: 'warn',
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn", // or "error"
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    'quotes': [
      'warn',
      'single',
      {
        'allowTemplateLiterals': true
      }
    ]
  }
}
