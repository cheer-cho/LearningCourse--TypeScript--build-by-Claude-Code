import { describe, expect, expectTypeOf, it } from 'vitest'
import { loadProfile, partition } from './ex02'

// A rejected promise whose rejection is pre-handled, so the test run
// never sees an "unhandled rejection" — allSettled still reports it.
function rejected(reason: unknown): Promise<number> {
  const p = Promise.reject<number>(reason)
  p.catch(() => {})
  return p
}

describe('ex10/ex02 — Promise.all & Promise.allSettled', () => {
  it('loadProfile returns the [number, string, boolean] tuple', async () => {
    await expect(loadProfile()).resolves.toEqual([42, 'Ada', true])
    expectTypeOf(loadProfile).toEqualTypeOf<() => Promise<[number, string, boolean]>>()
  })

  it('partition splits fulfilled and rejected results', async () => {
    const result = await partition([
      Promise.resolve(1),
      rejected(new Error('x')),
      Promise.resolve(3),
      rejected('boom'),
    ])
    expect(result).toEqual({ values: [1, 3], errors: ['Error: x', 'boom'] })
  })

  it('partition never rejects and is fully typed', async () => {
    await expect(partition([rejected(new Error('only failures'))])).resolves.toEqual({
      values: [],
      errors: ['Error: only failures'],
    })
    expectTypeOf(partition).toEqualTypeOf<
      (promises: Array<Promise<number>>) => Promise<{ values: number[]; errors: string[] }>
    >()
  })
})
