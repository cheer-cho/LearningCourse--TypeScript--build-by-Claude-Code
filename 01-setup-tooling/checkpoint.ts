/**
 * ✦ CHECKPOINT 1 — Setup & Tooling
 *
 * A tiny temperature-logging module. Everything from this module at once:
 * annotations, strict null handling, safe indexing, and shape modeling.
 * Replace every `any`/`unknown` with correct types AND implement the
 * bodies.
 *
 * Target signatures (also enforced by the tests):
 *   Reading        = { time: string; celsius: number; sensor?: string }
 *   parseCelsius   : (raw: string) => number | null   (null for bad input)
 *   readingAt      : (temps: number[], index: number) => number | undefined
 *   average        : (temps: number[]) => number      (0 for empty input)
 *
 * Passing `npm test -- 01` (all of it) completes this module. 🎉
 */

// TODO: model the shape. `sensor` is optional.
export type Reading = {
  time: string;
  celsius: number;
  sensor?: string;
}

// TODO: fix the types, then implement.
// "bad input" = anything Number() turns into NaN, and empty/whitespace
// strings (careful: Number('') is 0, not NaN!).
export function parseCelsius(raw: string): number | null {
  if (!raw) {
    return null;
  }
  const celsiusNum = parseFloat(raw)
  if (Number.isNaN(celsiusNum)) {
    return null;
  }
  return celsiusNum;
  throw new Error('TODO: implement parseCelsius')
}

// TODO: fix the types, then implement.
export function readingAt(temps: number[], index: number): number | undefined {
  return temps?.[index];
  throw new Error('TODO: implement readingAt')
}

// TODO: fix the types, then implement.
export function average(temps: number[]): number {
  return temps.reduce((acc, cur) => acc + cur, 0) / temps.length
  throw new Error('TODO: implement average')
}
