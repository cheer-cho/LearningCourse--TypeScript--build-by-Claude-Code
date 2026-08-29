import { describe, expect, expectTypeOf, it } from 'vitest'
import { pipe } from './ex03'

const toLen = (s: string) => s.length
const double = (n: number) => n * 2
const tag = (n: number) => `#${n}`
const isLong = (s: string) => s.length > 3

describe('ex11/ex03 — pipe composition', () => {
  it('one function: pipe is a typed identity wrapper', () => {
    const p = pipe(toLen)
    expect(p('abc')).toBe(3)
    expectTypeOf(p).toEqualTypeOf<(a: string) => number>()
  })

  it('two functions: output of the first feeds the second', () => {
    const p = pipe(toLen, double)
    expect(p('abcd')).toBe(8)
    expect(p('')).toBe(0)   // a falsy intermediate must keep flowing
    expectTypeOf(p).toEqualTypeOf<(a: string) => number>()
  })

  it('three functions: the middle type can change', () => {
    const p = pipe(toLen, double, tag)
    expect(p('ab')).toBe('#4')
    expectTypeOf(p).toEqualTypeOf<(a: string) => string>()
  })

  it('four functions: end-to-end string -> boolean', () => {
    const p = pipe(toLen, double, tag, isLong)
    // toLen -> double -> tag -> isLong: a 60-char string doubles past 100,
    // so its '#'-tag is longer than 3 chars; a 1-char string stays short.
    expect(p('x'.repeat(60))).toBe(true)
    expect(p('a')).toBe(false)
    expectTypeOf(p).toEqualTypeOf<(a: string) => boolean>()
  })

  it('a mismatched chain does not compile', () => {
    const attempt = () => {
      // @ts-expect-error — tag returns string, but double wants number
      pipe(toLen, tag, double)
    }
    expect(typeof attempt).toBe('function')
  })
})
