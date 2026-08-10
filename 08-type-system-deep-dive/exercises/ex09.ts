/**
 * ex09 — Reimplement built-ins: mapped-type utilities
 *
 * Rebuild six of TypeScript's built-in utility types FROM SCRATCH using
 * mapped types. Do NOT alias the real ones (no `type MyPartial<T> =
 * Partial<T>`) — write the `{ [K in keyof T]: ... }` yourself.
 *
 * Given: type Task = { id: number; title: string; done: boolean }
 *
 * 1. MyPartial<T>: every property optional.
 * 2. MyRequired<T>: every property required.
 * 3. MyReadonly<T>: every property readonly.
 * 4. MyPick<T, K>: only the properties in K.
 * 5. MyOmit<T, K>: every property EXCEPT those in K.
 * 6. MyRecord<K, V>: an object type with keys K, every value V.
 *
 * Check: npm test -- 08 -t ex09
 */

export type Task = { id: number; title: string; done: boolean }

// TODO
export type MyPartial<T> = unknown

// TODO
export type MyRequired<T> = unknown

// TODO
export type MyReadonly<T> = unknown

// TODO
export type MyPick<T, K extends keyof T> = unknown

// TODO
export type MyOmit<T, K extends keyof any> = unknown

// TODO
export type MyRecord<K extends keyof any, V> = unknown
