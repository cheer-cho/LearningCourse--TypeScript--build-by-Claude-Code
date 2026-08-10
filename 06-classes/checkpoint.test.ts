import { describe, expect, expectTypeOf, it } from 'vitest'
import { Circle, Rectangle, Shape, ShapeCollection, type HasArea } from './checkpoint'

describe('✦ checkpoint 6 — classes', () => {
  it('Shape cannot be instantiated directly', () => {
    // @ts-expect-error — Shape is abstract
    new Shape('Generic')
  })

  it('Circle and Rectangle compute area and describe themselves', () => {
    const c = new Circle(2)
    expect(c.name).toBe('Circle')
    expect(c.radius).toBe(2)
    expect(c.area()).toBeCloseTo(Math.PI * 4)
    expect(c.describe()).toBe(`Circle: area ${(Math.PI * 4).toFixed(2)}`)

    const r = new Rectangle(3, 4)
    expect(r.area()).toBe(12)
    expect(r.describe()).toBe('Rectangle: area 12.00')
  })

  it('Shape.count tracks every shape ever constructed', () => {
    const before = Shape.count
    new Circle(1)
    new Rectangle(1, 1)
    expect(Shape.count).toBe(before + 2)
  })

  it('Circle and Rectangle satisfy HasArea (area returns a precise number)', () => {
    expectTypeOf<Circle['area']>().toEqualTypeOf<HasArea['area']>()
    expectTypeOf<Rectangle['area']>().toEqualTypeOf<HasArea['area']>()
  })

  it('radius/width/height are public and readonly', () => {
    expectTypeOf<Pick<Circle, 'radius'>>().toEqualTypeOf<{ readonly radius: number }>()
    expectTypeOf<Pick<Rectangle, 'width' | 'height'>>().toEqualTypeOf<{
      readonly width: number
      readonly height: number
    }>()
  })

  it('ShapeCollection tracks size, total area, and the largest shape', () => {
    const shapes = new ShapeCollection<Shape>()
    expect(shapes.size).toBe(0)
    expect(shapes.largest()).toBeUndefined()
    shapes.add(new Circle(1))
    shapes.add(new Rectangle(10, 10))
    shapes.add(new Circle(2))
    expect(shapes.size).toBe(3)
    expect(shapes.totalArea()).toBeCloseTo(Math.PI + 100 + Math.PI * 4)
    expect(shapes.largest()?.name).toBe('Rectangle')
    expectTypeOf(shapes.add).toEqualTypeOf<(shape: Shape) => void>()
    expectTypeOf(shapes.largest).toEqualTypeOf<() => Shape | undefined>()
  })
})
