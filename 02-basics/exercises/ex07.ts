/**
 * ex07 — never and void
 *
 * `never` = "no value can ever be here". Its superpower: if you handle
 * every case of a union, what's left has type never — and the compiler
 * can PROVE your switch is exhaustive.
 *
 * 1. Implement `assertNever`: it takes never, and just throws. If someone
 *    manages to call it, a case was missed.
 * 2. Implement `sides` with a switch over ALL shapes; in the default
 *    branch, call assertNever(shape). Try commenting one case out —
 *    the compiler should complain. That's the pattern working.
 * 3. Implement `runAll`: call each function; return nothing (void).
 *
 * Check: npm test -- 02 -t ex07
 */

export type Shape = 'circle' | 'square' | 'triangle'

// TODO: parameter type never, return type never, body throws.
export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`)
}

// circle -> 0, square -> 4, triangle -> 3. Exhaustive switch + assertNever.
export function sides(shape: Shape): number {
  throw new Error('TODO: implement sides')
}

// Call every function in order. Returns void.
export function runAll(fns: Array<() => void>): void {
  throw new Error('TODO: implement runAll')
}
