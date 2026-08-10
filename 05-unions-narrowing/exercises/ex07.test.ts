import { describe, expect, expectTypeOf, it } from 'vitest'
import { isFish, isString, swimmers, type Bird, type Fish } from './ex07'

const nemo: Fish = { name: 'nemo', swim: () => 'splash' }
const dory: Fish = { name: 'dory', swim: () => 'swoosh' }
const tweety: Bird = { name: 'tweety', fly: () => 'whoosh' }

describe('ex05/ex07 — type predicates', () => {
  it('isFish is a real type predicate, not just a boolean', () => {
    expect(isFish(nemo)).toBe(true)
    expect(isFish(tweety)).toBe(false)
    expectTypeOf(isFish).toEqualTypeOf<(pet: Fish | Bird) => pet is Fish>()
  })

  it('isString narrows unknown values', () => {
    expect(isString('a')).toBe(true)
    expect(isString(42)).toBe(false)
    expect(isString(null)).toBe(false)
    expectTypeOf(isString).toEqualTypeOf<(value: unknown) => value is string>()
  })

  it('filter with a predicate changes the element type', () => {
    const mixed: unknown[] = ['a', 1, 'b', null, 'c']
    const strings = mixed.filter(isString)
    expect(strings).toEqual(['a', 'b', 'c'])
    expectTypeOf(strings).toEqualTypeOf<string[]>()
  })

  it('swimmers returns Fish[], not (Fish | Bird)[]', () => {
    expect(swimmers([nemo, tweety, dory]).map((f: Fish) => f.name)).toEqual(['nemo', 'dory'])
    expect(swimmers([tweety])).toEqual([])
    expectTypeOf(swimmers).toEqualTypeOf<(pets: (Fish | Bird)[]) => Fish[]>()
  })
})
