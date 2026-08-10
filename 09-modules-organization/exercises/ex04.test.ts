import { describe, expect, expectTypeOf, it } from 'vitest'
import { add, clamp, multiply, VERSION } from './mathlib'

describe('ex09/ex04 — authoring a .d.ts', () => {
  it('add and multiply are precisely typed', () => {
    expect(add(2, 3)).toBe(5)
    expect(multiply(2, 3)).toBe(6)
    expectTypeOf(add).toEqualTypeOf<(a: number, b: number) => number>()
    expectTypeOf(multiply).toEqualTypeOf<(a: number, b: number) => number>()
  })

  it('clamp restricts a value to a range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10)).toBe(10)
    expectTypeOf(clamp).toEqualTypeOf<(value: number, min: number, max: number) => number>()
  })

  it('VERSION keeps its literal type', () => {
    expect(VERSION).toBe('2.1.0')
    expectTypeOf<typeof VERSION>().toEqualTypeOf<'2.1.0'>()
  })
})
