/**
 * ex05 — Mapped types: { [K in keyof T]: ... } and modifiers
 *
 * A mapped type loops over `keyof T`, producing one property per key.
 * `readonly` and `?` can be added or removed with `+`/`-` (a bare
 * `readonly`/`?` means `+readonly`/`+?`).
 *
 * Given: type Task = { id: number; title: string; done: boolean }
 *
 * 1. Stringify<T>: every property's VALUE becomes `string`.
 * 2. Mutable<T>: strips `readonly` from every property (-readonly).
 * 3. AllOptional<T>: every property becomes optional (+?).
 * 4. AllRequired<T>: every property becomes required (-?), keeping
 *    whatever `readonly` it already had.
 *
 * Check: npm test -- 08 -t ex05
 */

export type Task = { id: number; title: string; done: boolean }

// TODO
export type Stringify<T> = unknown

// TODO
export type Mutable<T> = unknown

// TODO
export type AllOptional<T> = unknown

// TODO
export type AllRequired<T> = unknown
