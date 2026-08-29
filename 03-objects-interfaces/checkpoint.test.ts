import { describe, expect, expectTypeOf, it } from 'vitest'
import { withHeader, withOverrides, type HeaderMap, type Overrides, type ServerConfig } from './checkpoint'

describe('✦ checkpoint 3 — objects & interfaces', () => {
  it('ServerConfig has the right shape', () => {
    expectTypeOf<ServerConfig>().toEqualTypeOf<{
      readonly host: string
      readonly port: number
      env: 'dev' | 'prod'
      debug?: boolean
    }>()
  })

  it('Overrides only allows env and debug, both optional', () => {
    expectTypeOf<Overrides>().toEqualTypeOf<{
      env?: 'dev' | 'prod'
      debug?: boolean
    }>()
  })

  it('withOverrides merges immutably, overrides win', () => {
    const base = { host: 'x', port: 80, env: 'dev' } as ServerConfig
    const result = withOverrides(base, { env: 'prod', debug: true })
    expect(result).toEqual({ host: 'x', port: 80, env: 'prod', debug: true })
    expect(base).toEqual({ host: 'x', port: 80, env: 'dev' })

    // an empty override changes nothing
    expect(withOverrides(base, {})).toEqual({ host: 'x', port: 80, env: 'dev' })
    // a FALSY override still wins — `&&`-guarded spreads drop this silently
    const debugOn = withOverrides(base, { debug: true })
    expect(withOverrides(debugOn, { debug: false }).debug).toBe(false)
    // overriding one key leaves the other alone
    expect(withOverrides(base, { debug: true }).env).toBe('dev')
    expectTypeOf(withOverrides).toEqualTypeOf<(base: ServerConfig, overrides: Overrides) => ServerConfig>()
  })

  it('HeaderMap is an index signature to string', () => {
    expectTypeOf<HeaderMap>().toEqualTypeOf<{ [name: string]: string }>()
  })

  it('withHeader sets without mutating', () => {
    const headers: HeaderMap = { accept: 'application/json' }
    const result = withHeader(headers, 'authorization', 'Bearer x')
    expect(result).toEqual({ accept: 'application/json', authorization: 'Bearer x' })
    expect(headers).toEqual({ accept: 'application/json' })
    // setting an existing name replaces it; an empty value is still a value
    expect(withHeader(headers, 'accept', 'text/plain')).toEqual({ accept: 'text/plain' })
    expect(withHeader(headers, 'x-trace', '')).toEqual({ accept: 'application/json', 'x-trace': '' })
    expectTypeOf(withHeader).toEqualTypeOf<(headers: HeaderMap, name: string, value: string) => HeaderMap>()
  })
})
