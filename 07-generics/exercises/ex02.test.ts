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
    expect(mapArray([], (n: never) => n)).toEqual([])
    expect(mapArray([0, 1], (n) => n * 2)).toEqual([0, 2])  // falsy items map too
  })

  it('filterArray keeps the element type', () => {
    const evens = filterArray([1, 2, 3, 4], (n) => n % 2 === 0)
    expect(evens).toEqual([2, 4])
    expectTypeOf(evens).toEqualTypeOf<number[]>()
    expect(filterArray(['a', 'bb'], (s) => s.length > 1)).toEqual(['bb'])
    // the PREDICATE decides, not the item's truthiness
    expect(filterArray([0, 1, 2], () => true)).toEqual([0, 1, 2])
    expect(filterArray(['', 'a'], () => true)).toEqual(['', 'a'])
    expect(filterArray([1, 2], () => false)).toEqual([])
    const source = [1, 2, 3]
    expect(filterArray(source, () => true)).not.toBe(source)  // a new array
  })

  it('flatten removes one level of nesting', () => {
    const flat = flatten([
      [1, 2],
      [3],
    ])
    expect(flat).toEqual([1, 2, 3])
    expectTypeOf(flat).toEqualTypeOf<number[]>()
    expect(flatten([['a'], [], ['b', 'c']])).toEqual(['a', 'b', 'c'])
    expect(flatten([])).toEqual([])
    expect(flatten([[], []])).toEqual([])
    expect(flatten([[0], [0]])).toEqual([0, 0])
  })
})
