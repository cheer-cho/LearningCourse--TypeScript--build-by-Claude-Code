import { describe, expect, expectTypeOf, it } from 'vitest'
import { Bike, Car, Vehicle, type Describable } from './ex05'

describe('ex06/ex05 — abstract classes & implements', () => {
  it('Vehicle cannot be instantiated directly', () => {
    // @ts-expect-error — Vehicle is abstract
    new Vehicle('Generic')
  })

  it('Car computes its own top speed and inherits describe()', () => {
    const c = new Car('Toyota', 180)
    expect(c.make).toBe('Toyota')
    expect(c.topSpeed()).toBe(180)
    expect(c.describe()).toBe('Toyota tops out at 180 km/h')
  })

  it('Bike computes top speed from gears', () => {
    const b = new Bike('Trek', 21)
    expect(b.topSpeed()).toBe(168)
    expect(b.describe()).toBe('Trek tops out at 168 km/h')
  })

  it('make is public and readonly on Vehicle', () => {
    expectTypeOf<Pick<Vehicle, 'make'>>().toEqualTypeOf<{ readonly make: string }>()
  })

  it('Car and Bike satisfy the Describable interface (describe returns string)', () => {
    expectTypeOf<Car['describe']>().toEqualTypeOf<Describable['describe']>()
    expectTypeOf<Bike['describe']>().toEqualTypeOf<Describable['describe']>()
  })

  it('Vehicle.describe is typed as () => string', () => {
    expectTypeOf<Vehicle['describe']>().toEqualTypeOf<() => string>()
  })
})
