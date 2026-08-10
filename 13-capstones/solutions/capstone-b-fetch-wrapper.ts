// Reference solution — capstone-b-fetch-wrapper

import { z } from 'zod'

// ---------- Result (module 10) ----------

export type Result<T, E> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: E }

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error }
}

// ---------- Errors ----------

export type ApiError =
  | { readonly kind: 'http'; readonly status: number }
  | { readonly kind: 'validation'; readonly message: string }

// ---------- Schema shape ----------

export interface EndpointDef {
  readonly response: z.ZodType
  readonly body?: z.ZodType
}

export type ApiSchema = Record<string, EndpointDef>

// ---------- Path param extraction (template literals, module 11) ----------

type PathOf<K extends string> = K extends `${string} ${infer P}` ? P : never

type ExtractParamNames<P extends string> = P extends `${string}:${infer Name}/${infer Rest}`
  ? Name | ExtractParamNames<`/${Rest}`>
  : P extends `${string}:${infer Name}`
    ? Name
    : never

export type ParamNamesOf<K extends string> = ExtractParamNames<PathOf<K>>

type ParamsShape<K extends string> = [ParamNamesOf<K>] extends [never]
  ? {}
  : { readonly params: { readonly [P in ParamNamesOf<K>]: string } }

type BodyShape<D> = D extends { readonly body: infer B extends z.ZodType } ? { readonly body: z.infer<B> } : {}

export type RequestOptionsFor<S extends ApiSchema, K extends keyof S & string> = ParamsShape<K> & BodyShape<S[K]>

// ---------- Fetch shape (fake-able — never the real network in tests) ----------

export interface FetchResponse {
  readonly ok: boolean
  readonly status: number
  json(): Promise<unknown>
}

export type FetchImpl = (
  url: string,
  init: { readonly method: string; readonly body?: string },
) => Promise<FetchResponse>

// ---------- Client ----------

export interface ApiClient<S extends ApiSchema> {
  request<K extends keyof S & string>(
    key: K,
    options: RequestOptionsFor<S, K>,
  ): Promise<Result<z.infer<S[K]['response']>, ApiError>>
}

function substitutePath(path: string, params: Readonly<Record<string, string>> | undefined): string {
  if (!params) return path
  return path
    .split('/')
    .map((segment) => {
      if (!segment.startsWith(':')) return segment
      const name = segment.slice(1)
      return params[name] ?? segment
    })
    .join('/')
}

export function apiClient<S extends ApiSchema>(schema: S, fetchImpl: FetchImpl): ApiClient<S> {
  async function request<K extends keyof S & string>(
    key: K,
    options: RequestOptionsFor<S, K>,
  ): Promise<Result<z.infer<S[K]['response']>, ApiError>> {
    const spaceIndex = key.indexOf(' ')
    const method = key.slice(0, spaceIndex)
    const rawPath = key.slice(spaceIndex + 1)

    const opts = options as unknown as { params?: Readonly<Record<string, string>>; body?: unknown }
    const path = substitutePath(rawPath, opts.params)

    const init: { method: string; body?: string } = { method }
    if ('body' in opts) init.body = JSON.stringify(opts.body)

    const res = await fetchImpl(path, init)
    if (!res.ok) return err({ kind: 'http', status: res.status })

    const json = await res.json()
    const def = schema[key] as S[K]
    const parsed = def.response.safeParse(json)
    if (!parsed.success) {
      return err({ kind: 'validation', message: parsed.error.issues[0]?.message ?? 'invalid response' })
    }
    // The generic body only knows `def.response` is SOME z.ZodType; the
    // precise output type only exists at the caller's instantiation of S.
    return ok(parsed.data) as Result<z.infer<S[K]['response']>, ApiError>
  }

  return { request }
}
