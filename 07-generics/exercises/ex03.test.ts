import { describe, expect, expectTypeOf, it } from 'vitest'
import { mapObject, swap, zip } from './ex03'

describe('ex07/ex03 — multiple type parameters', () => {
  it('zip pairs two arrays into typed tuples', () => {
    const zipped = zip(['a', 'b'], [1, 2])
    expect(zipped).toEqual([
      ['a', 1],
      ['b', 2],
    ])
    expectTypeOf(zipped).toEqualTypeOf<Array<[string, number]>>()
  })

  it('zip stops at the shorter array', () => {
    expect(zip([1, 2, 3], ['only'])).toEqual([[1, 'only']])
    expect(zip([], [1, 2])).toEqual([])
  })

  it('swap flips the tuple order in values AND types', () => {
    const pair: [string, number] = ['x', 1]
    const swapped = swap(pair)
    expect(swapped).toEqual([1, 'x'])
    expectTypeOf(swapped).toEqualTypeOf<[number, string]>()
  })

  it('mapObject transforms values, keeps keys', () => {
    const doubled = mapObject({ a: 1, b: 2 }, (v) => v * 2)
    expect(doubled).toEqual({ a: 2, b: 4 })
    expectTypeOf(doubled).toEqualTypeOf<Record<'a' | 'b', number>>()
  })

  it('mapObject hands the key to the callback', () => {
    const labeled = mapObject({ x: 10, y: 20 }, (v, k) => `${k}=${v}`)
    expect(labeled).toEqual({ x: 'x=10', y: 'y=20' })
    expectTypeOf(labeled).toEqualTypeOf<Record<'x' | 'y', string>>()
  })
})
