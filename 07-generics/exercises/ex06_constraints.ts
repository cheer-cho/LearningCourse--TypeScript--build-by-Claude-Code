/**
 * ex06 — Constraints: `extends` and `keyof`
 *
 * An unconstrained T could be ANYTHING, so you can do almost nothing
 * with it. `T extends Shape` narrows what callers may pass — and widens
 * what the implementation may do.
 *
 * 1. longest<T extends { length: number }>(a, b): whichever argument has
 *    the greater length (the first one wins a tie). Works for strings,
 *    arrays, anything with .length — but numbers must be REJECTED at
 *    compile time.
 * 2. getProperty<T, K extends keyof T>(obj, key): obj[key], precisely
 *    typed as T[K]. Misspelled keys must not compile.
 * 3. pluck<T, K extends keyof T>(items, key): that property from EVERY
 *    element of an array.
 *      pluck([{ id: 1, name: 'Ada' }], 'name')  -> ['Ada']   type: string[]
 *
 * Check: npm test -- 07 -t ex06
 */

// TODO: add the length constraint, then implement.
export function longest(a: any, b: any): any {
  throw new Error('TODO: implement longest')
}

// TODO: K must be a key of T; return type is the lookup T[K].
export function getProperty(obj: any, key: any): any {
  throw new Error('TODO: implement getProperty')
}

// TODO: same constraint as getProperty, mapped over an array.
export function pluck(items: any, key: any): any {
  throw new Error('TODO: implement pluck')
}
