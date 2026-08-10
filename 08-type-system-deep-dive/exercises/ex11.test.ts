import { describe, expect, expectTypeOf, it } from 'vitest'
import { CONFIG, firstMethod, getTheme, METHODS } from './ex11'

describe('ex08/ex11 — as const + satisfies', () => {
  it('CONFIG keeps every property literal while being validated', () => {
    expect(CONFIG).toEqual({ theme: 'dark', retries: 3, endpoints: { api: '/api', auth: '/auth' } })
    expectTypeOf(CONFIG.theme).toEqualTypeOf<'dark'>()
    expectTypeOf(CONFIG.retries).toEqualTypeOf<3>()
    expectTypeOf(CONFIG.endpoints).toEqualTypeOf<{ readonly api: '/api'; readonly auth: '/auth' }>()
  })

  it('getTheme returns the literal theme value', () => {
    expect(getTheme()).toBe('dark')
    expectTypeOf(getTheme()).toEqualTypeOf<'dark'>()
  })

  it('METHODS stays a literal readonly tuple', () => {
    expect(METHODS).toEqual(['GET', 'POST', 'DELETE'])
    expectTypeOf(METHODS).toEqualTypeOf<readonly ['GET', 'POST', 'DELETE']>()
  })

  it('firstMethod returns the precise first element', () => {
    expect(firstMethod()).toBe('GET')
    expectTypeOf(firstMethod()).toEqualTypeOf<'GET'>()
  })
})
