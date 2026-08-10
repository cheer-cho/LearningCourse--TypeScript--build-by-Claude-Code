import { describe, expect, expectTypeOf, it } from 'vitest'
import { meters, seconds, speed, userId, type Brand, type Meters, type Seconds, type UserId } from './ex01'

describe('ex11/ex01 — branded types', () => {
  it('Brand<T, B> intersects T with the phantom __brand property', () => {
    expectTypeOf<Brand<number, 'Pixels'>>().toEqualTypeOf<number & { readonly __brand: 'Pixels' }>()
    expectTypeOf<Brand<string, 'Email'>>().toEqualTypeOf<string & { readonly __brand: 'Email' }>()
  })

  it('UserId, Meters and Seconds are branded primitives', () => {
    expectTypeOf<UserId>().toEqualTypeOf<string & { readonly __brand: 'UserId' }>()
    expectTypeOf<Meters>().toEqualTypeOf<number & { readonly __brand: 'Meters' }>()
    expectTypeOf<Seconds>().toEqualTypeOf<number & { readonly __brand: 'Seconds' }>()
  })

  it('raw primitives are NOT assignable to the brands', () => {
    expectTypeOf<string>().not.toExtend<UserId>()
    expectTypeOf<number>().not.toExtend<Meters>()
    expectTypeOf<number>().not.toExtend<Seconds>()
  })

  it('the two number brands do not mix — Meters vs Seconds', () => {
    expectTypeOf<Meters>().not.toExtend<Seconds>()
    expectTypeOf<Seconds>().not.toExtend<Meters>()
  })

  it('constructors brand the raw value (identity at runtime)', () => {
    expect(userId('u1')).toBe('u1')
    expect(meters(100)).toBe(100)
    expect(seconds(20)).toBe(20)
    expectTypeOf(userId).toEqualTypeOf<(raw: string) => UserId>()
    expectTypeOf(meters).toEqualTypeOf<(raw: number) => Meters>()
    expectTypeOf(seconds).toEqualTypeOf<(raw: number) => Seconds>()
  })

  it('speed only accepts (Meters, Seconds) and returns plain number', () => {
    expect(speed(meters(100), seconds(20))).toBe(5)
    expect(speed(meters(9), seconds(3))).toBe(3)
    expectTypeOf(speed).parameters.toEqualTypeOf<[Meters, Seconds]>()
    expectTypeOf(speed).returns.toEqualTypeOf<number>()
    const swapped = () => {
      // @ts-expect-error — arguments are swapped: (Seconds, Meters)
      speed(seconds(20), meters(100))
    }
    expect(typeof swapped).toBe('function')
  })
})
