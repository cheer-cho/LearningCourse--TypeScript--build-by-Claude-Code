import { describe, expect, expectTypeOf, it } from 'vitest'
import { assertNever, runAll, sides } from './ex07'

describe('ex02/ex07 — never and void', () => {
  it('sides is exhaustive over Shape', () => {
    expect(sides('circle')).toBe(0)
    expect(sides('square')).toBe(4)
    expect(sides('triangle')).toBe(3)
  })

  it('assertNever takes never and throws', () => {
    expectTypeOf(assertNever).toEqualTypeOf<(value: never) => never>()
    expect(() => assertNever('oops' as never)).toThrow()
  })

  it('runAll calls each function in order and returns void', () => {
    const calls: number[] = []
    const result = runAll([() => calls.push(1), () => calls.push(2), () => calls.push(3)])
    expect(calls).toEqual([1, 2, 3])
    expect(runAll([])).toBeUndefined()   // empty list is a no-op, not an error
    expect(result).toBeUndefined()
    expectTypeOf(runAll).returns.toEqualTypeOf<void>()
  })
})
