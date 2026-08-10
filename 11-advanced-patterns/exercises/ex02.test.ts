import { describe, expect, expectTypeOf, it } from 'vitest'
import { ConfigBuilder, createBuilder, type ServerConfig } from './ex02'

describe('ex11/ex02 — type-state builder', () => {
  it('createBuilder starts with no supplied keys', () => {
    expectTypeOf(createBuilder()).toEqualTypeOf<ConfigBuilder<never>>()
  })

  it('each with* call adds its key to the type', () => {
    const b = createBuilder()
    expectTypeOf(b.withHost('localhost')).toEqualTypeOf<ConfigBuilder<'host'>>()
    expectTypeOf(b.withHost('localhost').withPort(8080)).toEqualTypeOf<ConfigBuilder<'host' | 'port'>>()
  })

  it('a complete chain builds the full config', () => {
    const config = createBuilder().withHost('localhost').withPort(8080).withProtocol('https').build()
    expect(config).toEqual({ host: 'localhost', port: 8080, protocol: 'https' })
    expectTypeOf(config).toEqualTypeOf<ServerConfig>()
  })

  it('order does not matter, only completeness', () => {
    const config = createBuilder().withProtocol('http').withPort(3000).withHost('api.dev').build()
    expect(config).toEqual({ host: 'api.dev', port: 3000, protocol: 'http' })
  })

  it('build refuses to compile until every field is supplied', () => {
    const incomplete = createBuilder().withHost('localhost').withPort(8080)
    const attempt = () => {
      // @ts-expect-error — protocol has not been supplied yet
      incomplete.build()
    }
    expect(typeof attempt).toBe('function')
  })
})
