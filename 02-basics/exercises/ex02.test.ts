import { describe, expect, expectTypeOf, it } from 'vitest'
import { frozen, languages, matrix, sumAll } from './ex02'

describe('ex02/ex02 — arrays', () => {
  it('languages: string[]', () => {
    expect(languages).toContain('typescript')
    expectTypeOf(languages).toEqualTypeOf<string[]>()
  })

  it('matrix: number[][]', () => {
    expect(matrix[1]?.[0]).toBe(3)
    expectTypeOf(matrix).toEqualTypeOf<number[][]>()
  })

  it('frozen: readonly number[]', () => {
    expect(frozen).toEqual([1, 2, 3])
    expectTypeOf(frozen).toEqualTypeOf<readonly number[]>()
  })

  it('sumAll adds everything without mutating', () => {
    const input = [1, 2, 3, 4]
    expect(sumAll(input)).toBe(10)
    expect(sumAll([])).toBe(0)
    expect(sumAll([0, 0])).toBe(0)
    expect(sumAll([-5, 5])).toBe(0)     // 0 from real data, not the empty case
    expect(sumAll([-1, -2])).toBe(-3)
    expect(sumAll([1.5, 2.5])).toBe(4)
    expect(input).toEqual([1, 2, 3, 4])
    expectTypeOf(sumAll).parameter(0).toEqualTypeOf<readonly number[]>()
  })
})
