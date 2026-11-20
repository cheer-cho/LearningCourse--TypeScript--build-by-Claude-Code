/**
 * ✦ CAPSTONE B — Type-safe fetch wrapper with inferred response types
 *
 * A project, not a drill: build a tiny API client whose `request()`
 * method infers the exact response type from the endpoint key alone —
 * no manual generic annotations at the call site. There is no
 * `checkpoint.ts` for this module — this file IS the graded work.
 * Draws on:
 *   - 07 generics
 *   - 10 the Result pattern & async
 *   - 11 template-literal path-param extraction (`ParamNames<Path>`)
 *   - 12 zod: validate at the boundary, derive the type with z.infer
 *
 * GOALS
 *   1. ApiSchema: a map from endpoint keys like `'GET /users'` or
 *      `'GET /users/:id'` to `{ response: ZodType; body?: ZodType }`.
 *   2. ParamNamesOf<K>: parse the `:param` names out of an endpoint key's
 *      PATH portion (the part after the first space) with template
 *      literal types — reuse the recursive pattern from module 11.
 *   3. RequestOptionsFor<S, K>: the exact options object `request()`
 *      demands for key K — a `params` object ONLY if the path has
 *      `:params`, and a `body` field ONLY if the schema entry declares
 *      one. No path params and no body -> `{}` (call with `{}`).
 *   4. apiClient(schema, fetchImpl): given the schema and an INJECTED
 *      fetch-shaped function (never the real network — tests supply a
 *      fake), returns a client whose `request(key, options)`:
 *        - builds the URL by substituting `:param` segments,
 *        - calls fetchImpl with the method and (if present) a JSON body,
 *        - on a non-ok HTTP response, resolves to `err({ kind: 'http', status })`,
 *        - otherwise validates the JSON body against the schema's
 *          `response` zod schema; a failed parse resolves to
 *          `err({ kind: 'validation', message })`;
 *        - a successful parse resolves to `ok(value)`, typed EXACTLY as
 *          `z.infer` of that endpoint's response schema.
 *
 * ACCEPTANCE CRITERIA (see the test file for the exact contract)
 *   - `client.request('GET /users', ...)` and `client.request('GET /users/:id', ...)`
 *     resolve to DIFFERENT, precise response types (checked with expectTypeOf).
 *   - Calling with the wrong/missing `params` or a missing required
 *     `body` must NOT compile (see the `@ts-expect-error` tests).
 *   - No real network call is ever made — `fetchImpl` is always the
 *     test's fake.
 *   - Validation failures are typed errors (`Result`), never throws.
 *
 * Check: npm test -- 13 -t capstone-b
 */

import { z } from 'zod'

// ---------- Result (see module 10) ----------

export type Result<T, E> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: E }

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error }
}

// ---------- Errors ----------

// TODO: a discriminated union —
//   { kind: 'http'; status: number }
//   { kind: 'validation'; message: string }
export type ApiError = unknown

// ---------- Schema shape (given) ----------

export interface EndpointDef {
  readonly response: z.ZodType
  readonly body?: z.ZodType
}

export type ApiSchema = Record<string, EndpointDef>

// ---------- Path param extraction ----------

// TODO: the union of `:param` names in the PATH portion of an endpoint
// key. The key looks like `'GET /users/:id'` — first strip the method
// (everything before the first space), then recurse over `:name/` the
// same way module 11's ParamNames<Path> does.
//   ParamNamesOf<'GET /users'>          -> never
//   ParamNamesOf<'GET /users/:id'>      -> 'id'
//   ParamNamesOf<'POST /users/:a/:b'>   -> 'a' | 'b'
export type ParamNamesOf<K extends string> = unknown

// TODO: the exact options object request() demands for key K:
//   - `params: { [name]: string }` ONLY if ParamNamesOf<K> is non-never
//   - `body: z.infer<S[K]['body']>` ONLY if the schema entry has a body
//   - neither -> `{}`
// Hint: build two small internal (unexported) helper conditional types
// and intersect them here.
export type RequestOptionsFor<S extends ApiSchema, K extends keyof S & string> = unknown

// ---------- Fetch shape (given — fake-able, never the real network) ----------

export interface FetchResponse {
  readonly ok: boolean
  readonly status: number
  json(): Promise<unknown>
}

export type FetchImpl = (
  url: string,
  init: { readonly method: string; readonly body?: string },
) => Promise<FetchResponse>

// ---------- Client (given contract) ----------

export interface ApiClient<S extends ApiSchema> {
  request<K extends keyof S & string>(
    key: K,
    options: RequestOptionsFor<S, K>,
  ): Promise<Result<z.infer<S[K]['response']>, ApiError>>
}

// TODO: implement the factory. Split `key` into method + raw path,
// substitute `:param` segments from `options.params`, call `fetchImpl`
// (with a JSON-stringified body when `options.body` is present), then
// validate the parsed JSON against `schema[key].response`.
export function apiClient(schema: any, fetchImpl: any): any {
  throw new Error('TODO: implement apiClient')
}
