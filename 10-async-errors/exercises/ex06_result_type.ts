/**
 * ex06 — Result<T, E>: typed errors without throw
 *
 * `throw` hides the error type — the caller catches `unknown`. A
 * Result is a discriminated union that carries EITHER the value OR the
 * error, so the compiler forces the caller to check `.ok` first.
 *
 * 1. Ok<T>  is { ok: true; value: T }
 *    Err<E> is { ok: false; error: E }
 *    (Result is already defined in terms of them below.)
 * 2. ok / err: generic constructors for the two arms.
 * 3. map(result, fn): transform the value of an Ok with fn; pass an
 *    Err through UNTOUCHED (same object).
 * 4. unwrapOr(result, fallback): the value of an Ok, or the fallback.
 * 5. fromPromise(promise): await it; a resolution becomes ok(value),
 *    a rejection becomes err(normalized) where a non-Error reason is
 *    wrapped as new Error(String(reason)) — so E is always Error.
 *
 * Check: npm test -- 10 -t ex06
 */

// TODO: { ok: true; value: T }
export type Ok<T> = unknown

// TODO: { ok: false; error: E }
export type Err<E> = unknown

// Already correct once Ok and Err are.
export type Result<T, E> = Ok<T> | Err<E>

// TODO: make it generic — ok(value) builds an Ok<T>.
export function ok(value: any): any {
  throw new Error('TODO: implement ok')
}

// TODO: make it generic — err(error) builds an Err<E>.
export function err(error: any): any {
  throw new Error('TODO: implement err')
}

// TODO: generic in T, E, U. Narrow on .ok before touching value/error.
export function map(result: any, fn: any): any {
  throw new Error('TODO: implement map')
}

// TODO: generic in T, E.
export function unwrapOr(result: any, fallback: any): any {
  throw new Error('TODO: implement unwrapOr')
}

// TODO: generic in T; error channel is always Error.
export async function fromPromise(promise: any): Promise<any> {
  throw new Error('TODO: implement fromPromise')
}
