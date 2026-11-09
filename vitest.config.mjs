import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./test.setup.js'],
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/.next/**',
      '**/.e2e/**',
      '**/tests/**',
      '**/coverage/**',
      'cypress/**',
      'e2e/**',
    ],
    coverage: {
      provider: 'v8',
      include: ['**/*.{js,jsx}'],
      exclude: [
        '**/node_modules/**',
        '**/tests/**',
        '**/coverage/**',
        'jest.config.js',
        'vitest.config.js',
        'next.config.js',
        'cypress.config.js',
        'cypress/**',
        '.e2e/**',
        '**/*.test.js',
        'e2e/**',
      ],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
})
