import { describe, expect, expectTypeOf, it } from 'vitest'
import { filterArray, flatten, mapArray } from './ex02'

describe('ex07/ex02 — map & filter reimplemented', () => {
  it('mapArray transforms elements and changes the type', () => {
    const lengths = mapArray(['a', 'bb', 'ccc'], (s) => s.length)
    expect(lengths).toEqual([1, 2, 3])
    expectTypeOf(lengths).toEqualTypeOf<number[]>()
  })

  it('mapArray passes the index as the second callback argument', () => {
    expect(mapArray(['x', 'y'], (s, i) => `${i}:${s}`)).toEqual(['0:x', '1:y'])
  })

  it('filterArray keeps the element type', () => {
    const evens = filterArray([1, 2, 3, 4], (n) => n % 2 === 0)
    expect(evens).toEqual([2, 4])
    expectTypeOf(evens).toEqualTypeOf<number[]>()
    expect(filterArray(['a', 'bb'], (s) => s.length > 1)).toEqual(['bb'])
  })

  it('flatten removes one level of nesting', () => {
    const flat = flatten([
      [1, 2],
      [3],
    ])
    expect(flat).toEqual([1, 2, 3])
    expectTypeOf(flat).toEqualTypeOf<number[]>()
    expect(flatten([['a'], [], ['b', 'c']])).toEqual(['a', 'b', 'c'])
  })
})
