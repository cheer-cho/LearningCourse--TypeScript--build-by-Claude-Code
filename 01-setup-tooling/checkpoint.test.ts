import { describe, expect, expectTypeOf, it } from 'vitest'
import { average, parseCelsius, readingAt, type Reading } from './checkpoint'

describe('✦ checkpoint 1 — setup & tooling', () => {
  it('Reading models the shape (sensor optional)', () => {
    expectTypeOf<Reading>().toEqualTypeOf<{
      time: string
      celsius: number
      sensor?: string
    }>()
  })

  it('parseCelsius: (string) => number | null', () => {
    expectTypeOf(parseCelsius).toEqualTypeOf<(raw: string) => number | null>()
    expect(parseCelsius('21.5')).toBe(21.5)
    expect(parseCelsius('-3')).toBe(-3)
    expect(parseCelsius('warm')).toBeNull()
    expect(parseCelsius('')).toBeNull()
    expect(parseCelsius('   ')).toBeNull()
    // 0 parses fine — it is a temperature, not a failure
    expect(parseCelsius('0')).toBe(0)
    expect(parseCelsius('0.0')).toBe(0)
    expect(parseCelsius(' 21.5 ')).toBe(21.5)   // Number() tolerates padding
    expect(parseCelsius('12abc')).toBeNull()
  })

  it('readingAt: (number[], number) => number | undefined', () => {
    expectTypeOf(readingAt).toEqualTypeOf<(temps: number[], index: number) => number | undefined>()
    expect(readingAt([1, 2, 3], 1)).toBe(2)
    expect(readingAt([1], 9)).toBeUndefined()
    expect(readingAt([0, 1], 0)).toBe(0)        // 0 is a reading, not a miss
    expect(readingAt([], 0)).toBeUndefined()
  })

  it('average: (number[]) => number, 0 for empty', () => {
    expectTypeOf(average).toEqualTypeOf<(temps: number[]) => number>()
    expect(average([10, 20, 30])).toBe(20)
    expect(average([])).toBe(0)
    expect(average([0, 0])).toBe(0)
    expect(average([5])).toBe(5)
    expect(average([-10, 10])).toBe(0)          // 0 from real data, not the empty guard
    expect(average([1, 2])).toBe(1.5)           // no integer truncation
  })
})
