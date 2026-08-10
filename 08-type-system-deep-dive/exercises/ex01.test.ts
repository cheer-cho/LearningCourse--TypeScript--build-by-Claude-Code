import { describe, expect, expectTypeOf, it } from 'vitest'
import { COLORS, keysOf, point, type Color, type LabelType, type PointKey, type PointType } from './ex01'

describe('ex08/ex01 — keyof, typeof, indexed access', () => {
  it('PointKey is the key union of point', () => {
    expectTypeOf<PointKey>().toEqualTypeOf<'x' | 'y' | 'label'>()
  })

  it('PointType mirrors the shape of point', () => {
    expectTypeOf<PointType>().toEqualTypeOf<{ x: number; y: number; label: string }>()
  })

  it('LabelType is the type of point.label', () => {
    expectTypeOf<LabelType>().toEqualTypeOf<string>()
  })

  it('Color is the union of COLORS elements', () => {
    expectTypeOf<Color>().toEqualTypeOf<'red' | 'green' | 'blue'>()
    expect(COLORS).toEqual(['red', 'green', 'blue'])
  })

  it('keysOf returns the keys, precisely typed', () => {
    expect(keysOf(point).sort()).toEqual(['label', 'x', 'y'])
    expectTypeOf(keysOf(point)).toEqualTypeOf<PointKey[]>()
  })
})
