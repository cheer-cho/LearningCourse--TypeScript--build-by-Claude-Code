import { describe, expectTypeOf, it } from 'vitest'
import type { FilterString, IsUnion, ToArrayEach, ToArrayWhole } from './ex03'

describe('ex08/ex03 — distributive conditionals', () => {
  it('ToArrayEach distributes over the union', () => {
    expectTypeOf<ToArrayEach<string | number>>().toEqualTypeOf<string[] | number[]>()
  })

  it('ToArrayWhole treats the union as one type', () => {
    expectTypeOf<ToArrayWhole<string | number>>().toEqualTypeOf<(string | number)[]>()
  })

  it('FilterString keeps only the string members', () => {
    expectTypeOf<FilterString<'a' | 42 | 'b'>>().toEqualTypeOf<'a' | 'b'>()
  })

  it('IsUnion detects multi-member unions', () => {
    expectTypeOf<IsUnion<string>>().toEqualTypeOf<false>()
    expectTypeOf<IsUnion<'a' | 'b'>>().toEqualTypeOf<true>()
  })
})
