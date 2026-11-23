import { describe, expect, expectTypeOf, it } from 'vitest'
import { boxOf, safeDivide, unwrapOr, type Box, type Result } from './ex04_generic_types'

describe('ex07/ex04 — generic type aliases & interfaces', () => {
  it('Box<T> is an object holding one value of type T', () => {
    expectTypeOf<Box<number>>().toEqualTypeOf<{ value: number }>()
    expectTypeOf<Box<string[]>>().toEqualTypeOf<{ value: string[] }>()
  })

  it('boxOf wraps a value and infers T', () => {
    const n: number = 7
    const boxed = boxOf(n)
    expect(boxed).toEqual({ value: 7 })
    expectTypeOf(boxed).toEqualTypeOf<Box<number>>()
  })

  it('Result<T, E> is the ok/error union', () => {
    expectTypeOf<Result<number, string>>().toEqualTypeOf<
      { ok: true; value: number } | { ok: false; error: string }
    >()
  })

  it('safeDivide reports division by zero as a Result', () => {
    expect(safeDivide(10, 2)).toEqual({ ok: true, value: 5 })
    expect(safeDivide(1, 0)).toEqual({ ok: false, error: 'division by zero' })
    // 0 is a perfectly good RESULT — only a zero DIVISOR is an error
    expect(safeDivide(0, 5)).toEqual({ ok: true, value: 0 })
    expect(safeDivide(0, 0)).toEqual({ ok: false, error: 'division by zero' })
    expectTypeOf(safeDivide).toEqualTypeOf<(a: number, b: number) => Result<number, string>>()
  })

  it('unwrapOr extracts the value or falls back', () => {
    const value = unwrapOr(safeDivide(9, 3), 0)
    expect(value).toBe(3)
    expectTypeOf(value).toEqualTypeOf<number>()
    expect(unwrapOr(safeDivide(1, 0), -1)).toBe(-1)
    // the ok FLAG decides, not the value's truthiness
    expect(unwrapOr(safeDivide(0, 5), -1)).toBe(0)
    expect(unwrapOr({ ok: true, value: '' } as const, 'fallback')).toBe('')
  })

  it('unwrapOr is generic in E too, and the fallback must match T', () => {
    // unwrapOr must not be tied to string errors — an Error object works too
    const parsed: Result<number, Error> = { ok: false, error: new Error('bad input') }
    const n = unwrapOr(parsed, 0)
    expect(n).toBe(0)
    expectTypeOf(n).toEqualTypeOf<number>()

    // any error type works — here a union of status codes
    const fetched: Result<string, 404 | 500> = { ok: false, error: 404 }
    const s = unwrapOr(fetched, 'none')
    expect(s).toBe('none')
    expectTypeOf(s).toEqualTypeOf<string>()

    // a fallback of a different type is a bug, not a reason to return a union
    const age: Result<number, string> = { ok: true, value: 30 }
    // @ts-expect-error — string fallback for a number Result must be rejected
    unwrapOr(age, 'N/A')
  })
})
