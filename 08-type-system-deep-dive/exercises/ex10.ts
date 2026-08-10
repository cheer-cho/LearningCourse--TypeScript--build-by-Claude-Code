/**
 * ex10 — Reimplement built-ins: conditional & infer utilities
 *
 * Rebuild seven more built-in utility types FROM SCRATCH using
 * conditional types and `infer`. Do NOT alias the real ones.
 *
 * 1. MyExclude<T, U>: union members of T NOT assignable to U.
 * 2. MyExtract<T, U>: union members of T assignable to U.
 * 3. MyNonNullable<T>: T without null or undefined.
 * 4. MyReturnType<T>: a function type's return type.
 * 5. MyParameters<T>: a function type's parameters, as a tuple.
 * 6. MyConstructorParameters<T>: a constructor's parameters, as a
 *    tuple (T is a `new (...) => ...` type, abstract classes included).
 * 7. MyAwaited<T>: unwrap a (possibly nested) Promise — recursively,
 *    so `Promise<Promise<string>>` resolves all the way to `string`.
 *
 * Check: npm test -- 08 -t ex10
 */

// TODO
export type MyExclude<T, U> = unknown

// TODO
export type MyExtract<T, U> = unknown

// TODO
export type MyNonNullable<T> = unknown

// TODO
export type MyReturnType<T extends (...args: any[]) => any> = unknown

// TODO
export type MyParameters<T extends (...args: any[]) => any> = unknown

// TODO
export type MyConstructorParameters<T extends abstract new (...args: any[]) => any> = unknown

// TODO
export type MyAwaited<T> = unknown
