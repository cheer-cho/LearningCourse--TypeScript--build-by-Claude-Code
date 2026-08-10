import { describe, expect, expectTypeOf, it } from 'vitest'
import { collect, countdown, mapStream } from './ex07'

async function* stringSource(): AsyncGenerator<string, void, unknown> {
  yield 'a'
  yield 'b'
  yield 'c'
}

describe('ex10/ex07 — async iteration', () => {
  it('countdown yields from down to 1 and is typed AsyncGenerator<number, ...>', async () => {
    const values: number[] = []
    for await (const n of countdown(4)) {
      values.push(n)
    }
    expect(values).toEqual([4, 3, 2, 1])
    expectTypeOf(countdown).parameter(0).toEqualTypeOf<number>()
    expectTypeOf(countdown).returns.toEqualTypeOf<AsyncGenerator<number, void, unknown>>()
  })

  it('countdown yields nothing for from <= 0', async () => {
    const values: number[] = []
    for await (const n of countdown(0)) {
      values.push(n)
    }
    expect(values).toEqual([])
  })

  it('collect drains a number source into number[]', async () => {
    const values = collect(countdown(3))
    expectTypeOf(values).toEqualTypeOf<Promise<number[]>>()
    await expect(values).resolves.toEqual([3, 2, 1])
  })

  it('collect drains a string source into string[]', async () => {
    const values = collect(stringSource())
    expectTypeOf(values).toEqualTypeOf<Promise<string[]>>()
    await expect(values).resolves.toEqual(['a', 'b', 'c'])
  })

  it('mapStream lazily transforms each value, keeping the element type', async () => {
    const mapped = mapStream(countdown(3), (n) => n * 10)
    expectTypeOf(mapped).toEqualTypeOf<AsyncGenerator<number, void, unknown>>()
    const values: number[] = []
    for await (const n of mapped) {
      values.push(n)
    }
    expect(values).toEqual([30, 20, 10])
  })

  it('mapStream can change the element type from T to U', async () => {
    const mapped = mapStream(stringSource(), (s) => s.toUpperCase())
    expectTypeOf(mapped).toEqualTypeOf<AsyncGenerator<string, void, unknown>>()
    await expect(collect(mapped)).resolves.toEqual(['A', 'B', 'C'])
  })
})
