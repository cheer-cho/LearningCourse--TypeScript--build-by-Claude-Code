/**
 * ex04 — Overloads
 *
 * One function, different contracts per argument type. Write the
 * overload signatures ABOVE the implementation; the implementation
 * signature must be wide enough for all of them.
 *
 * 1. toArray:
 *      toArray('abc') -> ['a', 'b', 'c']     type: string[]
 *      toArray(123)   -> [1, 2, 3]           type: number[]
 *    Without overloads the return type would be string[] | number[] —
 *    the tests demand the PRECISE type per call.
 * 2. makeDate:
 *      makeDate('2026-01-15')   from an ISO string
 *      makeDate(2026, 0, 15)    from year, monthIndex, day
 *
 * Check: npm test -- 04 -t ex04
 */

// TODO: add the two overload signatures above this implementation.
export function toArray(x: string | number): string[] | number[] {
  if (typeof x === 'string') return x.split('')
  return [...String(x)].map(Number)
}

// TODO: add the two overload signatures, fix the implementation types,
// then implement.
export function makeDate(a: any, b?: any, c?: any): Date {
  throw new Error('TODO: implement makeDate')
}
