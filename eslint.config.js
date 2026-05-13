import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unknown-property": "off",
      "camelcase": "off",
      "require-jsdoc": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "react/jsx-key": "off",
      "@next/next/missing-suspense-with-csr-bailout": "off",
      "@typescript-eslint/no-unused-expressions": "off"
    },
  },
])
