import { describe, expect, expectTypeOf, it } from 'vitest'
import { wrap, type IsString, type StringOrNumber, type ToArray } from './ex02'

describe('ex08/ex02 — conditional types', () => {
  it('IsString reports whether T extends string', () => {
    expectTypeOf<IsString<'a'>>().toEqualTypeOf<true>()
    expectTypeOf<IsString<string>>().toEqualTypeOf<true>()
    expectTypeOf<IsString<number>>().toEqualTypeOf<false>()
    // conditional types DISTRIBUTE: a union gives a union, never gives never
    expectTypeOf<IsString<'a' | 1>>().toEqualTypeOf<boolean>()
    expectTypeOf<IsString<never>>().toEqualTypeOf<never>()
  })

  it('ToArray leaves arrays alone, wraps everything else', () => {
    expectTypeOf<ToArray<string>>().toEqualTypeOf<string[]>()
    expectTypeOf<ToArray<number[]>>().toEqualTypeOf<number[]>()
    expectTypeOf<ToArray<never>>().toEqualTypeOf<never>()
  })

  it('StringOrNumber filters out everything else', () => {
    expectTypeOf<StringOrNumber<string>>().toEqualTypeOf<string>()
    expectTypeOf<StringOrNumber<boolean>>().toEqualTypeOf<never>()
    // filtering a union drops only the members that fail
    expectTypeOf<StringOrNumber<string | boolean>>().toEqualTypeOf<string>()
  })

  it('wrap normalizes a value into an array', () => {
    expect(wrap(5)).toEqual([5])
    expect(wrap([1, 2])).toEqual([1, 2])
    expect(wrap([])).toEqual([])       // an empty array is already an array
    expect(wrap(0)).toEqual([0])
    expectTypeOf(wrap(5)).toEqualTypeOf<number[]>()
    expectTypeOf(wrap([1, 2])).toEqualTypeOf<number[]>()
  })
})
