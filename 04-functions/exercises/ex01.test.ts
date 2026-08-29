import { describe, expect, expectTypeOf, it } from 'vitest'
import { add, applyOp, multiply, type BinaryOp } from './ex01'

describe('ex04/ex01 — function types', () => {
  it('BinaryOp is (number, number) => number', () => {
    expectTypeOf<BinaryOp>().toEqualTypeOf<(a: number, b: number) => number>()
  })

  it('add and multiply are BinaryOps', () => {
    expect(add(2, 3)).toBe(5)
    expect(multiply(2, 3)).toBe(6)
    expect(add(0, 0)).toBe(0)
    expect(add(-2, 2)).toBe(0)
    expect(multiply(5, 0)).toBe(0)      // distinguishes multiply from add
    expectTypeOf(add).toEqualTypeOf<BinaryOp>()
    expectTypeOf(multiply).toEqualTypeOf<BinaryOp>()
  })

  it('applyOp applies the operation', () => {
    expect(applyOp(10, 4, add)).toBe(14)
    expect(applyOp(10, 4, multiply)).toBe(40)
    expect(applyOp(0, 0, add)).toBe(0)
    expect(applyOp(3, 4, (a, b) => a - b)).toBe(-1)  // argument order is preserved
    expectTypeOf(applyOp).toEqualTypeOf<(a: number, b: number, op: BinaryOp) => number>()
  })
})
