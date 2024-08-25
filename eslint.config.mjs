import babelParser from '@babel/eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['*.js', '.next'],
  },
  ...compat.extends('plugin:cypress/recommended', 'plugin:react/jsx-runtime'),
  {
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },

    rules: {
      'react/react-in-jsx-scope': 0,
      'react/prop-types': 0,
    },
  },
]
