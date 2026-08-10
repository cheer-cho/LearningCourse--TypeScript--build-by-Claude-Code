import { describe, expect, expectTypeOf, it } from 'vitest'
import { err, fromPromise, map, ok, unwrapOr, type Err, type Ok, type Result } from './ex06'

// Rejected promise with the rejection pre-handled (no unhandled-rejection
// noise while fromPromise is still a TODO stub).
function rejectedWith<T>(reason: unknown): Promise<T> {
  const p = Promise.reject<T>(reason)
  p.catch(() => {})
  return p
}

const n: number = 2
const msg: string = 'nope'

describe('ex10/ex06 — the Result pattern', () => {
  it('Ok, Err and Result are the discriminated union', () => {
    expectTypeOf<Ok<number>>().toEqualTypeOf<{ ok: true; value: number }>()
    expectTypeOf<Err<string>>().toEqualTypeOf<{ ok: false; error: string }>()
    expectTypeOf<Result<number, string>>().toEqualTypeOf<
      { ok: true; value: number } | { ok: false; error: string }
    >()
  })

  it('ok and err build the two arms', () => {
    const success = ok(n)
    expect(success).toEqual({ ok: true, value: 2 })
    expectTypeOf(success).toEqualTypeOf<Ok<number>>()
    const failure = err(msg)
    expect(failure).toEqual({ ok: false, error: 'nope' })
    expectTypeOf(failure).toEqualTypeOf<Err<string>>()
  })

  it('map transforms Ok values and passes Err through untouched', () => {
    expect(map(ok(n) as Result<number, string>, (value: number) => value * 2)).toEqual({
      ok: true,
      value: 4,
    })
    const failure = err(msg) as Result<number, string>
    expect(map(failure, (value: number) => value * 2)).toBe(failure)
    const mapped = map(ok(n) as Result<number, string>, (value: number) => String(value))
    expectTypeOf(mapped).toEqualTypeOf<Result<string, string>>()
  })

  it('unwrapOr returns the value or the fallback', () => {
    const unwrapped = unwrapOr(ok(n) as Result<number, string>, 0)
    expect(unwrapped).toBe(2)
    expect(unwrapOr(err(msg) as Result<number, string>, 0)).toBe(0)
    expectTypeOf(unwrapped).toEqualTypeOf<number>()
  })

  it('fromPromise converts settlement into a Result', async () => {
    const success = fromPromise(Promise.resolve(7))
    expectTypeOf(success).toEqualTypeOf<Promise<Result<number, Error>>>()
    await expect(success).resolves.toEqual({ ok: true, value: 7 })
    await expect(fromPromise(rejectedWith<number>(new Error('nope')))).resolves.toEqual({
      ok: false,
      error: new Error('nope'),
    })
  })

  it('fromPromise normalizes non-Error rejection reasons', async () => {
    const result = await fromPromise(rejectedWith<number>('raw reason'))
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toBeInstanceOf(Error)
      expect(result.error.message).toBe('raw reason')
    }
  })
})
