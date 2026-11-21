/**
 * ex04 — Working with JSON: a recursive type and a safe parser
 *
 * `JSON.parse` returns `any` — the single biggest silent hazard in this
 * course. `any` disables checking on everything it touches, and that
 * "everything" spreads to every place the parsed value flows. Fix it two
 * ways: describe exactly what JSON can contain with a recursive type, and
 * never let a parse failure become an uncaught throw.
 *
 * 1. JsonValue: recursively, one of string | number | boolean | null |
 *    an array of JsonValue | an object of string keys to JsonValue.
 * 2. safeJsonParse(text): JSON.parse inside a try/catch, wrapped as
 *    Result<JsonValue, string>. On failure, error is the caught error's
 *    message (or 'invalid JSON' when it's not an Error instance).
 *
 * Check: npm test -- 12 -t ex04
 */

// Given: the Result pattern — errors as values, not throws.
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

// TODO: recursive JSON value type.
export type JsonValue = unknown

// TODO: (text: string) => Result<JsonValue, string>
export function safeJsonParse(text: any): any {
  throw new Error('TODO: implement safeJsonParse')
}
