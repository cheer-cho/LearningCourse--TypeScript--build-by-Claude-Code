import { describe, expect, expectTypeOf, it } from 'vitest'
import { makeDog, type Dog, type Pet } from './ex04'

describe('ex03/ex04 — interface extension', () => {
  it('Pet extends Animal with an owner', () => {
    expectTypeOf<Pet>().toEqualTypeOf<{ name: string; owner: string }>()
  })

  it('Dog extends Pet with breed and bark()', () => {
    expectTypeOf<Dog>().toEqualTypeOf<{
      name: string
      owner: string
      breed: string
      bark(): string
    }>()
  })

  it('makeDog builds a barking dog', () => {
    const dog = makeDog('Rex', 'Ada', 'labrador')
    expect(dog.name).toBe('Rex')
    expect(dog.owner).toBe('Ada')
    expect(dog.breed).toBe('labrador')
    expect(dog.bark()).toBe('Woof!')
    expectTypeOf(makeDog).returns.toEqualTypeOf<Dog>()
  })
})
