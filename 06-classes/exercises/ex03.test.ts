import { describe, expect, expectTypeOf, it } from 'vitest'
import { Circle, Temperature } from './ex03'

describe('ex06/ex03 — parameter properties & accessors', () => {
  it('fahrenheit converts on the way out and back in', () => {
    const t = new Temperature(100)
    expect(t.fahrenheit).toBe(212)
    t.fahrenheit = 32
    expect(t.value).toBe(0)
    t.fahrenheit = 212
    expect(t.value).toBe(100)
    expectTypeOf(t.fahrenheit).toEqualTypeOf<number>()
    expectTypeOf(t.value).toEqualTypeOf<number>()
  })

  it('celsius is private — only the accessors are public', () => {
    expectTypeOf<keyof Temperature>().toEqualTypeOf<'fahrenheit' | 'value'>()
  })

  it('Circle exposes a readonly radius and a getter-only area', () => {
    const c = new Circle(2)
    expect(c.radius).toBe(2)
    expect(c.area).toBeCloseTo(Math.PI * 4)
    expectTypeOf<Pick<Circle, 'radius'>>().toEqualTypeOf<{ readonly radius: number }>()
    expectTypeOf<Pick<Circle, 'area'>>().toEqualTypeOf<{ readonly area: number }>()
  })
})
