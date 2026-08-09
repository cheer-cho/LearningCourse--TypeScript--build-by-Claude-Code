import { describe, expect, expectTypeOf, it } from 'vitest'
import { firstOrDefault, itemAt, lengthOf } from './ex02'

describe('ex02 — strict null checks', () => {
  it('firstOrDefault returns the first item or the fallback', () => {
    expect(firstOrDefault(['a', 'b'], 'z')).toBe('a')
    expect(firstOrDefault([], 'z')).toBe('z')
    expectTypeOf(firstOrDefault).returns.toEqualTypeOf<string>()
  })

  it('lengthOf handles null and undefined', () => {
    expect(lengthOf('four')).toBe(4)
    expect(lengthOf(null)).toBe(0)
    expect(lengthOf(undefined)).toBe(0)
  })

  it('itemAt returns the item or undefined', () => {
    expect(itemAt([10, 20, 30], 1)).toBe(20)
    expect(itemAt([10], 5)).toBeUndefined()
    expectTypeOf(itemAt).returns.toEqualTypeOf<number | undefined>()
  })
})
