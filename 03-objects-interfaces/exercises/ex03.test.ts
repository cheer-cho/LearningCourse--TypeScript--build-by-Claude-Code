import { describe, expect, expectTypeOf, it } from 'vitest'
import { countWords, getCount, type WordCount } from './ex03'

describe('ex03/ex03 — index signatures', () => {
  it('WordCount maps any string key to a number', () => {
    expectTypeOf<WordCount>().toEqualTypeOf<{ [word: string]: number }>()
  })

  it('countWords counts occurrences', () => {
    expect(countWords('a b a')).toEqual({ a: 2, b: 1 })
    expect(countWords('ts ts ts')).toEqual({ ts: 3 })
    expect(countWords('')).toEqual({})
    expect(countWords('   ')).toEqual({})           // whitespace only
    expect(countWords('  a   b  ')).toEqual({ a: 1, b: 1 })  // padding & runs
    expect(countWords('A a')).toEqual({ A: 1, a: 1 })        // case sensitive
  })

  it('getCount returns 0 for unseen words', () => {
    const counts = countWords('hello world hello')
    expect(getCount(counts, 'hello')).toBe(2)
    expect(getCount(counts, 'nope')).toBe(0)
    expect(getCount({}, 'anything')).toBe(0)
    expect(getCount(counts, 'world')).toBe(1)
    expectTypeOf(getCount).returns.toEqualTypeOf<number>()
  })
})
