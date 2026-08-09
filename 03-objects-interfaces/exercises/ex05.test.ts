import { describe, expect, expectTypeOf, it } from 'vitest'
import { area, type PointI, type PointT, type Shape } from './ex05'

describe('ex03/ex05 — interface vs type alias', () => {
  it('PointI and PointT are structurally identical', () => {
    expectTypeOf<PointI>().toEqualTypeOf<{ x: number; y: number }>()
    expectTypeOf<PointT>().toEqualTypeOf<{ x: number; y: number }>()
    expectTypeOf<PointI>().toEqualTypeOf<PointT>()
  })

  it('Shape is the circle/square union', () => {
    expectTypeOf<Shape>().toEqualTypeOf<
      { kind: 'circle'; radius: number } | { kind: 'square'; size: number }
    >()
  })

  it('area computes both kinds', () => {
    expect(area({ kind: 'circle', radius: 1 })).toBeCloseTo(Math.PI)
    expect(area({ kind: 'square', size: 3 })).toBe(9)
    expectTypeOf(area).parameter(0).toEqualTypeOf<Shape>()
  })
})
