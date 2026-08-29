import { describe, expect, expectTypeOf, it } from 'vitest'
import { buildPath, callWith, sumOf } from './ex03'

describe('ex04/ex03 — rest params & tuple spreads', () => {
  it('sumOf takes any number of numbers', () => {
    expect(sumOf()).toBe(0)
    expect(sumOf(1, 2, 3)).toBe(6)
    expect(sumOf(0)).toBe(0)
    expect(sumOf(-1, 1)).toBe(0)   // 0 from real data, not the no-args case
    expectTypeOf(sumOf).toEqualTypeOf<(...nums: number[]) => number>()
  })

  it('buildPath joins base + segments', () => {
    expect(buildPath('api')).toBe('api')
    expect(buildPath('api', 'users', '42')).toBe('api/users/42')
    expect(buildPath('api', 'users')).toBe('api/users')  // no trailing separator
    expectTypeOf(buildPath).toEqualTypeOf<(base: string, ...segments: string[]) => string>()
  })

  it('callWith spreads a typed tuple', () => {
    expect(callWith((a, b) => b.repeat(a), [3, 'ab'])).toBe('ababab')
    expect(callWith((a, b) => b.repeat(a), [0, 'ab'])).toBe('')   // 0 is a real arg
    expect(callWith((a, b) => `${a}:${b}`, [1, 'x'])).toBe('1:x') // tuple order kept
    expectTypeOf(callWith).parameter(1).toEqualTypeOf<[number, string]>()
  })
})
