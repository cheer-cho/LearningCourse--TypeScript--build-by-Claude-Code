/**
 * ✦ CHECKPOINT 4 — Functions
 *
 * A tiny text-utility library. Combines: defaults, rest params,
 * overloads, void callbacks, and closures.
 * Each declaration below explains its own job.
 *
 * Passing `npm test -- 04` completes this module. 🎉
 */

// Left-pad `text` to `width` using `char` (default: a space).
// Text already >= width comes back unchanged.
//   pad('7', 3)      -> '  7'
//   pad('7', 3, '0') -> '007'
export function pad(text: string, width: number, char: any): string {
  throw new Error('TODO: implement pad')
}

// Join any number of strings with `separator` — rest params.
//   joinWith('-', 'a', 'b', 'c') -> 'a-b-c'
//   joinWith('-')                -> ''
export function joinWith(separator: string, ...parts: any): string {
  throw new Error('TODO: implement joinWith')
}

// The first element of a string or a number array — OVERLOADED, so each
// input shape gets its own precise return type:
//   firstOf('abc')     -> 'a'          type: string
//   firstOf([1, 2, 3]) -> 1            type: number | undefined
//   firstOf([])        -> undefined
// Write the two overload signatures above one implementation.
export function firstOf(x: string | number[]): string | number | undefined {
  throw new Error('TODO: implement firstOf')
}

// Wrap `fn` so it only runs the FIRST time the wrapper is called; every
// later call does nothing. fn takes nothing and returns void.
//   const boom = once(() => count++)
//   boom(); boom(); boom()   // count is 1
// Hint: remember "already called?" in a closure flag.
export function once(fn: any): any {
  throw new Error('TODO: implement once')
}
