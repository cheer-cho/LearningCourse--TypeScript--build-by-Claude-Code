import { describe, expect, expectTypeOf, it } from 'vitest'
import { catalog, type Shape } from './checkpoint'
import type { Circle } from './exercises/ex02-circle'
import type { Square } from './exercises/ex02-square'

describe('✦ checkpoint 9 — modules & organization', () => {
  it('Shape is the union of Circle and Square', () => {
    expectTypeOf<Shape>().toEqualTypeOf<Circle | Square>()
  })

  it('catalog computes area by routing on kind', () => {
    expect(catalog({ kind: 'circle', radius: 2 })).toBeCloseTo(Math.PI * 4)
    expect(catalog({ kind: 'square', side: 3 })).toBe(9)
    expectTypeOf(catalog).parameter(0).toEqualTypeOf<Shape>()
    expectTypeOf(catalog).returns.toEqualTypeOf<number>()
  })

  it('catalog tracks a call count via its merged namespace', () => {
    catalog.reset()
    expect(catalog.count).toBe(0)
    catalog({ kind: 'circle', radius: 1 })
    catalog({ kind: 'square', side: 1 })
    expect(catalog.count).toBe(2)
    // a zero-area shape is still a call
    expect(catalog({ kind: 'square', side: 0 })).toBe(0)
    expect(catalog.count).toBe(3)
    catalog.reset()
    expect(catalog.count).toBe(0)
    expectTypeOf(catalog.count).toEqualTypeOf<number>()
    expectTypeOf(catalog.reset).toEqualTypeOf<() => void>()
  })
})
