/**
 * ✦ CHECKPOINT 3 — Objects & Interfaces
 *
 * A tiny server-config system. Combines: readonly, optional props,
 * literal unions, index signatures, and immutable updates.
 * Each declaration below explains its own job.
 *
 * Passing `npm test -- 03` completes this module. 🎉
 */

// One server's configuration. Host and port never change after startup;
// env is one of two literal environments; debug may be absent.
//   readonly host: string
//   readonly port: number
//   env: 'dev' | 'prod'
//   debug?: boolean
export type ServerConfig = unknown

// What callers are allowed to override: env and debug, both OPTIONAL.
// Deliberately NO host/port — those can't be overridden.
export type Overrides = unknown

// A NEW config built from `base` with `overrides` applied on top
// (overrides win). Don't mutate `base` — spread does this in one line.
//   Signature: (base: ServerConfig, overrides: Overrides) => ServerConfig
export function withOverrides(base: any, overrides: any): any {
  throw new Error('TODO: implement withOverrides')
}

// HTTP headers: ANY string header name maps to a string value.
//   Hint: an index signature.
export type HeaderMap = unknown

// A NEW map with the header `name` set to `value`. The input map must
// not be mutated.
//   withHeader({}, 'accept', 'json') -> { accept: 'json' }
//   Signature: (headers: HeaderMap, name: string, value: string) => HeaderMap
export function withHeader(headers: any, name: any, value: any): any {
  throw new Error('TODO: implement withHeader')
}
