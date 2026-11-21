/**
 * ex02 — Conditional types: T extends U ? X : Y
 *
 * A conditional type is an `if` for types, checked with `extends`
 * (assignability) instead of `===`.
 *
 * 1. IsString<T>: true if T extends string, else false.
 * 2. ToArray<T>: T itself if it's already an array, else T[].
 * 3. StringOrNumber<T>: T if it extends string | number, else never
 *    (a conditional used as a filter).
 * 4. wrap(value): wraps a non-array value in a single-element array;
 *    passes an array straight through. Return type: ToArray<T>.
 *
 * Check: npm test -- 08 -t ex02
 */

// TODO
export type IsString<T> = unknown

// TODO
export type ToArray<T> = unknown

// TODO
export type StringOrNumber<T> = unknown

// TODO: type the parameter/return using ToArray<T>, then implement.
export function wrap(value: any): any {
  throw new Error('TODO: implement wrap')
}
