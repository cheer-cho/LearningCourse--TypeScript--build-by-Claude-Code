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
export type Id = string | number;

// TODO: 'yes' | 'no' | 'maybe'
export type Answer = 'yes' | 'no' | 'maybe';

// TODO: type the parameter (string | unknown[]) and return, then implement.
export function len(x: string | unknown[]): number {
  return x.length;
}

export function lenExample(x: string | unknown[] | Set<String>): number {
  if (x instanceof Set) {
    return x.size;
  }
  return x.length;
}

// TODO: annotate as Id[].
export const ids: Id[] = [7, 'a42', 9];
