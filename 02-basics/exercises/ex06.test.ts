import { describe, expect, expectTypeOf, it } from 'vitest'
import { describeValue } from './ex06'

describe('ex02/ex06 — any vs unknown', () => {
  it('describes strings with their length', () => {
    expect(describeValue('hey')).toBe('string of length 3')
    expect(describeValue('')).toBe('string of length 0')
  })

  it('describes numbers, booleans, arrays', () => {
    expect(describeValue(7)).toBe('number')
    expect(describeValue(0)).toBe('number')      // falsy, still a number
    expect(describeValue(NaN)).toBe('number')
    expect(describeValue(true)).toBe('boolean')
    expect(describeValue(false)).toBe('boolean') // falsy, still a boolean
    expect(describeValue([1, 2, 3])).toBe('array of 3 items')
    expect(describeValue([])).toBe('array of 0 items')
  })

  it('everything else is other', () => {
    expect(describeValue(null)).toBe('other')
    expect(describeValue(undefined)).toBe('other')
    expect(describeValue({})).toBe('other')
  })

  it('the parameter is unknown (not any)', () => {
    expectTypeOf(describeValue).parameter(0).toEqualTypeOf<unknown>()
  })
})
