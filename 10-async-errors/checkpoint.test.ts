import { describe, expect, expectTypeOf, it } from 'vitest'
import {
  describeResult,
  err,
  fetchResilient,
  ok,
  TimeoutError,
  withTimeout,
  type Err,
  type Ok,
  type Result,
} from './checkpoint'

describe('✦ checkpoint 10 — async & error handling', () => {
  it('TimeoutError carries ms and builds its message/name', () => {
    const e = new TimeoutError(50)
    expect(e.message).toBe('timed out after 50ms')
    expect(e.name).toBe('TimeoutError')
    expect(e.ms).toBe(50)
    expect(new TimeoutError(0).message).toBe('timed out after 0ms')
    expect(e).toBeInstanceOf(Error)
    expectTypeOf(e.ms).toEqualTypeOf<number>()
    expectTypeOf(TimeoutError).constructorParameters.toEqualTypeOf<[ms: number]>()
  })

  it('withTimeout passes a fast promise through untouched', async () => {
    const fast = new Promise<string>((resolve) => setTimeout(() => resolve('fast'), 5))
    const p = withTimeout(fast, 20)
    expectTypeOf(p).toEqualTypeOf<Promise<string>>()
    await expect(p).resolves.toBe('fast')
  })

  it('withTimeout rejects a slow promise with a TimeoutError', async () => {
    const slow = new Promise<number>((resolve) => setTimeout(() => resolve(1), 20))
    await expect(withTimeout(slow, 5)).rejects.toBeInstanceOf(TimeoutError)
    await expect(withTimeout(slow, 5)).rejects.toThrow('timed out after 5ms')
  })

  it('Ok, Err and Result are the discriminated union', () => {
    expectTypeOf<Ok<number>>().toEqualTypeOf<{ ok: true; value: number }>()
    expectTypeOf<Err<string>>().toEqualTypeOf<{ ok: false; error: string }>()
    expectTypeOf<Result<number, string>>().toEqualTypeOf<
      { ok: true; value: number } | { ok: false; error: string }
    >()
    expect(ok(1)).toEqual({ ok: true, value: 1 })
    expect(err('x')).toEqual({ ok: false, error: 'x' })
  })

  it('fetchResilient resolves ok on the first success', async () => {
    let calls = 0
    const succeed = async () => {
      calls += 1
      return 'data'
    }
    const result = await fetchResilient(succeed, { attempts: 3, timeoutMs: 20 })
    expect(result).toEqual({ ok: true, value: 'data' })
    expect(calls).toBe(1)
    // a falsy value is a success — do not retry past it
    let zeroCalls = 0
    const zero = async () => {
      zeroCalls += 1
      return 0
    }
    await expect(fetchResilient(zero, { attempts: 3, timeoutMs: 20 })).resolves.toEqual({
      ok: true,
      value: 0,
    })
    expect(zeroCalls).toBe(1)
    expectTypeOf(result).toEqualTypeOf<Result<string, Error>>()
  })

  it('fetchResilient retries after a rejection and eventually succeeds', async () => {
    let calls = 0
    const flaky = async () => {
      calls += 1
      if (calls < 3) throw new Error(`fail ${calls}`)
      return 42
    }
    const result = await fetchResilient(flaky, { attempts: 5, timeoutMs: 20 })
    expect(result).toEqual({ ok: true, value: 42 })
    expect(calls).toBe(3)
  })

  it('fetchResilient retries after a timeout and eventually succeeds', async () => {
    let calls = 0
    const sometimesSlow = () => {
      calls += 1
      const slow = calls < 2
      return new Promise<string>((resolve) => setTimeout(() => resolve('ok'), slow ? 20 : 2))
    }
    const result = await fetchResilient(sometimesSlow, { attempts: 3, timeoutMs: 8 })
    expect(result).toEqual({ ok: true, value: 'ok' })
    expect(calls).toBe(2)
  })

  it('fetchResilient never rejects — resolves err with the LAST failure when every attempt fails', async () => {
    let calls = 0
    const doomed = async () => {
      calls += 1
      throw new Error(`fail ${calls}`)
    }
    const result = await fetchResilient(doomed, { attempts: 2, timeoutMs: 20 })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toBeInstanceOf(Error)
      expect(result.error.message).toBe('fail 2')
    }
    expect(calls).toBe(2)
  })

  it('fetchResilient normalizes non-Error throws', async () => {
    const doomed = async () => {
      throw 'raw string failure'
    }
    const result = await fetchResilient(doomed, { attempts: 1, timeoutMs: 20 })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toBeInstanceOf(Error)
      expect(result.error.message).toBe('raw string failure')
    }
  })

  it('describeResult formats ok and err results', () => {
    const success = ok(7) as Result<number, Error>
    const failure = err(new Error('boom')) as Result<number, Error>
    expect(describeResult(success)).toBe('success: 7')
    expect(describeResult(failure)).toBe('failure: boom')
    expect(describeResult(ok(0) as Result<number, Error>)).toBe('success: 0')
    expect(describeResult(ok('') as Result<string, Error>)).toBe('success: ""')
    expect(describeResult(err(new Error('')) as Result<number, Error>)).toBe('failure: ')
    expectTypeOf(describeResult(success)).toEqualTypeOf<string>()
  })
})
