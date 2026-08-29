import { describe, expect, expectTypeOf, it } from 'vitest'
import { area, assertNever, type Shape } from './ex06'

describe('ex05/ex06 — exhaustiveness with never', () => {
  it('Shape has the four tagged variants', () => {
    expectTypeOf<Shape>().toEqualTypeOf<
      | { kind: 'circle'; radius: number }
      | { kind: 'rect'; width: number; height: number }
      | { kind: 'triangle'; base: number; height: number }
      | { kind: 'ellipse'; rx: number; ry: number }
    >()
  })

  it('assertNever accepts only never and always throws', () => {
    expect(() => assertNever('impossible' as never)).toThrow()
    expectTypeOf(assertNever).toEqualTypeOf<(value: never) => never>()
  })

  it('area handles every variant', () => {
    expect(area({ kind: 'circle', radius: 2 })).toBeCloseTo(Math.PI * 4)
    expect(area({ kind: 'rect', width: 3, height: 4 })).toBe(12)
    expect(area({ kind: 'triangle', base: 6, height: 4 })).toBe(12)
    expect(area({ kind: 'ellipse', rx: 2, ry: 3 })).toBeCloseTo(Math.PI * 6)
    expect(area({ kind: 'circle', radius: 0 })).toBe(0)
    expect(area({ kind: 'rect', width: 0, height: 5 })).toBe(0)
    expect(area({ kind: 'triangle', base: 3, height: 3 })).toBe(4.5)  // halved, not multiplied
    expectTypeOf(area).toEqualTypeOf<(shape: Shape) => number>()
  })
})
