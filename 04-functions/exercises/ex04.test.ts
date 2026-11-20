import { describe, expect, expectTypeOf, it } from 'vitest'
import { makeDate, toArray } from './ex04'

describe('ex04/ex04 — overloads', () => {
  it('toArray: precise return type per argument type', () => {
    expect(toArray('abc')).toEqual(['a', 'b', 'c'])
    expect(toArray(123)).toEqual([1, 2, 3])
    expect(toArray('')).toEqual([])     // empty string, not a failure
    expect(toArray(0)).toEqual([0])     // falsy number, still one digit
    expectTypeOf(toArray('abc')).toEqualTypeOf<string[]>()
    expectTypeOf(toArray(123)).toEqualTypeOf<number[]>()
  })

  it('makeDate: ISO string or (year, monthIndex, day)', () => {
    // a fixed date in ANOTHER year: an implementation that ignores the
    // string (e.g. returns `new Date()`) must fail
    const iso = makeDate('2020-03-15T00:00:00Z')
    expect(iso.toISOString()).toBe('2020-03-15T00:00:00.000Z')
    const d = makeDate(2026, 0, 15)
    expect(d.getFullYear()).toBe(2026)
    expect(d.getMonth()).toBe(0)
    expect(d.getDate()).toBe(15)
    expectTypeOf(makeDate('x')).toEqualTypeOf<Date>()
    expectTypeOf(makeDate(1, 2, 3)).toEqualTypeOf<Date>()
  })
})
