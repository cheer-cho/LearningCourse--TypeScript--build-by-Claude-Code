import { describe, expect, expectTypeOf, it } from 'vitest'
import { greet, range } from './ex02'

describe('ex04/ex02 — optional & default params', () => {
  it('greet defaults the greeting', () => {
    expect(greet('Ada')).toBe('Hello, Ada!')
    expect(greet('Ada', 'Yo')).toBe('Yo, Ada!')
    expectTypeOf(greet).toEqualTypeOf<(name: string, greeting?: string) => string>()
  })

  it('range works with one or two args', () => {
    expect(range(3)).toEqual([0, 1, 2])
    expect(range(2, 5)).toEqual([2, 3, 4])
    expect(range(0)).toEqual([])
    expectTypeOf(range).toEqualTypeOf<(start: number, end?: number) => number[]>()
  })
})
