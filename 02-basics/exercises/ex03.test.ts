import { describe, expect, expectTypeOf, it } from 'vitest'
import { distance, entry, logLine, rgba } from './ex03'

describe('ex02/ex03 — tuples', () => {
  it('entry: [string, number]', () => {
    expect(entry).toEqual(['ada', 42])
    expectTypeOf(entry).toEqualTypeOf<[string, number]>()
  })

  it('rgba: alpha is optional', () => {
    expect(rgba).toEqual([255, 128, 0])
    expectTypeOf(rgba).toEqualTypeOf<[number, number, number, number?]>()
  })

  it('logLine: label + any number of readings', () => {
    expect(logLine[0]).toBe('temps')
    expectTypeOf(logLine).toEqualTypeOf<[string, ...number[]]>()
  })

  it('distance works on [x, y] tuples', () => {
    expect(distance([0, 0], [3, 4])).toBe(5)
    expect(distance([1, 1], [1, 1])).toBe(0)
    expect(distance([3, 4], [0, 0])).toBe(5)      // order must not matter
    expect(distance([-3, -4], [0, 0])).toBe(5)    // negatives: squaring, not summing
    expect(distance([0, 0], [0, 5])).toBe(5)      // one axis only
    expectTypeOf(distance).toEqualTypeOf<(a: [x: number, y: number], b: [x: number, y: number]) => number>()
  })
})
