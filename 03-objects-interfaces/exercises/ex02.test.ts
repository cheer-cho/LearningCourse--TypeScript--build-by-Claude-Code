import { describe, expect, expectTypeOf, it } from 'vitest'
import { movePort, withDebug, type Config } from './ex02'

describe('ex03/ex02 — readonly properties', () => {
  const base = { host: 'localhost', port: 8080, debug: false }

  it('Config marks host and port readonly', () => {
    expectTypeOf<Config>().toEqualTypeOf<{
      readonly host: string
      readonly port: number
      debug: boolean
    }>()
  })

  it('withDebug returns a new config, original untouched', () => {
    const result = withDebug(base, true)
    expect(result).toEqual({ host: 'localhost', port: 8080, debug: true })
    expect(result).not.toBe(base)
    expect(base.debug).toBe(false)
    expectTypeOf(withDebug).toEqualTypeOf<(config: Config, debug: boolean) => Config>()
  })

  it('movePort returns a new config with the new port', () => {
    const result = movePort(base, 3000)
    expect(result).toEqual({ host: 'localhost', port: 3000, debug: false })
    expect(base.port).toBe(8080)
    expectTypeOf(movePort).toEqualTypeOf<(config: Config, port: number) => Config>()
  })
})
