import { describe, expect, expectTypeOf, it } from 'vitest'
import { makeAdder, pipeline2, twice } from './ex07'

describe('ex04/ex07 — higher-order functions', () => {
  it('makeAdder closes over x', () => {
    const add5 = makeAdder(5)
    expect(add5(10)).toBe(15)
    expect(makeAdder(0)(7)).toBe(7)
    expect(makeAdder(-5)(10)).toBe(5)
    // each adder closes over its own x
    const add1 = makeAdder(1)
    expect([add5(1), add1(1)]).toEqual([6, 2])
    expectTypeOf(makeAdder).toEqualTypeOf<(x: number) => (y: number) => number>()
  })

  it('twice applies fn twice', () => {
    expect(twice((n: number) => n + 1)(10)).toBe(12)
    expect(twice((n: number) => n * 3)(2)).toBe(18)
    expect(twice((n: number) => n)(9)).toBe(9)      // twice, not once or thrice
    expect(twice((n: number) => n * 2)(1)).toBe(4)
    expectTypeOf(twice).toEqualTypeOf<(fn: (n: number) => number) => (n: number) => number>()
  })

  it('pipeline2 chains number -> string -> boolean', () => {
    const isLongNumber = pipeline2(
      (n) => String(n),
      (s) => s.length > 2,
    )
    expect(isLongNumber(5)).toBe(false)
    expect(isLongNumber(500)).toBe(true)
    expect(isLongNumber(50)).toBe(false)   // boundary: length 2 is not > 2
    expectTypeOf(pipeline2).toEqualTypeOf<
      (f: (n: number) => string, g: (s: string) => boolean) => (n: number) => boolean
    >()
  })
})
