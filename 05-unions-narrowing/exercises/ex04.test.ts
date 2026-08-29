import { describe, expect, expectTypeOf, it } from 'vitest'
import { move, sizeOf, toIso, type Boat, type Car } from './ex04'

describe('ex05/ex04 — in and instanceof narrowing', () => {
  it('Car and Boat are the two vehicle shapes', () => {
    expectTypeOf<Car>().toEqualTypeOf<{ drive: () => string }>()
    expectTypeOf<Boat>().toEqualTypeOf<{ sail: () => string }>()
  })

  it('move narrows with the in operator', () => {
    expect(move({ drive: () => 'vroom' })).toBe('vroom')
    expect(move({ sail: () => 'splash' })).toBe('splash')
    expectTypeOf(move).toEqualTypeOf<(vehicle: Car | Boat) => string>()
  })

  it('toIso narrows Date | string with instanceof', () => {
    expect(toIso(new Date(0))).toBe('1970-01-01T00:00:00.000Z')
    expect(toIso('2026-01-01')).toBe('2026-01-01T00:00:00.000Z')
    expectTypeOf(toIso).toEqualTypeOf<(stamp: Date | string) => string>()
  })

  it('sizeOf narrows string[] | Set<string> with instanceof', () => {
    expect(sizeOf(['a', 'b'])).toBe(2)
    expect(sizeOf(new Set(['a', 'b', 'c']))).toBe(3)
    expect(sizeOf(new Set<string>())).toBe(0)
    expect(sizeOf([])).toBe(0)             // empty array takes the array branch
    expect(sizeOf(new Set(['a', 'a']))).toBe(1)  // a Set dedupes; an array would not
    expectTypeOf(sizeOf).toEqualTypeOf<(collection: string[] | Set<string>) => number>()
  })
})
