/**
 * ✦ CHECKPOINT 1 — Setup & Tooling
 *
 * A tiny temperature-logging module. Everything from this module at once:
 * annotations, strict null handling, safe indexing, and shape modeling.
 *
 * Replace every `any`/`unknown` with correct types AND implement the
 * bodies. Each declaration below explains its own job.
 *
 * Passing `npm test -- 01` (all of it) completes this module. 🎉
 */

// One log entry: when it was taken, how warm it was, and (optionally)
// which sensor reported it.
//   Shape: { time: string; celsius: number; sensor?: string }
export type Reading = unknown

// The sensor sends temperatures as TEXT. Convert one reading to a number.
// Bad input returns null, so the caller knows parsing failed.
//   parseCelsius('21.5')   -> 21.5
//   parseCelsius('-3')     -> -3
//   parseCelsius('warm')   -> null
//   parseCelsius('   ')    -> null
// "Bad input" = anything Number() turns into NaN, and empty/whitespace
// strings (careful: Number('') is 0, not NaN!).
//   Signature: (raw: string) => number | null
export function parseCelsius(raw: any): any {
  throw new Error('TODO: implement parseCelsius')
}

// Look up the temperature at position `index`. Out-of-range lookups are
// allowed — they answer undefined, and the return type says so honestly.
//   readingAt([1, 2, 3], 1) -> 2
//   readingAt([1], 9)       -> undefined
//   Signature: (temps: number[], index: number) => number | undefined
export function readingAt(temps: any, index: any): any {
  throw new Error('TODO: implement readingAt')
}

// The mean of all temperatures. An empty list has no mean — return 0
// instead of NaN, so the return type can stay a plain `number`.
//   average([10, 20, 30]) -> 20
//   average([])           -> 0
//   Signature: (temps: number[]) => number
export function average(temps: any): any {
  throw new Error('TODO: implement average')
}
