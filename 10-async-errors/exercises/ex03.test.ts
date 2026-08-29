import { describe, expect, expectTypeOf, it } from 'vitest'
import { delay, retry, withTimeout } from './ex03'

describe('ex10/ex03 — typed async helpers', () => {
  it('delay resolves (with void) after roughly the given ms', async () => {
    const start = Date.now()
    const p = delay(15)
    expectTypeOf(p).toEqualTypeOf<Promise<void>>()
    await p
    expect(Date.now() - start).toBeGreaterThanOrEqual(10)
  })

  it('withTimeout passes a fast promise through, typed Promise<T>', async () => {
    const fast = new Promise<string>((resolve) => setTimeout(() => resolve('fast'), 5))
    const p = withTimeout(fast, 20)
    expectTypeOf(p).toEqualTypeOf<Promise<string>>()
    await expect(p).resolves.toBe('fast')
    // a falsy resolution passes through untouched
    await expect(withTimeout(Promise.resolve(0), 20)).resolves.toBe(0)
    await expect(withTimeout(Promise.resolve(''), 20)).resolves.toBe('')
  })

  it('withTimeout rejects a slow promise with the timeout error', async () => {
    const slow = new Promise<number>((resolve) => setTimeout(() => resolve(1), 20))
    await expect(withTimeout(slow, 5)).rejects.toThrow('timed out after 5ms')
  })

  it('retry resolves with the first success', async () => {
    let calls = 0
    const flaky = async (): Promise<string> => {
      calls += 1
      if (calls < 3) throw new Error(`fail ${calls}`)
      return 'success'
    }
    const p = retry(flaky, 5)
    expectTypeOf(p).toEqualTypeOf<Promise<string>>()
    await expect(p).resolves.toBe('success')
    expect(calls).toBe(3)
    // a falsy result is still a SUCCESS — do not keep retrying past it
    let zeroCalls = 0
    const zero = async (): Promise<number> => {
      zeroCalls += 1
      return 0
    }
    await expect(retry(zero, 3)).resolves.toBe(0)
    expect(zeroCalls).toBe(1)
  })

  it('retry rethrows the LAST error when every attempt fails', async () => {
    let calls = 0
    const doomed = async (): Promise<number> => {
      calls += 1
      throw new Error(`fail ${calls}`)
    }
    await expect(retry(doomed, 2)).rejects.toThrow('fail 2')
    expect(calls).toBe(2)
  })
})
