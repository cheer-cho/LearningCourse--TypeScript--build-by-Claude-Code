import { describe, expect, expectTypeOf, it } from 'vitest'
import { hugeNumber, isAdmin, nothingHere, notSetYet, uniqueKey, username, year } from './ex01'

describe('ex02/ex01 — primitives', () => {
  it('has the right runtime values', () => {
    expect(username).toBe('ada')
    expect(year).toBe(2026)
    expect(isAdmin).toBe(false)
    expect(nothingHere).toBeNull()
    expect(notSetYet).toBeUndefined()
    expect(typeof hugeNumber).toBe('bigint')
    expect(typeof uniqueKey).toBe('symbol')
  })

  it('has precise primitive types (no any)', () => {
    expectTypeOf(username).toEqualTypeOf<string>()
    expectTypeOf(year).toEqualTypeOf<number>()
    expectTypeOf(isAdmin).toEqualTypeOf<boolean>()
    expectTypeOf(nothingHere).toEqualTypeOf<null>()
    expectTypeOf(notSetYet).toEqualTypeOf<undefined>()
    expectTypeOf(hugeNumber).toEqualTypeOf<bigint>()
    expectTypeOf(uniqueKey).toEqualTypeOf<symbol>()
  })
})
