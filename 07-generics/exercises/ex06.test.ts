import { describe, expect, expectTypeOf, it } from 'vitest'
import { getProperty, longest, pluck } from './ex06'

describe('ex07/ex06 — constraints with extends & keyof', () => {
  it('longest compares by .length and keeps the argument type', () => {
    expect(longest([1, 2, 3], [4])).toEqual([1, 2, 3])
    expect(longest('ab', 'xyz')).toBe('xyz')
    expect(longest('ab', 'cd')).toBe('ab') // first wins a tie
    expect(longest('', '')).toBe('')       // empty tie still returns the first
    expect(longest([], [1])).toEqual([1])  // length 0 loses, but is compared
    const winner = longest([1, 2], [3, 4, 5])
    expectTypeOf(winner).toEqualTypeOf<number[]>()
  })

  it('longest rejects types without a length', () => {
    // @ts-expect-error — numbers have no .length property
    longest(10, 20)
  })

  it('getProperty looks the value type up with T[K]', () => {
    const user = { name: 'Ada', age: 36 }
    expect(getProperty(user, 'name')).toBe('Ada')
    const age = getProperty(user, 'age')
    expect(age).toBe(36)
    expectTypeOf(age).toEqualTypeOf<number>()
    expect(getProperty({ a: 0, b: '' }, 'a')).toBe(0)   // falsy values read back
    expect(getProperty({ a: 0, b: '' }, 'b')).toBe('')
    // @ts-expect-error — 'height' is not a key of user
    getProperty(user, 'height')
  })

  it('pluck collects one property from every element', () => {
    const people = [
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Grace' },
    ]
    expect(pluck(people, 'name')).toEqual(['Ada', 'Grace'])
    const ids = pluck(people, 'id')
    expect(ids).toEqual([1, 2])
    expect(pluck([{ n: 0 }, { n: 1 }], 'n')).toEqual([0, 1])  // falsy cells kept
    expect(pluck([], 'anything' as never)).toEqual([])
    expectTypeOf(ids).toEqualTypeOf<number[]>()
  })
})
