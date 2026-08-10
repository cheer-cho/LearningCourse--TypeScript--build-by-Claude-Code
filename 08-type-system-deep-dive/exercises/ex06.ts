/**
 * ex06 — Key remapping with `as` + filtering by value type
 *
 * A mapped type's key can be rewritten with `as`. Mapping a key to
 * `never` DROPS it from the result — the basis of filtering by value
 * type.
 *
 * Given: type Task = { id: number; title: string; done: boolean }
 *
 * 1. Getters<T>: one method per property, named `get` + the
 *    capitalized property name, returning that property's type.
 *      Getters<Task> -> { getId: () => number; getTitle: () => string; ... }
 * 2. PickByType<T, V>: keep only the properties whose VALUE type
 *    extends V.
 *      PickByType<Task, string> -> { title: string }
 *
 * Check: npm test -- 08 -t ex06
 */

export type Task = { id: number; title: string; done: boolean }

// TODO
export type Getters<T> = unknown

// TODO
export type PickByType<T, V> = unknown
