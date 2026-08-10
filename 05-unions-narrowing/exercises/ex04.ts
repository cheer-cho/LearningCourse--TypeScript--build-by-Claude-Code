/**
 * ex04 — Narrowing with `in` and `instanceof`
 *
 * typeof only knows primitives. For objects you need other evidence:
 * a distinctive KEY (`'drive' in x`) or a CLASS (`x instanceof Date`).
 *
 * 1. Define Car as { drive: () => string } and Boat as
 *    { sail: () => string }.
 * 2. move(vehicle): Car | Boat — call drive() or sail() and return the
 *    result. typeof won't help (both are 'object'); use `in`.
 * 3. toIso(stamp): Date | string — return the ISO string. A Date
 *    already has .toISOString(); a string must go through new Date()
 *    first. Use instanceof.
 *      toIso(new Date(0)) -> '1970-01-01T00:00:00.000Z'
 *      toIso('2026-01-01') -> '2026-01-01T00:00:00.000Z'
 * 4. sizeOf(collection): string[] | Set<string> — arrays have .length,
 *    Sets have .size. Use instanceof.
 *
 * Check: npm test -- 05 -t ex04
 */

// TODO: { drive: () => string }
export type Car = unknown

// TODO: { sail: () => string }
export type Boat = unknown

// TODO: type the parameter (Car | Boat) and return, then implement.
export function move(vehicle: any): any {
  throw new Error('TODO: implement move')
}

// TODO: type the parameter (Date | string) and return, then implement.
export function toIso(stamp: any): any {
  throw new Error('TODO: implement toIso')
}

// TODO: type the parameter (string[] | Set<string>) and return, then
// implement.
export function sizeOf(collection: any): any {
  throw new Error('TODO: implement sizeOf')
}
