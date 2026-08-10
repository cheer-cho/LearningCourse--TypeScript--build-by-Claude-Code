import { describe, expect, expectTypeOf, it } from 'vitest'
import { circle, circleArea, squareArea, type Circle, type Square } from './ex02'

describe('ex09/ex02 — barrel re-exports', () => {
  it('renamed value re-exports work at runtime', () => {
    expect(circleArea({ kind: 'circle', radius: 2 })).toBeCloseTo(Math.PI * 4)
    expect(squareArea({ kind: 'square', side: 3 })).toBe(9)
    expectTypeOf(circleArea).toEqualTypeOf<(shape: Circle) => number>()
    expectTypeOf(squareArea).toEqualTypeOf<(shape: Square) => number>()
  })

  it('type-only re-exports carry the precise shapes', () => {
    expectTypeOf<Circle>().toEqualTypeOf<{ kind: 'circle'; radius: number }>()
    expectTypeOf<Square>().toEqualTypeOf<{ kind: 'square'; side: number }>()
  })

  it('namespace re-export exposes the whole module', () => {
    expect(circle.area({ kind: 'circle', radius: 1 })).toBeCloseTo(Math.PI)
    expectTypeOf(circle.area).toEqualTypeOf<(shape: Circle) => number>()
  })
})
