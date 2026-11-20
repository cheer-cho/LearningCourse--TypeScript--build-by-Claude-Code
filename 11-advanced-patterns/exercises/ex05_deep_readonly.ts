/**
 * ex05 — DeepReadonly<T> and DeepPartial<T>
 *
 * The built-in Readonly<T> and Partial<T> only touch the TOP level.
 * Recursive mapped types go all the way down — but they must pass
 * FUNCTIONS through untouched and handle ARRAYS before the generic
 * object case (arrays are objects too!).
 *
 * 1. DeepReadonly<T>:
 *      - functions -> unchanged
 *      - arrays    -> readonly array of DeepReadonly elements
 *      - objects   -> every property readonly, recursively
 *      - primitives -> unchanged
 * 2. DeepPartial<T>: same skeleton, but properties become OPTIONAL and
 *    arrays stay mutable (Array of DeepPartial elements).
 * 3. freezeConfig(value): recursively Object.freeze and return the value
 *    typed DeepReadonly<T>.
 * 4. mergeDefaults(defaults, patch): deep-merge a DeepPartial<T> patch
 *    onto full defaults, returning a new T. Plain objects merge
 *    recursively; primitives and arrays in the patch REPLACE the default.
 *
 * Check: npm test -- 11 -t ex05
 */

// TODO: recursive mapped type (functions first, then arrays, then object).
export type DeepReadonly<T> = unknown

// TODO: recursive mapped type with optional properties.
export type DeepPartial<T> = unknown

// TODO: freeze recursively, return as DeepReadonly<T>.
export function freezeConfig(value: any): any {
  throw new Error('TODO: implement freezeConfig')
}

// TODO: (defaults: T, patch: DeepPartial<T>) => T
export function mergeDefaults(defaults: any, patch: any): any {
  throw new Error('TODO: implement mergeDefaults')
}
