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
export type Direction = 'north' | 'south' | 'east' | 'west';

// TODO: type the parameter and return, then implement.
export function opposite(dir: Direction): Direction {
  const oppositeOf = {
    north: 'south',
    south: 'north',
    east: 'west',
    west: 'east'
  } as const

  return oppositeOf[dir];
}

// TODO: keep the 0s literal and readonly.
export const ORIGIN = { x: 0, y: 0 } as const

// TODO: this should stay type 'dark' (assignable later ONLY to 'dark').
export let mode: 'dark' = 'dark'
