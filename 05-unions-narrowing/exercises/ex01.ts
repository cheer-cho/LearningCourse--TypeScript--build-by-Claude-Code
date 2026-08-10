/**
 * ex01 — Union types: one of several shapes
 *
 * `A | B` says a value is EITHER an A or a B. Before you narrow it,
 * only members that exist on EVERY part of the union are accessible.
 *
 * 1. Define Id as string | number.
 * 2. Define Answer as the literal union 'yes' | 'no' | 'maybe'.
 * 3. Type `len` so it accepts a string OR an array of anything
 *    (use unknown[]) and returns its length — no narrowing needed,
 *    because .length exists on both.
 * 4. Annotate `ids` as an array of Id (it mixes both kinds).
 *
 * Check: npm test -- 05 -t ex01
 */

// TODO: string | number
export type Id = unknown

// TODO: 'yes' | 'no' | 'maybe'
export type Answer = unknown

// TODO: type the parameter (string | unknown[]) and return, then implement.
export function len(x: any): any {
  throw new Error('TODO: implement len')
}

// TODO: annotate as Id[].
export const ids: any = [7, 'a42', 9]
