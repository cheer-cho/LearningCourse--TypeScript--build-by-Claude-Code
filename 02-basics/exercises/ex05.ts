/**
 * ex05 — Literal types, widening, and `as const`
 *
 * A literal type has exactly one value: 'north' is a type. Unions of
 * literals replace enums in most modern code.
 *
 * 1. Define the Direction union.
 * 2. Implement `opposite` (north<->south, east<->west).
 * 3. Fix ORIGIN so its properties stay LITERAL and READONLY.
 *    Hint: as const.
 * 4. Fix `mode` so it stays the literal 'dark' even though it uses `let`.
 *    Hint: you can annotate a let with a literal type.
 *
 * Check: npm test -- 02 -t ex05
 */

// TODO: 'north' | 'south' | 'east' | 'west'
export type Direction = unknown

// TODO: type the parameter and return as Direction, then implement.
export function opposite(dir: any): any {
  throw new Error('TODO: implement opposite')
}

// TODO: keep the 0s literal and readonly.
export const ORIGIN = { x: 0, y: 0 }

// TODO: this should stay type 'dark' (assignable later ONLY to 'dark').
export let mode = 'dark'
