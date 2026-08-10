import { describe, expect, expectTypeOf, it } from 'vitest'
import { firstItem, identity, wrapInArray } from './ex01'

describe('ex07/ex01 — generic functions & inference', () => {
  it('identity returns its argument with the type preserved', () => {
    const msg: string = 'hello'
    const echoed = identity(msg)
    expect(echoed).toBe('hello')
    expectTypeOf(echoed).toEqualTypeOf<string>()

    const arr = [1, 2, 3]
    expect(identity(arr)).toBe(arr)
    expectTypeOf(identity(['a', 'b'])).toEqualTypeOf<string[]>()
  })

  it('firstItem infers the element type from the array', () => {
    expect(firstItem([1, 2, 3])).toBe(1)
    expect(firstItem([])).toBeUndefined()
    const first = firstItem(['a', 'b'])
    expect(first).toBe('a')
    expectTypeOf(first).toEqualTypeOf<string | undefined>()
  })

  it('wrapInArray produces a typed one-element array', () => {
    expect(wrapInArray(5)).toEqual([5])
    const flag = Math.random() < 2 // always true, but typed boolean
    const flags = wrapInArray(flag)
    expect(flags).toEqual([true])
    expectTypeOf(flags).toEqualTypeOf<boolean[]>()
  })
})
