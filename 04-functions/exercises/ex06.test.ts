import { describe, expect, expectTypeOf, it } from 'vitest'
import { collectDoubles, forEachNumber, quiz } from './ex06'

describe('ex04/ex06 — void quirks', () => {
  it('forEachNumber visits in order', () => {
    const seen: number[] = []
    forEachNumber([1, 2, 3], (n) => seen.push(n))
    expect(seen).toEqual([1, 2, 3])
    expectTypeOf(forEachNumber).parameter(1).toEqualTypeOf<(n: number) => void>()
  })

  it('collectDoubles doubles', () => {
    expect(collectDoubles([1, 2, 3])).toEqual([2, 4, 6])
    expect(collectDoubles([])).toEqual([])
  })

  it('quiz: void-typed callbacks accept returns; declared void does not', () => {
    expect(quiz.q1).toBe('yes')
    expect(quiz.q2).toBe('no')
  })
})
