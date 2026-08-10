/**
 * ex11 — as const + satisfies
 *
 * `: Type` REPLACES the inferred type of an expression (widening it to
 * exactly what you wrote). `satisfies Type` CHECKS assignability
 * without replacing the inferred type — combine it with `as const` to
 * validate a literal config object while keeping every value's exact
 * literal type.
 *
 * 1. CONFIG: validate against Config with `satisfies`, and keep every
 *    property's literal type with `as const`.
 * 2. getTheme(): returns CONFIG.theme, precisely typed as its literal.
 * 3. METHODS: an array of HTTP method names, validated as an array of
 *    strings, with every element kept literal.
 * 4. firstMethod(): returns METHODS' first element, precisely typed.
 *
 * Check: npm test -- 08 -t ex11
 */

export type Config = {
  theme: 'light' | 'dark'
  retries: number
  endpoints: Record<string, string>
}

// TODO: add `as const satisfies Config`.
export const CONFIG = {
  theme: 'dark',
  retries: 3,
  endpoints: { api: '/api', auth: '/auth' },
}

// TODO: type the return type precisely, then implement.
export function getTheme(): any {
  throw new Error('TODO: implement getTheme')
}

// TODO: add `as const satisfies readonly string[]`.
export const METHODS = ['GET', 'POST', 'DELETE']

// TODO: type the return type precisely, then implement.
export function firstMethod(): any {
  throw new Error('TODO: implement firstMethod')
}
