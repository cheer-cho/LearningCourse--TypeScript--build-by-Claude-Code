import { describe, expect, expectTypeOf, it } from 'vitest'
import { answer, describeNum, greeting, results, steps } from './ex08'

describe('ex02/ex08 — inference practice', () => {
  it('answer infers the literal 42', () => {
    expect(answer).toBe(42)
    expectTypeOf<typeof answer>().toEqualTypeOf<42>()
  })

  it('greeting infers string (widened)', () => {
    expect(greeting).toBe('hello')
    expectTypeOf(greeting).toEqualTypeOf<string>()
  })

  it('steps infers readonly [1, 2, 3]', () => {
    expect(steps).toEqual([1, 2, 3])
    expectTypeOf(steps).toEqualTypeOf<readonly [1, 2, 3]>()
  })

  it('describeNum infers (n: number) => string', () => {
    expectTypeOf(describeNum).toEqualTypeOf<(n: number) => string>()
  })

  it("results keeps kind as the literal 'ok'", () => {
    expect(results).toHaveLength(2)
    expectTypeOf(results).toEqualTypeOf<{ kind: 'ok'; value: number }[]>()
  })
})
