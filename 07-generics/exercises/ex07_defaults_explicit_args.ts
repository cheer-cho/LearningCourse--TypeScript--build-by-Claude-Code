/**
 * ex07 — Defaults & explicit type arguments
 *
 * Inference reads the ARGUMENTS. When no argument mentions T, the
 * compiler has nothing to look at — T becomes `unknown` unless you
 * either pass an explicit type argument or declare a default (`<T = X>`).
 *
 * 1. Dict<V = string>: a Record from string keys to V — with V
 *    defaulting to string, so `Dict` alone means Record<string, string>.
 * 2. emptyList<T = string>(): a fresh empty array.
 *      emptyList()          type: string[]   (default kicks in)
 *      emptyList<number>()  type: number[]   (explicit wins)
 * 3. parseAs<T = unknown>(json): JSON.parse with a caller-chosen type.
 *      parseAs('{}')                     type: unknown  (honest default)
 *      parseAs<{ id: number }>('{"id":1}')  type: { id: number }
 *    (Yes, this is a trust-me cast — the honest default is the point.)
 *
 * Check: npm test -- 07 -t ex07
 */

// TODO: type parameter with a default.
export type Dict = unknown

// TODO: add <T = string>; return a new empty array.
export function emptyList(): any {
  throw new Error('TODO: implement emptyList')
}

// TODO: add <T = unknown>; JSON.parse the string and cast.
export function parseAs(json: string): any {
  throw new Error('TODO: implement parseAs')
}
