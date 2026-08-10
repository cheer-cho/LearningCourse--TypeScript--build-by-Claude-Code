import { describe, expect, expectTypeOf, it } from 'vitest'
import { ids, len, type Answer, type Id } from './ex01'

describe('ex05/ex01 — union types', () => {
  it('Id is string | number', () => {
    expectTypeOf<Id>().toEqualTypeOf<string | number>()
  })

  it('Answer is the three-answer literal union', () => {
    expectTypeOf<Answer>().toEqualTypeOf<'yes' | 'no' | 'maybe'>()
  })

  it('len works on both union members via the common .length', () => {
    expect(len('hello')).toBe(5)
    expect(len([1, 2, 3])).toBe(3)
    expect(len([])).toBe(0)
    expectTypeOf(len).toEqualTypeOf<(x: string | unknown[]) => number>()
  })

  it('ids is an array of Id', () => {
    expect(ids).toEqual([7, 'a42', 9])
    expectTypeOf(ids).toEqualTypeOf<(string | number)[]>()
  })
})
