import { describe, expect, expectTypeOf, it } from 'vitest'
import { add, applyOp, multiply, type BinaryOp } from './ex01'

describe('ex04/ex01 — function types', () => {
  it('BinaryOp is (number, number) => number', () => {
    expectTypeOf<BinaryOp>().toEqualTypeOf<(a: number, b: number) => number>()
  })

  it('add and multiply are BinaryOps', () => {
    expect(add(2, 3)).toBe(5)
    expect(multiply(2, 3)).toBe(6)
    expectTypeOf(add).toEqualTypeOf<BinaryOp>()
    expectTypeOf(multiply).toEqualTypeOf<BinaryOp>()
  })

  it('applyOp applies the operation', () => {
    expect(applyOp(10, 4, add)).toBe(14)
    expect(applyOp(10, 4, multiply)).toBe(40)
    expectTypeOf(applyOp).toEqualTypeOf<(a: number, b: number, op: BinaryOp) => number>()
  })
})
