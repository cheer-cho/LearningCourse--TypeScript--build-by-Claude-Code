/**
 * ex04 — infer: capturing a piece of the matched type
 *
 * `infer` only appears inside the `extends` clause of a conditional
 * type. It declares a placeholder that the compiler fills in from
 * whatever actually matched — the classic way to "reach into" a type.
 *
 * 1. ElementOf<T>: the element type of an array (or readonly array).
 * 2. UnwrapPromise<T>: the resolved value of a Promise, or T unchanged
 *    if it isn't a Promise (one level deep — no recursion yet).
 * 3. FirstParam<T>: the type of a function's first parameter.
 * 4. ReturnOf<T>: the return type of a function.
 *
 * Check: npm test -- 08 -t ex04
 */

// TODO
export type ElementOf<T> = unknown

// TODO
export type UnwrapPromise<T> = unknown

// TODO
export type FirstParam<T> = unknown

// TODO
export type ReturnOf<T> = unknown
