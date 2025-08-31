// eslint.config.mjs
import js from '@eslint/js'
import globals from 'globals'
import cypress from 'eslint-plugin-cypress'
import react from 'eslint-plugin-react'

export default [
  // 0) Ignore build + vendor output
  {
    ignores: [
      '.e2e',
      '.next',
      'dist',
      'out',
      'coverage',
      'public',
      'node_modules',
    ],
  },

  // 1) Base JS rules
  js.configs.recommended,

  // 2) Project JS/TS with JSX support (browser code, Next.js)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }, // enable JSX parsing
      },
      globals: {
        ...globals.browser, // window, document, etc
        process: 'readonly', // allow process.env in client (Next replaces this)
      },
    },
    plugins: {
      react,
    },
    rules: {
      // Make JSX usage mark variables as used (fixes false no-unused-vars on JSX components)
      'react/jsx-uses-vars': 'error',

      // Using the modern JSX transform: don't require `import React`
      'react/react-in-jsx-scope': 'off',

      // You’re not using PropTypes
      'react/prop-types': 'off',
    },
  },

  // 3) Node modules (services, scripts) — allow process, __dirname, etc
  {
    files: ['services/**/*.{js,ts}', 'scripts/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // 4) CommonJS / config files — allow require/module and script mode
  {
    files: [
      '*.config.js',
      '*.config.cjs',
      'next.config.js',
      'jest.config.js',
      'cypress.config.js',
      'cypress/plugins/**/*.js',
      'test.setup.js',
    ],
    languageOptions: {
      sourceType: 'script',
      globals: {
        ...globals.node, // require, module, process, __dirname, etc
      },
    },
  },

  // 5) Jest tests (jest, describe, it, expect, etc)
  {
    files: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  // 6) Cypress rules ONLY for Cypress specs/support
  {
    ...cypress.configs.recommended,
    files: ['cypress/**/*.{js,jsx,ts,tsx}', '**/*.{cy,spec}.{js,jsx,ts,tsx}'],
  },
]
