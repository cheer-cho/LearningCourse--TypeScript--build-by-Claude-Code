import { defineConfig } from 'vitest/config'

// Tests are checked in TWO ways on every run:
//   1. Runtime behavior (normal vitest assertions)
//   2. Type correctness (expectTypeOf assertions, checked by tsc)
// A wrong type FAILS the test run — type assertions never silently pass.
export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/.verify*/**'],
    typecheck: {
      enabled: true,
      checker: 'tsc',
      include: ['**/*.test.ts'],
      exclude: ['**/node_modules/**', '**/.verify*/**'],
      tsconfig: './tsconfig.json',
    },
  },
})
