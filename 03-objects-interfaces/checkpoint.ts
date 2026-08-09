/**
 * ✦ CHECKPOINT 3 — Objects & Interfaces
 *
 * A tiny server-config system. Combines: readonly, optional props,
 * literal unions, index signatures, and immutable updates.
 *
 * 1. ServerConfig:
 *      readonly host: string
 *      readonly port: number
 *      env: 'dev' | 'prod'
 *      debug?: boolean          (optional)
 * 2. Overrides: env and debug, both OPTIONAL (no host/port overrides).
 * 3. withOverrides(base, overrides): new config, overrides win.
 * 4. HeaderMap: index signature — any string header name -> string value.
 * 5. withHeader(headers, name, value): NEW map with the header set
 *    (no mutation of the input).
 *
 * Passing `npm test -- 03` completes this module. 🎉
 */

// TODO
export type ServerConfig = unknown

// TODO
export type Overrides = unknown

// TODO: fix types, then implement (spread does this in one line).
export function withOverrides(base: any, overrides: any): any {
  throw new Error('TODO: implement withOverrides')
}

// TODO
export type HeaderMap = unknown

// TODO: fix types, then implement without mutating `headers`.
export function withHeader(headers: any, name: any, value: any): any {
  throw new Error('TODO: implement withHeader')
}
