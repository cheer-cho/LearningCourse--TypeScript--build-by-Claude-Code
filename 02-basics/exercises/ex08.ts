/**
 * ex08 — Inference practice
 *
 * No annotations allowed in this file (except where a TODO says so)!
 * Change only the VALUES / expressions so TypeScript INFERS the exact
 * target type. This trains you to predict what the compiler does.
 *
 * Check: npm test -- 02 -t ex08
 */

// TODO: target type: 42  (the literal — currently it's the literal 0)
export const answer = 42

// TODO: target type: string  (currently 'hello' widens... does it?
//       Check which declaration keyword widens literals.)
export let greeting = 'hello'

// TODO: target type: readonly [1, 2, 3]  (no annotation — one keyword)
export const steps = [1, 2, 3] as const

// TODO: target type: (n: number) => string
//       (only the parameter annotation is allowed)
export const describeNum = (n: number) => n.toString()

// TODO: target type: { kind: 'ok'; value: number }[]
//       (currently infers { kind: string; value: number }[] — make ONLY
//       `kind` stay literal. Hint: as const can target a single value.)
export const results = [
  { kind: 'ok' as const, value: 1 },
  { kind: 'ok' as const, value: 2 },
]
